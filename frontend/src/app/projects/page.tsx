'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project, ProjectFilter, getPhaseColor } from '@/types/project';
import ProjectFilters from '@/components/projects/ProjectFilters';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filters, setFilters] = useState<ProjectFilter>({
    technologies: [],
    phases: [],
    roles: [],
  });

  // 利用可能なフィルターオプションを取得
  const availableTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies || []))
  );
  const availablePhases = Array.from(
    new Set(projects.flatMap((p) => p.phases))
  );
  const availableRoles = Array.from(
    new Set(projects.map((p) => p.role))
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error('プロジェクトデータの取得に失敗しました');
        }
        const data = await response.json();
        // 時系列（降順）でソート
        const sortedProjects = data.projects.sort((a: Project, b: Project) => b.period.localeCompare(a.period));
        setProjects(sortedProjects);
        setFilteredProjects(sortedProjects);
        setIsError(false);
      } catch (error) {
        console.error('プロジェクトデータの取得エラー:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesTechnologies =
        filters.technologies.length === 0 ||
        filters.technologies.some((tech) =>
          project.technologies?.includes(tech)
        );

      const matchesPhases =
        filters.phases.length === 0 ||
        filters.phases.some((phase) => project.phases.includes(phase));

      const matchesRoles =
        filters.roles.length === 0 || filters.roles.includes(project.role);

      return matchesTechnologies && matchesPhases && matchesRoles;
    });

    setFilteredProjects(filtered);
  }, [filters, projects]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">読み込み中...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          データの読み込みに失敗しました
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        プロジェクト一覧
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* フィルター */}
        <div className="lg:col-span-1">
          <ProjectFilters
            filters={filters}
            onFilterChange={setFilters}
            availableTechnologies={availableTechnologies}
            availablePhases={availablePhases}
            availableRoles={availableRoles}
          />
        </div>

        {/* プロジェクト一覧 */}
        <div className="lg:col-span-3">
          {filteredProjects.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              条件に一致するプロジェクトが見つかりませんでした
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <div className="relative min-h-[200px] w-full">
                    {project.imageUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600" />
                    )}
                  </div>

                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 break-words">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
                        {project.period}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium rounded">
                        {project.role}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.phases.map((phase: string, phaseIndex: number) => (
                        <span
                          key={phaseIndex}
                          className={`px-2 py-1 text-xs font-medium rounded bg-gradient-to-r ${getPhaseColor(phase)} text-white`}
                        >
                          {phase}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      {project.projectUrl && (
                        <Link href={project.projectUrl}>
                          <Button size="sm">プロジェクトを見る</Button>
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
          )}
        </div>
      </div>

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
    </div>
  );
}
