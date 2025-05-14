export interface Project {
  period: string;
  title: string;
  role: string;
  team_size?: number;
  description: string;
  technologies: string[];
  db?: string;
  os?: string;
  tools?: string[];
  phases: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
}

export interface ProjectList {
  projects: Project[];
}

export interface ProjectsData {
  projects: Project[];
}

export type PhaseColor = 'from-orange-500 to-orange-600' | 'from-blue-500 to-blue-600' | 'from-green-500 to-green-600' | 'from-purple-500 to-purple-600' | 'from-pink-500 to-pink-600' | 'from-gray-500 to-gray-600';

export function getPhaseColor(phase: string): string {
  if (phase.includes('要件定義')) {
    return 'gradient-requirement';
  }
  if (phase.includes('基本設計')) {
    return 'gradient-basic-design';
  }
  if (phase.includes('詳細設計')) {
    return 'gradient-detail-design';
  }
  if (phase.includes('実装・単体')) {
    return 'gradient-implementation';
  }
  if (phase.includes('結合テスト')) {
    return 'gradient-integration-test';
  }
  if (phase.includes('総合テスト')) {
    return 'gradient-system-test';
  }
  if (phase.includes('保守・運用')) {
    return 'gradient-maintenance';
  }
  return 'gradient-maintenance';
}

export interface ProjectFilter {
  technologies: string[];
  phases: string[];
  roles: string[];
}

export interface ProjectFiltersProps {
  filters: ProjectFilter;
  onFilterChange: (filters: ProjectFilter) => void;
  availableTechnologies: string[];
  availablePhases: string[];
  availableRoles: string[];
} 