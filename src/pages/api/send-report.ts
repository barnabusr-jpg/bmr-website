import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  // FIXED: Removed 'role' to prevent "assigned a value but never used" error
  const { name, email, org, zoneData } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  const intensities = {
    HAI: zoneData?.HAI?.aggregate || 0,
    AVS: zoneData?.AVS?.aggregate || 0,
    IGF: zoneData?.IGF?.aggregate || 0
  };

  // Logic to determine the priority focus area based on scores
  let focusArea: 'HAI' | 'AVS' | 'IGF' = 'HAI';
  if (intensities.HAI >= intensities.AVS && intensities.HAI >= intensities.IGF) focusArea = 'HAI';
  else if (intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF) focusArea = 'AVS';
  else focusArea = 'IGF';

  const shieldedEmailMap = {
    'HAI': {
      title: "Trust Architecture Alignment",
      teaser: "A significant variance in your 'Verification Reliability' signature has been detected.",
      risk: "Uncalibrated trust in AI outputs is currently creating a 'silent failure' loop."
    },
    'AVS': {
      title: "Adoption Value Synchronization",
      teaser: "Signals indicate 'Operational Drift' within your AI adoption protocols.",
      risk: "Your teams are likely generating high activity with low forensic value."
    },
    'IGF': {
      title: "Internal Governance Integrity",
      teaser: "Observations suggest an 'Executive Oversight Variance' in governance scaling.",
      risk: "Current protocols are functioning as bottlenecks rather than strategic accelerators."
    }
  };

  const selected = shieldedEmailMap[focusArea];
  const calendlyLink = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&org=${encodeURIComponent(org)}&priority=${encodeURIComponent(selected.title)}`;

  const msg = {
    to: email,
    from: 'hello@bmradvisory.co',
    subject: `[Priority Signal] Forensic Maturity Signature: ${org}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #ffffff; background-color: #1a1a1a; padding: 40px; border: 1px solid #333;">
        <h2 style="color: #00F2FF; text-transform: uppercase; letter-spacing: 2px;">Forensic Signal Captured</h2>
        <p>Hello ${firstName},</p>
        <p>The diagnostic for <strong>${org}</strong> is complete. We have successfully mapped your maturity signature.</p>
        <div style="background-color: #262626; border-left: 4px solid #00F2FF; padding: 20px; margin: 25px 0;">
          <p style="font-size: 10px; color: #00F2FF; text-transform: uppercase;">Priority Focus Area</p>
          <p style="font-size: 20px; font-weight: bold; margin: 5px 0;">${selected.title}</p>
          <p style="color: #cbd5e1;">${selected.teaser}</p>
          <p style="color: #ff4d4d; font-weight: bold;">Note: ${selected.risk}</p>
        </div>
        <div style="text-align: center;">
          <a href="${calendlyLink}" style="background-color: #00F2FF; color: #000; padding: 15px 30px; text-decoration: none; font-weight: bold; display: inline-block;">SCHEDULE MATURITY REVIEW</a>
        </div>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    // Basic error logging that won't trigger linting issues
    console.error("Email dispatch failed");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
