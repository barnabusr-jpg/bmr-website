import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { auditId } = req.body;

  if (!auditId) {
    return res.status(400).json({ error: 'MISSING_AUDIT_ID' });
  }

  try {
    // 1. Fetch completed tracking responses
    const { data: nodes, error: nodeError } = await supabase
      .from('operators')
      .select('raw_responses, persona_type, status')
      .eq('audit_id', auditId);

    console.log(`[SYNTHESIS] Processing Engine Run: ${auditId} | Ingesting Node Arrays: ${nodes?.length || 0}`);

    if (nodeError) throw nodeError;

    if (!nodes || nodes.length === 0) {
      return res.status(400).json({ error: 'TRIANGULATION_VOID', message: 'No corresponding operational records found.' });
    }

    // 2. Fetch the parent metric metadata row
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

    // 3. Normalize strings and populate lookup dictionary
    const results: Record<string, string> = {};
    nodes.forEach(node => {
      if (node.raw_responses) {
        let persona = (node.persona_type || "").toUpperCase().trim();
        if (persona.includes("EXEC")) persona = "EXE";
        if (persona.includes("MAN")) persona = "MGR";
        if (persona.includes("TECH")) persona = "TEC";
        
        Object.entries(node.raw_responses).forEach(([qId, data]: any) => {
          let rawAnswer = typeof data === 'object' ? data.answer : data;
          
          if (rawAnswer === true || rawAnswer === "true") rawAnswer = "Yes";
          if (rawAnswer === false || rawAnswer === "false") rawAnswer = "No";
          
          const normalizedStr = String(rawAnswer || "").trim().toLowerCase();
          const cleanAnswer = normalizedStr === "yes" ? "Yes" : normalizedStr === "no" ? "No" : rawAnswer;

          const upperQId = qId.toUpperCase().trim();
          results[upperQId] = cleanAnswer;

          if (!upperQId.includes('_')) {
            const reconstructedKey = `${persona}_${upperQId.padStart(2, '0')}`;
            results[reconstructedKey] = cleanAnswer;
          } else {
            const parts = upperQId.split('_');
            const numSuffix = parts[parts.length - 1].padStart(2, '0');
            results[`${persona}_${numSuffix}`] = cleanAnswer;
          }
        });
      }
    });

    const fractures = [];
    let frictionScore = 0;
    let containsCriticalAlert = false;

    // --- CONTRADICTION EVALUATION CORE MATRIX (OBJECTIVE C INFUSED) ---

    // T1: INDEMNITY VOID
    if (results.EXE_01 === "Yes" && results.TEC_01 === "No") {
      containsCriticalAlert = true;
      fractures.push({ 
        id: "INDEMNITY_VOID", 
        severity: "CRITICAL", 
        description: "Executive leadership assumes enforceable regulatory audit rights are active; Technical operations confirms zero forensic data pipeline logging is deployed.", 
        directive: "Implement Protocol DIR_01 // IMMEDIATE HARDENING", 
        recovery: "Full Legal Compliance Validation" 
      });
      frictionScore += 15;
    }

    // T2: REWORK LEAK
    if (results.MGR_02 === "Yes" && results.TEC_02 === "No") {
      const recoveryEst = (parentReworkTax * 0.4).toFixed(1);
      fractures.push({ 
        id: "REWORK_LEAK", 
        severity: "HIGH", 
        description: "Operational management reports high engineering rework ratios tracking edge-case validations; Technical confirms zero automated feedback training tracks exist.", 
        directive: "Implement Protocol DIR_02 // STRUCTURAL ALIGNMENT", 
        recovery: `Est. $${recoveryEst}M Recovery Clearance` 
      });
      frictionScore += 15;
    }

    // T3: SHADOW AI
    if (results.EXE_03 === "Yes" && results.TEC_03 === "No") {
      containsCriticalAlert = true;
      fractures.push({ 
        id: "SHADOW_EXFIL", 
        severity: "CRITICAL", 
        description: "Corporate compliance guidelines state unapproved model execution is strictly forbidden; Technical parameters verify zero proactive network-level DNS filtering protections.", 
        directive: "Implement Protocol DIR_01 // IMMEDIATE HARDENING", 
        recovery: "IP Asset Protection Matrix Protocols" 
      });
      frictionScore += 15;
    }

    // T4: IP OWNERSHIP
    if (results.EXE_04 === "Yes" && results.TEC_04 === "No") {
      fractures.push({ 
        id: "IP_ANONYMITY", 
        severity: "HIGH", 
        description: "Corporate counsel assumes exclusive ownership of generated intellectual data; Technical routes confirm zero cryptographic watermarking protocols are injected into outbound assets.", 
        directive: "Implement Protocol DIR_03 // GOVERNANCE OVERLAY", 
        recovery: "Enforceable Intellectual Property Safeguards" 
      });
      frictionScore += 10;
    }

    // T5: PII MASKING EXPOSURE
    if (results.EXE_05 === "Yes" && results.TEC_05 === "No") {
      containsCriticalAlert = true;
      fractures.push({ 
        id: "PII_EXPOSURE", 
        severity: "CRITICAL", 
        description: "Executive compliance registers certify absolute consumer data privacy preservation; Technical validation exposes zero automated token masking filtering on egress data models.", 
        directive: "Implement Protocol DIR_01 // IMMEDIATE HARDENING", 
        recovery: "Data Privacy Safety Scrubbing Layer" 
      });
      frictionScore += 15;
    }

    // 🧠 T6: ADVANCED GOVERNANCE DISCONNECT (NEW CONTRA-DETECTION ENGINE)
    if (results.EXE_06 === "Yes" && results.TEC_06 === "No") {
      fractures.push({
        id: "GOVERNANCE_GAP",
        severity: "HIGH",
        description: "Corporate steering committees assume active monitoring controls validate automated model behaviors; Systems integration tracking tracks confirm zero programmatic evaluation frameworks exist.",
        directive: "Implement Protocol DIR_03 // GOVERNANCE OVERLAY",
        recovery: "Programmatic Policy Alignment (Reference Case Study: BMR-2026-V2)"
      });
      frictionScore += 15;
    }

    // T7: HALLUCINATION CONTROL
    if (results.MGR_07 === "Yes" && results.TEC_07 === "No") {
      fractures.push({ 
        id: "TRUTH_DECAY", 
        severity: "HIGH", 
        description: "Managerial lines assume fallback safeguards prevent drift outputs; Technical data notes verify zero contextual grounding (RAG) vector engines are active.", 
        directive: "Implement Protocol DIR_02 // STRUCTURAL ALIGNMENT", 
        recovery: "Systemic Liability Mitigation Shields" 
      });
      frictionScore += 10;
    }

    // 🧠 T8: MODEL DRIFT & VENDOR DEPENDENCY LOCK
    if (results.EXE_08 === "Yes" && results.TEC_08 === "No") {
      fractures.push({
        id: "VENDOR_CONCENTRATION",
        severity: "HIGH",
        description: "Strategic roadmaps indicate model-agnostic risk diversification; Engineering topology documents reveal complete reliance on a single runtime API provider with zero tested failovers or automated drift tracking telemetry.",
        directive: "Implement Protocol DIR_04 // FORENSIC CONTINUITY",
        recovery: "Multi-Model Broker Abstracted Routing Layer"
      });
      frictionScore += 15;
    }

    // T10: VENDOR RESILIENCE
    if (results.EXE_10 === "Yes" && results.TEC_10 === "No") {
      fractures.push({ 
        id: "VENDOR_LOCK", 
        severity: "HIGH", 
        description: "Strategic planning assumes agile cross-model resilience; Technical architecture displays single-point dependencies with zero multi-provider failover fallback logic maps.", 
        directive: "Implement Protocol DIR_04 // FORENSIC CONTINUITY", 
        recovery: "Operational Continuity Routing Fallbacks" 
      });
      frictionScore += 10;
    }

    if (frictionScore === 0) {
      frictionScore = 20;
    }

    const finalizedSFI = Math.min(frictionScore, 100);
    const triggerAutomatedUpsell = finalizedSFI >= 45 || containsCriticalAlert;

    // 4. Update core records in database
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

    // 📬 5. REAL-TIME OUTBOUND ALERTS DISPATCH HOOK
    if (triggerAutomatedUpsell) {
      const criticalIds = fractures.filter(f => f.severity === 'CRITICAL').map(f => f.id);
      const internalAlertPayload = {
        event: "CRITICAL_RISK_SURFACE_DETECTED",
        client: parentAudit.org_name,
        sfi_score: finalizedSFI,
        capital_at_risk: `$${totalLeakage.toLocaleString(undefined, {maximumFractionDigits:0})}/YR`,
        critical_vulnerabilities: criticalIds,
        secure_portal_link: `https://bmr-dashboard.com/results/${auditId}?admin=true`
      };

      if (process.env.INTERNAL_ALERTS_WEBHOOK_URL) {
        try {
          await fetch(process.env.INTERNAL_ALERTS_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: `🚨 *CRITICAL FRACTURE DETECTED* for *${parentAudit.org_name}*\n• *SFI Score:* ${finalizedSFI}/100\n• *Financial Loss Leakage:* ${internalAlertPayload.capital_at_risk}\n• <${internalAlertPayload.secure_portal_link}|Open Command Terminal>`
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
