import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// 🛡️ SECURITY HANDSHAKE - Using your established SendGrid key
sgMail.setApiKey(process.env.BMR_SENDGRID_KEY as string);

const isBusinessEmail = (email: string) => {
  const personalDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'aol.com', 'msn.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  return domain && !personalDomains.includes(domain);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { techEmail, mgrEmail, primaryEmail, entityName, reworkTax } = req.body;

  // Final Gate: Ensure no personal domains slipped through the front-end
  if (!isBusinessEmail(techEmail) || !isBusinessEmail(mgrEmail)) {
    return res.status(400).json({ error: 'BUSINESS_DOMAIN_REQUIRED' });
  }

  const leads = [
    { email: techEmail, lens: 'TECHNICAL' },
    { email: mgrEmail, lens: 'MANAGERIAL' },
    { email: primaryEmail, lens: 'EXECUTIVE' }
  ];

  try {
    const emailPromises = leads.map(lead => {
      const accessUrl = `${process.env.NEXT_PUBLIC_APP_URL}/deep-dive?email=${encodeURIComponent(lead.email)}`;
      
      return sgMail.send({
        to: lead.email,
        from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
        subject: `OPERATIONAL_DIRECTIVE: ${lead.lens} Audit Authorized // ${entityName}`,
        html: `
          <div style="font-family: monospace; background: #020617; color: #f8fafc; padding: 40px; border: 2px solid #dc2626;">
            <h2 style="color: #dc2626; text-transform: uppercase;">BMR SOLUTIONS // MRI_AUTHORIZED</h2>
            <p><strong>ENTITY:</strong> ${entityName}</p>
            <p><strong>LENS:</strong> ${lead.lens}</p>
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;" />
            <p>Initial triage identified a systemic rework tax of <strong>$${reworkTax}M</strong>.</p>
            <p>Your specific lens is required to finalize the Structural Resilience Index (SRI).</p>
            <a href="${accessUrl}" style="display: inline-block; background: #dc2626; color: white; padding: 15px 25px; text-decoration: none; font-weight: bold; margin-top: 20px; border-radius: 0px;">INITIALIZE_LENS_AUDIT</a>
            <p style="font-size: 10px; color: #475569; margin-top: 40px;">BMR SOLUTIONS // SECURE DISPATCH</p>
          </div>
        `
      });
    });

    await Promise.all(emailPromises);
    return res.status(200).json({ status: 'SUCCESS' });
  } catch (error: any) {
    console.error("SENDGRID_DISPATCH_ERROR:", error.response?.body || error.message);
    return res.status(500).json({ error: 'EMAIL_DISPATCH_FAILURE' });
  }
}
