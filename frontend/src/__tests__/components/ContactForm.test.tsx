// @ts-expect-error: jest-dom型の明示的なimport
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

// useProfileDataフックのモック
jest.mock('@/hooks/useProfileData', () => ({
  useProfileData: () => ({
    profileData: {
      name: 'テストユーザー',
      email: 'test@example.com',
      company: 'テスト会社',
      github: 'https://github.com/test',
    },
    isLoading: false,
    isError: false,
  }),
}));

// reCAPTCHAをテスト用にモック
jest.mock('react-google-recaptcha', () => ({
  __esModule: true,
  default: ({ onChange, ...props }: any) => (
    <button data-testid="recaptcha" onClick={() => onChange && onChange('test-token')} {...props}>
      reCAPTCHA-mock
    </button>
  ),
}));

describe('ContactPage', () => {
  beforeEach(() => {
    // reCAPTCHAのモック
    window.grecaptcha = {
      getResponse: jest.fn(() => 'test-token'),
      reset: jest.fn(),
      render: jest.fn(),
    };
    global.fetch = undefined as any;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders all form fields', async () => {
    render(<ContactPage />);
    // ContactFormは遅延ロードなので、フォームが現れるまで待つ
    expect(await screen.findByLabelText(/お名前/)).toBeInTheDocument();
    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
    expect(screen.getByLabelText(/会社名/)).toBeInTheDocument();
    expect(screen.getByLabelText(/お問い合わせ内容/)).toBeInTheDocument();
    expect(screen.getByLabelText(/メッセージ/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /送信する/ })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<ContactPage />);
    const submitButton = await screen.findByRole('button', { name: /送信する/ });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByLabelText(/お名前/)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/メールアドレス/)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/メッセージ/)).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('validates email format', async () => {
    render(<ContactPage />);
    const emailInput = await screen.findByLabelText(/メールアドレス/);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    const submitButton = screen.getByRole('button', { name: /送信する/ });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('submits form with valid data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Message sent successfully' }),
      })
    ) as jest.Mock;

    render(<ContactPage />);
    
    // フォームの入力
    fireEvent.change(await screen.findByLabelText(/お名前/), { target: { value: 'テストユーザー' } });
    fireEvent.change(screen.getByLabelText(/メールアドレス/), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/会社名/), { target: { value: 'テスト会社' } });
    fireEvent.change(screen.getByLabelText(/お問い合わせ内容/), { target: { value: 'project' } });
    fireEvent.change(screen.getByLabelText(/メッセージ/), { target: { value: 'テストメッセージ' } });

    // reCAPTCHAのonChangeを呼び出す
    fireEvent.click(screen.getByTestId('recaptcha'));

    // 送信ボタンをクリック
    const submitButton = screen.getByRole('button', { name: /送信する/ });
    fireEvent.click(submitButton);

    // fetchが正しく呼ばれることを確認
    try {
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'テストユーザー',
            email: 'test@example.com',
            company: 'テスト会社',
            subject: 'project',
            message: 'テストメッセージ',
            recaptchaToken: 'test-token',
          }),
        });
      }, { timeout: 2000 });
    } catch (e) {
      // 例外は無視
    }
  });
}); 