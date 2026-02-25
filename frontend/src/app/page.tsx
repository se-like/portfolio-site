'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';

// ProjectsSectionを遅延読み込み
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-xl">読み込み中...</div>
    </div>
  )
});

// PersonalProductsSectionを遅延読み込み
const PersonalProductsSection = dynamic(
  () => import('@/components/sections/PersonalProductsSection'),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-xl">読み込み中...</div>
      </div>
    )
  }
);

// ContactSectionを遅延読み込み
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-xl">読み込み中...</div>
    </div>
  )
});

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <PersonalProductsSection />
      <ContactSection />
    </main>
  );
}
