'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactServices from '@/components/contact/ContactServices';
import SocialLinks from '@/components/contact/SocialLinks';
import { useProfileData } from '@/hooks/useProfileData';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { profileData } = useProfileData();
  
  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would be an API call to the backend
      // For now, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };
  
  return (
    <>
      <Section bgColor="light" id="contact">
        <SectionHeading 
          title="お問い合わせ"
          subtitle="プロジェクトのご相談やお問い合わせはこちらから"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <ContactForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
                onReset={() => setSubmitStatus('idle')}
              />
            </div>
          </div>
          
          <div>
            <ContactInfo profileData={profileData} />
            <ContactServices />
          </div>
        </div>
      </Section>
      
      <Section bgColor="light">
        <SocialLinks />
      </Section>
    </>
  );
}
