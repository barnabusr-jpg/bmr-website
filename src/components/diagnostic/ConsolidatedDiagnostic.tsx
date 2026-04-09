"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, Zap, Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight, Lock, ChevronRight, Download } from "lucide-react";
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ForensicLoader from "@/components/ForensicLoader";
import LogicLeakTicker from "@/components/LogicLeakTicker";

// --- 1. DATA ANCHOR: FULL 12-QUESTION SET ---
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
      { label: "Formal audits", weight: 4, forensicInsight: "COMPREHENSIVE_AUDITS_REDUCE_VENDOR_RISK_BY_60%.", internalTag: "RISK_MITIGATED" },
      { label: "Continuous monitoring", weight: 2, forensicInsight: "REAL-TIME_MONITORING_ELIMINATES_95%_OF_VENDOR_DRIFT.", internalTag: "OPTIMIZED_SECURITY" }
    ]
  },
  {
    id: "SA_02", protocol: "shadowAI",
    text: "Unauthorized AI tool usage is actively monitored and blocked.",
    options: [
      { label: "No monitoring", weight: 10, forensicInsight: "UNDETECTED_IP_LEAKAGE_COSTS_$1.2M/NODE.", internalTag: "IP_LEAK" },
      { label: "Reactive", weight: 6, forensicInsight: "DELAYED_BLOCKING_EXPOSES_CRITICAL_DATA.", internalTag: "LATENT" },
      { label: "Alerts", weight: 4, forensicInsight: "IMMEDIATE_SIGNALING_REDUCES_UNAUTHORIZED_USE.", internalTag: "DETECT" },
      { label: "Zero-Trust", weight: 2, forensicInsight: "ZERO-TRUST_ARCHITECTURE_ELIMINATES_SHADOW_LOGIC.", internalTag: "ZERO_TRUST" }
    ]
  },
  {
    id: "ED_01", protocol: "expertiseDebt",
    text: "Our data infrastructure can handle real-time AI processing.",
    options: [
      { label: "Legacy", weight: 10, forensicInsight: "INFRASTRUCTURE_DEBT_PENALIZES_SPEED.", internalTag: "TECH_DECAY" },
      { label: "Hybrid", weight: 6, forensicInsight: "LATENCY_FRICTION_CREATES_IDLE_BURNT.", internalTag: "HYBRID_DEBT" },
      { label: "Cloud-native", weight: 4, forensicInsight: "FLOW_REDUCES_OPERATIONAL_OVERHEAD.", internalTag: "CLOUD_SCALE" },
      { label: "Edge", weight: 2, forensicInsight: "PEAK_ARCHITECTURE_MINIMIZES_FRICTION.", internalTag: "PEAK_STACK" }
    ]
  },
  {
    id: "ED_02", protocol: "expertiseDebt",
    text: "We leverage proprietary datasets to train specialized models.",
    options: [
      { label: "Public only", weight: 10, forensicInsight: "RELIANCE_ON_COMMODITY_LOGIC.", internalTag: "DATA_VOID" },
      { label: "Minimal", weight: 6, forensicInsight: "WEAK_ADVANTAGE_INVITES_EROSION.", internalTag: "WEAK" },
      { label: "Significant", weight: 4, forensicInsight: "DATA_FLYWEEL_SHIELDS_POSITION.", internalTag: "DATA_MOAT" },
      { label: "Proprietary", weight: 2, forensicInsight: "IP_MOAT_REDUCES_CAC_BY_50%.", internalTag: "IP_DOMINANCE" }
    ]
  },
  {
    id: "ED_03", protocol: "expertiseDebt",
    text: "API and model versioning are strictly controlled.",
    options: [
      { label: "Manual", weight: 10, forensicInsight: "VERSION_CHAOS_CAUSES_FAILURES.", internalTag: "VERSION_DEBT" },
      { label: "Basic", weight: 6, forensicInsight: "MANUAL_OVERHEAD_DRAINS_VELOCITY.", internalTag: "SEMI_MANUAL" },
      { label: "Automated", weight: 4, forensicInsight: "DEVOPS_STABLE:REDUCED_ERROR_RATE.", internalTag: "AUTOMATED_CI" },
      { label: "MLOps", weight: 2, forensicInsight: "INDUSTRIAL_SCALE_CONTROL.", internalTag: "MLOPS_ELITE" }
    ]
  },
  {
    id: "ED_04", protocol: "expertiseDebt",
    text: "Computing resources (GPU/Cloud) are managed efficiently.",
    options: [
      { label: "High waste", weight: 10, forensicInsight: "MARGIN_EROSION:GPU_WASTE_BURNT.", internalTag: "COST_HEMORRHAGE" },
      { label: "Partial", weight: 6, forensicInsight: "VARIABLE_COST_DEBT_REDUCES_MARGIN.", internalTag: "WASTE_DRIFT" },
      { label: "Managed", weight: 4, forensicInsight: "COST_CONTROL_SHIELDS_STABILITY.", internalTag: "MARGIN_SHIELD" },
      { label: "Hyper", weight: 2, forensicInsight: "MAXIMUM_MARGIN_PROTECTION.", internalTag: "PEAK_PROFIT" }
    ]
  }
];

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState("finance");
  const [aiSpend, setAiSpend] = useState(1.2);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const calculateSynthesis = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const sectorWeights: any = { finance: 1.12, healthcare: 1.08, manufacturing: 1.15, retail: 1.02 };
    const coeff = sectorWeights[sector] || 1.0;
    
    // 🛡️ DYNAMIC ROI CALCULATION
    const multiplier = Math.pow(aiSpend / 1.2, 1.15); 
    const scaledTotal = (totalSum * 0.04 * coeff) * multiplier;
    const decayRaw = Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100);

    return {
      total: scaledTotal || 0,
      decay: Math.min(decayRaw, 98),
      reworkTax: (scaledTotal * 0.38),
      deltaGap: (scaledTotal * 0.32),
      roi: aiSpend > 0 ? -((scaledTotal / aiSpend) * 100).toFixed(1) : "0"
    };
  };

  const getLiveMetrics = () => {
    const data = calculateSynthesis();
    return {
      roi: data.roi,
      decay: data.decay,
      rework: data.reworkTax.toFixed(1),
      delta: data.deltaGap.toFixed(1),
    };
  };

  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-white text-center py-10 px-4">
      <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">
        YOUR INVESTED CAPITAL HAS <span className="text-red-600">{getLiveMetrics().decay}% DECAY</span>
      </h2>

      <div className="max-w-2xl mx-auto mt-12 space-y-12">
        {/* 💰 DYNAMIC MONEY SLIDER + ROI */}
        <div className="bg-slate-950 p-8 border border-slate-900 space-y-8">
          <div className="flex justify-between items-end">
            <div className="text-left">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Capital_Exposure</label>
              <p className="text-3xl font-black italic text-white">${aiSpend.toFixed(1)}M</p>
            </div>
            <div className="text-right">
              <label className="text-[10px] font-mono text-red-600 uppercase tracking-[0.3em]">Dynamic_ROI</label>
              <p className="text-3xl font-black italic text-red-600">{getLiveMetrics().roi}%</p>
            </div>
          </div>
          <input 
            type="range" min="0.1" max="10" step="0.1" 
            value={aiSpend} 
            onChange={(e) => setAiSpend(parseFloat(e.target.value))}
            className="w-full h-1 bg-slate-800 accent-red-600 appearance-none cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-slate-950 border border-slate-900 text-left">
            <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-2">REWORK_TAX_ESTIMATE</p>
            <p className="text-2xl font-black text-white italic">${getLiveMetrics().rework}M / YR</p>
          </div>
          <div className="p-6 bg-slate-950 border border-slate-900 text-left">
            <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-2">LOGIC_DRIFT_PROBABILITY</p>
            <p className="text-2xl font-black text-white italic">{getLiveMetrics().delta}%</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group">
            SECURE_FULL_FORENSIC_BRIEFING <ChevronRight size={16} />
          </button>
          <button 
            onClick={() => window.print()} 
            className="w-full py-4 border border-slate-800 text-slate-400 font-black uppercase italic tracking-[0.2em] text-[10px] hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-4"
          >
            <Download size={14} /> DOWNLOAD_DECAY_SUMMARY_PDF
          </button>
        </div>
        
        {/* 🕵️ RELOCATED ADMIN ENTRANCE (FOOTER AREA) */}
        <div className="pt-20 opacity-20 hover:opacity-100 transition-opacity">
           <Link href="/owner" className="text-[7px] font-mono text-slate-800 uppercase tracking-[0.5em]">
             [ ADMIN_SESSION_START ]
           </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 relative">
      <AnimatePresence mode="wait">
        {step === 'triage' && Triage}
        {/* ... Rest of steps (Intake, Verify, Audit) exactly as before ... */}
        {step === 'verdict' && Verdict}
      </AnimatePresence>
      <LogicLeakTicker />
    </div>
  );
}
