import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, zoneData } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  const intensities = {
    HAI: zoneData?.HAI?.aggregate || 0,
    AVS: zoneData?.AVS?.aggregate || 0,
    IGF: zoneData?.IGF?.aggregate || 0
  };

  let focusArea: 'HAI' | 'AVS' | 'IGF' = 'HAI';
  if (intensities.HAI >= intensities.AVS && intensities.HAI >= intensities.IGF) focusArea = 'HAI';
  else if (intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF) focusArea = 'AVS';
  else focusArea = 'IGF';

  const shieldedEmailMap = {
    'HAI': {
      title: "Trust Architecture Alignment",
      teaser: "A significant variance in your 'Verification Reliability' signature has been detected.",
      risk: "Uncalibrated trust in AI outputs is currently creating a 'silent failure' loop. Left unaddressed, this will result in architectural debt that requires 3x the resources to remediate later."
    },
    'AVS': {
      title: "Adoption Value Synchronization",
      teaser: "Signals indicate 'Operational Drift' within your AI adoption protocols.",
      risk: "Your teams are likely generating high activity with low forensic value. This 'adoption friction' is currently masking a 15-20% leakage in projected AI efficiency."
    },
    'IGF': {
      title: "Internal Governance Integrity",
      teaser: "Observations suggest an 'Executive Oversight Variance' in governance scaling.",
      risk: "Current protocols are functioning as bottlenecks rather than strategic accelerators. This creates a compliance vacuum that exposes the organization to shadow-AI risks."
    }
  };

  const selected = shieldedEmailMap[focusArea];
  const calendlyLink = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&org=${encodeURIComponent(org)}&priority=${encodeURIComponent(selected.title)}`;

  const msg = {
    to: email,
    from: 'hello@bmradvisory.co',
    subject: `[Priority Signal] Forensic Maturity Signature: ${org}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; color: #ffffff; background-color: #1a1a1a; padding: 50px 40px; border: 1px solid #333;">
        <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 11px; color: #00F2FF; margin-bottom: 25px;">Forensic Signal Captured</h2>
        <div style="border-top: 1px solid #333; margin-bottom: 30px;"></div>
        <p style="font-size: 16px; line-height: 1.6; color: #f8fafc;">Hello ${firstName},</p>
        <p style="font-size: 14px; line-height: 1.6; color: #94a3b8;">
          The diagnostic for <strong>${org}</strong> is complete. Your maturity signature indicates a specific <strong>Displacement Variance</strong> that requires immediate calibration.
        </p>
        <div style="background-color: #262626; border-left: 4px solid #00F2FF; padding: 30px; margin: 35px 0;">
          <h3 style="margin: 0 0 10px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #00F2FF;">Priority Focus Area</h3>
          <p style="font-size: 22px; font-weight: bold; margin: 0; color: #ffffff;">${selected.title}</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #3d3d3d;">
             <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1; margin: 0 0 15px 0;">${selected.teaser}</p>
             <p style="font-size: 14px; line-height: 1.6; color: #ff4d4d; font-weight: bold;">CRITICAL RISK: <span style="font-weight: normal; color: #cbd5e1;">${selected.risk}</span></p>
          </div>
        </div>
        <p style="font-size: 13px; color: #64748b; font-style: italic; margin-bottom: 40px;">
          To prevent further drift, your <strong>Surgical Neutralization Roadmap</strong> has been generated and is ready for review.
        </p>
        <div style="text-align: center; margin: 40px 0;">
          <a href="${calendlyLink}" style="background-color: #00F2FF; color: #000000; padding: 18px 35px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; display: inline-block;">Unlock Full Roadmap</a>
        </div>
        <div style="border-top: 1px solid #333; margin-top: 50px; padding-top: 20px;">
          <p style="font-size: 11px; color: #475569; text-transform: uppercase; letter-spacing: 1px;">BMR SOLUTIONS FORENSIC TEAM | Confidential Report</p>
        </div>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
