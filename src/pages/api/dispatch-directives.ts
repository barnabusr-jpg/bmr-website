import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

const SENDGRID_KEY = process.env.BMR_SENDGRID_KEY || process.env.SENDGRID_API_KEY;
if (SENDGRID_KEY) {
  sgMail.setApiKey(SENDGRID_KEY);
}

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ROLE_MAP: Record<string, string> = {
  'executive': 'EXECUTIVE', 'managerial': 'MANAGERIAL', 'technical': 'TECHNICAL',
  'exec': 'EXECUTIVE', 'manager': 'MANAGERIAL', 'tech': 'TECHNICAL', 'man': 'MANAGERIAL',
  'executivenode': 'EXECUTIVE', 'technicalnode': 'TECHNICAL', 'managerialnode': 'MANAGERIAL',
  'execemail': 'EXECUTIVE', 'mgremail': 'MANAGERIAL', 'techemail': 'TECHNICAL'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("🚀 ENGINE ACTIVATED - INCOMING BODY:", JSON.stringify(req.body));

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { groupId, orgName, emails, parentAuditId, execEmail, mgrEmail, techEmail } = req.body;
  
  // 🟢 ENVIRONMENT ISOLATION ENGINE: Strict parsing protects live production records from testing data bleed
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '') : '';
  const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@bmrsolutions.co'; 

  if (!BASE_URL) {
    console.error("❌ CRITICAL INFRASTRUCTURE DEPLOYMENT FAILURE: NEXT_PUBLIC_APP_URL environment variable is null.");
    return res.status(500).json({ 
      error: 'CONFIGURATION_ERROR', 
      message: 'CORE RUNTIME BOUNDS BROKEN: Missing base routing domain parameters.' 
    });
  }

  if (!parentAuditId) {
    console.error("❌ ENGINE CRASH: Payload is missing parentAuditId.");
    return res.status(400).json({ error: 'MISSING PARENT AUDIT ID' });
  }

  try {
    const normalizedInputs: Record<string, string> = {};

    if (emails && typeof emails === 'object') {
      Object.entries(emails).forEach(([key, val]) => {
        if (typeof val === 'string' && val.trim()) {
          normalizedInputs[key.toLowerCase().trim()] = val.trim().toLowerCase();
        }
      });
    }

    if (execEmail && typeof execEmail === 'string' && execEmail.trim()) normalizedInputs['executive'] = execEmail.trim().toLowerCase();
    if (mgrEmail && typeof mgrEmail === 'string' && mgrEmail.trim()) normalizedInputs['managerial'] = mgrEmail.trim().toLowerCase();
    if (techEmail && typeof techEmail === 'string' && techEmail.trim()) normalizedInputs['technical'] = techEmail.trim().toLowerCase();

    const emailMessages = [];
    const intakeRecords = [];

    for (const [rawRole, emailStr] of Object.entries(normalizedInputs)) {
      const targetEmail = emailStr.trim().toLowerCase();
      if (!targetEmail) continue;

      const normalizedKey = rawRole.toLowerCase().trim();
      const standardizedRole = ROLE_MAP[normalizedKey];

      if (!standardizedRole) continue; 

      const code = Math.random().toString(36).substring(2, 10).toUpperCase();

      intakeRecords.push({
        audit_id: parentAuditId,
        group_id: groupId || parentAuditId,
        email: targetEmail,
        persona_type: standardizedRole,
        access_code: code,
        is_authorized: true,
        status: 'pending',
        survey_completed: false
      });

      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${code}`;

      emailMessages.push({
        to: targetEmail,
        from: FROM_EMAIL,
        subject: `ACTION REQUIRED: ${standardizedRole} Forensic Node Authorized // ${orgName}`,
        trackingSettings: {
          clickTracking: { enable: false },
          openTracking: { enable: false }
        },
        html: `
          <div style="font-family: monospace; padding: 30px; background-color: #020617; color: #ffffff; border: 2px solid #dc2626; max-width: 600px;">
            <h2 style="color: #dc2626; text-transform: uppercase; margin: 0 0 10px 0; font-size: 18px; font-weight: 900;">BMR SOLUTIONS // AUDIT PORTAL</h2>
            <p style="font-size: 11px; color: #64748b; text-transform: uppercase; margin: 0 0 20px 0;">TARGET IDENTIFIER: ${orgName} | SECURE NODE TYPE: ${standardizedRole}</p>
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;" />
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; font-style: italic;">Your organization has initialized an interactive operational alignment wedge evaluation.</p>
            <p style="font-size: 14px; color: #ffffff; margin: 30px 0;">
              YOUR AUTHORIZED ASSIGNMENT NODE ACCESS KEY IS: <br />
              <span style="color: #dc2626; font-weight: bold; font-size: 22px; tracking-spacing: 2px; display: block; margin-top: 10px;">${code}</span>
            </p>
            <div style="margin-top: 40px; padding: 20px; background-color: #000000; border: 1px solid #1e293b;">
              <span style="color: #64748b; font-size: 10px; display: block; margin-bottom: 5px;">// TERMINAL ACCESS LINK LINK</span>
              <a href="${diagnosticLink}" target="_blank" style="color: #dc2626; text-decoration: underline; font-size: 12px; font-weight: bold; break-all: break-all;">
                ${diagnosticLink}
              </a>
            </div>
          </div>
        `
      });
    }

    if (intakeRecords.length === 0) {
      return res.status(200).json({ status: 'SKIPPED', message: 'No valid operator strings provided.' });
    }

    const { error: upsertError } = await supabaseAdmin
      .from('operators')
      .upsert(intakeRecords, { onConflict: 'audit_id,email' });

    if (upsertError) {
      throw new Error(`Database Upsert Mapping Failure: ${upsertError.message}`);
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
      .select('hai_raw_score, avs_raw_score, igf_raw_score, status, compiled_at')
      .eq('id', parentAuditId)
      .single();

    if (auditFetchError || !activeAudit) {
      throw new Error('Failed to retrieve primary core diagnostic metrics.');
    }

    const rawHAI = activeAudit.hai_raw_score !== null ? Number(activeAudit.hai_raw_score) : 72.00;
    const rawAVS = activeAudit.avs_raw_score !== null ? Number(activeAudit.avs_raw_score) : 68.00;
    const rawIGF = activeAudit.igf_raw_score !== null ? Number(activeAudit.igf_raw_score) : 64.00;

    const adjustedHAI = rawHAI * (1 - logicDecayCoefficient);
    const adjustedAVS = rawAVS * (1 - logicDecayCoefficient);
    const adjustedIGF = rawIGF * (1 - logicDecayCoefficient);

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
    const calculatedDecayPercent = Number((logicDecayCoefficient * 100).toFixed(0));

    const currentStatus = (activeAudit.status || "").toUpperCase().trim();
    const shouldUpdateStatus = !["BRIDGE_ACTIVE", "DIAGNOSTIC_ACTIVE", "COMPLETE", "COMPLETED"].includes(currentStatus);

    const updatePayload: Record<string, any> = {
      decay_pct: calculatedDecayPercent,
      compiled_at: cleanSystemTimestamp
    };

    if (shouldUpdateStatus) {
      updatePayload.status = 'TRIANGULATING';
    }

    const { error: updateError } = await supabaseAdmin
      .from('audits')
      .update(updatePayload)
      .eq('id', parentAuditId);

    if (updateError) {
      throw new Error(`Primary Ledger State Compilation Error: ${updateError.message}`);
    }

    if (emailMessages.length > 0 && SENDGRID_KEY) {
      try {
        const promises = emailMessages.map(msg => sgMail.send(msg));
        await Promise.all(promises);
      } catch (sendgridError: any) {
        console.warn("⚠️ SENDGRID NOTIFICATION DELAY:", sendgridError.message);
      }
    }
    
    return res.status(200).json({ 
      status: 'SUCCESS',
      compilationMode: logicDecayCoefficient > 0 ? 'PARTIAL DECAY APPLIED' : 'COMPLETE TRIANGULATION',
      metrics: {
        logicDecayCoefficient: Number(logicDecayCoefficient.toFixed(2)),
        adjustedHAI: Number(adjustedHAI.toFixed(2)),
        adjustedAVS: Number(adjustedAVS.toFixed(2)),
        adjustedIGF: Number(adjustedIGF.toFixed(2))
      }
    });

  } catch (error: any) {
    console.error("DISPATCH CRITICAL BREAKDOWN EXCEPTION:", error.message);
    return res.status(500).json({ error: 'DISPATCH METRIC FAILURE', message: error.message });
  }
}
