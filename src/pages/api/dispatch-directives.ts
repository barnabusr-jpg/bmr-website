import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { supabase } from '@/lib/supabaseClient';

sgMail.setApiKey(process.env.BMR_SENDGRID_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  
  const { groupId, orgName, emails, parentAuditId } = req.body;
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://lab.bmradvisory.co';

  try {
    const roles = Object.entries(emails);
    const emailPromises = [];

    for (const [role, email] of roles) {
      if (!email) continue;

      // 1. Generate the Code
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();

      // 2. Save to Database (Ensuring the column name matches your SQL exactly: access_code)
      const { error: dbError } = await supabase.from('operators').upsert({
        email: email as string,
        group_id: groupId,
        persona_type: role,
        access_code: code, // Must match your SQL column
        is_authorized: true
      }, { onConflict: 'email' });

      if (dbError) {
        console.error(`DATABASE_UPSERT_ERROR for ${role}:`, dbError);
        continue; 
      }

      // 3. Build the Link (Ensuring ?code= is explicit)
      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${code}`;
      
      emailPromises.push(sgMail.send({
        to: email as string,
        from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
        subject: `ACTION_REQUIRED: ${role} Forensic Node Authorized // ${orgName}`,
        html: `
          <div style="font-family: monospace; background: #020617; color: white; padding: 40px; border: 2px solid #dc2626;">
            <h2 style="color: #dc2626; text-transform: uppercase; margin-bottom: 5px;">BMR_ADVISORY // FORENSIC_TRIANGULATION</h2>
            <p style="font-size: 10px; color: #64748b; margin-top: 0;">ENTITY: ${orgName} | PROTOCOL: ${role}_NODE</p>
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;"/>
            <p style="line-height: 1.6;">Access Code: <span style="color: #dc2626; font-weight: bold;">${code}</span></p>
            <div style="margin-top: 30px;">
              <a href="${diagnosticLink}" style="background: #dc2626; color: white; padding: 18px 30px; text-decoration: none; font-weight: bold; display: inline-block; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">INITIALIZE_SECURE_NODE →</a>
            </div>
          </div>
        `
      }));
    }

    if (parentAuditId) {
      await supabase.from('audits').update({ status: 'TRIANGULATING' }).eq('id', parentAuditId);
    }

    await Promise.all(emailPromises);
    return res.status(200).json({ status: 'SUCCESS' });
    
  } catch (error: any) {
    console.error("DISPATCH_CRITICAL_FAILURE:", error);
    return res.status(500).json({ error: 'DISPATCH_FAILURE' });
  }
}
