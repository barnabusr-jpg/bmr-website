import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const dispatchDirectivesSchema = z.object({
  directiveId: z.string().uuid().optional(),
  recipients: z.array(z.string().email()).min(1).max(20).optional(),
  groupId: z.string().uuid().optional(),
  overallScore: z.number().int().min(0).max(100).optional(),
});

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Missing server-side database configuration.");
  }

  // Diagnostic log to confirm project host mapping in Vercel logs
  console.log("[Supabase Host Target]", new URL(url).hostname);

  return createClient(url, serviceRole, {
    auth: { persistSession: false },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = dispatchDirectivesSchema.safeParse(body);

    if (!parsed.success) {
      console.warn("[Dispatch API Invalid Payload]", parsed.error.flatten());
      return NextResponse.json(
        { error: "Invalid payload schema", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    console.log("[Dispatch Parsed Payload]", parsed.data);

    const supabaseAdmin = getSupabaseAdmin();
    const { directiveId, recipients, groupId, overallScore } = parsed.data;

    let createdReportId: string | null = null;

    // 1. Handle Fracture Report Creation
    if (groupId && overallScore !== undefined) {
      const { data: reportData, error: reportError } = await supabaseAdmin
        .from("fracture_reports")
        .insert({
          group_id: groupId,
          overall_score: overallScore,
        })
        .select("id")
        .single();

      if (reportError) {
        console.error("[Fracture Report Write Failed]", {
          message: reportError.message,
          details: reportError.details,
          code: reportError.code,
        });
        return NextResponse.json(
          { error: "Failed to persist fracture report", details: reportError.message },
          { status: 500 }
        );
      }

      createdReportId = reportData.id;
    }

    // 2. Handle Dispatch Audit Writes
    if (directiveId && recipients) {
      const { error: dispatchError } = await supabaseAdmin
        .from("dispatches")
        .insert({
          directive_id: directiveId,
          recipients: recipients,
        });

      if (dispatchError) {
        console.error("[Dispatch Audit Write Failed]", {
          message: dispatchError.message,
          details: dispatchError.details,
          code: dispatchError.code,
        });
        return NextResponse.json(
          { error: "Dispatch processing failed", details: dispatchError.message },
          { status: 500 }
        );
      }
    }

    if (!createdReportId && (!directiveId || !recipients)) {
      return NextResponse.json(
        { error: "Payload missing required report or dispatch fields" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      ...(createdReportId && { id: createdReportId }),
    });
  } catch (err: any) {
    console.error("[Dispatch API Unhandled Exception]", err?.message || err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
