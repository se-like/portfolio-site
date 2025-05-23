/**
 * ボタンコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - 複数のバリアント（primary, secondary, outline）
 * - 複数のサイズ（sm, md, lg）
 * - リンクとしての機能（href指定時）
 * - カスタムスタイリング（className指定）
 * - アクセシビリティ対応
 * - ホバー・フォーカス状態の視覚的フィードバック
 */

'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  href?: string;
  className?: string;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  href,
  className = '',
  ...props
}: ButtonProps) => {
  // 基本スタイルの定義
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // バリアント別のスタイル定義
  const variants = {
    primary: 'bg-gradient-to-l from-indigo-500/20 via-blue-400/20 to-cyan-300/20 text-white font-semibold shadow-lg hover:from-indigo-500/30 hover:via-blue-400/30 hover:to-cyan-300/30 hover:shadow-xl transition-all duration-300 border border-white/10 backdrop-blur-sm',
    secondary: 'bg-gray-600/90 text-white shadow-sm hover:bg-gray-700/90 hover:shadow-md transition-all duration-300',
    outline: {
      base: 'bg-gradient-to-l from-slate-500/20 via-gray-400/20 to-zinc-300/20 text-white font-semibold shadow-lg hover:from-slate-500/30 hover:via-gray-400/30 hover:to-zinc-300/30 hover:shadow-xl transition-all duration-300 border border-white/10 backdrop-blur-sm',
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    },
    gradient: 'bg-gradient-to-l from-slate-500/20 via-gray-400/20 to-zinc-300/20 text-white font-semibold shadow-lg hover:from-slate-500/30 hover:via-gray-400/30 hover:to-zinc-300/30 hover:shadow-xl transition-all duration-300 border border-white/10 backdrop-blur-sm',
  };

  // サイズ別のスタイル定義
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // スタイルの組み合わせ
  const buttonClasses = `
    ${baseStyles}
    ${variant === 'outline' ? variants.outline.base : variants[variant]}
    ${variant === 'outline' ? variants.outline[size] : sizes[size]}
    ${className}
  `.trim();

  // hrefが指定されている場合はLinkコンポーネントでラップ
  if (href) {
    return (
      <Link href={href}>
        <button className={buttonClasses} {...props}>
          {children}
        </button>
      </Link>
    );
  }

  // 通常のボタンとしてレンダリング
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
