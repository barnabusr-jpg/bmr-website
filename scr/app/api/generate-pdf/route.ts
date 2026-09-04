import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { decodeDiagnosticTokenStrict } from "@/lib/serverTokenCodec";
import { SECTOR_COPY_REGISTRY, DECISION_STAGE_REGISTRY } from "@/config/sectorCopyRegistry";
import { calculateDiagnosticMetrics } from "@/lib/diagnosticEngine";
import { IntakeAnswers, SowSelectionsMap } from "@/types/diagnostic";

// Explicitly enforce Node.js runtime for Puppeteer/Chromium compatibility
export const runtime = "nodejs";

const RENDER_TIMEOUT_MS = 10000;
const MAX_PAYLOAD_SIZE_BYTES = 50000;

function escapeHtml(val: unknown): string {
  if (typeof val !== "string" && typeof val !== "number") {
    return "";
  }
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

function sanitizeFilename(name: unknown): string {
  const safeStr = String(name || "Report")
    .replace(/[^A-Za-z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 40);
  return safeStr || "Diagnostic_Control_Plane";
}

function buildIsolatedPrintHtml(pdfData: any): string {
  const orgName = escapeHtml(pdfData.meta.organizationName);
  const sectorLabel = escapeHtml(pdfData.meta.sectorLabel);
  const decisionEmphasis = escapeHtml(pdfData.meta.decisionEmphasis);
  const failureAddOn = escapeHtml(pdfData.copy.failureAddOn);
  const riskHeader = escapeHtml(pdfData.copy.riskHeader);

  const readinessIndex = escapeHtml(pdfData.metrics.readinessIndex);
  const processWasteTax = escapeHtml(pdfData.metrics.processWasteTax.toLocaleString());
  const promiseGapExposure = escapeHtml(pdfData.metrics.promiseGapExposure.toLocaleString());

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; font-src data:; img-src data:;">
  <title>Diagnostic Control Plane - ${orgName}</title>
  
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #020617;
      background: #ffffff;
      font-size: 11px;
      line-height: 1.5;
      padding: 32px;
    }
    .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    .uppercase { text-transform: uppercase; }
    .text-red-700 { color: #b91c1c; }
    .text-slate-500 { color: #64748b; }
    
    @page { size: A4 portrait; margin: 12mm; }
    .print-avoid-break { break-inside: avoid !important; page-break-inside: avoid !important; }
    .print-break-before { break-before: page !important; page-break-before: always !important; }
    table, thead, tbody, tr, td, th { break-inside: avoid !important; page-break-inside: avoid !important; }
    tr { display: table-row !important; }
    
    .card-grid { display: flex; gap: 12px; margin-bottom: 24px; }
    .metric-card { flex: 1; border: 1px solid #e2e8f0; padding: 16px; background: #f8fafc; }
    .metric-value { font-size: 22px; font-weight: 900; color: #020617; }
    
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th { background: #020617; color: #ffffff; padding: 10px; text-align: left; font-size: 10px; }
    td { border-bottom: 1px solid #e2e8f0; padding: 10px; vertical-align: top; }
    
    .security-box { background: #020617; color: #ffffff; padding: 16px; margin-top: 24px; border-radius: 2px; }
    .security-grid { display: flex; gap: 16px; margin-top: 8px; font-size: 10px; color: #cbd5e1; }
    .security-col { flex: 1; }
  </style>
</head>
<body>

  <!-- PAGE 1: EXECUTIVE BRIEFING & METRICS -->
  <div class="print-avoid-break">
    <div class="font-mono text-red-700 uppercase" style="font-weight: bold;">// PRE-AUTOMATION CONTROL PLANE FORENSIC COCKPIT</div>
    <h1 style="font-size: 20px; font-weight: 900; margin-bottom: 4px;">${orgName}</h1>
    <div class="font-mono text-slate-500" style="margin-bottom: 16px;">SECTOR: ${sectorLabel}</div>
    
    <div style="border: 1px solid #e2e8f0; padding: 16px; background: #f8fafc; margin-bottom: 20px;">
      <strong class="font-mono text-red-700 uppercase">EXECUTIVE BRIEFING:</strong>
      <p style="margin-top: 4px;">
        Control plane diagnostic completed for <strong>${orgName}</strong>. Based on assessed verification patterns, current alignment indicates an estimated Process Waste Tax impact of $${processWasteTax} annually (Readiness Index: ${readinessIndex} / 100).
      </p>
      <p style="margin-top: 6px; font-weight: 600;">Emphasis: ${decisionEmphasis}</p>
    </div>

    <div style="border-left: 3px solid #b91c1c; padding-left: 12px; margin-bottom: 20px;">
      <strong class="font-mono uppercase">${riskHeader}:</strong>
      <p>Without verification gates and workflow stabilization criteria, Phase 02 automation may increase the probability of repeat rework during the initial rollout period ${failureAddOn}</p>
    </div>

    <div class="card-grid print-avoid-break">
      <div class="metric-card">
        <div class="font-mono text-slate-500 uppercase">Readiness Index</div>
        <div class="metric-value">${readinessIndex} / 100</div>
      </div>
      <div class="metric-card">
        <div class="font-mono text-slate-500 uppercase">Process Waste Tax</div>
        <div class="metric-value">$${processWasteTax}</div>
      </div>
      <div class="metric-card">
        <div class="font-mono text-slate-500 uppercase">Promise Gap Risk</div>
        <div class="metric-value">$${promiseGapExposure}</div>
      </div>
    </div>
  </div>

  <!-- PAGE 2: REMEDIATION SOW & GOVERNANCE -->
  <div class="print-break-before print-avoid-break">
    <div class="font-mono text-red-700 uppercase" style="font-weight: bold;">// ACTIVE REMEDIATION STATEMENT OF WORK MATRIX</div>
    <h2 style="font-size: 16px; font-weight: 900; margin-bottom: 12px;">TARGET IMPLEMENTATION SOW</h2>

    <table>
      <thead>
        <tr>
          <th style="width: 15%;">PHASE</th>
          <th style="width: 45%;">SCOPE & SELECTED ACTION</th>
          <th style="width: 40%;">GOVERNANCE & CRITERIA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>PHASE 01</strong><br><span class="font-mono text-slate-500">${escapeHtml(pdfData.sow.phase1.timeline)}</span></td>
          <td>
            <strong>${escapeHtml(pdfData.sow.phase1.scope)}</strong>
            <p style="margin-top: 6px; background: #e2e8f0; padding: 6px; border-radius: 2px;">
              <strong>Selected Action:</strong> ${escapeHtml(pdfData.sow.phase1.optionText)}
            </p>
          </td>
          <td>
            <strong>Owner:</strong> VP of Data / CTO<br>
            <strong>Decision Criteria:</strong> Agreed structural pass thresholds prior to execution.
          </td>
        </tr>
        <tr>
          <td><strong>PHASE 02</strong><br><span class="font-mono text-slate-500">${escapeHtml(pdfData.sow.phase2.timeline)}</span></td>
          <td>
            <strong>${escapeHtml(pdfData.sow.phase2.scope)}</strong>
            <p style="margin-top: 6px; background: #e2e8f0; padding: 6px; border-radius: 2px;">
              <strong>Selected Action:</strong> ${escapeHtml(pdfData.sow.phase2.optionText)}
            </p>
          </td>
          <td>
            <strong>Owner:</strong> VP of Operations / Head of Practice<br>
            <strong>Decision Criteria:</strong> Estimated 25% - 40% reduction in manual rework loops.
          </td>
        </tr>
        <tr>
          <td><strong>PHASE 03</strong><br><span class="font-mono text-slate-500">${escapeHtml(pdfData.sow.phase3.timeline)}</span></td>
          <td>
            <strong>${escapeHtml(pdfData.sow.phase3.scope)}</strong>
            <p style="margin-top: 6px; background: #e2e8f0; padding: 6px; border-radius: 2px;">
              <strong>Selected Action:</strong> ${escapeHtml(pdfData.sow.phase3.optionText)}
            </p>
          </td>
          <td>
            <strong>Owner:</strong> CRO / CISO<br>
            <strong>Decision Criteria:</strong> Pre-deployment gate coverage verified.
          </td>
        </tr>
      </tbody>
    </table>

    <div class="security-box print-avoid-break">
      <div class="font-mono text-red-700 uppercase" style="font-weight: bold;">// SECURITY & DATA HANDLING FAST FACTS</div>
      <div class="security-grid">
        <div class="security-col">
          <strong>ZERO PERSISTENT STORAGE:</strong><br>Processes inputs dynamically without database persistence.
        </div>
        <div class="security-col">
          <strong>STATELESS TOKEN ARCHITECTURE:</strong><br>Uses Base64URL-encoded URL parameters for stateless reproduction.
        </div>
        <div class="security-col">
          <strong>SEPARATION OF INFRASTRUCTURE:</strong><br>Does not require direct integration with client internal networks or confidential data.
        </div>
      </div>
    </div>
  </div>

</body>
</html>`;
}

export async function POST(req: NextRequest) {
  let browser: any = null;

  try {
    const rawText = await req.text();
    if (new TextEncoder().encode(rawText).length > MAX_PAYLOAD_SIZE_BYTES) {
      return NextResponse.json({ error: "Payload size exceeds limit" }, { status: 413 });
    }

    let body: any = {};
    try {
      body = JSON.parse(rawText);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    // STRICT FAIL-CLOSED TOKEN REQUIREMENT
    if (!body?.token || typeof body.token !== "string") {
      return NextResponse.json({ error: "Missing or invalid token parameter" }, { status: 400 });
    }

    const validatedPayload = decodeDiagnosticTokenStrict(body.token);
    if (!validatedPayload) {
      return NextResponse.json({ error: "Invalid or expired token signature" }, { status: 401 });
    }

    const { answers, sowSelections } = validatedPayload;

    const calculations = calculateDiagnosticMetrics(answers);
    const sectorConfig = SECTOR_COPY_REGISTRY[answers.sector] || SECTOR_COPY_REGISTRY.FINANCE;
    const stageConfig =
      DECISION_STAGE_REGISTRY[answers.decisionStage] || DECISION_STAGE_REGISTRY.ACTIVE_STABILIZATION;

    const pdfData = {
      meta: {
        organizationName: answers.organizationName,
        sectorLabel: sectorConfig.label,
        decisionEmphasis: stageConfig.recommendedEmphasis
      },
      metrics: calculations,
      copy: {
        failureAddOn: sectorConfig.failureAddOn,
        riskHeader: stageConfig.riskFramingHeader
      },
      sow: {
        phase1: {
          scope: "Input Verification and Pipeline Hardening",
          optionText: sectorConfig.sowMenu.phase1[sowSelections.PHASE_01],
          timeline: stageConfig.sowPhase1Timeline
        },
        phase2: {
          scope: "Workflow Ownership and Dependency Isolation",
          optionText: sectorConfig.sowMenu.phase2[sowSelections.PHASE_02],
          timeline: stageConfig.sowPhase2Timeline
        },
        phase3: {
          scope: "Continuous Governance and Deployment Gates",
          optionText: sectorConfig.sowMenu.phase3[sowSelections.PHASE_03],
          timeline: stageConfig.sowPhase3Timeline
        }
      }
    };

    const printHtml = buildIsolatedPrintHtml(pdfData);

    const isLocal = process.env.NODE_ENV === "development";
    const executablePath = isLocal
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : await chromium.executablePath();

    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--block-new-web-windows",
        "--disable-remote-fonts"
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: true
    });

    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on("request", (interceptedRequest) => {
      const url = interceptedRequest.url();

      // Allow only inline/data payloads and internal blank contexts
      if (
        url.startsWith("data:") ||
        url === "about:blank" ||
        url === "about:srcdoc"
      ) {
        interceptedRequest.continue();
        return;
      }

      // Everything else is blocked to keep the render hermetic
      interceptedRequest.abort("blockedbyclient");
    });

    await page.setContent(printHtml, {
      waitUntil: "domcontentloaded",
      timeout: RENDER_TIMEOUT_MS
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" }
    });

    await browser.close();
    browser = null;

    const safeFilename = sanitizeFilename(answers.organizationName);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Diagnostic_Control_Plane_${safeFilename}.pdf"`,
        "Cache-Control": "no-store, max-age=0, must-revalidate",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("PDF generation pipeline error:", error);
    }
    if (browser) await browser.close();
    return NextResponse.json({ error: "Internal generation failure" }, { status: 500 });
  }
}
