import { ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string | ReactNode;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  className = ''
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 gradient-primary text-gradient">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 mt-6 rounded-full gradient-primary ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
}
