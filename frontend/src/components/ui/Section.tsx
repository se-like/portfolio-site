/**
 * セクションコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - セクションの背景色の切り替え（light/white）
 * - ダークモード対応
 * - カスタムスタイリング（className指定）
 * - セクションIDの設定（アンカーリンク用）
 * - レスポンシブなパディングとコンテナ
 */

import { SectionProps } from '@/types/common';

export default function Section({ 
  children, 
  bgColor = 'white',
  className = '',
  id,
}: SectionProps) {
  // 背景色のクラス設定
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
