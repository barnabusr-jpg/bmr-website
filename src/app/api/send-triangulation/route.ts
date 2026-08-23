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

    // 1. DYNAMIC FLOW DISCRIMINATOR ('quad_node' vs '360_triangulation')
    const targetFlowType = flowType === "quad_node" ? "quad_node" : "360_triangulation";

    // 2. PAYLOAD ADAPTER: Converts `endpoints` object map or `recipients` array
    let recipientsList: Array<{ email: string; persona?: string }> = [];

    if (Array.isArray(rawRecipients) && rawRecipients.length > 0) {
      recipientsList = rawRecipients;
    } else if (endpoints && typeof endpoints === "object") {
      recipientsList = Object.entries(endpoints).map(([personaKey, emailVal]) => ({
        email: String(emailVal || ""),
        persona: personaKey
      }));
    }

    if (!auditId || typeof auditId !== "string" || recipientsList.length === 0) {
      return NextResponse.json({ error: "Invalid payload parameters" }, { status: 400 });
    }

    const cleanAuditId = auditId.trim();
    const upsertRows = [];

    for (const recipient of recipientsList) {
      if (!recipient || typeof recipient !== "object" || !recipient.email || typeof recipient.email !== "string") {
        continue;
      }

      const cleanEmail = recipient.email.trim().toLowerCase();
      if (!cleanEmail) continue;

      const persona = String(recipient.persona || "SYSTEM_USER").toUpperCase().trim();

      const { data: existing } = await supabase
        .from("operators")
        .select("id, access_code")
        .eq("audit_id", cleanAuditId)
        .eq("email", cleanEmail)
        .eq("flow_type", targetFlowType)
        .limit(1)
        .maybeSingle();

      const accessCode = existing?.access_code || crypto.randomBytes(8).toString("hex").toUpperCase();

      upsertRows.push({
        audit_id: cleanAuditId,
        group_id: cleanAuditId,
        email: cleanEmail,
        persona_type: persona,
        flow_type: targetFlowType,
        access_code: accessCode,
        status: "PENDING",
        survey_completed: false,
        updated_at: new Date().toISOString(),
      });
    }

    if (upsertRows.length === 0) {
      return NextResponse.json({ error: "No valid recipients supplied" }, { status: 400 });
    }

    // 3. ATOMIC DATABASE UPSERT
    const { data: insertedOperators, error: dbError } = await supabase
      .from("operators")
      .upsert(upsertRows, { onConflict: "audit_id,email,flow_type" })
      .select("id, email, persona_type, access_code, flow_type");

    if (dbError) {
      console.error(`[${targetFlowType} DB Upsert Error]`, dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // 4. SENDGRID EMAIL DISPATCH LOOP
    const baseUrl = originUrl || process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.bmradvisory.co/forensic";
    const senderEmail = process.env.SENDGRID_FROM_EMAIL || "diagnostic@bmradvisory.co";

    const emailPromises = (insertedOperators || []).map(async (op) => {
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
          from: {
            email: senderEmail,
            name: "BMR Advisory Control Plane"
          },
          subject: subject,
          html: htmlContent,
        });
      } catch (mailErr: any) {
        console.error(`[SendGrid Email Failure - ${op.email}]`, mailErr?.response?.body || mailErr);
      }
    });

    await Promise.all(emailPromises);

    return NextResponse.json({ 
      success: true, 
      dispatched: insertedOperators 
    }, { status: 200 });

  } catch (err: any) {
    console.error("[Dispatch Exception]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
