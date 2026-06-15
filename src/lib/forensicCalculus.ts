import { forensicQuestions } from '../data/forensicQuestions';
import { InMemoryCalculatedMetrics } from '../types/forensicRuntime';

interface RawAnswers {
  [questionId: string]: 'A' | 'B' | 'C' | 'D';
}

export function calculateForensicMetrics(
  companyName: string,
  answers: RawAnswers
): InMemoryCalculatedMetrics {
  let totalQuestionsEvaluated = 0;
  let accumulatedSymptomWeight = 0;
  
  let igfWeight = 0; let igfCount = 0;
  let avsWeight = 0; let avsCount = 0;
  let haiWeight = 0; let haiCount = 0;
  
  let totalBandwidthMultiplier = 0;
  let complianceFailures: string[] = [];

  Object.entries(answers).forEach(([qId, choiceKey]) => {
    const questionRef = forensicQuestions[qId];
    if (!questionRef) return; // Safeguard against trailing or legacy layout drift

    const choiceData = questionRef.choices[choiceKey];
    if (!choiceData) return;

    totalQuestionsEvaluated++;
    accumulatedSymptomWeight += choiceData.symptom_weight;
    totalBandwidthMultiplier += choiceData.bandwidth_multiplier;

    // Track friction metrics cleanly down to your hybrid conversion lanes
    switch (questionRef.pillar) {
      case 'IGF':
        igfWeight += choiceData.symptom_weight;
        igfCount++;
        break;
      case 'AVS':
        avsWeight += choiceData.symptom_weight;
        avsCount++;
        break;
      case 'HAI':
        haiWeight += choiceData.symptom_weight;
        haiCount++;
        break;
    }

    // Isolate regulatory liabilities based on choice architecture penalties
    if ((choiceKey === 'C' || choiceKey === 'D') && choiceData.regulatory_tag) {
      complianceFailures.push(`${choiceData.regulatory_tag}`);
    }
  });

  const aggregateCount = totalQuestionsEvaluated || 1;
  const globalFrictionIndex = Number((accumulatedSymptomWeight / aggregateCount).toFixed(2));
  
  const igfScore = igfCount ? Number((igfWeight / igfCount).toFixed(2)) : 0;
  const avsScore = avsCount ? Number((avsWeight / avsCount).toFixed(2)) : 0;
  const haiScore = haiCount ? Number((haiWeight / haiCount).toFixed(2)) : 0;

  // 💰 Pricing-Aligned Calculus Metrics
  const annualSalaryLeakage = Number((totalBandwidthMultiplier * 85000).toFixed(2));
  const reworkCosts = Number((globalFrictionIndex * 380000).toFixed(2));

  // Determine unhedged legal risk boundaries (Leading with your prioritized IGF traps)
  let unhedgedLegalExposure = 250000; 
  if (igfScore >= 1.4 || complianceFailures.some(f => f.includes('GDPR') || f.includes('Fine') || f.includes('Violation'))) {
    unhedgedLegalExposure = 5000000; // Critical €5M - €20M Regulatory Exposure Tier
  } else if (avsScore >= 0.8 || haiScore >= 0.8) {
    unhedgedLegalExposure = 1250000; // High Rework Tax / Engineering Pain Tier
  }

  // Gamified out-of-100 Legal Compliance Score
  const complianceScore = Math.max(0, 100 - (complianceFailures.length * 12));

  return {
    companyName: companyName || "ENTERPRISE RECORD INSTANCE",
    igfScore,
    avsScore,
    haiScore,
    complianceScore,
    annualSalaryLeakage,
    reworkCosts,
    unhedgedLegalExposure,
    complianceFailures: complianceFailures.slice(0, 3) // Restrict layout display overflow
  };
}
