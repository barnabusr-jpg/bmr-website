"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ChevronRight, Download, Zap, Shield, Target, Cpu } from "lucide-react";
import ForensicLoader from "@/components/ForensicLoader";
import LogicLeakTicker from "@/components/LogicLeakTicker";

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [userRole, setUserRole] = useState("executive");
  const [aiSpend, setAiSpend] = useState(1.2);
  const [operatorName, setOperatorName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  
  if (!mounted) return null;

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

  // 1. TRIAGE STEP (Initial Entry)
  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 text-center">
      <div className="space-y-4">
        <h2 className="text-6xl font-black uppercase italic italic tracking-tighter text-white">SELECT_LENS</h2>
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
            className="p-8 bg-slate-950 border border-slate-900 hover:border-red-600 transition-all group space-y-4"
          >
            <role.icon className="mx-auto text-slate-700 group-hover:text-red-600" size={24} />
            <div className="space-y-1">
              <p className="text-white font-black italic text-sm">{role.label}</p>
              <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">{role.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  // 2. INTAKE STEP (User Data)
  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
      <div className="bg-slate-950 border border-slate-900 p-12 max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input placeholder="OPERATOR_NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600" />
          <input placeholder="CORPORATE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600" />
        </div>
        <button 
          onClick={() => { setIsLoading(true); }} 
          className="w-full py-8 font-black uppercase italic text-xs tracking-[0.4em] bg-red-600 text-white hover:bg-white hover:text-black transition-all"
        >
          Initialize Audit Observation
        </button>
      </div>
    </motion.div>
  );

  // 3. AUDIT STEP (The 12 Questions)
  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white">
       <div className="text-center py-20">
         <p className="text-red-600 font-mono text-[10px] animate-pulse">ANALYZING_NODE: {userRole.toUpperCase()}</p>
         <h3 className="text-4xl font-black italic uppercase mt-4">Audit logic placeholder...</h3>
         <button onClick={() => setStep("verdict")} className="mt-8 px-12 py-4 bg-red-600 font-black italic uppercase text-[10px]">Generate Verdict</button>
       </div>
    </motion.div>
  );

  // 4. VERDICT STEP (Final Metrics)
  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 py-10 px-4">
      <h2 className="text-7xl font-black italic uppercase text-white text-center leading-none">
        CAPITAL DECAY: <span className="text-red-600">{getLiveMetrics().decay}%</span>
      </h2>
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="bg-red-600/5 border border-red-600/20 p-8">
          <h3 className="text-white font-black uppercase italic text-sm mb-4 tracking-widest flex items-center gap-3">
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
        <button onClick={() => window.print()} className="w-full py-4 border border-slate-800 text-slate-400 font-black uppercase italic text-[10px] hover:text-white transition-all flex items-center justify-center gap-4">
          <Download size={14} /> DOWNLOAD_FORENSIC_SUMMARY
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 relative min-h-[600px]">
      <AnimatePresence mode="wait">
        {isLoading && (
          <ForensicLoader key="loader" onComplete={() => { setIsLoading(false); setStep("audit"); }} />
        )}
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
