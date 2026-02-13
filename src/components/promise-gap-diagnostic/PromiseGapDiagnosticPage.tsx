const diagnosticQuestions = [
  // HAI ZONE
  { 
    id: 1, lens: "HAI", 
    text: "Why do frontline teams manually verify AI outputs before sharing them with stakeholders?", 
    options: [
      { label: "AI is unreliable and requires constant oversight.", strength: 5, weight: 8, vector: "Calibrate Empirical Trust" },
      { label: "Manual verification is faster than fixing the AI system.", strength: 5, weight: 8, vector: "Optimize Interface Utility" },
      { label: "We lack clear guidelines on when to trust the AI.", strength: 3, weight: 3, vector: "Standardize Trust Protocols" },
      { label: "Manual verification is an industry compliance requirement.", strength: 2, weight: 1, vector: "Audit Compliance Overlays" },
      { label: "We don’t manually verify—the AI is fully trusted.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 2, lens: "HAI", 
    text: "When an AI error occurs, why does it often take days to identify the cause?", 
    options: [
      { label: "We don't track errors; we just fix them and move on.", strength: 5, weight: 8, vector: "Instrument Error Logging" },
      { label: "We rely on ad-hoc investigations rather than formal processes.", strength: 4, weight: 5, vector: "Formalize Forensic Retrospectives" },
      { label: "Our team lacks the training to diagnose algorithmic errors.", strength: 3, weight: 3, vector: "Synchronize Change Management" },
      { label: "Diagnosis is slowed by a lack of automated tracking tools.", strength: 2, weight: 1, vector: "Automate Root-Cause Diagnosis" },
      { label: "Errors are diagnosed in hours via automated tracking.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 3, lens: "HAI", 
    text: "Why do teams sometimes bypass the AI and use manual processes instead?", 
    options: [
      { label: "The AI is slower or less reliable than manual work.", strength: 5, weight: 8, vector: "Neutralize Operational Friction" },
      { label: "The AI doesn’t handle edge cases effectively.", strength: 4, weight: 5, vector: "Expand Algorithmic Scope" },
      { label: "Teams aren’t trained to use the AI effectively.", strength: 3, weight: 3, vector: "Synchronize Change Management" },
      { label: "Manual work is required for compliance or audits.", strength: 2, weight: 1, vector: "Integrate Audit Workflows" },
      { label: "The AI is fully trusted and never bypassed.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 4, lens: "HAI", 
    text: "Why does the organization maintain a static risk appetite despite AI performance changes?", 
    options: [
      { label: "We don’t track AI performance for risk decisions.", strength: 5, weight: 8, vector: "Establish Risk Telemetry" },
      { label: "Our governance structure is not built for dynamic updates.", strength: 4, weight: 5, vector: "Implement Adaptive Risk Logic" },
      { label: "We only adjust risk appetite after a major failure occurs.", strength: 3, weight: 3, vector: "Predictive Risk Modeling" },
      { label: "Risk reviews are scheduled but not tied to real-time data.", strength: 2, weight: 1, vector: "Increase Review Frequency" },
      { label: "Risk models are dynamically updated via AI performance data.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  // AVS ZONE
  { 
    id: 5, lens: "AVS", 
    text: "Why are AI projects sometimes launched without a formal risk review?", 
    options: [
      { label: "We prioritize deployment speed over structural stability.", strength: 5, weight: 8, vector: "Stabilize Deployment Guardrails" },
      { label: "Risk reviews are perceived as bureaucratic bottlenecks.", strength: 3, weight: 3, vector: "Streamline Governance Cycles" },
      { label: "We lack the internal resources to conduct thorough reviews.", strength: 3, weight: 3, vector: "Augment Review Capacity" },
      { label: "We assume low-risk projects do not require formal review.", strength: 2, weight: 1, vector: "Formalize Risk Tiering" },
      { label: "We never bypass formal risk reviews.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 6, lens: "AVS", 
    text: "When an AI failure occurs, why is responsibility often unclear?", 
    options: [
      { label: "No designated leader is held accountable for AI outcomes.", strength: 5, weight: 8, vector: "Map Accountability Pathways" },
      { label: "Teams often argue over which department 'owns' the fix.", strength: 4, weight: 5, vector: "Formalize Ownership Matrix" },
      { label: "Responsibility is assigned ad-hoc after the failure occurs.", strength: 3, weight: 3, vector: "Standardize Escalation Paths" },
      { label: "Ownership is clear, but the notification process is slow.", strength: 2, weight: 1, vector: "Optimize Response Latency" },
      { label: "Designated leaders own the fix and are notified instantly.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 7, lens: "AVS", 
    text: "Why is compliance treated as a one-time 'checkbox' at launch?", 
    options: [
      { label: "Leadership prioritizes deployment speed over ongoing audits.", strength: 5, weight: 8, vector: "Instrument Persistent Oversight" },
      { label: "We assume compliance remains static once the model is live.", strength: 4, weight: 5, vector: "Deploy Continuous Monitoring" },
      { label: "Ongoing compliance monitoring is too resource-intensive.", strength: 3, weight: 3, vector: "Automate Compliance Telemetry" },
      { label: "We only conduct continuous compliance for 'high-risk' models.", strength: 2, weight: 1, vector: "Define Dynamic Compliance Standards" },
      { label: "Compliance is audited as a continuous requirement.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 8, lens: "AVS", 
    text: "Why does it take significant human effort to keep AI tools running?", 
    options: [
      { label: "The AI requires constant manual correction of outputs.", strength: 5, weight: 8, vector: "Identify Stability Root Causes" },
      { label: "We lack automated monitoring for model maintenance.", strength: 4, weight: 5, vector: "Automate Maintenance Telemetry" },
      { label: "The AI is in an early stage where high manual overhead is expected.", strength: 3, weight: 3, vector: "Accelerate Maturity Roadmap" },
      { label: "Human hours are focused on training rather than maintenance.", strength: 2, weight: 1, vector: "Optimize Training Cycles" },
      { label: "AI tools run autonomously with minimal human intervention.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  // IGF ZONE
  { 
    id: 9, lens: "IGF", 
    text: "Why are human corrections rarely fed back into the AI model?", 
    options: [
      { label: "We do not have a system for making model corrections.", strength: 5, weight: 8, vector: "Establish Feedback Architecture" },
      { label: "Human corrections are not systematically tracked or logged.", strength: 4, weight: 5, vector: "Close the Feedback Circuit" },
      { label: "Feedback is only shared ad-hoc for critical errors.", strength: 3, weight: 3, vector: "Formalize Correction Ingestion" },
      { label: "Corrections are logged manually but reviewed infrequently.", strength: 2, weight: 1, vector: "Automate Training Loops" },
      { label: "Corrections are automatically incorporated into the model.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 10, lens: "IGF", 
    text: "Why does leadership focus on 'features' rather than human 'impact'?", 
    options: [
      { label: "Innovation and speed are prioritized over operational ROI.", strength: 5, weight: 8, vector: "Restore Strategic Alignment" },
      { label: "Leadership lacks clear visibility into frontline human impact.", strength: 4, weight: 5, vector: "Restore Executive Visibility" },
      { label: "Stakeholder pressure demands constant feature rollout.", strength: 3, weight: 3, vector: "Manage Strategic Expectations" },
      { label: "We are in an early adoption stage where features take priority.", strength: 2, weight: 1, vector: "Define Maturity Thresholds" },
      { label: "Leadership balances technical features and human impact equally.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 11, lens: "IGF", 
    text: "Why are AI projects paused because teams aren't ready for change?", 
    options: [
      { label: "Leadership pushes deployments faster than change management allows.", strength: 5, weight: 8, vector: "Synchronize Change Readiness" },
      { label: "The organization lacks proper AI training frameworks.", strength: 4, weight: 5, vector: "Deploy Cultural Stabilization" },
      { label: "The strategic impact of AI was never clearly communicated.", strength: 4, weight: 5, vector: "Standardize Impact Reporting" },
      { label: "Projects are deprioritized in favor of higher-priority work.", strength: 2, weight: 1, vector: "Assess Resource Allocation" },
      { label: "Teams are fully trained and aligned for every deployment.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 12, lens: "IGF", 
    text: "Why isn't the 'Promise Gap' (expected vs. actual ROI) measured?", 
    options: [
      { label: "No specific leader is assigned to track AI value realization.", strength: 5, weight: 8, vector: "Assign ROI Stewardship" },
      { label: "We lack the internal tools to measure actual business impact.", strength: 4, weight: 5, vector: "Instrument the Promise Gap™" },
      { label: "Our focus is on innovation scale, not immediate ROI metrics.", strength: 4, weight: 5, vector: "Pivot to Value Realization" },
      { label: "We are still piloting benchmarks for ROI measurement.", strength: 2, weight: 1, vector: "Pilot ROI Benchmarks" },
      { label: "We formally measure ROI against initial expectations.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  }
];
