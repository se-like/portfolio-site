export interface Skill {
  name: string;
  icon: string;
  level: number;
  description: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
} 