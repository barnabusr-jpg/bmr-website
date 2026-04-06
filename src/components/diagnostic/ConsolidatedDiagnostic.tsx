"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, Zap, Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";

// --- 1. DATA ANCHOR: 12 QUESTIONS + FORENSIC INSIGHTS + INTERNAL TAGS ---
const LOCAL_QUESTIONS = [
  // --- REWORK TAX (HAI) ---
  {
    id: "RT_01",
    protocol: "reworkTax",
    text: "AI standard operating procedures (SOPs) are documented and followed.",
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
    options: [
      { label: "Undefined", weight: 10, forensicInsight: "UNAUDITED_DATA_CREATES_$4.7M/YEAR_IN_MODEL_FAILURES.", internalTag: "DATA_DEBT" },
      { label: "Informal roles", weight: 6, forensicInsight: "REACTIVE_AUDITS_MISS_35%_OF_BIAS_RISKS.", internalTag: "PARTIAL_COVERAGE" },
      { label: "Dedicated AI team", weight: 4, forensicInsight: "ANNUAL_AUDITS_REDUCE_DATA_DRIFT_BY_50%.", internalTag: "PROACTIVE_GOVERNANCE" },
      { label: "Cross-functional matrix", weight: 2, forensicInsight: "REAL-TIME_AUDITING_ELIMINATES_90%_OF_DATA_QUALITY_ISSUES.", internalTag: "OPTIMIZED_LINEAGE" }
    ]
  },
  // --- DELTA GAP (AVS) ---
  {
    id: "DG_01",
    protocol: "deltaGap",
    text: "Our AI systems directly contribute to measurable business ROI.",
    options: [
      { label: "Not tracked", weight: 10, forensicInsight: "UNMONITORED_MODELS_LOSE_$1.9M/YEAR_IN_REVENUE.", internalTag: "PERFORMANCE_DRIFT" },
      { label: "Anecdotal evidence", weight: 6, forensicInsight: "MANUAL_MONITORING_DELAYS_DETECTION_BY_6_WEEKS.", internalTag: "REACTIVE_DRIFT" },
      { label: "Specific KPIs", weight: 4, forensicInsight: "AUTOMATED_ALERTS_REDUCE_DRIFT_IMPACT_BY_70%.", internalTag: "PROACTIVE_MONITORING" },
      { label: "Direct impact", weight: 2, forensicInsight: "REAL-TIME_ROLLBACK_ELIMINATES_99%_OF_DRIFT_COSTS.", internalTag: "OPTIMIZED_STABILITY" }
    ]
  },
  {
    id: "DG_02",
    protocol: "deltaGap",
    text: "AI initiatives are aligned with the core strategic vision.",
    options: [
      { label: "Disconnected", weight: 10, forensicInsight: "STRATEGIC_MISALIGNMENT_DRIVES_WASTE_OF_$2.4M/YEAR.", internalTag: "STRATEGIC_DEBT" },
      { label: "Loosely aligned", weight: 6, forensicInsight: "FRAGMENTED_EXECUTION_DILUTES_OVERALL_MARKET_ALPHA.", internalTag: "ALIGNMENT_GAP" },
      { label: "Strategically integrated", weight: 4, forensicInsight: "UNIFIED_LOGIC_ACCELERATES_MARKET_ENTRY_BY_22%.", internalTag: "UNIFIED_GOAL" },
      { label: "Strategy-driven AI", weight: 2, forensicInsight: "PEAK_ALIGNMENT_MAXIMIZES_TOTAL_ADDRESSABLE_MARGIN.", internalTag: "STRATEGY_LEAD" }
    ]
  },
  {
    id: "DG_03",
    protocol: "deltaGap",
    text: "We have a dedicated budget and resources for AI scaling.",
    options: [
      { label: "No budget", weight: 10, forensicInsight: "STAGNATION_COST:COMPETITORS_GAIN_18-MONTH_LEAD.", internalTag: "BUDGET_VOID" },
      { label: "Project-based", weight: 6, forensicInsight: "SCALING_FRICTION_INCREASES_CAPITAL_BURN_BY_35%.", internalTag: "PIECEMEAL_SCALE" },
      { label: "Annual AI budget", weight: 4, forensicInsight: "STABLE_RESOURCING_PROTECTS_LONG-TERM_ASSET_VALUE.", internalTag: "SCALING_STABILITY" },
      { label: "Venture-scale pool", weight: 2, forensicInsight: "LIQUID_RESOURCING_ENABLES_RAPID_OPERATIONAL_PIVOTS.", internalTag: "CAPITAL_FLOW" }
    ]
  },
  {
    id: "DG_04",
    protocol: "deltaGap",
    text: "Customer value is a primary driver for AI implementation.",
    options: [
      { label: "Internal focus", weight: 10, forensicInsight: "INTERNAL_BIAS_MASKS_CRITICAL_REVENUE_CHURN_RISKS.", internalTag: "INTERNAL_BIAS" },
      { label: "Secondary priority", weight: 6, forensicInsight: "LOW_VALUE_CAPTURE_LIMITS_TOTAL_MARKET_EXPANSION.", internalTag: "VALUE_LAG" },
      { label: "Key success metric", weight: 4, forensicInsight: "USER-CENTRIC_LOGIC_DRIVES_15%_LTV_EXPANSION.", internalTag: "USER_CENTERED" },
      { label: "Core proposition", weight: 2, forensicInsight: "MARKET_DOMINANCE_DRIVEN_BY_ELITE_USER_EXPERIENCE.", internalTag: "MARKET_DOMINANCE" }
    ]
  },
  // --- EXPERTISE DEBT (IGF) ---
  {
    id: "ED_01",
    protocol: "expertiseDebt",
    text: "Our data infrastructure can handle real-time AI processing.",
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
    options: [
      { label: "High waste", weight: 10, forensicInsight: "MARGIN_EROSION:GPU_WASTE_EQUALS_$1.2M/YEAR_BURNT.", internalTag: "COST_HEMORRHAGE" },
      { label: "Some optimization", weight: 6, forensicInsight: "VARIABLE_COST_DEBT_REDUCES_NET_MARGINS_BY_12%.", internalTag: "WASTE_DRIFT" },
      { label: "Managed scaling", weight: 4, forensicInsight: "COST_CONTROL_SHIELDS_GROSS_MARGIN_STABILITY.", internalTag: "MARGIN_SHIELD" },
      { label: "Hyper-optimized", weight: 2, forensicInsight: "MAXIMUM_MARGIN_PROTECTION_VIA_LOGIC_EFFICIENCY.", internalTag: "PEAK_PROFIT" }
    ]
  },
  {
    id: "SA_02", // Filling final slot
    protocol: "shadowAI",
    text: "Vendor risk assessments are performed before AI contract signing.",
    options: [
      { label: "No oversight", weight: 10, forensicInsight: "UNGOVERNED_VENDORS_CREATE_$3.1M/YEAR_IN_TOTAL_RISK.", internalTag: "SHADOW_AI" },
      { label: "Basic checks", weight: 6, forensicInsight: "PARTIAL_VISIBILITY_LEAVES_22%_OF_NODES_EXPOSED.", internalTag: "PARTIAL_VISIBILITY" },
      { label: "Formal audits", weight: 4, forensicInsight: "COMPREHENSIVE_AUDITS_REDUCE_LIABILITY_BY_60%.", internalTag: "RISK_MITIGATED" },
      { label: "Continuous monitoring", weight: 2, forensicInsight: "REAL-TIME_OVERSIGHT_ELIMINATES_95%_OF_VENDOR_DRIFT.", internalTag: "OPTIMIZED_SECURITY" }
    ]
  }
];

