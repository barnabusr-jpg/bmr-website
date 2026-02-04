import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const DIAGNOSTIC_MAPPING: Record<string, { label: string; snippet: string }> = {
  "Value Drain": { 
    label: "Manual Friction", 
    snippet: "Initial signal patterns suggest that human work may be slowing down the AI. This may indicate that manual oversight is impacting the intended margin profile of the system." 
  },
  "Utility Only": { 
    label: "Passive Support", 
    snippet: "Observations point toward localized task-competency. This pattern suggests the system may currently be providing utility without reaching broader strategic integration." 
  },
  "Stranded Asset": { 
    label: "System Disconnect", 
    snippet: "Signals indicate a possible disconnect between system output and institutional workflow, suggesting that some generated value may remain orphaned from the primary value chain." 
  },
  "Operational Lift": { 
    label: "Team Relief", 
    snippet: "Current indicators suggest a positive trend in task-automation. This may represent a baseline level of cognitive lift that could support further operational expansion." 
  },
  "Capital Multiplier": { 
    label: "Force Multiplier", 
    snippet: "Observations suggest emergent efficiencies across the human-system interface. This pattern indicates potential readiness for more significant capital deployment." 
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const b = req.body;
  const leadName = b.firstName || b.name || "Not Provided";
  const leadEmail = b.to || b.email || "Not Provided";
  const leadOrg = b.organization || b.org || "Not Provided";
  const results = b.answers || b.results || {};

  const resultsTableRows = Object.entries(results).length > 0 
    ? Object.entries(results).map(([id, category]) => {
        const info = DIAGNOSTIC_MAPPING[category as string] || { label: category as string, snippet: "" };
        return `
          <tr>
            <td style="padding: 16px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #0f172a; font-size: 14px;">Signal ${id}</td>
            <td style="padding: 16px 12px; border-bottom: 1px solid #e2e8f0; color: #14b8a6; font-weight: 600; font-size: 14px;">${info.label}</td>
            <td style="padding: 16px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #475569; line-height: 1.6; font-style: italic;">${info.snippet}</td>
          </tr>`;
      }).join("")
    : `<tr><td colspan="3" style="padding: 30px; text-align: center; color: #94a3b8; font-style: italic;">No specific diagnostic signals were captured.</td></tr>`;

  const emailHtml = `
    <div style="font-family: sans-serif; color: #020617; max-width: 700px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 40px; border-radius: 12px;">
      <h2 style="color: #14b8a6; margin-top: 0; font-size: 24px;">MINE Diagnostic: Observation Brief</h2>
      
      <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin: 24px 0;">
        <p style="margin: 0; font-size: 13px; color: #64748b; text-transform: uppercase;">Engagement Lead</p>
        <p style="margin: 4px 0 0 0; font-size: 18px; color: #0f172a;"><strong>${leadName}</strong> | ${leadOrg}</p>
        <p style="margin: 4px 0 0 0; font-size: 14px; color: #64748b;">${leadEmail}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
        <thead>
          <tr style="text-align: left; background-color: #f8fafc;">
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6; font-size: 11px; color: #64748b;">SIGNAL</th>
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6; font-size: 11px; color: #64748b;">EXPERIENCE</th>
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6; font-size: 11px; color: #64748b;">OBSERVATION*</th>
          </tr>
        </thead>
        <tbody>${resultsTableRows}</tbody>
      </table>
      
      <div style="margin-top: 40px; text-align: center;">
        <p style="font-size: 10px; color: #cbd5e1; line-height: 1.5;">
          *Advisory observations are directional in nature and require further diagnostic validation.<br>
          © ${new Date().getFullYear()} BMR Advisory
        </p>
      </div>
    </div>`;

  try {
    await sgMail.send({
      to: "hello@bmradvisory.co",
      from: "hello@bmradvisory.co",
      subject: `[Observation Brief] ${leadOrg} Diagnostic`,
      html: emailHtml,
    });
    return res.status(200).json({ success: true });
  } catch {
    // Removed the 'error' variable here to pass ESLint 'no-unused-vars' check
    return res.status(500).json({ success: false });
  }
}
