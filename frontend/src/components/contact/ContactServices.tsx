'use client';

export default function ContactServices() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        対応可能な業務
      </h3>
      
      <ul className="space-y-3 text-gray-600 dark:text-gray-300">
        <li className="flex items-start">
          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          販売管理システムの開発（.NET、Java）
        </li>
        <li className="flex items-start">
          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          基幹システムの設計・開発・保守
        </li>
        <li className="flex items-start">
          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          プロジェクトマネジメント
        </li>
      </ul>
    </div>
  );
} 