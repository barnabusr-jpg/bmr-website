"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, Zap, Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight, Lock } from "lucide-react";
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

const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState("finance");
  const [aiSpend, setAiSpend] = useState(1.2);
  const [userRole, setUserRole] = useState("executive");
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // 🛡️ VERIFICATION STATE
  const [serverChallenge, setServerChallenge] = useState("");
  const [userInputKey, setUserInputKey] = useState("");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (confirmEmail.length > 0 && email !== confirmEmail) {
      setValidationError("EMAIL_VERIFICATION_MISMATCH");
    } else {
      setValidationError(null);
    }
  }, [email, confirmEmail]);

  if (!mounted) return null;

  const calculateSynthesis = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const sectorWeights: any = { finance: 1.12, healthcare: 1.08, manufacturing: 1.15, retail: 1.02 };
    const coeff = sectorWeights[sector] || 1.0;
    const multiplier = Math.pow(aiSpend / 1.2, 1.15); 
    const scaledTotal = (totalSum * 0.04 * coeff) * multiplier;
    const decayRaw = scaledTotal === 0 ? 0 : Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100);

    return {
      total: scaledTotal || 0,
      decay: Math.min(decayRaw, 98),
      reworkTax: (scaledTotal * 0.38),
      deltaGap: (scaledTotal * 0.32),
      roi: aiSpend > 0 ? -((scaledTotal / aiSpend) * 100).toFixed(0) : 0
    };
  };

  const getForensicDiagnosis = (decay: number, role: string) => {
    const severity = decay > 80 ? 'CRITICAL' : decay > 60 ? 'EMERGENCY' : decay > 40 ? 'WARNING' : 'STABLE';
    const perspectives: any = {
      executive: { CRITICAL: "CAPITAL_EROSION_EVENT", EMERGENCY: "CRITICAL_SYSTEMIC_FAILURE", WARNING: "STRATEGIC_LIABILITY_DETECTION", STABLE: "MARGIN_PROTECTION_ACTIVE", subtext: "Fiscal Integrity Status" },
      technical: { CRITICAL: "TERMINAL_STACK_DECAY", EMERGENCY: "INFRASTRUCTURE_COLLAPSE_RISK", WARNING: "ARCHITECTURAL_DRIFT_DETECTED", STABLE: "SYSTEMIC_INTEGRITY_VERIFIED", subtext: "Technical Debt Status" },
      managerial: { CRITICAL: "TOTAL_OPERATIONAL_STAGNATION", EMERGENCY: "BANDWIDTH_HEMORRHAGE", WARNING: "VELOCITY_LATENCY_DETECTION", STABLE: "OUTPUT_EFFICIENCY_STABLE", subtext: "Throughput Health Status" }
    };
    const p = perspectives[role || "executive"] || perspectives.executive;
    return { label: p[severity], subtext: p.subtext };
  };

  const getLiveMetrics = () => {
    const data = calculateSynthesis();
    return {
      roi: data.roi,
      total: data.total.toFixed(1),
      decay: data.decay,
      rework: data.reworkTax.toFixed(1),
      delta: data.deltaGap.toFixed(1),
      hidden: (data.total - data.reworkTax - data.deltaGap).toFixed(1)
    };
  };

  // 🛡️ TRIGGER: Fires SendGrid and captures the challenge key
  const triggerForensicScan = async (nextStep: string) => {
    if (step === "intake") {
      setIsLoading(true);
      setValidationError(null);

      try {
        const res = await fetch('/api/auth/generate-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (res.ok) {
          setServerChallenge(data.challenge); // Store the code for later validation
          console.log("HANDSHAKE_VERIFIED");
        } else {
          setIsLoading(false);
          setValidationError("TRANSMISSION_REJECTED");
        }
      } catch (err) {
        setIsLoading(false);
        setValidationError("LOGIC_SHEAR_DETECTION");
      }
    } else {
      setIsLoading(true);
    }
  };

  const finalizeStepTransition = () => {
    // 🛡️ NEW GATE: Intake moves to Verify, not Audit
    if (step === "intake") setStep("verify");
    else if (step === "audit") setStep("verdict");
    setIsLoading(false);
  };

  const validateOperatorKey = () => {
    if (userInputKey === serverChallenge) {
      setStep("audit");
      setValidationError(null);
    } else {
      setValidationError("INVALID_NODE_AUTHORIZATION");
    }
  };

  // --- SUB-RENDERERS ---

  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16 px-4">
      <div className="text-center">
        <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none">THE LOGIC <span className="text-red-600">DECAY SCREENING</span></h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left flex flex-col justify-between h-48 group">
            <div className="text-red-600 mb-4">{s.icon}</div>
            <div>
              <h3 className="text-xl font-black uppercase italic text-white leading-none tracking-tighter">{s.label}</h3>
              <p className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest">{s.risk}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-white">
      <div className="text-center space-y-3 px-4">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white leading-none tracking-tighter">FORENSIC PROTOCOL <span className="text-red-600 uppercase">ENGAGED</span></h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic">Sector Lock: {sector?.toUpperCase() || "PENDING"}</p>
      </div>
      <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-4xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
          <div className="space-y-2">
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-2">Operator_Identity</label>
            <input placeholder="E.G. JOHN_DOE" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600 text-white w-full transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-2">Entity_Name</label>
            <input placeholder="E.G. ACME_CORP" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600 text-white w-full transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white px-4 md:px-0">
          <div className="space-y-2">
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-2">Corporate_Email</label>
            <input type="email" placeholder="EMAIL@ENTITY.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600 w-full transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-2">Verify_Protocol</label>
            <input type="email" placeholder="CONFIRM_EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className={`bg-slate-950 border ${validationError ? 'border-red-600 animate-pulse' : 'border-slate-800'} p-6 text-sm uppercase outline-none focus:border-red-600 w-full transition-all`} />
          </div>
        </div>
        <div className="h-4 flex items-center justify-center">
            {validationError && <p className="text-red-600 font-mono text-[9px] uppercase font-black tracking-[0.3em] italic animate-pulse">⚠️ {validationError}</p>}
        </div>
        <button disabled={!!validationError || !email || !confirmEmail || !entityName || !operatorName} onClick={() => triggerForensicScan("audit")} className="w-full py-8 font-black uppercase italic text-xs tracking-[0.4em] bg-red-600 text-white hover:bg-white hover:text-black transition-all shadow-xl">Initialize Audit Observation</button>
      </div>
    </motion.div>
  );

  const Verify = (
    <motion.div key="verify" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-12">
       <div className="space-y-4">
          <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white">VERIFICATION_<span className="text-red-600">REQUIRED</span></h2>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">Key Transmitted to {email}. Enter 6-digit code for node authorization.</p>
       </div>
       <div className="max-w-md mx-auto flex gap-4">
          <input 
            maxLength={6}
            placeholder="0 0 0 0 0 0" 
            value={userInputKey}
            onChange={(e) => setUserInputKey(e.target.value)}
            className="flex-grow bg-slate-950 border-2 border-slate-900 p-8 text-4xl text-center font-black tracking-[0.5em] text-white outline-none focus:border-red-600 transition-all"
          />
          <button onClick={validateOperatorKey} className="bg-white text-black px-10 font-black uppercase text-xs italic tracking-widest hover:bg-red-600 hover:text-white transition-all">Authorize</button>
       </div>
       {validationError && <p className="text-red-600 font-mono text-[9px] uppercase font-black tracking-widest italic animate-pulse">{validationError}</p>}
       <button onClick={() => setStep("intake")} className="text-slate-600 font-mono text-[9px] uppercase tracking-widest hover:text-white transition-colors">Back to Request</button>
    </motion.div>
  );

  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="space-y-12 px-4">
        <div className="flex items-center gap-4 text-red-600">
          <Activity className="h-4 w-4 animate-pulse" />
          <span className="font-black uppercase tracking-[0.4em] text-[10px]">PROTOCOL_NODE_0{currentDimension + 1} // ANALYZING_SIGNAL</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-tight min-h-[160px]">
          {LOCAL_QUESTIONS[currentDimension]?.text}
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-16">
          {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
            <button key={i} className="group relative flex flex-col justify-center py-10 px-12 border-2 border-slate-800 bg-slate-950/20 hover:border-red-600 transition-all text-left rounded-none overflow-hidden"
              onClick={() => {
                setAnswers({ ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() });
                if (currentDimension < LOCAL_QUESTIONS.length - 1) setCurrentDimension(currentDimension + 1);
                else setStep("verdict");
              }}>
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500"></div>
              <div className="flex items-center justify-between w-full">
                <span className="text-slate-400 uppercase tracking-[0.2em] text-[11px] font-black group-hover:text-white group-hover:italic group-hover:translate-x-3 transition-all duration-300">{opt.label}</span>
                <ArrowRight size={18} className="text-slate-800 group-hover:text-red-600 transition-all group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-white text-center py-10 px-4">
       <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">
          YOUR INVESTED CAPITAL HAS <span className="text-red-600">{getLiveMetrics().decay}% DECAY</span>
       </h2>
       {/* (Remaining Verdict logic from previous file) */}
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 relative">
      <AnimatePresence mode="wait">
        {isLoading && <ForensicLoader onComplete={finalizeStepTransition} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 'triage' && Triage}
        {step === 'intake' && Intake}
        {step === 'verify' && Verify}
        {step === 'audit' && Audit}
        {step === 'verdict' && Verdict}
      </AnimatePresence>
      <LogicLeakTicker />
    </div>
  );
}
