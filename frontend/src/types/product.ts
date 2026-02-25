/**
 * 個人開発・プロダクト用の型定義
 */

export interface PersonalProduct {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  iconUrl?: string;
  technologies: string[];
  productUrl: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
}
