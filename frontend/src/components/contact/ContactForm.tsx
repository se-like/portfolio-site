/**
 * お問い合わせフォームコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - フォーム入力フィールド（名前、メール、会社名、件名、メッセージ）
 * - フォーム送信状態の管理
 * - バリデーション（必須フィールド）
 * - 送信成功/エラー時のフィードバック表示
 * - ダークモード対応
 * - レスポンシブデザイン
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReCAPTCHA from 'react-google-recaptcha';
import { FormData, ContactFormProps } from '@/types/contact';

const formSchema = z.object({
  name: z.string()
    .min(1, 'お名前は必須です')
    .max(100, 'お名前は100文字以内で入力してください')
    .regex(/^[ぁ-んァ-ン一-龥a-zA-Z\s]+$/, 'お名前は日本語または英語で入力してください'),
  email: z.string()
    .min(1, 'メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください')
    .max(255, 'メールアドレスは255文字以内で入力してください'),
  company: z.string()
    .max(100, '会社名は100文字以内で入力してください')
    .optional(),
  subject: z.string()
    .min(1, 'お問い合わせ内容は必須です')
    .refine((val: string) => ['project', 'quote', 'question', 'other'].includes(val), {
      message: '無効なお問い合わせ内容です'
    }),
  message: z.string()
    .min(1, 'メッセージは必須です')
    .max(2000, 'メッセージは2000文字以内で入力してください'),
  recaptchaToken: z.string()
    .min(1, 'reCAPTCHAの検証が必要です')
});

export default function ContactForm({ onSubmit, isSubmitting = false, submitStatus = 'idle' }: ContactFormProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue, trigger } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      recaptchaToken: '',
    },
    mode: 'onChange',
  });

  const handleRecaptchaChange = (token: string | null) => {
    setValue('recaptchaToken', token || '');
    trigger('recaptchaToken');
  };

  const onSubmitForm = async (data: FormData) => {
    if (!data.recaptchaToken) {
      alert('reCAPTCHAの認証が必要です');
      return;
    }
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('送信エラー:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          会社名
        </label>
        <input
          type="text"
          id="company"
          {...register('company')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          {...register('subject')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">選択してください</option>
          <option value="project">プロジェクトの相談</option>
          <option value="quote">お見積り依頼</option>
          <option value="question">技術的な質問</option>
          <option value="other">その他</option>
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          メッセージ <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="flex justify-center">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          onChange={handleRecaptchaChange}
          data-testid="recaptcha"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </button>
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-md">
          送信が完了しました
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-md">
          送信に失敗しました
        </div>
      )}
    </form>
  );
} 