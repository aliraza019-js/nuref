import { NextRequest, NextResponse } from "next/server";
import { sendSalesInquiry } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { name, email, company, message } = (await request.json()) as {
    name?: string;
    email?: string;
    company?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ message: "Name, email, and message are required" }, { status: 400 });
  }

  try {
    await sendSalesInquiry({ name, email, company, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send sales inquiry", err);
    return NextResponse.json({ message: "Failed to send message. Please try again." }, { status: 500 });
  }
}
