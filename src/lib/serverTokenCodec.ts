import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { IntakeAnswers, SowSelectionsMap } from "@/types/diagnostic";
import { encodeDiagnosticToken, decodeDiagnosticToken } from "./tokenCodec";

// Strict production secret enforcement
const SIGNING_SECRET = process.env.PDF_SIGNING_SECRET || (() => {
  if (process.env.NODE_ENV === "production") {
    throw new Error("FATAL: PDF_SIGNING_SECRET environment variable is missing in production.");
  }
  return "bmr_default_signing_secret_do_not_use_in_prod";
})();

export function createTokenSignature(payloadB64: string): string {
  const hmac = createHmac("sha256", SIGNING_SECRET);
  hmac.update(payloadB64);
  return hmac
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Server-side signature generator for authenticated export tokens.
 */
export function encodeSignedDiagnosticToken(
  answers: IntakeAnswers, 
  sowSelections: SowSelectionsMap,
  ttlSeconds: number = 86400 * 30
): string {
  const rawToken = encodeDiagnosticToken(answers, sowSelections);
  const timestamp = Math.floor(Date.now() / 1000);
  const payloadWithMeta = `${rawToken}.${timestamp}.${timestamp + ttlSeconds}`;
  const signature = createTokenSignature(payloadWithMeta);
  
  return `${payloadWithMeta}.${signature}`;
}

/**
 * Server-only strict HMAC verification engine.
 * Guarantees zero secret leakage to browser bundles.
 */
export function decodeDiagnosticTokenStrict(
  token: string
): { answers: IntakeAnswers; sowSelections: SowSelectionsMap } | null {
  try {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 4) return null; // Reject unsigned or malformed tokens

    const [payloadB64, iatStr, expStr, signature] = parts;
    const payloadWithMeta = `${payloadB64}.${iatStr}.${expStr}`;
    const expectedSignature = createTokenSignature(payloadWithMeta);

    const sigBuffer = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expectedSignature, "utf8");

    if (
      sigBuffer.length !== expectedBuffer.length || 
      !timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return null; // Reject signature mismatch
    }

    const now = Math.floor(Date.now() / 1000);
    const exp = Number(expStr);
    if (!isNaN(exp) && exp > 0 && now > exp) {
      return null; // Reject expired token
    }

    return decodeDiagnosticToken(payloadB64);
  } catch {
    return null;
  }
}
