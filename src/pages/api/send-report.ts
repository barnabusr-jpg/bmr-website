import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Set API key with a fallback to prevent initialization crash
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Guard clause for non-POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, organization, zoneData, role } = req.body;

  // Defensive data parsing to prevent "undefined" errors in math
  const intensities = { 
    HAI: Math.round(zoneData?.HAI?.aggregate || 0), 
    AVS: Math.round(zoneData?.AVS?.aggregate || 0), 
    IGF: Math.round(zoneData?.IGF?.aggregate || 0) 
  };

  const maxStrength = Math.max(zoneData?.HAI?.max || 0, zoneData?.AVS?.max || 0, zoneData?.IGF?.max || 0);
  const maturityStage = `Stage ${maxStrength}: ${maxStrength >= 4 ? 'Optimized' : 'Emerging'}`;

  // Logic for identifying the primary drift vector
  const focusKey = intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF 
    ? 'AVS' : (intensities.IGF >= intensities.HAI ? 'IGF' : 'HAI');

  const clientFacingVector = focusKey === 'HAI' ? 'Vector 01' : focusKey === 'AVS' ? 'Vector 02' : 'Vector 03';
  const airtableFacingVector = `Vector 0${focusKey === 'HAI' ? 1 : focusKey === 'AVS' ? 2 : 3} (${focusKey})`;

  // Calendly Construction
  const calendlyBase = "https://calendly.com/hello-bmradvisory/forensic-review";
  const calendlyUrl = `${calendlyBase}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&a1=${clientFacingVector}&utm_campaign=${encodeURIComponent(organization)}`;

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co', // Internal monitoring
    from: 'hello@bmradvisory.co', 
    subject: `[Observation Report] BMR Signal Diagnostic: ${organization}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; color: #020617; padding: 40px; border: 1px solid #e2e8f0; margin: 0 auto;">
        <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 12px; color: #64748b; border-bottom: 2px solid #020617; padding-bottom: 10px; margin-bottom: 30px;">Forensic Signal Captured</h2>
        <p style="font-size: 16px; line-height: 1.5;">Hello ${name.split(' ')[0] || 'Team'},</p>
        <p style="font-size: 16px; line-height: 1.5;">Your BMR Diagnostic for <strong>${organization}</strong> has completed benchmarking for the <strong>${role} Lens</strong>.</p>
        
        <div style="background-color: #f8fafc; padding: 30px; margin: 30px 0; border-left: 4px solid #00F2FF;">
          <p style="font-size: 10px; text-transform: uppercase; color: #64748b; margin: 0; letter-spacing: 2px;">Primary Variance Lens</p>
          <p style="font-size: 20px; font-weight: bold; font-style: italic; margin: 5px 0;">Observation ${clientFacingVector}</p>
        </div>

        <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 30px;">
          The captured signals indicate specific friction points within your current AI infrastructure. To decrypt these findings and review the strategic neutralization roadmap, please use the secure link below.
        </p>

        <div style="text-align: center; margin-top: 40px;">
          <a href="${calendlyUrl}" style="background-color: #020617; color: #ffffff; padding: 18px 30px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; display: inline-block;">Unlock Strategic Roadmap →</a>
        </div>
        
        <p style="font-size: 10px; color: #94a3b8; margin-top: 50px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
          Confidential Systemic Audit | BMR Advisory Co.
        </p>
      </div>`
  };

  try {
    // 1. Send the Email
    await sgMail.send(msg);

    // 2. Log to Airtable (Fire and forget or await depending on priority)
    if (process.env.AIRTABLE_WEBHOOK_URL) {
      try {
        await fetch(process.env.AIRTABLE_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name, 
            org: organization, 
            email,
            role, 
            maturityStage,
            focusArea: airtableFacingVector, 
            result: `BMR Signal: ${clientFacingVector}`,
            intensities 
          }),
        });
      } catch (airtableError) {
        console.error("Airtable Sync Failed:", airtableError);
        // We don't return error here because the email was already sent successfully
      }
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Diagnostic API Error:", error.response?.body || error.message);
    return res.status(500).json({ 
      error: 'Finalization failed', 
      details: error.message 
    });
  }
}
