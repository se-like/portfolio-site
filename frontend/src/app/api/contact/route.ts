import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// SendGridのAPIキーを設定
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
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

    const formData = await request.json();
    
    // メール送信の設定
    const msg = {
      to: process.env.EMAIL_TO as string,
      from: process.env.EMAIL_FROM as string,
      subject: `[お問い合わせ] ${formData.subject}`,
      text: `
お名前: ${formData.name}
メールアドレス: ${formData.email}
会社名: ${formData.company || '未入力'}
お問い合わせ内容: ${formData.subject}
メッセージ:
${formData.message}
      `,
      html: `
<h2>お問い合わせ内容</h2>
<p><strong>お名前:</strong> ${formData.name}</p>
<p><strong>メールアドレス:</strong> ${formData.email}</p>
<p><strong>会社名:</strong> ${formData.company || '未入力'}</p>
<p><strong>お問い合わせ内容:</strong> ${formData.subject}</p>
<h3>メッセージ:</h3>
<p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // メール送信
    await sgMail.send(msg);

    return NextResponse.json(
      { message: 'お問い合わせを受け付けました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('メール送信エラー:', error);
    // エラーの詳細を返す
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
    return NextResponse.json(
      { error: `メールの送信に失敗しました: ${errorMessage}` },
      { status: 500 }
    );
  }
} 