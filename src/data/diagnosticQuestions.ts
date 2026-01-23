// Diagnostic questions organized by dimension
// 12 dimensions × 3 questions = 36 total questions
// Mapped to Trust (1-4), Govern (5-8), Evolve (9-12)

export interface Question {
  id: string;
  text: string;
}

export interface DiagnosticDimension {
  id: string;
  title: string;
  description: string;
  cluster: 'trust' | 'govern' | 'evolve';
  questions: Question[];
}

export const diagnosticDimensions: DiagnosticDimension[] = [
  // TRUST CLUSTER (Dimensions 1-4)
  {
    id: "transparency",
    title: "Transparency",
    description: "How clearly the AI system's behavior and decisions are communicated to users.",
    cluster: "trust",
    questions: [
      { id: "t1-q1", text: "The AI system clearly explains why it makes specific recommendations." },
      { id: "t1-q2", text: "Users understand what data the AI uses to generate outputs." },
      { id: "t1-q3", text: "The reasoning behind AI decisions is accessible and understandable." },
    ],
  },
  {
    id: "predictability",
    title: "Predictability",
    description: "The consistency and reliability of AI system behavior across different contexts.",
    cluster: "trust",
    questions: [
      { id: "t2-q1", text: "The AI system behaves consistently across similar situations." },
      { id: "t2-q2", text: "Users can anticipate how the AI will respond to their inputs." },
      { id: "t2-q3", text: "The AI produces reliable results that users can depend on." },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    description: "How effectively information about the AI system is shared across the organization.",
    cluster: "trust",
    questions: [
      { id: "t3-q1", text: "There is clear communication about how AI fits into daily workflows." },
      { id: "t3-q2", text: "Updates to AI capabilities are communicated effectively to users." },
      { id: "t3-q3", text: "Users receive adequate guidance on when and how to use the AI." },
    ],
  },
  {
    id: "confidence",
    title: "Confidence",
    description: "The level of user trust and willingness to rely on AI outputs.",
    cluster: "trust",
    questions: [
      { id: "t4-q1", text: "Users feel confident in the accuracy of AI-generated outputs." },
      { id: "t4-q2", text: "Teams trust the AI enough to incorporate it into critical decisions." },
      { id: "t4-q3", text: "There is minimal hesitation when using AI recommendations." },
    ],
  },

  // GOVERN CLUSTER (Dimensions 5-8)
  {
    id: "policy-alignment",
    title: "Policy Alignment",
    description: "How well AI operations align with organizational policies and standards.",
    cluster: "govern",
    questions: [
      { id: "g1-q1", text: "AI usage follows clearly defined organizational policies." },
      { id: "g1-q2", text: "There are established guidelines for appropriate AI use cases." },
      { id: "g1-q3", text: "AI decisions align with our organization's ethical standards." },
    ],
  },
  {
    id: "oversight",
    title: "Oversight",
    description: "The structures and processes for monitoring and reviewing AI operations.",
    cluster: "govern",
    questions: [
      { id: "g2-q1", text: "There are clear processes for reviewing AI outputs before action." },
      { id: "g2-q2", text: "Human oversight is built into critical AI-assisted workflows." },
      { id: "g2-q3", text: "There are defined escalation paths when AI outputs are questionable." },
    ],
  },
  {
    id: "accountability",
    title: "Accountability",
    description: "Clarity around roles and responsibilities for AI-related decisions.",
    cluster: "govern",
    questions: [
      { id: "g3-q1", text: "Roles and responsibilities for AI decisions are clearly defined." },
      { id: "g3-q2", text: "There is clear ownership when AI-assisted decisions need correction." },
      { id: "g3-q3", text: "Teams know who to contact when AI-related issues arise." },
    ],
  },
  {
    id: "risk-management",
    title: "Risk Management",
    description: "How effectively AI-related risks are identified, assessed, and mitigated.",
    cluster: "govern",
    questions: [
      { id: "g4-q1", text: "Potential risks from AI usage are systematically identified." },
      { id: "g4-q2", text: "There are controls in place to mitigate AI-related risks." },
      { id: "g4-q3", text: "Risk assessments inform decisions about AI deployment." },
    ],
  },

  // EVOLVE CLUSTER (Dimensions 9-12)
  {
    id: "learning",
    title: "Learning",
    description: "How the organization learns from AI interactions and improves over time.",
    cluster: "evolve",
    questions: [
      { id: "e1-q1", text: "Feedback from AI usage is collected and acted upon." },
      { id: "e1-q2", text: "Teams actively share learnings about effective AI use." },
      { id: "e1-q3", text: "Insights from AI performance drive continuous improvement." },
    ],
  },
  {
    id: "adaptability",
    title: "Adaptability",
    description: "The organization's ability to adjust workflows as AI capabilities change.",
    cluster: "evolve",
    questions: [
      { id: "e2-q1", text: "Teams can quickly adapt when AI capabilities are updated." },
      { id: "e2-q2", text: "Workflows are flexible enough to incorporate AI improvements." },
      { id: "e2-q3", text: "Change related to AI is managed smoothly across the organization." },
    ],
  },
  {
    id: "innovation",
    title: "Innovation",
    description: "How actively the organization explores new AI applications and improvements.",
    cluster: "evolve",
    questions: [
      { id: "e3-q1", text: "There is active exploration of new AI use cases." },
      { id: "e3-q2", text: "Teams are encouraged to experiment with AI capabilities." },
      { id: "e3-q3", text: "Innovation with AI is supported by leadership." },
    ],
  },
  {
    id: "scaling",
    title: "Scaling",
    description: "Readiness to expand AI adoption across the organization.",
    cluster: "evolve",
    questions: [
      { id: "e4-q1", text: "There is a clear roadmap for expanding AI usage." },
      { id: "e4-q2", text: "Infrastructure can support increased AI deployment." },
      { id: "e4-q3", text: "Success criteria for AI scaling are well defined." },
    ],
  },
];

// 4DSV mapping - which questions contribute to each system metric
export const fourDsvMapping = {
  friction: ["t1-q1", "t2-q1", "t2-q3", "t3-q1", "e2-q2"], // Transparency, predictability, communication, adaptability
  decision_quality: ["t1-q1", "t1-q3", "g1-q3", "g2-q1", "g3-q1"], // Transparency, policy, oversight, accountability
  system_stability: ["t2-q1", "t2-q2", "t2-q3", "g4-q2", "g4-q3"], // Predictability, risk management
  human_alignment: ["t3-q3", "g2-q2", "g3-q1", "g3-q2", "e1-q1"], // Communication, oversight, accountability, learning
};
