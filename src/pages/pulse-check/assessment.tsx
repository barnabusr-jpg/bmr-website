import React, { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight, ArrowLeft, Activity, ShieldCheck } from "lucide-react";

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const protocolText = "Status: Diagnostic Active";
  
  const questions = [
    { id: 1, text: "How often do human operators manually 'fix' AI output before it reaches production?", weight: "Operational Drift" },
    { id: 2, text: "Is the internal perception of AI success consistent across Executive and Technical teams?", weight: "Delta Gap" },
    { id: 3, text: "Does the system provide a clear audit trail for every automated decision made?", weight: "Structural Integrity" },
    // Simplified for build test - you can expand this to 12 questions here
  ];

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);
  const selectOption = (val: number) => {
    setAnswers({ ...answers, [step]: val });
    handleNext();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Head>
        <title>BMR | Forensic Assessment</title>
      </Head>
      
      <Header />

      <main className="pt-40 pb-20 px-6 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full space-y-8">
          
          <div className="flex justify-between items-center border-b border-slate-900 pb-4">
            <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] uppercase tracking-widest">
              <Activity className="h-3 w-3" />
              Step {step + 1} of {questions.length + 1}
            </div>
            <div className="text-[10px] text-slate-600 font-mono uppercase tracking-tighter italic">
              {protocolText}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {step === 0 ? (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Initialize Identity</h2>
                    <p className="text-red-600 italic uppercase text-[10px] font-black tracking-[0.3em]">Select your primary operational lens</p>
                  </div>
                  <div className="grid gap-3">
                    {['Executive', 'Managerial', 'Technical'].map((r) => (
                      <button
                        key={r}
                        onClick={() => { setRole(r); handleNext(); }}
                        className="w-full p-6 text-left border border-slate-900 bg-slate-900/50 hover:border-red-600 hover:bg-red-600/10 transition-all group flex justify-between items-center"
                      >
                        <span className="text-xl font-bold uppercase italic tracking-tight text-slate-400 group-hover:text-white">{r}</span>
                        <Terminal className="h-4 w-4 text-slate-800 group-hover:text-red-600" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : step <= questions.length ? (
                <div className="space-y-12">
                  <div>
                    <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
                      Metric: {questions[step - 1].weight}
                    </span>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-tight">
                      {questions[step - 1].text}
                    </h2>
                  </div>
                  
                  <div className="grid gap-3">
                    {[
                      { label: "High Frequency | Critical Concern", val: 3 },
                      { label: "Intermittent | Moderate Drift", val: 2 },
                      { label: "Minimal | Controlled Output", val: 1 }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => selectOption(opt.val)}
                        className="w-full p-5 text-left border border-slate-900 bg-slate-950 hover:border-slate-700 hover:bg-slate-900 transition-all group relative overflow-hidden"
                      >
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white relative z-10">{opt.label}</span>
                        <div className="absolute right-0 bottom-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                          <ShieldCheck className="h-12 w-12 text-white" />
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-slate-900">
                    <button onClick={handleBack} className="flex items-center gap-2 text-slate-500 hover:text-white uppercase text-[10px] font-black tracking-widest transition-colors">
                      <ArrowLeft className="h-3 w-3" /> Previous Step
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 space-y-6">
                  <Activity className="h-12 w-12 text-red-600 mx-auto animate-pulse" />
                  <h2 className="text-3xl font-black uppercase italic italic tracking-tighter">Analysis Complete</h2>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto uppercase tracking-widest leading-loose">The forensic engine is calculating your Δ Score and structural archetype.</p>
                  <button className="bg-white text-black font-black px-10 py-4 uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all">
                    View Forensic Report
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
