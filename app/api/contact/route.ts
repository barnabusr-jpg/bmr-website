import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";           // ensure Node runtime
export const dynamic = "force-dynamic";    // avoid static optimization

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = String(formData.get("name") || "").slice(0, 200);
  const email = String(formData.get("email") || "").slice(0, 200);
  const message = String(formData.get("message") || "").slice(0, 5000);

  // Basic validation + guard against header injection
  const unsafe = /\r|\n|%0a|%0d/i.test(name) || /\r|\n|%0a|%0d/i.test(email);
  if (!name || !email || !message || unsafe) {
    return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
  }

  // Lazy-init Resend so build doesn’t explode when key is missing
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY");
    // Still succeed UX-wise: redirect to thank-you so bots don’t learn about errors
    return NextResponse.redirect(new URL("/thank-you", req.url), { status: 303 });
  }
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM || "web@your-verified-domain.com",
      to: process.env.CONTACT_TO || "barnabusr@outlook.com",
      subject: `BMR Solutions website inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    return NextResponse.redirect(new URL("/thank-you", req.url), { status: 303 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
