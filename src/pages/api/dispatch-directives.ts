import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { supabase } from '@/lib/supabaseClient';

sgMail.setApiKey(process.env.BMR_SENDGRID_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  
  const { groupId, orgName, emails, parentAuditId } = req.body;
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://lab.bmradvisory.co';

  console.log("INITIALIZING_DISPATCH:", { orgName, parentAuditId });

  if (!parentAuditId) {
    return res.status(400).json({ error: 'MISSING_PARENT_AUDIT_ID' });
  }

  try {
    const roles = Object.entries(emails);
    const emailPromises = [];

    for (const [role, email] of roles) {
      const targetEmail = (email as string).trim().toLowerCase();
      if (!targetEmail) continue;

      // 1. Generate unique access code
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();

      // 2. Database Sync - Now with UUID Anchor
      const { error: dbError } = await supabase.from('operators').upsert({
        email: targetEmail,
        group_id: groupId,       // Org Name Label
        audit_id: parentAuditId,  // CRITICAL UUID LINK
        persona_type: role,
        access_code: code,
        is_authorized: true,
        status: 'pending'        // Ensure fresh start
      }, { onConflict: 'email' });

      if (dbError) {
        console.error(`DB_SYNC_ERROR [${role}]:`, dbError.message);
        // We continue to send the email, but log the failure
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
            <p style="line-height: 1.6; font-size: 14px;">A forensic node has been authorized for your role. Triangulation is required to finalize the ${orgName} risk profile.</p>
            <p style="line-height: 1.6;">Your secure access code is: <span style="color: #dc2626; font-weight: bold;">${code}</span></p>
            <div style="margin-top: 30px;">
              <a href="${diagnosticLink}" style="background: #dc2626; color: white; padding: 18px 30px; text-decoration: none; font-weight: bold; display: inline-block; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">INITIALIZE_SECURE_NODE →</a>
            </div>
            <p style="font-size: 10px; color: #475569; margin-top: 40px; border-top: 1px solid #1e293b; pt-20;">CONFIDENTIAL // BMR_LABS_ENCRYPTION_ACTIVE</p>
          </div>
        `
      }));
    }

    // Update parent audit status to show it is now in the field
    await supabase
      .from('audits')
      .update({ status: 'TRIANGULATING' })
      .eq('id', parentAuditId);

    await Promise.all(emailPromises);
    console.log("DISPATCH_COMPLETE: All nodes synchronized.");
    
    return res.status(200).json({ status: 'SUCCESS' });
    
  } catch (error: any) {
    console.error("DISPATCH_CRITICAL_FAILURE:", error);
    return res.status(500).json({ error: 'DISPATCH_FAILURE', details: error.message });
  }
}
