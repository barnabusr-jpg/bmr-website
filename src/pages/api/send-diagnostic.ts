import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

// MAPPING: Translates the button categories into professional email insights
const DIAGNOSTIC_MAPPING: Record<string, { label: string; snippet: string }> = {
  "Value Drain": { 
    label: "Manual Friction", 
    snippet: "Identifies areas where manual 'human-in-the-loop' costs or hidden system latencies are silently eroding AI margins." 
  },
  "Utility Only": { 
    label: "Passive Support", 
    snippet: "Points to a system performing basic tasks but failing to provide the strategic leverage required for a competitive advantage." 
  },
  "Stranded Asset": { 
    label: "System Disconnect", 
    snippet: "Indicates model outputs that are high-quality but decoupled from core business workflows, leaving ROI unrealized." 
  },
  "Operational Lift": { 
    label: "Team Relief", 
    snippet: "Signals a successful integration where AI is actively reducing the burden on human capital within specific tasks." 
  },
  "Capital Multiplier": { 
    label: "Force Multiplier", 
    snippet: "Highlights 'Emergent Efficiency' where the system is significantly outperforming baseline expectations and is ready for scale." 
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const b = req.body;
  
  // Extracting lead data
  const leadName = b.firstName || b.name || "Not Provided";
  const leadEmail = b.to || b.email || "Not Provided";
  const leadOrg = b.organization || b.org || "Not Provided";
  const results = b.answers || b.results || {};

  // Constructing the Insight Table
  const resultsTableRows = Object.entries(results).length > 0 
    ? Object.entries(results).map(([id, category]) => {
        const info = DIAGNOSTIC_MAPPING[category as string] || { label: category as string, snippet: "" };
        return `
          <tr>
            <td style="padding: 14px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #020617; font-size: 14px;">Signal ${id}</td>
            <td style="padding: 14px 12px; border-bottom: 1px solid #e2e8f0; color: #14b8a6; font-weight: 600; font-size: 14px;">${info.label}</td>
            <td style="padding: 14px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #475569; line-height: 1.5; font-style: italic;">${info.snippet}</td>
          </tr>`;
      }).join("")
    : `<tr><td colspan="3" style="padding: 30px; text-align: center; color: #94a3b8; font-style: italic;">No diagnostic signals were captured.</td></tr>`;

  const emailHtml = `
    <div style="font-family: sans-serif; color: #020617; max-width: 700px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 40px; border-radius: 12px;">
      <h2 style="color: #14b8a6; margin-top: 0; font-size: 26px;">MINE Diagnostic: Observation Brief</h2>
      
      <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin: 24px 0; border: 1px solid #f1f5f9;">
        <p style="margin: 0; font-size: 15px;"><strong>Lead:</strong> ${leadName}</p>
        <p style="margin: 8px 0 0 0; font-size: 15px;"><strong>Organization:</strong> ${leadOrg}</p>
        <p style="margin: 8px 0 0 0; font-size: 15px; color: #64748b;"><strong>Email:</strong> ${leadEmail}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
        <thead>
          <tr style="text-align: left; background-color: #f8fafc;">
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6; font-size: 13px;">Signal</th>
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6; font-size: 13px;">Experience</th>
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6; font-size: 13px;">Observation*</th>
          </tr>
        </thead>
        <tbody>${resultsTableRows}</tbody>
      </table>
      
      <div style="margin-top: 48px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 24px;">
        <p style="font-size: 11px; color: #94a3b8; margin: 0;">
          *Advisory observations based on directional patterns. Require validation.<br>
          © ${new Date().getFullYear()} BMR Advisory | Internal Use Only
        </p>
      </div>
    </div>`;

  try {
    await sgMail.send({
      to: "hello@bmradvisory.co",
      from: "hello@bmradvisory.co",
      subject: `[Diagnostic] ${leadOrg} Observation`,
      html: emailHtml,
    });
    return res.status(200).json({ success: true });
  } catch {
    // This empty catch block is critical to pass the Vercel Build/Linting check
    return res.status(500).json({ success: false });
  }
}
