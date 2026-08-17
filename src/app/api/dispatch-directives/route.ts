import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const CANONICAL_PERSONAS: Record<string, string> = {
  EXECUTIVE: "EXECUTIVE",
  MANAGERIAL: "OPS_MGMT",
  TECHNICAL: "TECH_MGMT",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { groupId, orgName, parentAuditId, emails } = body;

    // 1. INPUT TYPE SANITIZATION
    if (!groupId || typeof groupId !== "string" || !emails || typeof emails !== "object") {
      return NextResponse.json({ error: "Missing or invalid required parameters" }, { status: 400 });
    }

    const payloadRoles = [
      { key: "EXECUTIVE", email: emails.EXECUTIVE },
      { key: "MANAGERIAL", email: emails.MANAGERIAL },
      { key: "TECHNICAL", email: emails.TECHNICAL },
    ];

    const upsertRows = [];

    for (const role of payloadRoles) {
      if (!role.email || typeof role.email !== "string" || !role.email.trim()) continue;

      const personaType = CANONICAL_PERSONAS[role.key] || role.key;
      const cleanEmail = role.email.trim().toLowerCase();
      const targetAuditId = String(parentAuditId || groupId).trim();

      const { data: existing } = await supabase
        .from("operators")
        .select("id, access_code")
        .eq("audit_id", targetAuditId)
        .eq("persona_type", personaType)
        .eq("flow_type", "quad_node")
        .limit(1)
        .maybeSingle();

      const accessCode = existing?.access_code || crypto.randomBytes(8).toString("hex").toUpperCase();

      upsertRows.push({
        audit_id: targetAuditId,
        group_id: String(groupId).trim(),
        org_name: typeof orgName === "string" ? orgName.trim() : "",
        email: cleanEmail,
        persona_type: personaType,
        flow_type: "quad_node", // CANONICAL DISCRIMINATOR
        access_code: accessCode,
        status: "PENDING",
        survey_completed: false,
        updated_at: new Date().toISOString(),
      });
    }

    if (upsertRows.length === 0) {
      return NextResponse.json({ error: "No valid email dispatches supplied" }, { status: 400 });
    }

    // 2. ATOMIC UPSERT WITH STRICT CONFLICT TARGET
    const { data, error } = await supabase
      .from("operators")
      .upsert(upsertRows, { onConflict: "audit_id,persona_type,flow_type" })
      .select("id, email, persona_type, access_code, flow_type");

    if (error) {
      console.error("[Quad Node Dispatch Error]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, dispatched: data }, { status: 200 });
  } catch (err: any) {
    console.error("[Quad Node Exception]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
