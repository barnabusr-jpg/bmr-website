import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const answerItemSchema = z.object({
  answer: z.string().min(1, "Answer value required"),
  evidence: z.string().min(1, "Verification evidence tag required"),
});

const submitSchema = z.object({
  accessCode: z.string().min(3).max(64),
  rawResponses: z.record(z.string(), answerItemSchema),
});

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Server missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
  }

  return createClient(url, serviceRole, { auth: { persistSession: false } });
}

export async function POST(request: Request) {
  const requestId = Math.random().toString(36).substring(2, 9);

  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      console.warn(`[Diagnostic Submit ${requestId}] Malformed JSON payload received.`);
      return NextResponse.json(
        { error: "INVALID_JSON", message: "Malformed payload provided." },
        { status: 400 }
      );
    }

    const parsed = submitSchema.safeParse(body);
    if (!parsed.success) {
      console.warn(`[Diagnostic Submit ${requestId}] Schema validation failed:`, parsed.error.flatten());
      return NextResponse.json(
        {
          error: "INVALID_PAYLOAD_SCHEMA",
          message: "One or more questions are missing responses or verification evidence tags.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { accessCode, rawResponses } = parsed.data;
    
    let codeParam = accessCode.trim().toUpperCase();
    if (codeParam.startsWith("=3D")) codeParam = codeParam.slice(3);
    if (codeParam.startsWith("3D")) codeParam = codeParam.slice(2);
    const cleanCode = codeParam;

    const maskedCode = cleanCode.length > 4 ? `${cleanCode.slice(0, 2)}****${cleanCode.slice(-2)}` : "****";

    console.log(`[Diagnostic Submit ${requestId}] Processing code: ${maskedCode}`);

    const supabaseAdmin = getSupabaseAdmin();
    const { data: dbResult, error: dbError } = await supabaseAdmin.rpc(
      "submit_operator_and_sync_audit",
      {
        p_access_code: cleanCode,
        p_raw_responses: rawResponses,
      }
    );

    if (dbError) {
      console.error(`[Diagnostic Submit ${requestId}] DB RPC Exception:`, dbError.message);
      return NextResponse.json(
        { error: "DATABASE_RPC_FAILURE", message: "An unexpected database error occurred." },
        { status: 500 }
      );
    }

    if (!dbResult?.success) {
      const errCode = dbResult?.code || "SUBMISSION_REJECTED";
      console.warn(`[Diagnostic Submit ${requestId}] RPC Rejected [${errCode}] for code: ${maskedCode}`);

      if (errCode === "INVALID_ACCESS_CODE") {
        return NextResponse.json(
          { error: errCode, message: "The provided assessment access code is invalid." },
          { status: 401 }
        );
      }

      if (errCode === "ALREADY_COMPLETED") {
        return NextResponse.json(
          { error: errCode, message: "This assessment section has already been completed." },
          { status: 409 }
        );
      }

      if (errCode === "AUDIT_NOT_FOUND") {
        return NextResponse.json(
          { error: errCode, message: "Associated parent audit record could not be found." },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: errCode, message: "Submission could not be processed." },
        { status: 400 }
      );
    }

    if (dbResult?.triangulation_just_completed && dbResult?.audit_id) {
      console.log(`[Diagnostic Submit ${requestId}] Final node completed. Triggering automatic synthesis for audit: ${dbResult.audit_id}`);
      
      const rawUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || process.env.VERCEL_URL?.trim() || "localhost:3000";
      const baseUrl = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;

      fetch(`${baseUrl}/api/synthesize-fracture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId: dbResult.audit_id }),
      })
        .then(async (r) => {
          if (!r.ok) {
            const text = await r.text().catch(() => "");
            console.error(`[Diagnostic Submit ${requestId}] Synthesis trigger failed (${r.status}):`, text);
          } else {
            console.log(`[Diagnostic Submit ${requestId}] Auto-synthesis triggered successfully.`);
          }
        })
        .catch((synthErr) => {
          console.error(
            `[Diagnostic Submit ${requestId}] Auto-synthesis execution warning:`,
            synthErr?.message || synthErr
          );
        });
    }

    console.log(`[Diagnostic Submit ${requestId}] Successfully processed submission for audit: ${dbResult.audit_id}`);

    return NextResponse.json({
      success: true,
      auditId: dbResult.audit_id,
      triangulationComplete: dbResult.triangulation_just_completed,
    });

  } catch (err: any) {
    console.error(`[Diagnostic Submit ${requestId}] Unhandled Exception:`, err?.message || err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR", message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
