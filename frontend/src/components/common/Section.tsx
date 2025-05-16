import { SectionProps } from '@/types/common';
import { twMerge } from 'tailwind-merge';

export default function Section({
  children,
  bgColor = 'white',
  className,
  id,
}: SectionProps) {
  const baseStyles = 'py-16 px-4 sm:px-6 lg:px-8';
  const bgColors = {
    white: 'bg-white',
    light: 'bg-gray-50',
  };

  return (
    <section
      id={id}
      className={twMerge(baseStyles, bgColors[bgColor], className)}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
} 