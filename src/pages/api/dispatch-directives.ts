import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { supabase } from '@/lib/supabaseClient';

sgMail.setApiKey(process.env.BMR_SENDGRID_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  const { techEmail, mgrEmail, primaryEmail, entityName, reworkTax, entityId } = req.body;

  try {
    const leads = [
      { email: techEmail, entity_id: entityId, lens: 'TECHNICAL', is_authorized: true },
      { email: mgrEmail, entity_id: entityId, lens: 'MANAGERIAL', is_authorized: true },
      { email: primaryEmail, is_authorized: true }
    ];

    await supabase.from('operators').upsert(leads, { onConflict: 'email' });
    await supabase.from('audits').update({ status: 'RELEASED' }).eq('id', entityId);

    const emailPromises = [techEmail, mgrEmail].map(email => {
      const lens = email === techEmail ? 'TECHNICAL' : 'MANAGERIAL';
      return sgMail.send({
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
        subject: `OPERATIONAL_DIRECTIVE: ${lens} Audit Authorized`,
        html: `<div style="font-family: monospace; background: #020617; color: white; padding: 40px; border: 2px solid #dc2626;">
          <h2 style="color: #dc2626; text-transform: uppercase;">BMR SOLUTIONS // MRI_AUTHORIZED</h2>
          <p>ENTITY: ${entityName} | LENS: ${lens}</p>
          <hr style="border-top: 1px solid #1e293b; margin: 20px 0;"/>
          <p>Initial triage identified rework tax of <strong>$${reworkTax}M</strong>.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/pulse-check?email=${encodeURIComponent(email)}" style="background: #dc2626; color: white; padding: 15px 25px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 30px;">INITIALIZE_LENS_AUDIT →</a>
        </div>`
      });
    });

    await Promise.all(emailPromises);
    return res.status(200).json({ status: 'SUCCESS' });
  } catch (error: any) {
    return res.status(500).json({ error: 'DISPATCH_FAILURE' });
  }
}
