import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { auditId, recipients } = body;

    // 1. INPUT TYPE SANITIZATION
    if (!auditId || typeof auditId !== "string" || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: "Invalid payload parameters" }, { status: 400 });
    }

    const cleanAuditId = auditId.trim();
    const upsertRows = [];

    for (const recipient of recipients) {
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
        .eq("flow_type", "360_triangulation")
        .limit(1)
        .maybeSingle();

      const accessCode = existing?.access_code || crypto.randomBytes(8).toString("hex").toUpperCase();

      upsertRows.push({
        audit_id: cleanAuditId,
        group_id: cleanAuditId,
        email: cleanEmail,
        persona_type: persona,
        flow_type: "360_triangulation", // CANONICAL DISCRIMINATOR
        access_code: accessCode,
        status: "PENDING",
        survey_completed: false,
        updated_at: new Date().toISOString(),
      });
    }

    if (upsertRows.length === 0) {
      return NextResponse.json({ error: "No valid 360 recipients supplied" }, { status: 400 });
    }

    // 2. ATOMIC UPSERT WITH 360 CONFLICT TARGET
    const { data, error } = await supabase
      .from("operators")
      .upsert(upsertRows, { onConflict: "audit_id,email,flow_type" })
      .select("id, email, persona_type, access_code, flow_type");

    if (error) {
      console.error("[360 Dispatch Error]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, dispatched: data }, { status: 200 });
  } catch (err: any) {
    console.error("[360 Dispatch Exception]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
