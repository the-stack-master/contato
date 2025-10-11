/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { convertSanityFile } from "@/lib/convertSanityFile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const fileUrl = req.nextUrl.searchParams.get("url"); // expect file asset URL
  if (!fileUrl) {
    return NextResponse.json(
      { error: "No file URL provided" },
      { status: 400 }
    );
  }

  try {
    // Convert the file at this URL to HTML
    const html = await convertSanityFile(fileUrl);

    return NextResponse.json({ html });
  } catch (err: any) {
    console.error("Conversion failed:", err);
    return NextResponse.json(
      { error: "Conversion failed", details: err.message },
      { status: 500 }
    );
  }
}
