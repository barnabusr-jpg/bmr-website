import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const DIAGNOSTIC_MAPPING: Record<string, { label: string; snippet: string }> = {
  "Manual Friction":   { label: "Manual Friction",   snippet: "Human effort is patching system limits. AI margins are being eroded by 'human-in-the-loop' necessity." },
  "Passive Support":   { label: "Passive Support",   snippet: "The system is a tool, not a partner. It performs tasks but provides no strategic leverage." },
  "System Disconnect": { label: "System Disconnect", snippet: "Outputs are decoupled from workflows. High-quality model data is leaving ROI unrealized." },
  "Team Relief":       { label: "Team Relief",       snippet: "AI is successfully absorbing task volume and reducing the burden on human capital." },
  "Force Multiplier":  { label: "Force Multiplier",  snippet: "Synergy is creating emergent efficiency. The system is outperforming baseline expectations." }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  const { name, email, org, results } = req.body;

  const resultsTableRows = Object.entries(results || {}).map(([id, val]) => {
    const info = DIAGNOSTIC_MAPPING[val as string] || { label: val as string, snippet: "" };
    return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee; font-size: 14px;">Signal ${id}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; color: #14b8a6; font-weight: bold;">${info.label}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; font-size: 12px; color: #666;">${info.snippet}</td>
      </tr>`;
  }).join("");

  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 650px; margin: auto; border: 1px solid #eee; padding: 40px; border-radius: 12px;">
      <h2 style="color: #14b8a6; margin-top: 0;">MINE Diagnostic: Observation Brief</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;"><b>Lead:</b> ${name} (${email})</p>
        <p style="margin: 5px 0 0 0;"><b>Organization:</b> ${org}</p>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <thead><tr style="background: #f9f9f9;"><th style="text-align:left; padding:10px;">Signal</th><th style="text-align:left; padding:10px;">Observation</th><th style="text-align:left; padding:10px;">Strategic Insight</th></tr></thead>
        <tbody>${resultsTableRows}</tbody>
      </table>
    </div>`;

  try {
    await sgMail.send({
      to: "hello@bmradvisory.co",
      from: "hello@bmradvisory.co",
      subject: `[Diagnostic] ${org} Observation Brief`,
      html: emailHtml,
    });
    return res.status(200).json({ success: true });
  } catch {
    // Empty catch satisfies Vercel build/linting requirements
    return res.status(500).json({ success: false });
  }
}
