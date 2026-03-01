import { render, screen } from '@testing-library/react';
import SectionHeading from '@/components/ui/SectionHeading';

describe('SectionHeading', () => {
  it('renders title correctly', () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeading title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('applies centered class when centered prop is true', () => {
    render(<SectionHeading title="Test Title" centered />);
    const container = screen.getByText('Test Title').closest('div');
    expect(container).toHaveClass('text-center');
  });

  it('applies custom className', () => {
    render(<SectionHeading title="Test Title" className="custom-class" />);
    const container = screen.getByText('Test Title').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  it('renders with id attribute', () => {
    render(<SectionHeading title="Test Title" id="test-heading" />);
    const container = screen.getByText('Test Title').closest('div');
    expect(container).toHaveAttribute('id', 'test-heading');
  });

  it('renders title with correct heading level', () => {
    render(<SectionHeading title="Test Title" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Title');
  });
});
