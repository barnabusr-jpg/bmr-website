import { SectorKey, DecisionStage } from "@/types/diagnostic";

export interface SectorConfig {
  label: string;
  failureAddOn: string;
  nodeImpacts: {
    NODE_01: string;
    NODE_02: string;
    NODE_03: string;
    NODE_04: string;
  };
  sowMenu: {
    phase1: Record<"OPTION_A" | "OPTION_B" | "OPTION_C", string>;
    phase2: Record<"OPTION_A" | "OPTION_B" | "OPTION_C", string>;
    phase3: Record<"OPTION_A" | "OPTION_B" | "OPTION_C", string>;
  };
}

export const SECTOR_COPY_REGISTRY: Record<SectorKey, SectorConfig> = {
  FINANCE: {
    label: "FINANCIAL SERVICES SECTOR",
    failureAddOn: "...impacting reconciliations and risk reporting consistency.",
    nodeImpacts: {
      NODE_01: "Executive vision diverges from live execution, creating governance friction and audit trail gaps.",
      NODE_02: "High failure rate; teams spend time on reconciliation fixes and payload rejections.",
      NODE_03: "Manual verification fatigue leads to delayed trade and transaction exception triage.",
      NODE_04: "Fragile execution under live transaction volume variability."
    },
    sowMenu: {
      phase1: {
        OPTION_A: "Deploy non-blocking validation telemetry and audit logging across ledger boundaries.",
        OPTION_B: "Implement verification gates pausing unverified payloads pending administrative review.",
        OPTION_C: "Enforce strict structural validation thresholds with automated containment and immediate exception routing."
      },
      phase2: {
        OPTION_A: "Suppress secondary reconciliation alert loops and publish manual recovery runbooks.",
        OPTION_B: "Implement standardized dependency isolation to reduce repetitive manual ledger corrections.",
        OPTION_C: "Deploy operational containment workflows for high-variability trading processes."
      },
      phase3: {
        OPTION_A: "Quarterly control plane reassessments prior to major release rollouts.",
        OPTION_B: "Automated continuous verification pipelines with real-time risk index tracking.",
        OPTION_C: "Board-level steering dashboards with compliance-ready audit reporting artifacts."
      }
    }
  },
  HEALTHCARE: {
    label: "HEALTHCARE AND LIFE SCIENCES SECTOR",
    failureAddOn: "...impacting verification of protected workflows and audit readiness.",
    nodeImpacts: {
      NODE_01: "Executive oversight lacks runtime telemetry, increasing compliance audit delays.",
      NODE_02: "EHR ingestion failures and protocol drift force repetitive manual data cleanup.",
      NODE_03: "Clinical queue alert fatigue leads to delayed resolution and staff burnout.",
      NODE_04: "Unverified patient data actions operating without mandatory execution boundaries."
    },
    sowMenu: {
      phase1: {
        OPTION_A: "Deploy non-blocking validation logging across HIPAA and BAA ingestion points.",
        OPTION_B: "Implement verification gates pausing unverified protected data flows pending review.",
        OPTION_C: "Enforce strict FHIR/HL7 validation thresholds with containment boundaries."
      },
      phase2: {
        OPTION_A: "Suppress secondary clinical alert loops and publish standard recovery runbooks.",
        OPTION_B: "Implement dependency isolation to reduce repetitive EHR data correction loops.",
        OPTION_C: "Deploy operational containment workflows for high-variability clinical queues."
      },
      phase3: {
        OPTION_A: "Quarterly compliance control assessments prior to system updates.",
        OPTION_B: "Automated verification pipelines tracking patient data handling controls.",
        OPTION_C: "Executive risk dashboards with HIPAA and BAA aligned reporting artifacts."
      }
    }
  },
  INDUSTRIAL: {
    label: "INDUSTRIAL AND SUPPLY CHAIN SECTOR",
    failureAddOn: "...impacting telemetry-to-decision stability and line reliability.",
    nodeImpacts: {
      NODE_01: "Leadership visibility gap regarding telemetry drift and operational downtime.",
      NODE_02: "Signal variation and SCADA data shifts trigger operational pipeline halts.",
      NODE_03: "SCADA alarm noise causes operator escalation latency and line bottlenecks.",
      NODE_04: "Unmonitored PLC and telemetry inputs creating process instability."
    },
    sowMenu: {
      phase1: {
        OPTION_A: "Deploy telemetry monitoring and logging across SCADA and IoT signal boundaries.",
        OPTION_B: "Implement verification gates pausing unmonitored telemetry signals pending review.",
        OPTION_C: "Enforce strict operational signal thresholds with fail-safe containment rules."
      },
      phase2: {
        OPTION_A: "Suppress secondary alarm loops and publish standardized line recovery runbooks.",
        OPTION_B: "Implement dependency isolation to reduce manual equipment troubleshooting loops.",
        OPTION_C: "Deploy operational containment workflows for high-variability production lines."
      },
      phase3: {
        OPTION_A: "Quarterly operational control reassessments prior to automation expansion.",
        OPTION_B: "Automated telemetry verification pipelines with line health index tracking.",
        OPTION_C: "Plant executive dashboards with continuous operational safety reporting."
      }
    }
  },
  SERVICES: {
    label: "ENTERPRISE SERVICES AND IT SECTOR",
    failureAddOn: "...impacting ticket outcomes and operational throughput consistency.",
    nodeImpacts: {
      NODE_01: "Governance policy lacks execution telemetry, causing margin erosion on deliverables.",
      NODE_02: "Unstructured client input formats lead to repetitive delivery team firefighting.",
      NODE_03: "Ticket volume spikes and alert noise cause triage fatigue and SLA slippage.",
      NODE_04: "Uncontrolled service delivery variability at operator execution level."
    },
    sowMenu: {
      phase1: {
        OPTION_A: "Deploy non-blocking input validation telemetry across client interface portals.",
        OPTION_B: "Implement verification gates pausing unstructured inputs pending lead review.",
        OPTION_C: "Enforce strict client payload format validation with automated exception routing."
      },
      phase2: {
        OPTION_A: "Suppress secondary service alert loops and publish manual recovery runbooks.",
        OPTION_B: "Implement dependency isolation to reduce manual ticket correction cycles.",
        OPTION_C: "Deploy operational containment workflows for high-variability service queues."
      },
      phase3: {
        OPTION_A: "Quarterly service delivery control reassessments prior to expansion.",
        OPTION_B: "Automated verification pipelines tracking SLA compliance risk in real time.",
        OPTION_C: "Executive steering dashboards with SLA and margin efficiency reporting artifacts."
      }
    }
  }
};

