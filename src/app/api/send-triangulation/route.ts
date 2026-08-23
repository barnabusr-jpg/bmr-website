import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail";
import crypto from "crypto";

export const runtime = "nodejs";

// Resolve SendGrid API Key (support both key names in Vercel)
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

    // 2. RESET PARENT AUDIT POSTURE TO IN_PROGRESS
    await supabase
      .from("audits")
      .update({ status: "IN_PROGRESS" })
      .eq("id", cleanAuditId);

    // 3. SAFE OPERATOR PERSISTENCE (Avoids 409 ON CONFLICT Schema Errors)
    const processedOperators = [];

    for (const recipient of recipientsList) {
      const cleanEmail = recipient.email;
      const persona = String(recipient.persona || "SYSTEM_USER").toUpperCase().trim();

      // Look up existing operator record
      const { data: existingOp } = await supabase
        .from("operators")
        .select("id, access_code")
        .eq("audit_id", cleanAuditId)
        .eq("email", cleanEmail)
        .eq("flow_type", targetFlowType)
        .limit(1)
        .maybeSingle();

      const accessCode = existingOp?.access_code || crypto.randomBytes(8).toString("hex").toUpperCase();

      if (existingOp?.id) {
        // Update existing row
        const { data: updated } = await supabase
          .from("operators")
          .update({
            persona_type: persona,
            updated_at: new Date().toISOString()
          })
          .eq("id", existingOp.id)
          .select("id, email, persona_type, access_code, flow_type")
          .single();

        if (updated) processedOperators.push(updated);
      } else {
        // Insert new row
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
            updated_at: new Date().toISOString()
          })
          .select("id, email, persona_type, access_code, flow_type")
          .single();

        if (insErr) {
          console.error(`[Operator Insert Error - ${cleanEmail}]`, insErr);
        } else if (inserted) {
          processedOperators.push(inserted);
        }
      }
    }

    console.log(`[Dispatch] Processed operators count: ${processedOperators.length}`);

    // 4. SEQUENTIAL SENDGRID DISPATCH WITH DETAILED TELEMETRY
    const baseUrl = originUrl || process.env.NEXT_PUBLIC_APP_URL || "https://www.bmradvisory.co/forensic";
    const senderEmail = process.env.SENDGRID_FROM_EMAIL || "diagnostic@bmradvisory.co";

    console.log(`[Dispatch] Using senderEmail: ${senderEmail}`);

    const sendResults: Array<{
      email: string;
      persona_type: string;
      accessCode: string;
      ok: boolean;
      reason?: string;
    }> = [];

    for (const op of processedOperators) {
      const inviteUrl = `${baseUrl}?code=${op.access_code}`;
      const readablePersona = (op.persona_type || "Stakeholder").replace(/_/g, " ");
      const orgName = companyName || "Your Organization";

      const subject = isNudge
        ? `[Reminder] Action Required: Complete ${readablePersona} Assessment for ${orgName}`
        : `[Action Required] BMR Quad-Node Diagnostic Access: ${readablePersona}`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px;">
          <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 16px; text-transform: uppercase;">
            ${isNudge ? "Diagnostic Reminder" : "Quad-Node Diagnostic Assessment"}
          </h2>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">
            You have been assigned to complete the <strong>${readablePersona}</strong> diagnostic track for <strong>${orgName}</strong>.
          </p>
          <div style="margin: 28px 0; text-align: left;">
            <a href="${inviteUrl}" style="background-color: #0f172a; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 4px; display: inline-block; text-transform: uppercase; letter-spacing: 0.05em;">
              Launch Assessment Posture &rarr;
            </a>
          </div>
          <p style="font-size: 12px; color: #64748b; font-family: monospace; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
            Unique Access Code: <strong>${op.access_code}</strong><br />
            Track: ${targetFlowType.toUpperCase()} | Pillar Context: ${activePillar || "IGF"}
          </p>
        </div>
      `;

      try {
        await sgMail.send({
          to: op.email,
          from: { email: senderEmail, name: "BMR Advisory Control Plane" },
          subject: subject,
          html: htmlContent,
        });

        sendResults.push({
          email: op.email,
          persona_type: op.persona_type,
          accessCode: op.access_code,
          ok: true
        });
      } catch (mailErr: any) {
        const reason = mailErr?.response?.body 
          ? JSON.stringify(mailErr.response.body) 
          : mailErr?.message ? String(mailErr.message) : "Unknown SendGrid error";

        console.error(`[SendGrid Error - ${op.email}]:`, reason);

        sendResults.push({
          email: op.email,
          persona_type: op.persona_type,
          accessCode: op.access_code,
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
