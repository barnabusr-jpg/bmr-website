import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const dispatchDirectivesSchema = z.object({
  directiveId: z.string().uuid(),
  recipients: z.array(z.string().email()).min(1).max(20),
});

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Missing server-side database configuration.");
  }

  return createClient(url, serviceRole, {
    auth: { persistSession: false },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = dispatchDirectivesSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload schema" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { error: dbError } = await supabaseAdmin
      .from("dispatches")
      .insert({
        directive_id: parsed.data.directiveId,
        recipients: parsed.data.recipients,
      });

    if (dbError) {
      console.error("[Dispatch Audit Write Failed]", { code: dbError.code });
      return NextResponse.json({ error: "Dispatch processing failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Dispatch API Unhandled Exception]", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
