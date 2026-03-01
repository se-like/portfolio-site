import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** PicSche 配下のトレイリングスラッシュを 308 で正規化（正規 URL を 1 つに） */
function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith("/products/PicSche/") &&
    pathname.length > "/products/PicSche/".length &&
    pathname.endsWith("/")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/products/PicSche/") {
    const url = request.nextUrl.clone();
    url.pathname = "/products/PicSche";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export { middleware };
