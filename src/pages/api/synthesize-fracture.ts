import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { auditId } = req.body;

  if (!auditId) {
    return res.status(400).json({ error: 'MISSING_AUDIT_ID' });
  }

  try {
    // 1. Fetch all nodes for this audit
    const { data: nodes, error: nodeError } = await supabase
      .from('operators')
      .select('raw_responses, persona_type, status')
      .eq('audit_id', auditId);

    console.log(`[SYNTHESIS_START] Audit: ${auditId} | Nodes Found: ${nodes?.length || 0}`);

    if (nodeError) throw nodeError;

    if (!nodes || nodes.length === 0) {
      return res.status(400).json({ error: 'TRIANGULATION_VOID', message: 'No operator data found.' });
    }

    // 2. Fetch the parent audit record
    const { data: parentAudit, error: auditError } = await supabase
      .from('audits')
      .select('rework_tax, id, org_name')
      .eq('id', auditId)
      .single();

    if (auditError || !parentAudit) {
      return res.status(404).json({ error: 'PARENT_AUDIT_NOT_FOUND' });
    }

    const parentReworkTax = parseFloat(parentAudit.rework_tax || "0");

    // 3. Flatten responses into a lookup object with strict normalization
    const results: any = {};
    nodes.forEach(node => {
      if (node.raw_responses) {
        let persona = (node.persona_type || "").toUpperCase().trim();
        if (persona.includes("EXEC")) persona = "EXE";
        if (persona.includes("MAN")) persona = "MGR";
        if (persona.includes("TECH")) persona = "TEC";
        
        Object.entries(node.raw_responses).forEach(([qId, data]: any) => {
          const answer = typeof data === 'object' ? data.answer : data;
          results[qId] = answer;

          // Map to shorthand (e.g., MGR_01)
          if (!qId.includes('_')) {
            const mappedId = `${persona}_${qId.padStart(2, '0')}`;
            results[mappedId] = answer;
          }
        });
      }
    });

    const fractures = [];
    let frictionScore = 0;

    // --- LOGIC FRACTURE DETECTION ENGINE ---
    // T1: INDEMNITY
    if (results.EXE_01 === "Yes" && results.TEC_01 === "No") {
      fractures.push({ id: "INDEMNITY_VOID", severity: "CRITICAL", description: "Executive assumes enforceable audit rights; Technical confirms zero forensic logging.", directive: "Issue BMR-T1 Technical Specification to vendors.", recovery: "Full Legal Compliance" });
      frictionScore += 15;
    }

    // T2: REWORK TAX
    if (results.MGR_02 === "Yes" && results.TEC_02 === "No") {
      const recoveryEst = (parentReworkTax * 0.4).toFixed(1);
      fractures.push({ id: "REWORK_LEAK", severity: "HIGH", description: "Manager reports high SME rework; Technical confirms no reinforcement retraining loop.", directive: "Deploy BMR-M1 Feedback Loop Protocol.", recovery: `Est. $${recoveryEst}M Recovery` });
      frictionScore += 15;
    }

    // T3: SHADOW AI
    if (results.EXE_03 === "Yes" && results.TEC_03 === "No") {
      fractures.push({ id: "SHADOW_EXFIL", severity: "CRITICAL", description: "Policy forbids unapproved AI; Technical confirms zero network-level DNS filtering.", directive: "Implement BMR-S1 DNS Filtering standards.", recovery: "IP Asset Protection" });
      frictionScore += 15;
    }

    // T4: IP OWNERSHIP
    if (results.EXE_04 === "Yes" && results.TEC_04 === "No") {
      fractures.push({ id: "IP_ANONYMITY", severity: "HIGH", description: "Legal IP ownership assumed; no technical watermarking exists to prove origin.", directive: "Apply BMR-I1 Metadata Standards to deliverables.", recovery: "Enforceable IP Rights" });
      frictionScore += 10;
    }

    // T5: PII MASKING
    if (results.EXE_05 === "Yes" && results.TEC_05 === "No") {
      fractures.push({ id: "PII_EXPOSURE", severity: "CRITICAL", description: "Compliance standards assumed met; no automated scrubbing layer for API egress.", directive: "Implement automated egress scrubbing (BMR-P1).", recovery: "Data Privacy Safety" });
      frictionScore += 15;
    }

    // T7: HALLUCINATION
    if (results.MGR_07 === "Yes" && results.TEC_07 === "No") {
      fractures.push({ id: "TRUTH_DECAY", severity: "HIGH", description: "Kill-switch protocol exists; Technical confirms no 'Grounding' (RAG) active.", directive: "Initialize BMR-H1 Grounding (RAG) architecture.", recovery: "Liability Mitigation" });
      frictionScore += 10;
    }

    // T10: RESILIENCE
    if (results.EXE_10 === "Yes" && results.TEC_10 === "No") {
      fractures.push({ id: "VENDOR_LOCK", severity: "HIGH", description: "Multi-model strategy on paper; no rollback to open-source models tested.", directive: "Execute BMR-R1 Disaster Recovery failover test.", recovery: "Operational Continuity" });
      frictionScore += 10;
    }

    // 4. Finalize Audit Record in Supabase
    const { error: finalUpdateError } = await supabase
      .from('audits')
      .update({ 
        fractures: fractures, // Ensure this column is jsonb in Supabase
        sfi_score: Math.min(frictionScore, 100),
        status: 'COMPLETE',
        last_synthesized: new Date().toISOString()
      })
      .eq('id', auditId);

    if (finalUpdateError) {
      console.error("[DATABASE_UPDATE_ERROR]:", finalUpdateError.message);
      return res.status(500).json({ error: 'DATABASE_UPDATE_FAILED', details: finalUpdateError.message });
    }

    return res.status(200).json({ 
      status: 'SYNTHESIS_COMPLETE', 
      sfi: frictionScore,
      org: parentAudit.org_name 
    });

  } catch (error: any) {
    console.error("[SYNTHESIS_CRITICAL_FAILURE]:", error);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', details: error.message });
  }
}
