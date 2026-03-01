import path from "path";
import { NextResponse } from "next/server";

const PICSCHE_HTML_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
} as const;

/** public/products/picsche の絶対パス（Route Handler から HTML を読む用） */
export const PICSCHE_PUBLIC_ROOT = path.join(
  process.cwd(),
  "public",
  "products",
  "picsche"
);

/** 404 用の最小 HTML（Content-Type: text/html と整合） */
export const NOT_FOUND_HTML =
  '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"/><title>Not Found</title></head><body><h1>404 Not Found</h1></body></html>';

/**
 * PicSche の HTML を返す際の共通ヘッダー。
 * セキュリティとキャッシュ方針を統一する。
 */
export function htmlResponse(html: string, status = 200): NextResponse {
  return new NextResponse(html, {
    status,
    headers: PICSCHE_HTML_HEADERS,
  });
}

/** 法定ページ用: 相対リンク・スクリプトを解決するため &lt;base&gt; を挿入する */
export function injectBase(html: string, baseHref: string): string {
  return html.replace(
    /(<head[^>]*>)/i,
    `$1\n  <base href="${baseHref}">`
  );
}

/** LP 用: &lt;head&gt; 直後に canonical を挿入する */
export function injectCanonical(html: string, canonicalUrl: string): string {
  return html.replace(
    /(<head[^>]*>)/i,
    `$1\n  <link rel="canonical" href="${canonicalUrl}"/>`
  );
}
