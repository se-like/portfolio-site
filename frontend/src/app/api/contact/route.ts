import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// SendGridの初期化
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    // バリデーション
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メールの内容
    const msg = {
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL_FROM || '',
      subject: `[お問い合わせ] ${subject}`,
      text: `
名前: ${name}
メールアドレス: ${email}
会社名: ${company || '未入力'}
件名: ${subject}

メッセージ:
${message}
      `,
      html: `
<h2>お問い合わせがありました</h2>
<p><strong>名前:</strong> ${name}</p>
<p><strong>メールアドレス:</strong> ${email}</p>
<p><strong>会社名:</strong> ${company || '未入力'}</p>
<p><strong>件名:</strong> ${subject}</p>
<p><strong>メッセージ:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
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