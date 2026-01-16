// Narrative mapping from diagnostic_narrative_mapping.json
export const narratives = {
  trust: {
    high: "This level suggests that people likely experience the AI as predictable, transparent, and supportive of their work. There may be greater clarity about why AI is used and how it fits into daily tasks. From an HAI perspective, this typically aligns with healthy expectations and stable interactions. From an AVS viewpoint, this often supports clean value flow with minimal friction or rework. This is a strong foundation for scaling more advanced capabilities.",
    moderate: "This score indicates that confidence in AI may vary depending on the situation or use case. Some interactions may reinforce trust, while others introduce hesitation or uncertainty. HAI signals here often point to mixed transparency or inconsistent explanations. AVS patterns may show mild value leakage when teams pause, double-check, or work around unclear outputs. Clarifying system behavior and reinforcing predictability can strengthen overall trust.",
    low: "This level suggests that the system may not always feel reliable or transparent to users. Uncertainty in how AI behaves can lead to hesitation or parallel manual steps. HAI patterns often reflect unclear expectations or low visibility into how recommendations are formed. AVS interpretation highlights areas where value flow may slow due to caution, revalidation, or workarounds. Restoring clarity and predictability can meaningfully increase confidence in the system."
  },
  govern: {
    high: "This score suggests that guardrails, oversight structures, and decision pathways are likely well understood. People may have a shared sense of how AI decisions align with policy and responsibility. HAI signals indicate predictable handoffs between human and system decision-making roles. AVS patterns usually reflect stable value flow, reduced rework, and well-contained risk. This creates strong conditions for operational reliability and scale.",
    moderate: "This level indicates that governance practices may be present but not entirely consistent across teams or workflows. Some decision pathways may feel structured, while others may feel flexible or ambiguous. HAI interpretation often centers on uneven role clarity or oversight expectations. AVS patterns may show moderate volatility in decision alignment or risk boundaries. Strengthening consistency and codifying decision pathways can increase system stability.",
    low: "This score suggests limited clarity in how decisions should be guided, reviewed, or escalated. Individuals may interpret AI rules differently, leading to variability in decision-making. HAI signals often involve uncertainty about when to rely on or override system outputs. AVS interpretation reflects unstable decision coherence, which can impact fairness, reliability, or compliance. Building coherent, repeatable pathways can significantly stabilize outcomes."
  },
  evolve: {
    high: "This level indicates strong adaptability and openness to improving how AI is used. People may feel comfortable adjusting workflows as the system evolves or improves. HAI signals point to active learning loops and healthy responsiveness to change. AVS patterns typically reflect increasing efficiency and stronger value capture over time. This creates ideal conditions for iterative improvement and responsible scaling.",
    moderate: "This score suggests that adaptation is possible but may be uneven or slow in some areas. Some teams or workflows may integrate changes smoothly, while others may take longer. HAI interpretation often reflects mixed comfort levels with shifting processes or new capabilities. AVS patterns may show partial improvements that do not fully settle into consistent outcomes. Enhancing change support and communication can accelerate alignment.",
    low: "This level suggests that changes to AI workflows may be challenging to absorb. Adjustments could introduce uncertainty, resistance, or slower operational uptake. HAI signals often point to low clarity or insufficient support during transitions. AVS patterns may reflect stagnation or unrealized value from new features or redesigns. Improving stability, communication, and readiness can help prepare the system for evolution."
  },
  fourDsv: {
    friction: {
      strong: "This level suggests that workflows feel smooth, intuitive, and well supported by AI. HAI interpretation indicates strong alignment between system behavior and real-world tasks. AVS analysis typically reflects clean value flow, reduced manual effort, and minimal process drag. This is a core strength to protect as you scale.",
      variable: "This score indicates that some workflows may feel efficient while others occasionally introduce delay or friction. HAI signals often reflect inconsistent interaction patterns across teams or processes. AVS patterns may exhibit sporadic value leakage when bottlenecks or unclear steps occur. Stabilizing friction points can improve overall system performance.",
      at_risk: "This level suggests that friction may be noticeable across multiple workflows. HAI interpretation points to possible misalignment between system behavior and daily needs. AVS patterns typically reveal recurring slowdowns, workarounds, or effort duplication. Reducing friction in key pathways can deliver immediate impact."
    },
    decision_quality: {
      strong: "This score suggests that AI-supported decisions are likely to be experienced as coherent, predictable, and aligned with policy expectations. HAI signals reflect confidence in when and how to use system recommendations. AVS interpretation shows strong value integrity and reduced decision variability. This is a significant enabler of operational maturity.",
      variable: "This level indicates that decision quality may feel dependable in some cases but inconsistent in others. HAI signals reflect uncertainty about which recommendations can be trusted. AVS interpretation suggests modest volatility in decision alignment or fairness. Clarifying decision logic and communication can help stabilize outcomes.",
      at_risk: "This score suggests that AI recommendations may feel unclear, conflicting, or too complicated to rely on. HAI signals often reflect uncertainty or hesitation during decision-making. AVS interpretation highlights areas where value may leak due to inconsistent or ambiguous outputs. Increasing transparency and strengthening the criteria communication can improve confidence."
    },
    system_stability: {
      strong: "This score indicates that the system likely behaves in a predictable manner across contexts. HAI interpretation points to a stable environment where expectations are consistently met. AVS signals reflect reliable value flow with low operational noise. This is a critical foundation for scaling.",
      variable: "This level suggests that stability may fluctuate depending on workflow, timing, or context. HAI signals reflect varied experiences, ranging from smooth interactions to unexpected system responses. AVS interpretation highlights moderate value disruption due to unpredictable behavior. Improving consistency can meaningfully lift trust and performance.",
      at_risk: "This score suggests that the system may behave inconsistently or unpredictably. HAI signals often reflect caution or the need for manual safeguards. AVS patterns highlight recurring disruptions that affect reliability and flow. Stabilizing the environment should be prioritized before expanding capabilities."
    },
    human_alignment: {
      strong: "This level suggests strong complementarity between human oversight and AI-supported workflows. HAI interpretation points to clear expectations and productive collaboration. AVS analysis shows strengthened value capture and reduced operational friction. This reflects a high level of maturity in human-system interaction.",
      variable: "This score indicates that alignment may vary across teams, workflows, or contexts. HAI signals reflect moments of strong collaboration alongside areas of uncertainty. AVS patterns highlight mixed value delivery depending on alignment quality. Clarifying roles and expectations can strengthen consistency.",
      at_risk: "This level suggests that human-system alignment may be difficult in key areas. HAI interpretation points to tension, uncertainty, or low clarity regarding oversight or handoff points. AVS analysis typically reveals notable gaps in value realization due to misalignment. Improving clarity and collaboration patterns can significantly enhance system performance."
    }
  }
};

export type PillarLevel = 'high' | 'moderate' | 'low';
export type SystemState = 'strong' | 'variable' | 'at_risk';

export const getPillarNarrative = (pillar: 'trust' | 'govern' | 'evolve', level: PillarLevel): string => {
  return narratives[pillar][level];
};

export const getSystemNarrative = (
  system: 'friction' | 'decision_quality' | 'system_stability' | 'human_alignment',
  state: SystemState
): string => {
  return narratives.fourDsv[system][state];
};
