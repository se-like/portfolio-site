'use client';

import { useState, useEffect } from 'react';
import { ProfileData } from './types';
import FooterProfile from './FooterProfile';
import FooterNavigation from './FooterNavigation';
import FooterContact from './FooterContact';

export default function Footer() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('プロフィールデータの読み込みに失敗しました:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterProfile profileData={profileData} />
          <FooterNavigation />
          <FooterContact profileData={profileData} />
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {profileData?.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
