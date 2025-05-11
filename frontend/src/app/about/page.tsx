'use client';

import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProfileData {
  name: string;
  age: number;
  gender: string;
  qualifications: string[];
  education: string;
  available_from: string;
  station: string;
  specialties: {
    business: string;
    technology: string[];
    role: string;
  };
  pr: string;
  projects: any[];
}

export default function AboutPage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">データの読み込みに失敗しました</div>
      </div>
    );
  }

  // プロジェクトを時系列でソート
  const sortedProjects = [...profileData.projects].sort((a, b) => {
    return b.period.localeCompare(a.period);
  });

  return (
    <>
      {/* Profile Section */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading 
              title="プロフィール"
              subtitle="フリーランスシステムエンジニアとしての経歴と専門分野"
            />
            <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                {profileData.name}、{profileData.age}歳。{profileData.qualifications.join('、')}の資格を保有しています。
              </p>
              <p>
                {profileData.specialties.business}が専門分野で、{profileData.specialties.technology.join('、')}などの技術を得意としています。
              </p>
              <p>
                {profileData.pr}
              </p>
              <div className="mt-4 space-y-2">
                <p className="flex items-center">
                  <span className="font-medium w-24">学歴:</span>
                  {profileData.education}
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-24">最寄駅:</span>
                  {profileData.station}
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-24">稼働開始:</span>
                  {profileData.available_from}
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 dark:opacity-20"></div>
            <div className="absolute inset-0 bg-white dark:bg-gray-800">
              {/* Fallback icon */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                <svg className="h-32 w-32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              
              {/* Profile image */}
              <div className="relative w-full h-full">
                <Image 
                  src="/images/profile/profile.jpg" 
                  alt="プロフィール写真" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Career Timeline Section */}
      <Section bgColor="light">
        <SectionHeading 
          title="経歴"
          subtitle="これまでのキャリアパス"
          centered
        />
        
        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900"></div>
          
          <div className="space-y-12">
            {sortedProjects.map((project, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -mt-2 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 bg-blue-500"></div>
                
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12'}`}>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      {project.period}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 text-sm font-medium text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        {project.role}
                      </span>
                      {project.team_size && (
                        <span className="px-3 py-1 text-sm font-medium text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-900/30 rounded-full">
                          チームサイズ: {project.team_size}名
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.languages.map((lang: string, langIndex: number) => (
                        <span 
                          key={langIndex}
                          className="px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Personal Interests Section */}
      <Section>
        <SectionHeading 
          title="趣味・関心"
          subtitle="プロフェッショナルな側面以外の私"
          centered
        />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              技術書と学習
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              新しい技術やプログラミング言語について学ぶことが好きです。技術書を読んだり、オンラインコースを受講したりして、常にスキルアップを心がけています。
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🏃‍♂️</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ランニング
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              週に3回のランニングを日課にしています。体を動かすことでリフレッシュし、新しいアイデアが浮かぶことも多いです。年に1回はハーフマラソンに参加しています。
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">✈️</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              旅行
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              新しい場所を訪れ、異なる文化に触れることが好きです。旅行を通じて視野を広げ、グローバルな視点でのシステム開発に活かしています。
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
