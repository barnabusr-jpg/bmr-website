import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function toSentenceCase(str: string): string {
  if (!str) return 'Your company';
  const clean = str.replace(/_/g, ' ').toLowerCase().trim();
  return clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      auditId, 
      recipients: rawRecipients, 
      endpoints, 
      flowType, 
      companyName, 
      isNudge, 
      originUrl 
    } = body;

    const targetFlowType = flowType === "quad_node" ? "quad_node" : "360_triangulation";

    // 1. FLEXIBLE PAYLOAD ADAPTER
    let recipientsList: Array<{ email: string; persona?: string }> = [];

    if (Array.isArray(rawRecipients) && rawRecipients.length > 0) {
      recipientsList = rawRecipients
        .filter(r => r && typeof r.email === 'string' && r.email.trim().length > 0)
        .map(r => ({ email: r.email.trim().toLowerCase(), persona: r.persona }));
    } else if (endpoints && typeof endpoints === "object") {
      recipientsList = Object.entries(endpoints)
        .filter(([_, emailVal]) => emailVal && String(emailVal).trim().length > 0)
        .map(([personaKey, emailVal]) => ({
          email: String(emailVal).trim().toLowerCase(),
          persona: personaKey
        }));
    }

    const cleanAuditId = auditId ? String(auditId).trim() : null;

    if (!cleanAuditId || recipientsList.length === 0) {
      console.error("[Dispatch Reject] Missing Audit ID or Empty Recipients:", { cleanAuditId, recipientsList });
      return NextResponse.json({ 
        error: "Invalid payload parameters", 
        details: { hasAuditId: !!cleanAuditId, recipientCount: recipientsList.length } 
      }, { status: 400 });
    }

    // 2. PARENT AUDIT RESET (Safely update to IN_PROGRESS)
    const { data: auditRow, error: auditErr } = await supabase
      .from("audits")
      .update({ status: "IN_PROGRESS", updated_at: new Date().toISOString() })
      .eq("id", cleanAuditId)
      .select("id, status")
      .maybeSingle();

    if (auditErr) {
      console.warn("[Dispatch Audit Reset Warning]:", auditErr.message);
    }

    // 3. HARDENED OPERATOR PERSISTENCE
    const processedOperators = [];

    for (const recipient of recipientsList) {
      const cleanEmail = recipient.email;
      const persona = String(recipient.persona || "SYSTEM_USER").toUpperCase().trim();

      const { data: existingRows } = await supabase
        .from("operators")
        .select("id, access_code, persona_type, email, flow_type, survey_completed, status")
        .or(`audit_id.eq.${cleanAuditId},group_id.eq.${cleanAuditId}`)
        .eq("email", cleanEmail)
        .eq("flow_type", targetFlowType)
        .order("updated_at", { ascending: false })
        .limit(1);

      const existingOp = existingRows && existingRows.length > 0 ? existingRows[0] : null;

      if (existingOp?.id) {
        const { data: updated } = await supabase
          .from("operators")
          .update({
            persona_type: persona,
            survey_completed: false,
            status: "PENDING",
            raw_responses: {},
            updated_at: new Date().toISOString()
          })
          .eq("id", existingOp.id)
          .select("id, email, persona_type, access_code, flow_type, survey_completed, status, raw_responses")
          .maybeSingle();

        const activeOp = updated || {
          ...existingOp,
          persona_type: persona,
          survey_completed: false,
          status: "PENDING",
          raw_responses: {}
        };

        processedOperators.push(activeOp);
      } else {
        const accessCode = crypto.randomBytes(8).toString("hex").toUpperCase();

        const { data: inserted, error: insErr } = await supabase
          .from("operators")
          .insert({
            audit_id: cleanAuditId,
            group_id: cleanAuditId,
            email: cleanEmail,
            persona_type: persona,
            flow_type: targetFlowType,
            access_code: accessCode,
            status: "PENDING",
            survey_completed: false,
            raw_responses: {},
            updated_at: new Date().toISOString()
          })
          .select("id, email, persona_type, access_code, flow_type, survey_completed, status, raw_responses")
          .single();

        if (insErr) {
          console.error(`[Operator Insert Error - ${cleanEmail}]`, insErr);
        } else if (inserted) {
          processedOperators.push(inserted);
        }
      }
    }

    // 4. PARALLEL SENDGRID V3 DISPATCH WITH DIRECT ROUTE ANCHORING
    const apiKey = process.env.SENDGRID_API_KEY || process.env.BMR_SENDGRID_KEY;
    const senderEmail = "hello@bmradvisory.co";

    let baseUrl = "https://www.bmradvisory.co";
    if (originUrl) {
      try {
        baseUrl = new URL(originUrl).origin;
      } catch (e) {
        baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://www.bmradvisory.co").replace(/\/$/, "");
      }
    } else if (process.env.NEXT_PUBLIC_APP_URL) {
      baseUrl = process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
    }

    // EXPANDED ROLE LABELS SUPPORTING BOTH 360 AND QUAD NODE KEYS
    const roleLabels: Record<string, string> = {
      EXECUTIVE: 'Executive Leadership (Strategic Oversight Track)',
      EXEC: 'Executive Leadership (Strategic Oversight Track)',
      TECH_MGMT: 'Technical Management (Infrastructure & DevOps Track)',
      TECHNICAL: 'Technical Management (Infrastructure & DevOps Track)',
      OPS_MGMT: 'Operations Management (Workflow & Process Track)',
      MANAGERIAL: 'Managerial & Operational Leadership Track',
      MGR: 'Managerial & Operational Leadership Track',
      SYSTEM_USER: 'Core System Operator (Terminal Execution Track)'
    };

    const formattedOrg = (companyName || "Your Organization").trim();
    const sentenceCompany = toSentenceCase(formattedOrg);

    const mailPromises = processedOperators.map(async (op) => {
      const cleanToEmail = String(op.email).trim().toLowerCase();
      const personaKey = String(op.persona_type || "SYSTEM_USER").toUpperCase().trim();
      
      // 🎯 DIRECT QUAD-NODE PATH ANCHOR
      // Points straight to /forensic to bypass parameter-stripping redirects
      const routePath = "/forensic";
      const inviteUrl = `${baseUrl}${routePath}?id=${cleanAuditId}&role=${encodeURIComponent(personaKey)}&org=${encodeURIComponent(formattedOrg)}&email=${encodeURIComponent(cleanToEmail)}&code=${encodeURIComponent(op.access_code)}&flow=${targetFlowType}`;
      
      const roleName = roleLabels[personaKey] || personaKey.replace(/_/g, " ");

      const subjectLine = isNudge
        ? `REMINDER: Operational Assessment Gateway // ${formattedOrg}`
        : `ACTION REQUIRED: Operational Assessment Authorized // ${formattedOrg}`;

      const emailHtmlValue = `
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <div style="max-width: 600px; width: 100%; background: #ffffff; color: #0f172a; padding: 40px; border: 1px solid #e2e8f0; border-top: 6px solid #0f172a; border-radius: 6px; box-sizing: border-box; text-align: left;">
                
                <div style="margin-bottom: 24px;">
                  <h2 style="color: #0f172a; font-weight: 800; margin: 0; letter-spacing: -0.5px; font-size: 20px; line-height: 1.3;">
                    ${isNudge ? 'Assessment Reminder' : 'Diagnostic Track Authorized'}
                  </h2>
                  <p style="color: #64748b; font-family: monospace; font-size: 11px; margin: 4px 0 0 0; font-weight: 600;">
                    Organization: ${formattedOrg}
                  </p>
                </div>

                <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0"/>
                
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                  <span style="color: #64748b; font-family: monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 4px;">
                    ASSIGNED STAKEHOLDER TRACK
                  </span>
                  <span style="color: #0f172a; font-size: 14px; font-weight: 800; display: block;">
                    ${roleName}
                  </span>
                </div>

                <p style="font-size: 14px; line-height: 1.6; color: #334155; font-weight: 400; margin: 0 0 24px 0;">
                  Leadership at <strong>${sentenceCompany}</strong> has provisioned an operational diagnostic stream. Your direct feedback is required to evaluate workflow friction and schema stability.
                </p>
                
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; margin: 24px 0; text-align: center; border-radius: 4px;">
                  <p style="font-size: 11px; font-family: monospace; color: #64748b; margin-bottom: 16px; font-weight: 600; text-transform: uppercase;">
                    SECURE DIAGNOSTIC TERMINAL
                  </p>
                  <a href="${inviteUrl}" style="background: #0f172a; color: #ffffff; padding: 14px 28px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 12px; letter-spacing: 1px; border-radius: 4px; text-transform: uppercase;">
                    Launch Assessment Track →
                  </a>
                </div>

                <p style="font-size: 11px; color: #94a3b8; line-height: 1.6; font-family: monospace; border-top: 1px solid #f1f5f9; padding-top: 20px; margin: 32px 0 0 0; text-transform: uppercase;">
                  Confidential // BMR Solutions Independent Governance
                </p>

              </div>
            </td>
          </tr>
        </table>
      `;

      const sendgridPayload = {
        personalizations: [
          {
            to: [{ email: cleanToEmail }],
            subject: subjectLine
          }
        ],
        from: {
          email: senderEmail,
          name: 'BMR Solutions'
        },
        content: [
          {
            type: 'text/html',
            value: emailHtmlValue
          }
        ]
      };

      try {
        const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify(sendgridPayload)
        });

        if (sgRes.ok) {
          console.log(`[SendGrid Direct OK - ${cleanToEmail}] Status ${sgRes.status}`);
          return {
            email: cleanToEmail,
            persona_type: op.persona_type,
            accessCode: op.access_code,
            statusCode: sgRes.status,
            ok: true
          };
        } else {
          const errText = await sgRes.text();
          console.error(`[SendGrid Direct FAIL - ${cleanToEmail}]`, errText);
          return {
            email: cleanToEmail,
            persona_type: op.persona_type,
            accessCode: op.access_code,
            statusCode: sgRes.status,
            ok: false,
            reason: errText
          };
        }
      } catch (err: any) {
        console.error(`[SendGrid Direct Exception - ${cleanToEmail}]`, err.message);
        return {
          email: cleanToEmail,
          persona_type: op.persona_type,
          accessCode: op.access_code,
          statusCode: 500,
          ok: false,
          reason: err.message
        };
      }
    });

    const settled = await Promise.allSettled(mailPromises);

    const sendResults = settled.map((s, idx) => {
      if (s.status === "fulfilled") {
        return s.value;
      }
      const fallbackOp = processedOperators[idx];
      return {
        email: fallbackOp?.email || "unknown",
        persona_type: fallbackOp?.persona_type || "unknown",
        accessCode: fallbackOp?.access_code || "unknown",
        statusCode: 500,
        ok: false,
        reason: s.reason?.message ? String(s.reason.message) : String(s.reason)
      };
    });

    return NextResponse.json({ 
      success: true, 
      dispatched: processedOperators, 
      sendResults 
    }, { status: 200 });

  } catch (err: any) {
    console.error("[Dispatch Exception]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
