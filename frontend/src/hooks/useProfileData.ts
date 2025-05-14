'use client';

import { useState, useEffect } from 'react';
import { ProfileData } from '@/types/profile';

export function useProfileData() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/profile.json');
        if (!response.ok) {
          throw new Error('プロフィールデータの取得に失敗しました');
        }
        const data = await response.json();
        setProfileData(data);
        setIsError(false);
      } catch (error) {
        console.error('プロフィールデータの取得エラー:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { profileData, isLoading, isError };
} 