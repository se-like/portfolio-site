import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FooterNavigation() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
        ナビゲーション
      </h3>
      <ul className="space-y-2">
        <li>
          <Link
            href="/"
            className={`text-base ${
              isActive('/')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            ホーム
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`text-base ${
              isActive('/about')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            プロフィール
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className={`text-base ${
              isActive('/projects')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            プロジェクト
          </Link>
        </li>
        <li>
          <Link
            href="/skills"
            className={`text-base ${
              isActive('/skills')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            スキル
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`text-base ${
              isActive('/contact')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            お問い合わせ
          </Link>
        </li>
      </ul>
    </div>
  );
} 