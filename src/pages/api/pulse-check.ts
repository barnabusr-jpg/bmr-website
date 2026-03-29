import { NextApiRequest, NextApiResponse } from 'next';

const SECTOR_CONFIG = {
  finance: { multiplier: 1.65, riskProfile: "COMPLIANCE_HEAVY", thresholds: { reconstruction: 18, hardening: 12 } },
  healthcare: { multiplier: 1.80, riskProfile: "LIFE_CRITICAL", thresholds: { reconstruction: 20, hardening: 14 } },
  tech: { multiplier: 1.30, riskProfile: "TECHNICAL_DEBT", thresholds: { reconstruction: 16, hardening: 10 } },
  services: { multiplier: 1.00, riskProfile: "LABOR_INTENSIVE", thresholds: { reconstruction: 14, hardening: 8 } }
} as const;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // 1. Destructure with defaults to prevent "undefined" errors
  const { role, sector, answers = {} } = req.body;

  // 2. Hardened Scoring Logic
  const getScore = (id: string): number => {
    const a = answers[id];
    // If the answer is missing, return a baseline "Safe" score
    if (a === undefined || a === null) return 2.5; 
    
    if (typeof a === 'number') return a / 10;
    
    const highRisk = ["Often", "Always", "7+", "No", "Neither", "Working for", "Client Reported", "Undetected"];
    return highRisk.some(term => String(a).includes(term)) ? 8.5 : 2.5;
  };

  // 3. Extract Raw Metrics
  const reworkTaxRaw = getScore('mgr_1') + getScore('mgr_2') + getScore('mgr_6');
  const shadowAI = getScore('sh_1') + getScore('sh_2');
  const expertiseDebt = getScore('mgr_3') + getScore('mgr_4');

  // 4. Sector Calibration
  const sectorKey = (sector as keyof typeof SECTOR_CONFIG) || 'services';
  const config = SECTOR_CONFIG[sectorKey];
  
  // 5. Apply Multipliers
  const totalImpact = (1.2 + (reworkTaxRaw * 0.35) + (shadowAI * 0.25) + (expertiseDebt * 0.45)) * config.multiplier;

  // 6. Archetype Determination Logic
  let archetype = "Collective Delusion";
  let velocity = -1.5;

  // Sector-weighted thresholds
  if (reworkTaxRaw * config.multiplier > config.thresholds.reconstruction) {
    archetype = "Replacement Trap";
    velocity = -7.4;
  } else if (shadowAI * config.multiplier > config.thresholds.hardening) {
    archetype = "Shadow Shear";
    velocity = -5.8;
  } else if (expertiseDebt * config.multiplier > config.thresholds.hardening) {
    archetype = "Hollow Chevron";
    velocity = -4.2;
  }

  // 7. Final Payload
  res.status(200).json({
    archetype,
    deltaGap: parseFloat(((reworkTaxRaw * config.multiplier) / 3.5).toFixed(1)),
    reworkTax: parseFloat((reworkTaxRaw * config.multiplier).toFixed(2)),
    shadowAI: parseFloat((shadowAI * config.multiplier).toFixed(2)),
    expertiseDebt: parseFloat((expertiseDebt * config.multiplier).toFixed(2)),
    financialImpact: parseFloat(totalImpact.toFixed(2)),
    fractureVelocity: velocity,
    perspective: role,
    sectorContext: config.riskProfile
  });
}
