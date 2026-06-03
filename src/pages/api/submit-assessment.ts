import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { pillarQuestions } from '../../data/pillarQuestions';

const dbEngine = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method non-compliant' });
  }

  const { client_id, pillar, answers } = req.body;
  if (!client_id || !pillar || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Malformed payload structure.' });
  }

  try {
    const nodeScores: Record<'EXECUTIVE' | 'MANAGERIAL' | 'TECHNICAL' | 'USER', { total: number; count: number }> = {
      EXECUTIVE: { total: 0, count: 0 },
      MANAGERIAL: { total: 0, count: 0 },
      TECHNICAL: { total: 0, count: 0 },
      USER: { total: 0, count: 0 }
    };

    let totalAccumulatedMultiplier = 0.0;
    const failureRegistry: string[] = [];

    answers.forEach((ans: { question_id: string; selected_key: 'A' | 'B' | 'C' | 'D' }) => {
      const qMatch = pillarQuestions[ans.question_id];
      if (qMatch && qMatch.pillar === pillar) {
        const choice = qMatch.choices[ans.selected_key];
        if (choice) {
          const node = qMatch.target_node;
          nodeScores[node].total += choice.symptom_weight;
          nodeScores[node].count += 1;
          
          totalAccumulatedMultiplier += choice.bandwidth_multiplier;
          if (choice.regulatory_tag) {
            failureRegistry.push(`[${node}] ${qMatch.subarea} - ${choice.regulatory_tag}`);
          }
        }
      }
    });

    // Compute localized means per persona node
    const finalNodeAverages = (Object.keys(nodeScores) as Array<keyof typeof nodeScores>).map(key => {
      const entry = nodeScores[key];
      return entry.count > 0 ? entry.total / entry.count : 0;
    });

    const activeNodesCount = finalNodeAverages.filter(val => val > 0).length || 1;
    const meanFrictionScore = finalNodeAverages.reduce((acc, v) => acc + v, 0) / activeNodesCount;

    // Calculate Standard Deviation for the Asymmetric Variance Gap (V_gap)
    const squaredDeltas = finalNodeAverages.map(v => Math.pow(v - meanFrictionScore, 2));
    const meanSquaredDelta = squaredDeltas.reduce((acc, v) => acc + v, 0) / activeNodesCount;
    const standardDeviation = Math.sqrt(meanSquaredDelta);
    const varianceGapPercent = parseFloat((standardDeviation * 50).toFixed(2));

    const calculatedCompliance = Math.max(0, parseFloat((100 - (varianceGapPercent * 1.2)).toFixed(2)));
    
    const baseUnitRate = pillar === 'AVS' ? 125000 : pillar === 'IGF' ? 200000 : 75000;
    const annual_salary_leakage = parseFloat((baseUnitRate * totalAccumulatedMultiplier * 0.4).toFixed(2));
    
    // Rework costs track system user workaround tax metrics explicitly
    const userNodeAvg = nodeScores['USER'].count > 0 ? nodeScores['USER'].total / nodeScores['USER'].count : 0;
    const rework_costs = parseFloat((baseUnitRate * userNodeAvg * 1.5).toFixed(2));
    
    const unhedged_legal_exposure = pillar === 'IGF' && calculatedCompliance < 70 ? 2500000.00 : 0.00;
    const reconstruction_latency_hours = Math.max(2, Math.round(totalAccumulatedMultiplier * 2));

    const { error: upsertError } = await dbEngine
      .from('premium_audit_deep_dives')
      .upsert({
        client_id,
        target_pillar: pillar,
        friction_score: parseFloat(meanFrictionScore.toFixed(2)),
        compliance_score: calculatedCompliance,
        vendor_risk_score: pillar === 'IGF' && meanFrictionScore > 1.2 ? 0.92 : 0.15,
        annual_salary_leakage,
        rework_costs,
        unhedged_legal_exposure,
        reconstruction_latency_hours,
        compliance_failures: failureRegistry,
        asymmetric_variance_gap: varianceGapPercent,
        audit_deadline_iso: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      }, { onConflict: 'client_id,target_pillar' });

    if (upsertError) throw upsertError;

    return res.status(200).json({ status: 'PROCESSING_SUCCESSFUL', score: meanFrictionScore, varianceGap: varianceGapPercent });
  } catch (err: any) {
    return res.status(500).json({ error: 'Evaluation pipeline freeze', details: err.message });
  }
}
