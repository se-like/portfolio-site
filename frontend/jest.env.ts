/**
 * テスト環境変数（setupFiles で使用。テストファイル読み込み前に実行される）
 * お問い合わせフォームで reCAPTCHA を表示させ、テストではモックに差し替える
 */
if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY === undefined) {
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 'test-site-key';
}
