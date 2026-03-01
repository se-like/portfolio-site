# frontend ドキュメント

- **products/picsche/** — PicSche 統合の設計・運用（[README](./products/picsche/README.md)）
- **API**
  - `/api/contact` — お問い合わせ送信。レート制限: Upstash Redis 設定時はグローバル（5件/1時間）、未設定時はインスタンス単位。本番で厳密に制限する場合は `UPSTASH_REDIS_REST_URL` と `UPSTASH_REDIS_REST_TOKEN` を設定する。
  - `/api/projects` — プロジェクト・プロフィールデータ（`public/projects.json` を読んで返す）。`/projects.json` へのアクセスは 308 で `/api/projects` にリダイレクトされる。
- **data/resume-data.json** — `read-excel.js` で経歴書.xlsx から生成。フロントからは参照されない（public に置かない）。
- **[recaptcha-setup.md](./recaptcha-setup.md)** — reCAPTCHA「サイトキーのドメインが無効です」の対処（Vercel / localhost の追加手順）
- **[manual-test-checklist.md](./manual-test-checklist.md)** — 手動テスト用チェックリスト
