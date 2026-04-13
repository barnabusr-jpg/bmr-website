import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// 🛡️ SECURITY HANDSHAKE
sgMail.setApiKey(process.env.BMR_SENDGRID_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });

  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) return res.status(400).json({ error: 'INVALID_RECIPIENT' });

    // Generate 6-digit Operator Key
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co', 
      subject: `[BMR_AUTH] FORENSIC_NODE_CHALLENGE: ${otp}`,
      html: `
        <div style="font-family: 'Courier New', Courier, monospace; background-color: #020617; color: white; padding: 60px; border: 2px solid #dc2626; max-width: 600px; margin: auto;">
          <h2 style="color: #dc2626; text-transform: uppercase; font-style: italic; letter-spacing: -1px; margin-bottom: 5px;">BMR_ADVISORY // NODE_AUTHORIZATION</h2>
          <p style="color: #64748b; text-transform: uppercase; font-size: 10px; margin-top: 0; letter-spacing: 2px;">PROTOCOL: PULSE_CHECK_VERIFICATION</p>
          
          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 30px 0;"/>
          
          <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1;">A forensic diagnostic session has been requested for this email address. Enter the following challenge key to initialize the node:</p>
          
          <div style="margin: 40px 0; padding: 40px; background-color: #0f172a; border: 1px solid #dc2626; text-align: center; box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);">
            <span style="font-size: 52px; font-weight: 900; letter-spacing: 12px; color: white; font-style: italic;">${otp}</span>
          </div>
          
          <p style="color: #475569; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">
            SECURITY_NOTICE: BMR_PROTOCOL_7_ACTIVE // DO NOT SHARE THIS KEY // EXPIRES IN 5M
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1e293b;">
             <p style="font-size: 9px; color: #334155;">If you did not initiate this request, terminate connection immediately.</p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    
    // Returning the challenge key allows the frontend to verify the session
    return res.status(200).json({ success: true, challenge: otp });

  } catch (error: any) {
    console.error("BMR_AUTH_SHEAR:", error.response?.body || error.message);
    return res.status(500).json({ error: 'TRANSMISSION_FAILURE', details: error.message });
  }
}
