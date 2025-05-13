import { ProfileData } from './types';

interface FooterContactProps {
  profileData: ProfileData | null;
}

export default function FooterContact({ profileData }: FooterContactProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
        連絡先
      </h3>
      <ul className="space-y-2">
        <li>
          <a
            href={`mailto:${profileData?.email}`}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            {profileData?.email}
          </a>
        </li>
        <li>
          <a
            href={`tel:${profileData?.phone?.replace(/-/g, '')}`}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            {profileData?.phone}
          </a>
        </li>
      </ul>
    </div>
  );
} 