/**
 * BMR SOLUTIONS // FORENSIC DIAGNOSTIC ENGINE V3.2
 * -----------------------------------------------
 * Mathematical integrity for systemic friction analysis.
 */

export type ShearZone = 'reworkTax' | 'shadowAI' | 'expertiseDebt' | 'deltaGap';
export type ProtocolTier = 'LOGIC_RECONSTRUCTION' | 'STRUCTURAL_HARDENING' | 'DRIFT_DIAGNOSTICS';
export type DiagnosticStatus = 'VALIDATED' | 'INCONCLUSIVE' | 'DIVERGENT' | 'CRITICAL_SYSTEM_DECAY';

export interface DiagnosticResult {
  frictionIndex: number;
  protocol: ProtocolTier;
  shearZones: Record<ShearZone, number>;
  status: DiagnosticStatus;
  warnings: string[];
}

export class ForensicEngine {
  private static WEIGHTS: Record<ShearZone, number> = {
    reworkTax: 0.45,
    shadowAI: 0.25,
    expertiseDebt: 0.20,
    deltaGap: 0.10
  };

  public static calculate(answers: Record<string, number>, duration: number): DiagnosticResult {
    const warnings: string[] = [];
    
    // 1. Velocity Protection
    if (duration < 60) {
      return this.generateInconclusive(['DATA_VELOCITY_TOO_HIGH']);
    }

    // 2. Weighted Calculation
    const shearZones: Record<ShearZone, number> = {
      reworkTax: (answers['reworkTax'] || 0),
      shadowAI: (answers['shadowAI'] || 0),
      expertiseDebt: (answers['expertiseDebt'] || 0),
      deltaGap: (answers['deltaGap'] || 0),
    };

    const weightedTotal = 
      (shearZones.reworkTax * this.WEIGHTS.reworkTax) +
      (shearZones.shadowAI * this.WEIGHTS.shadowAI) +
      (shearZones.expertiseDebt * this.WEIGHTS.expertiseDebt) +
      (shearZones.deltaGap * this.WEIGHTS.deltaGap);

    const frictionIndex = Number((weightedTotal * 10).toFixed(1)); // Scale to 100
    
    // 3. Status Mapping
    let status: DiagnosticStatus = 'VALIDATED';
    if (frictionIndex > 90) status = 'CRITICAL_SYSTEM_DECAY';

    return {
      frictionIndex,
      protocol: this.determineProtocol(frictionIndex),
      shearZones,
      status,
      warnings
    };
  }

  private static determineProtocol(score: number): ProtocolTier {
    if (score > 75) return 'LOGIC_RECONSTRUCTION';
    if (score > 45) return 'STRUCTURAL_HARDENING';
    return 'DRIFT_DIAGNOSTICS';
  }

  private static generateInconclusive(reasons: string[]): DiagnosticResult {
    return {
      frictionIndex: 0,
      protocol: 'DRIFT_DIAGNOSTICS',
      shearZones: { reworkTax: 0, shadowAI: 0, expertiseDebt: 0, deltaGap: 0 },
      status: 'INCONCLUSIVE',
      warnings: reasons
    };
  }
}
