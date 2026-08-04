import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

// Vercel Serverless Function Configuration
export const config = {
  maxDuration: 60,
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { org, decay, spend, fte, leakage, tax } = req.query;

  // Extract values directly from stateless URL params with safe fallbacks
  const orgName = (org as string) || "Evaluation Client System";
  const dbDecay = parseInt((decay as string) || "24", 10);
  const readinessGap = 100 - dbDecay;

  const liveSpend = (spend as string) || "1.2";
  const liveFte = (fte as string) || "6";

  const fteNum = parseInt(liveFte, 10);
  const spendNum = parseFloat(liveSpend);

  const laborTax = tax
    ? parseInt(tax as string, 10)
    : Math.round((dbDecay / 100) * 0.5 * (fteNum * 160000 * 1.3));

  const sectorInflation = 1.2;
  const exposure = Math.round(
    0.22 * (dbDecay / 25) * (spendNum * 1000000) * sectorInflation
  );
  const totalLeakage = leakage
    ? parseInt(leakage as string, 10)
    : laborTax + exposure;

  // 16:9 Executive Light Presentation HTML Template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          @page { size: 1920px 1080px; margin: 0; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .slide {
            width: 1920px;
            height: 1080px;
            page-break-after: always;
            padding: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #f8fafc;
            border-top: 12px solid #0f172a;
            position: relative;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 24px;
          }
          .title { font-size: 42px; font-weight: 800; color: #0f172a; letter-spacing: -1px; }
          .subtitle { font-size: 16px; font-weight: 600; color: #dc2626; margin-top: 6px; font-family: monospace; }
          .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin: 32px 0; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin: 32px 0; }
          .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            padding: 36px;
            border-radius: 8px;
            position: relative;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }
          .card-danger { border-left: 8px solid #dc2626; }
          .metric-label { font-size: 14px; font-weight: 700; color: #64748b; margin-bottom: 12px; font-family: monospace; }
          .metric-val { font-size: 56px; font-weight: 800; color: #0f172a; letter-spacing: -2px; line-height: 1; }
          .table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 15px; }
          .table th { text-align: left; color: #64748b; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; font-family: monospace; font-size: 13px; }
          .table td { padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #334155; font-weight: 500; }
          .non-compliant { color: #dc2626; font-weight: 700; font-family: monospace; }
          .footer-box {
            background: #ffffff;
            border-left: 8px solid #0f172a;
            border: 1px solid #e2e8f0;
            padding: 24px;
            font-size: 16px;
            color: #475569;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>

        <!-- SLIDE 1 -->
        <div class="slide">
          <div class="header">
            <div>
              <div class="title">Executive Diagnostic Dossier</div>
              <div class="subtitle">STEERCO FUNDING & RISK AUDIT // ASSESSMENT FOR: ${orgName}</div>
            </div>
            <div style="font-size: 14px; font-weight: 700; color: #64748b; font-family: monospace;">SLIDE 01 // CFO BRIEFING</div>
          </div>
          <div class="grid-3">
            <div class="card">
              <div class="metric-label">AI READINESS GAP</div>
              <div class="metric-val" style="color: #dc2626;">${readinessGap}%</div>
              <div style="font-size: 12px; font-weight: 600; color: #64748b; margin-top: 12px;">READINESS RATING</div>
            </div>
            <div class="card">
              <div class="metric-label">PROCESS WASTE TAX</div>
              <div class="metric-val">$${laborTax.toLocaleString()}</div>
              <div style="font-size: 12px; font-weight: 600; color: #64748b; margin-top: 12px;">ANNUAL REWORK LIABILITY</div>
            </div>
            <div class="card card-danger">
              <div class="metric-label">TOTAL PROMISE GAP™ EXPOSURE</div>
              <div class="metric-val">$${exposure.toLocaleString()}</div>
              <div style="font-size: 12px; font-weight: 600; color: #dc2626; margin-top: 12px;">CAPITAL RISK EXPOSURE</div>
            </div>
          </div>
          <div class="card">
            <div class="metric-label" style="color: #0f172a;">COMPLIANCE & GOVERNANCE ALIGNMENT</div>
            <table class="table">
              <thead>
                <tr><th>STANDARD</th><th>CLAUSE / REQUIREMENT</th><th>SYSTEM IMPACT</th><th>STATUS</th></tr>
              </thead>
              <tbody>
                <tr><td>ISO 9001:2015</td><td>Clause 8.5.1</td><td>Uncontrolled schema alterations in messaging queues</td><td class="non-compliant">PENDING REVIEW</td></tr>
                <tr><td>HL7 FHIR v4</td><td>Data Exchange Conformance</td><td>Unstructured schema drift breaking transaction lineage</td><td class="non-compliant">PENDING REVIEW</td></tr>
                <tr><td>PCI-DSS v4.0</td><td>Requirement 10.2</td><td>Telemetry saturation breaking real-time audit logs</td><td class="non-compliant">PENDING REVIEW</td></tr>
                <tr><td>SOX Act</td><td>Section 404</td><td>Unmapped risk vectors in financial reporting controls</td><td class="non-compliant">PENDING REVIEW</td></tr>
              </tbody>
            </table>
          </div>
          <div class="footer-box">
            <strong style="color: #0f172a;">EXECUTIVE SUMMARY:</strong> Uninsulated data pipelines generate an estimated annual loss run-rate of <strong>$${totalLeakage.toLocaleString()}</strong> across ${liveFte} FTE resources, creating $${exposure.toLocaleString()} in unhedged enterprise exposure for ${orgName}.
          </div>
        </div>

        <!-- SLIDE 2 -->
        <div class="slide">
          <div class="header">
            <div>
              <div class="title">Key Findings & Integration Risks</div>
              <div class="subtitle">SYSTEMIC BOTTLENECK MAPPING // OPERATIONAL ROOT CAUSE</div>
            </div>
            <div style="font-size: 14px; font-weight: 700; color: #64748b; font-family: monospace;">SLIDE 02 // TECHNICAL BRIEFING</div>
          </div>
          <div class="grid-2">
            <div class="card card-danger">
              <div class="metric-label" style="color: #dc2626;">FINDING #1 // CRITICAL PRIORITY</div>
              <div style="font-size: 26px; font-weight: 800; color: #0f172a; margin: 16px 0;">Unmapped Schema Drift</div>
              <p style="font-size: 16px; color: #475569; line-height: 1.6;">
                Unstructured third-party updates inject context noise directly into model ingestion layers, forcing senior developers to manually manage broken interfaces.
              </p>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; color: #dc2626; font-size: 14px; font-weight: 700; font-family: monospace;">
                RECOMMENDED ACTION: Deploy Track 01 ingestion contracts and schema bounds.
              </div>
            </div>
            <div class="card">
              <div class="metric-label" style="color: #d97706;">FINDING #2 // HIGH PRIORITY</div>
              <div style="font-size: 26px; font-weight: 800; color: #0f172a; margin: 16px 0;">Validation Fatigue Node</div>
              <p style="font-size: 16px; color: #475569; line-height: 1.6;">
                Absence of automated sensitivity labeling exposes operational runtimes to DLP risk while flooding engineers with unprioritized alert noise.
              </p>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 700; font-family: monospace;">
                RECOMMENDED ACTION: Instantiate Track 02 telemetry filters and oversight controls.
              </div>
            </div>
          </div>
          <div class="footer-box">
            <strong style="color: #0f172a;">OPERATIONAL IMPACT:</strong> Engineering resources are allocated to manual maintenance rather than scaling core platform functionality. Modernizing these hand-offs is recommended prior to expanding AI automation.
          </div>
        </div>

        <!-- SLIDE 3 -->
        <div class="slide">
          <div class="header">
            <div>
              <div class="title">Recommended Statement of Work</div>
              <div class="subtitle">PRE-AUTOMATION CONTROL PLANE & REMEDIATION ROADMAP</div>
            </div>
            <div style="font-size: 14px; font-weight: 700; color: #64748b; font-family: monospace;">SLIDE 03 // CEO & STEERCO BRIEFING</div>
          </div>
          <div class="grid-2">
            <div class="card">
              <div class="metric-label" style="color: #dc2626;">PHASE 01 // CRITICAL PRIORITY</div>
              <div style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 12px 0;">Track 01 // Pipeline Hardening</div>
              <p style="font-size: 15px; color: #475569; line-height: 1.5;">
                Constructs machine-readable data contracts and SLA gates to prevent model hallucinations and silent pipeline breaks.
              </p>
            </div>
            <div class="card">
              <div class="metric-label" style="color: #2563eb;">PHASE 02 // HIGH PRIORITY</div>
              <div style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 12px 0;">Track 02 // Telemetry Decoupling</div>
              <p style="font-size: 15px; color: #475569; line-height: 1.5;">
                Suppresses alert desensitization and ensures executive sign-off is restricted strictly to critical exception boundaries.
              </p>
            </div>
          </div>
          <div class="card">
            <div class="metric-label" style="color: #0f172a;">PRE-AUTOMATION CONTROL PLANE GATES</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 16px;">
              <div>
                <div style="font-size: 12px; color: #64748b; font-family: monospace;">DLP RISK CEILING</div>
                <div style="font-size: 28px; font-weight: 800; color: #0f172a;">$18,000</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #64748b; font-family: monospace;">SCHEMA MUTATION GATE</div>
                <div style="font-size: 28px; font-weight: 800; color: #0f172a;">4 / 10K Calls</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #64748b; font-family: monospace;">MAX DRIFT TOLERANCE</div>
                <div style="font-size: 28px; font-weight: 800; color: #0f172a;">10.8%</div>
              </div>
            </div>
          </div>
          <div class="footer-box" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: #0f172a;">DECISION DIRECTIVE:</strong> Attach this Dossier to the Master Services Agreement and authorize the Track 01 SOW.
            </div>
            <div style="background: #0f172a; color: #ffffff; padding: 12px 24px; font-size: 14px; font-weight: 700; border-radius: 4px; font-family: monospace;">
              READY FOR STEERCO SUBMISSION
            </div>
          </div>
        </div>

      </body>
    </html>
  `;

  try {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const puppeteer = require("puppeteer-core");
    const chromium = require("@sparticuz/chromium");

    if (typeof chromium.setGraphicsMode === "function") {
      chromium.setGraphicsMode(false);
    }

    const executablePath = await chromium.executablePath();

    const execDir = path.dirname(executablePath);
    if (execDir) {
      process.env.LD_LIBRARY_PATH = `${execDir}:${process.env.LD_LIBRARY_PATH || ""}`;
    }

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      width: "1920px",
      height: "1080px",
      printBackground: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="BMR_EXECUTIVE_DOSSIER_${orgName.replace(/\s+/g, "_")}.pdf"`
    );
    return res.status(200).send(pdfBuffer);
  } catch (err: any) {
    console.error("PDF deck generation failed:", err);
    return res
      .status(500)
      .json({ error: "PDF Generation Failed", details: err.message });
  }
}
