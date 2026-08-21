import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Missing server-side database configuration.");
  }

  return createClient(url, serviceRole, { auth: { persistSession: false } });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawCode = searchParams.get("code");
    
    let codeParam = (rawCode ?? "").trim().toUpperCase();
    if (codeParam.startsWith("=3D")) codeParam = codeParam.slice(3);
    if (codeParam.startsWith("3D")) codeParam = codeParam.slice(2);
    const sanitizedCode = codeParam;

    if (!sanitizedCode) {
      return NextResponse.json(
        { error: "MISSING_CODE", message: "No valid access code provided." },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data: op, error: opErr } = await supabaseAdmin
      .from("operators")
      .select("id, audit_id, access_code, status, persona_type")
      .eq("access_code", sanitizedCode)
      .maybeSingle();

    if (opErr || !op) {
      return NextResponse.json(
        { error: "INVALID_CODE", message: opErr?.message || "Operator access code not found." },
        { status: 401 }
      );
    }

    const { data: audit, error: auditErr } = await supabaseAdmin
      .from("audits")
      .select("status, org_name, id")
      .eq("id", op.audit_id)
      .maybeSingle();

    if (auditErr || !audit) {
      return NextResponse.json(
        { error: "AUDIT_NOT_FOUND", message: "Associated parent audit record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, op, audit });
  } catch (err: any) {
    console.error("[verify-code Exception]", err?.message || err);
    return NextResponse.json(
      { error: "INTERNAL_ERROR", message: err?.message || "Server handshake failed." },
      { status: 500 }
    );
  }
}
