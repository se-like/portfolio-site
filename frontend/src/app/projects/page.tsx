'use client';

import { useState, useEffect } from 'react';
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
    <Section bgColor="light">
      <div className="container mx-auto px-4 max-w-7xl">
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
              <div className="space-y-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] p-8 w-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                        {project.period}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 text-sm font-medium rounded-full">
                        {project.role}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies?.map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.phases.map((phase: string, phaseIndex: number) => (
                        <span
                          key={phaseIndex}
                          className={`px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${getPhaseColor(phase)} text-white shadow-sm`}
                        >
                          {phase}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      {project.projectUrl && (
                        <Link href={project.projectUrl}>
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                            プロジェクトを見る
                          </Button>
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link href={project.githubUrl}>
                          <Button variant="outline" size="sm" className="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300">
                            GitHub
                          </Button>
                        </Link>
                      )}
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
    </Section>
  );
}
