import { SectionHeadingProps } from '@/types/common';

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  className = '',
  id,
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''} ${className}`} id={id}>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
      )}
    </div>
  );
}
