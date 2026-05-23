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

      // 🛠️ FIX: Enforced isolated multi-column indexing parameters to stop historical records from being squashed
      const { error: dbError } = await supabase.from('operators').upsert({
        email: targetEmail,
        group_id: groupId,      
        audit_id: parentAuditId,  
        persona_type: standardizedRole, 
        access_code: code,
        is_authorized: true,
        status: 'pending'        
      }, { onConflict: 'email,audit_id' });

      if (dbError) throw new Error(`Database Error: ${dbError.message}`);

      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${code}`;

      // 📧 FIX: Injected table formatting matrices to block text-alignment collapses across email apps
      emailPromises.push(sgMail.send({
        to: targetEmail,
        from: FROM_EMAIL,
        subject: `ACTION REQUIRED: ${standardizedRole} Forensic Node Authorized // ${orgName}`,
        html: `
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617; font-family: monospace;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; width: 100%; background: #020617; color: #ffffff; padding: 40px; border: 2px solid #dc2626; box-sizing: border-box; text-align: left;">
                  <h2 style="color: #dc2626; font-family: monospace; font-size: 20px; font-weight: 900; text-transform: uppercase; margin: 0 0 5px 0; letter-spacing: 1px; text-align: left;">
                    BMR SOLUTIONS // FORENSIC TRIANGULATION
                  </h2>
                  <p style="font-family: monospace; font-size: 10px; color: #64748b; margin: 0 0 20px 0; text-transform: uppercase; text-align: left;">
                    ENTITY: ${orgName} | PROTOCOL: ${standardizedRole}_NODE
                  </p>
                  <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;"/>
                  <p style="font-family: monospace; line-height: 1.6; font-size: 14px; color: #ffffff; margin: 0 0 20px 0; text-align: left;">
                    A forensic node has been authorized for your role. Triangulation is required to finalize the ${orgName} risk profile.
                  </p>
                  <p style="font-family: monospace; line-height: 1.6; font-size: 14px; color: #ffffff; margin: 0 0 30px 0; text-align: left;">
                    Your secure access code is: <span style="color: #dc2626; font-weight: bold; font-family: monospace;">${code}</span>
                  </p>
                  <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 30px; margin-bottom: 40px; text-align: left;">
                    <tr>
                      <td align="left">
                        <a href="${diagnosticLink}" target="_blank" style="background: #dc2626; color: #ffffff; padding: 18px 30px; text-decoration: none; font-weight: bold; display: inline-block; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; font-family: monospace; border: 1px solid #dc2626;">
                          INITIALIZE SECURE NODE →
                        </a>
                      </td>
                    </tr>
                  </table>
                  <p style="font-family: monospace; font-size: 10px; color: #475569; margin: 40px 0 0 0; border-top: 1px solid #1e293b; padding-top: 20px; text-transform: uppercase; text-align: left;">
                    CONFIDENTIAL // BMR SOLUTIONS ENCRYPTION ACTIVE
                  </p>
                </div>
              </td>
            </tr>
          </table>
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
