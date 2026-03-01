import { NextResponse, NextRequest } from 'next/server';
import sgMail from '@sendgrid/mail';
import { z } from 'zod';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// SendGridのAPIキーを設定
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// グローバルレート制限（Upstash Redis 利用時のみ。未設定時はメモリにフォールバック）
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1時間
const MAX_REQUESTS = 5;

let upstashRatelimit: Ratelimit | null = null;
function getGlobalRatelimit(): Ratelimit | null {
  if (upstashRatelimit) return upstashRatelimit;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    upstashRatelimit = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, '1 h'),
      prefix: 'ratelimit:contact',
    });
    return upstashRatelimit;
  }
  return null;
}

// 入力値のバリデーションスキーマ
const contactFormSchema = z.object({
  name: z.string()
    .min(1, 'お名前は必須です')
    .max(100, 'お名前は100文字以内で入力してください')
    .regex(/^[ぁ-んァ-ン一-龥a-zA-Z\s]+$/, 'お名前は日本語または英語で入力してください'),
  email: z.string()
    .min(1, 'メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください')
    .max(255, 'メールアドレスは255文字以内で入力してください'),
  company: z.string()
    .max(100, '会社名は100文字以内で入力してください')
    .optional(),
  subject: z.string()
    .min(1, 'お問い合わせ内容は必須です')
    .refine((val: string) => ['project', 'quote', 'question', 'other'].includes(val), {
      message: '無効なお問い合わせ内容です'
    }),
  message: z.string()
    .min(1, 'メッセージは必須です')
    .max(2000, 'メッセージは2000文字以内で入力してください'),
  recaptchaToken: z.string()
    .min(1, 'reCAPTCHAの検証が必要です')
});

// HTMLエスケープ関数
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// レート制限（Upstash 未設定時のフォールバック: インスタンス単位）
const rateLimitMemory = new Map<string, { count: number; resetTime: number }>();

function isRateLimitedInMemory(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMemory.get(ip);

  if (!limit) {
    rateLimitMemory.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (now > limit.resetTime) {
    rateLimitMemory.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (limit.count >= MAX_REQUESTS) {
    return true;
  }

  limit.count++;
  return false;
}

// エラーログの詳細化
function logError(error: unknown, context: string) {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack
    } : error
  };

  // 開発環境では詳細なエラー情報を出力
  if (process.env.NODE_ENV === 'development') {
    console.error('詳細なエラー情報:', JSON.stringify(errorInfo, null, 2));
  } else {
    // 本番環境では機密情報を除いたエラー情報を出力
    console.error(`[${timestamp}] ${context}:`, error instanceof Error ? error.message : '不明なエラー');
  }
}

// reCAPTCHAのトークンを検証する関数
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secret}&response=${token}`,
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    logError(error, 'reCAPTCHA検証エラー');
    return false;
  }
}

// メール送信を非同期で実行する関数
async function sendEmailAsync(msg: sgMail.MailDataRequired) {
  try {
    await sgMail.send(msg);
    console.log('メール送信成功:', `To: ${msg.to}`);
  } catch (error) {
    logError(error, 'メール送信エラー');
  }
}

export async function POST(request: NextRequest) {
  try {
    // 環境変数のチェック
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not set');
    }
    if (!process.env.EMAIL_TO) {
      throw new Error('EMAIL_TO is not set');
    }
    if (!process.env.EMAIL_FROM) {
      throw new Error('EMAIL_FROM is not set');
    }
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      throw new Error('RECAPTCHA_SECRET_KEY is not set');
    }

    // IPアドレスの取得
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // レート制限（Upstash 設定時はグローバル、未設定時はメモリでインスタンス単位）
    const globalRl = getGlobalRatelimit();
    if (globalRl) {
      const { success } = await globalRl.limit(ip);
      if (!success) {
        logError('レート制限超過', `IP: ${ip}`);
        return NextResponse.json(
          { error: 'リクエスト制限を超えました。しばらく時間をおいてから再度お試しください。' },
          { status: 429 }
        );
      }
    } else {
      if (isRateLimitedInMemory(ip)) {
        logError('レート制限超過', `IP: ${ip}`);
        return NextResponse.json(
          { error: 'リクエスト制限を超えました。しばらく時間をおいてから再度お試しください。' },
          { status: 429 }
        );
      }
    }

    const formData = await request.json();
    
    // 入力値のバリデーション
    const validatedData = contactFormSchema.parse(formData);
    
    // reCAPTCHAの検証
    const isValidRecaptcha = await verifyRecaptcha(validatedData.recaptchaToken);
    if (!isValidRecaptcha) {
      return NextResponse.json(
        { error: 'reCAPTCHAの検証に失敗しました。もう一度お試しください。' },
        { status: 400 }
      );
    }
    
    // 入力値のサニタイズ
    const sanitizedData = {
      name: escapeHtml(validatedData.name),
      email: validatedData.email, // メールアドレスはそのまま
      company: validatedData.company ? escapeHtml(validatedData.company) : '未入力',
      subject: escapeHtml(validatedData.subject),
      message: escapeHtml(validatedData.message)
    };
    
    // メール送信の設定
    const msg = {
      to: process.env.EMAIL_TO as string,
      from: process.env.EMAIL_FROM as string,
      subject: `[お問い合わせ] ${sanitizedData.subject}`,
      text: `
お名前: ${sanitizedData.name}
メールアドレス: ${sanitizedData.email}
会社名: ${sanitizedData.company}
お問い合わせ内容: ${sanitizedData.subject}
メッセージ:
${sanitizedData.message}
      `,
      html: `
<h2>お問い合わせ内容</h2>
<p><strong>お名前:</strong> ${sanitizedData.name}</p>
<p><strong>メールアドレス:</strong> ${sanitizedData.email}</p>
<p><strong>会社名:</strong> ${sanitizedData.company}</p>
<p><strong>お問い合わせ内容:</strong> ${sanitizedData.subject}</p>
<h3>メッセージ:</h3>
<p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // メール送信を非同期で実行
    sendEmailAsync(msg).catch(error => {
      logError(error, '非同期メール送信エラー');
    });

    // 即時レスポンスを返す
    return NextResponse.json(
      { message: 'お問い合わせを受け付けました' },
      { status: 200 }
    );
  } catch (error: unknown) {
    // エラーの種類に応じて適切なログを出力
    if (error instanceof z.ZodError) {
      logError(error, 'バリデーションエラー');
      return NextResponse.json(
        { error: '入力内容に誤りがあります', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      if (error.message.includes('SENDGRID_API_KEY')) {
        logError(error, 'SendGrid APIキー未設定');
        return NextResponse.json(
          { error: 'メール送信の設定が完了していません' },
          { status: 500 }
        );
      }
      if (error.message.includes('EMAIL_')) {
        logError(error, 'メール設定エラー');
        return NextResponse.json(
          { error: 'メール送信の設定が完了していません' },
          { status: 500 }
        );
      }
      if (error.message.includes('RECAPTCHA_SECRET_KEY')) {
        logError(error, 'reCAPTCHA設定エラー');
        return NextResponse.json(
          { error: 'reCAPTCHAの設定が完了していません' },
          { status: 500 }
        );
      }
    }

    // その他のエラー
    logError(error, '予期せぬエラー');
    return NextResponse.json(
      { error: 'メールの送信に失敗しました' },
      { status: 500 }
    );
  }
} 