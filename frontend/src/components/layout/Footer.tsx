/**
 * フッターコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - プロフィール情報の表示
 * - ナビゲーションリンク
 * - コンタクト情報
 * - コピーライト表示
 * - 使用技術の表示
 * 
 * データは外部JSONファイルから動的に読み込まれます。
 */

'use client';

import { useState, useEffect } from 'react';
import { ProfileData } from '@/types/profile';
import FooterProfile from './FooterProfile';
import FooterNavigation from './FooterNavigation';
import FooterContact from './FooterContact';

export default function Footer() {
  // プロフィールデータの状態管理
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // コンポーネントマウント時にプロフィールデータを取得
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('プロフィールデータの読み込みに失敗しました:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* フッターのメインコンテンツ（3カラムレイアウト） */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterProfile profileData={profileData} />
          <FooterNavigation />
          <FooterContact profileData={profileData} />
        </div>
        
        {/* フッターの下部セクション（コピーライトと技術情報） */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {profileData?.name}. All rights reserved.
          </p>
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>このサイトはスキルシートのExcelをもとにAIエージェントを使用して作成されました。</p>
            <p className="mt-2">
              使用技術: Next.js, React, TypeScript, Tailwind CSS | 
              ホスティング: Vercel | 
              メール送信: SendGrid
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
