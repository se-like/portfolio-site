import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

/** プロジェクト・プロフィールデータ（public/projects.json）を返す */
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "projects.json");
    const data = await readFile(filePath, "utf-8");
    const json = JSON.parse(data);
    return NextResponse.json(json, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load projects data" },
      { status: 500 }
    );
  }
}
