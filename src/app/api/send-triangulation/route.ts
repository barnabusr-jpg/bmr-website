import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

// Initialize SendGrid API Key
const sendgridApiKey = process.env.BMR_SENDGRID_KEY || process.env.SENDGRID_API_KEY || '';
if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

// Initialize Supabase Service Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

type PersonaKey = 'EXECUTIVE' | 'TECH_MGMT' | 'OPS_MGMT' | 'SYSTEM_USER';

const QUAD_PERSONA_TYPES: Record<PersonaKey, string[]> = {
  EXECUTIVE: ['EXECUTIVE', 'EXEC', 'IGF', 'STRATEGIC'],
  TECH_MGMT: ['TECH_MGMT', 'TECH', 'TECHNICAL', 'AVS', 'DEVOPS'],
  OPS_MGMT: ['OPS_MGMT', 'OPS', 'MANAGERIAL', 'HAI', 'OPERATIONS'],
  SYSTEM_USER: ['SYSTEM_USER', 'SYS', 'USER', 'OPERATOR', 'CORE_SYSTEM', 'TERMINAL', 'SYSTEM'],
};

function generateAccessCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase() + 
         Math.random().toString(36).substring(2, 10).toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, auditId, endpoints, originUrl, isNudge, flowType } = body;

    if (!companyName || !endpoints) {
      return NextResponse.json({ success: false, error: 'Missing required parameters' }, { status: 400 });
    }

    const appOrigin = originUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://www.bmradvisory.co';
    const activeFlow = flowType || 'quad_node';

    let parentAuditId = auditId;

    // Resolve or verify audit record in Supabase
    if (!parentAuditId) {
      const { data: auditData } = await supabase
        .from('audits')
        .select('id')
        .eq('org_name', companyName.trim())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      parentAuditId = auditData?.id;
    }

    const sendResults: any[] = [];
    const keys = Object.keys(endpoints) as PersonaKey[];

    for (const pKey of keys) {
      const email = endpoints[pKey]?.trim();
      if (!email) continue;

      const aliases = QUAD_PERSONA_TYPES[pKey] || [pKey];
      let accessCode = generateAccessCode();

      // Database Synchronization for Operators Table
      if (parentAuditId) {
        const { data: existingOps } = await supabase
          .from('operators')
          .select('id, access_code')
          .or(`audit_id.eq.${parentAuditId},group_id.eq.${parentAuditId}`)
          .eq('flow_type', activeFlow)
          .in('persona_type', aliases)
          .order('updated_at', { ascending: false })
          .limit(1);

        if (existingOps && existingOps.length > 0) {
          const opId = existingOps[0].id;
          if (existingOps[0].access_code) {
            accessCode = existingOps[0].access_code;
          }

          await supabase
            .from('operators')
            .update({
              email: email,
              access_code: accessCode,
              survey_completed: false,
              status: 'PENDING',
              raw_responses: {},
              updated_at: new Date().toISOString()
            })
            .eq('id', opId);
        } else {
          await supabase
            .from('operators')
            .insert({
              audit_id: parentAuditId,
              group_id: parentAuditId,
              flow_type: activeFlow,
              persona_type: pKey,
              email: email,
              access_code: accessCode,
              survey_completed: false,
              status: 'PENDING',
              raw_responses: {},
              updated_at: new Date().toISOString()
            });
        }
      }

      // Generate Clean Baseline Link (Role & Org Driven)
      const participantUrl = `${appOrigin}/diagnostic/forensic?role=${encodeURIComponent(pKey)}&org=${encodeURIComponent(companyName)}&email=${encodeURIComponent(email)}&code=${encodeURIComponent(accessCode)}&flow=${activeFlow}`;

      const mailPayload = {
        to: email,
        from: { email: 'assessments@bmradvisory.co', name: 'BMR Advisory Unit' },
        subject: `${isNudge ? 'REMINDER' : 'ACTION REQUIRED'}: Quad Node Diagnostic Invitation — ${companyName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; margin-top: 0;">Operational Assessment Invitation</h2>
            <p style="color: #334155; font-size: 14px;">
              You have been designated to complete the <strong>${pKey.replace('_', ' ')} Track</strong> for <strong>${companyName}</strong>.
            </p>
            <div style="margin: 30px 0;">
              <a href="${participantUrl}" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; font-size: 12px; font-weight: bold; text-decoration: none; border-radius: 4px; display: inline-block;">
                BEGIN DIAGNOSTIC TRACK &rarr;
              </a>
            </div>
            <p style="color: #64748b; font-size: 11px; font-family: monospace;">
              Direct Access Link: <br/> ${participantUrl}
            </p>
          </div>
        `
      };

      try {
        if (sendgridApiKey) {
          await sgMail.send(mailPayload);
          sendResults.push({ email, persona: pKey, accessCode, ok: true });
        } else {
          sendResults.push({ email, persona: pKey, accessCode, ok: true, mocked: true });
        }
      } catch (err: any) {
        console.error(`[SendGrid Error][${email}]:`, err?.response?.body || err?.message);
        sendResults.push({ 
          email, 
          persona: pKey, 
          accessCode, 
          ok: false, 
          reason: err?.response?.body?.errors?.[0]?.message || err?.message 
        });
      }
    }

    return NextResponse.json({ success: true, sendResults });
  } catch (err: any) {
    console.error('[SendTriangulation API Error]:', err);
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}
