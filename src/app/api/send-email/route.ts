import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import rules from "@/data/server/rules.json";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { to, name, answers } = await req.json();
    const firstName = name ? name.split(' ')[0] : 'there';

    if (!to || !answers) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 });
    }

    const domainHits: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };

    rules.questions.forEach((q: any) => {
      // Map q01 to index 1, q02 to index 2, etc.
      const frontendId = parseInt(q.id.replace('q', ''), 10);
      const response = answers[frontendId];
      
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
      html: `<h2>Hello ${firstName},</h2><p>Results identified: ${signals.join(", ") || "None"}</p>`,
    };

    await sgMail.send(msg);
    return NextResponse.json({ success: true, signals });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
