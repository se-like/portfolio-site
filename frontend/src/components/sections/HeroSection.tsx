/**
 * ヒーローセクションコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - メインビジュアルとプロフィール画像の表示
 * - レスポンシブなグリッドレイアウト
 * - 画像読み込み失敗時のフォールバック表示
 * - アクションボタン（プロジェクト実績、お問い合わせ）
 */

'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <div className={styles.heroContainer}>
      {/* 背景オーバーレイ */}
      <div className={styles.heroOverlay}></div>
      
      <div className={styles.heroContent}>
        <div className={styles.heroGrid}>
          {/* 左側：テキストコンテンツ */}
          <div>
            <h1>
              <span className={styles.heroTitle}>森田 浩司</span>
              <span className={styles.heroSubtitle}>システムエンジニア</span>
            </h1>
            <p className={styles.heroDescription}>
              流通・小売業の販売管理システムを中心に、.NET C#、Javaなどを用いたシステム開発のプロフェッショナル。基本設計から運用保守まで、システム開発の全工程に精通しています。
            </p>
            {/* アクションボタン */}
            <div className={styles.buttonContainer}>
              <Button href="/projects" variant="primary" size="lg">
                プロジェクト実績
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                お問い合わせ
              </Button>
            </div>
          </div>
          
          {/* 右側：プロフィール画像 */}
          <div className={styles.imageContainer}>
            <div className={styles.imageBackground}></div>
            <div className={styles.imageContent}>
              {/* フォールバックアイコン（画像読み込み失敗時用） */}
              <div className={styles.fallbackIcon}>
                <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              
              {/* プロフィール画像（Next.js Image最適化） */}
              <Image 
                src="/profile-new.jpeg" 
                alt="フリーランスシステムエンジニア" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.profileImage}
                priority
                quality={75}
                loading="eager"
                onError={(e) => {
                  // 画像読み込み失敗時にフォールバックアイコンを表示
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
