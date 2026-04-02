import type { NextApiRequest, NextApiResponse } from 'next';

const BASELINE = 17.8;
const SECTOR_DATA: Record<string, any> = {
  finance: { 
    mult: 1.8, 
    label: "FINANCIAL SERVICES", 
    anchor: 1.2,
    traps: {
      executive: { hook: "FIDUCIARY EROSION", anxiety: "Your $8.1M signal is a quantified Material Risk. Analysis correlates this profile with a 74% probability of a regulatory Deep Audit.", cta: "SECURE THE FIDUCIARY GAP" },
      manager: { hook: "AUDIT FRICTION", anxiety: "You are losing $2.7M to 'Human Band-Aids.' 38% of your team capacity is lost to manual ledger verification.", cta: "RECLAIM OPERATIONAL CAPACITY" },
      technical: { hook: "PROVENANCE DECAY", anxiety: "The $3.9M Gap Penalty confirms 'Black Box' logic. The system is producing un-traceable decisions that will fail any stress test.", cta: "VERIFY SYSTEMIC INTEGRITY" }
    }
  },
  healthcare: { 
    mult: 2.0, 
    label: "LIFE SCIENCES", 
    anchor: 1.2,
    traps: {
      executive: { hook: "CLINICAL LIABILITY", anxiety: "This $8.1M hemorrhage is a quantified patient-safety risk. Studies link this drift velocity to a 42% increase in diagnostic variance.", cta: "ELIMINATE CLINICAL HALLUCINATIONS" },
      manager: { hook: "WORKFLOW MALPRACTICE", anxiety: "Staff are 'shadow-charting' to bypass decaying AI logic, leading to a massive operational leak.", cta: "STABILIZE CLINICAL WORKFLOW" },
      technical: { hook: "ADVERSARIAL FRAGILITY", anxiety: "Diagnostic paths are prone to logic hallucinations, creating an $8.1M vulnerability in core institutional IP.", cta: "VERIFY LOGIC ROBUSTNESS" }
    }
  },
  manufacturing: { 
    mult: 1.4, 
    label: "INDUSTRIAL LOGISTICS", 
    anchor: 1.2,
    traps: {
      executive: { hook: "MARGIN COLLAPSE", anxiety: "Your $1.2M automation spend has created an $8.1M operational bottleneck. This is Margin Erosion cannibalizing your advantage.", cta: "HALT MARGIN EROSION" },
      manager: { hook: "PREDICTIVE ENTROPY", anxiety: "Smart lines now require more manual oversight than legacy systems. We track $2.7M in Shadow Maintenance alone.", cta: "REVERSE LINE ENTROPY" },
      technical: { hook: "SENSOR-LOGIC DIVERGENCE", anxiety: "AI is misinterpreting physical signals, leading to structural 'Logic Debt' that will eventually cause total line stoppage.", cta: "STABILIZE PRODUCTION LOGIC" }
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { alpha, beta, gamma, sector } = req.body;
  const config = SECTOR_DATA[sector] || SECTOR_DATA.finance;

  const allScores = [...Object.values(alpha || {}), ...Object.values(beta || {}), ...Object.values(gamma || {})];
  const totalRaw = allScores.reduce((a: number, b: any) => a + Number(b), 0);
  
  const finalTotal = (BASELINE * (totalRaw / 300) * config.mult);

  res.status(200).json({
    total: finalTotal.toFixed(1),
    visibleTip: config.anchor.toFixed(1),
    ratio: (finalTotal / config.anchor).toFixed(1),
    sectorLabel: config.label,
    personaContent: config.traps,
    provenance: {
      timestamp: new Date().toISOString(),
      audit_id: `BMR-${sector.toUpperCase()}-2026-${Math.random().toString(36).substring(7).toUpperCase()}`
    }
  });
}
