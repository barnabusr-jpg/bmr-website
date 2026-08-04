import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

const SENDGRID_KEY = process.env.BMR_SENDGRID_KEY || process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_KEY as string);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper Engine: Converts organization names into clear title case formats
function toSentenceCase(str: string): string {
  if (!str) return 'Your Organization';
  const clean = str.replace(/_/g, ' ').toLowerCase().trim();
  return clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const ROLE_MAP: Record<string, string> = {
  'executive': 'EXECUTIVE', 
  'exec': 'EXECUTIVE',
  'executivenode': 'EXECUTIVE', 
  
  'tech mgmt': 'TECHNICAL',
  'technical': 'TECHNICAL', 
  'tech': 'TECHNICAL', 
  'technicalnode': 'TECHNICAL',
  
  'ops mgmt': 'MANAGERIAL', 
  'managerial': 'MANAGERIAL', 
  'manager': 'MANAGERIAL', 
  'man': 'MANAGERIAL',
  'managerialnode': 'MANAGERIAL',

  'ops_mgmt': 'MANAGERIAL',
  'system user': 'EXECUTIVE',
  'system_user': 'EXECUTIVE',
  'techMgmt': 'TECHNICAL',
  'opsMgmt': 'MANAGERIAL',
  'systemUser': 'EXECUTIVE',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("🚀 ENGINE ACTIVATED - INCOMING BODY:", JSON.stringify(req.body));

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { groupId, orgName, emails, parentAuditId } = req.body;
  
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bmradvisory.co';
  const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co'; 

  if (!parentAuditId) {
    console.error("❌ ENGINE CRASH: Payload is missing parentAuditId. Received:", req.body);
    return res.status(400).json({ error: 'MISSING PARENT AUDIT ID' });
  }

  try {
    const roles = Object.entries(emails);
    const emailPromises = [];
    const prettyCompany = toSentenceCase(orgName);

    for (const [rawRole, email] of roles) {
      const targetEmail = (email as string).trim().toLowerCase();
      if (!targetEmail) continue;

      const normalizedKey = rawRole.toLowerCase().trim();
      const standardizedRole = ROLE_MAP[normalizedKey];

      if (!standardizedRole) {
        return res.status(400).json({ 
          error: 'INVALID NODE ASSIGNMENT', 
          message: `The provided role identifier "${rawRole}" is incompatible with the system engine.` 
        });
      }

      const code = Math.random().toString(36).substring(2, 10).toUpperCase();

      const { data: existingNode, error: checkError } = await supabaseAdmin
        .from('operators')
        .select('id')
        .eq('audit_id', parentAuditId)
        .eq('persona_type', standardizedRole)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingNode) {
        const { error: updateError } = await supabaseAdmin
          .from('operators')
          .update({
            email: targetEmail,
            access_code: code,
            status: 'pending'
          })
          .eq('id', existingNode.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabaseAdmin
          .from('operators')
          .insert({
            audit_id: parentAuditId,
            group_id: groupId,
            email: targetEmail,
            persona_type: standardizedRole,
            access_code: code,
            is_authorized: true,
            status: 'pending',
            survey_completed: false
          });

        if (insertError) throw insertError;
      }

      const diagnosticLink = `${BASE_URL}/diagnostic?code=${code}`;

      if (standardizedRole === 'EXECUTIVE') {
        // DISPATCH ONE: Executive Alignment Email Template (Light Executive Theme)
        emailPromises.push(sgMail.send({
          to: targetEmail,
          from: {
            name: "BMR Solutions",
            email: FROM_EMAIL
          },
          subject: `ACTION REQUIRED: Pre-Automation Diagnostic Access // ${prettyCompany}`,
          html: `
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <div style="max-width: 600px; width: 100%; background: #ffffff; color: #0f172a; padding: 40px; border: 1px solid #e2e8f0; border-top: 6px solid #0f172a; border-radius: 6px; box-sizing: border-box;">
                    
                    <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0 0 4px 0; letter-spacing: -0.5px;">BMR Solutions // Executive Diagnostic</h2>
                    <p style="font-size: 11px; font-family: monospace; color: #64748b; margin: 0 0 24px 0; font-weight: 600;">Target Organization: ${prettyCompany}</p>
                    
                    <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0"/>
                    
                    <p style="line-height: 1.6; font-size: 14px; color: #334155; margin: 0 0 16px 0;">
                      The pre-automation AI readiness diagnostic for <strong>${prettyCompany}</strong> is underway to evaluate operational friction, schema stability, and risk guardrails prior to scaling autonomous agents.
                    </p>

                    <p style="line-height: 1.6; font-size: 14px; color: #334155; margin: 0 0 24px 0;">
                      Invitation links have been dispatched to designated leadership and engineering stakeholders. Please ensure your team reviews their inbox to complete their respective assessment modules.
                    </p>

                    <!-- STEP 1: Assessment Link -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 20px; margin-bottom: 16px; border-radius: 4px; text-align: left;">
                      <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; color: #64748b; font-weight: 700; text-transform: uppercase;">Step 1: Complete Executive Assessment</p>
                      <p style="margin: 0 0 12px 0; font-size: 13px; color: #475569;">
                        Access your secure link to begin your executive assessment module:
                      </p>
                      <a href="${diagnosticLink}" target="_blank" style="color: #0f172a; font-weight: 700; font-size: 13px; text-decoration: underline;">
                        Open Executive Assessment Track →
                      </a>
                    </div>

                    <!-- STEP 2: Stakeholder Alignment -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #64748b; padding: 20px; margin-bottom: 24px; border-radius: 4px; text-align: left;">
                      <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; color: #64748b; font-weight: 700; text-transform: uppercase;">Step 2: Stakeholder Alignment</p>
                      <p style="margin: 0; font-size: 13px; color: #475569;">
                        Notify your managerial and technical leads to verify their direct links and complete their node evaluations promptly.
                      </p>
                    </div>

                    <!-- STEP 3: Calibration Scheduling Link -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #dc2626; padding: 20px; margin-bottom: 24px; border-radius: 4px; text-align: left;">
                      <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; color: #dc2626; font-weight: 700; text-transform: uppercase;">Step 3: Executive Briefing</p>
                      <a href="https://calendly.com/hello-bmradvisory/forensic-briefing" target="_blank" style="color: #0f172a; font-weight: 700; font-size: 13px; text-decoration: underline;">
                        Schedule Executive Calibration Briefing →
                      </a>
                    </div>

                    <p style="font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 20px; margin-top: 24px;">
                      Sincerely,<br/>
                      <strong style="color: #0f172a;">BMR Solutions Independent Advisory</strong>
                    </p>
                    
                  </div>
                </td>
              </tr>
            </table>
          `
        }));
      } else {
        // DISPATCH TWO: Stakeholder Node Notification Template (Light Executive Theme)
        emailPromises.push(sgMail.send({
          to: targetEmail,
          from: {
            name: "BMR Solutions",
            email: FROM_EMAIL
          },
          subject: `ACTION REQUIRED: ${standardizedRole} Track Assessment Authorized // ${prettyCompany}`,
          html: `
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <div style="max-width: 600px; width: 100%; background: #ffffff; color: #0f172a; padding: 40px; border: 1px solid #e2e8f0; border-top: 6px solid #0f172a; border-radius: 6px; box-sizing: border-box;">
                    
                    <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0 0 4px 0; letter-spacing: -0.5px;">
                      BMR Solutions // Operational Assessment
                    </h2>
                    <p style="font-size: 11px; font-family: monospace; color: #64748b; margin: 0 0 20px 0; font-weight: 600;">
                      Organization: ${prettyCompany} | Track: ${standardizedRole} NODE
                    </p>
                    
                    <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0"/>
                    
                    <p style="line-height: 1.6; font-size: 14px; color: #334155; margin: 0 0 16px 0;">
                      Leadership at <strong>${prettyCompany}</strong> has initiated a pre-automation diagnostic with BMR Solutions. This review evaluates system readiness, schema stability, and operational friction prior to scaling AI models and automated workflows.
                    </p>
                    
                    <p style="line-height: 1.6; font-size: 14px; color: #334155; margin: 0 0 24px 0;">
                      You are designated as the stakeholder representative for the <strong>${standardizedRole} Track</strong>. Select the button below to access your secure assessment module.
                    </p>
                    
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; margin-bottom: 28px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #475569;">
                      Access Code: <span style="color: #dc2626; font-weight: 800;">${code}</span>
                    </div>

                    <div style="margin-bottom: 32px;">
                      <a href="${diagnosticLink}" target="_blank" style="background: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: 700; display: inline-block; font-size: 12px; letter-spacing: 1px; border-radius: 4px; text-transform: uppercase;">
                        Open Diagnostic Track →
                      </a>
                    </div>
                    
                    <p style="font-size: 11px; font-family: monospace; color: #94a3b8; margin: 32px 0 0 0; border-top: 1px solid #f1f5f9; padding-top: 20px; text-transform: uppercase;">
                      Confidential // BMR Solutions Independent Governance
                    </p>

                  </div>
                </td>
              </tr>
            </table>
          `
        }));
      }
    }

    const { data: allOperators, error: queryError } = await supabaseAdmin
      .from('operators')
      .select('survey_completed')
      .eq('audit_id', parentAuditId);

    if (queryError || !allOperators) {
      throw new Error('Failed to aggregate active stakeholder paths.');
    }

    const totalPaths = allOperators.length;
    const unsubmittedPaths = allOperators.filter((o) => !o.survey_completed).length;
    const logicDecayCoefficient = totalPaths > 0 ? unsubmittedPaths / totalPaths : 0.00;

    const { data: activeAudit, error: auditFetchError } = await supabaseAdmin
      .from('audits')
      .select('hai_raw_score, avs_raw_score, igf_raw_score, status, compiled_at, decay_pct')
      .eq('id', parentAuditId)
      .single();

    if (auditFetchError || !activeAudit) {
      throw new Error('Failed to retrieve primary core diagnostic metrics.');
    }

    const adjustedHAI = Number(activeAudit.hai_raw_score || 0) * (1 - logicDecayCoefficient);
    const adjustedAVS = Number(activeAudit.avs_raw_score || 0) * (1 - logicDecayCoefficient);
    const adjustedIGF = Number(activeAudit.igf_raw_score || 0) * (1 - logicDecayCoefficient);

    let recommendedService = 'PRE-AUTOMATION GOVERNANCE';
    let targetNode = 'EXECUTIVE';
    let speciesIdentifier = 'Continuous Verification / DLP Guardrails';

    if (adjustedHAI < adjustedAVS && adjustedHAI < adjustedIGF && adjustedHAI < 55.00) {
      recommendedService = 'Oversight Decoupling Audit';
      targetNode = 'MANAGERIAL';
      speciesIdentifier = 'Validation Fatigue / Alert Exhaustion';
    } else if (adjustedAVS < adjustedHAI && adjustedAVS < adjustedIGF && adjustedAVS < 55.00) {
      recommendedService = 'Pipeline Hardening Diagnostic';
      targetNode = 'TECHNICAL';
      speciesIdentifier = 'Schema Drift / Ingestion Instability';
    } else if (adjustedIGF < 55.00) {
      recommendedService = 'Pre-Automation Control Plane';
      targetNode = 'EXECUTIVE';
      speciesIdentifier = 'Promise Gap™ Alignment Deficit';
    }

    const cleanSystemTimestamp = new Date().toISOString();

    const { error: updateError } = await supabaseAdmin
      .from('audits')
      .update({ 
        status: 'TRIANGULATING',
        compiled_at: cleanSystemTimestamp
      })
      .eq('id', parentAuditId);

    if (updateError) {
      throw new Error(`Primary Ledger State Compilation Error: ${updateError.message}`);
    }

    try {
      if (emailPromises.length > 0) {
        await Promise.all(emailPromises);
      }
    } catch (emailErr: any) {
      console.warn("⚠️ THIRD PARTY NOTICE // SendGrid authentication barrier caught:", emailErr.message);
    }
    
    return res.status(200).json({ 
      status: 'SUCCESS',
      compilationMode: 'COMPLETE TRIANGULATION',
      metrics: {
        logicDecayCoefficient: Number(logicDecayCoefficient.toFixed(2)),
        adjustedHAI: Number(adjustedHAI.toFixed(2)),
        adjustedAVS: Number(adjustedAVS.toFixed(2)),
        adjustedIGF: Number(adjustedIGF.toFixed(2))
      },
      referralPayload: {
        recommendedService,
        targetNode,
        speciesIdentifier,
        confirmationLabel: 'Generate Access Keys'
      }
    });

  } catch (error: any) {
    console.error("DISPATCH CRITICAL BREAKDOWN EXCEPTION:", error.message);
    return res.status(500).json({ 
      error: 'DISPATCH METRIC FAILURE', 
      message: error.message 
    });
  }
}
