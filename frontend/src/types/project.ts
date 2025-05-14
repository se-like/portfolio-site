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