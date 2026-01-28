import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import rules from "@/data/server/rules.json";

// Initialize using the key already present in your Vercel settings
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { to, firstName, answers } = await req.json();

    if (!to || !answers) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 });
    }

    // 1. Map internal domains to identify signal hits
    const domainHits: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };

    rules.questions.forEach((q: any) => {
      const response = answers[q.id];
      if (response === 'lower_mid' || response === 'bottom') {
        domainHits[q.domain]++;
      }
    });

    // 2. Identify Public Signal Categories
    const signals = [];
    if (domainHits.A > 0) signals.push("Expectation Continuity");
    if (domainHits.B > 0) signals.push("Decision Explainability");
    if (domainHits.C > 0) signals.push("Accountability Experience");
    if (domainHits.D > 0) signals.push("Adaptive Behavior");

    // 3. Dispatch the follow-up email via SendGrid
    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL || "hello@bmradvisory.co",
      subject: "Your Promise Gap Diagnostic Results",
      text: `Hello ${firstName}, your diagnostic identified the following signals: ${signals.join(", ")}.`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <p>Hello ${firstName},</p>
          <p>Your diagnostic responses indicate the following potential signal categories:</p>
          <ul>${signals.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true, signals });
  } catch (error: any) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
