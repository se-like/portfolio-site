import { SectionProps } from '@/types/common';

export default function Section({ 
  children, 
  bgColor = 'white',
  className = '',
  id,
}: SectionProps) {
  const bgColorClass = bgColor === 'light' ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800';
  
  return (
    <section 
      className={`py-16 ${bgColorClass} ${className}`}
      id={id}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}
