"use client";

import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowLeft, Activity, ShieldCheck, AlertTriangle, Lock } from "lucide-react";

type Role = 'executive' | 'managerial' | 'technical';

// Forensic Type Definition
interface Question {
  id: string;
  text: string;
  weight: string;
  type: "range" | "select";
  min?: number;
  max?: number;
  options?: string[];
}

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});

  const questions: Record<string, Question[]> = {
    executive: [
      { id: 'exec_1', text: "What is your target labor reduction from AI (e.g., 20%, 30%, 50%)?", weight: "Labor Leakage", type: "range", min: 0, max: 50 },
      { id: 'exec_2', text: "Does leadership review the Verify:Serve ratio?", weight: "Operational Drift", type: "select", options: ["Yes, it's a KPI", "No, but we track others", "No, we don't measure", "What is Verify:Serve?"] },
      { id: 'exec_3', text: "Is AI savings visible in your quarterly P&L statements?", weight: "Promise Gap", type: "select", options: ["Yes, clearly", "Somewhat", "No, buried in rework", "We don't track this"] },
    ],
    managerial: [
      { id: 'mgr_1', text: "How often does your team manually fix AI outputs?", weight: "Rework Tax", type: "select", options: ["Never", "Rarely (1–10%)", "Sometimes (10–30%)", "Often (30–50%)", "Always (>50%)"] },
      { id: 'mgr_2', text: "Has your team's overtime increased since deploying AI?", weight: "Labor Leakage", type: "select", options: ["No", "10–30%", "30–50%", "50%+"] },
      { id: 'mgr_3', text: "How many junior employees can manually perform tasks now handled by AI?", weight: "Expertise Debt", type: "range", min: 0, max: 100 },
      { id: 'mgr_4', text: "Are AI-generated errors caught by the team or by the end client?", weight: "Systemic Risk", type: "select", options: ["Internal QA", "Human Spot-check", "Client Reported", "Undetected"] },
      { id: 'mgr_5', text: "Does the team feel they are 'working for the AI' or 'using the AI'?", weight: "Agency Loss", type: "select", options: ["Using", "Both", "Working for", "Resistant"] },
      { id: 'mgr_6', text: "What percentage of 'completed' AI tasks require a second human pass?", weight: "Value Leak", type: "range", min: 0, max: 100 },
    ],
    technical: [
      { id: 'tech_1', text: "For every 10 mins of AI output, how many minutes are spent fixing it?", weight: "Verify:Serve", type: "range", min: 0, max: 30 },
      { id: 'tech_2', text: "How many unofficial AI tools does the team use to bypass 'official' AI?", weight: "Shadow AI", type: "select", options: ["0", "1–3", "4–6", "7+"] },
      { id: 'tech_3', text: "Does the AI degrade significantly under high-volume production loads?", weight: "Stress Fragility", type: "select", options: ["No", "Slightly", "Significantly", "We don't know"] },
    ],
    shared: [
      { id: 'sh_1', text: "Does the AI provide a verifiable audit trail for every decision?", weight: "Structural Integrity", type: "select", options: ["Yes, fully", "Partially", "No", "We don't know"] },
      { id: 'sh_2', text: "Are AI hallucinations caught by automated filters or human review?", weight: "Safety Buffer", type: "select", options: ["Automated filters", "Human review", "Both", "Neither"] },
      { id: 'sh_3', text: "Does a single model failure bring down the entire logic chain?", weight: "Cascade Risk", type: "select", options: ["No", "Partially", "Yes", "We don't know"] },
    ]
  };

  const currentQuestions = useMemo(() => {
    if (!role) return [];
    return [...questions[role], ...questions.shared];
    // questions is a static constant outside the component in some setups, 
    // but here it is inside, so we satisfy the ESLint warning from your screenshot.
  }, [role, questions.executive, questions.managerial, questions.technical, questions.shared]);

  const totalSteps = currentQuestions.length + 2; 
  const progress = Math.round((step / (totalSteps - 1)) * 100);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const selectOption = (val: number | string) => {
    const qId = currentQuestions[step - 1].id;
    setAnswers(prev => ({ ...prev, [qId]: val }));
    handleNext();
  };

  const handleFinalize = async () => {
    try {
      const response = await fetch('/api/pulse-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, answers, completedAt: new Date().toISOString() }),
      });
      const data = await response.json();
      sessionStorage.setItem('bmr_results', JSON.stringify(data));
      router.push('/pulse-check/results');
    } catch (error) {
      console.error("Forensic sync failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-500/30">
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
              <div className="text-slate-600 italic flex items-center gap-2">
                <Lock size={10} /> Integrity Protocol Active
              </div>
            </div>
            <div className="h-1 w-full bg-slate-900 overflow-hidden border border-slate-900">
              <motion.div 
                className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" 
                animate={{ width: `${progress}%` }} 
                transition={{ duration: 0.5, ease: "circOut" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={step} 
              initial={{ opacity: 0, x: 10 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -10 }} 
              className="min-h-[400px]"
            >
              {step === 0 ? (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">Initialize Identity</h2>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest italic">Node Selection Required</p>
                  </div>
                  <div className="grid gap-4">
                    {(['executive', 'managerial', 'technical'] as Role[]).map((r) => (
                      <button 
                        key={r} 
                        onClick={() => { setRole(r); handleNext(); }} 
                        className="w-full p-8 text-left border border-slate-900 bg-slate-950 hover:border-red-600 transition-all group flex justify-between items-center relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-300"></div>
                        <span className="text-2xl font-black uppercase italic text-slate-500 group-hover:text-white transition-colors">{r}</span>
                        <Terminal className="h-5 w-5 text-slate-800 group-hover:text-red-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : step <= currentQuestions.length ? (
                <div className="space-y-12">
                  <div className="space-y-4">
                    <div className="inline-block px-2 py-1 bg-red-600/10 border border-red-600/20 mb-4">
                        <span className="text-red-600 font-mono text-[9px] font-black uppercase tracking-[0.4em]">
                           Variance: {currentQuestions[step - 1].weight}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none md:text-5xl text-white">
                        {currentQuestions[step - 1].text}
                    </h2>
                  </div>

                  <div className="grid gap-3">
                    {currentQuestions[step - 1].type === "select" ? (
                      currentQuestions[step - 1].options?.map((opt) => (
                        <button 
                          key={opt} 
                          onClick={() => selectOption(opt)} 
                          className="w-full p-6 text-left border border-slate-900 bg-slate-950 hover:border-white transition-all group relative"
                        >
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-white relative z-10 italic">{opt}</span>
                          <ShieldCheck className="absolute right-6 bottom-6 h-8 w-8 opacity-5 group-hover:opacity-20 transition-opacity text-red-600" />
                        </button>
                      ))
                    ) : (
                      <div className="space-y-12 py-10">
                        <input 
                          type="range" 
                          min={currentQuestions[step-1].min ?? 0} 
                          max={currentQuestions[step-1].max ?? 100} 
                          className="w-full accent-red-600 h-1 bg-slate-900 rounded-none appearance-none cursor-pointer" 
                          onMouseUp={(e) => selectOption(parseInt((e.target as HTMLInputElement).value))} 
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-700 uppercase tracking-widest font-black">
                          <span>Nominal</span>
                          <span className="text-red-600">Critical Failure</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={handleBack} 
                    className="flex items-center gap-2 text-slate-700 hover:text-white uppercase text-[9px] font-black tracking-[0.3em] transition-colors"
                  >
                    <ArrowLeft size={10} /> Backtrack Trace
                  </button>
                </div>
              ) : (
                <div className="text-center py-20 space-y-10 border border-red-900/20 p-12 bg-red-950/5 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
                  <AlertTriangle className="h-16 w-16 text-red-600 mx-auto animate-pulse" />
                  <div className="space-y-2">
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter text-red-600">Diagnostic Complete</h2>
                    <p className="text-slate-500 italic text-sm font-mono tracking-widest uppercase">Encryption Key Verified</p>
                  </div>
                  <button 
                    onClick={handleFinalize} 
                    className="w-full bg-white text-black font-black py-6 uppercase text-[12px] tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all shadow-2xl"
                  >
                    Generate Verdict
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
