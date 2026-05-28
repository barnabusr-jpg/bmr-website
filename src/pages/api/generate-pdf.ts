import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

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

    // 🎨 GLOBAL PERMANENT GREEN PROFILE HARDCODED
    const orgName = audit.org_name || "EVALUATION CLIENT SYSTEM";
    const dbDecay = audit.decay_pct || 24;
    const spend = parseFloat(audit.ai_spend) || 1.2;
    const fteCount = audit.roi_pct ? parseInt(audit.roi_pct) : Math.round((spend * 1000000) / 200000) || 5;

    const laborMultiplier = 0.5;
    const baseExposureRate = 0.22;
    const highExposureRate = 0.35;
    const brandHexAccent = "#16a34a"; // Pure premium green design line

    const laborTax = (dbDecay / 100) * laborMultiplier * (fteCount * 160000 * 1.3);
    const selectedExposureRate = dbDecay > 60 ? highExposureRate : baseExposureRate;
    const exposure = (selectedExposureRate * (spend * 1000000)) * 1.15;
    const totalErosion = laborTax + exposure;

    // 🔒 THE EXACT SAME SYSTEM OBFUSCATION MATRIX PIPED INTO THE DOCUMENT
    const secureAnomalies = [
      { id: "FRACTURE_NODE_STACK_ALPHA", description: "[ RESTRICTED ENCRYPTED STREAM // DATA WITHHELD IN DIAGNOSTIC PHASE 1 ]" },
      { id: "FRACTURE_NODE_STACK_BETA", description: "[ RESTRICTED ENCRYPTED STREAM // DATA WITHHELD IN DIAGNOSTIC PHASE 1 ]" },
      { id: "FRACTURE_NODE_STACK_GAMMA", description: "[ RESTRICTED ENCRYPTED STREAM // DATA WITHHELD IN DIAGNOSTIC PHASE 1 ]" },
      { id: "FRACTURE_NODE_STACK_DELTA", description: "[ RESTRICTED ENCRYPTED STREAM // DATA WITHHELD IN DIAGNOSTIC PHASE 1 ]" }
    ];

    const htmlCanvasContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>BMR_FORENSIC_LEDGER_${id}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { 
            background-color: #020617; 
            color: #ffffff; 
            font-family: monospace; 
            padding: 50px; 
            margin: 0; 
            text-transform: uppercase; 
            font-style: italic;
            font-weight: 900;
          }
          .container { max-width: 900px; margin: 0 auto; }
          .header-box { border-bottom: 2px solid ${brandHexAccent}; padding-bottom: 20px; margin-bottom: 40px; }
          .title-brand { font-size: 24px; font-weight: 900; letter-spacing: -1px; }
          .title-brand span { color: ${brandHexAccent}; }
          .subtitle { font-size: 10px; color: #64748b; letter-spacing: 3px; margin-top: 5px; }
          
          .placard { 
            background-color: #ffffff; 
            color: #000000; 
            padding: 35px; 
            border-left: 12px solid ${brandHexAccent}; 
            margin-bottom: 40px; 
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .placard-left { text-align: left; }
          .placard h2 { margin: 0 0 15px 0; font-size: 32px; font-weight: 900; letter-spacing: -1px; }
          .metrics-grid { display: flex; gap: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          .metric-cell { text-align: left; }
          .cell-label { font-size: 9px; color: #64748b; font-weight: bold; }
          .cell-value { font-size: 14px; font-weight: 900; color: #000000; margin-top: 4px; }
          .cell-value span { color: ${brandHexAccent}; }
          
          .placard-right { text-align: right; min-w-[240px]; }
          .erosion-label { font-size: 9px; color: #64748b; font-weight: bold; display: block; margin-bottom: 4px; }
          .erosion-val { font-size: 32px; color: ${brandHexAccent}; font-weight: 900; tracking: -1px; }

          .section-title { font-size: 14px; color: #64748b; border-bottom: 1px solid #1e293b; padding-bottom: 8px; margin-bottom: 20px; letter-spacing: 2px; text-align: left; }
          .anomaly-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .node-card { border: 1px solid #1e293b; background-color: rgba(5, 11, 24, 0.6); padding: 20px; display: flex; flex-direction: column; justify-content: space-between; min-height: 240px; }
          .node-top { border-bottom: 1px solid #1e293b; padding-bottom: 10px; margin-bottom: 12px; font-size: 10px; color: #475569; text-align: left; }
          .node-top span { float: right; background-color: rgba(22, 163, 74, 0.1); color: ${brandHexAccent}; padding: 1px 6px; font-size: 9px; border: 1px solid rgba(22, 163, 74, 0.2); }
          .node-title { font-size: 16px; font-weight: 900; color: #ffffff; margin-bottom: 8px; text-align: left; }
          .node-desc { font-family: monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase; line-height: 1.5; margin-bottom: 15px; text-align: left; }
          .directive-label { font-size: 8px; color: #475569; margin-bottom: 2px; text-align: left; }
          .directive-val { font-size: 11px; font-weight: 900; color: ${brandHexAccent}; text-align: left; }
          .footer-text { font-size: 9px; color: #334155; text-align: center; margin-top: 60px; letter-spacing: 2px; }
          
          @media print {
            body { padding: 0; background-color: #020617; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .container { max-width: 100%; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header-box">
            <div class="title-brand">BMR<span>SOLUTIONS</span></div>
            <div class="subtitle">FORENSIC_SYSTEM_DECAY_LEDGER // DIAGNOSTIC_PHASE_1</div>
          </div>

          <div class="placard">
            <div class="placard-left">
              <h2>EFFICIENCY_VERDICT</h2>
              <div style="font-size: 10px; color: #94a3b8; margin-bottom: 20px; font-weight: bold;">ORGANIZATION BASELINE: ${orgName}</div>
              <div class="metrics-grid">
                <div class="metric-cell">
                  <div class="cell-label">LOGIC_DECAY_COEFFICIENT</div>
                  <div class="cell-value"><span>${dbDecay}%</span> DECAY RATE</div>
                </div>
                <div class="metric-cell">
                  <div class="metric-cell-pad" style="width: 20px; display: inline-block;" />
                  <div class="cell-label">PROCESS_WASTE_TAX</div>
                  <div class="cell-value"><span>$${laborTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> LIAB</div>
                </div>
                <div class="metric-cell">
                  <div class="metric-cell-pad" style="width: 20px; display: inline-block;" />
                  <div class="cell-label">PROJECTED_ANNUAL_EXPOSURE</div>
                  <div class="cell-value"><span>$${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> RISK</div>
                </div>
              </div>
            </div>
            <div class="placard-right">
              <span class="erosion-label">CAPITAL_EROSION_VELOCITY</span>
              <div class="erosion-val">$${totalErosion.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <span class="cell-label" style="display:block; margin-top:4px;">REAL-TIME_LOSS_INDEX</span>
            </div>
          </div>

          <div class="section-title">// IDENTIFIED_SYSTEMIC_ANOMALIES_BLUEPRINT</div>
          
          <div class="anomaly-grid">
            ${secureAnomalies.map((frac, i) => `
              <div class="node-card">
                <div class="node-top">
                  // INDEX NODE FR-0${i + 1}
                  <span>SECURE_GATE</span>
                </div>
                <div>
                  <div class="node-title">${frac.id.replace(/_/g, " ")}</div>
                  <div class="node-desc">${frac.description}</div>
                </div>
                <div>
                  <div class="directive-label">REQUIRED REMEDIATION DIRECTIVE:</div>
                  <div class="directive-val">Requires advisor authorization node clearance.</div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="footer-text">SECURE TECHNICAL ARTIFACT // DATA GENERATED DIRECTLY UNDER ADVISORY MASTER FRAMEWORK // v2.6</div>
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

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(htmlCanvasContent);

  } catch (err: any) {
    console.error("SERVERLESS_PRINT_GENERATION_EXCEPTION:", err);
    return res.status(500).json({ error: "INTERNAL_SERVERLESS_COMPILE_CRASH", details: err?.message || err });
  }
}
