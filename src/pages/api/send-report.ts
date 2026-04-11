import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// 🛡️ SECURITY HANDSHAKE - Unified with BMR_SENDGRID_KEY
sgMail.setApiKey(process.env.BMR_SENDGRID_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, organization, zoneData, role } = req.body;

  // 🧮 ANALYTIC TRIAGE
  const intensities = { 
    HAI: Math.round(zoneData?.HAI?.aggregate || 0), 
    AVS: Math.round(zoneData?.AVS?.aggregate || 0), 
    IGF: Math.round(zoneData?.IGF?.aggregate || 0) 
  };

  const focusKey = intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF 
    ? 'AVS' : (intensities.IGF >= intensities.HAI ? 'IGF' : 'HAI');

  const clientFacingVector = focusKey === 'HAI' ? 'Vector 01' : focusKey === 'AVS' ? 'Vector 02' : 'Vector 03';

  // 🗓️ Standardized Calendly (Ensures consistency across all BMR Solutions touchpoints)
  const calendlyUrl = `https://calendly.com/bmr-solutions/forensic-review?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&utm_campaign=${encodeURIComponent(organization)}`;

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co', 
    from: 'BMR Solutions <hello@bmradvisory.co>', // Verified sender with updated Display Name
    subject: `[MRI_SIGNAL_CAPTURED] Forensic Diagnostic: ${organization}`,
    html: `
      <div style="font-family: monospace; max-width: 600px; background-color: #020617; color: #f8fafc; padding: 40px; border: 2px solid #dc2626; margin: 0 auto;">
        <h2 style="text-transform: uppercase; letter-spacing: 2px; font-size: 14px; color: #dc2626; border-bottom: 1px solid #1e293b; padding-bottom: 10px; margin-bottom: 30px;">BMR SOLUTIONS // LENS_FINALIZED</h2>
        
        <p style="font-size: 14px; line-height: 1.5;">Operator: ${name.split(' ')[0] || 'Lead'}</p>
        <p style="font-size: 14px; line-height: 1.5;">The MRI diagnostic sequence for <strong>${organization}</strong> has successfully captured the <strong>${role} Lens</strong> data points.</p>
        
        <div style="background-color: #0f172a; padding: 30px; margin: 30px 0; border-left: 4px solid #dc2626;">
          <p style="font-size: 10px; text-transform: uppercase; color: #64748b; margin: 0; letter-spacing: 2px;">Structural Variance Vector</p>
          <p style="font-size: 20px; font-weight: bold; font-style: italic; margin: 5px 0; color: #ffffff;">Observation ${clientFacingVector}</p>
        </div>

        <p style="color: #94a3b8; font-size: 12px; line-height: 1.6; margin-bottom: 30px; text-transform: uppercase;">
          The captured signals indicate specific friction points within your organizational infrastructure. To decrypt the SRI (Structural Resilience Index) and review the strategic roadmap, initialize the review sequence below.
        </p>

        <div style="text-align: center; margin-top: 40px;">
          <a href="${calendlyUrl}" style="background-color: #dc2626; color: #ffffff; padding: 18px 30px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; display: inline-block;">Unlock Forensic Roadmap →</a>
        </div>
        
        <p style="font-size: 10px; color: #475569; margin-top: 50px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
          CONFIDENTIAL SYSTEMIC AUDIT | BMR SOLUTIONS CO.
        </p>
      </div>`
  };

  try {
    // 1. Send Email
    await sgMail.send(msg);

    // 2. 🧹 Airtable Purge Complete: No webhooks or external fetches.
    // Data remains in Supabase as the primary source of truth.

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("BMR_DISPATCH_FRACTURE:", error.message);
    return res.status(500).json({ error: 'TRANSMISSION_FAILURE' });
  }
}
