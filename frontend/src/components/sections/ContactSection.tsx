/**
 * コンタクトセクションコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - お問い合わせフォーム
 * - プロフィール情報の表示
 * - 提供サービスの表示
 * - フォーム送信状態の管理
 * - エラーハンドリング
 */

'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactServices from '@/components/contact/ContactServices';
import { useProfileData } from '@/hooks/useProfileData';
import { FormData } from '@/types/contact';

export default function ContactSection() {
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

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '送信に失敗しました');
      }
      
      setSubmitStatus('success');
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ローディング状態の表示
  if (isLoading) {
    return (
      <Section bgColor="light">
        <div className="text-center">読み込み中...</div>
      </Section>
    );
  }

  // エラー状態の表示
  if (isError || !profileData) {
    return (
      <Section bgColor="light">
        <div className="text-center text-red-500">データの読み込みに失敗しました</div>
      </Section>
    );
  }
  
  return (
    <Section bgColor="light" id="contact">
      {/* セクション見出し */}
      <SectionHeading 
        title="お問い合わせ"
        subtitle="プロジェクトのご相談やお問い合わせはこちらから"
        centered
      />
      
      {/* コンタクト情報のグリッドレイアウト */}
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
  );
}
