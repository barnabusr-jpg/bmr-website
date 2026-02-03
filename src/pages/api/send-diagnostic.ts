import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const DIAGNOSTIC_MAPPING: Record<string, { label: string; snippet: string }> = {
  "Value Drain": {
    label: "Value Drain",
    snippet: "Identifies areas where manual 'human-in-the-loop' costs or hidden system latencies are silently eroding AI margins."
  },
  "Utility Only": {
    label: "Utility Only",
    snippet: "Points to a system performing basic tasks but failing to provide the strategic leverage required for a competitive advantage."
  },
  "Stranded Asset": {
    label: "Stranded Asset",
    snippet: "Indicates model outputs that are high-quality but decoupled from core business workflows, leaving ROI unrealized."
  },
  "Operational Lift": {
    label: "Operational Lift",
    snippet: "Signals a successful integration where AI is actively reducing the burden on human capital within specific tasks."
  },
  "Capital Multiplier": {
    label: "Capital Multiplier",
    snippet: "Highlights 'Emergent Efficiency' where the system is significantly outperforming baseline expectations and is ready for scale."
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Log incoming data to Vercel console for debugging
  console.log("Incoming Diagnostic Data:", req.body);

  // Expanded fallback logic to catch every possible naming convention
  const leadName = req.body.name || req.body.userName || req.body.fullName || "Not Provided";
  const leadEmail = req.body.email || req.body.userEmail || req.body.contactEmail || "Not Provided";
  const leadOrg = req.body.org || req.body.organization || req.body.company || req.body.hers || "Not Provided";
  
  // Ensure we find the results object even if it's nested
  const rawResults = req.body.results || req.body.formData?.results || {};

  // Build the table rows - ensuring we have data to map
  const resultsTableRows = Object.entries(rawResults).length > 0 
    ? Object.entries(rawResults).map(([id, category]) => {
        const info = DIAGNOSTIC_MAPPING[category as string] || { label: category as string, snippet: "" };
        return `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #020617;">Signal ${id}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #020617;">${info.label}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; line-height: 1.4;">${info.snippet}</td>
          </tr>`;
      }).join("")
    : `<tr><td colspan="3" style="padding: 20px; text-align: center; color: #94a3b8;">No observation data captured in this session.</td></tr>`;

  const emailHtml = `
    <div style="font-family: sans-serif; color: #020617; max-width: 700px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 40px; border-radius: 8px;">
      <h2 style="color: #14b8a6; margin-top: 0; font-size: 24px;">MINE Diagnostic: Observation Brief</h2>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 4px; margin: 20px 0;">
        <p style="margin: 0; font-size: 16px;"><strong>Lead:</strong> ${leadName}</p>
        <p style="margin: 5px 0 0 0; font-size: 16px;"><strong>Organization:</strong> ${leadOrg}</p>
        <p style="margin: 5px 0 0 0; font-size: 16px;"><strong>Email:</strong> ${leadEmail}</p>
      </div>
      <h3 style="font-size: 18px; margin-top: 30px; text-transform: uppercase; letter-spacing: 1px; color: #475569;">Observation Results</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="text-align: left;">
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6; color: #020617;">Signal</th>
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6; color: #020617;">Category</th>
            <th style="padding: 12px; border-bottom: 2px solid #14b8a6; color: #020617;">Strategic Insight</th>
          </tr>
        </thead>
        <tbody>
          ${resultsTableRows}
        </tbody>
      </table>
      <p style="margin-top: 40px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        © 2026 BMR Solutions | System Observation Brief
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
