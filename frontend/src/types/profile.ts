import { Project } from './project';

export interface ProfileData {
  name: string;
  age: number;
  gender: string;
  qualifications: string[];
  education: string;
  available_from: string;
  station: string;
  specialties: {
    business: string;
    technology: string[];
    role: string;
  };
  pr: string;
  github: string;
  email: string;
  phone: string;
  projects: Project[];
}

export interface CareerProject {
  period: string;
  title: string;
  role: string;
  team_size?: number;
  description: string;
  languages: string[];
} 