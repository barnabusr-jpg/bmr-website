import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

// The Backend Dictionary - Strictly for email content
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

  const { name, email, org, results } = req.body;

  // Build the HTML table rows using the dictionary
  const resultsTableRows = Object.entries(results || {})
    .map(([id, category]) => {
      const info = DIAGNOSTIC_MAPPING[category as string] || { label: category, snippet: "" };
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #020617;">Signal ${id}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #020617;">${info.label}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; line-height: 1.4;">${info.snippet}</td>
        </tr>
      `;
    })
    .join("");

  const content = {
    to: "hello@bmradvisory.co", // Your receiving email
    from: "hello@bmradvisory.co", // Must be a verified SendGrid sender
    subject: `[BMR Solutions] MINE Diagnostic: ${org}`,
    html: `
      <div style="font-family: sans-serif; color: #020617; max-width: 700px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 40px; border-radius: 8px;">
        <h2 style="color: #14b8a6; margin-top: 0; font-size: 24px;">MINE Diagnostic: Observation Brief</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 4px; margin: 20px 0;">
          <p style="margin: 0; font-size: 16px;"><strong>Lead:</strong> ${name}</p>
          <p style="margin: 5px 0 0 0; font-size: 16px;"><strong>Organization:</strong> ${org}</p>
          <p style="margin: 5px 0 0 0; font-size: 16px;"><strong>Email:</strong> ${email}</p>
        </div>

        <h3 style="font-size: 18px; margin-top: 30px; text-transform: uppercase; letter-spacing: 1px; color: #475569;">Observation Results</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="text-align: left;">
              <th style="padding: 12px; border-bottom: 2px solid #14b8a6; color: #020617;">Signal</th>
              <th style="padding: 12px; border-bottom: 2px solid #14b8a6; color: #020617;">Category</th>
              <th style="padding: 12px; border-bottom: 2px solid #14b8a6
