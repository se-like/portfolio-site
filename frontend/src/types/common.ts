export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'gradient';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseProps {
  className?: string;
  id?: string;
}

export interface SectionProps extends BaseProps {
  children: React.ReactNode;
  bgColor?: 'white' | 'light';
}

export interface SectionHeadingProps extends BaseProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export interface ButtonProps extends BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
} 