import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import sgMail from "@sendgrid/mail";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const SENDGRID_KEY = process.env.BMR_SENDGRID_KEY || process.env.SENDGRID_API_KEY;
if (SENDGRID_KEY) {
  sgMail.setApiKey(SENDGRID_KEY);
}

const dispatchSchema = z.object({
  parentAuditId: z.string().min(1, "MISSING PARENT AUDIT ID"),
  orgName: z.string().optional().default("Your Organization"),
  groupId: z.string().optional().nullable(),
  emails: z.record(z.string()).default({}),
});

const ROLE_MAP: Record<string, string> = {
  executive: "EXECUTIVE",
  exec: "EXECUTIVE",
  executivenode: "EXECUTIVE",
  "tech mgmt": "TECHNICAL",
  technical: "TECHNICAL",
  tech: "TECHNICAL",
  technicalnode: "TECHNICAL",
  "ops mgmt": "MANAGERIAL",
  managerial: "MANAGERIAL",
  manager: "MANAGERIAL",
  man: "MANAGERIAL",
  managerialnode: "MANAGERIAL",
  ops_mgmt: "MANAGERIAL",
  "system user": "EXECUTIVE",
  system_user: "EXECUTIVE",
  techmgmt: "TECHNICAL",
  opsmgmt: "MANAGERIAL",
  systemuser: "EXECUTIVE",
};

function toSentenceCase(str: string): string {
  if (!str) return "Your Organization";
  const clean = str.replace(/_/g, " ").toLowerCase().trim();
  return clean
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Missing server-side database configuration.");
  }

  return createClient(url, serviceRole, { auth: { persistSession: false } });
}

export async function POST(request: Request) {
  try {
    // 1) Rate Limiter (Upstash Redis)
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (upstashUrl && upstashToken && /^https?:\/\//i.test(upstashUrl)) {
      try {
        const redis = new Redis({ url: upstashUrl, token: upstashToken });
        const limiter = new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(10, "10 s"),
          analytics: true,
        });

        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") ||
          "unknown";

        const { success } = await limiter.limit(`dispatch:${ip}`);
        if (!success) {
          return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
        }
      } catch (e) {
        console.warn("[dispatch-directives] Rate limiter skipped:", e);
      }
    }

    // 2) Validate Dashboard Dispatch Payload
    const body = await request.json();
    const parsed = dispatchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload schema", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { parentAuditId, orgName, groupId, emails } = parsed.data;

    const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://bmradvisory.co";
    const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "hello@bmradvisory.co";
    const supabaseAdmin = getSupabaseAdmin();
    const prettyCompany = toSentenceCase(orgName);

    // 3) Upsert Operators & Dispatch Emails
    const emailPromises: Promise<any>[] = [];

    for (const [rawRole, email] of Object.entries(emails)) {
      const trimmed = String(email ?? "").trim();
      if (!trimmed) continue;

      const targetEmail = trimmed.toLowerCase();
      const normalizedKey = rawRole.toLowerCase().trim();
      const standardizedRole =
        ROLE_MAP[normalizedKey] ?? ROLE_MAP[normalizedKey.replace(/[^a-z_ ]/g, "").trim()];

      if (!standardizedRole) {
        return NextResponse.json(
          {
            error: "INVALID NODE ASSIGNMENT",
            message: `The provided role identifier "${rawRole}" is incompatible with the system engine.`,
          },
          { status: 400 }
        );
      }

      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      const { data: existingNode, error: checkError } = await supabaseAdmin
        .from("operators")
        .select("id")
        .eq("audit_id", parentAuditId)
        .eq("persona_type", standardizedRole)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingNode) {
        const { error: updateError } = await supabaseAdmin
          .from("operators")
          .update({
            email: targetEmail,
            access_code: code,
            status: "pending",
          })
          .eq("id", existingNode.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabaseAdmin.from("operators").insert({
          audit_id: parentAuditId,
          group_id: groupId ?? null,
          email: targetEmail,
          persona_type: standardizedRole,
          access_code: code,
          is_authorized: true,
          status: "pending",
          survey_completed: false,
        });

        if (insertError) throw insertError;
      }

      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${code}`;

      if (SENDGRID_KEY) {
        if (standardizedRole === "EXECUTIVE") {
          emailPromises.push(
            sgMail.send({
              to: targetEmail,
              from: { name: "BMR Solutions", email: FROM_EMAIL },
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
                        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 20px; margin-bottom: 16px; border-radius: 4px; text-align: left;">
                          <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; color: #64748b; font-weight: 700; text-transform: uppercase;">Step 1: Complete Executive Assessment</p>
                          <p style="margin: 0 0 12px 0; font-size: 13px; color: #475569;">Access your secure link to begin your executive assessment module:</p>
                          <a href="${diagnosticLink}" target="_blank" style="color: #0f172a; font-weight: 700; font-size: 13px; text-decoration: underline;">
                            Open Executive Assessment Track →
                          </a>
                        </div>
                        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #64748b; padding: 20px; margin-bottom: 24px; border-radius: 4px; text-align: left;">
                          <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; color: #64748b; font-weight: 700; text-transform: uppercase;">Step 2: Stakeholder Alignment</p>
                          <p style="margin: 0; font-size: 13px; color: #475569;">Notify your managerial and technical leads to verify their direct links and complete their node evaluations promptly.</p>
                        </div>
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
              `,
            })
          );
        } else {
          emailPromises.push(
            sgMail.send({
              to: targetEmail,
              from: { name: "BMR Solutions", email: FROM_EMAIL },
              subject: `ACTION REQUIRED: ${standardizedRole} Track Assessment Authorized // ${prettyCompany}`,
              html: `
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                  <tr>
                    <td align="center" style="padding: 40px 20px;">
                      <div style="max-width: 600px; width: 100%; background: #ffffff; color: #0f172a; padding: 40px; border: 1px solid #e2e8f0; border-top: 6px solid #0f172a; border-radius: 6px; box-sizing: border-box;">
                        <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0 0 4px 0; letter-spacing: -0.5px;">BMR Solutions // Operational Assessment</h2>
                        <p style="font-size: 11px; font-family: monospace; color: #64748b; margin: 0 0 20px 0; font-weight: 600;">Organization: ${prettyCompany} | Track: ${standardizedRole} NODE</p>
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
              `,
            })
          );
        }
      }
    }

    // 4) Calculate Logic Decay and Set Status = TRIANGULATING
    const { data: allOperators, error: queryError } = await supabaseAdmin
      .from("operators")
      .select("survey_completed")
      .eq("audit_id", parentAuditId);

    if (queryError) throw queryError;

    const totalPaths = allOperators?.length ?? 0;
    const unsubmittedPaths = (allOperators ?? []).filter((o: any) => !o.survey_completed).length;
    const logicDecayCoefficient = totalPaths > 0 ? unsubmittedPaths / totalPaths : 0.0;

    await supabaseAdmin
      .from("audits")
      .update({ status: "TRIANGULATING", compiled_at: new Date().toISOString() })
      .eq("id", parentAuditId);

    if (emailPromises.length > 0) {
      try {
        await Promise.all(emailPromises);
      } catch (emailErr: any) {
        console.warn("[dispatch-directives] SendGrid delivery warning:", emailErr.message);
      }
    }

    return NextResponse.json({
      status: "SUCCESS",
      compilationMode: "COMPLETE TRIANGULATION",
      metrics: { logicDecayCoefficient: Number(logicDecayCoefficient.toFixed(2)) },
    });
  } catch (err: any) {
    console.error("[Dispatch Directive Exception]", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
