import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** PicSche 配下のトレイリングスラッシュを 308 で正規化（正規 URL を 1 つに） */
function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith("/products/picsche/") &&
    pathname.length > "/products/picsche/".length &&
    pathname.endsWith("/")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/products/picsche/") {
    const url = request.nextUrl.clone();
    url.pathname = "/products/picsche";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export { middleware };
