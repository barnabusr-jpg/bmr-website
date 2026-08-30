import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import {
  calculateAuditFinancialMetrics,
  calculateForensicMetrics,
  getPdfEvidenceStatus
} from "@/lib/forensicCalculus";

function escapeHtml(input: any): string {
  return String(input ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sanitizeHexColor(color: string | undefined | null, fallback = "#dc2626"): string {
  const clean = String(color ?? "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(clean) ? clean : fallback;
}

/**
 * Redacts email addresses for secure server-side logging (PII Protection)
 */
function maskEmail(email: string | undefined | null): string {
  if (!email || !email.includes("@")) return "unspecified";
  const [local, domain] = email.split("@");
  const maskedLocal = local.length > 3 ? `${local.slice(0, 3)}***` : `${local[0]}***`;
  return `${maskedLocal}@${domain}`;
}

/**
 * Robust Bearer Token Extractor (Header preferred, cookie fallback)
 */
function extractBearerToken(req: NextApiRequest): { token: string | null; source: string } {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "")?.trim();
    if (token) return { token, source: "authorization_header" };
  }

  const cookies = req.cookies || {};
  for (const key of Object.keys(cookies)) {
    if (key.includes("auth-token") || key.includes("access-token") || key.startsWith("sb-")) {
      const val = cookies[key];
      if (val && typeof val === "string" && val.length > 10) {
        return { token: val.trim(), source: `cookie:${key}` };
      }
    }
  }

  return { token: null, source: "none" };
}

function normalizeRawResponses(raw: any): Record<string, any> {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw;
  }
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      return {};
    }
  }
  return {};
}

