/**
 * Pillar-Specific Keyword Database 
 * Used to identify which neutralization vectors match the user's role.
 */
export const PillarKeywords = {
  Executive: ["roi", "value", "strategic", "leadership", "kpi", "business", "priorities", "stewardship", "alignment"],
  Technical: ["logging", "telemetry", "security", "scalability", "debugging", "compliance", "forensic", "instrument", "algorithmic"],
  Manager: ["adoption", "workflow", "change", "readiness", "training", "friction", "governance"]
};

/**
 * Strategy 2: Role-Based Weighting Logic
 * Applies a 1.5x multiplier to the zone most relevant to the user's perspective.
 */
export const calculatePillarPressure = (weight: number, role: string, zone: string) => {
  const multipliers: Record<string, string> = {
    "Executive": "IGF", // Executive focus: Governance/ROI
    "Technical": "HAI", // Technical focus: Trust/Forensics
    "Manager": "AVS"    // Manager focus: Adoption/Value
  };

  // If the zone matches the role's primary pillar, boost the weight
  return multipliers[role] === zone ? weight * 1.5 : weight;
};

/**
 * Strategy 3: Affinity Matching
 * Determines if a specific vector should be highlighted as a "Priority Target".
 */
export const getVectorAffinity = (vector: string, role: string) => {
  const v = vector.toLowerCase();
  const keywords = PillarKeywords[role as keyof typeof PillarKeywords] || [];
  return keywords.some(kw => v.includes(kw)) ? "Priority" : "Standard";
};
