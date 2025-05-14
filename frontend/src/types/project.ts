export interface Project {
  period: string;
  title: string;
  role: string;
  team_size?: number;
  description: string;
  languages: string[];
  db: string;
  os: string;
  tools: string[];
  phases: string[];
  technologies?: string[];
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

export const getPhaseColor = (phase: string): PhaseColor => {
  if (phase.includes('要件')) return 'from-orange-500 to-orange-600';
  if (phase.includes('設計')) return 'from-blue-500 to-blue-600';
  if (phase.includes('実装')) return 'from-green-500 to-green-600';
  if (phase.includes('テスト')) return 'from-purple-500 to-purple-600';
  if (phase.includes('保守')) return 'from-pink-500 to-pink-600';
  return 'from-gray-500 to-gray-600';
}; 