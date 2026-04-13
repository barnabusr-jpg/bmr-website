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

    const parentReworkTax = parseFloat(audits[0].rework_tax || "0");

    // 2. Flatten responses
    const results: any = {};
    audits.forEach(audit => {
      Object.entries(audit.raw_responses).forEach(([qId, data]: any) => {
        results[qId] = data.answer; 
      });
    });

    const fractures = [];
    let frictionScore = 0;

    // 3. Logic Fracture Detection & Directive Generation
    
    // T1: INDEMNITY
    if (results.EXE_01 === "Yes" && results.TEC_01 === "No") {
      fractures.push({
        id: "INDEMNITY_VOID",
        severity: "CRITICAL",
        description: "Exec assumes audit rights are enforceable; Tech confirms zero forensic logging.",
        directive: "Issue BMR-T1 Technical Specification to vendors for forensic logging requirements.",
        recovery: "Full Legal Compliance"
      });
      frictionScore += 25;
    }

    // T2: REWORK TAX
    if (results.MGR_02 === "Yes" && results.TEC_02 === "No") {
      const recoveryEst = (parentReworkTax * 0.4).toFixed(1);
      fractures.push({
        id: "REWORK_LEAK",
        severity: "HIGH",
        description: "Uncapped rework tax identified; no technical reinforcement loop exists.",
        directive: "Deploy BMR-M1 SME Feedback Protocol to capture correction data for model tuning.",
        recovery: `Est. $${recoveryEst}M Recovery`
      });
      frictionScore += 20;
    }

    // T3: SHADOW AI
    if (results.EXE_03 === "Yes" && results.TEC_03 === "No") {
      fractures.push({
        id: "SHADOW_EXFIL",
        severity: "CRITICAL",
        description: "Policy forbids Shadow AI, but no network-level DNS filtering exists.",
        directive: "Implement BMR-S1 DNS Filtering standards on corporate firewall policies.",
        recovery: "IP Asset Protection"
      });
      frictionScore += 20;
    }

    // T5: PII MASKING
    if (results.EXE_05 === "Yes" && results.TEC_05 === "No") {
      fractures.push({
        id: "PII_EXPOSURE",
        severity: "CRITICAL",
        description: "Compliance standards assumed met, but no automated scrubbing layer exists.",
        directive: "Implement automated egress scrubbing based on BMR-P1 compliance specs.",
        recovery: "Data Privacy Safety"
      });
      frictionScore += 20;
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
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }
}
