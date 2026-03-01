import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import {
  htmlResponse,
  injectBase,
  injectCanonical,
  NOT_FOUND_HTML,
  PICSCHE_PUBLIC_ROOT,
} from "../_lib/htmlResponse";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cloudcrowd.cloud";

/** 許可する slug と対応するファイル・base */
const SLUG_MAP: Record<
  string,
  { file: string; base: string }
> = {
  term: { file: "term.html", base: "/products/PicSche/" },
  privacy: { file: "privacy.html", base: "/products/PicSche/" },
  support: { file: "support.html", base: "/products/PicSche/" },
  tokusho: {
    file: path.join("tokusho", "index.html"),
    base: "/products/PicSche/tokusho/",
  },
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await context.params;
  const segments = slug ?? [];

  if (segments.length === 0) {
    try {
      let html = await readFile(
        path.join(PICSCHE_PUBLIC_ROOT, "index.html"),
        "utf-8"
      );
      html = injectCanonical(html, `${SITE_URL}/products/PicSche`);
      return htmlResponse(html);
    } catch (e) {
      console.error(e);
      return htmlResponse(NOT_FOUND_HTML, 404);
    }
  }

  if (segments.length !== 1) {
    return htmlResponse(NOT_FOUND_HTML, 404);
  }

  const entry = SLUG_MAP[segments[0]];
  if (!entry) {
    return htmlResponse(NOT_FOUND_HTML, 404);
  }

  try {
    let html = await readFile(
      path.join(PICSCHE_PUBLIC_ROOT, entry.file),
      "utf-8"
    );
    html = injectBase(html, entry.base);
    return htmlResponse(html);
  } catch (e) {
    console.error(e);
    return htmlResponse(NOT_FOUND_HTML, 404);
  }
}
