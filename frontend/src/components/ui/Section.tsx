import { SectionProps } from '@/types/section';

export default function Section({ 
  children, 
  className = '', 
  id,
  bgColor = 'white'
}: SectionProps) {
  const bgColorClasses = {
    white: 'bg-white dark:bg-gray-900',
    light: 'bg-gray-50 dark:bg-gray-800',
    dark: 'bg-gray-900 dark:bg-black text-white'
  };

  return (
    <section 
      id={id}
      className={`py-16 md:py-24 ${bgColorClasses[bgColor]} ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
