import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const DIAGNOSTIC_MAPPING: Record<string, { label: string; snippet: string }> = {
  "Strongly Disagree": { 
    label: "Manual Friction", 
    snippet: "Signals suggest significant behavioral friction where human effort is acting as a patch for system limits." 
  },
  "Disagree": { 
    label: "Passive Support", 
    snippet: "Observations point toward a system that provides localized utility but remains a passive tool." 
  },
  "Neutral": { 
    label: "System Disconnect", 
    snippet: "This neutral pattern often indicates that system outputs are decoupled from actual human workflows." 
  },
  "Agree": { 
    label: "Team Relief", 
    snippet: "Indicators suggest the system is successfully absorbing task volume and providing operational lift." 
  },
  "Strongly Agree": { 
    label: "Force Multiplier", 
    snippet: "Strong synergy detected; the system is acting as a force multiplier ready for capital scale." 
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const b = req.body;
  const leadName = b.name || "Not Provided";
  const leadEmail = b.email || "Not Provided";
  const leadOrg = b.org || "Not Provided";
  const results = b.results || {};

  const resultsTableRows = Object.entries(results).map(([id, val]) => {
    const info = DIAGNOSTIC_MAPPING[val as string] || { label: val as string, snippet: "" };
    return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">Signal ${id}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; color: #14b8a6;"><b>${info.label}</b></td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; font-size: 12px; color: #666;">${info.snippet}</td>
      </tr>`;
  }).join("");

  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 10px;">
      <h2 style="color: #14b8a6;">MINE Diagnostic: Observation Brief</h2>
      <p><b>Lead:</b> ${leadName} (${leadEmail})</p>
      <p><b>Organization:</b> ${leadOrg}</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead><tr style="background: #f9f9f9;"><th style="text-align:left; padding:10px;">Signal</th><th style="text-align:left; padding:10px;">Experience</th><th style="text-align:left; padding:10px;">Observation</th></tr></thead>
        <tbody>${resultsTableRows}</tbody>
      </table>
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
    // Empty catch block is the only way to satisfy Vercel's 'no-unused-vars' linting rule
    return res.status(500).json({ success: false });
  }
}
