"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Activity, 
  AlertTriangle, 
  DollarSign, 
  HeartPulse, 
  Cpu, 
  Users 
} from "lucide-react";

type Role = 'executive' | 'managerial' | 'technical';
type Sector = 'finance' | 'healthcare' | 'tech' | 'services';

interface Question {
  id: string;
  text: string;
  weight: string;
  type: "range" | "select";
  options?: string[];
}

const MASTER_QUESTIONS: Record<string, Question[]> = {
  managerial: [
    { id: 'mgr_1', text: "How often does your team manually fix AI outputs?", weight: "Rework Tax", type: "select", options: ["Never", "Rarely (1–10%)", "Sometimes (10–30%)", "Often (30–50%)", "Always (>50%)"] },
    { id: 'mgr_2', text: "Has your team's overtime increased since deploying AI?", weight: "Labor Leakage", type: "select", options: ["No", "10–30%", "30–50%", "50%+"] },
    { id: 'mgr_3', text: "How many junior employees can manually perform tasks now handled by AI?", weight: "Expertise Debt", type: "range" },
    { id: 'mgr_4', text: "Are AI-generated errors caught by the team or by the end client?", weight: "Systemic Risk", type: "select", options: ["Internal QA", "Human Spot-check", "Client Reported", "Undetected"] },
    { id: 'mgr_5', text: "Does the team feel they are 'working for the AI' or 'using the AI'?", weight: "Agency Loss", type: "select", options: ["Using", "Both", "Working for", "Resistant"] },
    { id: 'mgr_6', text: "What percentage of 'completed' AI tasks require a second human pass?", weight: "Value Leak", type: "range" },
    { id: 'mgr_7', text: "Is there a documented protocol for when AI logic contradicts human expertise?", weight: "Logic Authority", type: "select", options: ["Yes, clear protocol", "Informal consensus", "Human always yields", "No protocol exists"] },
  ],
  shared: [
    { id: 'sh_1', text: "Does the AI provide a verifiable audit trail for every decision?", weight: "Structural Integrity", type: "select", options: ["Yes, fully", "Partially", "No", "We don't know"] },
    { id: 'sh_2', text: "Are AI hallucinations caught by automated filters or human review?", weight: "Safety Buffer", type: "select", options: ["Automated filters", "Human review", "Both", "Neither"] },
    { id: 'sh_3', text: "Does a single model failure bring down the entire logic chain?", weight: "Cascade Risk", type: "select", options: ["No", "Partially", "Yes", "We don't know"] },
  ]
};

