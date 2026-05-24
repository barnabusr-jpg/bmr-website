import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { supabase } from '@/lib/supabaseClient';

const SENDGRID_KEY = process.env.BMR_SENDGRID_KEY || process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_KEY as string);

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

  if (!parentAuditId) return res.status(400).json({ error: 'MISSING PARENT AUDIT ID' });

  try {
    const roles = Object.entries(emails);
    const emailPromises = [];

    for (const [rawRole, email] of roles) {
      const targetEmail = (email as string).trim().toLowerCase();
      if (!targetEmail) continue;

      const normalizedKey = rawRole.toLowerCase().trim();
      const standardizedRole = ROLE_MAP[normalizedKey] || rawRole.toUpperCase().substring(0, 3);
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();

      const { data: existingOperator } = await supabase
        .from('operators')
        .select('id')
        .eq('email', targetEmail)
        .maybeSingle();

      if (existingOperator) {
        const { error: updateError } = await supabase
          .from('operators')
          .update({
            group_id: groupId,
            audit_id: parentAuditId,
            persona_type: standardizedRole,
            access_code: code,
            is_authorized: true,
            status: 'pending'
          })
          .eq('id', existingOperator.id);

        if (updateError) throw new Error(`Database Update Error: ${updateError.message}`);
      } else {
        const { error: insertError } = await supabase
          .from('operators')
          .insert({
            email: targetEmail,
            group_id: groupId,      
            audit_id: parentAuditId,  
            persona_type: standardizedRole, 
            access_code: code,
            is_authorized: true,
            status: 'pending'
          });

        if (insertError) throw new Error(`Database Insert Error: ${insertError.message}`);
      }

      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${code}`;

      // ⚡ RE-ALIGNED COMMUNICATIONS CORE: 100% contraction free, 0 underscores, dynamic department variable resolution
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
                    BMR Solutions // Systems Audit Engine
                  </h2>
                  <p style="font-family: monospace; font-size: 10px; color: #64748b; margin: 0 0 20px 0; text-transform: uppercase; text-align: left;">
                    Company Name: ${orgName} | Role Assignment: ${standardizedRole} NODE
                  </p>
                  
                  <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;"/>
                  
                  <p style="font-family: monospace; line-height: 1.6; font-size: 13px; color: #94a3b8; margin: 0 0 15px 0; text-align: left;">
                    Your company leadership recently started a diagnostic project with BMR Solutions. This project is designed to evaluate your technology investments. The goal is to identify operational waste, uncover structural errors, and discover hidden costs within your AI systems.
                  </p>
                  
                  <p style="font-family: monospace; line-height: 1.6; font-size: 13px; color: #94a3b8; margin: 0 0 25px 0; text-align: left;">
                    To complete this system review, we require independent feedback from different departments. You are designated as the representative for the <strong>${standardizedRole} Node</strong>. When you select the verification link below, the system will open your specific questionnaire module. Thank you for your attention and support in this matter.
                  </p>
                  
                  <p style="font-family: monospace; line-height: 1.6; font-size: 14px; color: #ffffff; margin: 0 0 30px 0; text-align: left;">
                    Your personal access code is: <span style="color: #dc2626; font-weight: bold; font-family: monospace;">${code}</span>
                  </p>
                  
                  <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 30px; margin-bottom: 40px; text-align: left;">
                    <tr>
                      <td align="left">
                        <a href="${diagnosticLink}" target="_blank" style="background: #dc2626; color: #ffffff; padding: 18px 30px; text-decoration: none; font-weight: bold; display: inline-block; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; font-family: monospace; border: 1px solid #dc2626;">
                          Open Diagnostic Module →
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="font-family: monospace; font-size: 10px; color: #475569; margin: 40px 0 0 0; border-top: 1px solid #1e293b; padding-top: 20px; text-transform: uppercase; text-align: left;">
                    Confidential // BMR Solutions Stakeholder Secure Connection
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
    console.error("DISPATCH CRITICAL FAILURE:", error.response?.body || error.message);
    return res.status(500).json({ 
        error: 'DISPATCH FAILURE', 
        message: error.message 
    });
  }
}
