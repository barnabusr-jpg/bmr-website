"use client";

import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowLeft, Activity, AlertTriangle, Lock } from "lucide-react";

type Role = 'executive' | 'managerial' | 'technical';

interface Question {
  id: string;
  text: string;
  weight: string;
  type: "range" | "select";
  min?: number;
  max?: number;
  options?: string[];
}

// Moved outside to satisfy useMemo dependency rules
const MASTER_QUESTIONS: Record<string, Question[]> = {
  managerial: [
    { id: 'mgr_1', text: "How often does your team manually fix AI outputs?", weight: "Rework Tax", type: "select", options: ["Never", "Rarely (1–10%)", "Sometimes (10–30%)", "Often (30–50%)", "Always (>50%)"] },
    { id: 'mgr_2', text: "Has your team's overtime increased since deploying AI?", weight: "Labor Leakage", type: "select", options: ["No", "10–30%", "30–50%", "50%+"] },
    { id: 'mgr_3', text: "How many junior employees can manually perform tasks now handled by AI?", weight: "Expertise Debt", type: "range", min: 0, max: 100 },
    { id: 'mgr_4', text: "Are AI-generated errors caught by the team or by the end client?", weight: "Systemic Risk", type: "select", options: ["Internal QA", "Human Spot-check", "Client Reported", "Undetected"] },
    { id: 'mgr_5', text: "Does the team feel they are 'working for the AI' or 'using the AI'?", weight: "Agency Loss", type: "select", options: ["Using", "Both", "Working for", "Resistant"] },
    { id: 'mgr_6', text: "What percentage of 'completed' AI tasks require a second human pass?", weight: "Value Leak", type: "range", min: 0, max: 100 },
    { id: 'mgr_7', text: "Is there a documented protocol for when AI logic contradicts human expertise?", weight: "Logic Authority", type: "select", options: ["Yes, clear protocol", "Informal consensus", "Human always yields", "No protocol exists"] },
  ],
  shared: [
    { id: 'sh_1', text: "Does the AI provide a verifiable audit trail for every decision?", weight: "Structural Integrity", type: "select", options: ["Yes, fully", "Partially", "No", "We don't know"] },
    { id: 'sh_2', text: "Are AI hallucinations caught by automated filters or human review?", weight: "Safety Buffer", type: "select", options: ["Automated filters", "Human review", "Both", "Neither"] },
    { id: 'sh_3', text: "Does a single model failure bring down the entire logic chain?", weight: "Cascade Risk", type: "select", options: ["No", "Partially", "Yes", "We don't know"] },
  ]
};

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [isFinalizing, setIsFinalizing] = useState(false);

  const currentQuestions = useMemo(() => {
    if (!role) return [];
    const roleBase = MASTER_QUESTIONS[role] || MASTER_QUESTIONS.managerial; 
    return [...roleBase, ...MASTER_QUESTIONS.shared];
  }, [role]);

  const totalSteps = 12; 
  const progress = Math.round((step / (totalSteps - 1)) * 100);

  const selectOption = (val: number | string) => {
    if (!currentQuestions[step - 1]) return;
    const qId = currentQuestions[step - 1].id;
    setAnswers(prev => ({ ...prev, [qId]: val }));
    setTimeout(() => setStep(s => s + 1), 300);
  };

  const handleFinalize = async () => {
    setIsFinalizing(true);
    try {
      await fetch('/api/pulse-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, answers }),
      });
      router.push('/pulse-check/results');
    } catch {
      // Cleaned up unused error variable
      router.push('/pulse-check/results'); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | Forensic Diagnostic</title></Head>
      <Header />
      <main className="pt-40 pb-20 px-6 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full space-y-12">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.3em]">
              <div className="flex items-center gap-2 text-red-600 font-black">
                <Activity className="h-3 w-3 animate-pulse" /> 
                <span>Step {Math.min(step + 1, totalSteps)} of {totalSteps}</span>
              </div>
              <div className="text-slate-600 italic tracking-widest"><Lock size={10} className="inline mr-1" /> INTEGRITY PROTOCOL ACTIVE</div>
            </div>
            <div className="h-1 w-full bg-slate-900 border border-slate-900">
              <motion.div className="h-full bg-red-600" animate={{ width: `${progress}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="min-h-[400px]">
              
              {step === 0 ? (
                <div className="space-y-10">
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter">Initialize Identity</h2>
                  <div className="grid gap-4">
                    {(['executive', 'managerial', 'technical'] as Role[]).map((r) => (
                      <button key={r} onClick={() => { setRole(r); setStep(1); }} className="w-full p-8 text-left border border-slate-900 bg-slate-950 hover:border-red-600 transition-all flex justify-between items-center group">
                        <span className="text-2xl font-black uppercase italic text-slate-500 group-hover:text-white">{r}</span>
                        <Terminal className="h-5 w-5 text-slate-800 group-hover:text-red-600" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : step <= 10 ? (
                <div className="space-y-12">
                  <div className="space-y-4">
                    <span className="text-red-600 font-mono text-[9px] font-black uppercase tracking-[0.4em]">Variance: {currentQuestions[step-1]?.weight}</span>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none md:text-5xl">{currentQuestions[step-1]?.text}</h2>
                  </div>

                  {currentQuestions[step-1]?.type === "select" ? (
                    <div className="grid gap-3">
                      {currentQuestions[step-1].options?.map((opt) => (
                        <button key={opt} onClick={() => selectOption(opt)} className="w-full p-6 text-left border border-slate-900 bg-slate-950 hover:border-white transition-all text-slate-400 hover:text-white uppercase font-bold text-xs tracking-widest italic">{opt}</button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-12 py-10">
                      <input 
                        type="range" min={0} max={100} 
                        value={answers[currentQuestions[step-1]?.id] || 50}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setAnswers(prev => ({ ...prev, [currentQuestions[step-1].id]: val }));
                        }}
                        className="w-full accent-red-600 h-1 bg-slate-900 appearance-none cursor-pointer" 
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest font-black italic">Nominal</span>
                        <button onClick={() => setStep(s => s + 1)} className="bg-white text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">Confirm Metric</button>
                        <span className="text-red-600 text-[10px] font-mono uppercase tracking-widest font-black italic">Critical Failure</span>
                      </div>
                    </div>
                  )}
                  <button onClick={() => setStep(s => s - 1)} className="text-slate-700 hover:text-white uppercase text-[9px] font-black tracking-[0.3em] flex items-center gap-2 transition-colors"><ArrowLeft size={10} /> Backtrack Trace</button>
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
