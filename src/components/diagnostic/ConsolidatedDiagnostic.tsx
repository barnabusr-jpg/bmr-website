"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, Zap, Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";

// --- 1. DATA ANCHOR (Self-Contained) ---
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
    id: "DG_01", protocol: "deltaGap",
    text: "Our AI systems directly contribute to measurable business ROI.",
    options: [
      { label: "Not tracked", weight: 10, forensicInsight: "VALUE_LEAKAGE_DETECTED.", internalTag: "DRIFT" },
      { label: "Direct impact", weight: 2, forensicInsight: "OPTIMIZED.", internalTag: "STABLE" }
    ]
  },
  {
    id: "SA_01", protocol: "shadowAI",
    text: "AI vendors are assessed for risk before contract signing.",
    options: [
      { label: "No oversight", weight: 10, forensicInsight: "RISK_DETECTED.", internalTag: "SHADOW" },
      { label: "Continuous", weight: 2, forensicInsight: "SECURE.", internalTag: "SAFE" }
    ]
  },
  {
    id: "ED_01", protocol: "expertiseDebt",
    text: "Our data infrastructure can handle real-time AI processing.",
    options: [
      { label: "Legacy", weight: 10, forensicInsight: "DEBT_DETECTED.", internalTag: "DEBT" },
      { label: "Real-time", weight: 2, forensicInsight: "ELITE.", internalTag: "ELITE" }
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
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hoveredProtocolX, setHoveredProtocolX] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // --- 🛡️ DEFENSIVE HELPERS ---
  const calculateSynthesis = () => {
    if (!answers) return { total: 0, decay: 0, reworkTax: 0, deltaGap: 0, roi: 0 };
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const sectorWeights: any = { finance: 1.12, healthcare: 1.08, manufacturing: 1.15, retail: 1.02 };
    const coeff = sectorWeights[sector] || 1.0;
    const baseHemorrhage = totalSum * 0.04 * coeff;
    const scaledTotal = baseHemorrhage * (aiSpend / 1.2);
    const decayRaw = scaledTotal === 0 ? 0 : Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100);

    return {
      total: scaledTotal || 0,
      decay: Math.min(decayRaw, 98),
      reworkTax: (scaledTotal * 0.35) || 0,
      deltaGap: (scaledTotal * 0.30) || 0,
      roi: aiSpend > 0 ? -((scaledTotal / aiSpend) * 100).toFixed(0) : 0
    };
  };

  const getForensicDiagnosis = (decay: number, role: string) => {
    const perspectives: any = {
      executive: { CRITICAL: "CAPITAL_EROSION_EVENT", WARNING: "STRATEGIC_LIABILITY_DETECTION", STABLE: "MARGIN_PROTECTION_ACTIVE", subtext: "Fiscal Integrity Status" },
      technical: { CRITICAL: "TERMINAL_STACK_DECAY", WARNING: "ARCHITECTURAL_DRIFT_DETECTED", STABLE: "SYSTEMIC_INTEGRITY_VERIFIED", subtext: "Technical Debt Status" },
      managerial: { CRITICAL: "TOTAL_OPERATIONAL_STAGNATION", WARNING: "VELOCITY_LATENCY_DETECTION", STABLE: "OUTPUT_EFFICIENCY_STABLE", subtext: "Throughput Health Status" }
    };
    const p = perspectives[role || "executive"] || perspectives.executive;
    const severity = decay > 80 ? 'CRITICAL' : decay > 40 ? 'WARNING' : 'STABLE';
    return { label: p[severity], subtext: p.subtext };
  };

  if (!mounted) return null;

  // --- RENDERERS ---
  const Triage = (
    <motion.div key="triage" className="space-y-16">
      <h1 className="text-7xl font-black uppercase italic tracking-tighter text-white text-center">THE LOGIC <span className="text-red-600">DECAY SCREENING</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-slate-950 border-2 border-slate-900 hover:border-red-600 text-left flex flex-col justify-between h-48 transition-all group">
            <div className="text-red-600">{s.icon}</div>
            <div><h3 className="text-xl font-black text-white">{s.label}</h3><p className="text-[10px] text-red-600 font-mono font-bold uppercase">{s.risk}</p></div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const Intake = (
    <motion.div key="intake" className="space-y-12 text-white text-center">
      <h2 className="text-5xl font-black italic">FORENSIC PROTOCOL <span className="text-red-600">ENGAGED</span></h2>
      <div className="bg-slate-950 border border-slate-900 p-12 max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-white outline-none focus:border-red-600" />
          <input placeholder="ENTITY_NAME" className="bg-slate-950 border border-slate-800 p-6 text-white outline-none focus:border-red-600" />
        </div>
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 w-full text-white outline-none italic">
          <option value="executive">EXECUTIVE_PERSPECTIVE</option>
          <option value="managerial">MANAGERIAL_PERSPECTIVE</option>
          <option value="technical">TECHNICAL_PERSPECTIVE</option>
        </select>
        <button onClick={() => setStep("audit")} className="w-full py-8 bg-red-600 font-black italic hover:bg-white hover:text-black transition-all">INITIALIZE AUDIT</button>
      </div>
    </motion.div>
  );

  const Audit = (
    <motion.div key="audit" className="space-y-12">
      <h2 className="text-5xl font-black italic text-white min-h-[120px]">{LOCAL_QUESTIONS[currentDimension]?.text}</h2>
      <div className="grid grid-cols-1 gap-4">
        {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
          <button key={i} onClick={() => {
            setAnswers(prev => ({ ...prev, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() }));
            if (currentDimension < LOCAL_QUESTIONS.length - 1) setCurrentDimension(currentDimension + 1);
            else setStep("verdict");
          }} className="group relative py-10 px-12 border-2 border-slate-800 hover:border-red-600 text-left transition-all">
            <span className="text-slate-400 group-hover:text-white uppercase font-black italic">{opt.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const Verdict = (
    <motion.div key="verdict" className="text-white space-y-12 text-center">
      <div className="py-12 border-b border-slate-900">
        <h2 className="text-7xl font-black italic tracking-tighter leading-none">
          {userRole === 'executive' ? 'INVESTMENT LOSS' : 'STACK DECAY'} <span className="text-red-600">${(calculateSynthesis()?.total || 0).toFixed(1)}M</span>
        </h2>
        <div className="mt-8 max-w-md mx-auto space-y-4">
          <input type="range" min="0.5" max="10" step="0.1" value={aiSpend} onChange={(e) => setAiSpend(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-800 appearance-none cursor-pointer accent-red-600" />
          <p className="font-mono text-[10px] text-red-600 font-black italic">BASELINE: ${aiSpend}M</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 text-left">
         <div className="bg-slate-950 border border-slate-800 p-8 text-center">
            <span className="text-6xl font-black text-red-600 italic">{(calculateSynthesis()?.decay || 0)}%</span>
            <p className="text-[11px] font-black italic uppercase mt-4">{(getForensicDiagnosis(calculateSynthesis().decay, userRole).label)}</p>
         </div>
         <div className="col-span-2 bg-slate-950 border border-slate-800 p-8">
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-black p-4 border border-slate-900"><p className="text-red-600 font-black italic">${(calculateSynthesis()?.reworkTax || 0).toFixed(1)}M</p></div>
               <div className="bg-black p-4 border border-slate-900"><p className="text-red-600 font-black italic">${(calculateSynthesis()?.deltaGap || 0).toFixed(1)}M</p></div>
            </div>
         </div>
      </div>
      <div className="bg-red-600 p-12 text-left">
         <h3 className="text-4xl font-black italic">HARDENING REQUIRED</h3>
         <button className="mt-6 bg-white text-black px-10 py-5 font-black italic uppercase hover:bg-black hover:text-white transition-all">Initiate Full Audit</button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <AnimatePresence mode="wait">
        {step === 'triage' && Triage}
        {step === 'intake' && Intake}
        {step === 'audit' && Audit}
        {step === 'verdict' && Verdict}
      </AnimatePresence>
    </div>
  );
}
