import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import rules from "@/data/server/rules.json";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: Request) {
  try {
    // FIXED: Corrected destructuring to match frontend 'name'
    const { to, name, answers } = await req.json();
    const firstName = name ? name.split(' ')[0] : 'there';

    if (!to || !answers) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 });
    }

    const domainHits: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };

    rules.questions.forEach((q: any) => {
      const response = answers[q.id];
      // FIXED: Matching frontend response strings
      if (response === 'Disagree' || response === 'Strongly Disagree') {
        domainHits[q.domain]++;
      }
    });

    const signals = [];
    if (domainHits.A > 0) signals.push("Expectation Continuity");
    if (domainHits.B > 0) signals.push("Decision Explainability");
    if (domainHits.C > 0) signals.push("Accountability Experience");
    if (domainHits.D > 0) signals.push("Adaptive Behavior");

    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL || "hello@bmradvisory.co",
      subject: "Your Promise Gap Diagnostic Results",
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2>Hello ${firstName},</h2>
          <p>Thank you for completing the Promise Gap Diagnostic. Based on your responses, we have identified signals in the following categories:</p>
          <ul style="background: #f4f4f4; padding: 20px; border-left: 4px solid #14b8a6; list-style: none;">
            ${signals.length > 0 ? signals.map(s => `<li style="margin-bottom: 10px; font-weight: bold;">• ${s}</li>`).join('') : "<li>No immediate critical signals identified.</li>"}
          </ul>
          <p>These signals suggest areas where your AI transformation may be leaking value or trust. We recommend a deeper review of these specific domains.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">BMR Strategic Advisory</p>
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
