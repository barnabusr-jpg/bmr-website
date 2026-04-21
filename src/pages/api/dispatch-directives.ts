import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { supabase } from '@/lib/supabaseClient';

sgMail.setApiKey(process.env.BMR_SENDGRID_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  
  const { groupId, orgName, emails, parentAuditId } = req.body;
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://lab.bmradvisory.co';

  console.log("INITIALIZING_DISPATCH:", { orgName, parentAuditId });

  try {
    const roles = Object.entries(emails);
    const emailPromises = [];

    for (const [role, email] of roles) {
      const targetEmail = (email as string).trim();
      if (!targetEmail) continue;

      // 1. Generate unique access code
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();

      // 2. Attempt Database Sync
      // We log the error but DON'T kill the email if the DB fails.
      const { error: dbError } = await supabase.from('operators').upsert({
        email: targetEmail,
        group_id: groupId,
        persona_type: role,
        access_code: code,
        is_authorized: true
      }, { onConflict: 'email' });

      if (dbError) {
        console.error(`DB_SYNC_WARNING [${role}]:`, dbError.message);
        // We continue to send the email even if DB log fails so the user isn't blocked
      }

      // 3. Build Diagnostic Link
      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${code}`;
      
      console.log(`PREPARING_MAIL: ${role} -> ${targetEmail}`);

      emailPromises.push(sgMail.send({
        to: targetEmail,
        from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
        subject: `ACTION_REQUIRED: ${role} Forensic Node Authorized // ${orgName}`,
        html: `
          <div style="font-family: monospace; background: #020617; color: white; padding: 40px; border: 2px solid #dc2626;">
            <h2 style="color: #dc2626; text-transform: uppercase; margin-bottom: 5px;">BMR_ADVISORY // FORENSIC_TRIANGULATION</h2>
            <p style="font-size: 10px; color: #64748b; margin-top: 0;">ENTITY: ${orgName} | PROTOCOL: ${role}_NODE</p>
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;"/>
            <p style="line-height: 1.6;">Your secure access code is: <span style="color: #dc2626; font-weight: bold;">${code}</span></p>
            <p style="font-size: 12px; color: #94a3b8; margin-bottom: 30px;">Click the command below to initialize your forensic node and begin the triangulation process.</p>
            <div style="margin-top: 30px;">
              <a href="${diagnosticLink}" style="background: #dc2626; color: white; padding: 18px 30px; text-decoration: none; font-weight: bold; display: inline-block; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">INITIALIZE_SECURE_NODE →</a>
            </div>
          </div>
        `
      }));
    }

    // Update parent status
    if (parentAuditId) {
      await supabase.from('audits').update({ status: 'TRIANGULATING' }).eq('id', parentAuditId);
    }

    await Promise.all(emailPromises);
    console.log("DISPATCH_COMPLETE: All signals sent.");
    return res.status(200).json({ status: 'SUCCESS' });
    
  } catch (error: any) {
    console.error("DISPATCH_CRITICAL_FAILURE:", error);
    return res.status(500).json({ error: 'DISPATCH_FAILURE', details: error.message });
  }
}
