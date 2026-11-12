import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

const SENDGRID_KEY = process.env.BMR_SENDGRID_KEY || process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_KEY as string);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function toSentenceCase(str: string): string {
  if (!str) return 'Your Organization';
  const clean = str.replace(/_/g, ' ').toLowerCase().trim();
  return clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Canonical inbound slug mapping
const ROLE_MAP: Record<string, string> = {
  // Track 01: Executive & Governance
  'executive': 'EXECUTIVE',
  'exec': 'EXECUTIVE',
  'executivenode': 'EXECUTIVE',

  // Track 02: Engineering & Infrastructure
  'tech mgmt': 'TECHNICAL',
  'tech_mgmt': 'TECHNICAL',
  'techmgmt': 'TECHNICAL',
  'tech': 'TECHNICAL',
  'technical': 'TECHNICAL',
  'technicalnode': 'TECHNICAL',
  'techMgmt': 'TECHNICAL',
  'engineering': 'TECHNICAL',

  // Track 03: Operations & Management
  'ops mgmt': 'MANAGERIAL',
  'ops_mgmt': 'MANAGERIAL',
  'opsmgmt': 'MANAGERIAL',
  'ops': 'MANAGERIAL',
  'managerial': 'MANAGERIAL',
  'manager': 'MANAGERIAL',
  'man': 'MANAGERIAL',
  'managerialnode': 'MANAGERIAL',
  'opsMgmt': 'MANAGERIAL',
  'operations': 'MANAGERIAL',

  // Track 04: Frontline System Execution
  'system': 'SYSTEM',
  'system user': 'SYSTEM',
  'system_user': 'SYSTEM',
  'systemuser': 'SYSTEM',
  'user': 'SYSTEM',
  'sys': 'SYSTEM',
  'core_system': 'SYSTEM',
  'systemUser': 'SYSTEM',
  'frontline': 'SYSTEM',
  'frontline_system': 'SYSTEM',
};

interface NodeConfig {
  nodeId: string;
  displayTitle: string;
  roleExplanation: string;
}

const NODE_METADATA: Record<string, NodeConfig> = {
  EXECUTIVE: {
    nodeId: "NODE 01 // FORENSIC TRIANGULATION",
    displayTitle: "Executive & Governance",
    roleExplanation:
      "You’ve been invited to complete the Executive & Governance portion of the BMR Forensic Diagnostic. Please use the access code below to complete your section."
  },
  TECHNICAL: {
    nodeId: "NODE 02 // FORENSIC TRIANGULATION",
    displayTitle: "Engineering & Infrastructure",
    roleExplanation:
      "You’ve been invited to complete the Engineering & Infrastructure portion of the BMR Forensic Diagnostic. Please use the access code below to complete your section."
  },
  MANAGERIAL: {
    nodeId: "NODE 03 // FORENSIC TRIANGULATION",
    displayTitle: "Operations & Management",
    roleExplanation:
      "You’ve been invited to complete the Operations & Management portion of the BMR Forensic Diagnostic. Please use the access code below to complete your section."
  },
  SYSTEM: {
    nodeId: "NODE 04 // FORENSIC TRIANGULATION",
    displayTitle: "Frontline System Execution",
    roleExplanation:
      "You’ve been invited to complete the Frontline System Execution portion of the BMR Forensic Diagnostic. Please use the access code below to complete your section."
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { groupId, orgName, emails, parentAuditId, flowType } = req.body;
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bmradvisory.co';
  const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co';

  if (!parentAuditId) {
    return res.status(400).json({ error: 'MISSING PARENT AUDIT ID' });
  }

  try {
    const roles = Object.entries(emails || {});
    const emailPromises: Promise<any>[] = [];
    const prettyCompany = toSentenceCase(orgName);

    for (const [rawRole, email] of roles) {
      const targetEmail = (email as string).trim().toLowerCase();
      if (!targetEmail) continue;

      const normalizedKey = rawRole.toLowerCase().trim();
      const standardizedRole = ROLE_MAP[normalizedKey];

      if (!standardizedRole) {
        return res.status(400).json({
          error: 'INVALID NODE ASSIGNMENT',
          message: `The provided role identifier "${rawRole}" is incompatible.`
        });
      }

      const meta = NODE_METADATA[standardizedRole] || {
        nodeId: "DIAGNOSTIC NODE // FORENSIC TRIANGULATION",
        displayTitle: standardizedRole,
        roleExplanation: `You’ve been invited to complete the ${standardizedRole} portion of the BMR Forensic Diagnostic. Please use the access code below to complete your section.`
      };

      // Reuse existing access code if already created, otherwise generate once
      const { data: existingOp } = await supabaseAdmin
        .from('operators')
        .select('id, access_code')
        .eq('audit_id', parentAuditId)
        .eq('persona_type', standardizedRole)
        .maybeSingle();

      const code = existingOp?.access_code || Math.random().toString(36).substring(2, 10).toUpperCase();

      // Upsert record bound to (audit_id, persona_type), ensuring survey_completed resets to false
      const { error: upsertError } = await supabaseAdmin
        .from('operators')
        .upsert(
          {
            audit_id: parentAuditId,
            group_id: groupId || parentAuditId,
            persona_type: standardizedRole,
            email: targetEmail,
            access_code: code,
            is_authorized: true,
            status: 'pending',
            survey_completed: false
          },
          { onConflict: 'audit_id,persona_type' }
        );

      if (upsertError) throw upsertError;

      const basePath = flowType === 'quad_node' ? '/forensic' : '/diagnostic/forensic';
      const diagnosticLink = `${BASE_URL}${basePath}?code=${code}&role=${standardizedRole}&flow=${encodeURIComponent('quad_node')}&org=${encodeURIComponent(orgName || '')}`;

      emailPromises.push(
        sgMail.send({
          to: targetEmail,
          from: { name: "BMR Solutions", email: FROM_EMAIL },
          subject: `ACTION REQUIRED: ${meta.displayTitle} Diagnostic — Access Granted // ${prettyCompany}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 28px 16px; background-color: #f8fafc; color: #0f172a;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #0f172a; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow: hidden;">
                
                <!-- Header -->
                <div style="padding: 24px 32px; border-bottom: 1px solid #f1f5f9;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">
                    ${meta.nodeId}
                  </div>
                  <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
                    ${meta.displayTitle}
                  </h2>
                </div>

                <!-- Content Body -->
                <div style="padding: 32px; font-size: 14px; line-height: 1.6; color: #334155;">
                  <p style="margin-top: 0; margin-bottom: 16px;">
                    Target Organization: <strong style="color: #0f172a;">${prettyCompany}</strong>
                  </p>
                  
                  <p style="margin-bottom: 16px;">
                    ${meta.roleExplanation}
                  </p>

                  <p style="font-size: 13px; color: #475569; background: #f8fafc; padding: 12px 16px; border-left: 3px solid #0f172a; margin: 20px 0;">
                    Your responses help complete the organization-level diagnostic summary for ${prettyCompany}.
                  </p>

                  <!-- CTA Button -->
                  <div style="margin: 28px 0 24px 0;">
                    <a href="${diagnosticLink}" target="_blank" style="background-color: #0f172a; color: #ffffff; padding: 13px 26px; text-decoration: none; border-radius: 4px; font-weight: 700; font-size: 13px; display: inline-block; letter-spacing: 0.02em;">
                      Open ${meta.displayTitle} Track →
                    </a>
                  </div>

                  <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">
                    Your access code: <code style="font-family: monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: bold; color: #0f172a;">${code}</code>
                  </p>
                </div>

                <!-- Footer -->
                <div style="padding: 16px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; font-family: monospace;">
                  CONFIDENTIAL // Authorized BMR Diagnostic Dispatch
                </div>

              </div>
            </div>
          `
        })
      );
    }

    await supabaseAdmin
      .from('audits')
      .update({
        status: 'TRIANGULATING',
        compiled_at: new Date().toISOString()
      })
      .eq('id', parentAuditId);

    if (emailPromises.length > 0) {
      await Promise.allSettled(emailPromises);
    }

    return res.status(200).json({ status: 'SUCCESS' });
  } catch (error: any) {
    console.error("DISPATCH CRITICAL ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
