import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { email } = (await request.json()) as { email?: string };

  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "A valid email is required" }, { status: 400 });
  }

  try {
    await subscribeToNewsletter(email);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to subscribe to newsletter", err);
    return NextResponse.json({ message: "Could not subscribe. Please try again." }, { status: 500 });
  }
}
