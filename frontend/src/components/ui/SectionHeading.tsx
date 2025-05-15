/**
 * セクション見出しコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - タイトルとサブタイトルの表示
 * - 中央揃えオプション
 * - ダークモード対応
 * - カスタムスタイリング（className指定）
 * - セクションIDの設定（アンカーリンク用）
 */

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
      {/* メインタイトル */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      {/* サブタイトル（オプション） */}
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
      )}
    </div>
  );
}
