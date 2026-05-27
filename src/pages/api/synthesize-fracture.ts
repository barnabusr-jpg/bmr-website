import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { auditId } = req.body;

  if (!auditId) {
    return res.status(400).json({ error: 'MISSING_AUDIT_ID' });
  }

  try {
    // 1. Fetch all completed tracking responses for this audit UUID
    const { data: nodes, error: nodeError } = await supabase
      .from('operators')
      .select('raw_responses, persona_type, status')
      .eq('audit_id', auditId);

    console.log(`[SYNTHESIS] Processing Audit: ${auditId} | Target Records Ingested: ${nodes?.length || 0}`);

    if (nodeError) throw nodeError;

    if (!nodes || nodes.length === 0) {
      return res.status(400).json({ error: 'TRIANGULATION_VOID', message: 'No corresponding operational records found.' });
    }

    // 2. Fetch the parent metric metadata row
    const { data: parentAudit, error: auditError } = await supabase
      .from('audits')
      .select('rework_tax, id, org_name')
      .eq('id', auditId)
      .single();

    if (auditError || !parentAudit) {
      return res.status(404).json({ error: 'PARENT_AUDIT_NOT_FOUND' });
    }

    const parentReworkTax = parseFloat(parentAudit.rework_tax || "0");

    // 3. Normalize strings and populate a clean evaluation dictionary object
    const results: Record<string, string> = {};
    
    nodes.forEach(node => {
      if (node.raw_responses) {
        let persona = (node.persona_type || "").toUpperCase().trim();
        if (persona.includes("EXEC")) persona = "EXE";
        if (persona.includes("MAN")) persona = "MGR";
        if (persona.includes("TECH")) persona = "TEC";
        
        Object.entries(node.raw_responses).forEach(([qId, data]: any) => {
          let rawAnswer = typeof data === 'object' ? data.answer : data;
          
          // Format booleans to standard text strings smoothly
          if (rawAnswer === true || rawAnswer === "true") rawAnswer = "Yes";
          if (rawAnswer === false || rawAnswer === "false") rawAnswer = "No";
          
          const normalizedStr = String(rawAnswer || "").trim().toLowerCase();
          const cleanAnswer = normalizedStr === "yes" ? "Yes" : normalizedStr === "no" ? "No" : rawAnswer;

          // Convert all incoming question keys to clean uppercase references
          const upperQId = qId.toUpperCase().trim();
          results[upperQId] = cleanAnswer;

          // Universal Normalizer Mapping Logic Block
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

    console.log("[SYNTHESIS_MAP] Normalized Evaluation Matrix Parameters:", JSON.stringify(results));

    const fractures = [];
    let frictionScore = 0;

    // --- HIGH-FIDELITY CONTRADICTION EVALUATION CORES ---

    // T1: INDEMNITY
    if (results.EXE_01 === "Yes" && results.TEC_01 === "No") {
      fractures.push({ 
        id: "INDEMNITY_VOID", 
        severity: "CRITICAL", 
        description: "Executive leadership assumes enforceable regulatory audit rights are active; Technical operations confirms zero forensic data pipeline logging is deployed.", 
        directive: "Implement Protocol DIR_01 // IMMEDIATE HARDENING", 
        recovery: "Full Legal Compliance Validation" 
      });
      frictionScore += 15;
    }

    // T2: REWORK TAX
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

    // T5: PII MASKING
    if (results.EXE_05 === "Yes" && results.TEC_05 === "No") {
      fractures.push({ 
        id: "PII_EXPOSURE", 
        severity: "CRITICAL", 
        description: "Executive compliance registers certify absolute consumer data privacy preservation; Technical validation exposes zero automated token masking filtering on egress data models.", 
        directive: "Implement Protocol DIR_01 // IMMEDIATE HARDENING", 
        recovery: "Data Privacy Safety Scrubbing Layer" 
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

    // Baseline Fallback: Ensure any populated survey sets return a valid baseline metric score
    if (frictionScore === 0) {
      frictionScore = 20;
    }

    console.log(`[SYNTHESIS_COMPLETE] SFI Total: ${frictionScore} | Active Gaps Discovered: ${fractures.length}`);

    // 4. Update core ledger metrics inside Supabase
    const { error: finalUpdateError } = await supabase
      .from('audits')
      .update({ 
        fractures: fractures,
        sfi_score: Math.min(frictionScore, 100),
        status: 'COMPLETE',
        last_synthesized: new Date().toISOString()
      })
      .eq('id', auditId);

    if (finalUpdateError) {
      console.error("[DATABASE_WRITE_ERROR]:", finalUpdateError.message);
      return res.status(500).json({ error: 'DATABASE_UPDATE_FAILED', details: finalUpdateError.message });
    }

    return res.status(200).json({ 
      status: 'SYNTHESIS_COMPLETE', 
      sfi: frictionScore,
      gaps: fractures.length,
      org: parentAudit.org_name 
    });

  } catch (error: any) {
    console.error("[CRITICAL_API_EXCEPTION]:", error);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', details: error.message });
  }
}
