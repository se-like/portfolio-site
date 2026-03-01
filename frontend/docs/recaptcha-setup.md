# reCAPTCHA 設定

お問い合わせフォームで reCAPTCHA を使用しています。

## 環境変数（必須）

reCAPTCHA の表示・検証には次の環境変数が必要です。未設定の場合はウィジェットは表示されず、API はエラーになります。

| 変数名 | 用途 | 設定場所 |
|--------|------|----------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | クライアントでウィジェット表示 | ローカル: `frontend/.env.local` / 本番: Vercel の Environment Variables |
| `RECAPTCHA_SECRET_KEY` | API でトークン検証 | 同上 |

**ローカルで表示するには**: `frontend/.env.local` に上記 2 つを設定し、開発サーバーを再起動してください。キーは [Google reCAPTCHA 管理コンソール](https://www.google.com/recaptcha/admin) で取得できます。

- `.env.local` はリポジトリに含まれません（.gitignore）。無くなった場合は `cp .env.example .env.local` のあと、Google 管理画面でキーを確認して値を入れてください。

## ドメインが無効です

**「サイトキーのドメインが無効です」** が出る場合は、Google の管理画面で「許可するドメイン」に現在のドメインを追加してください。

## 手順（ドメイン追加）

1. **Google reCAPTCHA 管理コンソールを開く**
   - https://www.google.com/recaptcha/admin
   - このプロジェクトで使っている Google アカウントでログイン

2. **該当する reCAPTCHA キー（サイト）をクリック**
   - お問い合わせフォーム用に作成したキーを選択

3. **「ドメイン」の設定を開く**
   - 設定画面内の「ドメイン」セクションを探す

4. **次のドメインを追加**
   - **本番**: `www.cloudcrowd.cloud` と `cloudcrowd.cloud`
   - **Vercel プレビュー・本番**: `*.vercel.app`  
     （Vercel のデプロイ URL すべてで有効になります）
   - **ローカル**: `localhost`

5. **保存**
   - 保存後、該当ページを再読み込みして reCAPTCHA が表示されるか確認

## 補足

- サイトキーは「どのドメインで使ってよいか」のリストを持っています。上記のいずれかが未登録だと「サイトキーのドメインが無効です」になります。
- Vercel の URL（例: `portfolio-site-xxx.vercel.app`）で使うには、`*.vercel.app` を 1 つ追加すれば、すべての Vercel デプロイで有効です。
