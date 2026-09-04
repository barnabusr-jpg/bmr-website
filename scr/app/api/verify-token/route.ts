import { NextRequest, NextResponse } from "next/server";
import { decodeDiagnosticTokenStrict } from "@/lib/serverTokenCodec";

const MAX_PAYLOAD_SIZE_BYTES = 50000;

export async function POST(req: NextRequest) {
  try {
    const rawText = await req.text();
    const len = new TextEncoder().encode(rawText).length;
    if (len > MAX_PAYLOAD_SIZE_BYTES) {
      return NextResponse.json({ error: "Payload size exceeds limit" }, { status: 413 });
    }

    let body: any;
    try {
      body = JSON.parse(rawText);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    if (!body?.token || typeof body.token !== "string") {
      return NextResponse.json({ error: "Missing or invalid token parameter" }, { status: 400 });
    }

    // Fail-Closed: Strict HMAC signature and TTL verification
    const validated = decodeDiagnosticTokenStrict(body.token);
    if (!validated) {
      return NextResponse.json({ error: "Invalid or expired token signature" }, { status: 401 });
    }

    return NextResponse.json(
      { 
        ok: true, 
        answers: validated.answers, 
        sowSelections: validated.sowSelections 
      }, 
      { status: 200 }
    );
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("verify-token error:", e);
    }
    return NextResponse.json({ error: "Internal verification failure" }, { status: 500 });
  }
}
