import React, { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowLeft, Activity, ShieldCheck, AlertTriangle, TrendingDown } from "lucide-react";

type Role = 'executive' | 'managerial' | 'technical';

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role | null>(null);
  const [answers, setAnswers] = useState<(number | string)[]>([]);

  const questions = {
    executive: [
      { text: "What is your target labor reduction from AI (e.g., 20%, 30%, 50%)?", weight: "Labor Leakage", type: "range", min: 0, max: 50 },
      { text: "Does leadership review the Verify:Serve ratio (time spent fixing AI vs. saved)?", weight: "Operational Drift", type: "select", options: ["Yes, it's a KPI", "No, but we track others", "No, we don't measure", "What is Verify:Serve?"] },
      { text: "Is AI savings visible in your quarterly P&L statements?", weight: "Promise Gap", type: "select", options: ["Yes, clearly", "Somewhat", "No, buried in rework", "We don't track this"] },
    ],
    managerial: [
      { text: "How often does your team manually fix AI outputs before customer delivery?", weight: "Rework Tax", type: "select", options: ["Never", "Rarely (1–10%)", "Sometimes (10–30%)", "Often (30–50%)", "Always (>50%)"] },
      { text: "Has your team's overtime increased since deploying AI?", weight: "Labor Leakage", type: "select", options: ["No", "10–30%", "30–50%", "50%+"] },
      { text: "How many junior employees can manually perform tasks now handled by AI?", weight: "Expertise Debt", type: "range", min: 0, max: 100 },
    ],
    technical: [
      { text: "For every 10 mins of AI output, how many minutes are spent fixing it?", weight: "Verify:Serve", type: "range", min: 0, max: 30 },
      { text: "How many unofficial AI tools (ChatGPT, etc) does the team use to bypass 'official' AI?", weight: "Shadow AI", type: "select", options: ["0", "1–3", "4–6", "7+"] },
      { text: "Does the AI degrade significantly under high-volume production loads?", weight: "Stress Fragility", type: "select", options: ["No", "Slightly", "Significantly", "We don't know"] },
    ],
    shared: [
      { text: "Does the AI provide a verifiable audit trail for every decision?", weight: "Structural Integrity", type: "select", options: ["Yes, fully", "Partially", "No", "We don't know"] },
      { text: "Are AI hallucinations caught by automated filters or human review?", weight: "Safety Buffer", type: "select", options: ["Automated filters", "Human review", "Both", "Neither"] },
      { text: "Does a single model failure bring down the entire logic chain?", weight: "Cascade Risk", type: "select", options: ["No", "Partially", "Yes", "We don't know"] },
    ]
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const selectOption = (val: number | string) => {
    const newAnswers = [...answers];
    newAnswers[step - 1] = val;
    setAnswers(newAnswers);
    handleNext();
  };

  const currentQuestions = role ? [...questions[role], ...questions.shared] : [];
  const progress = Math.round((step / (currentQuestions.length + 1)) * 100);

  const calculateFinalResults = () => {
    const raw = answers.map((a) => (typeof a === 'number' ? a : a.length));
    const aggregate = raw.reduce((acc, curr) => acc + curr, 0);

    if (aggregate > 40) return { name: "The Replacement Trap", risk: "Critical", vel: -6.3, desc: "Labor reduction goals have decoupled from operational reality. Rework tax is currently compounding." };
    if (aggregate > 20) return { name: "Shadow Shear", risk: "High", vel: -5.2, desc: "Official systems are being bypassed by unsanctioned tools. Expertise debt is mounting." };
    return { name: "Collective Delusion", risk: "Moderate", vel: -2.8, desc: "Internal success metrics do not align with frontline output. Systemic fragility is present." };
  };

  const archetype = step > currentQuestions.length ? calculateFinalResults() : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | Forensic Diagnostic</title></Head>
      <Header />
      <main className="pt-40 pb-20 px-6 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.3em]">
              <div className="flex items-center gap-2 text-red-600 font-black">
                <Activity className="h-3 w-3" /> Step {step + 1} of {currentQuestions.length + 1}
              </div>
              <div className="text-slate-600">Integrity: {100 - (step * 3)}%</div>
            </div>
            <div className="h-1 w-full bg-slate-900 overflow-hidden">
              <motion.div className="h-full bg-red-600" animate={{ width: `${progress}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-10">
              {step === 0 ? (
                <div className="space-y-8">
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter">Initialize Identity</h2>
                  <div className="grid gap-3">
                    {(['executive', 'managerial', 'technical'] as Role[]).map((r) => (
                      <button key={r} onClick={() => { setRole(r); handleNext(); }} className="w-full p-6 text-left border border-slate-900 bg-slate-900/50 hover:border-red-600 transition-all group flex justify-between items-center">
                        <span className="text-xl font-bold uppercase italic text-slate-400 group-hover:text-white">{r}</span>
                        <Terminal className="h-4 w-4 text-slate-800 group-hover:text-red-600" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : step <= currentQuestions.length ? (
                <div className="space-y-12">
                  <div className="space-y-4">
                    <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.4em]">Metric: {currentQuestions[step - 1].weight}</span>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-tight md:text-4xl">{currentQuestions[step - 1].text}</h2>
                  </div>
                  <div className="grid gap-3">
                    {currentQuestions[step - 1].type === "select" ? (
                      currentQuestions[step - 1].options?.map((opt) => (
                        <button key={opt} onClick={() => selectOption(opt)} className="w-full p-5 text-left border border-slate-900 bg-slate-950 hover:border-slate-800 hover:bg-slate-900 transition-all group relative">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white relative z-10">{opt}</span>
                          <ShieldCheck className="absolute right-4 bottom-4 h-6 w-6 opacity-5 group-hover:opacity-20 transition-opacity" />
                        </button>
                      ))
                    ) : (
                      <div className="space-y-8 py-6">
                        <input type="range" min={currentQuestions[step-1].min} max={currentQuestions[step-1].max} className="w-full accent-red-600 h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer" onMouseUp={(e) => selectOption(parseInt((e.target as HTMLInputElement).value))} />
                        <div className="flex justify-between text-[10px] font-mono text-slate-600 uppercase tracking-widest"><span>Minimal Impact</span><span>Critical Point</span></div>
                      </div>
                    )}
                  </div>
                  <button onClick={handleBack} className="flex items-center gap-2 text-slate-500 hover:text-white uppercase text-[10px] font-black tracking-widest transition-colors"><ArrowLeft className="h-3 w-3" /> Previous</button>
                </div>
              ) : (
                <div className="text-center py-10 space-y-8 border border-slate-900 p-10 bg-slate-900/20 relative overflow-hidden">
                  <div className="space-y-4">
                    <AlertTriangle className="h-12 w-12 text-red-600 mx-auto" />
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter">{archetype?.name}</h2>
                    <div className="inline-block px-4 py-1 bg-red-600/10 border border-red-600/20 text-red-600 font-mono text-[10px] font-black tracking-[0.5em] uppercase">Verdict: {archetype?.risk} Risk</div>
                  </div>
                  <p className="text-slate-400 italic text-lg leading-relaxed max-w-md mx-auto">{archetype?.desc}</p>
                  <div className="flex items-center justify-center gap-4 text-red-600 font-mono text-sm border-y border-slate-800 py-4 uppercase tracking-tighter">
                    <TrendingDown className="h-4 w-4" /> Fracture Velocity: {archetype?.vel}/month
                  </div>
                  <div className="grid gap-4 pt-4">
                    <button className="w-full bg-red-600 text-white font-black py-5 uppercase text-[10px] tracking-widest hover:bg-red-700 transition-all">Start 30-Question Forensic Audit</button>
                    <button className="w-full bg-white text-black font-black py-5 uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all">Book Emergency Triage Call</button>
                  </div>
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
