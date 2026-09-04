import { 
  SectorKey, 
  DecisionStage, 
  SowOptionLevel, 
  IntakeAnswers, 
  SowSelectionsMap 
} from "@/types/diagnostic";

interface CompactPayload {
  org: string;
  sec: SectorKey;
  stg: DecisionStage;
  sc: Record<string, number>;
  sow: [SowOptionLevel, SowOptionLevel, SowOptionLevel];
}

const VALID_SECTORS: SectorKey[] = ["FINANCE", "HEALTHCARE", "INDUSTRIAL", "SERVICES"];
const VALID_STAGES: DecisionStage[] = ["ROLLOUT_SAFETY", "ACTIVE_STABILIZATION", "AUDIT_READINESS"];
const VALID_OPTIONS: SowOptionLevel[] = ["OPTION_A", "OPTION_B", "OPTION_C"];
const KNOWN_VECTOR_KEYS = ["v01", "v02", "v03", "v04", "v05", "v06", "v07", "v08", "v09", "v10"];

// ============================================================================
// ISOMORPHIC SANITIZATION & BASE64URL CODEC
// ============================================================================

export function sanitizeOrgName(name: unknown): string {
  if (!name || typeof name !== "string") return "ACME ENTERPRISE";
  return name.trim().slice(0, 80).replace(/[^\w\s\-\.\,\&]/g, "") || "ACME ENTERPRISE";
}

export function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  const bin = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  const b64 = typeof btoa === "function" 
    ? btoa(bin) 
    : Buffer.from(bin, "binary").toString("base64");
  
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  
  const bin = typeof atob === "function" 
    ? atob(base64) 
    : Buffer.from(base64, "base64").toString("binary");
    
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// ============================================================================
// SCHEMA VALIDATION & PAYLOAD SANITIZATION
// ============================================================================

export function validateAndSanitizePayload(data: any): { answers: IntakeAnswers; sowSelections: SowSelectionsMap } | null {
  if (!data || typeof data !== "object") return null;

  const orgInput = data.org || data.organizationName || (data.answers && data.answers.organizationName);
  const org = sanitizeOrgName(orgInput);

  const rawSec = data.sec || data.sector || (data.answers && data.answers.sector);
  const sec: SectorKey = VALID_SECTORS.includes(rawSec) ? rawSec : "FINANCE";

  const rawStg = data.stg || data.decisionStage || (data.answers && data.answers.decisionStage);
  const stg: DecisionStage = VALID_STAGES.includes(rawStg) ? rawStg : "ACTIVE_STABILIZATION";

  const rawScores = data.sc || data.vectorScores || (data.answers && data.answers.vectorScores);
  const vectorScores: Record<string, number> = {};

  if (rawScores && typeof rawScores === "object") {
    KNOWN_VECTOR_KEYS.forEach((key) => {
      const val = Number(rawScores[key]);
      if (!isNaN(val) && val >= 1 && val <= 5) {
        vectorScores[key] = Math.round(val);
      } else {
        vectorScores[key] = 3;
      }
    });
  } else {
    KNOWN_VECTOR_KEYS.forEach((key) => {
      vectorScores[key] = 3;
    });
  }

  let sowSelections: SowSelectionsMap;

  if (Array.isArray(data.sow) && data.sow.length === 3) {
    sowSelections = {
      PHASE_01: VALID_OPTIONS.includes(data.sow[0]) ? data.sow[0] : "OPTION_B",
      PHASE_02: VALID_OPTIONS.includes(data.sow[1]) ? data.sow[1] : "OPTION_B",
      PHASE_03: VALID_OPTIONS.includes(data.sow[2]) ? data.sow[2] : "OPTION_B"
    };
  } else if (data.sowSelections && typeof data.sowSelections === "object") {
    sowSelections = {
      PHASE_01: VALID_OPTIONS.includes(data.sowSelections.PHASE_01) ? data.sowSelections.PHASE_01 : "OPTION_B",
      PHASE_02: VALID_OPTIONS.includes(data.sowSelections.PHASE_02) ? data.sowSelections.PHASE_02 : "OPTION_B",
      PHASE_03: VALID_OPTIONS.includes(data.sowSelections.PHASE_03) ? data.sowSelections.PHASE_03 : "OPTION_B"
    };
  } else {
    sowSelections = {
      PHASE_01: "OPTION_B",
      PHASE_02: "OPTION_B",
      PHASE_03: "OPTION_B"
    };
  }

  return {
    answers: {
      organizationName: org,
      sector: sec,
      decisionStage: stg,
      vectorScores
    },
    sowSelections
  };
}

// ============================================================================
// ISOMORPHIC ENCODING & DECODING
// ============================================================================

export function encodeDiagnosticToken(
  answers: IntakeAnswers, 
  sowSelections: SowSelectionsMap
): string {
  const cleanScores: Record<string, number> = {};
  const scoresInput = answers?.vectorScores || {};

  KNOWN_VECTOR_KEYS.forEach((key) => {
    const val = Number(scoresInput[key]);
    cleanScores[key] = (!isNaN(val) && val >= 1 && val <= 5) ? Math.round(val) : 3;
  });

  const payload: CompactPayload = {
    org: sanitizeOrgName(answers?.organizationName),
    sec: VALID_SECTORS.includes(answers?.sector) ? answers.sector : "FINANCE",
    stg: VALID_STAGES.includes(answers?.decisionStage) ? answers.decisionStage : "ACTIVE_STABILIZATION",
    sc: cleanScores,
    sow: [
      VALID_OPTIONS.includes(sowSelections?.PHASE_01) ? sowSelections.PHASE_01 : "OPTION_B",
      VALID_OPTIONS.includes(sowSelections?.PHASE_02) ? sowSelections.PHASE_02 : "OPTION_B",
      VALID_OPTIONS.includes(sowSelections?.PHASE_03) ? sowSelections.PHASE_03 : "OPTION_B"
    ]
  };

  return base64UrlEncode(JSON.stringify(payload));
}

export function decodeDiagnosticToken(token: string): { answers: IntakeAnswers; sowSelections: SowSelectionsMap } | null {
  try {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    const targetPayload = parts.length === 4 ? parts[0] : token;

    const jsonString = base64UrlDecode(targetPayload);
    const parsed = JSON.parse(jsonString);
    return validateAndSanitizePayload(parsed);
  } catch {
    return null;
  }
}
