import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { supabase } from '@/lib/supabaseClient';

sgMail.setApiKey(process.env.BMR_SENDGRID_KEY as string);

const isBusinessEmail = (email: string) => {
  const personalDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'aol.com', 'msn.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  return domain && !personalDomains.includes(domain);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  // entityId is required to link these leads to the original audit record
  const { techEmail, mgrEmail, primaryEmail, entityName, reworkTax, entityId } = req.body;

  // 1. Forensic Validation: Business Domain Check
  if (!isBusinessEmail(techEmail) || !isBusinessEmail(mgrEmail)) {
    return res.status(400).json({ error: 'BUSINESS_DOMAIN_REQUIRED' });
  }

  try {
    // 2. IDENTITY CREATION: Register leads in Supabase so they are pre-authorized
    const leadsToRegister = [
      { email: techEmail, entity_id: entityId, lens: 'TECHNICAL', is_authorized: true },
      { email: mgrEmail, entity_id: entityId, lens: 'MANAGERIAL', is_authorized: true }
      // Primary/Executive is usually already registered, but we can upsert to be safe
    ];

    const { error: dbError } = await supabase
      .from('operators')
      .upsert(leadsToRegister, { onConflict: 'email' });

    if (dbError) throw new Error(`DATABASE_FRACTURE: ${dbError.message}`);

    // 3. DISPATCH DIRECTIVES: SendGrid Loop
    const leadsToEmail = [
      { email: techEmail, lens: 'TECHNICAL' },
      { email: mgrEmail, lens: 'MANAGERIAL' }
    ];

    const emailPromises = leadsToEmail.map(lead => {
      const accessUrl = `${process.env.NEXT_PUBLIC_APP_URL}/deep-dive?email=${encodeURIComponent(lead.email)}`;
      
      return sgMail.send({
        to: lead.email,
        from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
        subject: `OPERATIONAL_DIRECTIVE: ${lead.lens} Audit Authorized // ${entityName}`,
        html: `
          <div style="font-family: monospace; background: #020617; color: #f8fafc; padding: 40px; border: 2px solid #dc2626;">
            <h2 style="color: #dc2626; text-transform: uppercase; letter-spacing: 2px;">BMR SOLUTIONS // MRI_AUTHORIZED</h2>
            <p style="font-size: 14px;"><strong>ENTITY:</strong> ${entityName}</p>
            <p style="font-size: 14px;"><strong>LENS:</strong> ${lead.lens}</p>
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;" />
            <p style="font-size: 13px; line-height: 1.6;">Initial triage identified a systemic rework tax of <strong>$${reworkTax}M</strong>.</p>
            <p style="font-size: 13px; line-height: 1.6; color: #94a3b8;">Your specific lens is required to finalize the Structural Resilience Index (SRI) for the 3-Lens Triangulation.</p>
            <div style="margin-top: 30px;">
              <a href="${accessUrl}" style="background: #dc2626; color: white; padding: 15px 25px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">INITIALIZE_LENS_AUDIT →</a>
            </div>
            <p style="font-size: 10px; color: #475569; margin-top: 50px; text-transform: uppercase;">BMR SOLUTIONS // SECURE DISPATCH // FORENSIC_MRI_V3</p>
          </div>
        `
      });
    });

    await Promise.all(emailPromises);
    return res.status(200).json({ status: 'SUCCESS' });

  } catch (error: any) {
    console.error("BMR_API_CRITICAL_FAILURE:", error.message);
    return res.status(500).json({ error: 'TRANSMISSION_OR_DATABASE_FAILURE' });
  }
}
