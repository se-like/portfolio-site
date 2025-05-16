describe('お問い合わせフォーム', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('フォームが正しく表示される', () => {
    cy.get('form').should('exist');
    cy.get('label').contains('お名前').should('exist');
    cy.get('label').contains('メールアドレス').should('exist');
    cy.get('label').contains('お問い合わせ内容').should('exist');
    cy.get('label').contains('メッセージ').should('exist');
  });

  it('必須フィールドが空の場合、エラーメッセージが表示される', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('お名前は必須です').should('be.visible');
    cy.contains('メールアドレスは必須です').should('be.visible');
    cy.contains('お問い合わせ内容は必須です').should('be.visible');
    cy.contains('メッセージは必須です').should('be.visible');
  });

  it('無効なメールアドレスの場合、エラーメッセージが表示される', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.contains('有効なメールアドレスを入力してください').should('be.visible');
  });

  it('reCAPTCHAが表示される', () => {
    cy.get('.g-recaptcha').should('exist');
  });

  it('送信ボタンが存在する', () => {
    cy.get('button[type="submit"]').should('exist');
  });
}); 