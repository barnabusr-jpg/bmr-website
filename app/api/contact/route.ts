import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_TO || "barnabusr@outlook.com";
const FROM = process.env.CONTACT_FROM || "web@your-verified-domain.com";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `BMR Solutions website inquiry from ${name}`,
      replyTo: email as string,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.redirect(new URL("/thank-you", req.url), { status: 303 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
