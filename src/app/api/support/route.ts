/* eslint-disable @typescript-eslint/no-explicit-any */

// src/app/api/support/route.ts
import { NextRequest, NextResponse } from "next/server";
import { convertSanityFile } from "@/lib/convertSanityFile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "No document ID provided" },
      { status: 400 }
    );
  }

  try {
    const html = await convertSanityFile(id);
    return NextResponse.json({ html });
  } catch (err: any) {
    console.error("Conversion failed:", err);
    return NextResponse.json(
      { error: "Conversion failed", details: err.message },
      { status: 500 }
    );
  }
}
