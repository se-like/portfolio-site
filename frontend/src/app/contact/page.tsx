'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactServices from '@/components/contact/ContactServices';
import { useProfileData } from '@/hooks/useProfileData';
import { FormData } from '@/types/contact';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  // プロフィールデータの取得
  const { profileData, isLoading, isError } = useProfileData();
  
  // フォーム送信状態の管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  /**
   * フォーム送信ハンドラー
   * @param formData - 送信するフォームデータ
   */
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '送信に失敗しました');
      }
      
      setSubmitStatus('success');
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // ローディング状態の表示
  if (isLoading) {
    return (
      <Section>
        <div className="text-center">読み込み中...</div>
      </Section>
    );
  }

  // エラー状態の表示
  if (isError || !profileData) {
    return (
      <Section>
        <div className="text-center text-red-500">データの読み込みに失敗しました</div>
      </Section>
    );
  }

  return (
    <>
      <Section>
        <SectionHeading 
          title="お問い合わせ"
          subtitle="プロジェクトのご相談やお問い合わせはこちらから"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* 左側：お問い合わせフォーム */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <ContactForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
              />
            </div>
          </div>
          
          {/* 右側：プロフィール情報とサービス */}
          <div>
            <ContactInfo profileData={profileData} />
            <ContactServices />
          </div>
        </div>
      </Section>
      
      <Section bgColor="light">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            SNSでもつながりましょう
          </h3>
          
          <div className="flex justify-center space-x-6 mt-6">
            <a href={profileData?.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <span className="sr-only">GitHub</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/koji-morita-8b369294" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://x.com/SE_LIKE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <span className="sr-only">X</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
