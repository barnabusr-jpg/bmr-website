import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { supabase } from '@/lib/supabaseClient';

sgMail.setApiKey(process.env.BMR_SENDGRID_KEY as string);

const ROLE_MAP: Record<string, string> = {
  'managerial': 'MGR', 'technical': 'TEC', 'executive': 'EXE',
  'manager': 'MGR', 'tech': 'TEC', 'exec': 'EXE', 'man': 'MGR',
  'executivenode': 'EXE', 'technicalnode': 'TEC', 'managerialnode': 'MGR'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  
  const { groupId, orgName, emails, parentAuditId } = req.body;
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://lab.bmradvisory.co';
  
  // KEEPING THIS AS ADVISORY TO PREVENT DISPATCH FAILURE
  const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co'; 

  if (!parentAuditId) return res.status(400).json({ error: 'MISSING_PARENT_AUDIT_ID' });

  try {
    const roles = Object.entries(emails);
    const emailPromises = [];

    for (const [rawRole, email] of roles) {
      const targetEmail = (email as string).trim().toLowerCase();
      if (!targetEmail) continue;

      const normalizedKey = rawRole.toLowerCase().trim();
      const standardizedRole = ROLE_MAP[normalizedKey] || rawRole.toUpperCase().substring(0, 3);
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();

      const { error: dbError } = await supabase.from('operators').upsert({
        email: targetEmail,
        group_id: groupId,      
        audit_id: parentAuditId,  
        persona_type: standardizedRole, 
        access_code: code,
        is_authorized: true,
        status: 'pending'        
      }, { onConflict: 'email' });

      if (dbError) throw new Error(`Database Error: ${dbError.message}`);

      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${code}`;

      emailPromises.push(sgMail.send({
        to: targetEmail,
        from: FROM_EMAIL,
        subject: `ACTION REQUIRED: ${standardizedRole} Forensic Node Authorized // ${orgName}`,
        html: `
          <div style="font-family: monospace; background: #020617; color: white; padding: 40px; border: 2px solid #dc2626; text-align: left;">
            <h2 style="color: #dc2626; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 1px; text-align: left;">BMR SOLUTIONS // FORENSIC TRIANGULATION</h2>
            <p style="font-size: 10px; color: #64748b; margin-top: 0; text-transform: uppercase; text-align: left;">ENTITY: ${orgName} | PROTOCOL: ${standardizedRole}_NODE</p>
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;"/>
            <p style="line-height: 1.6; font-size: 14px; text-align: left;">A forensic node has been authorized for your role. Triangulation is required to finalize the ${orgName} risk profile.</p>
            <p style="line-height: 1.6; text-align: left;">Your secure access code is: <span style="color: #dc2626; font-weight: bold;">${code}</span></p>
            <div style="margin-top: 30px; text-align: left;">
              <a href="${diagnosticLink}" style="background: #dc2626; color: white; padding: 18px 30px; text-decoration: none; font-weight: bold; display: inline-block; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">INITIALIZE SECURE NODE →</a>
            </div>
            <p style="font-size: 10px; color: #475569; margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px; text-transform: uppercase; text-align: left;">CONFIDENTIAL // BMR SOLUTIONS ENCRYPTION ACTIVE</p>
          </div>
        `
      }));
    }

    await supabase.from('audits').update({ status: 'TRIANGULATING' }).eq('id', parentAuditId);
    await Promise.all(emailPromises);
    
    return res.status(200).json({ status: 'SUCCESS' });

  } catch (error: any) {
    console.error("DISPATCH_CRITICAL_FAILURE:", error.response?.body || error.message);
    return res.status(500).json({ 
        error: 'DISPATCH_FAILURE', 
        message: error.message 
    });
  }
}
