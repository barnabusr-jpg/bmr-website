import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const intakeSchema = z.object({
  entityName: z.string().min(1),
  operatorName: z.string().min(1),
  email: z.string().email(),
  sector: z.string().default("FINANCE"),
  personaType: z.string().nullable().default("EXECUTIVE"),
  decayPct: z.coerce.number(),
  reworkTax: z.coerce.number(),
  rawResponses: z.record(z.string()),
  overallScore: z.coerce.number().transform((val) => Math.round(val)),
});

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const missing: string[] = [];
  if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceRole) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  if (missing.length > 0) {
    throw new Error(
      `Missing server-side database configuration: ${missing.join(", ")}`
    );
  }

  return createClient(url!, serviceRole!, {
    auth: { persistSession: false },
  });
}

export async function POST(request: Request) {
  try {
    // 1) Safe Rate Limiting (Lazy Init with Isolated Error Handling)
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!upstashUrl || !upstashToken) {
      console.warn(
        "[dispatch-directives] Upstash Redis credentials missing; skipping rate limit."
      );
    } else if (!/^https?:\/\//i.test(upstashUrl)) {
      console.warn(
        "[dispatch-directives] Upstash URL is invalid/malformed:",
        upstashUrl
      );
    } else {
      try {
        const redis = new Redis({ url: upstashUrl, token: upstashToken });
        const dispatchLimiter = new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(10, "10 s"),
          analytics: true,
        });

        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") ||
          "unknown";

        const { success } = await dispatchLimiter.limit(`dispatch:${ip}`);
        if (!success) {
          return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
        }
      } catch (limiterError) {
        console.warn(
          "[dispatch-directives] Rate limiter initialization/execution failed; continuing without rate limit:",
          limiterError
        );
      }
    }

    // 2) Validate Payload Schema
    const body = await request.json();
    const parsed = intakeSchema.safeParse(body);

    if (!parsed.success) {
      console.warn("[Intake API Invalid Payload]", parsed.error.flatten());
      return NextResponse.json(
        { error: "Invalid payload schema", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const payload = parsed.data;

    // 3) Resolve or Create Diagnostic Group
    const groupName = `${payload.sector}_${payload.personaType || "GENERAL"}`.toUpperCase();
    let targetGroupId: string;

    const { data: existingGroupRows } = await supabaseAdmin
      .from("diagnostic_groups")
      .select("id")
      .eq("name", groupName)
      .limit(1);

    if (existingGroupRows && existingGroupRows.length > 0) {
      targetGroupId = existingGroupRows[0].id;
    } else {
      const { data: newGroupRows, error: groupErr } = await supabaseAdmin
        .from("diagnostic_groups")
        .insert({ name: groupName })
        .select("id");

      if (groupErr || !newGroupRows || newGroupRows.length === 0) {
        const { data: fallbackRows } = await supabaseAdmin
          .from("diagnostic_groups")
          .select("id")
          .limit(1);

        if (!fallbackRows || fallbackRows.length === 0) {
          console.error(
            "[Fatal Diagnostic Group Error]: No available diagnostic_groups found."
          );
          return NextResponse.json(
            { error: "Configuration Error: No active diagnostic group available." },
            { status: 500 }
          );
        }

        targetGroupId = fallbackRows[0].id;
      } else {
        targetGroupId = newGroupRows[0].id;
      }
    }

    // 4) Upsert Entity
    const { data: entityRows } = await supabaseAdmin
      .from("entities")
      .upsert({ name: payload.entityName }, { onConflict: "name" })
      .select("id");

    const entityId = entityRows?.[0]?.id;

    // 5) Insert Primary Audit Log
    const { data: auditRows, error: auditError } = await supabaseAdmin
      .from("audits")
      .insert([
        {
          org_name: payload.entityName,
          lead_email: payload.email,
          sector: payload.sector,
          decay_pct: payload.decayPct,
          rework_tax: payload.reworkTax,
          raw_responses: payload.rawResponses,
          status: "COMPLETED",
          roi_pct: 6,
          ai_spend: 1.2,
        },
      ])
      .select("id");

    if (auditError || !auditRows || auditRows.length === 0) {
      console.error("[Audit Persistence Error]", auditError);
      return NextResponse.json(
        { error: "Audit write failed", details: auditError?.message },
        { status: 500 }
      );
    }

    const auditId = auditRows[0].id;

    // 6) Insert Fracture Report
    const { data: reportRows, error: reportError } = await supabaseAdmin
      .from("fracture_reports")
      .insert({
        group_id: targetGroupId,
        overall_score: payload.overallScore,
      })
      .select("id");

    if (reportError || !reportRows || reportRows.length === 0) {
      console.error("[Fracture Report Insert Error]", reportError);
      return NextResponse.json(
        { error: "Fracture report write failed", details: reportError?.message },
        { status: 500 }
      );
    }

    const reportId = reportRows[0].id;

    // 7) Upsert Operator Record
    await supabaseAdmin.from("operators").upsert({
      email: payload.email,
      full_name: payload.operatorName,
      entity_id: entityId,
      audit_id: auditId,
      persona_type: payload.personaType,
      status: "COMPLETED",
    });

    return NextResponse.json({ success: true, id: reportId });
  } catch (err: any) {
    console.error("[Dispatch Directive Exception]", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
