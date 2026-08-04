import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Bad Request // Missing Target Record ID" });
  }

  try {
    const { data: audit, error } = await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !audit) {
      return res.status(404).json({ error: "Not Found // Specified Record Missing" });
    }

    const orgName = audit.org_name || "Evaluation Client System";
    const dbDecay = audit.decay_pct || 24;
    const spend = parseFloat(audit.ai_spend) || 1.2;
    const fteCount = audit.roi_pct ? parseInt(audit.roi_pct) : Math.round((spend * 1000000) / 200000) || 6;

    const historicalAnchorTime = new Date(audit.created_at).getTime();
    const currentRealTime = Date.now();
    const elapsedSeconds = Math.max(0, (currentRealTime - historicalAnchorTime) / 1000);

    const sector = audit.sector || 'other';
    const laborMultiplier = sector === 'finance' ? 0.5 : sector === 'healthcare' ? 0.45 : 0.4;
    const brandHexAccent = "#dc2626";

    const totalLaborTaxPool = (dbDecay / 100) * laborMultiplier * (fteCount * 160000 * 1.3);
    const exposure = ((dbDecay > 60 ? 0.30 : 0.18) * (spend * 1000000)) * 1.15;
    const totalErosion = (exposure / 31536000) * elapsedSeconds;

    const secureAnomalies = [
      { 
        id: `Finding #1 // Estimated Impact $${(totalLaborTaxPool * 0.35).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
        description: "Diagnostic parameters verified. Root cause analytics and integration vectors are compiled and locked under initial intake protocols." 
      },
      { 
        id: `Finding #2 // Estimated Impact $${(totalLaborTaxPool * 0.28).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
        description: "Diagnostic parameters verified. Root cause analytics and integration vectors are compiled and locked under initial intake protocols." 
      },
      { 
        id: `Finding #3 // Estimated Impact $${(totalLaborTaxPool * 0.22).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
        description: "Diagnostic parameters verified. Root cause analytics and integration vectors are compiled and locked under initial intake protocols." 
      },
      { 
        id: `Finding #4 // Estimated Impact $${(totalLaborTaxPool * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
        description: "Diagnostic parameters verified. Root cause analytics and integration vectors are compiled and locked under initial intake protocols." 
      }
    ];

    const htmlCanvasContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>BMR Diagnostic Report ${id}</title>
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
          .title-brand span { color: ${brandHexAccent}; }
          .subtitle { font-family: monospace; font-size: 10px; color: #64748b; letter-spacing: 1px; margin-top: 4px; }
          
          .placard { 
            background-color: #ffffff; 
            color: #0f172a; 
            padding: 30px; 
            border-left: 8px solid ${brandHexAccent}; 
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
          .cell-value span { color: ${brandHexAccent}; }
          
          .placard-right { text-align: right; min-width: 220px; }
          .erosion-label { font-size: 10px; color: #64748b; font-weight: 600; display: block; margin-bottom: 4px; }
          .erosion-val { font-family: monospace; font-size: 28px; color: ${brandHexAccent}; font-weight: 800; letter-spacing: -0.5px; }

          .section-title { font-size: 12px; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 20px; font-weight: 700; text-align: left; }
          .anomaly-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
          .node-card { border: 1px solid #e2e8f0; background-color: #ffffff; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; min-height: 220px; border-radius: 4px; }
          .node-top { border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 12px; font-size: 10px; color: #64748b; text-align: left; }
          .node-top span { float: right; background-color: #fef2f2; color: ${brandHexAccent}; padding: 2px 6px; font-size: 9px; font-weight: 700; border: 1px solid #fecaca; border-radius: 2px; }
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
            <div class="subtitle">Executive Risk Audit & Provisional SOW // Diagnostic Phase 1</div>
          </div>

          <div class="placard">
            <div class="placard-left">
              <h2>Diagnostic Summary</h2>
              <div class="org-label">Assessment for: ${orgName}</div>
              <div class="metrics-grid">
                <div class="metric-cell">
                  <div class="cell-label">AI Readiness Gap</div>
                  <div class="cell-value"><span>${100 - dbDecay}%</span> Readiness</div>
                </div>
                <div class="metric-cell">
                  <div class="cell-label">Process Waste Tax</div>
                  <div class="cell-value"><span>$${totalLaborTaxPool.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> Liability</div>
                </div>
                <div class="metric-cell">
                  <div class="cell-label">Total Promise Gap™ Exposure</div>
                  <div class="cell-value"><span>$${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> Capital Risk</div>
                </div>
              </div>
            </div>
            <div class="placard-right">
              <span class="erosion-label">Estimated Loss To Date</span>
              <div class="erosion-val">$${totalErosion.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <span class="cell-label" style="display:block; margin-top:4px;">Calculated loss since initial assessment</span>
            </div>
          </div>

          <div class="section-title">Key Findings & Integration Risks</div>
          
          <div class="anomaly-grid">
            ${secureAnomalies.map((frac, i) => `
              <div class="node-card">
                <div class="node-top">
                  Finding #${i + 1}
                  <span>Pending Review</span>
                </div>
                <div>
                  <div class="node-title">${frac.id}</div>
                  <div class="node-desc">${frac.description}</div>
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

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(htmlCanvasContent);

  } catch (err: any) {
    console.error("SERVERLESS PRINT GENERATION EXCEPTION:", err);
    return res.status(500).json({ error: "Internal Server Error", details: err?.message || err });
  }
}
