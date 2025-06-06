/**
 * 提供サービスコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - 対応可能な業務の一覧表示
 * - チェックマークアイコンによる視覚的な表現
 * - ダークモード対応
 * - レスポンシブデザイン
 */

'use client';

export default function ContactServices() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      {/* セクションタイトル */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        対応可能な業務
      </h3>
      
      {/* サービスリスト */}
      <ul className="space-y-3 text-gray-600 dark:text-gray-300">
        {/* 販売管理システム開発 */}
        <li className="flex items-start">
          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          販売管理システムの開発（.NET、Java）
        </li>
        {/* 基幹システム開発 */}
        <li className="flex items-start">
          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          基幹システムの設計・開発・保守
        </li>
        {/* プロジェクトマネジメント */}
        <li className="flex items-start">
          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          プロジェクトマネジメント
        </li>
      </ul>
    </div>
  );
} 