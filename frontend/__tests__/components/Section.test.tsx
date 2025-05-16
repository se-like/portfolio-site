import { render, screen } from '@testing-library/react';
import Section from '@/components/ui/Section';

describe('Section', () => {
  it('renders with default props', () => {
    render(<Section>Test Content</Section>);
    const section = screen.getByText('Test Content').closest('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('bg-white');
  });

  it('renders with light background', () => {
    render(<Section bgColor="light">Light Section</Section>);
    const section = screen.getByText('Light Section').closest('section');
    expect(section).toHaveClass('bg-gray-50');
  });

  it('renders with custom className', () => {
    render(<Section className="custom-class">Custom Section</Section>);
    const section = screen.getByText('Custom Section').closest('section');
    expect(section).toHaveClass('custom-class');
  });

  it('renders with id attribute', () => {
    render(<Section id="test-section">Section with ID</Section>);
    const section = screen.getByText('Section with ID').closest('section');
    expect(section).toHaveAttribute('id', 'test-section');
  });

  it('renders children inside container', () => {
    render(
      <Section>
        <div data-testid="child">Child Content</div>
      </Section>
    );
    const container = screen.getByTestId('child').closest('.container');
    expect(container).toBeInTheDocument();
  });
}); 