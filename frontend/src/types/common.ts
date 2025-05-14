export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'gradient';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseProps {
  className?: string;
  id?: string;
}

export interface SectionProps extends BaseProps {
  children: React.ReactNode;
}

export interface SectionHeadingProps extends BaseProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
} 