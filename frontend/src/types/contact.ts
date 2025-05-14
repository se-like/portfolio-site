import { ProfileData } from '@/types/profile';

export interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
}

export interface ContactInfoProps {
  profileData: ProfileData | null;
}

export interface SocialLinksProps {
  profileData: ProfileData;
} 