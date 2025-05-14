export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
}

export interface ProjectList {
  projects: Project[];
} 