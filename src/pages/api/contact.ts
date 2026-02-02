import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body;

  // 1. The Internal Notification (Sent to YOU)
  const internalMsg = {
    to: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    replyTo: email,
    subject: `[INQUIRY] ${name} - ${new Date().toLocaleTimeString()}`,
    html: `
      <div style="font-family: sans-serif; background: #020617; color: white; padding: 40px; border: 1px solid #1e293b; border-radius: 12px;">
        <h2 style="color: #0D9488; margin-top: 0;">New Strategic Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${company || 'Not specified'}</p>
        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
        <p style="color: #cbd5e1; line-height: 1.6;">${message}</p>
      </div>
    `,
  };

  // 2. The Auto-Reply (Sent to THE CLIENT)
  const autoReplyMsg = {
    to: email, // Sends to the person who filled out the form
    from: 'hello@bmradvisory.co', 
    subject: 'Signal Received: BMR Advisory',
    html: `
      <div style="font-family: sans-serif; color: #334155; max-width: 600px; margin: 0 auto; line-height: 1.6;">
        <h2 style="color: #0D9488;">Hello ${name},</h2>
        <p>Thank you for reaching out to BMR Advisory.</p>
        <p>We have received your inquiry regarding <strong>${company || 'your organization'}</strong>. A strategist is reviewing your message and will be in touch shortly to discuss how we can help close the Promise Gap™ within your systems.</p>
        <p>In the meantime, feel free to explore our Field Guide for recent insights.</p>
        <br />
        <p style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 14px; color: #64748b;">
          <strong>BMR Advisory</strong><br />
          Strategic Systems & Operational Reality
        </p>
      </div>
    `,
  };

  try {
    // Sends both emails at once
    await sgMail.send([internalMsg, autoReplyMsg]);
    return res.status(200).json({ message: 'Success' });
  } catch (error: any) {
    console.error("SendGrid Error:", error.response?.body || error.message);
    return res.status(500).json({ message: 'Error sending emails' });
  }
}
