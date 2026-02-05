import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const DIAGNOSTIC_MAPPING: Record<string, { label: string; snippet: string }> = {
  // New Human-Centric Labels
  "Manual Friction":   { label: "Manual Friction",   snippet: "Human effort is patching system limits. AI margins are being eroded." },
  "Passive Support":   { label: "Passive Support",   snippet: "The system is a tool, not a partner. Provides utility but no strategic leverage." },
  "System Disconnect": { label: "System Disconnect", snippet: "Outputs are decoupled from core workflows, leaving ROI unrealized." },
  "Team Relief":       { label: "Team Relief",       snippet: "AI is successfully absorbing task volume and reducing human burden." },
  "Force Multiplier":  { label: "Force Multiplier",  snippet: "Synergy is creating emergent efficiency ready for capital scale." }
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

  try {
    await sgMail.send({
      to: "hello@bmradvisory.co",
      from: "hello@bmradvisory.co",
      subject: `[Diagnostic] ${org || 'New'} Observation Brief`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 40px; border-radius: 12px;">
          <h2 style="color: #14b8a6;">MINE Diagnostic Brief</h2>
          <p><b>Lead:</b> ${name || 'Inquiry'} (${email || 'No Email'})</p>
          <p><b>Org:</b> ${org || 'N/A'}</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead><tr style="background: #f9f9f9;"><th style="text-align:left; padding:10px;">ID</th><th style="text-align:left; padding:10px;">Label</th><th style="text-align:left; padding:10px;">Insight</th></tr></thead>
            <tbody>${resultsTableRows}</tbody>
          </table>
        </div>`,
    });
    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
}
