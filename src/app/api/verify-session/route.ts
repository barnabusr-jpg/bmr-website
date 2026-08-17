import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accessCode } = body;

    if (!accessCode || typeof accessCode !== "string" || !accessCode.trim()) {
      return NextResponse.json({ error: "Access code is required" }, { status: 400 });
    }

    const cleanCode = accessCode.trim().toUpperCase();

    // SANITIZED PROJECTION ONLY: Excludes raw_responses and sensitive internal notes
    const { data: operator, error } = await supabase
      .from("operators")
      .select("id, status, survey_completed, deactivated_at, flow_type, org_name, persona_type, access_code, updated_at")
      .eq("access_code", cleanCode)
      .order("updated_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !operator) {
      return NextResponse.json({ error: "Invalid or expired access code" }, { status: 404 });
    }

    if (operator.deactivated_at) {
      return NextResponse.json({ error: "Session has been deactivated" }, { status: 403 });
    }

    return NextResponse.json({ success: true, operator }, { status: 200 });
  } catch (err: any) {
    console.error("[Verify Session Exception]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
