"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, Zap, Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";

// (Note: Keep the LOCAL_QUESTIONS array from the previous 12-question set here)

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState("finance");
  const [aiSpend, setAiSpend] = useState(1.2);
  const [userRole, setUserRole] = useState("executive");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hoveredProtocolX, setHoveredProtocolX] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // --- 🛡️ 1. HARDENED CALCULATION ENGINE (NON-LINEAR) ---
  const calculateSynthesis = () => {
    const totalSum = Object.values(answers).map(v => parseInt(v || "0")).reduce((a, b) => a + b, 0);
    
    // Sector "Noise" to prevent reverse-engineering
    const sectorWeights: Record<string, number> = {
      finance: 1.12, healthcare: 1.08, manufacturing: 1.15, retail: 1.02, tech: 1.05
    };
    const coefficient = sectorWeights[sector] || 1.0;

    // Base Math with slight random jitter (±1.5%) to break pattern matching
    const jitter = 1 + (Math.random() * 0.03 - 0.015);
    const baseHemorrhage = (totalSum * 0.04 * coefficient * jitter);
    
    const multiplier = aiSpend / 1.2;
    const scaledTotal = baseHemorrhage * multiplier;

    // Non-Linear Decay Formula: Obscures the weightings
    const decayRaw = Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100);

    return {
      total: scaledTotal,
      decay: Math.min(decayRaw, 98), // Cap at 98% for forensic realism
      reworkTax: (getProtocolSum('reworkTax') * coefficient * multiplier),
      deltaGap: (getProtocolSum('deltaGap') * coefficient * multiplier),
      roi: -((scaledTotal / aiSpend) * 100).toFixed(0)
    };
  };

  const getProtocolSum = (proto: string) => {
    const pQs = LOCAL_QUESTIONS.filter(q => q.protocol === proto);
    return pQs.map(q => parseInt(answers[q.id] || "0")).reduce((a, b) => a + b, 0) * 0.04;
  };

  // (Keep Triage/Intake/Audit logic as before...)

  // --- 🛡️ 2. THE HARDENED VERDICT SCREEN ---
  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-white text-center py-10">
      
      {/* 📡 HEADER: Role-Specific Indictment */}
      <div className="py-12 border-b border-slate-900">
        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
          {userRole === 'executive' ? `YOUR $${aiSpend}M INVESTMENT IS DESTROYING ` : 
           userRole === 'technical' ? `YOUR $${aiSpend}M STACK HAS ` : 
           `YOUR $${aiSpend}M OPS ARE FUELING `}
          <span className="text-red-600 block md:inline mt-2 md:mt-0">
            {userRole === 'executive' ? `$${calculateSynthesis().total.toFixed(1)}M/YEAR` : 
             `${calculateSynthesis().decay}% DECAY`}
          </span>
        </h2>

        {/* 🎚️ HIGH-VISIBILITY SLIDER */}
        <div className="mt-12 max-w-md mx-auto space-y-6">
          <label className="block text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] font-black italic">
            {userRole === 'executive' ? 'ADJUST_AI_SPEND_FOR_EBITDA_IMPACT' : 
             userRole === 'technical' ? 'ADJUST_AI_SPEND_FOR_DEBT_SCALING' : 
             'ADJUST_AI_SPEND_FOR_BANDWIDTH_LOSS'}
          </label>
          <input 
            type="range" min="0.5" max="10" step="0.1" value={aiSpend} 
            onChange={(e) => setAiSpend(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-[11px] font-mono font-black text-white italic">
            <span>$0.5M</span>
            <span className="bg-red-600 px-3 py-1 ring-4 ring-red-600/20">${aiSpend}M</span>
            <span>$10.0M</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* 🩺 DIAGNOSIS BOX */}
        <div className="bg-slate-950 border border-slate-800 p-8 flex flex-col justify-center items-center relative overflow-hidden">
          <ShieldAlert className="absolute top-0 right-0 p-2 text-red-600/10" size={60} />
          <span className="text-[10px] font-mono text-slate-500 uppercase mb-4 font-bold tracking-[0.2em]">
            {userRole === 'executive' ? 'NEGATIVE_ROI' : 'STRUCTURAL_HEALTH'}
          </span>
          <span className="text-6xl font-black text-red-600 italic leading-none mb-4">
            {userRole === 'executive' ? `${calculateSynthesis().roi}%` : `${calculateSynthesis().decay}%`}
          </span>
          <div className="border-t border-red-600/20 pt-4 w-full text-center">
            <span className="text-[11px] font-black uppercase italic text-white tracking-widest leading-tight">
              {getForensicDiagnosis(calculateSynthesis().decay, userRole).label}
            </span>
          </div>
        </div>

        {/* 📊 WASTE GRID: Partial Disclosure */}
        <div className="md:col-span-2 bg-slate-950 border border-slate-800 p-8 space-y-8">
          <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em]">
            <span>Protocol Waste Grid // Scaled to Sector: {sector.toUpperCase()}</span>
            <Activity size={14} className="text-red-600 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 border border-slate-900 p-6 flex justify-between items-center">
              <span className="font-mono text-[9px] font-black italic opacity-50 uppercase text-white">
                {userRole === 'executive' ? 'REWORK_TAX' : userRole === 'technical' ? 'MANUAL_OVERRIDES' : 'REWORK_LOOPS'}
              </span>
              <span className="text-red-600 font-black italic text-xl">
                {userRole === 'executive' ? `$${calculateSynthesis().reworkTax.toFixed(1)}M` : 
                 userRole === 'technical' ? `${Math.round(calculateSynthesis().reworkTax * 120)} HRS/QTR` : 
                 `${(calculateSynthesis().reworkTax * 2.5).toFixed(1)} FTEs`}
              </span>
            </div>
            <div className="bg-black/40 border border-slate-900 p-6 flex justify-between items-center">
              <span className="font-mono text-[9px] font-black italic opacity-50 uppercase text-white">
                {userRole === 'executive' ? 'DELTA_GAP' : userRole === 'technical' ? 'MODEL_DRIFT' : 'VELOCITY_LOSS'}
              </span>
              <span className="text-red-600 font-black italic text-xl">
                {userRole === 'executive' ? `$${calculateSynthesis().deltaGap.toFixed(1)}M` : 
                 userRole === 'technical' ? `${Math.round(calculateSynthesis().deltaGap * 8)}% ACCURACY` : 
                 `${Math.round(calculateSynthesis().deltaGap * 6)}% SLOWER`}
              </span>
            </div>
            {/* 🕵️ PROTOCOL_X: THE CURIOSITY GAP */}
            <div 
              onMouseEnter={() => setHoveredProtocolX(true)} onMouseLeave={() => setHoveredProtocolX(false)}
              className="bg-black/40 border border-slate-900 p-6 flex justify-between items-center group cursor-help relative md:col-span-2 transition-all hover:border-red-600/40"
            >
              <span className="font-mono text-[9px] font-black italic opacity-50 uppercase text-white group-hover:text-red-600 transition-colors">
                {hoveredProtocolX ? (userRole === 'executive' ? "Reg_Risk + Rep_Loss" : "Shadow AI + Exp_Debt") : "PROTOCOL_X [UNIDENTIFIED_LEAK]"}
              </span>
              <span className="text-red-600 font-black italic text-xl">
                {hoveredProtocolX ? `$${(parseFloat(calculateSynthesis().total) - calculateSynthesis().reworkTax - calculateSynthesis().deltaGap).toFixed(1)}M` : "?"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 THE ROLE-BASED CLOSE */}
      <div className="bg-red-600 p-12 shadow-2xl shadow-red-900/40 relative overflow-hidden group text-left">
        <div className="relative z-10 max-w-3xl space-y-6">
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic leading-none tracking-tighter">
             {userRole === 'executive' ? `STOP THE $${calculateSynthesis().total.toFixed(1)}M EBITDA LEAK` : 
              userRole === 'technical' ? `CLEAR $${calculateSynthesis().total.toFixed(1)}M IN TECH DEBT` : 
              `REGAIN ${calculateSynthesis().decay}% OF TEAM BANDWIDTH`}
          </h3>
          <p className="text-white/95 text-sm leading-relaxed font-bold uppercase tracking-tight italic max-w-xl">
            {getCTANarrative(calculateSynthesis().decay, userRole, aiSpend)}
          </p>
          <button className="bg-white text-black px-10 py-6 font-black uppercase italic text-xs tracking-[0.3em] hover:bg-black hover:text-white transition-all shadow-xl">
              Initiate Full {userRole.toUpperCase()} Audit
          </button>
        </div>
        <Zap className="absolute right-[-40px] bottom-[-40px] text-white/10" size={300} />
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <AnimatePresence mode="wait">
        {step === 'triage' ? Triage : step === 'intake' ? Intake : step === 'audit' ? Audit : Verdict}
      </AnimatePresence>
    </div>
  );
}
