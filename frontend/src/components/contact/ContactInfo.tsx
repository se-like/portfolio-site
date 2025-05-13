'use client';

import { ProfileData } from '@/components/layout/types';

interface ContactInfoProps {
  profileData: ProfileData | null;
}

export default function ContactInfo({ profileData }: ContactInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        連絡先情報
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              メールアドレス
            </p>
            <a 
              href={`mailto:${profileData?.email}`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {profileData?.email}
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              電話番号
            </p>
            <a 
              href={`tel:${profileData?.phone}`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {profileData?.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              GitHub
            </p>
            <a 
              href={profileData?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {profileData?.github?.replace('https://', '')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 