import { diagnosticDimensions, fourDsvMapping } from "@/data/diagnosticQuestions";
import { 
  PillarLevel, 
  SystemState, 
  getPillarNarrative, 
  getSystemNarrative 
} from "@/data/diagnosticNarratives";

export interface PillarResult {
  title: string;
  score: number;
  level: PillarLevel;
  narrative: string;
  colorClass: string;
}

export interface SystemResult {
  title: string;
  key: 'friction' | 'decision_quality' | 'system_stability' | 'human_alignment';
  score: number;
  state: SystemState;
  stateLabel: string;
  narrative: string;
}

export interface DiagnosticScores {
  pillars: PillarResult[];
  systems: SystemResult[];
  overallLevel: PillarLevel;
}

// Calculate average score from answers for specific question IDs
const calculateAverage = (answers: Record<string, string>, questionIds: string[]): number => {
  const validAnswers = questionIds
    .map(id => parseInt(answers[id] || "0"))
    .filter(v => v > 0);
  
  if (validAnswers.length === 0) return 0;
  return validAnswers.reduce((sum, v) => sum + v, 0) / validAnswers.length;
};

// Convert numeric score (1-5) to pillar level
const scoreToPillarLevel = (score: number): PillarLevel => {
  if (score >= 4) return "high";
  if (score >= 2.5) return "moderate";
  return "low";
};

// Convert numeric score (1-5) to system state
const scoreToSystemState = (score: number): SystemState => {
  if (score >= 4) return "strong";
  if (score >= 2.5) return "variable";
  return "at_risk";
};

// Format system state for display
const formatSystemState = (state: SystemState): string => {
  const labels: Record<SystemState, string> = {
    strong: "Strong",
    variable: "Variable",
    at_risk: "At Risk"
  };
  return labels[state];
};

// Get all question IDs for a specific cluster
const getClusterQuestionIds = (cluster: 'trust' | 'govern' | 'evolve'): string[] => {
  return diagnosticDimensions
    .filter(d => d.cluster === cluster)
    .flatMap(d => d.questions.map(q => q.id));
};

export const calculateDiagnosticScores = (answers: Record<string, string>): DiagnosticScores => {
  // Calculate pillar scores
  const trustQuestions = getClusterQuestionIds('trust');
  const governQuestions = getClusterQuestionIds('govern');
  const evolveQuestions = getClusterQuestionIds('evolve');

  const trustScore = calculateAverage(answers, trustQuestions);
  const governScore = calculateAverage(answers, governQuestions);
  const evolveScore = calculateAverage(answers, evolveQuestions);

  const trustLevel = scoreToPillarLevel(trustScore);
  const governLevel = scoreToPillarLevel(governScore);
  const evolveLevel = scoreToPillarLevel(evolveScore);

  const pillars: PillarResult[] = [
    {
      title: "Trust",
      score: trustScore,
      level: trustLevel,
      narrative: getPillarNarrative('trust', trustLevel),
      colorClass: "bg-accent/20",
    },
    {
      title: "Govern",
      score: governScore,
      level: governLevel,
      narrative: getPillarNarrative('govern', governLevel),
      colorClass: "bg-secondary/20",
    },
    {
      title: "Evolve",
      score: evolveScore,
      level: evolveLevel,
      narrative: getPillarNarrative('evolve', evolveLevel),
      colorClass: "bg-emerald-500/20",
    },
  ];

  // Calculate 4DSV system scores
  const frictionScore = calculateAverage(answers, fourDsvMapping.friction);
  const decisionScore = calculateAverage(answers, fourDsvMapping.decision_quality);
  const stabilityScore = calculateAverage(answers, fourDsvMapping.system_stability);
  const alignmentScore = calculateAverage(answers, fourDsvMapping.human_alignment);

  const frictionState = scoreToSystemState(frictionScore);
  const decisionState = scoreToSystemState(decisionScore);
  const stabilityState = scoreToSystemState(stabilityScore);
  const alignmentState = scoreToSystemState(alignmentScore);

  const systems: SystemResult[] = [
    {
      title: "Friction Reduction",
      key: "friction",
      score: frictionScore,
      state: frictionState,
      stateLabel: formatSystemState(frictionState),
      narrative: getSystemNarrative('friction', frictionState),
    },
    {
      title: "Decision Quality",
      key: "decision_quality",
      score: decisionScore,
      state: decisionState,
      stateLabel: formatSystemState(decisionState),
      narrative: getSystemNarrative('decision_quality', decisionState),
    },
    {
      title: "System Stability",
      key: "system_stability",
      score: stabilityScore,
      state: stabilityState,
      stateLabel: formatSystemState(stabilityState),
      narrative: getSystemNarrative('system_stability', stabilityState),
    },
    {
      title: "Human Alignment",
      key: "human_alignment",
      score: alignmentScore,
      state: alignmentState,
      stateLabel: formatSystemState(alignmentState),
      narrative: getSystemNarrative('human_alignment', alignmentState),
    },
  ];

  // Calculate overall level based on average of pillar scores
  const overallScore = (trustScore + governScore + evolveScore) / 3;
  const overallLevel = scoreToPillarLevel(overallScore);

  return {
    pillars,
    systems,
    overallLevel,
  };
};
