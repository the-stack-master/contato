import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/sanityServer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const doc = {
      _type: "newsletterSubscription",
      email,
      status: "active",
      subscribedAt: new Date().toISOString(),
    };

    await serverClient.create(doc);

    return NextResponse.json({ message: "Subscription successful" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: `Something went wrong ${err}` },
      { status: 500 }
    );
  }
}
