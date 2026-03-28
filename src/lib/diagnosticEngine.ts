/**
 * BMR SOLUTIONS // FORENSIC DIAGNOSTIC ENGINE V3.2
 * -----------------------------------------------
 * Mathematical integrity for systemic friction analysis.
 * Zero contractions. Zero soft logic.
 */

export type ShearZone = 'reworkTax' | 'shadowAI' | 'expertiseDebt' | 'deltaGap';
export type ProtocolTier = 'LOGIC_RECONSTRUCTION' | 'STRUCTURAL_HARDENING' | 'DRIFT_DIAGNOSTICS';
export type DiagnosticStatus = 'VALIDATED' | 'INCONCLUSIVE' | 'DIVERGENT' | 'CRITICAL_SYSTEM_DECAY';

export interface DiagnosticResult {
  frictionIndex: number;
  tier: ProtocolTier;
  breakdown: Record<ShearZone, number>;
  status: DiagnosticStatus;
  warning?: string;
}

export class ForensicEngine {
  // Weighted impact levels based on capital leakage priority
  private static WEIGHTS: Record<ShearZone, number> = {
    reworkTax: 0.45,     // Direct financial drain
    shadowAI: 0.25,      // Governance and security risk
    expertiseDebt: 0.20, // Operational continuity risk
    deltaGap: 0.10       // Strategic alignment variance
  };

  /**
   * Processes raw question data into a weighted Friction Index.
   * @param answers - Map of category totals (0-100 scale per category)
   * @param duration - Time taken in seconds to complete the diagnostic
   */
  public static calculate(answers: Record<string, number>, duration: number): DiagnosticResult {
    // 1. FIDELITY CHECK: Under 60 seconds triggers an inconclusive status
    if (duration < 60) {
      return this.generateInconclusive('VELOCITY_THRESHOLD_FAILED');
    }

    // 2. RAW DATA NORMALIZATION
    const rawScores: Record<ShearZone, number> = {
      reworkTax: (answers['RT_TOTAL'] || 0),
      shadowAI: (answers['SA_TOTAL'] || 0),
      expertiseDebt: (answers['ED_TOTAL'] || 0),
      deltaGap: (answers['DG_TOTAL'] || 0),
    };

    // 3. WEIGHTED SHEAR ZONE CALCULATION
    const breakdown: Record<ShearZone, number> = {
      reworkTax: Number((rawScores.reworkTax * this.WEIGHTS.reworkTax).toFixed(2)),
      shadowAI: Number((rawScores.shadowAI * this.WEIGHTS.shadowAI).toFixed(2)),
      expertiseDebt: Number((rawScores.expertiseDebt * this.WEIGHTS.expertiseDebt).toFixed(2)),
      deltaGap: Number((rawScores.deltaGap * this.WEIGHTS.deltaGap).toFixed(2)),
    };

    // 4. FRICTION INDEX AGGREGATION
    const frictionIndex = Object.values(breakdown).reduce((a, b) => a + b, 0);
    
    // 5. STATUS DETERMINATION
    const status = frictionIndex > 90 ? 'CRITICAL_SYSTEM_DECAY' : 'VALIDATED';
    
    return {
      frictionIndex: Number(frictionIndex.toFixed(2)),
      tier: this.determineTier(frictionIndex),
      breakdown,
      status
    };
  }

  private static determineTier(score: number): ProtocolTier {
    if (score > 75) return 'LOGIC_RECONSTRUCTION';
    if (score > 45) return 'STRUCTURAL_HARDENING';
    return 'DRIFT_DIAGNOSTICS';
  }

  private static generateInconclusive(reason: string): DiagnosticResult {
    return {
      frictionIndex: 0,
      tier: 'DRIFT_DIAGNOSTICS',
      breakdown: { reworkTax: 0, shadowAI: 0, expertiseDebt: 0, deltaGap: 0 },
      status: 'INCONCLUSIVE',
      warning: reason
    };
  }

  /**
   * Compares Executive vs. Technical outputs to identify Strategic Blind Spots.
   */
  public static detectDivergence(execIndex: number, techIndex: number): boolean {
    return Math.abs(execIndex - techIndex) > 20;
  }
}
