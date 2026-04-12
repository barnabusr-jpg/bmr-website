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
      { email: primaryEmail, entity_id: entityId, lens: 'EXECUTIVE', is_authorized: true }
    ];

    const { error: dbError } = await supabase.from('operators').upsert(leads, { onConflict: 'email' });
    if (dbError) throw new Error(dbError.message);

    await supabase.from('audits').update({ status: 'RELEASED' }).eq('id', entityId);

    const emailPromises = [techEmail, mgrEmail].map(email => {
      const lens = email === techEmail ? 'TECHNICAL' : 'MANAGERIAL';
      return sgMail.send({
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
        subject: `OPERATIONAL_DIRECTIVE: ${lens} Audit Authorized`,
        html: `<div style="font-family: monospace; background: #020617; color: white; padding: 40px; border: 2px solid #dc2626;">
          <h2 style="color: #dc2626;">BMR SOLUTIONS // MRI_AUTHORIZED</h2>
          <p>ENTITY: ${entityName} | LENS: ${lens}</p>
          <p>Initial rework tax identified: <strong>$${reworkTax}M</strong>.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/pulse-check?email=${encodeURIComponent(email)}" style="background: #dc2626; color: white; padding: 15px; text-decoration: none; display: inline-block; margin-top: 20px;">INITIALIZE_AUDIT →</a>
        </div>`
      });
    });

    await Promise.all(emailPromises);
    return res.status(200).json({ status: 'SUCCESS' });
  } catch (error: any) {
    return res.status(500).json({ error: 'DISPATCH_FAILURE' });
  }
}
