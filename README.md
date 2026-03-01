# フリーランスシステムエンジニアのポートフォリオサイト

Next.js/Reactで構築されたフリーランスシステムエンジニア向けのポートフォリオサイトです。

## 機能

- レスポンシブデザイン（モバイル、タブレット、デスクトップ対応）
- ダークモード対応
- 複数ページ構成（ホーム、自己紹介、プロジェクト、スキル、お問い合わせ）
- Tailwind CSSによるモダンなUI
- お問い合わせフォーム

## 技術スタック

- **フロントエンド**: Next.js, React, TypeScript, Tailwind CSS
- **将来的なバックエンド**: Ruby on Rails（現在は未実装）

## 開発環境のセットアップ

### 前提条件

- Node.js (v18以上)
- npm (v9以上)

### インストール手順

1. リポジトリをクローンまたはダウンロードします
2. フロントエンドディレクトリに移動します:
   ```bash
   cd frontend
   ```
   （リポジトリルートで実行する場合）
3. 依存関係をインストールします:
   ```bash
   npm install
   ```
4. 開発サーバーを起動します:
   ```bash
   npm run dev
   ```
5. ブラウザで http://localhost:3000 にアクセスします

## カスタマイズ方法

### 画像の追加

画像ファイルは `public/images` ディレクトリに配置します。以下のサブディレクトリに分類されています：

1. **プロフィール画像**: `public/images/profile/`
   - `profile.jpg` - メインのプロフィール画像（推奨サイズ: 500x500px）
   - `profile-hero.jpg` - ヒーローセクション用の大きなプロフィール画像（推奨サイズ: 1200x800px）

2. **プロジェクト画像**: `public/images/projects/`
   - `project-1.jpg`, `project-2.jpg`, ... - プロジェクト一覧用の画像（推奨サイズ: 800x450px）
   - `project-1-detail.jpg`, `project-2-detail.jpg`, ... - プロジェクト詳細用の大きな画像
   - `project-1-additional-1.jpg`, `project-1-additional-2.jpg`, ... - プロジェクトの追加画像

3. **スキル関連画像**: `public/images/skills/`
   - 各技術のアイコンやスキルカテゴリーの画像

### コンテンツの編集

#### プロフィール情報の編集

プロフィール情報は以下のファイルで編集できます：

- ヒーローセクション: `src/components/sections/HeroSection.tsx`
- 自己紹介ページ: `src/app/about/page.tsx`

#### プロジェクト情報の編集

プロジェクト情報は以下のファイルで編集できます：

- プロジェクト一覧（ホームページ）: `src/components/sections/ProjectsSection.tsx`
- プロジェクト詳細ページ: `src/app/projects/page.tsx`

#### スキル情報の編集

スキル情報は以下のファイルで編集できます：

- スキル一覧（ホームページ）: `src/components/sections/SkillsSection.tsx`
- スキル詳細ページ: `src/app/skills/page.tsx`

#### お問い合わせ情報の編集

お問い合わせ情報は以下のファイルで編集できます：

- お問い合わせフォーム: `src/components/sections/ContactSection.tsx`
- お問い合わせページ: `src/app/contact/page.tsx`

## バックエンド実装について

現在はフロントエンドのみの実装ですが、将来的にRuby on Railsバックエンドを追加する場合は、以下の手順で実装できます：

1. Railsプロジェクトの作成：
```bash
rails new portfolio-backend --api
cd portfolio-backend
```

2. 必要なモデルの作成（例：プロジェクト、スキル、お問い合わせ）：
```bash
rails g model Project title:string description:text long_description:text technologies:text year:string client:string role:string
rails g model Skill name:string icon:string level:integer description:text category:string
rails g model Contact name:string email:string company:string subject:string message:text
```

3. APIエンドポイントの実装：
```bash
rails g controller api/v1/Projects
rails g controller api/v1/Skills
rails g controller api/v1/Contacts
```

4. フロントエンドとバックエンドの接続：
   - Next.jsのAPIルートを使用してRailsバックエンドと通信
   - または、フロントエンドから直接Railsバックエンドに通信

## デプロイ方法

### フロントエンド

1. **Vercel**（推奨）:
   - GitHubリポジトリをVercelにインポート
   - 自動的にデプロイされます

2. **Netlify**:
   - GitHubリポジトリをNetlifyにインポート
   - ビルドコマンド: `cd frontend && npm run build`
   - 公開ディレクトリ: `frontend/.next`

3. **静的エクスポート**:
   - `next.config.ts`を編集して静的エクスポートを有効にする
   - `npm run build && npm run export`を実行
   - `out`ディレクトリを任意のホスティングサービスにアップロード

### バックエンド（将来的に実装する場合）

1. **Heroku**:
   - Heroku CLIをインストール
   - `heroku create`を実行
   - `git push heroku main`を実行

2. **AWS**:
   - Elastic Beanstalkを使用
   - または、EC2インスタンスを設定

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
