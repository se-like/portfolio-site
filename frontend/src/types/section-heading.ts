import { ReactNode } from 'react';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string | ReactNode;
  centered?: boolean;
  className?: string;
} 