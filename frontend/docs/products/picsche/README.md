# PicSche 統合設計（Vercel ホスティング）

## 1. 概要

CloudCrowd 本サイト（https://www.cloudcrowd.cloud）の配下で、PicSche の LP と法定ページを次の URL で提供する。

| URL | 内容 | ソース |
|-----|------|--------|
| `/products/picsche` | ランディングページ | `public/products/picsche/index.html` |
| `/products/picsche/term` | 利用規約 | `public/products/picsche/term.html` |
| `/products/picsche/privacy` | プライバシーポリシー | `public/products/picsche/privacy.html` |
| `/products/picsche/support` | お問い合わせ | `public/products/picsche/support.html` |
| `/products/picsche/tokusho` | 特定商取引法に基づく表記 | `public/products/picsche/tokusho/index.html` |

静的アセット（画像・CSS・JS）は `public/products/picsche/` 以下に置き、同一オリジンでそのまま配信する。

## 2. 設計方針

- **単一ソース**: 配信する HTML はすべて `public/products/picsche/` 以下。ルートに重複ファイルを置かない。
- **単一 Route Handler**: 上記 5 ページは 1 本の Route Handler `app/products/picsche/[[...slug]]/route.ts` で扱う。slug に応じてファイルと `<base>` を決め、新規ページ追加はマッピング 1 行で済む。
- **HTML は Route Handler で返す**: Next.js の rewrite に依存せず、「この URL = この 1 枚の HTML」を保証する。
- **CSS は静的ビルド**: LP も tokusho も Tailwind CDN に頼らず、ビルド時に `public/products/picsche/picsche.css` を生成し、両方から参照する。
- **リンクは絶対パス（LP）**: LP 内のリンク・アセットは `/products/picsche/...` で統一する。法定ページは `<base>` で相対パスを解決する。
- **セキュリティヘッダー**: 返す HTML に `X-Content-Type-Options`, `X-Frame-Options` を付与する。
- **トレイリングスラッシュ**: next.config の `trailingSlash: false` により、Next.js が末尾スラッシュを除去して正規 URL にリダイレクトする。middleware では行わない。
- **404**: 存在しない slug や読み込み失敗時は、最小限の HTML（`NOT_FOUND_HTML`）を 404 で返す（Content-Type は text/html のまま）。
- **canonical**: LP 返却時に `<link rel="canonical" href="{SITE_URL}/products/picsche">` を挿入する。`SITE_URL` は `NEXT_PUBLIC_SITE_URL` または既定値。

## 3. ディレクトリ構成

```
public/products/picsche/
├── index.html          # LP（絶対パスで picsche.css, assets/, term 等を参照）
├── term.html
├── privacy.html
├── support.html
├── lang-switcher.js
├── picsche.css         # ビルド生成（Tailwind）。LP と tokusho で共有
├── assets/
└── tokusho/
    └── index.html      # 相対で ../picsche.css を参照。base で /products/picsche/tokusho/
```

## 4. ルーティング

- **正規 URL**: すべて小文字の `/products/picsche` および `/products/picsche/{term|privacy|support|tokusho}` のみ有効とする。大文字混じり（例: `/products/PicSche`）でのアクセスは 404 とする（URL は全て小文字に統一し、大文字からのリダイレクトは行わない）。
- **Route Handler**: `GET /products/picsche` および `GET /products/picsche/{term|privacy|support|tokusho}` はすべて `app/products/picsche/[[...slug]]/route.ts` が処理する。slug が空なら index.html + canonical、それ以外は `SLUG_MAP` に従い該当 HTML を読み、必要なら `<base>` を挿入して返す。未定義の slug やエラー時は 404（NOT_FOUND_HTML）。
- **トレイリングスラッシュ**: next.config の `trailingSlash: false` により、Next.js が `/products/picsche/` を `/products/picsche` にリダイレクトする。middleware で同様の 308 を行うと Next の正規化と競合してループするため、middleware では行わない。
- **静的ファイル**: `GET /products/picsche/assets/*`, `GET /products/picsche/picsche.css` は Next.js が `public/` からそのまま配信する。

### なぜ Route Handler か（rewrite でない理由）

- Next.js 15 の `rewrites` で `public/` 内の HTML に転送すると、開発環境で 404 になる事象があった。Route Handler でファイルを読み HTTP レスポンスとして返す方式で安定している。
- フルロード時に 1 枚の HTML として表示され、CSS が確実に適用される。

## 5. ビルド

- `npm run build` の先頭で `build:picsche-css` を実行する。
- `build:picsche-css`: Tailwind が `public/products/picsche/**/*.html` を content に、`public/products/picsche/picsche.css` を出力に指定して CSS を生成する（LP と tokusho のクラスを含む）。

## 6. 本サイトからのリンク（必須）

- トップの「PicSche」へのリンクは **必ず `<a href="/products/picsche">` とし、Next.js の `<Link>` を使わない**。`<Link>` だとクライアント遷移になり、返却された HTML が 1 枚のドキュメントとして表示されず、CSS が当たらない場合がある。`<a>` によるフルロードで LP を表示する。

## 7. Vercel 上の挙動

- Route Handler は Serverless Function として実行される。`public/products/picsche/*.html` はデプロイに含まれるため `readFile` で読み取れる。
- 静的ファイルは Vercel の CDN でキャッシュされる。HTML は `no-store` のためキャッシュされない。

## 8. 更新時の手順

- **文言変更**: `public/products/picsche/` 内の該当 HTML を編集。
- **スタイル変更**: 同上の HTML のクラスを変更し、`npm run build` で再ビルド（picsche.css が再生成される）。
- **新規ページ追加**:
  1. `public/products/picsche/` に HTML を追加（必要なら tokusho と同様に `../picsche.css` や base を考慮）。
  2. `app/products/picsche/[[...slug]]/route.ts` の `SLUG_MAP` に 1 行追加（`slug: { file: "path/to/file.html", base: "/products/picsche/..." }`）。Route の追加や新ファイルの作成は不要。

## 9. 設計判断の理由（想定される指摘への回答）

| 指摘 | 対応 |
|------|------|
| なぜ LP を React 化しないか | 既存の静的 LP をそのまま活かし、改修コストとバグリスクを抑える。コンテンツは静的であり React の恩恵が薄い。 |
| なぜ rewrite ではなく Route Handler か | Next.js 15 で rewrite 先を public 内 HTML にすると 404 になる事象があり、Route Handler の方が安定。 |
| 法定ページで &lt;base&gt; を使う理由 | term/privacy/support は相対リンクのみ。base 1 つで解決し、HTML の書き換えを避けられる。tokusho は `../` で assets 等を参照するため base を tokusho/ にしている。 |
| CSS を CDN にしない理由 | クライアントで JS が実行されない遷移では CDN の Tailwind が効かない場合がある。LP と tokusho とも静的 picsche.css に統一している。 |
| トレイリングスラッシュを 308 する理由 | 正規 URL を 1 つにし、SEO とリンクの一貫性を保つ。next.config の trailingSlash: false で Next.js が正規化。 |
| 404 を HTML で返す理由 | Content-Type が text/html のため、body も最低限の HTML にしておく。 |
| canonical を LP だけ入れる理由 | 検索エンジン向けに LP の正規 URL を明示するため。法定ページは必要に応じて同様に拡張可能。 |
| X-Frame-Options: SAMEORIGIN の理由 | 同一オリジンでの将来の埋め込みを許容しつつ、クリックジャッキングを防ぐ。 |
