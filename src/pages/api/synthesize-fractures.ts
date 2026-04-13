// src/pages/api/synthesize-fractures.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { groupId } = req.body;

  try {
    // 1. Fetch all 3 persona responses for this group
    const { data: audits, error: fetchError } = await supabase
      .from('audits')
      .select('raw_responses, persona_type, operator_id')
      .eq('group_id', groupId);

    if (fetchError || !audits || audits.length < 3) {
      return res.status(400).json({ error: 'TRIANGULATION_INCOMPLETE' });
    }

    // 2. Flatten responses into a single lookup object
    // Format: { EXE_01: "Yes", TEC_01: "No", ... }
    const results: any = {};
    audits.forEach(audit => {
      Object.entries(audit.raw_responses).forEach(([qId, data]: any) => {
        results[qId] = data.answer; 
      });
    });

    const fractures = [];
    let frictionScore = 0;

    // 3. Logic Fracture Detection Rules
    // TRIANGLE 1: INDEMNITY
    if (results.EXE_01 === "Yes" && results.TEC_01 === "No") {
      fractures.push({
        id: "INDEMNITY_FRACTURE",
        severity: "CRITICAL",
        description: "Executive assumes enforceable audit rights; Technical confirms zero forensic logging. Indemnity is legally void.",
        remedy: "Implement API-level forensic logging immediately."
      });
      frictionScore += 20;
    }

    // TRIANGLE 2: REWORK TAX
    if (results.MGR_02 === "Yes" && results.TEC_02 === "No") {
      fractures.push({
        id: "REWORK_TAX_LEAK",
        severity: "HIGH",
        description: "Manager reports high SME rework time, but Technical confirms no feedback loop exists to retrain models.",
        remedy: "Establish a Reinforcement Learning (RLHF) pipeline."
      });
      frictionScore += 15;
    }

    // TRIANGLE 3: SHADOW AI
    if (results.EXE_03 === "Yes" && results.TEC_03 === "No") {
      fractures.push({
        id: "SHADOW_EXFILTRATION",
        severity: "CRITICAL",
        description: "Corporate policy forbids unapproved AI, but Technical reports no network-level DNS filtering or blocking.",
        remedy: "Deploy DNS-level filtering for unauthorized AI domains."
      });
      frictionScore += 20;
    }

    // TRIANGLE 5: DATA MASKING
    if (results.EXE_05 === "Yes" && results.TEC_05 === "No") {
      fractures.push({
        id: "PII_EXPOSURE",
        severity: "CRITICAL",
        description: "Compliance standards are assumed met, but no automated PII stripping layer exists in the tech stack.",
        remedy: "Insert an automated data-scrubbing layer before API egress."
      });
      frictionScore += 20;
    }

    // 4. Update the Master Group Record
    await supabase
      .from('diagnostic_groups')
      .update({ 
        sfi_score: Math.min(frictionScore, 100), 
        is_complete: true 
      })
      .eq('id', groupId);

    // 5. Update the Parent Audit with the final findings
    // We attach the fractures to the main audit row for the Admin Dashboard to see
    const { data: groupInfo } = await supabase
      .from('diagnostic_groups')
      .select('parent_audit_id')
      .eq('id', groupId)
      .single();

    if (groupInfo?.parent_audit_id) {
      await supabase
        .from('audits')
        .update({ 
          fractures: fractures,
          status: 'COMPLETE' 
        })
        .eq('id', groupInfo.parent_audit_id);
    }

    return res.status(200).json({ status: 'SYNTHESIS_COMPLETE', sfi: frictionScore });

  } catch (error) {
    console.error("SYNTHESIS_ERROR:", error);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }
}
