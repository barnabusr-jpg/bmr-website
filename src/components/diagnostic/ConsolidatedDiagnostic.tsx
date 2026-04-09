"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight, ChevronRight, Download } from "lucide-react";
import Link from 'next/link';
import ForensicLoader from "@/components/ForensicLoader";
import LogicLeakTicker from "@/components/LogicLeakTicker";

const LOCAL_QUESTIONS = [
  { id: "RT_01", protocol: "reworkTax", text: "AI standard operating procedures (SOPs) are documented and followed.", options: [{ label: "Non-existent", weight: 10 }, { label: "Ad-hoc/Manual", weight: 6 }, { label: "Formalized", weight: 4 }, { label: "Automated/Optimized", weight: 2 }] },
  { id: "RT_02", protocol: "reworkTax", text: "Our organization has a clear AI ethics and governance framework.", options: [{ label: "No framework", weight: 10 }, { label: "Basic guidelines", weight: 6 }, { label: "Formal audits", weight: 4 }, { label: "Continuous monitoring", weight: 2 }] },
  // ... (Keep the remaining 10 questions from your previous working version)
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
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverChallenge, setServerChallenge] = useState("");
  const [userInputKey, setUserInputKey] = useState("");

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (confirmEmail.length > 0 && email !== confirmEmail) setValidationError("EMAIL_VERIFICATION_MISMATCH");
    else setValidationError(null);
  }, [email, confirmEmail]);

  if (!mounted) return null;

  const calculateSynthesis = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const sectorWeights: any = { finance: 1.12, healthcare: 1.08, manufacturing: 1.15, retail: 1.02 };
    const coeff = sectorWeights[sector] || 1.0;
    const multiplier = Math.pow(aiSpend / 1.2, 1.15); 
    const scaledTotal = (totalSum * 0.04 * coeff) * multiplier;
    return {
      decay: Math.min(Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100), 98),
      rework: (scaledTotal * 0.38).toFixed(1),
      delta: (scaledTotal * 0.32).toFixed(1),
      roi: aiSpend > 0 ? -((scaledTotal / aiSpend) * 100).toFixed(1) : "0"
    };
  };

  const finalizeStepTransition = () => {
    if (step === "intake") setStep("verify");
    else if (step === "audit") setStep("verdict");
    setIsLoading(false);
  };

  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16 px-4">
      <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none text-center">THE LOGIC <span className="text-red-600">DECAY SCREENING</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left flex flex-col justify-between h-48">
            <div className="text-red-600 mb-4">{s.icon}</div>
            <div>
              <h3 className="text-xl font-black uppercase italic text-white leading-none tracking-tighter">{s.label}</h3>
              <p className="text-[10px] font-mono font-bold text-red-600 tracking-widest uppercase">{s.risk}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-white">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none tracking-tighter text-white uppercase">FORENSIC PROTOCOL <span className="text-red-600 uppercase">ENGAGED</span></h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic">Sector Lock: {sector?.toUpperCase() || "PENDING"}</p>
      </div>
      <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-4xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
          <input placeholder="OPERATOR_NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase text-white w-full focus:border-red-600 outline-none" />
          <input placeholder="ENTITY_NAME" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase text-white w-full focus:border-red-600 outline-none" />
          <input placeholder="CORPORATE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase text-white w-full focus:border-red-600 outline-none" />
          <input 
            placeholder="CONFIRM_PROTOCOL" 
            value={confirmEmail} 
            onChange={(e) => setConfirmEmail(e.target.value)} 
            className={`bg-slate-950 border ${validationError ? 'border-red-600 animate-pulse' : 'border-slate-800'} p-6 text-sm uppercase text-white w-full focus:border-red-600 outline-none`} 
          />
        </div>
        <button disabled={!!validationError || !email} onClick={() => { setIsLoading(true); setStep("verify"); }} className="w-full py-8 font-black uppercase italic text-xs tracking-[0.4em] bg-red-600 text-white hover:bg-white hover:text-black transition-all">Initialize Audit Observation</button>
      </div>
    </motion.div>
  );

  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-white text-center py-10 px-4">
       <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">YOUR INVESTED CAPITAL HAS <span className="text-red-600">{calculateSynthesis().decay}% DECAY</span></h2>
       <div className="max-w-2xl mx-auto mt-12 space-y-12 text-left">
          <div className="bg-slate-950 p-8 border border-slate-900 space-y-8">
            <div className="flex justify-between items-end">
              <div><label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Capital_Exposure</label><p className="text-3xl font-black italic text-white">${aiSpend.toFixed(1)}M</p></div>
              <div className="text-right"><label className="text-[10px] font-mono text-red-600 uppercase tracking-[0.3em]">Dynamic_ROI</label><p className="text-3xl font-black italic text-red-600">{calculateSynthesis().roi}%</p></div>
            </div>
            <input type="range" min="0.1" max="10" step="0.1" value={aiSpend} onChange={(e) => setAiSpend(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 accent-red-600 appearance-none cursor-pointer" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-slate-950 border border-slate-900"><p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-2">REWORK_TAX</p><p className="text-2xl font-black text-white italic">${calculateSynthesis().rework}M / YR</p><p className="text-[9px] text-slate-600 font-mono mt-2 uppercase">Annual capital lost to human correction of AI error.</p></div>
            <div className="p-6 bg-slate-950 border border-slate-900"><p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-2">DRIFT_PROBABILITY</p><p className="text-2xl font-black text-white italic">{calculateSynthesis().delta}%</p><p className="text-[9px] text-slate-600 font-mono mt-2 uppercase">Statistical risk of models deviating from core logic.</p></div>
          </div>
          <button className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group">SECURE_FULL_FORENSIC_BRIEFING <ChevronRight size={16} /></button>
          <button onClick={() => window.print()} className="w-full py-4 border border-slate-800 text-slate-400 font-black uppercase italic tracking-[0.2em] text-[10px] hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-4"><Download size={14} /> DOWNLOAD_SUMMARY_PDF</button>
       </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 relative">
      <AnimatePresence mode="wait">{isLoading && <ForensicLoader onComplete={finalizeStepTransition} />}</AnimatePresence>
      <AnimatePresence mode="wait">
        {step === 'triage' && Triage}
        {step === 'intake' && Intake}
        {step === 'verdict' && Verdict}
      </AnimatePresence>
      <LogicLeakTicker />
    </div>
  );
}
