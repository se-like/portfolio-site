import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 共通 middleware。
 * URL 正規化・トレイリングスラッシュは next.config に委譲。
 */
function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export { middleware };
