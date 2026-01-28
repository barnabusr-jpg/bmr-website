import { NextResponse } from "next/server";
import { Resend } from "resend";
// This import is safe because it is on the server side
import rules from "@/data/server/rules.json"; 

const resend = new Resend(process.env.RESEND_API_KEY);

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
      // Logic: lower_mid or bottom indicates a signal presence
      if (response === 'lower_mid' || response === 'bottom') {
        domainHits[q.domain]++;
      }
    });

    // 2. Identify Public Signal Categories for the Results UI
    const signals = [];
    if (domainHits.A > 0) signals.push("Expectation Continuity");
    if (domainHits.B > 0) signals.push("Decision Explainability");
    if (domainHits.C > 0) signals.push("Accountability Experience");
    if (domainHits.D > 0) signals.push("Adaptive Behavior");

    // 3. Dispatch the follow-up email
    await resend.emails.send({
      from: "BMR Advisory <hello@bmradvisory.co>",
      to: [to],
      subject: "Your Promise Gap Diagnostic Results", //
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <p>Hello ${firstName},</p>
          <p>Thank you for completing the Promise Gap Diagnostic.</p>
          <p>Your responses have been received and are being reviewed. As a reminder, this diagnostic is designed to surface early signals only. It does not assess maturity, assign scores, or provide recommendations.</p>
          <p>If your responses suggest patterns that warrant deeper exploration, we will follow up within 48 hours to discuss what types of signals appeared and whether further evaluation would be useful.</p>
          <p>No action is required unless you choose to proceed.</p>
          <p>Best regards,</p>
          [cite_start]<p><strong>BMR Solutions Strategic Advisory for Responsible AI</strong> [cite: 20]</p>
        </div>
      `,
    });

    // 4. Return only the signal names to the frontend
    return NextResponse.json({ success: true, signals });
    
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