export interface StageModifier {
  recommendedEmphasis: string;
  riskFramingHeader: string;
  sowPhase1Timeline: string;
  sowPhase2Timeline: string;
  sowPhase3Timeline: string;
}

export const DECISION_STAGE_REGISTRY: Record<DecisionStage, StageModifier> = {
  ROLLOUT_SAFETY: {
    recommendedEmphasis: "Pre-Deployment Safety (Primary focus: establishing deployment gates prior to expansion)",
    riskFramingHeader: "UNMANAGED PRE-DEPLOYMENT EXPOSURE",
    sowPhase1Timeline: "Weeks 1 to 2 (Pre-Rollout)",
    sowPhase2Timeline: "Weeks 3 to 4 (Staging)",
    sowPhase3Timeline: "Weeks 5 to 6 (Gate Activation)"
  },
  ACTIVE_STABILIZATION: {
    recommendedEmphasis: "Active Stabilization (Primary focus: containment of repeat operational rework)",
    riskFramingHeader: "UNMANAGED OPERATIONAL DRIFT EXPOSURE",
    sowPhase1Timeline: "Weeks 1 to 3 (Immediate)",
    sowPhase2Timeline: "Weeks 4 to 6 (Isolation)",
    sowPhase3Timeline: "Weeks 7 to 8 (Verification)"
  },
  AUDIT_READINESS: {
    recommendedEmphasis: "Audit Readiness & Governance (Primary focus: establishing verifiable control trails)",
    riskFramingHeader: "UNMANAGED COMPLIANCE AND AUDIT EXPOSURE",
    sowPhase1Timeline: "Weeks 1 to 2 (Audit Prep)",
    sowPhase2Timeline: "Weeks 3 to 5 (Trail Logging)",
    sowPhase3Timeline: "Weeks 6 to 7 (Sign-Off)"
  }
};
