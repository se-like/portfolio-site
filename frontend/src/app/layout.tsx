/**
 * ルートレイアウトコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - アプリケーション全体のレイアウト定義
 * - フォントの設定（Geist Sans, Geist Mono）
 * - メタデータの設定（タイトル、説明、キーワード、アイコン）
 * - ダークモード対応
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainLayout from "@/components/layout/MainLayout";
import { LayoutProps } from "@/types/common";
import "./globals.css";

// Geist Sansフォントの設定
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Geist Monoフォントの設定
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// サイトのメタデータ設定
export const metadata: Metadata = {
  title: "SE Portfolio | Freelance System Engineer",
  description: "Portfolio website for a freelance system engineer showcasing skills, projects, and professional experience.",
  keywords: ["system engineer", "freelance", "web development", "portfolio", "React", "Next.js", "Ruby on Rails"],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' }
    ],
    apple: [
      { url: '/icon.png', type: 'image/png' }
    ],
    shortcut: [
      { url: '/icon.png', type: 'image/png' }
    ]
  },
};

/**
 * ルートレイアウトコンポーネント
 * @param children - 子コンポーネント
 */
export default function RootLayout({
  children,
}: Readonly<LayoutProps>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