const SECTORS = [
  { id: "finance" as Sector, label: "FINANCE", risk: "COMPLIANCE", icon: DollarSign, color: "bg-red-600/10" },
  { id: "healthcare" as Sector, label: "HEALTHCARE", risk: "LIABILITY", icon: HeartPulse, color: "bg-red-700/10" },
  { id: "tech" as Sector, label: "TECHNOLOGY", risk: "TECHNICAL DEBT", icon: Cpu, color: "bg-yellow-600/10" },
  { id: "services" as Sector, label: "SERVICES", risk: "LABOR", icon: Users, color: "bg-blue-600/10" }
];

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role | null>(null);
  const [sector, setSector] = useState<Sector>('services');
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [hasInteractedSector, setHasInteractedSector] = useState(false);

  const currentQuestions = useMemo(() => {
    if (!role) return [];
    return [...(MASTER_QUESTIONS[role] || MASTER_QUESTIONS.managerial), ...MASTER_QUESTIONS.shared];
  }, [role]);

  const totalSteps = 12;
  const progress = Math.round((step / (totalSteps - 1)) * 100);

  const handleFinalize = async () => {
    setIsFinalizing(true);
    try {
      const response = await fetch('/api/pulse-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, sector, answers }),
      });
      const data = await response.json();
      sessionStorage.setItem('bmr_results_data', JSON.stringify(data));
      setTimeout(() => router.push('/pulse-check/results'), 150);
    } catch {
      router.push('/pulse-check/results');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Header />
      <main className="pt-40 pb-20 px-6 flex flex-col items-center">
        <div className="max-w-2xl w-full space-y-12">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.3em]">
              <div className="flex items-center gap-2 text-red-600 font-black">
                <Activity className="h-3 w-3 animate-pulse" /> 
                <span>Step {Math.min(step + 1, totalSteps)} of {totalSteps}</span>
              </div>
              <span className="text-slate-600 italic tracking-widest uppercase">Sector: {sector}</span>
            </div>
            <div className="h-1 w-full bg-slate-900 border border-slate-900 overflow-hidden">
              <motion.div className="h-full bg-red-600" animate={{ width: `${progress}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              
              {step === 0 ? (
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-600 animate-pulse" />
                      <p className="text-[11px] font-mono text-red-600 uppercase tracking-[0.4em] font-black italic">
                        SECTOR CALIBRATION REQUIRED
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {SECTORS.map((s) => {
                        const Icon = s.icon;
                        const isActive = sector === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => { setSector(s.id); setHasInteractedSector(true); }}
                            className={`p-6 border-2 text-left transition-all duration-300 flex flex-col justify-center min-h-[120px] relative overflow-hidden group
                              ${isActive
                                ? `${s.color} border-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] scale-[1.05] z-10`
                                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800/60'}`}
                          >
                            <div className={`absolute top-2 right-2 text-[7px] font-mono px-2 py-0.5 rounded-full tracking-tighter
                              ${isActive ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                              {s.id.toUpperCase()}
                            </div>
                            <div className={`text-lg font-black uppercase italic tracking-tighter leading-none mb-1 transition-colors
                              ${isActive ? 'text-white' : 'text-slate-200'}`}>
                              {s.label}
                            </div>
                            <div className={`text-[10px] font-mono font-bold tracking-[0.1em] transition-colors
                              ${isActive ? 'text-white/70' : 'text-red-600'}`}>
                              {s.risk}
                            </div>
                            <div className={`absolute bottom-3 right-3 transition-all duration-500 
                              ${isActive ? 'opacity-40 scale-110 text-white' : 'opacity-10 group-hover:opacity-25 text-slate-400'}`}>
                              <Icon size={20} strokeWidth={2.5} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-3 pt-4">
                    {(['executive', 'managerial', 'technical'] as Role[]).map((r) => (
                      <button key={r} onClick={() => { if(!hasInteractedSector) setHasInteractedSector(true); setRole(r); setStep(1); }} className="w-full p-8 text-left border border-slate-900 bg-slate-950 hover:border-red-600 transition-all flex justify-between items-center group">
                        <span className="text-2xl font-black uppercase italic text-slate-500 group-hover:text-white">{r}</span>
                        <div className="text-slate-800 group-hover:text-red-600 opacity-50 transition-opacity italic font-mono text-xs">GO {'>'}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : step <= 10 ? (
                <div className="space-y-12">
                  <div className="space-y-4">
                    <span className="text-red-600 font-mono text-[9px] font-black uppercase tracking-[0.4em]">Variance: {currentQuestions[step-1]?.weight}</span>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">{currentQuestions[step-1]?.text}</h2>
                  </div>
                  {currentQuestions[step-1]?.type === "select" ? (
                    <div className="grid gap-3">
                      {currentQuestions[step-1].options?.map((opt) => (
                        <button key={opt} onClick={() => {
                          setAnswers(prev => ({ ...prev, [currentQuestions[step-1].id]: opt }));
                          setTimeout(() => setStep(s => s + 1), 300);
                        }} className="w-full p-6 text-left border border-slate-900 bg-slate-950 hover:border-white transition-all text-slate-400 hover:text-white uppercase font-bold text-xs tracking-widest italic">{opt}</button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-12 py-10">
                      <input type="range" min={0} max={100} value={Number(answers[currentQuestions[step-1]?.id]) || 50}
                        onChange={(e) => setAnswers(prev => ({ ...prev, [currentQuestions[step-1].id]: parseInt(e.target.value) }))}
                        className="w-full accent-red-600 h-1 bg-slate-900 appearance-none cursor-pointer" />
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest font-black italic">Nominal</span>
                        <button onClick={() => setStep(s => s + 1)} className="bg-white text-black px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Confirm Metric</button>
                        <span className="text-red-600 text-[10px] font-mono uppercase tracking-widest font-black italic">Critical Failure</span>
                      </div>
                    </div>
                  )}
                  <button onClick={() => setStep(s => s - 1)} className="text-slate-700 hover:text-white uppercase text-[9px] font-black tracking-[0.3em] flex items-center gap-2"><ArrowLeft size={10} /> Backtrack Trace</button>
                </div>
              ) : (
                <div className="text-center py-20 space-y-10 border border-red-900/20 p-12 bg-red-950/5 relative">
                  <AlertTriangle className="h-16 w-16 text-red-600 mx-auto animate-pulse" />
                  <h2 className="text-5xl font-black uppercase italic tracking-tighter text-red-600">Diagnostic Complete</h2>
                  <button onClick={handleFinalize} disabled={isFinalizing} className="w-full bg-white text-black font-black py-6 uppercase text-[12px] tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all shadow-2xl">
                    {isFinalizing ? "Generating Verdict..." : "Generate Verdict"}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
