import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

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

  const resultsRows = Object.entries(results || {}).map(([id, state]) => {
    const insight = INSIGHT_LIBRARY[state as string] || { label: state as string, snippet: "Signal recorded." };
    return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px;">Signal ${id}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #14b8a6; font-weight: bold;">${insight.label}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">${insight.snippet}</td>
      </tr>`;
  }).join("");

  try {
    await sgMail.send({
      to: "hello@bmradvisory.co",
      from: "hello@bmradvisory.co",
      subject: `[Diagnostic] ${org} Synthesis`,
      html: `<div style="font-family:sans-serif; max-width:650px; margin:auto; border:1px solid #e2e8f0; padding:40px; border-radius:12px;">
               <h2 style="color:#14b8a6;">MINE Observation Brief</h2>
               <p><b>Lead:</b> ${name} (${email})</p>
               <table style="width:100%; border-collapse:collapse;">${resultsRows}</table>
             </div>`,
    });
    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
}
