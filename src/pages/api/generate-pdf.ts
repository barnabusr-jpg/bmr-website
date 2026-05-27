import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "BAD_REQUEST // MISSING_TARGET_RECORD_ID" });
  }

  try {
    const { data: audit, error } = await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !audit) {
      return res.status(404).json({ error: "NOT_FOUND // SPECIFIED_RECORD_MISSING" });
    }

    if (!audit.is_released) {
      return res.status(403).json({ error: "ACCESS_RESTRICTED // TARGET_RECORD_NOT_IN_PHASE_TWO_RELEASE" });
    }

    const dbDecay = audit.decay_pct || 24;
    const spend = parseFloat(audit.ai_spend) || 1.2;
    const fteCount = audit.roi_pct ? parseInt(audit.roi_pct) : Math.round((spend * 1000000) / 200000) || 5;
    const sectorType = (audit.sector || "general").toLowerCase().trim();

    let laborMultiplier = 0.4;
    let baseExposureRate = 0.18;
    let highExposureRate = 0.30;
    let brandHexAccent = "#dc2626"; 

    if (sectorType === "finance" || sectorType === "banking") {
      laborMultiplier = 0.5;
      baseExposureRate = 0.22;
      highExposureRate = 0.35;
      brandHexAccent = "#16a34a"; 
    } else if (sectorType === "healthcare" || sectorType === "medical") {
      laborMultiplier = 0.45;
      baseExposureRate = 0.20;
      highExposureRate = 0.32;
      brandHexAccent = "#2563eb"; 
    }

    const laborTax = (dbDecay / 100) * laborMultiplier * (fteCount * 160000 * 1.3);
    const selectedExposureRate = dbDecay > 60 ? highExposureRate : baseExposureRate;
    const exposure = (selectedExposureRate * (spend * 1000000)) * 1.15;

    const htmlReportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { background-color: #020617; color: #ffffff; font-family: monospace; padding: 50px; margin: 0; text-transform: uppercase; }
          .header-box { border-bottom: 2px solid ${brandHexAccent}; padding-bottom: 20px; margin-bottom: 40px; }
          .title-brand { font-size: 24px; font-weight: 900; letter-spacing: -1px; font-style: italic; }
          .title-brand span { color: ${brandHexAccent}; }
          .subtitle { font-size: 10px; color: #64748b; letter-spacing: 3px; margin-top: 5px; }
          .placard { background-color: #ffffff; color: #000000; padding: 35px; border-left: 12px solid ${brandHexAccent}; margin-bottom: 40px; }
          .placard h2 { margin: 0 0 15px 0; font-size: 32px; font-style: italic; font-weight: 900; letter-spacing: -1px; }
          .metrics-grid { display: table; width: 100%; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          .metric-cell { display: table-cell; width: 33.33%; }
          .cell-label { font-size: 9px; color: #64748b; font-weight: bold; }
          .cell-value { font-size: 14px; font-weight: 900; color: #000000; margin-top: 4px; }
          .cell-value span { color: ${brandHexAccent}; }
          .section-title { font-size: 14px; color: #64748b; border-bottom: 1px solid #1e293b; padding-bottom: 8px; margin-bottom: 20px; letter-spacing: 2px; }
          .node-card { border: 1px solid #1e293b; background-color: rgba(5, 11, 24, 0.6); padding: 20px; margin-bottom: 20px; }
          .node-top { border-bottom: 1px solid #1e293b; padding-bottom: 10px; margin-bottom: 12px; font-size: 10px; color: #475569; }
          .node-top span { float: right; background-color: rgba(220, 38, 38, 0.1); color: #ef4444; padding: 1px 6px; font-size: 9px; }
          .node-title { font-size: 16px; font-weight: 900; color: #ffffff; margin-bottom: 8px; font-style: italic; }
          .node-desc { font-family: sans-serif; font-size: 11px; color: #94a3b8; text-transform: none; line-height: 1.5; margin-bottom: 15px; }
          .directive-label { font-size: 8px; color: #475569; margin-bottom: 2px; }
          .directive-val { font-size: 11px; font-weight: 900; color: ${brandHexAccent}; font-style: italic; }
          .footer-text { font-size: 9px; color: #334155; text-align: center; margin-top: 60px; letter-spacing: 2px; }
        </style>
      </head>
      <body>
        <div class="header-box">
          <div class="title-brand">BMR<span>SOLUTIONS</span></div>
          <div class="subtitle">FORENSIC_SYSTEM_DECAY_LEDGER // PHASE_2_VERIFIED</div>
        </div>
        <div class="placard">
          <h2>SYSTEM_REALITY_AUDIT</h2>
          <div style="font-size: 10px; color: #94a3b8; margin-bottom: 20px; font-weight: bold;">ORGANIZATION BASELINE: ${audit.org_name}</div>
          <div class="metrics-grid">
            <div class="metric-cell">
              <div class="cell-label">LOGIC_DECAY_COEFFICIENT</div>
              <div class="cell-value"><span>${dbDecay}%</span> DECAY RATE</div>
            </div>
            <div class="metric-cell">
              <div class="cell-label">PROCESS_WASTE_TAX</div>
              <div class="cell-value"><span>$${laborTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> LIAB</div>
            </div>
            <div class="metric-cell">
              <div class="cell-label">PROJECTED_ANNUAL_EXPOSURE</div>
              <div class="cell-value"><span>$${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> RISK</div>
            </div>
          </div>
        </div>
        <div class="section-title">// IDENTIFIED_SYSTEMIC_ANOMALIES_BLUEPRINT</div>
        ${audit.fractures && audit.fractures.length > 0 ? audit.fractures.map((frac: any, i: number) => `
          <div class="node-card" style="${frac.severity === 'CRITICAL' ? 'border-color: rgba(220,38,38,0.4);' : ''}">
            <div class="node-top">// INDEX NODE FR-0${i + 1}<span style="${frac.severity !== 'CRITICAL' ? 'color: #f59e0b; background: rgba(245,158,11,0.1);' : ''}">${frac.severity || 'HIGH'}_RISK</span></div>
            <div class="node-title">${String(frac.id || 'ANOMALY_NODE').replace(/_/g, " ")}</div>
            <div class="node-desc">${frac.description}</div>
            <div class="directive-label">REQUIRED REMEDIATION DIRECTIVE:</div>
            <div class="directive-val">${frac.directive}</div>
          </div>
        `).join('') : '<p style="color:#475569;">NO_ANOMALY_DATA_POPULATED</p>'}
        <div class="footer-text">SECURE TECHNICAL ARTIFACT // DATA GENERATED DIRECTLY UNDER ADVISORY MASTER FRAMEWORK // v2.6</div>
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        `https://github.com/sparticuz/chromium/releases/download/v123.0.0/chromium-v123.0.0-pack.tar`
      ),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(htmlReportContent, { waitUntil: "networkidle0" });
    
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" }
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=BMR-Forensic-Ledger-${id}.pdf`);
    return res.status(200).send(pdfBuffer);

  } catch (err: any) {
    console.error("SERVERLESS_PDF_GENERATION_EXCEPTION:", err);
    return res.status(500).json({ error: "INTERNAL_SERVERLESS_COMPILE_CRASH", details: err?.message || err });
  }
}

export const config = {
  api: {
    responseLimit: false,
    bodyParser: true,
  },
};
