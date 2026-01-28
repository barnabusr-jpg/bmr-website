import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import rules from "@/data/server/rules.json";

// Initialize using the key from your Vercel settings
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: Request) {
  try {
    // 1. Parse incoming data (Fixed 'name' mapping from frontend)
    const { to, name, answers } = await req.json();
    const firstName = name ? name.split(' ')[0] : 'there';

    if (!to || !answers) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 });
    }

    // 2. Map internal domains (A, B, C, D) to identify signal hits
    const domainHits: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };

    rules.questions.forEach((q: any) => {
      /* FIXED ID MAPPING: 
         Converts JSON string ID (e.g., "q01") to match frontend numeric key (e.g., 1) 
      */
      const frontendId = parseInt(q.id.replace('q', ''), 10);
      const response = answers[frontendId];

      /* FIXED SIGNAL DETECTION: 
         Triggers a hit if the user selected a negative response 
      */
      if (response === 'Disagree' || response === 'Strongly Disagree') {
        domainHits[q.domain]++;
      }
    });

    // 3. Identify Public Signal Categories for the email
    const signals = [];
    if (domainHits.A > 0) signals.push("Expectation Continuity");
    if (domainHits.B > 0) signals.push("Decision Explainability");
    if (domainHits.C > 0) signals.push("Accountability Experience");
    if (domainHits.D > 0) signals.push("Adaptive Behavior");

    // 4. Dispatch the professional branded email via SendGrid
    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL || "hello@bmradvisory.co",
      subject: "Your Promise Gap Diagnostic Results",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
          <div style="padding: 20px; border-bottom: 2px solid #14b8a6;">
            <h1 style="color: #111827; font-size: 24px; margin: 0;">Promise Gap Diagnostic Results</h1>
          </div>
          <div style="padding: 30px 20px;">
            <p style="font-size: 16px;">Hello ${firstName},</p>
            <p style="font-size: 16px; line-height: 1.6;">Thank you for completing the assessment. Based on your inputs, we have identified primary risk signals in these categories:</p>
            
            <div style="margin: 25px 0; padding: 20px; background-color: #f9fafb; border-left: 4px solid #14b8a6;">
              <ul style="margin: 0; padding: 0; list-style-type: none;">
                ${signals.length > 0 
                  ? signals.map(s => `<li style="margin-bottom: 12px; font-weight: 600; color: #14b8a6;">• ${s}</li>`).join('') 
                  : `<li style="color: #6b7280;">No immediate critical signals identified in this baseline assessment.</li>`
                }
              </ul>
            </div>

            <p style="font-size: 16px; line-height: 1.6;">These signals indicate where your transformation may be leaking trust or value. Identifying these points early is the first step toward building a more responsible AI strategy.</p>
          </div>
          <div style="padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
            <p>&copy; 2026 BMR Strategic Advisory. All rights reserved.</p>
          </div>
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
