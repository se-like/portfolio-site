import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/common/Button';

describe('Button', () => {
  it('正しくレンダリングされる', () => {
    render(<Button>テストボタン</Button>);
    expect(screen.getByRole('button', { name: 'テストボタン' })).toBeInTheDocument();
  });

  it('クリックイベントが発火する', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>テストボタン</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'テストボタン' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled状態が正しく反映される', () => {
    render(<Button disabled>テストボタン</Button>);
    expect(screen.getByRole('button', { name: 'テストボタン' })).toBeDisabled();
  });

  it('type属性が正しく反映される', () => {
    render(<Button type="submit">テストボタン</Button>);
    expect(screen.getByRole('button', { name: 'テストボタン' })).toHaveAttribute('type', 'submit');
  });

  it('variant属性が正しく反映される', () => {
    render(<Button variant="primary">テストボタン</Button>);
    const button = screen.getByRole('button', { name: 'テストボタン' });
    expect(button).toHaveClass('bg-blue-600');
  });

  it('size属性が正しく反映される', () => {
    render(<Button size="lg">テストボタン</Button>);
    const button = screen.getByRole('button', { name: 'テストボタン' });
    expect(button).toHaveClass('text-lg');
  });
}); 