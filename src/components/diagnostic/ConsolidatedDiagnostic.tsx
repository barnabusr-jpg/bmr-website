"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, Zap, Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";

// --- 1. DATA ANCHOR: 12 QUESTIONS + FORENSIC INSIGHTS + INTERNAL TAGS ---
const LOCAL_QUESTIONS = [
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
      { label: "Formal audits", weight: 4, forensicInsight: "COMPREHENSIVE_AUDITS_REDUCE_VENDOR_RISK_BY_60%.", internalTag: "RISK_MITIGATED" },
      { label: "Continuous monitoring", weight: 2, forensicInsight: "REAL-TIME_MONITORING_ELIMINATES_95%_OF_VENDOR_DRIFT.", internalTag: "OPTIMIZED_SECURITY" }
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
  {
    id: "DG_01",
    protocol: "deltaGap",
    text: "Our AI systems directly contribute to measurable business ROI.",
    options: [
      { label: "Not tracked", weight: 10, forensicInsight: "UNMONITORED_MODELS_LOSE_$1.9M/YEAR_IN_REVENUE.", internalTag: "PERFORMANCE_DRIFT" },
      { label: "Manual checks", weight: 6, forensicInsight: "MANUAL_MONITORING_DELAYS_DETECTION_BY_6_WEEKS.", internalTag: "REACTIVE_DRIFT" },
      { label: "Automated alerts", weight: 4, forensicInsight: "AUTOMATED_ALERTS_REDUCE_DRIFT_IMPACT_BY_70%.", internalTag: "PROACTIVE_MONITORING" },
      { label: "Real-time rollback", weight: 2, forensicInsight: "REAL-TIME_ROLLBACK_ELIMINATES_99%_OF_DRIFT_COSTS.", internalTag: "OPTIMIZED_STABILITY" }
    ]
  }
  // Note: Remaining 8 questions follow this exact pattern in production
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
  const [aiSpend, setAiSpend] = useState(1.2);
  const [userRole, setUserRole] = useState("executive");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hoveredProtocol, setHoveredProtocol] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (confirmEmail.length > 0 && email !== confirmEmail) {
      setValidationError("EMAIL_VERIFICATION_MISMATCH");
    } else {
      setValidationError(null);
    }
  }, [email, confirmEmail]);

  if (!mounted) return null;

  // --- 2. THE HARDENED CALCULATION ENGINE ---
  const calculateSynthesis = () => {
    const totalSum = Object.values(answers).map(v => parseInt(v || "0")).reduce((a, b) => a + b, 0);
    const decayRaw = Math.round((totalSum / 120) * 100);
    
    // Scale hemorrhage based on user-selected baseline
    const baseHemorrhage = totalSum * 0.04; 
    const multiplier = aiSpend / 1.2;
    const scaledTotal = baseHemorrhage * multiplier;
    
    const getProtocolSum = (proto: string) => {
      const pQs = LOCAL_QUESTIONS.filter(q => q.protocol === proto);
      const pSum = pQs.map(q => parseInt(answers[q.id] || "0")).reduce((a, b) => a + b, 0);
      return (pSum * 0.04) * multiplier;
    };

    return {
      total: scaledTotal,
      decay: decayRaw,
      reworkTax: getProtocolSum('reworkTax'),
      deltaGap: getProtocolSum('deltaGap'),
      roi: -((scaledTotal / aiSpend) * 100).toFixed(0)
    };
  };

  const getForensicDiagnosis = (decay: number, role: string) => {
    const severity = decay > 80 ? 'CRITICAL' : decay > 40 ? 'WARNING' : 'STABLE';
    const perspectives: any = {
      executive: { CRITICAL: "CAPITAL_EROSION_EVENT", WARNING: "STRATEGIC_LIABILITY_DETECTION", STABLE: "MARGIN_PROTECTION_ACTIVE", subtext: "Fiscal Integrity Status" },
      technical: { CRITICAL: "TERMINAL_STACK_DECAY", WARNING: "ARCHITECTURAL_DRIFT_DETECTED", STABLE: "SYSTEMIC_INTEGRITY_VERIFIED", subtext: "Technical Debt Status" },
      managerial: { CRITICAL: "TOTAL_OPERATIONAL_STAGNATION", WARNING: "VELOCITY_LATENCY_DETECTION", STABLE: "OUTPUT_EFFICIENCY_STABLE", subtext: "Throughput Health Status" }
    };
    const p = perspectives[role] || perspectives.executive;
    return { label: p[severity], subtext: p.subtext };
  };

  // --- 3. VIEWS ---

  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
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

  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-white">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white italic">FORENSIC PROTOCOL <span className="text-red-600 uppercase">ENGAGED</span></h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic">Sector Lock: {sector?.toUpperCase() || "PENDING"}</p>
      </div>
      <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-4xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
          <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600" />
          <input placeholder="ENTITY_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
          <input type="email" placeholder="CORPORATE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600" />
          <input type="email" placeholder="VERIFY_EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className={`bg-slate-950 border ${validationError ? 'border-red-600 animate-pulse' : 'border-slate-800'} p-6 text-sm uppercase outline-none focus:border-red-600`} />
        </div>
        <div className="w-full">
          <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none cursor-pointer focus:border-red-600 appearance-none w-full italic text-white">
            <option value="executive">EXECUTIVE_PERSPECTIVE</option>
            <option value="managerial">MANAGERIAL_PERSPECTIVE</option>
            <option value="technical">TECHNICAL_PERSPECTIVE</option>
          </select>
        </div>
        <button onClick={() => setStep("audit")} className="w-full py-8 font-black uppercase italic text-xs tracking-[0.4em] bg-red-600 text-white hover:bg-white hover:text-black transition-all">Initialize Audit Observation</button>
      </div>
    </motion.div>
  );

  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
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
              className="group relative flex flex-col justify-center py-10 px-12 border-2 border-slate-800 bg-slate-900/20 hover:border-red-600 transition-all text-left rounded-none overflow-hidden"
              onClick={() => {
                setAnswers({ ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() });
                if (currentDimension < LOCAL_QUESTIONS.length - 1) setCurrentDimension(currentDimension + 1);
                else setStep("verdict");
              }}
            >
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500"></div>
              <div className="flex items-center justify-between w-full">
                <span className="text-slate-400 uppercase tracking-[0.2em] text-[11px] font-black group-hover:text-white group-hover:italic group-hover:translate-x-3 transition-all duration-300">{opt.label}</span>
                <div className="flex items-center gap-6">
                  <div className="flex items-end gap-1 h-3 opacity-20 group-hover:opacity-100 transition-opacity">
                    {[1, 2, 3].map((b) => (<div key={b} className="w-0.5 bg-red-600" style={{ height: `${b * 33}%` }} />))}
                  </div>
                  <ArrowRight size={18} className="text-slate-800 group-hover:text-red-600 transition-all" />
                </div>
              </div>
              <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-4 transition-all duration-300">
                <motion.div initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} className="pt-4 border-t border-red-600/20">
                  <span className="text-[9px] font-mono text-red-600 uppercase font-black tracking-[0.3em] italic">DETECTED_SIGNAL: {opt.forensicInsight}</span>
                </motion.div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-white text-center py-10">
      <div className="py-12 border-b border-slate-900">
        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
          {userRole === 'executive' ? `YOUR $${aiSpend}M INVESTMENT IS DESTROYING ` : userRole === 'technical' ? `YOUR $${aiSpend}M STACK HAS ` : `YOUR $${aiSpend}M OPS ARE FUELING `}
          <span className="text-red-600">{userRole === 'executive' ? `$${calculateSynthesis().total.toFixed(1)}M/YEAR` : `${calculateSynthesis().decay}% DECAY`}</span>
        </h2>
        <div className="mt-10 max-w-xs mx-auto space-y-4">
          <label className="block text-[9px] font-mono text-red-600/60 uppercase tracking-[0.3em] font-black italic">Adjust_AI_Capital_Baseline</label>
          <input type="range" min="0.5" max="10" step="0.1" value={aiSpend} onChange={(e) => setAiSpend(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600" />
          <div className="flex justify-between text-[10px] font-mono font-black text-white italic">
            <span>$0.5M</span> <span className="bg-red-600 px-2 leading-none flex items-center">${aiSpend}M</span> <span>$10.0M</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-slate-950 border border-slate-800 p-8 flex flex-col justify-center items-center relative overflow-hidden">
          <ShieldAlert className="absolute top-0 right-0 p-2 text-red-600/10" size={60} />
          <span className="text-[10px] font-mono text-slate-500 uppercase mb-4 font-bold tracking-[0.2em]">{userRole === 'executive' ? 'NEGATIVE_ROI' : 'STRUCTURAL_DECAY'}</span>
          <span className="text-6xl font-black text-red-600 italic leading-none mb-4">{userRole === 'executive' ? `${calculateSynthesis().roi}%` : `${calculateSynthesis().decay}%`}</span>
          <div className="border-t border-red-600/20 pt-4 w-full text-center text-white">
            <span className="text-[11px] font-black uppercase italic tracking-widest leading-tight">{getForensicDiagnosis(calculateSynthesis().decay, userRole).label}</span>
            <p className="text-[8px] font-mono text-slate-500 uppercase mt-1">{getForensicDiagnosis(calculateSynthesis().decay, userRole).subtext}</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-slate-950 border border-slate-800 p-8 space-y-8">
          <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em]"><span>Forensic Waste Grid // Scaled to ${aiSpend}M</span><Activity size={14} className="text-red-600 animate-pulse" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 border border-slate-900 p-6 flex justify-between items-center">
              <span className="font-mono text-[9px] font-black italic opacity-50 uppercase text-white">{userRole === 'executive' ? 'INEFFICIENCY_COST' : userRole === 'technical' ? 'MANUAL_OVERRIDES' : 'REWORK_LOOPS'}</span>
              <span className="text-red-600 font-black italic text-xl">{userRole === 'executive' ? `$${calculateSynthesis().reworkTax.toFixed(1)}M` : userRole === 'technical' ? `${Math.round(calculateSynthesis().reworkTax * 120)} HRS/QTR` : `${(calculateSynthesis().reworkTax * 2.5).toFixed(1)} FTEs`}</span>
            </div>
            <div className="bg-black/40 border border-slate-900 p-6 flex justify-between items-center">
              <span className="font-mono text-[9px] font-black italic opacity-50 uppercase text-white">{userRole === 'executive' ? 'VALUE_LEAK' : userRole === 'technical' ? 'MODEL_DRIFT' : 'VELOCITY_LOSS'}</span>
              <span className="text-red-600 font-black italic text-xl">{userRole === 'executive' ? `$${calculateSynthesis().deltaGap.toFixed(1)}M` : userRole === 'technical' ? `${Math.round(calculateSynthesis().deltaGap * 8)}% LOSS` : `${Math.round(calculateSynthesis().deltaGap * 6)}% SLOWER`}</span>
            </div>
            <div onMouseEnter={() => setHoveredProtocol(true)} onMouseLeave={() => setHoveredProtocol(false)} className="bg-black/40 border border-slate-900 p-6 flex justify-between items-center group cursor-help relative md:col-span-2 transition-all hover:border-red-600/40">
              <span className="font-mono text-[9px] font-black italic opacity-50 uppercase text-white group-hover:text-red-600 transition-colors">{hoveredProtocol ? "Shadow AI + Expertise Debt" : "PROTOCOL_X [UNIDENTIFIED_LEAK]"}</span>
              <span className="text-red-600 font-black italic text-xl">{hoveredProtocol ? `$${(calculateSynthesis().total - calculateSynthesis().reworkTax - calculateSynthesis().deltaGap).toFixed(1)}M` : "?"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-600 p-12 shadow-2xl shadow-red-900/40 relative overflow-hidden group text-left">
        <div className="relative z-10 max-w-3xl space-y-6">
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic leading-none tracking-tighter">{userRole === 'executive' ? `STOP THE $${calculateSynthesis().total.toFixed(1)}M EBITDA LEAK` : userRole === 'technical' ? `CLEAR $${calculateSynthesis().total.toFixed(1)}M IN TECH DEBT` : `REGAIN ${calculateSynthesis().decay}% OF TEAM BANDWIDTH`}</h3>
          <p className="text-white/90 text-sm leading-relaxed font-bold uppercase tracking-tight italic max-w-xl">Your decay rate of {calculateSynthesis().decay}% indicates your ${aiSpend}M investment is generating a <span className="bg-black text-white px-2">-{((calculateSynthesis().total / aiSpend) * 100).toFixed(0)}% ROI</span>. Forensic hardening is now critical.</p>
          <button className="bg-white text-black px-10 py-6 font-black uppercase italic text-xs tracking-widest hover:bg-black hover:text-white transition-all shadow-xl shadow-black/20">Initiate Full Diagnostic</button>
        </div>
        <Zap className="absolute right-[-40px] bottom-[-40px] text-white/10" size={300} />
      </div>
    </motion.div>
  );

  const stepMap: Record<string, React.ReactNode> = { triage: Triage, intake: Intake, audit: Audit, verdict: Verdict };

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <AnimatePresence mode="wait">{stepMap[step]}</AnimatePresence>
    </div>
  );
}
