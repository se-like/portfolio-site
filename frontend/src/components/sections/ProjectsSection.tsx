'use client';

import Image from 'next/image';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Project } from '@/types/project';

export default function ProjectsSection() {
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
      languages: ['JavaScript', 'Vue.js', 'Node.js'],
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
      languages: ['Java', 'JavaScript'],
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
      languages: ['C#', '.NET Framework'],
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
      languages: ['Java', 'Perl', 'JavaScript'],
      db: 'DB2',
      os: 'Linux',
      tools: ['IntelliJ', 'GitLab'],
      phases: ['設計', '実装', 'テスト', '保守'],
    }
  ];

  return (
    <Section id="projects" className="section">
      <SectionHeading 
        title="プロジェクト実績"
        subtitle="これまでに手がけた主要なプロジェクト"
        centered
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {projects.map((project, index) => (
          <div key={index} className="project-card card-hover">
            <div className="project-image-container">
              {project.imageUrl ? (
                <Image 
                  src={project.imageUrl} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="project-image"
                  onError={(e) => {
                    // Fallback to gradient background if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement?.classList.add('gradient-primary', 'flex', 'items-center', 'justify-center');
                    
                    // Add title text
                    const titleSpan = document.createElement('span');
                    titleSpan.className = 'text-white text-2xl font-bold';
                    titleSpan.textContent = project.title;
                    target.parentElement?.appendChild(titleSpan);
                  }}
                />
              ) : (
                <div className="absolute inset-0 gradient-primary flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{project.title}</span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              
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
