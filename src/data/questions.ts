export interface Option {
  label: string;
  weight: number;
  forensicInsight: string; // The "Sting" for the UI (Dollar-denominated)
  internalTag: string;      // The BMR proprietary category (Hidden from UI)
}

export interface Question {
  id: string;
  protocol: 'reworkTax' | 'shadowAI' | 'expertiseDebt' | 'deltaGap';
  text: string;
  options: Option[];
  fieldGuideRef: string;
}

export const FORENSIC_QUESTIONS: Question[] = [
  // --- PROTOCOL: REWORK TAX (HAI Alignment) ---
  {
    id: "RT_01",
    protocol: "reworkTax",
    text: "AI standard operating procedures (SOPs) are documented and followed.",
    fieldGuideRef: "FG-BMR-RT-01",
    options: [
      { label: "Non-existent", weight: 10, forensicInsight: "TRIBAL_KNOWLEDGE_DEPENDENCY_CREATES_$5.2M/YEAR_IN_REWORK.", internalTag: "LOGIC_FRAGMENTATION" },
      { label: "Ad-hoc/Manual", weight: 6, forensicInsight: "VARIABLE_OUTPUT_QUALITY_INCREASES_COMPLIANCE_RISK_BY_40%.", internalTag: "EXPERTISE_SILOS" },
      { label: "Formalized", weight: 4, forensicInsight: "STANDARDIZED_LOGIC_REDUCES_MARGIN_EROSION_BY_12%.", internalTag: "STRUCTURAL_CLARITY" },
      { label: "Automated/Optimized", weight: 2, forensicInsight: "AUTOMATED_GOVERNANCE_UNLOCKS_30%_FASTER_ITERATIONS.", internalTag: "OPTIMIZED_FLOW" }
    ]
  },
  {
    id: "RT_02",
    protocol: "reworkTax",
    text: "Our organization has a clear AI ethics and governance framework.",
    fieldGuideRef: "FG-BMR-RT-02",
    options: [
      { label: "No framework", weight: 10, forensicInsight: "UNGOVERNED_LOGIC_INVITES_$3.1M/YEAR_IN_REGULATORY_FINES.", internalTag: "GOVERNANCE_VOID" },
      { label: "Basic guidelines", weight: 6, forensicInsight: "PARTIAL_ASSESSMENTS_LEAVE_22%_OF_RISKS_UNCOVERED.", internalTag: "PARTIAL_VISIBILITY" },
      { label: "Comprehensive policy", weight: 4, forensicInsight: "COMPREHENSIVE_AUDITS_REDUCE_VENDOR_RISK_BY_60%.", internalTag: "RISK_MITIGATED" },
      { label: "Audited compliance", weight: 2, forensicInsight: "REAL-TIME_MONITORING_ELIMINATES_95%_OF_VENDOR_DRIFT.", internalTag: "OPTIMIZED_SECURITY" }
    ]
  },
  {
    id: "RT_03",
    protocol: "reworkTax",
    text: "AI roles and responsibilities are clearly defined across teams.",
    fieldGuideRef: "FG-BMR-RT-03",
    options: [
      { label: "Undefined", weight: 10, forensicInsight: "UNAUDITED_ROLES_CREATE_$4.7M/YEAR_IN_OPERATIONAL_FAILURES.", internalTag: "ROLE_DEBT" },
      { label: "Informal roles", weight: 6, forensicInsight: "REACTIVE_ROLES_MISS_35%_OF_EFFICIENCY_GAINS.", internalTag: "PARTIAL_COVERAGE" },
      { label: "Dedicated AI team", weight: 4, forensicInsight: "PROACTIVE_GOVERNANCE_REDUCES_ROLE_DRIFT_BY_50%.", internalTag: "STABLE_OVERSIGHT" },
      { label: "Cross-functional matrix", weight: 2, forensicInsight: "REAL-TIME_ROLE_AUDITING_ELIMINATES_90%_OF_LABOR_WASTE.", internalTag: "OPTIMIZED_LINEAGE" }
    ]
  },

  // --- PROTOCOL: DELTA GAP (AVS Alignment) ---
  {
    id: "DG_01",
    protocol: "deltaGap",
    text: "Our AI systems directly contribute to measurable business ROI.",
    fieldGuideRef: "FG-BMR-DG-01",
    options: [
      { label: "Not tracked", weight: 10, forensicInsight: "UNMONITORED_MODELS_LOSE_$1.9M/YEAR_IN_REVENUE.", internalTag: "PERFORMANCE_DRIFT" },
      { label: "Anecdotal evidence", weight: 6, forensicInsight: "MANUAL_MONITORING_DELAYS_DETECTION_BY_6_WEEKS.", internalTag: "REACTIVE_DRIFT" },
      { label: "Specific KPIs", weight: 4, forensicInsight: "AUTOMATED_ALERTS_REDUCE_DRIFT_IMPACT_BY_70%.", internalTag: "PROACTIVE_MONITORING" },
      { label: "Direct revenue impact", weight: 2, forensicInsight: "REAL-TIME_ROLLBACK_ELIMINATES_99%_OF_DRIFT_COSTS.", internalTag: "OPTIMIZED_STABILITY" }
    ]
  },
  {
    id: "DG_02",
    protocol: "deltaGap",
    text: "AI initiatives are aligned with the core strategic vision.",
    fieldGuideRef: "FG-BMR-DG-02",
    options: [
      { label: "Disconnected", weight: 10, forensicInsight: "STRATEGIC_MISALIGNMENT_DRIVES_WASTE_OF_$2.4M/YEAR.", internalTag: "STRATEGIC_DEBT" },
      { label: "Loosely aligned", weight: 6, forensicInsight: "FRAGMENTED_EXECUTION_DILUTES_OVERALL_MARKET_ALPHA.", internalTag: "ALIGNMENT_GAP" },
      { label: "Strategically integrated", weight: 4, forensicInsight: "ALIGNED_GROWTH_REDUCES_MARKET_ENTRY_LATENCY_BY_22%.", internalTag: "UNIFIED_GOAL" },
      { label: "Strategy-driven AI", weight: 2, forensicInsight: "UNIFIED_VISION_MAXIMIZES_TOTAL_ADDRESSABLE_MARGIN.", internalTag: "STRATEGY_LEAD" }
    ]
  },
  {
    id: "DG_03",
    protocol: "deltaGap",
    text: "We have a dedicated budget and resources for AI scaling.",
    fieldGuideRef: "FG-BMR-DG-03",
    options: [
      { label: "No budget", weight: 10, forensicInsight: "STAGNATION_COST:COMPETITORS_GAIN_18-MONTH_LEAD.", internalTag: "BUDGET_VOID" },
      { label: "Project-based funding", weight: 6, forensicInsight: "SCALING_FRICTION_INCREASES_CAPITAL_BURN_BY_35%.", internalTag: "PIECEMEAL_SCALE" },
      { label: "Annual AI budget", weight: 4, forensicInsight: "STABLE_RESOURCING_PROTECTS_LONG-TERM_ASSET_VALUE.", internalTag: "SCALING_STABILITY" },
      { label: "Venture-scale pool", weight: 2, forensicInsight: "LIQUID_RESOURCING_ENABLES_RAPID_OPERATIONAL_PIVOTS.", internalTag: "CAPITAL_FLOW" }
    ]
  },

  // --- PROTOCOL: SHADOW AI ---
  {
    id: "SA_01",
    protocol: "shadowAI",
    text: "AI vendors are assessed for risk before contract signing.",
    fieldGuideRef: "FG-BMR-SA-01",
    options: [
      { label: "No oversight", weight: 10, forensicInsight: "UNGOVERNED_VENDORS_CREATE_$3.1M/YEAR_IN_TOTAL_RISK.", internalTag: "SHADOW_AI" },
      { label: "Basic checks", weight: 6, forensicInsight: "PARTIAL_VISIBILITY_LEAVES_22%_OF_NODES_EXPOSED.", internalTag: "PARTIAL_VISIBILITY" },
      { label: "Formal audits", weight: 4, forensicInsight: "COMPREHENSIVE_AUDITS_REDUCE_LIABILITY_BY_60%.", internalTag: "RISK_MITIGATED" },
      { label: "Continuous monitoring", weight: 2, forensicInsight: "REAL-TIME_OVERSIGHT_ELIMINATES_95%_OF_VENDOR_DRIFT.", internalTag: "OPTIMIZED_SECURITY" }
    ]
  },
  {
    id: "SA_02",
    protocol: "shadowAI",
    text: "Unauthorized AI tool usage is actively monitored and blocked.",
    fieldGuideRef: "FG-BMR-SA-02",
    options: [
      { label: "No monitoring", weight: 10, forensicInsight: "UNDETECTED_IP_LEAKAGE_COSTS_ESTIMATED_AT_$1.2M/NODE.", internalTag: "IP_LEAKAGE" },
      { label: "Reactive only", weight: 6, forensicInsight: "DELAYED_BLOCKING_EXPOSES_CRITICAL_DATA_FOR_WEEKS.", internalTag: "LATENT_RISK" },
      { label: "Automated alerts", weight: 4, forensicInsight: "IMMEDIATE_SIGNALING_REDUCES_UNAUTHORIZED_USE_BY_70%.", internalTag: "DETECT_MODE" },
      { label: "Real-time CASB", weight: 2, forensicInsight: "ZERO-TRUST_ARCHITECTURE_ELIMINATES_SHADOW_LOGIC.", internalTag: "ZERO_TRUST" }
    ]
  },

  // --- PROTOCOL: EXPERTISE DEBT (IGF Alignment) ---
  {
    id: "ED_01",
    protocol: "expertiseDebt",
    text: "Our data infrastructure can handle real-time AI processing.",
    fieldGuideRef: "FG-BMR-ED-01",
    options: [
      { label: "Legacy/Siloed", weight: 10, forensicInsight: "INFRASTRUCTURE_DEBT_PENALIZES_OUTPUT_SPEED_BY_60%.", internalTag: "TECH_DECAY" },
      { label: "Partially integrated", weight: 6, forensicInsight: "LATENCY_PENALTY_CREATES_$800K/YEAR_IN_IDLE_BURNT.", internalTag: "HYBRID_DEBT" },
      { label: "Cloud-native", weight: 4, forensicInsight: "TECHNICAL_FLOW_REDUCES_OPERATIONAL_OVERHEAD_BY_20%.", internalTag: "CLOUD_SCALE" },
      { label: "Edge/Real-time", weight: 2, forensicInsight: "PEAK_ARCHITECTURE_MINIMIZES_TOTAL_LOGIC_FRICTION.", internalTag: "PEAK_STACK" }
    ]
  },
  {
    id: "ED_02",
    protocol: "expertiseDebt",
    text: "We leverage proprietary datasets to train specialized models.",
    fieldGuideRef: "FG-BMR-ED-02",
    options: [
      { label: "Public data only", weight: 10, forensicInsight: "COMMODITY_LOGIC_ELIMINATES_COMPETITIVE_DEFENSIBILITY.", internalTag: "DATA_VOID" },
      { label: "Minimal internal", weight: 6, forensicInsight: "WEAK_DATA_MOAT_INVITES_AGGRESSIVE_MARKET_EROSION.", internalTag: "WEAK_ADVANTAGE" },
      { label: "Significant internal", weight: 4, forensicInsight: "PROPRIETARY_DATA_FLYWEEL_SHIELDS_MARKET_POSITION.", internalTag: "DATA_MOAT" },
      { label: "Proprietary flywheel", weight: 2, forensicInsight: "UNFAIR_ADVANTAGE_REDUCES_CUSTOMER_ACQUISITION_COSTS.", internalTag: "IP_DOMINANCE" }
    ]
  },
  {
    id: "ED_03",
    protocol: "expertiseDebt",
    text: "API and model versioning are strictly controlled.",
    fieldGuideRef: "FG-BMR-ED-03",
    options: [
      { label: "Manual/Inconsistent", weight: 10, forensicInsight: "VERSION_CHAOS_LEADS_TO_UNDETECTED_LOGIC_FAILURES.", internalTag: "VERSION_DEBT" },
      { label: "Basic versioning", weight: 6, forensicInsight: "MANUAL_VERSIONING_OVERHEAD_DRAINS_DEV_VELOCITY.", internalTag: "SEMI_MANUAL" },
      { label: "Automated pipelines", weight: 4, forensicInsight: "DEVOPS_STABILITY_REDUCES_ERROR_RATES_BY_45%.", internalTag: "AUTOMATED_CI" },
      { label: "Full MLOps", weight: 2, forensicInsight: "INDUSTRIAL_SCALE_CONTROL_ELIMINATES_VERSION_DRIFT.", internalTag: "MLOPS_ELITE" }
    ]
  },
  {
    id: "ED_04",
    protocol: "expertiseDebt",
    text: "Computing resources (GPU/Cloud) are managed efficiently.",
    fieldGuideRef: "FG-BMR-ED-04",
    options: [
      { label: "High waste", weight: 10, forensicInsight: "MARGIN_EROSION:GPU_WASTE_EQUALS_$1.2M/YEAR_BURNT.", internalTag: "COST_HEMORRHAGE" },
      { label: "Some optimization", weight: 6, forensicInsight: "VARIABLE_COST_DEBT_REDUCES_NET_MARGINS_BY_12%.", internalTag: "WASTE_DRIFT" },
      { label: "Managed scaling", weight: 4, forensicInsight: "COST_CONTROL_SHIELDS_GROSS_MARGIN_STABILITY.", internalTag: "MARGIN_SHIELD" },
      { label: "Hyper-optimized", weight: 2, forensicInsight: "MAXIMUM_MARGIN_PROTECTION_VIA_LOGIC_EFFICIENCY.", internalTag: "PEAK_PROFIT" }
    ]
  }
];
