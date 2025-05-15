import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// SendGridのAPIキーを設定
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // メール送信の設定
    const msg = {
      to: process.env.CONTACT_EMAIL || 'your-email@example.com', // 送信先メールアドレス
      from: process.env.FROM_EMAIL || 'noreply@example.com', // 送信元メールアドレス
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
    return NextResponse.json(
      { error: 'メールの送信に失敗しました' },
      { status: 500 }
    );
  }
} 