import { NextResponse, NextRequest } from 'next/server';
import sgMail from '@sendgrid/mail';
import { z } from 'zod';

// SendGridのAPIキーを設定
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

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
    .max(2000, 'メッセージは2000文字以内で入力してください')
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

// レート制限の実装
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1時間
const MAX_REQUESTS = 5; // 1時間あたりの最大リクエスト数

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (!limit) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (now > limit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (limit.count >= MAX_REQUESTS) {
    return true;
  }

  limit.count++;
  return false;
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

    // IPアドレスの取得
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // レート制限のチェック
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'リクエスト制限を超えました。しばらく時間をおいてから再度お試しください。' },
        { status: 429 }
      );
    }

    const formData = await request.json();
    
    // 入力値のバリデーション
    const validatedData = contactFormSchema.parse(formData);
    
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

    // メール送信
    await sgMail.send(msg);

    return NextResponse.json(
      { message: 'お問い合わせを受け付けました' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('メール送信エラー:', error);
    
    // バリデーションエラーの場合
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '入力内容に誤りがあります', details: error.errors },
        { status: 400 }
      );
    }
    
    // その他のエラーの場合
    return NextResponse.json(
      { error: 'メールの送信に失敗しました' },
      { status: 500 }
    );
  }
} 