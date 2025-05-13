'use client';

import { useState, useEffect, useRef } from 'react';

interface ProfileData {
  name: string;
  age: number;
  gender: string;
  qualifications: string[];
  education: string;
  career: {
    company: string;
    period: string;
    role: string;
    description: string;
  }[];
  interests: string[];
  email: string;
  phone: string;
}

export function useProfileData() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    // StrictModeの二重レンダリングを防ぐ
    if (isMounted.current) return;
    isMounted.current = true;

    const fetchData = async () => {
      try {
        const response = await fetch('/profile.json');
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { profileData, isLoading, isError };
} 