'use client';

import { useState, useEffect } from 'react';
import { ProfileData } from '@/types/profile';

// キャッシュの有効期限（1時間）
const CACHE_DURATION = 60 * 60 * 1000;

// キャッシュの型定義
interface CacheData {
  data: ProfileData;
  timestamp: number;
}

export function useProfileData() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // キャッシュの確認
        const cachedData = localStorage.getItem('profileData');
        if (cachedData) {
          const { data, timestamp }: CacheData = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setProfileData(data);
            setIsLoading(false);
            return;
          }
        }

        // キャッシュがない場合や期限切れの場合は新規取得
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error('プロフィールデータの取得に失敗しました');
        }
        const data = await response.json();
        
        // データをキャッシュに保存
        const cacheData: CacheData = {
          data,
          timestamp: Date.now()
        };
        localStorage.setItem('profileData', JSON.stringify(cacheData));
        
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