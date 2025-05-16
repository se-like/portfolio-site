import { render, screen } from '@testing-library/react';
import Section from '@/components/common/Section';

describe('Section', () => {
  it('正しくレンダリングされる', () => {
    render(<Section>テストコンテンツ</Section>);
    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
  });

  it('bgColorプロパティが正しく反映される', () => {
    render(
      <Section bgColor="light">
        テストコンテンツ
      </Section>
    );
    const section = screen.getByText('テストコンテンツ').closest('section');
    expect(section).toHaveClass('bg-gray-50');
  });

  it('classNameプロパティが正しく反映される', () => {
    render(
      <Section className="custom-class">
        テストコンテンツ
      </Section>
    );
    const section = screen.getByText('テストコンテンツ').closest('section');
    expect(section).toHaveClass('custom-class');
  });

  it('idプロパティが正しく反映される', () => {
    render(
      <Section id="test-section">
        テストコンテンツ
      </Section>
    );
    const section = screen.getByText('テストコンテンツ').closest('section');
    expect(section).toHaveAttribute('id', 'test-section');
  });
}); 