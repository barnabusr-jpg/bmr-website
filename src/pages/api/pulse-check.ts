import { NextApiRequest, NextApiResponse } from 'next';

const SECTOR_CONFIG = {
  finance: { multiplier: 1.65, riskProfile: "COMPLIANCE_HEAVY", thresholds: { reconstruction: 18, hardening: 12 } },
  healthcare: { multiplier: 1.80, riskProfile: "LIFE_CRITICAL", thresholds: { reconstruction: 20, hardening: 14 } },
  tech: { multiplier: 1.30, riskProfile: "TECHNICAL_DEBT", thresholds: { reconstruction: 16, hardening: 10 } },
  services: { multiplier: 1.00, riskProfile: "LABOR_INTENSIVE", thresholds: { reconstruction: 14, hardening: 8 } }
} as const;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { role, sector, answers } = req.body;

  // Forensic Scoring (Mapping Object to values)
  const getScore = (id: string) => {
    const a = answers[id];
    if (typeof a === 'number') return a / 10;
    const highRisk = ["Often", "Always", "7+", "No", "Neither", "Working for", "Client Reported", "Undetected"];
    return highRisk.some(term => String(a).includes(term)) ? 8.5 : 2.5;
  };

  const reworkTaxRaw = getScore('mgr_1') + getScore('mgr_2') + getScore('mgr_6');
  const shadowAI = getScore('sh_1') + getScore('sh_2');
  const expertiseDebt = getScore('mgr_3') + getScore('mgr_4');

  const config = SECTOR_CONFIG[sector as keyof typeof SECTOR_CONFIG] || SECTOR_CONFIG.services;
  
  // Apply Sector Multiplier to total impact
  const totalImpact = (1.2 + (reworkTaxRaw * 0.35) + (shadowAI * 0.25) + (expertiseDebt * 0.45)) * config.multiplier;

  let archetype = "Collective Delusion";
  let velocity = -1.5;

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
