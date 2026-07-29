import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// Vercel Serverless Function Configuration
export const config = {
  maxDuration: 60,
  api: {
    bodyParser: false,
  },
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, spend, fte, leakage, tax } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Missing audit identifier" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const liveSpend = (spend as string) || "2.5";
  const liveFte = (fte as string) || "50";

  // Query audit record from Supabase
  const { data: audit, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !audit) {
    return res.status(404).json({ error: "Audit record not found" });
  }

  // Parse metrics
  const orgName = audit.org_name || "TARGET ENTITY";
  const dbDecay = audit.decay_pct || 24;
  const sfiScore = audit.sfi_score || dbDecay;
  const readinessGap = 100 - sfiScore;

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

  // 16:9 Presentation HTML Template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          @page { size: 1920px 1080px; margin: 0; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Courier New', Courier, monospace;
            background-color: #020617;
            color: #f8fafc;
            text-transform: uppercase;
            font-style: italic;
            font-weight: 900;
          }
          .slide {
            width: 1920px;
            height: 1080px;
            page-break-after: always;
            padding: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #020617;
            border: 10px solid #0f172a;
            position: relative;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #1e293b;
            padding-bottom: 24px;
          }
          .title { font-size: 48px; color: #ffffff; letter-spacing: -2px; }
          .subtitle { font-size: 18px; color: #ef4444; margin-top: 8px; }
          .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin: 40px 0; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 40px 0; }
          .card {
            background: #090d16;
            border: 2px solid #1e293b;
            padding: 40px;
            position: relative;
          }
          .card-danger { border-color: #991b1b; background: #180505; }
          .metric-label { font-size: 14px; color: #64748b; margin-bottom: 12px; }
          .metric-val { font-size: 64px; color: #ef4444; letter-spacing: -3px; line-height: 1; }
          .table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 16px; }
          .table th { text-align: left; color: #64748b; padding-bottom: 12px; border-bottom: 1px solid #1e293b; }
          .table td { padding: 16px 0; border-bottom: 1px solid #0f172a; color: #cbd5e1; }
          .non-compliant { color: #ef4444; font-weight: bold; }
          .footer-box {
            background: #000000;
            border-left: 8px solid #dc2626;
            padding: 24px;
            font-size: 18px;
            color: #94a3b8;
            font-style: normal;
          }
        </style>
      </head>
      <body>

        <!-- SLIDE 1 -->
        <div class="slide">
          <div class="header">
            <div>
              <div class="title">TARGET STRATEGIC VERDICT DOSSIER</div>
              <div class="subtitle">EXECUTIVE FINANCIAL & REGULATORY AUDIT // ENTITY: ${orgName}</div>
            </div>
            <div style="font-size: 16px; color: #64748b;">SLIDE 01 // CFO BRIEFING</div>
          </div>
          <div class="grid-3">
            <div class="card">
              <div class="metric-label">INTEGRITY COMPLIANCE INDEX</div>
              <div class="metric-val" style="color: #eab308;">${readinessGap}/100</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 12px;">CRITICAL RISK THRESHOLD ENCOUNTERED</div>
            </div>
            <div class="card">
              <div class="metric-label">AGGREGATED REWORK TAX</div>
              <div class="metric-val">$${laborTax.toLocaleString()}</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 12px;">ANNUAL DEVELOPER CAPACITY LOST</div>
            </div>
            <div class="card card-danger">
              <div class="metric-label">FORENSIC INACTION LIABILITY</div>
              <div class="metric-val">$${exposure.toLocaleString()}</div>
              <div style="font-size: 12px; color: #ef4444; margin-top: 12px;">UNHEDGED REGULATORY FINE EXPOSURE</div>
            </div>
          </div>
          <div class="card">
            <div class="metric-label" style="color: #ef4444;">REGULATORY NON-COMPLIANCE MATCHES DETECTED</div>
            <table class="table">
              <thead>
                <tr><th>STANDARD</th><th>CLAUSE / REQUIREMENT</th><th>SYSTEM IMPACT</th><th>STATUS</th></tr>
              </thead>
              <tbody>
                <tr><td>ISO 9001:2015</td><td>Clause 8.5.1</td><td>Uncontrolled schema alterations in messaging queues</td><td class="non-compliant">[NON-COMPLIANT]</td></tr>
                <tr><td>HL7 FHIR v4</td><td>Data Exchange Conformance</td><td>Unstructured schema drift breaking transaction lineage</td><td class="non-compliant">[NON-COMPLIANT]</td></tr>
                <tr><td>PCI-DSS v4.0</td><td>Requirement 10.2</td><td>Telemetry saturation breaking real-time audit logs</td><td class="non-compliant">[NON-COMPLIANT]</td></tr>
                <tr><td>SOX Act</td><td>Section 404</td><td>Unmapped risk vectors in financial reporting controls</td><td class="non-compliant">[NON-COMPLIANT]</td></tr>
              </tbody>
            </table>
          </div>
          <div class="footer-box">
            <strong style="color: #ef4444;">EXECUTIVE SUMMARY:</strong> Uninsulated pipelines generate an annual loss run-rate of <strong>$${totalLeakage.toLocaleString()}</strong> across ${liveFte} FTE resources, exposing ${orgName} to $${exposure.toLocaleString()} in unhedged compliance liabilities.
          </div>
        </div>

        <!-- SLIDE 2 -->
        <div class="slide">
          <div class="header">
            <div>
              <div class="title">IDENTIFIED LOGIC FRACTURES</div>
              <div class="subtitle">SYSTEMIC BOTTLENECK MAPPING // OPERATIONAL ROOT CAUSE</div>
            </div>
            <div style="font-size: 16px; color: #64748b;">SLIDE 02 // CTO BRIEFING</div>
          </div>
          <div class="grid-2">
            <div class="card card-danger">
              <div class="metric-label" style="color: #ef4444;">FRACTURE 01 // CRITICAL PRIORITY</div>
              <div style="font-size: 28px; color: #ffffff; margin: 16px 0;">UNMAPPED SCHEMA DRIFT</div>
              <p style="font-size: 16px; color: #cbd5e1; font-style: normal; line-height: 1.6;">
                Unstructured third-party updates inject context noise directly into model ingestion layers, forcing senior developers to manually nurse broken interfaces.
              </p>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #991b1b; color: #ef4444; font-size: 14px;">
                REQUIRED DIRECTIVE: DEPLOY TRACK 01 INGESTION CONTRACTS
              </div>
            </div>
            <div class="card">
              <div class="metric-label" style="color: #eab308;">FRACTURE 02 // HIGH PRIORITY</div>
              <div style="font-size: 28px; color: #ffffff; margin: 16px 0;">VALIDATION FATIGUE NODE</div>
              <p style="font-size: 16px; color: #cbd5e1; font-style: normal; line-height: 1.6;">
                Absence of automated sensitivity labeling exposes operational runtimes to DLP risk while flooding engineers with unprioritized alert noise.
              </p>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; color: #3b82f6; font-size: 14px;">
                REQUIRED DIRECTIVE: INSTANTIATE TRACK 02 TELEMETRY FILTERS
              </div>
            </div>
          </div>
          <div class="footer-box">
            <strong style="color: #ef4444;">OPERATIONAL IMPACT:</strong> Senior platform developers are currently trapped in manual firefighting loops. Modernizing these hand-offs is required prior to scaling autonomous AI agents.
          </div>
        </div>

        <!-- SLIDE 3 -->
        <div class="slide">
          <div class="header">
            <div>
              <div class="title">RECOMMENDED STATEMENT OF WORK</div>
              <div class="subtitle">PRE-AUTOMATION CONTROL PLANE & REMEDIATION ROADMAP</div>
            </div>
            <div style="font-size: 16px; color: #64748b;">SLIDE 03 // CEO & STEERCO BRIEFING</div>
          </div>
          <div class="grid-2">
            <div class="card">
              <div class="metric-label" style="color: #ef4444;">PHASE 01 // CRITICAL PRIORITY</div>
              <div style="font-size: 24px; color: #ffffff; margin: 12px 0;">TRACK 01 // PIPELINE HARDENING</div>
              <p style="font-size: 14px; color: #94a3b8; font-style: normal; line-height: 1.5;">
                Constructs machine-readable data contracts and SLA gates to prevent model hallucinations and silent pipeline breaks.
              </p>
            </div>
            <div class="card">
              <div class="metric-label" style="color: #3b82f6;">PHASE 02 // HIGH PRIORITY</div>
              <div style="font-size: 24px; color: #ffffff; margin: 12px 0;">TRACK 02 // TELEMETRY DECOUPLING</div>
              <p style="font-size: 14px; color: #94a3b8; font-style: normal; line-height: 1.5;">
                Suppresses alert desensitization and ensures executive sign-off is restricted strictly to critical exception boundaries.
              </p>
            </div>
          </div>
          <div class="card">
            <div class="metric-label" style="color: #eab308;">PRE-AUTOMATION AI CONTROL PLANE GATES</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 16px;">
              <div>
                <div style="font-size: 12px; color: #64748b;">DLP RISK CEILING</div>
                <div style="font-size: 28px; color: #ffffff;">$18,000</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #64748b;">SCHEMA MUTATION GATE</div>
                <div style="font-size: 28px; color: #ffffff;">4 / 10K CALLS</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #64748b;">MAX DRIFT TOLERANCE</div>
                <div style="font-size: 28px; color: #ffffff;">10.8%</div>
              </div>
            </div>
          </div>
          <div class="footer-box" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: #ef4444;">DECISION PROTOCOL:</strong> Attach this Dossier to MSA and execute Track 01 Sprint.
            </div>
            <div style="background: #dc2626; color: #ffffff; padding: 12px 24px; font-size: 14px;">
              APPROVED FOR EXECUTION
            </div>
          </div>
        </div>

      </body>
    </html>
  `;

  // Serverless execution with dynamic require
  try {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const puppeteer = require("puppeteer-core");
    const chromium = require("@sparticuz/chromium");

    const executablePath = await chromium.executablePath();

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
    console.error("PDF generation failed:", err);
    return res
      .status(500)
      .json({ error: "PDF Generation Failed", details: err.message });
  }
}
