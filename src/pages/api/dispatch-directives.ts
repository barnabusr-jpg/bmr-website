import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

const SENDGRID_KEY = process.env.BMR_SENDGRID_KEY || process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_KEY as string);

// 🚀 PRIVILEGED MASTER ADMIN ACCESS INITIALIZATION
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

    // 🔄 PURE CODE STATE CHECK AND INGESTION PROTOCOL
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

      // Look up if a record for this persona already exists on this specific audit container
      const { data: existingNode, error: checkError } = await supabaseAdmin
        .from('operators')
        .select('id')
        .eq('audit_id', parentAuditId)
        .eq('persona_type', standardizedRole)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingNode) {
        // 🎯 TARGET PATCH: Overwrite the typoed email address field on the exact container ID found
        const { error: updateError } = await supabaseAdmin
          .from('operators')
          .update({
            email: targetEmail,
            access_code: code, // Issues a fresh secure entry token configuration
            status: 'pending'  // Resets lane to clear prior submission metrics
          })
          .eq('id', existingNode.id);

        if (updateError) throw updateError;
      } else {
        // ➕ SAFE INSERTION: Create the structural row container if this is the initial workspace launch setup
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

      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${code}`;

      emailPromises.push(sgMail.send({
        to: targetEmail,
        from: {
          name: "BMR SOLUTIONS",
          email: FROM_EMAIL
        },
        subject: `ACTION REQUIRED: ${standardizedRole} Forensic Node Authorized // ${orgName}`,
        html: `
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617; font-family: monospace;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; width: 100%; background: #020617; color: #ffffff; padding: 40px; border: 2px solid #dc2626; box-sizing: border-box; text-transform: uppercase;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left" style="text-align: left;">
                        <h2 style="color: #dc2626; font-family: monospace; font-size: 20px; font-weight: 900; text-transform: uppercase; margin: 0 0 5px 0; letter-spacing: 1px;">
                          BMR Solutions // Systems Audit Engine
                        </h2>
                        <p style="font-family: monospace; font-size: 10px; color: #64748b; margin: 0 0 20px 0; text-transform: uppercase;">
                          Company Name: ${orgName} | Role Assignment: ${standardizedRole} NODE
                        </p>
                        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0"/>
                        <p style="font-family: monospace; line-height: 1.6; font-size: 13px; color: #94a3b8; margin: 0 0 15px 0; text-transform: none;">
                          Your company leadership recently started a diagnostic project with BMR Solutions. This project is designed to evaluate your technology investments. The goal is to identify operational waste, uncover structural errors, and discover hidden costs within your AI systems.
                        </p>
                        <p style="font-family: monospace; line-height: 1.6; font-size: 13px; color: #94a3b8; margin: 0 0 25px 0; text-transform: none;">
                          To complete this system review, we require independent feedback from different departments. You are designated as the representative for the <strong>${standardizedRole} Node</strong>. When you select the verification link below, the system will open your specific questionnaire module. Thank you for your attention and support in this matter.
                        </p>
                        <p style="font-family: monospace; line-height: 1.6; font-size: 14px; color: #ffffff; margin: 0 0 30px 0;">
                          Your personal access code is: <span style="color: #dc2626; font-weight: bold;">${code}</span>
                        </p>
                        <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 30px; margin-bottom: 40px;">
                          <tr>
                            <td align="left">
                              <a href="${diagnosticLink}" target="_blank" style="background: #dc2626; color: #ffffff; padding: 18px 30px; text-decoration: none; font-weight: bold; display: inline-block; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; border: 1px solid #dc2626;">
                                Open Diagnostic Module →
                              </a>
                            </td>
                          </tr>
                        </table>
                        <p style="font-family: monospace; font-size: 10px; color: #475569; margin: 40px 0 0 0; border-top: 1px solid #1e293b; padding-top: 20px; text-transform: uppercase;">
                          Confidential // BMR Solutions Stakeholder Secure Connection
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
        `
      }));
    }

    // Telemetry Aggregation for Logic Decay Coefficient Matrix Calculations
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

    // Retrieve Current Raw Diagnostic Metrics via Admin Bypass
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

    let recommendedService = 'GOVERNANCE ADVISORY';
    let targetNode = 'EXECUTIVE';
    let speciesIdentifier = 'Continuous Monitoring / Fiduciary Layer';

    if (adjustedHAI < adjustedAVS && adjustedHAI < adjustedIGF && adjustedHAI < 55.00) {
      recommendedService = 'Cognitive Fidelity Audit';
      targetNode = 'MANAGERIAL';
      speciesIdentifier = 'Privilege Decay / Agency Overreach';
    } else if (adjustedAVS < adjustedHAI && adjustedAVS < adjustedIGF && adjustedAVS < 55.00) {
      recommendedService = 'Value Leakage Diagnostic';
      targetNode = 'TECHNICAL';
      speciesIdentifier = 'Input Technical Decay';
    } else if (adjustedIGF < 55.00) {
      recommendedService = 'Decision-Chain Reconstruction';
      targetNode = 'EXECUTIVE';
      speciesIdentifier = 'Expectation Continuity Fracture';
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
