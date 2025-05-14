import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { SkillCategory } from '@/types/skill';

export default function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      title: 'プログラミング言語',
      description: '長年の経験を通じて習得した各種プログラミング言語のスキルです。特に.NET C#とJavaを中心に、多様な言語での開発経験があります。',
      skills: [
        { name: '.NET C#', icon: '🔷', level: 90, description: '.NET C#を用いた業務システム開発の豊富な経験があります。' },
        { name: 'Java', icon: '☕', level: 85, description: 'JavaによるWebアプリケーションや業務システムの開発経験。' },
        { name: 'JavaScript', icon: '🟨', level: 80, description: 'フロントエンド・バックエンド両方でのJavaScript活用経験。' },
        { name: 'PHP', icon: '🐘', level: 75, description: 'WebサイトやAPI開発でのPHP利用経験。' },
        { name: 'PL/SQL', icon: '📊', level: 85, description: 'Oracleデータベースのストアドプロシージャ開発経験。' },
      ]
    },
    {
      title: 'フレームワーク・ツール',
      description: '主要なフレームワークや開発ツールの利用経験。',
      skills: [
        { name: '.NET Framework', icon: '🔷', level: 90, description: '.NET Frameworkを用いた業務アプリケーション開発。' },
        { name: 'ASP.NET', icon: '🌐', level: 85, description: 'Webアプリケーションの構築経験。' },
        { name: 'Spring', icon: '🍃', level: 75, description: 'JavaのSpringフレームワークを用いた開発経験。' },
        { name: 'Vue.js', icon: '🟩', level: 80, description: 'SPA開発やUI構築でのVue.js活用。' },
        { name: 'Node.js', icon: '🟢', level: 75, description: 'サーバーサイドJavaScript開発経験。' },
      ]
    },
    {
      title: 'データベース',
      description: '各種データベースの設計・運用・開発経験。',
      skills: [
        { name: 'Oracle', icon: '🔴', level: 90, description: '大規模業務システムでのOracle利用経験。' },
        { name: 'SQL Server', icon: '🔵', level: 85, description: '販売管理システム等でのSQL Server活用。' },
        { name: 'PostgreSQL', icon: '🐘', level: 75, description: '中小規模システムでのPostgreSQL利用経験。' },
        { name: 'DB2', icon: '📊', level: 70, description: 'レガシーシステムでのDB2運用経験。' },
      ]
    },
    {
      title: '業務知識・役割',
      description: '業務知識やプロジェクト内での役割に関するスキル。',
      skills: [
        { name: '流通・小売業', icon: '🛒', level: 95, description: '流通・小売業の業務知識に精通。' },
        { name: 'プロジェクトリーダー', icon: '👨‍💼', level: 85, description: 'プロジェクトリーダーとしてのマネジメント経験。' },
        { name: '基本設計', icon: '📝', level: 90, description: '要件定義から基本設計まで一貫して担当。' },
        { name: '詳細設計', icon: '📋', level: 90, description: '詳細設計書の作成やレビュー経験。' },
        { name: 'テスト', icon: '🧪', level: 85, description: '各種テスト工程の計画・実施経験。' },
      ]
    }
  ];

  return (
    <Section bgColor="white" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading 
          title="スキル・技術"
          subtitle="長年の経験を通じて習得した技術スタックとスキルセット"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="mr-3 text-2xl">{skill.icon}</span>
                        <span className="font-medium text-gray-900">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
