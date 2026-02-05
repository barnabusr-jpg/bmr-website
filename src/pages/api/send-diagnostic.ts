import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

// THE BRAIN'S SOURCE OF TRUTH
const INSIGHT_LIBRARY: Record<string, { label: string; snippet: string }> = {
  "Manual Friction":   { label: "Manual Friction",   snippet: "Identifies human-in-the-loop costs eroding AI margins." },
  "Passive Support":   { label: "Passive Support",   snippet: "A system performing tasks but failing to provide strategic leverage." },
  "System Disconnect": { label: "System Disconnect", snippet: "High-quality outputs that are decoupled from core workflows." },
  "Team Relief":       { label: "Team Relief",       snippet: "AI is actively reducing the operational burden on human capital." },
  "Force Multiplier":  { label: "Force Multiplier",  snippet: "System is outperforming expectations and is ready for scale." }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { name, email, org, results } = req.body;

  // Process the results using the library
  const resultsRows = Object.entries(results || {}).map(([id, state]) => {
    const insight = INSIGHT_LIBRARY[state as string] || { label: state as string, snippet: "Signal recorded." };
    return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px;">Signal ${id}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #14b8a6; font-weight: bold;">${insight.label}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">${insight.snippet}</td>
      </tr>`;
  }).join("");

  const emailHtml = `
    <div style="font-family: sans-serif; color: #020617; max-width: 650px; margin: auto; border: 1px solid #e2e8f0; padding: 40px; border-radius: 12px;">
      <h2 style="color: #14b8a6; margin-top: 0;">MINE Diagnostic: Observation Brief</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;"><b>Lead:</b> ${name} (${email})</p>
        <p style="margin: 8px 0 0 0;"><b>Organization:</b> ${org}</p>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="text-align: left; background: #f8fafc;">
            <th style="padding: 10px; border-bottom: 2px solid #14b8a6; font-size: 13px;">Signal</th>
            <th style="padding: 10px; border-bottom: 2px solid #14b8a6; font-size: 13px;">Category</th>
            <th style="padding: 10px; border-bottom: 2px solid #14b8a6; font-size: 13px;">Strategic Insight</th>
          </tr>
        </thead>
        <tbody>${resultsRows}</tbody>
      </table>
    </div>`;

  try {
    await sgMail.send({
      to: "hello@bmradvisory.co",
      from: "hello@bmradvisory.co",
      subject: `[Diagnostic] ${org} Synthesis`,
      html: emailHtml,
    });
    return res.status(200).json({ success: true });
  } catch {
    // Vercel build fix: ignore the error variable to pass strict linting
    return res.status(500).json({ success: false });
  }
}
