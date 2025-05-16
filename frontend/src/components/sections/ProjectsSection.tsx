/**
 * プロジェクトセクションコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - プロジェクト一覧の表示
 * - レスポンシブなグリッドレイアウト
 * - プロジェクト画像の最適化表示
 * - 画像読み込み失敗時のフォールバック表示
 * - 技術スタックのタグ表示
 * - プロジェクト詳細へのリンク
 */

'use client';

import Image from 'next/image';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Project } from '@/types/project';

export default function ProjectsSection() {
  // プロジェクトデータの定義
  const projects: Project[] = [
    {
      title: 'IoTデータ見える化システム',
      description: 'IoTデバイスからのセンシングデータ見える化システムの構築。ユーザーIFについてのエンドユーザーとのシステム要件の検討・調整、基本設計書作成、画面・バッチ実装、テストを担当。',
      technologies: ['JavaScript', 'SQL Server', 'CentOS', 'Vue.js', 'Node.js'],
      imageUrl: '/images/projects/project-1.jpg',
      projectUrl: '#',
      period: '2020-01〜2020-12',
      role: 'フロントエンドエンジニア',
      team_size: 5,
      db: 'SQL Server',
      os: 'CentOS',
      tools: ['VSCode', 'Git'],
      phases: ['要件定義', '設計', '実装', 'テスト'],
    },
    {
      title: 'BtoB向けポータルサイト',
      description: 'BtoB向けポータルサイトの新規構築。ユーザーIFについてのエンドユーザーとのシステム要件の検討・調整、ベンダーコントロール、基本・詳細設計書作成、画面・バッチ実装を担当。',
      technologies: ['Java', 'JavaScript', 'Oracle', 'Spring', 'Mybatis'],
      imageUrl: '/images/projects/project-2.jpg',
      githubUrl: '#',
      period: '2019-04〜2020-03',
      role: 'バックエンドエンジニア',
      team_size: 8,
      db: 'Oracle',
      os: 'Linux',
      tools: ['Eclipse', 'Git'],
      phases: ['要件定義', '設計', '実装'],
    },
    {
      title: '小売業販売管理システム',
      description: '小売業の販売管理および基幹システムの構築。要件定義から運用保守まで担当し、プロジェクトリーダーとして顧客との要件調整も実施。',
      technologies: ['.NET C#', 'Oracle', 'Windows', '.NET Framework'],
      imageUrl: '/images/projects/project-3.jpg',
      projectUrl: '#',
      period: '2018-06〜2019-03',
      role: 'プロジェクトリーダー',
      team_size: 10,
      db: 'Oracle',
      os: 'Windows',
      tools: ['Visual Studio', 'SVN'],
      phases: ['要件定義', '設計', '実装', 'テスト', '保守'],
    },
    {
      title: 'コールセンターシステム',
      description: '業務基盤更改によるコールセンターシステムの再構築・保守。チームテックリードとしてアプリ共通部品の開発や移行ツール作製を担当。',
      technologies: ['Java', 'JavaScript', 'Perl', 'DB2', 'GitLab'],
      imageUrl: '/images/projects/project-4.jpg',
      githubUrl: '#',
      period: '2017-01〜2018-05',
      role: 'テックリード',
      team_size: 6,
      db: 'DB2',
      os: 'Linux',
      tools: ['IntelliJ', 'GitLab'],
      phases: ['設計', '実装', 'テスト', '保守'],
    }
  ];

  return (
    <Section id="projects" className="section">
      {/* セクション見出し */}
      <SectionHeading 
        title="プロジェクト実績"
        subtitle="これまでに手がけた主要なプロジェクト"
        centered
      />
      
      {/* プロジェクトカードのグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {projects.map((project, index) => (
          <div key={index} className="project-card card-hover">
            {/* プロジェクト画像 */}
            <div className="project-image-container">
              {project.imageUrl ? (
                <Image 
                  src={project.imageUrl} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="project-image"
                  quality={85}
                  loading="lazy"
                  onError={(e) => {
                    // 画像読み込み失敗時のフォールバック処理
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement?.classList.add('gradient-primary', 'flex', 'items-center', 'justify-center');
                    
                    // タイトルテキストの追加
                    const titleSpan = document.createElement('span');
                    titleSpan.className = 'text-white text-2xl font-bold';
                    titleSpan.textContent = project.title;
                    target.parentElement?.appendChild(titleSpan);
                  }}
                />
              ) : (
                // 画像がない場合のフォールバック表示
                <div className="absolute inset-0 gradient-primary flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{project.title}</span>
                </div>
              )}
            </div>
            
            {/* プロジェクト詳細情報 */}
            <div className="p-6">
              {/* 期間と役割のタグ */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
                  {project.period}
                </span>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium rounded">
                  {project.role}
                </span>
              </div>

              {/* プロジェクトタイトルと説明 */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              
              {/* 使用技術のタグ */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* プロジェクトリンクボタン */}
              <div className="flex space-x-3 mt-4">
                {project.projectUrl && (
                  <Link href={project.projectUrl}>
                    <Button size="sm">
                    プロジェクトを見る
                  </Button>
                  </Link>
                )}
                {project.githubUrl && (
                  <Link href={project.githubUrl}>
                    <Button variant="outline" size="sm">
                    GitHub
                  </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 全プロジェクト表示へのリンク */}
      <div className="mt-12 text-center">
        <Link href="/projects">
          <Button variant="secondary" className="hover-lift">
          すべてのプロジェクトを見る
        </Button>
        </Link>
      </div>
    </Section>
  );
}
