import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const DIAGNOSTIC_MAPPING: Record<string, { label: string; snippet: string }> = {
  "Value Drain": { label: "Value Drain", snippet: "Manual costs or hidden latencies eroding AI margins." },
  "Utility Only": { label: "Utility Only", snippet: "System performs tasks but lacks strategic leverage." },
  "Stranded Asset": { label: "Stranded Asset", snippet: "High-quality output decoupled from core business workflows." },
  "Operational Lift": { label: "Operational Lift", snippet: "AI actively reducing human capital burden in specific tasks." },
  "Capital Multiplier": { label: "Capital Multiplier", snippet: "System outperforming expectations and ready for scale." }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const b = req.body;
  
  // ALIGNING WITH THE DEBUG_DUMP KEYS
  const leadName = b.firstName || b.name || "Not Provided";
  const leadEmail = b.to || b.email || "Not Provided";
  const leadOrg = b.organization || b.org || "Not Provided";
  const results = b.answers || b.results || {};

  // Build Table Rows using the 'answers' object
  const resultsTableRows = Object.entries(results).length > 0 
    ? Object.entries(results).map(([id, category]) => {
        const info = DIAGNOSTIC_MAPPING[category as string] || { label: category as string, snippet: "" };
        return `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #020617;">Signal ${id}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #020617;">${info.label}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; line-height: 1.4;">${info.snippet}</td>
          </tr>`;
      }).join("")
    : `<tr><td colspan="3" style="padding: 20px; text-align: center; color: #94a3b8;">No diagnostic signals were selected.</td></tr>`;

  const emailHtml = `
    <div style="font-family: sans-serif; color: #020617; max-width: 700px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 40px; border-radius: 8px;">
      <h2 style="color: #14b8a6; margin-top: 0; font-size: 24px;">MINE Diagnostic: Observation Brief</h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 4px; margin: 20px 0;">
        <p style="margin: 0; font-size: 16px;"><strong>Lead:</strong> ${leadName}</p>
        <p style="margin: 5px 0 0 0; font-size: 16px;"><strong>Organization:</strong> ${leadOrg}</p>
        <p style="margin: 5px 0 0 0; font-size: 16px;"><strong>Email:</strong> ${leadEmail}</p>
      </div>

      <h3 style="font-size: 18px; margin-top: 30px; color: #475569; text-transform: uppercase; letter-spacing: 1px;">Observation Results</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="text-align: left; background-color: #f8fafc;">
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6;">Signal</th>
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6;">Category</th>
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6;">Strategic Insight</th>
          </tr>
        </thead>
        <tbody>
          ${resultsTableRows}
        </tbody>
      </table>
      
      <p style="margin-top: 40px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        © ${new Date().getFullYear()} BMR Solutions | System Observation Brief
      </p>
    </div>`;

  try {
    await sgMail.send({
      to: "hello@bmradvisory.co",
      from: "hello@bmradvisory.co",
      subject: `[BMR Solutions] MINE Diagnostic: ${leadOrg}`,
      html: emailHtml,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("SendGrid Error:", error);
    return res.status(500).json({ success: false });
  }
}
