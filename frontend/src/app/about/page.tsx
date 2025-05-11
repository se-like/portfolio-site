import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Image from 'next/image';

export default function AboutPage() {
  // Career timeline data
  const careerTimeline = [
    {
      year: '2023 - 現在',
      title: 'コールセンターシステムの保守',
      description: '業務基盤更改によるコールセンターシステムの保守。仕様変更対応、保守、チームテックリード及びアプリ共通部品の開発、ユーザーサポートおよび障害調査を担当。Java、JavaScript、DB2を使用。'
    },
    {
      year: '2022 - 2023',
      title: 'コールセンターシステムの構築',
      description: '業務基盤更改によるコールセンターシステムの再構築、保守。基盤更改により発生した変更箇所における既存PGの移行ツール作製、チームテックリード及びアプリ共通部品の開発を担当。Perl、Java、JavaScript、DB2を使用。'
    },
    {
      year: '2021 - 2022',
      title: '販売管理システムの構築',
      description: '販売管理システムのバックエンドAPI開発。バックエンドAPIのI/F設計、基本設計書作成、画面・バッチ実装、UT/IT/ST、ユーザーサポートおよび障害調査を担当。PHPを使用。'
    },
    {
      year: '2020 - 2021',
      title: 'IoTデバイスからのセンシングデータ見える化システムの構築',
      description: 'IoTデバイスからのセンシングデータ見える化システムの構築。ユーザーIFについてのエンドユーザーとのシステム要件の検討・調整、基本設計書作成、画面・バッチ実装、UT/IT/ST、ユーザーサポートおよび障害調査を担当。JavaScript、SQL Server、CentOS、vue.js、node.jsを使用。'
    },
    {
      year: '2019 - 2020',
      title: 'BtoB向けポータルサイトの新規構築',
      description: 'BtoB向けポータルサイトの新規構築。ユーザーIFについてのエンドユーザーとのシステム要件の検討・調整、ベンダーコントロール、基本・詳細設計書作成、画面・バッチ実装、UT/IT/ST、ユーザーサポートおよび障害調査を担当。Java、JavaScript、PL/SQL、Oracle、Redhat、Spring、mybatis、thymeleafを使用。'
    }
  ];

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
                森田浩司、40歳。初級システムアドミニストレータ、基本情報処理技術者試験、ソフトウェア開発技術者の資格を保有しています。
              </p>
              <p>
                流通・小売業の販売管理システムが専門分野で、.NET C#、Javaなどの技術を得意としています。また、セキュリティシステムの構築・提案等の経験も有しています。
              </p>
              <p>
                システム構築では、開発・設計・サブリーダー・プロジェクトリーダーを経験しており、システム提案等も行ってきました。基本設計以降の工程を得意としています。
              </p>
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
            {careerTimeline.map((item, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -mt-2 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 bg-blue-500"></div>
                
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12'}`}>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
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
