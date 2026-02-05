import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const DIAGNOSTIC_MAPPING: Record<string, { label: string; snippet: string }> = {
  "Value Drain": { label: "Manual Friction", snippet: "Human effort is patching system limits." },
  "Utility Only": { label: "Passive Support", snippet: "The system is a tool, not a partner." },
  "Stranded Asset": { label: "System Disconnect", snippet: "Output is decoupled from workflow." },
  "Operational Lift": { label: "Team Relief", snippet: "AI is absorbing task volume successfully." },
  "Capital Multiplier": { label: "Force Multiplier", snippet: "Synergy is ready for capital scale." }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  
  const b = req.body;
  const leadName = b.firstName || b.name || "Not Provided";
  const leadEmail = b.to || b.email || "Not Provided";
  const leadOrg = b.organization || b.org || "Not Provided";
  const results = b.answers || b.results || {};

  const rows = Object.entries(results).map(([id, category]) => {
    const info = DIAGNOSTIC_MAPPING[category as string] || { label: category as string, snippet: "" };
    return `<tr><td>Signal ${id}</td><td><b>${info.label}</b></td><td>${info.snippet}</td></tr>`;
  }).join("");

  try {
    await sgMail.send({
      to: "hello@bmradvisory.co",
      from: "hello@bmradvisory.co",
      subject: `[Diagnostic] ${leadOrg}`,
      html: `<p>Lead: ${leadName} (${leadEmail})</p><table border="1">${rows}</table>`
    });
    return res.status(200).json({ success: true });
  } catch {
    // This empty catch block is REQUIRED to pass Vercel build checks
    return res.status(500).json({ success: false });
  }
}
