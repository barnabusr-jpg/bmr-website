import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail";
import crypto from "crypto";

export const runtime = "nodejs";

const sendGridKey = process.env.SENDGRID_API_KEY || process.env.BMR_SENDGRID_KEY;
if (sendGridKey) {
  sgMail.setApiKey(sendGridKey);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      auditId, 
      recipients: rawRecipients, 
      endpoints, 
      flowType, 
      companyName, 
      activePillar, 
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

    // 2. PARENT AUDIT RESET (Safely update to IN_PROGRESS without interrupting dispatch)
    const { data: auditRow, error: auditErr } = await supabase
      .from("audits")
      .update({ status: "IN_PROGRESS", updated_at: new Date().toISOString() })
      .eq("id", cleanAuditId)
      .select("id, status")
      .maybeSingle();

    if (auditErr) {
      console.warn("[Dispatch Audit Reset Warning]:", auditErr.message);
    } else {
      console.log("[Dispatch Audit Reset OK]:", auditRow);
    }

    // 3. HARDENED OPERATOR PERSISTENCE & SYMMETRICAL RESET
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

    console.log(`[Dispatch] Processed operators count: ${processedOperators.length}`);

    // 4. QUAD-NODE DISPATCH SECTION (ALIGNED BYTE-FOR-BYTE TO 360)
    const baseUrl = originUrl || process.env.NEXT_PUBLIC_APP_URL || "https://www.bmradvisory.co/forensic";
    const senderEmail = (process.env.SENDGRID_FROM_EMAIL || "diagnostic@bmradvisory.co").trim();

    const sendResults: Array<{
      email: string;
      persona_type: string;
      accessCode: string;
      statusCode?: number;
      ok: boolean;
      reason?: string;
    }> = [];

    for (const op of processedOperators) {
      const cleanToEmail = String(op.email).trim().toLowerCase();

      // Exact 360 URL Construction
      const inviteUrl = `${baseUrl}?code=${encodeURIComponent(op.access_code)}`;
      const readablePersona = (op.persona_type || "Stakeholder").replace(/_/g, " ");
      const orgName = companyName || "Your Organization";

      // Exact 360 Subject Line (Plain text, no brackets)
      const subject = isNudge
        ? `Reminder: Complete ${readablePersona} Assessment for ${orgName}`
        : `BMR Diagnostic Access: ${readablePersona} (${orgName})`;

      // Exact 360 HTML Body Template
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px;">
          <h2 style="font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 16px;">
            ${isNudge ? "Diagnostic Reminder" : "Diagnostic Readiness Assessment"}
          </h2>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">
            You have been assigned to complete the <strong>${readablePersona}</strong> diagnostic track for <strong>${orgName}</strong>.
          </p>
          <div style="margin: 28px 0; text-align: left;">
            <a href="${inviteUrl}" style="background-color: #0f172a; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 4px; display: inline-block;">
              Launch Assessment Posture &rarr;
            </a>
          </div>
          <p style="font-size: 12px; color: #64748b; font-family: monospace; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
            Access Code: <strong>${op.access_code}</strong>
          </p>
        </div>
      `;

      try {
        const msg = {
          to: cleanToEmail,
          from: senderEmail, // Plain string email without object wrappers
          subject: subject,
          html: htmlContent,
        };

        const [sgResponse] = await sgMail.send(msg);

        console.log("[SendGrid OK]", {
          to: cleanToEmail,
          status: sgResponse.statusCode,
          messageId: sgResponse.headers['x-message-id'] || 'N/A',
          requestId: sgResponse.headers['x-request-id'] || 'N/A',
        });

        sendResults.push({
          email: cleanToEmail,
          persona_type: op.persona_type,
          accessCode: op.access_code,
          statusCode: sgResponse.statusCode,
          ok: true
        });
      } catch (mailErr: any) {
        const reason = mailErr?.response?.body
          ? JSON.stringify(mailErr.response.body)
          : mailErr?.message
            ? String(mailErr.message)
            : "Unknown SendGrid error";

        console.error("[SendGrid FAIL]", {
          to: cleanToEmail,
          code: mailErr?.code,
          message: mailErr?.message,
          response: mailErr?.response?.body
        });

        sendResults.push({
          email: cleanToEmail,
          persona_type: op.persona_type,
          accessCode: op.access_code,
          statusCode: mailErr?.code || 500,
          ok: false,
          reason
        });
      }
    }

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
