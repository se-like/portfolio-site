import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export default function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      title: 'プログラミング言語',
      skills: [
        { name: '.NET C#', icon: '🔷', level: 90 },
        { name: 'Java', icon: '☕', level: 85 },
        { name: 'JavaScript', icon: '🟨', level: 80 },
        { name: 'PHP', icon: '🐘', level: 75 },
        { name: 'PL/SQL', icon: '📊', level: 85 },
      ]
    },
    {
      title: 'フレームワーク・ツール',
      skills: [
        { name: '.NET Framework', icon: '🔷', level: 90 },
        { name: 'ASP.NET', icon: '🌐', level: 85 },
        { name: 'Spring', icon: '🍃', level: 75 },
        { name: 'Vue.js', icon: '🟩', level: 80 },
        { name: 'Node.js', icon: '🟢', level: 75 },
      ]
    },
    {
      title: 'データベース',
      skills: [
        { name: 'Oracle', icon: '🔴', level: 90 },
        { name: 'SQL Server', icon: '🔵', level: 85 },
        { name: 'PostgreSQL', icon: '🐘', level: 75 },
        { name: 'DB2', icon: '📊', level: 70 },
      ]
    },
    {
      title: '業務知識・役割',
      skills: [
        { name: '流通・小売業', icon: '🛒', level: 95 },
        { name: 'プロジェクトリーダー', icon: '👨‍💼', level: 85 },
        { name: '基本設計', icon: '📝', level: 90 },
        { name: '詳細設計', icon: '📋', level: 90 },
        { name: 'テスト', icon: '🧪', level: 85 },
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
