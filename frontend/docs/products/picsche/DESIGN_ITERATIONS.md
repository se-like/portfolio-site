# PicSche 統合 — 設計の反復記録

ベストな設計になるまで、実装せずに設計のみを繰り返し検討する。

---

## 反復 1: 現状の整理

- Route Handler が 5 本（index, term, privacy, support, tokusho）
- LP は静的 CSS（picsche.css）、法定ページはインライン style または CDN
- 本サイトからのリンクは `<a>` でフルロード（確認済み）

**指摘**: 404 の body が "Not Found" なのに Content-Type が text/html で不整合。tokusho がまだ Tailwind CDN に依存しており LP と方針が揃っていない。

---

## 反復 2: 404 と tokusho の統一

- 404 は最小限の HTML（`<!DOCTYPE html>...`）を返し、Content-Type を text/html のまま正しい文書にする。
- tokusho/index.html は CDN をやめ、LP と同様に `/products/picsche/picsche.css`（または base からの相対）を参照する。Tailwind の content に tokusho が含まれているので、静的 CSS でスタイルは出る。

**結論**: 404 を HTML 化。tokusho を CDN 廃止・picsche.css 参照に変更。

---

## 反復 3: トレイリングスラッシュの一貫性

- 現状は LP のみ `/products/picsche/` → `/products/picsche` に 308 している。
- `/products/picsche/term/` などは未対応で、環境によっては 404 になる可能性がある。
- 方針: すべての PicSche パスでトレイリングスラッシュを付けない形に正規化する（308 リダイレクト）。Middleware で一括処理する。

**結論**: Middleware で `/products/picsche` および `/products/picsche/*` の末尾スラッシュを 308 で除去。

---

## 反復 4: Route Handler の集約

- 5 本の Route Handler は同じパターン（ファイル読む → base 挿入 or そのまま → htmlResponse）。
- 新規ページ追加時に route を 1 本ずつ増やすと漏れや重複が起きやすい。
- 方針: 1 本の Route Handler `[[...slug]]` で受け、slug に応じてファイルと base を決める。追加はマッピング 1 行で済む。

**結論**: `app/products/picsche/[[...slug]]/route.ts` に集約。slug が空なら index、`term` なら term.html、`tokusho` なら tokusho/index.html + base など。存在しない slug は 404。

---

## 反復 5: 正規 URL（canonical）の明示

- LP は検索エンジン向けに canonical を出した方がよい。
- 挿入場所: `<head>` 内。`NEXT_PUBLIC_SITE_URL` や定数でベース URL を決め、`<link rel="canonical" href="{SITE_URL}/products/picsche">` を挿入する。
- 法定ページは必要に応じて同様にできるが、まずは LP のみで十分とする。

**結論**: LP 返却時に canonical を 1 本挿入。ベース URL は環境変数または定数（デフォルト https://www.cloudcrowd.cloud）。

---

## 反復 6: 型・マッピングの明確化

- slug の取り得る値は `term` | `privacy` | `support` | `tokusho` と明文化する。
- マッピングは「slug → { file, base? }」の形にし、file は PICSCHE_PUBLIC_ROOT からの相対パス、base は省略時は挿入しない（index 用）。

**結論**: 定数マッピング + 型で許可 slug を定義。未許可 slug は 404。

---

## 反復 7: 共通レイヤー（_lib）の整理

- `htmlResponse(html, status)` はそのまま。
- 404 用の最小 HTML は `_lib` に定数 `NOT_FOUND_HTML` として持つ（lang="ja" を入れる）。
- `injectBase` はそのまま。canonical 用に `injectCanonical(html, canonicalUrl)` を追加する（`<head>` の直後に `<link rel="canonical" href="...">` を挿入）。

**結論**: NOT_FOUND_HTML 定数、injectCanonical を _lib に追加。

---

## 反復 8: キャッシュ

- HTML は no-store のまま（デプロイで内容が変わるため）。
- 404 は同じ不正 URL への再アクセスが多いため、短い s-maxage を付けてもよいが、実害は小さい。まずは no-store で統一してよい。

**結論**: 現状どおり。変更なし。

---

## 反復 9: ドキュメントと「リンクは必ず &lt;a&gt;」

- 本サイトから PicSche へは必ず `<a href="...">` とし、Next の `<Link>` にしない旨を設計書に明記する。理由: フルロードで 1 枚の HTML として表示するため。
- 新規ページの追加手順（HTML を public に置く → マッピングに 1 行追加）を設計書に書く。

**結論**: PICSCHE_INTEGRATION.md に「リンクは &lt;a&gt;」と追加手順を追記。

---

## 反復 10: 最終チェック

- 単一ソース: public/products/picsche/ のみ。✓
- HTML は Route Handler 1 本で返す。✓
- CSS は LP も tokusho も静的 picsche.css。✓
- 404 は HTML、トレイリングスラッシュは 308、canonical は LP に注入。✓
- 本サイトリンクは `<a>`。✓
- セキュリティヘッダー（X-Content-Type-Options, X-Frame-Options）は htmlResponse で共通。✓

**結論**: ここまでを「ベストな設計」として確定し、この内容で実装と報告を行う。
