// /src/lib/diagnosticEngine.ts

export type ShearZone = 'reworkTax' | 'shadowAI' | 'expertiseDebt' | 'deltaGap';
export type ProtocolTier = 'LOGIC_RECONSTRUCTION' | 'STRUCTURAL_HARDENING' | 'DRIFT_DIAGNOSTICS';

interface DiagnosticResult {
  frictionIndex: number;
  tier: ProtocolTier;
  breakdown: Record<ShearZone, number>;
  status: 'VALIDATED' | 'INCONCLUSIVE' | 'DIVERGENT';
  warning?: string;
}

export class ForensicEngine {
  private static WEIGHTS: Record<ShearZone, number> = {
    reworkTax: 0.4,
    shadowAI: 0.3,
    expertiseDebt: 0.2,
    deltaGap: 0.1
  };

  /**
   * Calculates the systemic friction index based on weighted Shear Zones.
   * Logic: (Zone Score / Max Zone Score) * Zone Weight
   */
  public static calculate(answers: Record<string, number>, duration: number): DiagnosticResult {
    // 1. Velocity Check: Under 60 seconds triggers a fidelity warning
    if (duration < 60) {
      return this.generateInconclusive('VELOCITY_THRESHOLD_FAILED');
    }

    const breakdown: Record<ShearZone, number> = {
      reworkTax: (answers['RT_TOTAL'] || 0) * this.WEIGHTS.reworkTax,
      shadowAI: (answers['SA_TOTAL'] || 0) * this.WEIGHTS.shadowAI,
      expertiseDebt: (answers['ED_TOTAL'] || 0) * this.WEIGHTS.expertiseDebt,
      deltaGap: (answers['DG_TOTAL'] || 0) * this.WEIGHTS.deltaGap,
    };

    const frictionIndex = Object.values(breakdown).reduce((a, b) => a + b, 0);
    
    return {
      frictionIndex: Number(frictionIndex.toFixed(2)),
      tier: this.determineTier(frictionIndex),
      breakdown,
      status: 'VALIDATED'
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
}
