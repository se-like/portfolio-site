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
import Button from '@/components/ui/Button';
import { FormData, ContactFormProps } from '@/types/contact';

export default function ContactForm({
  onSubmit,
  isSubmitting,
  submitStatus,
}: ContactFormProps) {
  // フォームデータの状態管理
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  /**
   * フォーム送信ハンドラー
   * @param e - フォームイベント
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  /**
   * 入力フィールド変更ハンドラー
   * @param e - 入力イベント
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 名前入力フィールド */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          お名前
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* メールアドレス入力フィールド */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* 会社名入力フィールド */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          会社名
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* 件名入力フィールド */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          件名
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* メッセージ入力フィールド */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          メッセージ
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* 送信ボタン */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </Button>
      </div>

      {/* 送信成功メッセージ */}
      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-md">
          メッセージを送信しました。ありがとうございます。
        </div>
      )}

      {/* エラーメッセージ */}
      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-md">
          送信に失敗しました。もう一度お試しください。
        </div>
      )}
    </form>
  );
} 