function parseValidTimestamp(dateString: string | null | undefined): number | null {
  if (!dateString) return null;
  const ms = new Date(dateString).getTime();
  return Number.isFinite(ms) ? ms : null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // 1️⃣ REQUEST-SCOPED CLIENT WITH CALLER'S JWT
  const { token: bearerToken, source: tokenSource } = extractBearerToken(req);

  if (!bearerToken) {
    console.warn("[AUTH_WARNING] Request rejected: Missing Authorization header or session cookie.");
    return res.status(401).json({ error: "Unauthorized // Valid Authentication Session Required" });
  }

  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${bearerToken}` }
      }
    }
  );

  const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
  if (authError || !user) {
    console.warn(`[AUTH_WARNING] Auth token validation failed (Source: ${tokenSource}):`, authError?.message);
    return res.status(401).json({ error: "Unauthorized // Authentication Token Invalid or Expired" });
  }

  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Bad Request // Missing Target Record ID" });
  }

  try {
    // 2️⃣ QUERY BOUND TO USER JWT (AUTHENTICATED RLS EVALUATED)
    const { data: audit, error } = await supabaseAuth
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !audit) {
      console.error(`[RLS_DIAGNOSTIC] Access Denied or Missing Record (ID: ${id})`, {
        userId: user.id,
        userEmailMasked: maskEmail(user.email),
        userRole: user.app_metadata?.role || "authenticated",
        tokenSource,
        errorCode: error?.code,
      });

      // Gate internal debug headers to non-production environments only
      if (process.env.NODE_ENV !== "production") {
        res.setHeader("X-Audit-Debug-Code", error?.code || "ROW_NULL");
      }

      return res.status(404).json({ error: "Not Found // Audit Record Missing or Access Denied" });
    }

    // 3️⃣ DETERMINISTIC AS-OF TIMING WITH HARDENED NaN FALLBACK
    const updatedMs = parseValidTimestamp(audit.updated_at);
    const createdMs = parseValidTimestamp(audit.created_at);
    const snapshotAsOfMs = updatedMs ?? createdMs ?? Date.now();

    const financial = calculateAuditFinancialMetrics(audit, snapshotAsOfMs);
    const rawResponses = normalizeRawResponses(audit.raw_responses);
    const forensic = calculateForensicMetrics(financial.companyName, rawResponses, audit.sector);
    const evidenceStatus = getPdfEvidenceStatus(rawResponses, 10);

    const orgNameSafe = escapeHtml(financial.companyName);
    const auditIdSafe = escapeHtml(id);
    const engineVersionSafe = escapeHtml(financial.calculusVersion);
    const accentColor = sanitizeHexColor(financial.brandHexAccent);

    // 4️⃣ STAGE-GATED TELEMETRY OVERLAY
    const forensicSectionHtml = evidenceStatus.isFullyHydrated ? `
      <div style="margin-top:16px; padding-top:12px; border-top:1px solid #f1f5f9; font-size:11px; color:#475569;">
        <div><b>360 Telemetry Status:</b> <span style="color:#047857; font-weight:700;">Verified 360° Triangulated</span></div>
        <div><b>Evidence Sample Size:</b> ${escapeHtml(evidenceStatus.validAnsweredCount)} Validated Responses</div>
        <div><b>Reliability Index:</b> ${escapeHtml(forensic.reliabilityIndex)}%</div>
        <div><b>Dominant Failure Vector:</b> ${escapeHtml(forensic.dominantDriver)}</div>
      </div>
    ` : `
      <div style="margin-top:16px; padding-top:12px; border-top:1px solid #f1f5f9; font-size:11px; color:#64748b; font-style:italic;">
        <div><b>360 Telemetry Status:</b> ${evidenceStatus.isPartial ? 'Partial Intake (In Progress)' : 'Provisional Baseline Only'}</div>
        <div style="margin-top:4px;">Full qualitative findings will hydrate upon 360° stakeholder track completion.</div>
      </div>
    `;

    const findingDescription = evidenceStatus.isFullyHydrated
      ? "Diagnostic parameters verified. Root cause analytics and 360° integration vectors are compiled and locked under completed intake protocols."
      : "Provisional Impact Allocation Model. Root cause analytics will finalize upon full multi-track assessment completion.";

    const secureAnomalies = [
      { id: `Finding #1 // Estimated Impact $${escapeHtml(financial.findingsImpacts[0].toLocaleString(undefined, { maximumFractionDigits: 0 }))}`, description: findingDescription },
      { id: `Finding #2 // Estimated Impact $${escapeHtml(financial.findingsImpacts[1].toLocaleString(undefined, { maximumFractionDigits: 0 }))}`, description: findingDescription },
      { id: `Finding #3 // Estimated Impact $${escapeHtml(financial.findingsImpacts[2].toLocaleString(undefined, { maximumFractionDigits: 0 }))}`, description: findingDescription },
      { id: `Finding #4 // Estimated Impact $${escapeHtml(financial.findingsImpacts[3].toLocaleString(undefined, { maximumFractionDigits: 0 }))}`, description: findingDescription }
    ];

    const htmlCanvasContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>BMR Diagnostic Report ${auditIdSafe}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { 
            background-color: #f8fafc; 
            color: #0f172a; 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
            padding: 40px; 
            margin: 0; 
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .container { max-width: 900px; margin: 0 auto; }
          .top-bar { height: 4px; background-color: #0f172a; width: 100%; margin-bottom: 24px; }
          .header-box { border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 32px; }
          .title-brand { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #0f172a; }
          .title-brand span { color: ${accentColor}; }
          .subtitle { font-family: monospace; font-size: 10px; color: #64748b; letter-spacing: 1px; margin-top: 4px; }
          
          .placard { 
            background-color: #ffffff; 
            color: #0f172a; 
            padding: 30px; 
            border-left: 8px solid ${accentColor}; 
            border-top: 1px solid #e2e8f0;
            border-right: 1px solid #e2e8f0;
            border-bottom: 1px solid #e2e8f0;
            border-radius: 0 4px 4px 0;
            margin-bottom: 32px; 
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }
          .placard-left { text-align: left; }
          .placard h2 { margin: 0 0 8px 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; color: #0f172a; }
          .org-label { font-size: 11px; color: #64748b; margin-bottom: 16px; font-weight: 600; }
          .metrics-grid { display: flex; gap: 32px; border-top: 1px solid #f1f5f9; padding-top: 16px; }
          .metric-cell { text-align: left; }
          .cell-label { font-size: 10px; color: #64748b; font-weight: 600; }
          .cell-value { font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 4px; }
          .cell-value span { color: ${accentColor}; }
          
          .placard-right { text-align: right; min-width: 220px; }
          .erosion-label { font-size: 10px; color: #64748b; font-weight: 600; display: block; margin-bottom: 4px; }
          .erosion-val { font-family: monospace; font-size: 28px; color: ${accentColor}; font-weight: 800; letter-spacing: -0.5px; }

          .section-title { font-size: 12px; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 20px; font-weight: 700; text-align: left; }
          .anomaly-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
          .node-card { border: 1px solid #e2e8f0; background-color: #ffffff; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; min-height: 220px; border-radius: 4px; }
          .node-top { border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 12px; font-size: 10px; color: #64748b; text-align: left; }
          .node-top span { float: right; background-color: #fef2f2; color: ${accentColor}; padding: 2px 6px; font-size: 9px; font-weight: 700; border: 1px solid #fecaca; border-radius: 2px; }
          .node-title { font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 8px; text-align: left; }
          .node-desc { font-size: 11px; color: #475569; line-height: 1.5; margin-bottom: 16px; text-align: left; }
          .directive-label { font-size: 9px; color: #64748b; margin-bottom: 2px; text-align: left; font-weight: 600; }
          .directive-val { font-size: 11px; font-weight: 600; color: #0f172a; text-align: left; }
          
          .governance-box { background-color: #ffffff; padding: 24px; border-left: 6px solid #0f172a; border-radius: 4px; border: 1px solid #e2e8f0; margin-bottom: 32px; }
          .footer-text { font-size: 10px; color: #94a3b8; text-align: center; margin-top: 40px; }
          
          @media print {
            body { padding: 20px; background-color: #ffffff; }
            .container { max-width: 100%; }
            .node-card, .placard { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="top-bar"></div>
          <div class="header-box">
            <div class="title-brand">BMR<span>SOLUTIONS</span></div>
            <div class="subtitle">Executive Risk Audit & SOW // Engine v${engineVersionSafe}</div>
          </div>

          <div class="placard">
            <div class="placard-left">
              <h2>Diagnostic Summary</h2>
              <div class="org-label">Assessment for: ${orgNameSafe}</div>
              <div class="metrics-grid">
                <div class="metric-cell">
                  <div class="cell-label">AI Readiness Gap</div>
                  <div class="cell-value"><span>${escapeHtml(100 - financial.dbDecay)}%</span> Readiness</div>
                </div>
                <div class="metric-cell">
                  <div class="cell-label">Process Waste Tax</div>
                  <div class="cell-value"><span>$${escapeHtml(financial.totalLaborTaxPool.toLocaleString(undefined, { maximumFractionDigits: 0 }))}</span> Liability</div>
                </div>
                <div class="metric-cell">
                  <div class="cell-label">Total Promise Gap™ Exposure</div>
                  <div class="cell-value"><span>$${escapeHtml(financial.exposure.toLocaleString(undefined, { maximumFractionDigits: 0 }))}</span> Capital Risk</div>
                </div>
              </div>

              ${forensicSectionHtml}
            </div>

            <div class="placard-right">
              <span class="erosion-label">Estimated Loss To Date</span>
              <div class="erosion-val">$${escapeHtml(financial.totalErosion.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</div>
              <span class="cell-label" style="display:block; margin-top:4px;">Calculated loss since initial assessment</span>
            </div>
          </div>

          <div class="section-title">Key Findings & Integration Risks</div>
          
          <div class="anomaly-grid">
            ${secureAnomalies.map((frac, i) => `
              <div class="node-card">
                <div class="node-top">
                  Finding #${i + 1}
                  <span>${evidenceStatus.isFullyHydrated ? 'Verified' : 'Provisional'}</span>
                </div>
                <div>
                  <div class="node-title">${escapeHtml(frac.id)}</div>
                  <div class="node-desc">${escapeHtml(frac.description)}</div>
                </div>
                <div>
                  <div class="directive-label">Recommended Action:</div>
                  <div class="directive-val">Complete the 30-question operational diagnostic to reveal full remediation steps.</div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="section-title">Continuous Forensic Governance Schedule</div>

          <div class="governance-box">
            <div style="font-size: 11px; font-weight: 800; color: #0f172a; margin-bottom: 6px; text-transform: uppercase;">
              Quarterly Verification Cadence Mandate:
            </div>
            <p style="font-size: 11px; color: #475569; line-height: 1.6; margin-bottom: 12px;">
              To maintain operational safety and prevent new drift as software environments evolve through ongoing code commits and API updates, this architecture requires quarterly reassessments. BMR Solutions verifies gap closure and ensures system compliance on a 90-day recurring cadence.
            </p>
            <div style="font-family: monospace; font-size: 10px; font-weight: 700; color: #64748b;">
              Next Reassessment Cycle: Scheduled Q4 2026 // [ T1 + 90 Days ]
            </div>
          </div>

          <div class="footer-text">Confidential Executive Report // BMR Solutions Independent Governance Framework</div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 250);
          };
        </script>
      </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';");
    return res.status(200).send(htmlCanvasContent);

  } catch (err: any) {
    console.error("SERVERLESS PRINT GENERATION EXCEPTION:", err);
    return res.status(500).json({ error: "Internal Server Error", details: escapeHtml(err?.message || String(err)) });
  }
}
