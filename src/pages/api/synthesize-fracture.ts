import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { auditId } = req.body;

  if (!auditId) {
    return res.status(400).json({ error: 'MISSING_AUDIT_ID' });
  }

  try {
    // 1. Fetch completed tracking responses for this audit
    const { data: nodes, error: nodeError } = await supabase
      .from('operators')
      .select('raw_responses, persona_type, status')
      .eq('audit_id', auditId);

    console.log(`[SYNTHESIS] Processing Engine Run: ${auditId} | Ingesting Node Arrays: ${nodes?.length || 0}`);

    if (nodeError) throw nodeError;

    if (!nodes || nodes.length === 0) {
      return res.status(400).json({ error: 'TRIANGULATION_VOID', message: 'No operational records found matching this tracking ID.' });
    }

    // 2. Fetch parent financial metrics metadata
    const { data: parentAudit, error: auditError } = await supabase
      .from('audits')
      .select('rework_tax, id, org_name, lead_email, sector, ai_spend, decay_pct')
      .eq('id', auditId)
      .single();

    if (auditError || !parentAudit) {
      return res.status(404).json({ error: 'PARENT_AUDIT_NOT_FOUND' });
    }

    const parentReworkTax = parseFloat(parentAudit.rework_tax || "0");
    const dbDecay = parentAudit.decay_pct || 24;
    const spend = parseFloat(parentAudit.ai_spend) || 1.2;
    const fte = Math.round((spend * 1000000) / 200000) || 5;
    const sectorNorm = (parentAudit.sector || "").toLowerCase().trim();
    const laborMultiplier = sectorNorm === 'finance' ? 0.5 : sectorNorm === 'healthcare' ? 0.45 : 0.4;
    
    const laborTax = (dbDecay / 100) * laborMultiplier * (fte * 160000 * 1.3);
    const exposure = ((dbDecay > 60 ? 0.30 : 0.18) * (spend * 1000000)) * 1.15;
    const totalLeakage = laborTax + exposure;

    // 3. Normalize array properties and map target answers smoothly
    const answers: Record<string, { label: string; weight: number; insight: string; tag: string }> = {};
    let totalScoreWeight = 0;
    let questionsAnsweredCount = 0;

    nodes.forEach(node => {
      if (node.raw_responses) {
        Object.entries(node.raw_responses).forEach(([qId, data]: any) => {
          const upperKey = qId.toUpperCase().trim();
          
          if (data && typeof data === 'object') {
            answers[upperKey] = {
              label: String(data.label || ""),
              weight: parseInt(data.weight ?? "0"),
              insight: String(data.forensicInsight || ""),
              tag: String(data.internalTag || "")
            };
            totalScoreWeight += answers[upperKey].weight;
            questionsAnsweredCount++;
          }
        });
      }
    });

    console.log("[SYNTHESIS_MAP] Active Multi-Choice Answers Ingested:", JSON.stringify(answers));

    const fractures = [];
    let frictionScore = 0;
    let containsCriticalAlert = false;

    // --- TRUE 30-QUESTION CONTRADICTION EVALUATION ENGINE ---

    // RT_01: LOGIC FRAGMENTATION
    if (answers.RT_01 && answers.RT_01.weight >= 6) {
      fractures.push({
        id: "LOGIC_FRAGMENTATION",
        severity: "HIGH",
        description: `Operational workflows run on undocumented tribal processes. Vulnerability vector: ${answers.RT_01.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_02 // STRUCTURAL ALIGNMENT",
        recovery: "SOP Process Standardizations"
      });
      frictionScore += 15;
    }

    // RT_02: GOVERNANCE VOID 
    if (answers.RT_02 && answers.RT_02.weight >= 6) {
      containsCriticalAlert = true;
      fractures.push({
        id: "GOVERNANCE_VOID",
        severity: "CRITICAL",
        description: `Entity possesses zero codified rule-sets tracking model risks. Fine parameters: ${answers.RT_02.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_01 // IMMEDIATE HARDENING",
        recovery: "Corporate Compliance Protection Frameworks"
      });
      frictionScore += 20;
    }

    // RT_03: ROLE DRIFT LABOR DEBT
    if (answers.RT_03 && answers.RT_03.weight >= 6) {
      fractures.push({
        id: "ROLE_DEBT",
        severity: "HIGH",
        description: `Undefined cross-team responsibilities leak productive capacity. Impact: ${answers.RT_03.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_02 // STRUCTURAL ALIGNMENT",
        recovery: "Cross-Functional Responsibility Matrix Routing"
      });
      frictionScore += 10;
    }

    // DG_01: PERFORMANCE DRIFT LEAK
    if (answers.DG_01 && answers.DG_01.weight >= 6) {
      fractures.push({
        id: "PERFORMANCE_DRIFT",
        severity: "HIGH",
        description: `Unmonitored runtime assets show no clear business ROI linkages. Leak tracking: ${answers.DG_01.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_04 // FORENSIC CONTINUITY",
        recovery: "Automated Metric Telemetry Instrumentation"
      });
      frictionScore += 10;
    }

    // DG_02: STRATEGIC DEBT MISALIGNMENT
    if (answers.DG_02 && answers.DG_02.weight >= 6) {
      fractures.push({
        id: "STRATEGIC_DEBT",
        severity: "HIGH",
        description: `AI scaling tracks run loosely decoupled from core vision targets. Waste ratio: ${answers.DG_02.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_02 // STRUCTURAL ALIGNMENT",
        recovery: "Operational Intent Alignment Overlays"
      });
      frictionScore += 15;
    }

    // DG_03: BUDGET VOID FRICTION
    if (answers.DG_03 && answers.DG_03.weight >= 6) {
      fractures.push({
        id: "BUDGET_VOID",
        severity: "HIGH",
        description: `Piecemeal project-based funding introduces scaling friction. Penalty marker: ${answers.DG_03.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_03 // GOVERNANCE OVERLAY",
        recovery: "Capital Pool Allocation Optimization"
      });
      frictionScore += 10;
    }

    // SA_01: SHADOW VENDOR INSULATION
    if (answers.SA_01 && answers.SA_01.weight >= 6) {
      containsCriticalAlert = true;
      fractures.push({
        id: "SHADOW_VENDORS",
        severity: "CRITICAL",
        description: `AI provider software integrations leak system access with zero vetting. Threat track: ${answers.SA_01.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_01 // IMMEDIATE HARDENING",
        recovery: "Continuous Third-Party Perimeter Auditing"
      });
      frictionScore += 20;
    }

    // SA_02: UNSANCTIONED IP LEAKAGE
    if (answers.SA_02 && answers.SA_02.weight >= 6) {
      fractures.push({
        id: "IP_LEAKAGE",
        severity: "HIGH",
        description: `Latent data routing trends expose proprietary assets to fine-tuning pipelines. Leak: ${answers.SA_02.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_03 // GOVERNANCE OVERLAY",
        recovery: "Zero-Trust Architecture Asset Shields"
      });
      frictionScore += 15;
    }

    // ED_01: TECHNICAL STACK DECAY
    if (answers.ED_01 && answers.ED_01.weight >= 6) {
      fractures.push({
        id: "TECH_DECAY",
        severity: "HIGH",
        description: `Siloed databasing architectures delay system execution cycles. Penalty: ${answers.ED_01.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_04 // FORENSIC CONTINUITY",
        recovery: "Real-Time Pipeline Infrastructure Upgrades"
      });
      frictionScore += 10;
    }

    // ED_02: COMMODITY DATA MOAT EXPLOSION
    if (answers.ED_02 && answers.ED_02.weight >= 6) {
      fractures.push({
        id: "DATA_VOID",
        severity: "HIGH",
        description: `Reliance on generic public training pipelines erodes unique competitive market defensibility. Risk: ${answers.ED_02.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_02 // STRUCTURAL ALIGNMENT",
        recovery: "Proprietary Data Moat Training Protocols"
      });
      frictionScore += 10;
    }

    // ED_03: VERSION CONTROL DEBT
    if (answers.ED_03 && answers.ED_03.weight >= 6) {
      fractures.push({
        id: "VERSION_DEBT",
        severity: "HIGH",
        description: `Manual or inconsistent runtime code versioning diminishes development team velocity. Indicator: ${answers.ED_03.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_03 // GOVERNANCE OVERLAY",
        recovery: "Automated MLOps Delivery Pipelines"
      });
      frictionScore += 5;
    }

    // ED_04: GPU HEAVY COST HEMORRHAGE
    if (answers.ED_04 && answers.ED_04.weight >= 6) {
      fractures.push({
        id: "COST_HEMORRHAGE",
        severity: "HIGH",
        description: `Variable computing scaling waste reduces gross margins. Hemorrhage tracker: ${answers.ED_04.insight.replace(/_/g, " ")}`,
        directive: "Implement Protocol DIR_04 // FORENSIC CONTINUITY",
        recovery: "Resource Compute Allocation Optimization"
      });
      frictionScore += 10;
    }

    // Compute scoring averages if answers exist
    if (frictionScore === 0 && questionsAnsweredCount > 0) {
      frictionScore = Math.round((totalScoreWeight / (questionsAnsweredCount * 10)) * 100);
    }

    const finalizedSFI = Math.min(frictionScore, 100);
    const triggerAutomatedUpsell = finalizedSFI >= 40 || containsCriticalAlert;

    // 4. Update core ledger metrics
    const updatePayload: Record<string, any> = {
      fractures: fractures,
      sfi_score: finalizedSFI,
      status: 'COMPLETE'
    };

    if (triggerAutomatedUpsell) {
      updatePayload.is_released = true;
      updatePayload.sow_sent = true;
    }

    const { error: finalUpdateError } = await supabase
      .from('audits')
      .update(updatePayload)
      .eq('id', auditId);

    if (finalUpdateError) {
      console.error("[DATABASE_WRITE_ERROR]:", finalUpdateError.message);
      return res.status(500).json({ error: 'DATABASE_UPDATE_FAILED', details: finalUpdateError.message });
    }

    // 📬 5. REAL-TIME ALERTS EXPORT OUTBOUND HOOK
    if (triggerAutomatedUpsell) {
      const internalAlertPayload = {
        event: "CRITICAL_RISK_SURFACE_DETECTED",
        client: parentAudit.org_name,
        sfi_score: finalizedSFI,
        capital_at_risk: `$${totalLeakage.toLocaleString(undefined, {maximumFractionDigits:0})}/YR`,
        secure_portal_link: `https://bmr-dashboard.com/results/${auditId}?admin=true`
      };

      if (process.env.INTERNAL_ALERTS_WEBHOOK_URL) {
        try {
          await fetch(process.env.INTERNAL_ALERTS_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: `🚨 *CRITICAL RECONNAISSANCE ALERT* for *${parentAudit.org_name}*\n• *SFI Rating:* ${finalizedSFI}/100\n• *Budget Leakage:* ${internalAlertPayload.capital_at_risk}\n• <${internalAlertPayload.secure_portal_link}|Open Command Terminal>`
            })
          });
        } catch (webhookErr) {
          console.error("[WEBHOOK_OUTBOUND_FAILED]", webhookErr);
        }
      }
    }

    return res.status(200).json({ 
      status: 'SYNTHESIS_COMPLETE', 
      sfi: finalizedSFI,
      gaps: fractures.length,
      automated_upsell_triggered: triggerAutomatedUpsell,
      org: parentAudit.org_name 
    });

  } catch (error: any) {
    console.error("[CRITICAL_API_EXCEPTION]:", error);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', details: error.message });
  }
}
