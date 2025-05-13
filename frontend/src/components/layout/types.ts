export interface ProfileData {
  name: string;
  age: number;
  gender: string;
  qualifications: string[];
  education: string;
  career: {
    company: string;
    period: string;
    role: string;
    description: string;
  }[];
  interests: string[];
  email: string;
  phone: string;
  github: string;
} 