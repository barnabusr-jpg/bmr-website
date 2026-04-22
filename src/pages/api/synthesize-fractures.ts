import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  // groupId now receives the Organization Name (e.g., "KIMMALA" or "FINAL FLIGHT")
  const { groupId } = req.body;

  try {
    // 1. Fetch all 3 nodes from 'operators' using the group_id text anchor
    const { data: nodes, error: nodeError } = await supabase
      .from('operators')
      .select('raw_responses, persona_type')
      .eq('group_id', groupId);

    if (nodeError || !nodes || nodes.length < 3) {
      console.error("TRIANGULATION_DATA_MISSING:", { groupId, count: nodes?.length });
      return res.status(400).json({ error: 'TRIANGULATION_INCOMPLETE' });
    }

    // 2. Fetch the master audit to retrieve the baseline Rework Tax
    const { data: parentAudit, error: auditError } = await supabase
      .from('audits')
      .select('rework_tax, id')
      .eq('org_name', groupId)
      .single();

    if (auditError || !parentAudit) throw new Error("PARENT_AUDIT_NOT_FOUND");

    const parentReworkTax = parseFloat(parentAudit.rework_tax || "0");

    // 3. Flatten responses into a lookup object for the detection engine
    const results: any = {};
    nodes.forEach(node => {
      if (node.raw_responses) {
        Object.entries(node.raw_responses).forEach(([qId, data]: any) => {
          // Normalize: handle both {answer: "Yes"} and direct "Yes" formats
          results[qId] = typeof data === 'object' ? data.answer : data;
        });
      }
    });

    const fractures = [];
    let frictionScore = 0;

    // --- LOGIC FRACTURE DETECTION ENGINE ---

    // T1: INDEMNITY
    if (results.EXE_01 === "Yes" && results.TEC_01 === "No") {
      fractures.push({
        id: "INDEMNITY_VOID",
        severity: "CRITICAL",
        description: "Executive assumes enforceable audit rights; Technical confirms zero forensic logging. Legal protection is non-existent.",
        directive: "Issue BMR-T1 Technical Specification to vendors for forensic logging requirements.",
        recovery: "Full Legal Compliance"
      });
      frictionScore += 15;
    }

    // T2: REWORK TAX (Financial Recovery Calculation)
    if (results.MGR_02 === "Yes" && results.TEC_02 === "No") {
      const recoveryEst = (parentReworkTax * 0.4).toFixed(1);
      fractures.push({
        id: "REWORK_LEAK",
        severity: "HIGH",
        description: "Manager reports high SME rework time; Technical confirms no reinforcement loop exists to retrain models.",
        directive: "Deploy BMR-M1 Feedback Loop Protocol to capture SME correction data.",
        recovery: `Est. $${recoveryEst}M Recovery`
      });
      frictionScore += 15;
    }

    // T3: SHADOW AI
    if (results.EXE_03 === "Yes" && results.TEC_03 === "No") {
      fractures.push({
        id: "SHADOW_EXFIL",
        severity: "CRITICAL",
        description: "Policy forbids unapproved AI, but Technical confirms zero network-level DNS filtering.",
        directive: "Implement BMR-S1 DNS Filtering standards on corporate firewalls.",
        recovery: "IP Asset Protection"
      });
      frictionScore += 15;
    }

    // T4: IP OWNERSHIP
    if (results.EXE_04 === "Yes" && results.TEC_04 === "No") {
      fractures.push({
        id: "IP_ANONYMITY",
        severity: "HIGH",
        description: "Legal IP ownership assumed, but no technical watermarking exists to prove asset origin.",
        directive: "Apply BMR-I1 Metadata Standards to all AI-generated deliverables.",
        recovery: "Enforceable IP Rights"
      });
      frictionScore += 10;
    }

    // T5: PII MASKING
    if (results.EXE_05 === "Yes" && results.TEC_05 === "No") {
      fractures.push({
        id: "PII_EXPOSURE",
        severity: "CRITICAL",
        description: "Compliance standards assumed met, but no automated scrubbing layer exists for API egress.",
        directive: "Implement automated egress scrubbing based on BMR-P1 compliance specs.",
        recovery: "Data Privacy Safety"
      });
      frictionScore += 15;
    }

    // T7: HALLUCINATION
    if (results.MGR_07 === "Yes" && results.TEC_07 === "No") {
      fractures.push({
        id: "TRUTH_DECAY",
        severity: "HIGH",
        description: "Kill-switch protocol exists, but Technical confirmed no 'Grounding' (RAG) dataset constraints are active.",
        directive: "Initialize BMR-H1 Grounding (RAG) architecture to constrain model hallucination.",
        recovery: "Liability Mitigation"
      });
      frictionScore += 10;
    }

    // T10: RESILIENCE
    if (results.EXE_10 === "Yes" && results.TEC_10 === "No") {
      fractures.push({
        id: "VENDOR_LOCK",
        severity: "HIGH",
        description: "Multi-model strategy exists on paper, but no emergency rollback to open-source models has been tested.",
        directive: "Execute BMR-R1 Disaster Recovery test using local/open-source model failover.",
        recovery: "Operational Continuity"
      });
      frictionScore += 10;
    }

    // 4. UPDATE MASTER AUDIT (This publishes the Capstone)
    const { error: finalUpdateError } = await supabase
      .from('audits')
      .update({ 
        fractures: fractures,
        sfi_score: Math.min(frictionScore, 100),
        status: 'COMPLETE',
        last_synthesized: new Date().toISOString()
      })
      .eq('org_name', groupId);

    if (finalUpdateError) throw finalUpdateError;

    return res.status(200).json({ 
      status: 'SYNTHESIS_COMPLETE', 
      sfi: frictionScore,
      org: groupId 
    });

  } catch (error: any) {
    console.error("SYNTHESIS_CRITICAL_FAILURE:", error);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', details: error.message });
  }
}
