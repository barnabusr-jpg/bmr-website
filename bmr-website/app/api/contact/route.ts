import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_TO || "barnabusr@outlook.com";
const FROM = process.env.CONTACT_FROM || "web@bmrsolutions.example";

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

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `BMR Solutions website inquiry from ${name}`,
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    return NextResponse.redirect(new URL("/thank-you", req.url), { status: 303 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
