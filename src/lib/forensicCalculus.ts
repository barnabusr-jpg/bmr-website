import { SectorType } from './supabaseAdapter';

interface CalculatedMetrics {
  companyName: string;
  multiplier: number;
  complianceScore: number;
  annualSalaryLeakage: number;
  forensicInactionLiability: number; 
  isTierThreeExposure: boolean;
  regulatoryAlertActive: boolean;
}

/**
 * 🧮 UNIFIED MULTI-PILLAR FORENSIC CALCULUS ENGINE
 * Dynamically evaluates cross-organizational telemetry metrics (IGF, AVS, HAI)
 * calibrated strictly to the 4 operational intake sectors and their value drivers.
 */
export function calculateForensicMetrics(
  companyName: string,
  responses: Record<string, string> | any,
  explicitSector?: SectorType
): CalculatedMetrics {
  
  // 1. Resolve Sector Identity (Falls back safely if omitted in the caller signature)
  const fallbackSector: SectorType = "SERVICES";
  const sector = explicitSector || responses?.sector || fallbackSector;

  // Aligned perfectly to your 4 intake pillars and their underlying risk multipliers
  const sectorMultipliers: Record<string, number> = {
    FINANCE: 1.95,     // Driven by Compliance (SOX / PCI-DSS)
    HEALTHCARE: 1.85,  // Driven by Liability (HIPAA / Data Conformance)
    INDUSTRIAL: 1.35,  // Driven by Operations (Pipeline / Rework Tax)
    SERVICES: 1.00,    // Driven by Labor (Standard Engineering Baselines)
  };
  
  const multiplier = sectorMultipliers[sector] || 1.00;

  // 2. Extract Cross-Functional Posture Weightings
  const inputKeys = Object.keys(responses || {});
  const quadKeys = inputKeys.filter(k => k.startsWith('quad_'));

  // Split into distinct telemetry tracking segments
  const avsAnswers = quadKeys.filter(k => k.includes('AVS_') || responses[k] === 'AVS');
  const igfAnswers = quadKeys.filter(k => k.includes('IGF_') || responses[k] === 'IGF');
  const haiAnswers = quadKeys.filter(k => k.includes('HAI_') || responses[k] === 'HAI');

  // 🧠 Dynamic Penalty Accumulation Loops
  let frictionPenaltyCount = 0;
  
  quadKeys.forEach(key => {
    const answerValue = responses[key];
    if (answerValue === 'C' || answerValue === 'D') {
      frictionPenaltyCount += 1.5;
    } else if (answerValue === 'B') {
      frictionPenaltyCount += 0.5;
    }
  });

  // 3. Mathematical Base Calibration
  const baseDeficiencyImpact = frictionPenaltyCount * 4.5;
  const rawComplianceScore = 90 - baseDeficiencyImpact;
  
  const infrastructureLossWeight = avsAnswers.length + haiAnswers.length;
  const salaryLeakageBase = 85000 + (infrastructureLossWeight * 15000) + (frictionPenaltyCount * 45000);
  
  const complianceRiskWeight = igfAnswers.length * 2.0;
  const legalExposureBase = 450000 + (complianceRiskWeight * 75000) + (frictionPenaltyCount * 115000);

  // 4. Post-Process Compounding & Protective Clamping
  return {
    companyName,
    multiplier,
    complianceScore: Math.max(15, Math.min(100, Math.round(rawComplianceScore))),
    annualSalaryLeakage: Math.round(salaryLeakageBase * multiplier),
    forensicInactionLiability: Math.round(legalExposureBase * multiplier), 
    isTierThreeExposure: multiplier >= 1.35, 
    regulatoryAlertActive: sector === 'FINANCE' || sector === 'HEALTHCARE' || igfAnswers.length > 2,
  };
}
