"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ChevronRight, Download, Shield, Target, Cpu, ArrowLeft, Zap } from "lucide-react";
import ForensicLoader from "@/components/ForensicLoader";
import LogicLeakTicker from "@/components/LogicLeakTicker";

// 🏛️ FINAL 12-QUESTION FORENSIC DATASET
const QUESTIONS = [
  { id: "q1", text: "CURRENT VERIFY:SERVE RATIO? (VERIFICATION TIME VS. TIME SAVED)", category: "rework" },
  { id: "q2", text: "FREQUENCY OF RE-PROMPTING TO ACHIEVE LOGICAL ALIGNMENT?", category: "decay" },
  { id: "q3", text: "PERCENTAGE OF OUTPUTS REQUIRING MANUAL HUMAN CORRECTION?", category: "rework" },
  { id: "q4", text: "OBSERVED RATE OF MODEL HALLUCINATION IN PRODUCTION?", category: "drift" },
  { id: "q5", text: "STRENGTH OF ESTABLISHED BOUNDARY LOGIC (0-10)?", category: "decay" },
  { id: "q6", text: "SYSTEM LATENCY INCREASE OVER LAST 90 DAYS?", category: "drift" },
  { id: "q7", text: "RELIANCE ON 'BLACK BOX' LOGIC FOR CRITICAL DECISIONS?", category: "decay" },
  { id: "q8", text: "ANNUAL COST OF RE-ENGINEERING FAILED AI OUTPUTS?", category: "rework" },
  { id: "q9", text: "DETECTED DEVIATION FROM BRAND/COMPLIANCE VOICE?", category: "drift" },
  { id: "q10", text: "VOLUME OF UNTRACEABLE LOGIC BRANCHES?", category: "decay" },
  { id: "q11", text: "TOTAL CAPITAL EXPOSED TO UNSUPERVISED AGENTS?", category: "rework" },
  { id: "q12", text: "CONFIDENCE IN SYSTEM STABILITY UNDER EXTREME LOAD?", category: "drift" }
];

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userRole, setUserRole] = useState("executive");
  const [aiSpend, setAiSpend] = useState(1.2);
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [QUESTIONS[currentQuestion].id]: value };
    setAnswers(newAnswers);
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsLoading(true);
    }
  };

  const getLiveMetrics = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    if (totalSum === 0) return { decay: 0, rework: "0.0", delta: "0.0", roi: "0" };
    
    const multiplier = Math.pow(aiSpend / 1.2, 1.15); 
    const scaledTotal = (totalSum * 0.04 * 1.1) * multiplier;
    return {
      decay: Math.min(Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100), 98),
      rework: (scaledTotal * 0.38).toFixed(1),
      delta: (scaledTotal * 0.32).toFixed(1),
      roi: aiSpend > 0 ? -((scaledTotal / aiSpend) * 100).toFixed(1) : "0"
    };
  };

  const getMissingNodes = (role: string) => {
    return ["executive", "managerial", "technical"].filter(r => r !== role);
  };

  // 1. SELECT LENS
  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 text-center">
      <div className="space-y-4">
        <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white leading-none">SELECT_LENS</h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">Operational Identity Required for Triangulation</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {[
          { id: 'executive', label: 'EXECUTIVE', icon: Shield, desc: 'CAPITAL_EXPOSURE' },
          { id: 'managerial', label: 'MANAGERIAL', icon: Target, desc: 'VELOCITY_LATENCY' },
          { id: 'technical', label: 'TECHNICAL', icon: Cpu, desc: 'STACK_DECAY' }
        ].map((role) => (
          <button
            key={role.id}
            onClick={() => { setUserRole(role.id); setStep("intake"); }}
            className="p-10 bg-slate-950 border border-slate-900 hover:border-red-600 transition-all group space-y-4 relative overflow-hidden"
          >
            <role.icon className="mx-auto text-slate-700 group-hover:text-red-600 transition-colors" size={32} />
            <div className="space-y-1">
              <p className="text-white font-black italic text-lg">{role.label}</p>
              <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{role.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  // 2. OPERATOR INTAKE
  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setStep("triage")} className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors text-[9px] font-mono uppercase tracking-[0.3em] mb-8 group">
          <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" /> BACK_TO_LENS_SELECTION
        </button>

        <div className="bg-slate-950 border border-slate-900 p-12 space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 bg-red-600/10 border-b border-l border-red-600/20">
            <p className="text-[8px] font-mono text-red-600 font-black uppercase tracking-[0.2em]">NODE_LOCKED // {userRole.toUpperCase()}</p>
          </div>

          <div className="space-y-2 border-l-4 border-red-600 pl-8 text-left">
            <h3 className="text-white font-black italic uppercase text-4xl tracking-tighter leading-none">VALIDATE_OPERATOR</h3>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">Target Signal: <span className="text-white">{userRole.toUpperCase()}</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-left">
              <label className="text-[8px] font-mono text-slate-600 uppercase tracking-widest ml-2">Operator_Name</label>
              <input placeholder="FULL_NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-[#020617] border border-slate-800 p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600 font-mono transition-all" />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[8px] font-mono text-slate-600 uppercase tracking-widest ml-2">Entity_Reference</label>
              <input placeholder="CORPORATE_ENTITY" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-[#020617] border border-slate-800 p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600 font-mono transition-all" />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[8px] font-mono text-slate-600 uppercase tracking-widest ml-2">Dispatch_Email</label>
              <input placeholder="EMAIL_ADDRESS" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#020617] border border-slate-800 p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600 font-mono transition-all" />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[8px] font-mono text-slate-600 uppercase tracking-widest ml-2">Confirm_Email</label>
              <input placeholder="RE-ENTER_EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className={`bg-[#020617] border ${confirmEmail && email !== confirmEmail ? 'border-red-600 animate-pulse' : 'border-slate-800'} p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600 font-mono transition-all`} />
            </div>
          </div>

          <button 
            disabled={!operatorName || !entityName || !email || email !== confirmEmail}
            onClick={() => setStep("audit")} 
            className="w-full py-8 font-black uppercase italic text-xs tracking-[0.5em] bg-red-600 text-white hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:grayscale cursor-pointer"
          >
            INITIALIZE_AUDIT_TRACE
          </button>
        </div>
      </div>
    </motion.div>
  );

  // 3. THE AUDIT TRACE
  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-16">
      <div className="flex justify-between items-end border-b border-slate-900 pb-8">
        <div className="text-left">
          <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-2 animate-pulse">Byte_Trace: {currentQuestion + 1} / {QUESTIONS.length}</p>
          <h2 className="text-4xl font-black italic uppercase text-white leading-tight">{QUESTIONS[currentQuestion].text}</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {[0, 2, 5, 8, 10].map((val) => (
          <button
            key={val}
            onClick={() => handleAnswer(val.toString())}
            className="group flex justify-between items-center p-8 bg-slate-950 border border-slate-900 hover:border-red-600 transition-all"
          >
            <span className="text-slate-500 group-hover:text-white transition-colors font-mono text-xs font-bold uppercase tracking-widest">Signal_Intensity_{val}</span>
            <ChevronRight className="text-slate-800 group-hover:text-red-600 transition-colors" size={20} />
          </button>
        ))}
      </div>
    </motion.div>
  );

  // 4. VERDICT
  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 py-10 px-4">
      <h2 className="text-7xl font-black italic uppercase text-white text-center tracking-tighter">
        CAPITAL DECAY: <span className="text-red-600">{getLiveMetrics().decay}%</span>
      </h2>
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="bg-red-600/5 border border-red-600/20 p-8">
          <h3 className="text-white font-black uppercase italic text-sm mb-4 tracking-widest flex items-center gap-3 text-left">
            <Activity className="text-red-600 animate-pulse" size={18} /> TRIANGULATION_PENDING
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {getMissingNodes(userRole).map(node => (
              <div key={node} className="p-4 bg-slate-950 border border-slate-900 text-center">
                <p className="text-red-600 font-mono text-[10px] font-black uppercase tracking-widest animate-pulse">Awaiting_{node}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-950 p-10 border border-slate-900 flex justify-between items-end">
          <div className="text-left"><label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Capital_Exposure</label><p className="text-4xl font-black text-white italic">${aiSpend.toFixed(1)}M</p></div>
          <div className="text-right"><label className="text-[10px] font-mono text-red-600 uppercase tracking-[0.3em]">Dynamic_ROI</label><p className="text-4xl font-black text-red-600 italic">{getLiveMetrics().roi}%</p></div>
        </div>
        <button onClick={() => window.print()} className="w-full py-6 bg-white text-black font-black uppercase italic text-xs tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all">GENERATE_FORENSIC_SUMMARY</button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 relative min-h-[800px]">
      <AnimatePresence mode="wait">
        {isLoading && <ForensicLoader key="loader" onComplete={() => { setIsLoading(false); setStep("verdict"); }} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {step === 'triage' && Triage}
        {step === 'intake' && Intake}
        {step === 'audit' && Audit}
        {step === 'verdict' && Verdict}
      </AnimatePresence>
      <LogicLeakTicker />
    </div>
  );
}
