import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, zoneData } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  // --- INTERNAL SCORING ---
  const intensities = {
    HAI: zoneData?.HAI?.aggregate || 0,
    AVS: zoneData?.AVS?.aggregate || 0,
    IGF: zoneData?.IGF?.aggregate || 0
  };

  let focusArea: 'HAI' | 'AVS' | 'IGF' = 'HAI';
  if (intensities.HAI >= intensities.AVS && intensities.HAI >= intensities.IGF) focusArea = 'HAI';
  else if (intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF) focusArea = 'AVS';
  else focusArea = 'IGF';

  // --- SHIELDED EMAIL CONTENT (Zero IP Leak) ---
  const shieldedContent = {
    'HAI': {
      publicTitle: "Trust Architecture Alignment",
      teaser: "A significant variance in your 'Verification Reliability' signature has been detected. This typically indicates operational friction that masks technical debt."
    },
    'AVS': {
      publicTitle: "Adoption Value Synchronization",
      teaser: "Signals indicate 'Operational Drift.' Your current adoption protocols are likely uncalibrated, resulting in high activity but low forensic value."
    },
    'IGF': {
      publicTitle: "Internal Governance Integrity",
      teaser: "Observations suggest an 'Executive Oversight Variance.' Your governance frameworks may currently be functioning as bottlenecks rather than accelerators."
    }
  };

  const selected = shieldedContent[focusArea];
  const calendlyLink = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&org=${encodeURIComponent(org)}`;

  const msg = {
    to: email,
    from: 'hello@bmradvisory.co',
    subject: `[Maturity Benchmark] BMR Signal Diagnostic: ${org}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; color: #ffffff; background-color: #020617; padding: 40px; border: 1px solid #1e293b;">
        <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 11px; color: #00F2FF; margin-bottom: 20px;">Forensic Signal Captured</h2>
        
        <p style="font-size: 16px; line-height: 1.5;">Hello ${firstName},</p>
        <p style="font-size: 14px; color: #94a3b8;">The BMR Signal Diagnostic for <strong>${org}</strong> has successfully mapped your maturity signature. We have identified a critical neutralization priority.</p>
        
        <div style="background-color: #0f172a; border-left: 3px solid #00F2FF; padding: 25px; margin: 30px 0;">
          <h3 style="margin: 0 0 10px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #00F2FF;">Priority Focus Area</h3>
          <p style="font-size: 20px; font-weight: bold; margin: 0; color: #f8fafc;">${selected.publicTitle}</p>
          <p style="margin-top: 15px; font-size: 14px; line-height: 1.6; color: #cbd5e1;">${selected.teaser}</p>
        </div>

        <p style="font-size: 13px; color: #64748b; font-style: italic; background: #0f172a; padding: 15px;">
          <strong>Note:</strong> To protect the integrity of the diagnostic, the Full Forensic Roadmap and specific neutralization exercises are withheld until your 1-on-1 Maturity Review.
        </p>

        <div style="margin: 40px 0; text-align: center;">
          <a href="${calendlyLink}" style="background-color: #00F2FF; color: #020617; padding: 16px 32px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; display: inline-block;">Schedule Maturity Review</a>
        </div>
        
        <p style="font-size: 12px; color: #475569; margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px;">
          BMR Solutions Forensic Team<br/>
          Confidential Benchmark Results
        </p>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    // Webhook logic for Airtable should still send ALL data for YOUR records
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
