/**
 * メインレイアウトコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - ヘッダー、メインコンテンツ、フッターの基本レイアウト
 * - フレックスボックスを使用した最小高さの画面レイアウト
 * - ヘッダーの高さを考慮したメインコンテンツのパディング
 */

import { MainLayoutProps } from '@/types/common';
import Header from './Header';
import Footer from './Footer';

/**
 * メインレイアウトコンポーネント
 * @param children - 子コンポーネント（ページコンテンツ）
 */
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
