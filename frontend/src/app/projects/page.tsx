'use client';

import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProjectsData, getPhaseColor } from '@/types/project';

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        if (!data.projects || !Array.isArray(data.projects)) {
          throw new Error('Invalid data structure: projects array is missing or invalid');
        }
        setProjectsData(data);
      } catch (error) {
        console.error('プロジェクトデータの読み込みに失敗しました:', error);
        setError(error instanceof Error ? error.message : '不明なエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectsData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">エラー: {error}</div>
      </div>
    );
  }

  if (!projectsData?.projects) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">データの読み込みに失敗しました</div>
      </div>
    );
  }

  const { projects } = projectsData;

  // プロジェクトを時系列の逆順でソート
  const sortedProjects = [...projects].sort((a, b) => {
    // 期間の文字列を比較（例: "2014-04〜2015-04"）
    return b.period.localeCompare(a.period);
  });

  return (
    <>
      <Section>
        <SectionHeading 
          title="プロジェクト実績"
          subtitle="これまでに手がけた主要なプロジェクト一覧"
        />
        
        <div className="mt-12 space-y-16">
          {sortedProjects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-full shadow-sm">
                    {project.period}
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium rounded-full shadow-sm">
                    {project.role}
                  </span>
                  {project.team_size && (
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-full shadow-sm">
                      チームサイズ: {project.team_size}名
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative">
                  {project.title}
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  使用技術
                </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.languages.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                          className="px-3 py-1 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full shadow-sm border border-blue-100 dark:border-blue-900"
                    >
                      {tech}
                    </span>
                  ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      開発環境
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-600 dark:text-gray-300 flex items-center">
                        <span className="font-medium w-20">DB:</span>
                        <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm shadow-sm border border-gray-100 dark:border-gray-700">
                          {project.db}
                        </span>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 flex items-center">
                        <span className="font-medium w-20">OS:</span>
                        <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm shadow-sm border border-gray-100 dark:border-gray-700">
                          {project.os}
                        </span>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 flex items-center">
                        <span className="font-medium w-20">ツール:</span>
                        <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm shadow-sm border border-gray-100 dark:border-gray-700">
                          {project.tools.join(', ')}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    担当フェーズ
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.phases.map((phase, phaseIndex) => (
                      <div 
                        key={phaseIndex}
                        className="relative group"
                      >
                        <span 
                          className={`px-4 py-2 bg-gradient-to-r ${getPhaseColor(phase)} text-white text-sm font-medium rounded-lg shadow-sm flex items-center transition-all duration-300 group-hover:scale-105`}
                        >
                          {phase}
                          <span className="ml-2 text-xs opacity-75">→</span>
                        </span>
                        <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      
      <Section bgColor="light">
        <SectionHeading 
          title="お問い合わせ"
          subtitle="新規プロジェクトのご相談やお問い合わせはこちらから"
          centered
        />
        
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            新しいプロジェクトのご相談、技術的なお問い合わせ、お見積りのご依頼など、お気軽にご連絡ください。
          </p>
          
          <Link href="/contact">
            <Button size="lg">
            お問い合わせページへ
          </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
