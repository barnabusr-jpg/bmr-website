import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { supabase } from '@/lib/supabaseClient';

sgMail.setApiKey(process.env.BMR_SENDGRID_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  
  const { groupId, orgName, emails, parentAuditId } = req.body;

  // --- FAIL-SAFE BASE URL LOGIC ---
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://lab.bmradvisory.co';

  try {
    const roles = Object.entries(emails);
    const emailPromises = [];

    for (const [role, email] of roles) {
      if (!email) continue;

      // Unique access code generation
      const accessToken = Math.random().toString(36).substring(2, 10).toUpperCase();

      // Upsert operator to link them to the group and store their specific role
      const { error: upsertError } = await supabase.from('operators').upsert({
        email: email as string,
        group_id: groupId,
        persona_type: role,
        access_code: accessToken,
        is_authorized: true
      }, { onConflict: 'email' });

      if (upsertError) {
        console.error(`DB_OPERATOR_ERROR for ${role}:`, upsertError);
        continue;
      }

      // Build the diagnostic link
      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${accessToken}`;
      
      emailPromises.push(sgMail.send({
        to: email as string,
        from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
        subject: `ACTION_REQUIRED: ${role} Forensic Node Authorized // ${orgName}`,
        html: `
          <div style="font-family: monospace; background: #020617; color: white; padding: 40px; border: 2px solid #dc2626;">
            <h2 style="color: #dc2626; text-transform: uppercase; margin-bottom: 5px;">BMR_ADVISORY // FORENSIC_TRIANGULATION</h2>
            <p style="font-size: 10px; color: #64748b; margin-top: 0;">ENTITY: ${orgName} | PROTOCOL: ${role}_NODE</p>
            
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;"/>
            
            <p style="line-height: 1.6;">You have been designated as the <strong>${role} Stakeholder</strong> for the AI Forensic Diagnostic of <strong>${orgName}</strong>.</p>
            <p style="line-height: 1.6;">Your unique access code is: <span style="color: #dc2626; font-weight: bold;">${accessToken}</span></p>
            
            <div style="margin-top: 30px;">
              <a href="${diagnosticLink}" style="background: #dc2626; color: white; padding: 18px 30px; text-decoration: none; font-weight: bold; display: inline-block; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">INITIALIZE_SECURE_NODE →</a>
            </div>
            
            <p style="margin-top: 40px; font-size: 10px; color: #475569;">SECURITY_NOTICE: This link is unique to your identity. Synthesis will only begin once all three stakeholder nodes (EXECUTIVE, MANAGER, TECHNICAL) are submitted.</p>
          </div>
        `
      }));
    }

    // Update the main lead status to show triangulation has started
    if (parentAuditId) {
        await supabase.from('audits').update({ status: 'TRIANGULATING' }).eq('id', parentAuditId);
    }

    await Promise.all(emailPromises);
    return res.status(200).json({ status: 'SUCCESS' });
    
  } catch (error: any) {
    console.error("SENDGRID_DISPATCH_FAILURE:", error);
    return res.status(500).json({ error: 'DISPATCH_FAILURE' });
  }
}
