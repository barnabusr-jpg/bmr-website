export interface NodeScoresPayload {
  operational_drag_score?: number;
  verification_debt_score?: number;
  promise_gap_index?: number;
  operational_drag_multiplier?: number;
  internal_rework_multiplier?: number;
  upstream_gross_claimed_hrs?: number;
}

export type RequiredNodeScoresPayload = Required<NodeScoresPayload>;

export const isFiniteNumber = (val: unknown): val is number => {
  return typeof val === "number" && Number.isFinite(val);
};

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) {
    return min;
  }
  return Math.max(min, Math.min(max, n));
}

export function parseNodeScores(raw: unknown): RequiredNodeScoresPayload {
  const baseline: RequiredNodeScoresPayload = {
    operational_drag_score: 0,
    verification_debt_score: 0,
    promise_gap_index: 0,
    operational_drag_multiplier: 1.0,
    internal_rework_multiplier: 1.0,
    upstream_gross_claimed_hrs: 0,
  };

  if (typeof raw !== "object" || raw === null) {
    return baseline;
  }

  const opScoreRaw =
    "operational_drag_score" in raw && isFiniteNumber(raw.operational_drag_score)
      ? raw.operational_drag_score
      : baseline.operational_drag_score;

  const verScoreRaw =
    "verification_debt_score" in raw && isFiniteNumber(raw.verification_debt_score)
      ? raw.verification_debt_score
      : baseline.verification_debt_score;

  const upstreamHrs =
    "upstream_gross_claimed_hrs" in raw && isFiniteNumber(raw.upstream_gross_claimed_hrs)
      ? Math.max(0, raw.upstream_gross_claimed_hrs)
      : baseline.upstream_gross_claimed_hrs;

  const opScore = clamp(opScoreRaw, 0, 100);
  const verScore = clamp(verScoreRaw, 0, 100);

  const derivedPgi = Math.round(opScore * 0.4 + verScore * 0.6);
  const derivedOpMult = 1.0 + opScore / 200;
  const derivedRewMult = 1.0 + verScore / 200;

  const finalPgi =
    "promise_gap_index" in raw && isFiniteNumber(raw.promise_gap_index)
      ? clamp(raw.promise_gap_index, 0, 100)
      : derivedPgi;

  const finalOpMult =
    "operational_drag_multiplier" in raw && isFiniteNumber(raw.operational_drag_multiplier)
      ? Math.max(1.0, raw.operational_drag_multiplier)
      : derivedOpMult;

  const finalRewMult =
    "internal_rework_multiplier" in raw && isFiniteNumber(raw.internal_rework_multiplier)
      ? Math.max(1.0, raw.internal_rework_multiplier)
      : derivedRewMult;

  return {
    operational_drag_score: opScore,
    verification_debt_score: verScore,
    promise_gap_index: finalPgi,
    operational_drag_multiplier: finalOpMult,
    internal_rework_multiplier: finalRewMult,
    upstream_gross_claimed_hrs: upstreamHrs,
  };
}
