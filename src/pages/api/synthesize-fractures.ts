import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { groupId } = req.body;

  try {
    // 1. Fetch persona responses & the parent audit (to get rework_tax value)
    const { data: audits, error: fetchError } = await supabase
      .from('audits')
      .select('raw_responses, persona_type, group_id, rework_tax')
      .eq('group_id', groupId);

    if (fetchError || !audits || audits.length < 3) {
      return res.status(400).json({ error: 'TRIANGULATION_INCOMPLETE' });
    }

    // Capture the rework tax from the initial lead entry for financial recovery logic
    const parentReworkTax = parseFloat(audits[0].rework_tax || "0");

    // 2. Flatten responses into a single lookup object for cross-referencing
    const results: any = {};
    audits.forEach(audit => {
      if (audit.raw_responses) {
        Object.entries(audit.raw_responses).forEach(([qId, data]: any) => {
          results[qId] = data.answer; 
        });
      }
    });

    const fractures = [];
    let frictionScore = 0;

    // 3. Logic Fracture Detection Engine (10-Triangle Cross-Reference)

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

    // T2: REWORK TAX
    if (results.MGR_02 === "Yes" && results.TEC_02 === "No") {
      const recoveryEst = (parentReworkTax * 0.4).toFixed(1);
      fractures.push({
        id: "REWORK_LEAK",
        severity: "HIGH",
        description: "Manager reports high SME rework time; Technical confirms no reinforcement loop exists to retrain models.",
        directive: "Deploy BMR-M1 Feedback Loop Protocol to capture SME correction data for model tuning.",
        recovery: `Est. $${recoveryEst}M Recovery`
      });
      frictionScore += 15;
    }

    // T3: SHADOW AI
    if (results.EXE_03 === "Yes" && results.TEC_03 === "No") {
      fractures.push({
        id: "SHADOW_EXFIL",
        severity: "CRITICAL",
        description: "Policy forbids unapproved AI, but Technical confirms zero network-level DNS filtering or blocking.",
        directive: "Implement BMR-S1 DNS Filtering standards on corporate firewall policies.",
        recovery: "IP Asset Protection"
      });
      frictionScore += 15;
    }

    // T4: IP OWNERSHIP
    if (results.EXE_04 === "Yes" && results.TEC_04 === "No") {
      fractures.push({
        id: "IP_ANONYMITY",
        severity: "HIGH",
        description: "Legal IP ownership assumed, but no technical watermarking or metadata exists to prove asset origin.",
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

    // T6: MODEL DRIFT
    if (results.EXE_06 === "Yes" && results.TEC_06 === "No") {
      fractures.push({
        id: "DRIFT_BLINDSPOT",
        severity: "MEDIUM",
        description: "Budget exists for re-validation, but no automated benchmarking suite is currently operational.",
        directive: "Deploy BMR-D1 Automated Benchmarking suite for quarterly performance audits.",
        recovery: "Output Quality Assurance"
      });
      frictionScore += 10;
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

    // T8: COST TRANSPARENCY
    if (results.EXE_08 === "Yes" && results.TEC_08 === "No") {
      fractures.push({
        id: "OPAQUE_BURN",
        severity: "MEDIUM",
        description: "Executive expects ROI tracking, but Technical lacks department-level API tagging for granular cost analysis.",
        directive: "Implement BMR-C1 API Cost-Tagging across all department heads.",
        recovery: "Budget Transparency"
      });
      frictionScore += 5;
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
      frictionScore += 5;
    }

    // 4. Update the Master Group Record
    await supabase.from('diagnostic_groups').update({ 
      sfi_score: Math.min(frictionScore, 100), 
      is_complete: true 
    }).eq('id', groupId);

    // 5. Update the Parent Audit for the Dashboard
    const { data: groupInfo } = await supabase
      .from('diagnostic_groups')
      .select('parent_audit_id')
      .eq('id', groupId).single();

    if (groupInfo?.parent_audit_id) {
      await supabase.from('audits').update({ 
        fractures: fractures,
        sfi_score: Math.min(frictionScore, 100),
        status: 'COMPLETE' 
      }).eq('id', groupInfo.parent_audit_id);
    }

    return res.status(200).json({ status: 'SYNTHESIS_COMPLETE', sfi: frictionScore });

  } catch (error) {
    console.error("SYNTHESIS_FAILURE:", error);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }
}
