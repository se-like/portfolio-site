/**
 * 連絡先情報コンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - プロフィールデータに基づく連絡先情報の表示
 * - メールアドレスのクリック可能なリンク
 * - GitHubプロフィールへのリンク
 * - アイコンによる視覚的な表現
 * - ダークモード対応
 */

'use client';

import { ContactInfoProps } from '@/types/contact';

export default function ContactInfo({ profileData }: ContactInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
      {/* セクションタイトル */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        連絡先情報
      </h3>
      
      {/* 連絡先情報のリスト */}
      <div className="space-y-4">
        {/* メールアドレス情報 */}
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              メールアドレス
            </p>
            <a 
              href={`mailto:${profileData?.email}`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {profileData?.email}
            </a>
          </div>
        </div>

        {/* GitHubプロフィール情報 */}
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              GitHub
            </p>
            <a 
              href={profileData?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {profileData?.github?.replace('https://', '')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 