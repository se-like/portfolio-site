'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm, { FormData } from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactServices from '@/components/contact/ContactServices';
import { useProfileData } from '@/hooks/useProfileData';

export default function ContactSection() {
  const { profileData, isLoading, isError } = useProfileData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      setSubmitStatus('success');
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Section bgColor="light">
        <div className="text-center">読み込み中...</div>
      </Section>
    );
  }

  if (isError || !profileData) {
    return (
      <Section bgColor="light">
        <div className="text-center text-red-500">データの読み込みに失敗しました</div>
      </Section>
    );
  }

  return (
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
            />
          </div>
        </div>
        
        <div>
          <ContactInfo profileData={profileData} />
          <ContactServices />
        </div>
      </div>
    </Section>
  );
}
