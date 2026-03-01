import { ReactNode } from 'react';

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

export interface LayoutProps {
  children: ReactNode;
}

export interface MainLayoutProps {
  children: ReactNode;
} 