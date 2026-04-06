"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, Zap, Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";

// --- 1. FULL 12-QUESTION HARDENED DATA SET ---
const LOCAL_QUESTIONS = [
  {
    id: "RT_01", protocol: "reworkTax",
    text: "AI standard operating procedures (SOPs) are documented and followed.",
    options: [
      { label: "Non-existent", weight: 10, forensicInsight: "TRIBAL_KNOWLEDGE_DEPENDENCY_CREATES_$5.2M/YEAR_IN_REWORK.", internalTag: "LOGIC_FRAGMENTATION" },
      { label: "Ad-hoc/Manual", weight: 6, forensicInsight: "VARIABLE_OUTPUT_QUALITY_INCREASES_COMPLIANCE_RISK_BY_40%.", internalTag: "EXPERTISE_SILOS" },
      { label: "Formalized", weight: 4, forensicInsight: "STANDARDIZED_LOGIC_REDUCES_MARGIN_EROSION_BY_12%.", internalTag: "STRUCTURAL_CLARITY" },
      { label: "Automated/Optimized", weight: 2, forensicInsight: "AUTOMATED_GOVERNANCE_UNLOCKS_30%_FASTER_ITERATIONS.", internalTag: "OPTIMIZED_FLOW" }
    ]
  },
  {
    id: "RT_02", protocol: "reworkTax",
    text: "Our organization has a clear AI ethics and governance framework.",
    options: [
      { label: "No framework", weight: 10, forensicInsight: "UNGOVERNED_LOGIC_INVITES_$3.1M/YEAR_IN_REGULATORY_FINES.", internalTag: "GOVERNANCE_VOID" },
      { label: "Basic guidelines", weight: 6, forensicInsight: "PARTIAL_ASSESSMENTS_LEAVE_22%_OF_RISKS_UNCOVERED.", internalTag: "PARTIAL_VISIBILITY" },
      { label: "Formal audits", weight: 4, forensicInsight: "COMPREHENSIVE_AUDITS_REDUCE_VENDOR_RISK_BY_60%.", internalTag: "RISK_MITIGATED" },
      { label: "Continuous monitoring", weight: 2, forensicInsight: "REAL-TIME_MONITORING_ELIMINATES_95%_OF_VENDOR_DRIFT.", internalTag: "OPTIMIZED_SECURITY" }
    ]
  },
  {
    id: "RT_03", protocol: "reworkTax",
    text: "AI roles and responsibilities are clearly defined across teams.",
    options: [
      { label: "Undefined", weight: 10, forensicInsight: "UNAUDITED_ROLES_CREATE_$4.7M/YEAR_IN_OPERATIONAL_FAILURES.", internalTag: "ROLE_DEBT" },
      { label: "Informal roles", weight: 6, forensicInsight: "REACTIVE_ROLES_MISS_35%_OF_EFFICIENCY_GAINS.", internalTag: "PARTIAL_COVERAGE" },
      { label: "Dedicated AI team", weight: 4, forensicInsight: "PROACTIVE_GOVERNANCE_REDUCES_ROLE_DRIFT_BY_50%.", internalTag: "STABLE_OVERSIGHT" },
      { label: "Cross-functional matrix", weight: 2, forensicInsight: "REAL-TIME_ROLE_AUDITING_ELIMINATES_90%_OF_LABOR_WASTE.", internalTag: "OPTIMIZED_LINEAGE" }
    ]
  },
  {
    id: "DG_01", protocol: "deltaGap",
    text: "Our AI systems directly contribute to measurable business ROI.",
    options: [
      { label: "Not tracked", weight: 10, forensicInsight: "UNMONITORED_MODELS_LOSE_$1.9M/YEAR_IN_REVENUE.", internalTag: "PERFORMANCE_DRIFT" },
      { label: "Anecdotal evidence", weight: 6, forensicInsight: "MANUAL_MONITORING_DELAYS_DETECTION_BY_6_WEEKS.", internalTag: "REACTIVE_DRIFT" },
      { label: "Specific KPIs", weight: 4, forensicInsight: "AUTOMATED_ALERTS_REDUCE_DRIFT_IMPACT_BY_70%.", internalTag: "PROACTIVE_MONITORING" },
      { label: "Direct impact", weight: 2, forensicInsight: "REAL-TIME_ROLLBACK_ELIMINATES_99%_OF_DRIFT_COSTS.", internalTag: "OPTIMIZED_STABILITY" }
    ]
  },
  {
    id: "DG_02", protocol: "deltaGap",
    text: "AI initiatives are aligned with the core strategic vision.",
    options: [
      { label: "Disconnected", weight: 10, forensicInsight: "STRATEGIC_MISALIGNMENT_DRIVES_WASTE_OF_$2.4M/YEAR.", internalTag: "STRATEGIC_DEBT" },
      { label: "Loosely aligned", weight: 6, forensicInsight: "FRAGMENTED_EXECUTION_DILUTES_MARKET_ALPHA.", internalTag: "ALIGNMENT_GAP" },
      { label: "Integrated", weight: 4, forensicInsight: "ALIGNED_GROWTH_REDUCES_MARKET_LATENCY.", internalTag: "UNIFIED" },
      { label: "Strategy-driven", weight: 2, forensicInsight: "UNIFIED_VISION_MAXIMIZES_MARGINS.", internalTag: "LEAD" }
    ]
  },
  {
    id: "DG_03", protocol: "deltaGap",
    text: "We have a dedicated budget and resources for AI scaling.",
    options: [
      { label: "No budget", weight: 10, forensicInsight: "STAGNATION_COST:COMPETITORS_GAIN_18-MONTH_LEAD.", internalTag: "VOID" },
      { label: "Project-based", weight: 6, forensicInsight: "SCALING_FRICTION_INCREASES_CAPITAL_BURN.", internalTag: "PIECEMEAL" },
      { label: "Annual budget", weight: 4, forensicInsight: "STABLE_RESOURCING_PROTECTS_ASSETS.", internalTag: "STABLE" },
      { label: "Venture-scale", weight: 2, forensicInsight: "LIQUID_RESOURCING_ENABLES_RAPID_PIVOTS.", internalTag: "LIQUID" }
    ]
  },
  {
    id: "SA_01", protocol: "shadowAI",
    text: "AI vendors are assessed for risk before contract signing.",
    options: [
      { label: "No oversight", weight: 10, forensicInsight: "UNGOVERNED_VENDORS_CREATE_$3.1M_IN_RISK.", internalTag: "SHADOW" },
      { label: "Basic checks", weight: 6, forensicInsight: "PARTIAL_VISIBILITY_LEAVE_NODES_EXPOSED.", internalTag: "PARTIAL" },
      { label: "Formal audits", weight: 4, forensicInsight: "COMPREHENSIVE_AUDITS_REDUCE_LIABILITY.", internalTag: "MITIGATED" },
      { label: "Continuous", weight: 2, forensicInsight: "REAL-TIME_OVERSIGHT_ELIMINATES_95%_OF_DRIFT.", internalTag: "SAFE" }
    ]
  },
  {
    id: "SA_02", protocol: "shadowAI",
    text: "Unauthorized AI tool usage is actively monitored and blocked.",
    options: [
      { label: "No monitoring", weight: 10, forensicInsight: "UNDETECTED_IP_LEAKAGE_COSTS_ESTIMATED_AT_$1.2M/NODE.", internalTag: "IP_LEAK" },
      { label: "Reactive", weight: 6, forensicInsight: "DELAYED_BLOCKING_EXPOSES_CRITICAL_DATA.", internalTag: "LATENT" },
      { label: "Automated alerts", weight: 4, forensicInsight: "IMMEDIATE_SIGNALING_REDUCES_UNAUTHORIZED_USE.", internalTag: "DETECT" },
      { label: "Zero-Trust", weight: 2, forensicInsight: "ZERO-TRUST_ARCHITECTURE_ELIMINATES_SHADOW_LOGIC.", internalTag: "ZERO_TRUST" }
    ]
  },
  {
    id: "ED_01", protocol: "expertiseDebt",
    text: "Our data infrastructure can handle real-time AI processing.",
    options: [
      { label: "Legacy/Siloed", weight: 10, forensicInsight: "INFRASTRUCTURE_DEBT_PENALIZES_OUTPUT_SPEED_BY_60%.", internalTag: "TECH_DECAY" },
      { label: "Partially integrated", weight: 6, forensicInsight: "LATENCY_FRICTION_CREATES_$800K/YEAR_IN_IDLE_BURNT.", internalTag: "HYBRID_DEBT" },
      { label: "Cloud-native", weight: 4, forensicInsight: "TECHNICAL_FLOW_REDUCES_OPERATIONAL_OVERHEAD.", internalTag: "CLOUD_SCALE" },
      { label: "Edge", weight: 2, forensicInsight: "PEAK_ARCHITECTURE_MINIMIZES_TOTAL_LOGIC_FRICTION.", internalTag: "PEAK_STACK" }
    ]
  },
  {
    id: "ED_02", protocol: "expertiseDebt",
    text: "We leverage proprietary datasets to train specialized models.",
    options: [
      { label: "Public data only", weight: 10, forensicInsight: "ZERO_COMPETITIVE_EDGE:RELIANCE_ON_COMMODITY_LOGIC.", internalTag: "DATA_VOID" },
      { label: "Minimal internal", weight: 6, forensicInsight: "LOW_DEFENSIBILITY_INCREASES_MARKET_FRAGILITY.", internalTag: "WEAK_ADVANTAGE" },
      { label: "Significant internal", weight: 4, forensicInsight: "DATA_ADVANTAGE_CREATES_PROPRIETARY_FLYWEEL.", internalTag: "DATA_MOAT" },
      { label: "Proprietary flywheel", weight: 2, forensicInsight: "UNFAIR_ADVANTAGE:IP_MOAT_REDUCES_CAC_BY_50%.", internalTag: "IP_DOMINANCE" }
    ]
  },
  {
    id: "ED_03", protocol: "expertiseDebt",
    text: "API and model versioning are strictly controlled.",
    options: [
      { label: "Manual/Inconsistent", weight: 10, forensicInsight: "VERSION_CHAOS_CAUSES_UNDETECTED_LOGIC_FAILURES.", internalTag: "VERSION_DEBT" },
      { label: "Basic versioning", weight: 6, forensicInsight: "MANUAL_OVERHEAD_REDUCES_DEV_VELOCITY_BY_30%.", internalTag:
