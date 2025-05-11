import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

interface Skill {
  name: string;
  icon: string;
  level: number;
  description: string;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export default function SkillsPage() {
  const skillCategories: SkillCategory[] = [
    {
      title: 'プログラミング言語',
      description: '長年の経験を通じて習得した各種プログラミング言語のスキルです。特に.NET C#とJavaを中心に、多様な言語での開発経験があります。',
      skills: [
        { 
          name: '.NET C#', 
          icon: '🔷', 
          level: 90,
          description: '.NET C#を用いた業務システム開発の豊富な経験があります。小売業の販売管理システムや基幹システムの構築を多数手がけてきました。'
        },
        { 
          name: 'Java', 
          icon: '☕', 
          level: 85,
          description: 'Javaを使用したバックエンド開発の経験があります。特にBtoB向けポータルサイトやコールセンターシステムの開発で活用しました。'
        },
        { 
          name: 'JavaScript', 
          icon: '🟨', 
          level: 80,
          description: 'JavaScriptを用いたフロントエンド開発の経験があります。Vue.jsやNode.jsと組み合わせて、モダンなウェブアプリケーションを構築しました。'
        },
        { 
          name: 'PHP', 
          icon: '🐘', 
          level: 75,
          description: 'PHPを使用した販売管理システムのバックエンドAPI開発の経験があります。'
        },
        { 
          name: 'PL/SQL', 
          icon: '📊', 
          level: 85,
          description: 'Oracle、SQL Serverなどのデータベースと連携したPL/SQLの開発経験が豊富です。複雑なデータ処理やストアドプロシージャの実装が可能です。'
        },
        { 
          name: 'Perl', 
          icon: '🐪', 
          level: 70,
          description: 'コールセンターシステムの再構築において、既存PGの移行ツール作製にPerlを活用しました。'
        }
      ]
    },
    {
      title: 'フレームワーク・ツール',
      description: '各種フレームワークやツールを活用して、効率的かつ高品質なシステム開発を実現します。',
      skills: [
        { 
          name: '.NET Framework', 
          icon: '🔷', 
          level: 90,
          description: '.NET Frameworkを用いた業務アプリケーション開発の豊富な経験があります。特に小売業の販売管理システムや基幹システムの構築で活用しました。'
        },
        { 
          name: 'ASP.NET', 
          icon: '🌐', 
          level: 85,
          description: 'ASP.NETを用いたウェブアプリケーション開発の経験があります。イベント案内システムなどの構築で活用しました。'
        },
        { 
          name: 'Spring', 
          icon: '🍃', 
          level: 75,
          description: 'Javaのフレームワークであるspringを用いたBtoB向けポータルサイトの開発経験があります。'
        },
        { 
          name: 'Vue.js', 
          icon: '🟩', 
          level: 80,
          description: 'Vue.jsを用いたフロントエンド開発の経験があります。IoTデータ見える化システムの構築で活用しました。'
        },
        { 
          name: 'Node.js', 
          icon: '🟢', 
          level: 75,
          description: 'Node.jsを用いたバックエンド開発の経験があります。IoTデータ見える化システムの構築で活用しました。'
        },
        { 
          name: 'Visual Studio', 
          icon: '🔨', 
          level: 90,
          description: 'Visual Studioを用いた.NET開発の豊富な経験があります。効率的な開発環境の構築とデバッグが可能です。'
        }
      ]
    },
    {
      title: 'データベース',
      description: '各種データベースの設計・実装・運用経験があります。適切なデータモデリングとパフォーマンス最適化を得意としています。',
      skills: [
        { 
          name: 'Oracle', 
          icon: '🔴', 
          level: 90,
          description: 'Oracleデータベースを用いた大規模システムの開発経験が豊富です。小売業の販売管理システムや基幹システムで活用しました。'
        },
        { 
          name: 'SQL Server', 
          icon: '🔵', 
          level: 85,
          description: 'SQL Serverを用いたデータベース設計と実装の経験があります。IoTデータ見える化システムなどで活用しました。'
        },
        { 
          name: 'PostgreSQL', 
          icon: '🐘', 
          level: 75,
          description: 'PostgreSQLを用いたデータベース開発の経験があります。マーケティングポータルサイトの改修で活用しました。'
        },
        { 
          name: 'DB2', 
          icon: '📊', 
          level: 70,
          description: 'DB2を用いたデータベース操作の経験があります。コールセンターシステムの開発で活用しました。'
        }
      ]
    },
    {
      title: '業務知識・役割',
      description: 'システム開発における様々な役割と業務知識を持ち、プロジェクト全体の成功に貢献します。',
      skills: [
        { 
          name: '流通・小売業', 
          icon: '🛒', 
          level: 95,
          description: '流通・小売業の販売管理システムや基幹システムの開発経験が豊富です。業界特有の業務フローや要件を深く理解しています。'
        },
        { 
          name: 'プロジェクトリーダー', 
          icon: '👨‍💼', 
          level: 85,
          description: 'プロジェクトリーダーとして複数のプロジェクトを成功に導いた経験があります。顧客との要件調整やチームマネジメントを得意としています。'
        },
        { 
          name: '基本設計', 
          icon: '📝', 
          level: 90,
          description: '基本設計フェーズでの要件定義や機能設計の豊富な経験があります。顧客の要望を的確に捉え、実現可能な設計に落とし込むことができます。'
        },
        { 
          name: '詳細設計', 
          icon: '📋', 
          level: 90,
          description: '詳細設計フェーズでの画面設計やデータベース設計、処理フローの設計経験が豊富です。実装を見据えた具体的かつ明確な設計が可能です。'
        },
        { 
          name: 'テスト', 
          icon: '🧪', 
          level: 85,
          description: 'UT/IT/STなど各種テストフェーズでの経験が豊富です。効率的かつ効果的なテスト計画の立案と実施が可能です。'
        },
        { 
          name: 'ユーザーサポート', 
          icon: '🤝', 
          level: 80,
          description: 'システム導入後のユーザーサポートや障害調査の経験があります。ユーザーの視点に立った丁寧なサポートを提供できます。'
        }
      ]
    },
    {
      title: 'OS・インフラ',
      description: '各種OSやインフラ環境での開発・運用経験があります。適切な環境構築とパフォーマンス最適化を実現します。',
      skills: [
        { 
          name: 'Windows', 
          icon: '🪟', 
          level: 90,
          description: 'Windows環境での開発経験が豊富です。.NET開発を中心に、多くのプロジェクトでWindows環境を活用してきました。'
        },
        { 
          name: 'CentOS', 
          icon: '🐧', 
          level: 75,
          description: 'CentOS環境でのシステム開発経験があります。IoTデータ見える化システムの構築で活用しました。'
        },
        { 
          name: 'Redhat', 
          icon: '🔴', 
          level: 75,
          description: 'Redhat環境でのシステム開発経験があります。BtoB向けポータルサイトの構築で活用しました。'
        },
        { 
          name: 'GitHub/GitLab', 
          icon: '🔄', 
          level: 80,
          description: 'GitHubやGitLabを用いたバージョン管理の経験があります。チーム開発での効率的なコード管理が可能です。'
        },
        { 
          name: 'Redmine', 
          icon: '📋', 
          level: 75,
          description: 'Redmineを用いたプロジェクト管理の経験があります。タスク管理や進捗管理を効率的に行うことができます。'
        }
      ]
    }
  ];

  return (
    <>
      <Section>
        <SectionHeading 
          title="スキル・技術"
          subtitle="長年の経験を通じて習得した技術スタックとスキルセット"
        />
        
        <div className="mt-8 space-y-4 text-gray-600 dark:text-gray-300">
          <p>
            フロントエンド開発からバックエンド、インフラストラクチャまで幅広い技術スタックを習得しています。常に新しい技術トレンドをキャッチアップし、プロジェクトに最適なソリューションを提供することを心がけています。
          </p>
          <p>
            技術選定においては、「最新だから」ではなく「プロジェクトの要件に最適か」を基準に判断します。長期的な保守性、スケーラビリティ、チームの習熟度などを総合的に考慮した技術スタックの提案が可能です。
          </p>
        </div>
      </Section>

      {skillCategories.map((category, index) => (
        <Section key={index} bgColor={index % 2 === 0 ? 'light' : 'white'}>
          <SectionHeading 
            title={category.title}
            subtitle={category.description}
          />
          
          <div className="mt-12 space-y-12">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full text-3xl">
                    {skill.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {skill.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 md:ml-4">
                        熟練度: {skill.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                      <div 
                        className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}

      <Section bgColor="light">
        <SectionHeading 
          title="継続的な学習"
          subtitle="技術の進化に合わせて常にスキルアップを続けています"
          centered
        />
        
        <div className="mt-8 max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-300">
          <p className="mb-6">
            技術の世界は常に進化しています。最新のトレンドやベストプラクティスを学び続けることで、クライアントに最高品質のソリューションを提供できるよう努めています。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                技術書・オンラインコース
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                定期的に技術書を読み、Udemyなどのオンラインコースで新しい技術を学んでいます。
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                コミュニティ参加
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                技術カンファレンスやミートアップに参加し、他のエンジニアと知見を共有しています。
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🧪</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                個人プロジェクト
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                新しい技術を試すための個人プロジェクトに取り組み、実践的なスキルを磨いています。
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
