import { ProfileData } from '@/types/profile';

export interface FormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  recaptchaToken?: string;
}

export interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting?: boolean;
  submitStatus?: 'idle' | 'success' | 'error';
}

export interface ContactFormState {
  type: 'idle' | 'success' | 'error';
  message: string;
}

export interface ContactInfoProps {
  profileData: ProfileData | null;
}

export interface SocialLinksProps {
  profileData: ProfileData;
} 