const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState<string | null>(null);
  const [entityName, setEntityName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => { setMounted(true); }, []);

  // Real-time Email Mismatch detection
  useEffect(() => {
    if (confirmEmail.length > 0 && email !== confirmEmail) {
      setValidationError("EMAIL_VERIFICATION_MISMATCH");
    } else {
      setValidationError(null);
    }
  }, [email, confirmEmail]);

  if (!mounted) return null;

  const calculateSynthesis = () => {
    const getProtocolSum = (proto: string) => {
      const pQs = LOCAL_QUESTIONS.filter(q => q.protocol === proto);
      return pQs.map(q => parseInt(answers[q.id] || "0")).reduce((a, b) => a + b, 0);
    };

    const totalVals = Object.values(answers).map(v => parseInt(v || "0"));
    const totalSum = totalVals.reduce((a, b) => a + b, 0);

    return {
      total: (totalSum * 0.04).toFixed(1), // Total Alpha Hemorrhage
      decay: Math.round((totalSum / 120) * 100),
      reworkTax: (getProtocolSum('reworkTax') * 0.04).toFixed(1),
      deltaGap: (getProtocolSum('deltaGap') * 0.04).toFixed(1)
    };
  };

  // --- TRIAGE VIEW ---
  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
      <div className="text-center">
        <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-white">
          THE LOGIC <span className="text-red-600">DECAY SCREENING</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left flex flex-col justify-between h-48 group">
            <div className="text-red-600 mb-4">{s.icon}</div>
            <div>
              <h3 className="text-xl font-black uppercase italic text-white leading-none">{s.label}</h3>
              <p className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest">{s.risk}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  // --- INTAKE VIEW ---
  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 text-white">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">FORENSIC PROTOCOL <span className="text-red-600 uppercase">ENGAGED</span></h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic">Sector Lock: {sector?.toUpperCase() || "PENDING"}</p>
      </div>
      <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-4xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600 text-white" />
          <input placeholder="ENTITY_NAME" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600 text-white" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="email" placeholder="CORPORATE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className={`bg-slate-950 border ${validationError ? 'border-red-600/30' : 'border-slate-800'} p-6 text-sm uppercase outline-none focus:border-red-600 text-white`} />
          <input type="email" placeholder="VERIFY_EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className={`bg-slate-950 border ${validationError ? 'border-red-600 animate-pulse' : 'border-slate-800'} p-6 text-sm uppercase outline-none focus:border-red-600 text-white`} />
        </div>
        <div className="w-full">
          <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none cursor-pointer focus:border-red-600 appearance-none w-full italic text-white">
            <option value="" disabled>SELECT_OPERATOR_ROLE</option>
            <option value="executive">EXECUTIVE_PERSPECTIVE</option>
            <option value="managerial">MANAGERIAL_PERSPECTIVE</option>
            <option value="technical">TECHNICAL_PERSPECTIVE</option>
          </select>
        </div>
        <div className="h-6 flex items-center justify-center">
            {validationError && <p className="text-red-600 font-mono text-[10px] uppercase font-black animate-pulse tracking-widest">⚠️ {validationError}</p>}
        </div>
        <button 
          disabled={!!validationError || !email || !confirmEmail || !userRole || !entityName}
          onClick={() => setStep("audit")} 
          className="w-full py-8 font-black uppercase italic text-xs tracking-[0.4em] bg-red-600 text-white hover:bg-white hover:text-black transition-all shadow-xl"
        >
          Initialize Audit Observation
        </button>
      </div>
    </motion.div>
  );

  // --- AUDIT VIEW (WITH INSIGHT PULSE) ---
  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
      <div className="space-y-12">
        <div className="flex items-center gap-4 text-red-600">
          <Activity className="h-4 w-4 animate-pulse" />
          <span className="font-black uppercase tracking-[0.4em] text-[10px]">
            PROTOCOL_NODE_0{currentDimension + 1} // ANALYZING_SIGNAL
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-tight min-h-[160px]">
          {LOCAL_QUESTIONS[currentDimension]?.text}
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-16">
          {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
            <button
              key={i}
              className="group relative flex flex-col justify-center py-10 px-12 border-2 border-slate-800 bg-slate-950/20 hover:border-red-600 transition-all text-left rounded-none overflow-hidden"
              onClick={() => {
                setAnswers({ ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() });
                if (currentDimension < LOCAL_QUESTIONS.length - 1) setCurrentDimension(currentDimension + 1);
                else setStep("verdict");
              }}
            >
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500"></div>
              <div className="flex items-center justify-between w-full">
                <span className="text-slate-400 uppercase tracking-[0.2em] text-[11px] font-black group-hover:text-white group-hover:italic group-hover:translate-x-3 transition-all duration-300">
                  {opt.label}
                </span>
                <div className="flex items-center gap-6">
                  <div className="flex items-end gap-1 h-3 opacity-20 group-hover:opacity-100 transition-opacity">
                    {[1, 2, 3].map((b) => (
                      <div key={b} className="w-0.5 bg-red-600" style={{ height: `${b * 33}%` }} />
                    ))}
                  </div>
                  <ArrowRight size={18} className="text-slate-800 group-hover:text-red-600 transition-all group-hover:translate-x-1" />
                </div>
              </div>
              <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-4 transition-all duration-300">
                <motion.div initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} className="pt-4 border-t border-red-600/20">
                  <span className="text-[9px] font-mono text-red-600 uppercase font-black tracking-[0.3em] italic">
                    DETECTED_SIGNAL: {opt.forensicInsight}
                  </span>
                </motion.div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // --- VERDICT VIEW ---
  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 text-white text-center py-10">
      <div className="py-12 border-b border-slate-900">
        <h2 className="text-7xl font-black uppercase italic tracking-tighter leading-none">HEMORRHAGE <span className="text-red-600">${calculateSynthesis().total}M</span></h2>
        <p className="text-slate-500 font-mono text-[10px] mt-4 uppercase tracking-[0.5em] font-bold italic">Forensic Alpha Synthesis Complete</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-slate-950 border border-slate-900 p-8 flex flex-col justify-center items-center relative overflow-hidden">
          <ShieldAlert className="absolute top-0 right-0 p-2 text-red-600/10" size={60} />
          <span className="text-[10px] font-mono text-slate-500 uppercase mb-4 font-bold">Protocol Decay</span>
          <span className="text-6xl font-black text-red-600 italic">{calculateSynthesis().decay}%</span>
        </div>
        <div className="md:col-span-2 bg-slate-950 border border-slate-900 p-8 space-y-8">
          <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em]">
            <span>Protocol Waste Grid</span>
            <Activity size={14} className="text-red-600 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 border border-slate-900 p-6 flex justify-between items-center group transition-colors hover:border-red-600/50">
              <span className="font-mono text-[10px] font-black italic opacity-50 uppercase group-hover:opacity-100 transition-opacity text-white">Rework Tax</span>
              <span className="text-red-600 font-black italic text-xl">${calculateSynthesis().reworkTax}M</span>
            </div>
            <div className="bg-black/40 border border-slate-900 p-6 flex justify-between items-center group transition-colors hover:border-red-600/50">
              <span className="font-mono text-[10px] font-black italic opacity-50 uppercase group-hover:opacity-100 transition-opacity text-white">Delta Gap</span>
              <span className="text-red-600 font-black italic text-xl">${calculateSynthesis().deltaGap}M</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-red-600 p-12 shadow-2xl shadow-red-900/40 relative overflow-hidden group text-left">
        <div className="relative z-10 max-w-2xl space-y-6">
          <h3 className="text-4xl font-black text-white uppercase italic leading-none tracking-tighter">Hardening Required</h3>
          <p className="text-white/90 text-sm leading-relaxed font-bold uppercase tracking-tight italic">This Alpha scan indicates systemic logic drift. To stop the hemorrhage, initialize the full 30-Point Forensic Diagnostic.</p>
          <div className="flex gap-6 items-center">
            <button className="bg-white text-black px-10 py-5 font-black uppercase italic text-xs tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">Initiate Full Engagement</button>
            <span className="text-[9px] font-mono text-white/60 uppercase leading-tight font-black italic border-l border-white/20 pl-4 tracking-tighter">Includes Supplemental<br/>BMR Field Guide</span>
          </div>
        </div>
        <Zap className="absolute right-[-20px] bottom-[-20px] text-white/10 group-hover:text-white/20 transition-all duration-700" size={240} />
      </div>
    </motion.div>
  );

  const stepMap: Record<string, React.ReactNode> = { triage: Triage, intake: Intake, audit: Audit, verdict: Verdict };

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <AnimatePresence mode="wait">
        {stepMap[step]}
      </AnimatePresence>
    </div>
  );
}
