// src/lib/forensicCalculus.ts

import { SectorType } from './supabaseAdapter';
import { forensicQuestions } from '../data/forensicQuestions';
import { 
  inferChoiceMetadata, 
  EvidenceBasis, 
  FailureDriver, 
  VisibilityState 
} from './forensicInference';

export interface CalculatedMetrics {
  companyName: string;
  multiplier: number;
  complianceScore: number;
  annualSalaryLeakage: number;
  forensicInactionLiability: number; 
  isTierThreeExposure: boolean;
  regulatoryAlertActive: boolean;

  // 🪐 QUALITATIVE FORENSIC TELEMETRY EXTENSIONS
  reliabilityIndex: number;
  sampleSize: number;
  dominantDriver: FailureDriver | "NONE";
  dominantBasis: EvidenceBasis | "NONE";
  dominantVisibility: VisibilityState | "NONE";
  evidenceDistribution: Record<EvidenceBasis, number>;
  visibilityDistribution: Record<VisibilityState, number>;
  driverDistribution: Record<FailureDriver, number>;
}

const CONFIG_BASIS_WEIGHTS: Record<EvidenceBasis, number> = {
  AUDITED_ARTIFACT: 100,
  DASHBOARD_TELEMETRY: 75,
  TRIBAL_KNOWLEDGE: 40,
  COMPLETE_OPACITY: 10
};

/**
 * 🧮 UNIFIED MULTI-PILLAR FORENSIC CALCULUS ENGINE
 * Dynamically evaluates cross-organizational telemetry metrics (IGF, AVS, HAI)
 */
export function calculateForensicMetrics(
  companyName: string,
  responses: Record<string, string> | any,
  explicitSector?: SectorType
): CalculatedMetrics {
  
  const fallbackSector: SectorType = "SERVICES";
  const sector = explicitSector || responses?.sector || fallbackSector;

  const sectorMultipliers: Record<string, number> = {
    FINANCE: 1.95,     
    HEALTHCARE: 1.85,  
    INDUSTRIAL: 1.35,  
    SERVICES: 1.00,    
  };
  
  const multiplier = sectorMultipliers[sector] || 1.00;

  const inputKeys = Object.keys(responses || {});
  const quadKeys = inputKeys.filter(k => k.startsWith('quad_'));

  const avsAnswers = quadKeys.filter(k => k.toUpperCase().includes('AVS') || responses[k] === 'AVS');
  const igfAnswers = quadKeys.filter(k => k.toUpperCase().includes('IGF') || responses[k] === 'IGF');
  const haiAnswers = quadKeys.filter(k => k.toUpperCase().includes('HAI') || responses[k] === 'HAI');

  let frictionPenaltyCount = 0;
  quadKeys.forEach(key => {
    const answerValue = responses[key];
    if (answerValue === 'C' || answerValue === 'D') {
      frictionPenaltyCount += 1.5;
    } else if (answerValue === 'B') {
      frictionPenaltyCount += 0.5;
    }
  });

  const baseDeficiencyImpact = frictionPenaltyCount * 4.5;
  const rawComplianceScore = 90 - baseDeficiencyImpact;
  
  const infrastructureLossWeight = avsAnswers.length + haiAnswers.length;
  const salaryLeakageBase = 85000 + (infrastructureLossWeight * 15000) + (frictionPenaltyCount * 45000);
  
  const complianceRiskWeight = igfAnswers.length * 2.0;
  const legalExposureBase = 450000 + (complianceRiskWeight * 75000) + (frictionPenaltyCount * 115000);

  // -------------------------------------------------------------------------
  // 📊 QUALITATIVE METADATA ACCUMULATION HOOKS
  // -------------------------------------------------------------------------
  const evidenceDistribution: Record<EvidenceBasis, number> = { AUDITED_ARTIFACT: 0, DASHBOARD_TELEMETRY: 0, TRIBAL_KNOWLEDGE: 0, COMPLETE_OPACITY: 0 };
  const driverDistribution: Record<FailureDriver, number> = { GOVERNANCE_GAP: 0, ENGINEERING_ARCH: 0, PROCESS_STRAIN: 0, TOOLING_VOID: 0 };
  const visibilityDistribution: Record<VisibilityState, number> = { AWARE: 0, FATIGUED: 0, BLIND: 0 };

  let totalWeightedBasisSum = 0;
  let activeValidInferencesCount = 0;

  quadKeys.forEach(key => {
    const chosenOptionLetter = responses[key]; 
    const cleanQuestionId = key.replace(/^quad_/, ''); // Strips out the 'quad_' namespace key prefix
    
    const questionObject = (forensicQuestions as any)[cleanQuestionId];
    const pickedChoiceObject = questionObject?.choices?.[chosenOptionLetter];

    if (questionObject && pickedChoiceObject) {
      const inferred = inferChoiceMetadata({
        scenario: questionObject.symptomatic_scenario || '',
        choiceText: pickedChoiceObject.text || '',
        regulatoryTag: pickedChoiceObject.regulatory_tag,
        pillar: questionObject.pillar || ''
      });

      evidenceDistribution[inferred.evidence_basis]++;
      driverDistribution[inferred.failure_driver]++;
      visibilityDistribution[inferred.visibility_state]++;

      totalWeightedBasisSum += CONFIG_BASIS_WEIGHTS[inferred.evidence_basis];
      activeValidInferencesCount++;
    }
  });

  const maxPossibleWeightScore = activeValidInferencesCount * 100;
  const computedReliabilityIndex = maxPossibleWeightScore > 0 
    ? Math.round((totalWeightedBasisSum / maxPossibleWeightScore) * 100) 
    : 0;

  const getDominantVector = <T extends string>(distribution: Record<T, number>): T | "NONE" => {
    if (activeValidInferencesCount === 0) return "NONE";
    return (Object.entries(distribution) as Array<[T, number]>)
      .sort((a, b) => b[1] - a[1])[0][0];
  };

  return {
    companyName,
    multiplier,
    complianceScore: Math.max(15, Math.min(100, Math.round(rawComplianceScore))),
    annualSalaryLeakage: Math.round(salaryLeakageBase * multiplier),
    forensicInactionLiability: Math.round(legalExposureBase * multiplier), 
    isTierThreeExposure: multiplier >= 1.35, 
    regulatoryAlertActive: sector === 'FINANCE' || sector === 'HEALTHCARE' || igfAnswers.length > 2,

    reliabilityIndex: computedReliabilityIndex,
    sampleSize: activeValidInferencesCount,
    dominantDriver: getDominantVector(driverDistribution),
    dominantBasis: getDominantVector(evidenceDistribution),
    dominantVisibility: getDominantVector(visibilityDistribution),
    evidenceDistribution,
    visibilityDistribution,
    driverDistribution
  };
}
