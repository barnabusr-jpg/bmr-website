"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, Zap, Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";

// --- 1. DATA ANCHOR: YOUR 12 QUESTIONS MAPPED TO BMR PROTOCOLS ---
const LOCAL_QUESTIONS = [
  {
    id: "RT_01",
    protocol: "reworkTax",
    text: "AI standard operating procedures (SOPs) are documented and followed.",
    options: [
      { label: "Non-existent", weight: 10, impact: "High Rework Risk" },
      { label: "Ad-hoc/Manual", weight: 6, impact: "Manual Friction" },
      { label: "Formalized", weight: 4, impact: "Managed Risk" },
      { label: "Automated/Optimized", weight: 2, impact: "Zero Waste" }
    ]
  },
  {
    id: "RT_02",
    protocol: "reworkTax",
    text: "Our organization has a clear AI ethics and governance framework.",
    options: [
      { label: "No framework", weight: 10, impact: "Compliance Hemorrhage" },
      { label: "Basic guidelines", weight: 6, impact: "Policy Drift" },
      { label: "Comprehensive policy", weight: 4, impact: "Stable" },
      { label: "Audited compliance", weight: 2, impact: "Shielded" }
    ]
  },
  {
    id: "RT_03",
    protocol: "reworkTax",
    text: "AI roles and responsibilities are clearly defined across teams.",
    options: [
      { label: "Undefined", weight: 10, impact: "Logic Fragmentation" },
      { label: "Informal roles", weight: 6, impact: "Expertise Silos" },
      { label: "Dedicated AI team", weight: 4, impact: "Structural Clarity" },
      { label: "Cross-functional matrix", weight: 2, impact: "Optimized Flow" }
    ]
  },
  {
    id: "SA_01",
    protocol: "shadowAI",
    text: "We conduct regular AI risk assessments and impact audits.",
    options: [
      { label: "Never", weight: 10, impact: "Critical Exposure" },
      { label: "Rarely/Reactive", weight: 6, impact: "Invisible Drift" },
      { label: "Annually", weight: 4, impact: "Baseline Security" },
      { label: "Continuous monitoring", weight: 2, impact: "Proactive Defense" }
    ]
  },
  {
    id: "DG_01",
    protocol: "deltaGap",
    text: "Our AI systems directly contribute to measurable business ROI.",
    options: [
      { label: "Not tracked", weight: 10, impact: "Value Leakage" },
      { label: "Anecdotal evidence", weight: 6, impact: "Unverified Gains" },
      { label: "Specific KPIs", weight: 4, impact: "ROI Traceable" },
      { label: "Direct revenue impact", weight: 2, impact: "ROI Maximized" }
    ]
  },
  {
    id: "DG_02",
    protocol: "deltaGap",
    text: "AI initiatives are aligned with the core strategic vision.",
    options: [
      { label: "Disconnected", weight: 10, impact: "Capital Waste" },
      { label: "Loosely aligned", weight: 6, impact: "Strategic Drift" },
      { label: "Strategically integrated", weight: 4, impact: "Aligned Growth" },
      { label: "Strategy-driven AI", weight: 2, impact: "Unified Vision" }
    ]
  },
  {
    id: "DG_03",
    protocol: "deltaGap",
    text: "We have a dedicated budget and resources for AI scaling.",
    options: [
      { label: "No budget", weight: 10, impact: "Stagnation Risk" },
      { label: "Project-based funding", weight: 6, impact: "Fragmented Scaling" },
      { label: "Annual AI budget", weight: 4, impact: "Stable Resource" },
      { label: "Venture-scale pool", weight: 2, impact: "Hyper-Growth" }
    ]
  },
  {
    id: "DG_04",
    protocol: "deltaGap",
    text: "Customer value is a primary driver for AI implementation.",
    options: [
      { label: "Internal focus only", weight: 10, impact: "Market Blindness" },
      { label: "Secondary priority", weight: 6, impact: "Low Capture" },
      { label: "Key success metric", weight: 4, impact: "Value Aligned" },
      { label: "Core proposition", weight: 2, impact: "Market Leading" }
    ]
  },
  {
    id: "ED_01",
    protocol: "expertiseDebt",
    text: "Our data infrastructure can handle real-time AI processing.",
    options: [
      { label: "Legacy/Siloed", weight: 10, impact: "Infrastructure Debt" },
      { label: "Partially integrated", weight: 6, impact: "Latency Friction" },
      { label: "Cloud-native/Scaled", weight: 4, impact: "Technical Flow" },
      { label: "Edge/Real-time", weight: 2, impact: "Architecture Elite" }
    ]
  },
  {
    id: "ED_02",
    protocol: "expertiseDebt",
    text: "We leverage proprietary datasets to train specialized models.",
    options: [
      { label: "Public data only", weight: 10, impact: "Zero Competitive Edge" },
      { label: "Minimal internal data", weight: 6, impact: "Low Defensibility" },
      { label: "Significant internal", weight: 4, impact: "Data Advantage" },
      { label: "Proprietary flywheel", weight: 2, impact: "Unfair Advantage" }
    ]
  },
  {
    id: "ED_03",
    protocol: "expertiseDebt",
    text: "API and model versioning are strictly controlled.",
    options: [
      { label: "Manual/Inconsistent", weight: 10, impact: "Version Chaos" },
      { label: "Basic versioning", weight: 6, impact: "Manual Overhead" },
      { label: "Automated pipelines", weight: 4, impact: "DevOps Stable" },
      { label: "Full MLOps lifecycle", weight: 2, impact: "Industrial Scale" }
    ]
  },
  {
    id: "ED_04",
    protocol: "expertiseDebt",
    text: "Computing resources (GPU/Cloud) are managed efficiently.",
    options: [
      { label: "High waste", weight: 10, impact: "Margin Erosion" },
      { label: "Some optimization", weight: 6, impact: "Variable Cost Debt" },
      { label: "Managed auto-scaling", weight: 4, impact: "Cost Control" },
      { label: "Hyper-optimized", weight: 2, impact: "Maximum Margin" }
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

  // Real-time Verification Logic
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
      total: (totalSum * 0.04).toFixed(1), // $1.2M Baseline Multiplier
      decay: Math.round((totalSum / 120) * 100),
      reworkTax: (getProtocolSum('reworkTax') * 0.04).toFixed(1),
      deltaGap: (getProtocolSum('deltaGap') * 0.04).toFixed(1)
    };
  };

  // --- VIEWS ---

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

  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 text-white">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter italic text-white">FORENSIC PROTOCOL <span className="text-red-600 uppercase">ENGAGED</span></h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic">Sector Lock: {sector?.toUpperCase() || "PENDING"}</p>
      </div>
      
      <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-4xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600 text-white" />
          <input placeholder="ENTITY_NAME" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600 text-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="email" placeholder="CORPORATE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className={`bg-slate-950 border ${validationError ? 'border-red-600/30' : 'border-slate-800'} p-6 text-sm uppercase outline-none focus:border-red-600 text-white transition-colors`} />
          <input type="email" placeholder="VERIFY_EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className={`bg-slate-950 border ${validationError ? 'border-red-600 animate-pulse' : 'border-slate-800'} p-6 text-sm uppercase outline-none focus:border-red-600 text-white transition-colors`} />
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
          <AnimatePresence>
            {validationError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-600 font-mono text-[10px] uppercase text-center font-black tracking-widest leading-none">
                ⚠️ {validationError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button 
          disabled={!!validationError || !email || !confirmEmail || !userRole || !entityName}
          onClick={() => setStep("audit")} 
          className={`w-full py-8 font-black uppercase italic text-xs tracking-[0.4em] transition-all ${validationError || !email ? 'bg-slate-900 text-slate-700 cursor-not-allowed opacity-50' : 'bg-red-600 text-white hover:bg-white hover:text-black shadow-xl shadow-red-900/10'}`}
        >
          Initialize Audit Observation
        </button>
      </div>
    </motion.div>
  );

  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
      <div className="space-y-12">
        <div className="flex items-center gap-4 text-red-600">
          <Activity className="h-4 w-4" />
          <span className="font-black uppercase tracking-[0.4em] text-[10px]">
            PROTOCOL_NODE_0{currentDimension + 1}
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-tight min-h-[160px]">
          {LOCAL_QUESTIONS[currentDimension]?.text}
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-16">
          {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
            <button
              key={i}
              className="group relative flex items-center justify-between py-10 px-12 border-2 border-slate-800 bg-slate-900/20 text-slate-400 uppercase tracking-[0.2em] text-[11px] font-black hover:border-red-600 hover:text-white transition-all text-left rounded-none overflow-hidden"
              onClick={() => {
                setAnswers({ ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() });
                if (currentDimension < LOCAL_QUESTIONS.length - 1) setCurrentDimension(currentDimension + 1);
                else setStep("verdict");
              }}
            >
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500"></div>
              <span className="group-hover:italic group-hover:translate-x-3 transition-all duration-300">{opt.label}</span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-red-600/40 group-hover:text-red-600 transition-colors font-mono">[{opt.impact}]</span>
                <ArrowRight size={18} className="text-slate-800 group-hover:text-red-600 transition-all group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-white">
      <div className="text-center py-12 border-b border-slate-900">
        <h2 className="text-7xl font-black uppercase italic tracking-tighter leading-none">HEMORRHAGE <span className="text-red-600">${calculateSynthesis().total}M</span></h2>
        <p className="text-slate-500 font-mono text-[10px] mt-4 uppercase tracking-[0.5em] font-bold italic leading-none">Forensic Alpha Synthesis Complete</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-950 border border-slate-900 p-8 flex flex-col justify-center items-center relative overflow-hidden text-white">
          <ShieldAlert className="absolute top-0 right-0 p-2 text-red-600/10" size={60} />
          <span className="text-[10px] font-mono text-slate-500 uppercase mb-4 font-bold">Protocol Decay</span>
          <span className="text-6xl font-black text-red-600 italic leading-none">{calculateSynthesis().decay}%</span>
          <span className="text-[9px] font-mono text-slate-700 mt-6 uppercase font-bold tracking-tighter italic">Confidence Index: 87.2%</span>
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

      <div className="bg-red-600 p-12 shadow-2xl shadow-red-900/40 relative overflow-hidden group">
        <div className="relative z-10 max-w-2xl space-y-6">
          <h3 className="text-4xl font-black text-white uppercase italic leading-none tracking-tighter">Hardening Required</h3>
          <p className="text-white/90 text-sm leading-relaxed font-bold uppercase tracking-tight italic">
            This Alpha scan indicates systemic logic drift. To stop the hemorrhage, initialize the full 30-Point Forensic Diagnostic.
          </p>
          <div className="flex gap-6 items-center">
            <button className="bg-white text-black px-10 py-5 font-black uppercase italic text-xs tracking-widest hover:bg-black hover:text-white transition-all shadow-xl shadow-black/20">Initiate Full Engagement</button>
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
