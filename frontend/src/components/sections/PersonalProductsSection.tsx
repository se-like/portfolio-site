/**
 * 個人開発・プロダクトセクションコンポーネント
 *
 * 自分で企画・開発・リリースしたプロダクトを紹介するセクション。
 * 受託の「プロジェクト実績」と区別し、企画〜リリースまでの一気通貫をアピールする。
 */

'use client';

import Image from 'next/image';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { PersonalProduct } from '@/types/product';

const products: PersonalProduct[] = [
  {
    id: 'picsche',
    title: 'PicSche（ピクスケ）',
    subtitle: 'お便りAIカレンダー登録',
    description:
      '学校のお便りを撮るだけで、AIが予定を読み取りカレンダーに自動登録。手書き・表形式・月間カレンダーに対応し、子育て世帯の時短を実現。\niOS／Android対応。初回2回無料・月額無料のチャージ式。',
    imageUrl: '/images/products/picsche-banner.png',
    iconUrl: '/images/products/picsche-icon.png',
    technologies: ['AI', '画像認識', 'iOS', 'Android', '個人開発'],
    productUrl: '/products/picsche',
  },
];

export default function PersonalProductsSection() {
  return (
    <Section id="products" className="section" bgColor="light">
      <SectionHeading
        title="個人開発・プロダクト"
        subtitle="企画から設計・実装・リリースまで手がけたプロダクト"
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
        {products.map((product) => (
          <a
            key={product.id}
            href={product.productUrl}
            className="project-card card-hover block cursor-pointer no-underline text-inherit product-card"
          >
            <div className="project-image-container product-card-image-container">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 512px"
                className="project-image product-card-image"
                quality={85}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement?.classList.add(
                    'gradient-secondary',
                    'flex',
                    'items-center',
                    'justify-center'
                  );
                  const titleSpan = document.createElement('span');
                  titleSpan.className = 'text-white text-2xl font-bold px-4 text-center';
                  titleSpan.textContent = product.title;
                  target.parentElement?.appendChild(titleSpan);
                }}
              />
            </div>

            <div className="p-6">
              {product.subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {product.subtitle}
                </p>
              )}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {product.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {product.description
                  .replace(/([。、])(?=.)/g, '$1\n')
                  .split('\n')
                  .map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
              </p>

              <div className="flex flex-wrap gap-2">
                {product.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
