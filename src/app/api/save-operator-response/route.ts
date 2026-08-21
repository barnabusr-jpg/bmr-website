import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const MAX_PAYLOAD_BYTES = 100 * 1024; // 100 KB safety boundary

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accessCode, rawResponses, isFinalSubmission } = body;

    // 1. STRICT PAYLOAD TYPE & SIZE VALIDATION
    if (!accessCode || typeof accessCode !== "string" || !accessCode.trim()) {
      return NextResponse.json({ error: "Access code is required" }, { status: 400 });
    }

    if (rawResponses !== undefined) {
      if (typeof rawResponses !== "object" || rawResponses === null || Array.isArray(rawResponses)) {
        return NextResponse.json({ error: "rawResponses must be a valid JSON object" }, { status: 400 });
      }

      const payloadLength = Buffer.byteLength(JSON.stringify(rawResponses), "utf8");
      if (payloadLength > MAX_PAYLOAD_BYTES) {
        return NextResponse.json({ error: "Response payload exceeds maximum allowed size" }, { status: 413 });
      }
    }

    if (isFinalSubmission !== undefined && typeof isFinalSubmission !== "boolean") {
      return NextResponse.json({ error: "isFinalSubmission must be a boolean" }, { status: 400 });
    }

    const cleanCode = accessCode.trim().toUpperCase();

    // 2. DETERMINISTIC LOOKUP OF ACTIVE SESSION
    const { data: operator, error: fetchErr } = await supabase
      .from("operators")
      .select("id, status, survey_completed, flow_type")
      .eq("access_code", cleanCode)
      .order("updated_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchErr || !operator) {
      return NextResponse.json({ error: "Operator session not found" }, { status: 404 });
    }

    // 3. FAIL CLOSED ON MISSING FLOW_TYPE
    if (!operator.flow_type) {
      console.error(`[Security Halt] Session code ${cleanCode} lacks flow_type assignment.`);
      return NextResponse.json({ error: "Invalid session flow context: unassigned flow_type" }, { status: 403 });
    }

    const targetFlowType = operator.flow_type;

    // 4. SANITIZED UPDATE PAYLOAD
    const updatePayload: Record<string, any> = {
      raw_responses: rawResponses || {},
      updated_at: new Date().toISOString(),
    };

    if (isFinalSubmission === true) {
      updatePayload.survey_completed = true;
      updatePayload.status = "COMPLETED";
    }

    // 5. ATOMIC UPDATE WITH CONCURRENCY & FLOW GUARD
    const { data: updated, error: updateErr } = await supabase
      .from("operators")
      .update(updatePayload)
      .eq("id", operator.id)
      .eq("flow_type", targetFlowType)
      .select("id, access_code, status, survey_completed, flow_type, updated_at")
      .single();

    if (updateErr) {
      console.error("[Save Response Error]", updateErr);
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, operator: updated }, { status: 200 });
  } catch (err: any) {
    console.error("[Save Response Exception]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
