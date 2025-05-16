import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

// モック関数
const mockOnSubmit = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    // テスト前にモックをリセット
    mockOnSubmit.mockClear();
  });

  it('フォームが正しくレンダリングされる', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);

    // 必須フィールドが存在することを確認
    expect(screen.getByLabelText(/お名前/)).toBeInTheDocument();
    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
    expect(screen.getByLabelText(/お問い合わせ内容/)).toBeInTheDocument();
    expect(screen.getByLabelText(/メッセージ/)).toBeInTheDocument();
  });

  it('必須フィールドが空の場合、エラーメッセージが表示される', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);

    // 送信ボタンをクリック
    fireEvent.click(screen.getByText('送信する'));

    // エラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('お名前は必須です')).toBeInTheDocument();
      expect(screen.getByText('メールアドレスは必須です')).toBeInTheDocument();
      expect(screen.getByText('お問い合わせ内容は必須です')).toBeInTheDocument();
      expect(screen.getByText('メッセージは必須です')).toBeInTheDocument();
    });
  });

  it('無効なメールアドレスの場合、エラーメッセージが表示される', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);

    // 無効なメールアドレスを入力
    const emailInput = screen.getByLabelText(/メールアドレス/);
    await userEvent.type(emailInput, 'invalid-email');

    // 送信ボタンをクリック
    fireEvent.click(screen.getByText('送信する'));

    // エラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('有効なメールアドレスを入力してください')).toBeInTheDocument();
    });
  });

  it('正しい入力で送信ボタンをクリックすると、onSubmitが呼ばれる', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);

    // フォームに値を入力
    await userEvent.type(screen.getByLabelText(/お名前/), 'テスト太郎');
    await userEvent.type(screen.getByLabelText(/メールアドレス/), 'test@example.com');
    await userEvent.selectOptions(screen.getByLabelText(/お問い合わせ内容/), 'project');
    await userEvent.type(screen.getByLabelText(/メッセージ/), 'テストメッセージ');

    // reCAPTCHAのモック
    const recaptchaToken = 'test-token';
    window.grecaptcha = {
      render: jest.fn(),
      reset: jest.fn(),
      getResponse: jest.fn().mockReturnValue(recaptchaToken),
    };

    // 送信ボタンをクリック
    fireEvent.click(screen.getByText('送信する'));

    // onSubmitが正しい値で呼ばれることを確認
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'テスト太郎',
        email: 'test@example.com',
        company: '',
        subject: 'project',
        message: 'テストメッセージ',
        recaptchaToken,
      });
    });
  });

  it('送信中は送信ボタンが無効化される', () => {
    render(<ContactForm onSubmit={mockOnSubmit} isSubmitting={true} />);

    // 送信ボタンが無効化されていることを確認
    expect(screen.getByText('送信中...')).toBeDisabled();
  });

  it('送信成功時に成功メッセージが表示される', () => {
    render(<ContactForm onSubmit={mockOnSubmit} submitStatus="success" />);

    // 成功メッセージが表示されることを確認
    expect(screen.getByText('送信が完了しました')).toBeInTheDocument();
  });

  it('送信失敗時にエラーメッセージが表示される', () => {
    render(<ContactForm onSubmit={mockOnSubmit} submitStatus="error" />);

    // エラーメッセージが表示されることを確認
    expect(screen.getByText('送信に失敗しました')).toBeInTheDocument();
  });
}); 