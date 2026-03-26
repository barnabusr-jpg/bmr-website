"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ArrowRight, Loader2, RefreshCcw } from 'lucide-react';

const QUESTIONS = [
  { id: 0, text: "How often do human operators manually override AI-suggested actions without logging the reason?", category: "HAI" },
  { id: 1, text: "Is there a documented 'Value Floor' for this AI, or is success measured by 'Usage Volume'?", category: "AVS" },
  { id: 2, text: "Can you reconstruct the logic of a decision made by the system 6 months ago for an audit?", category: "IGF" },
  { id: 3, text: "Do operators describe the AI as a 'Black Box' or a 'Partner'?", category: "HAI" },
  { id: 4, text: "Has the technical architecture been updated to reflect the actual workflow of the users?", category: "AVS" },
  { id: 5, text: "Is there a formal escalation protocol when the system produces a high-confidence error?", category: "IGF" },
  { id: 6, text: "What is the delta between the AI's predicted efficiency and the actual realized margin?", category: "AVS" },
  { id: 7, text: "Do senior leaders have a dashboard showing systemic drift, or just uptime?", category: "IGF" },
  { id: 8, text: "Are team members performing 'Shadow Labor' to fix AI outputs before they reach the client?", category: "HAI" },
  { id: 9, text: "Is the AI's 'Strategic Intent' still aligned with your current quarterly objectives?", category: "AVS" },
  { id: 10, text: "If the AI was turned off tomorrow, would your core operations collapse or continue?", category: "IGF" },
  { id: 11, text: "How many users have stopped using the tool entirely due to 'Hallucination Fatigue'?", category: "HAI" }
];

const PulseCheck = () => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'loading' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<{ hai: number; avs: number; igf: number; overallDrift: number } | null>(null);

  const handleStart = () => setStep('quiz');

  const handleAnswer = async (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStep('loading');
      try {
        const response = await fetch('/api/pulse-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers }),
        });
        const data = await response.json();
        setResults(data);
        setStep('results');
      } catch (e) {
        console.error("Forensic Probe Failure:", e);
        setStep('intro'); // Reset on error
      }
    }
  };

  const reset = () => {
    setStep('intro');
    setCurrentQuestion(0);
    setAnswers([]);
    setResults(null);
  };

  return (
    <div className="max-w-4xl mx-auto min-h-[500px] flex flex-col justify-center items-center p-8 bg-slate-900/20 border-2 border-slate-900 relative overflow-hidden">
      {/* Background forensic grid decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(white,transparent)]"></div>

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center z-10"
          >
            <div className="bg-red-600/10 p-4 w-fit mx-auto mb-6">
              <ShieldAlert className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-black italic uppercase text-white mb-4 tracking-tighter">
              Initialize <span className="text-red-600">Forensic Probe</span>
            </h2>
            <p className="text-slate-400 mb-8 italic text-sm max-w-md mx-auto leading-relaxed">
              Identify the hidden &quot;Value Leaks&quot; and systemic drift in your current AI implementation. 12 data points. 2 minutes.
            </p>
            <button 
              onClick={handleStart}
              className="group flex items-center gap-3 bg-red-600 text-white px-8 py-4 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-red-600 transition-all"
            >
              Start Diagnostic <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full z-10"
          >
            <div className="flex justify-between items-end mb-12">
              <div className="space-y-1">
                <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-widest">
                  Probe Active: {QUESTIONS[currentQuestion].category}
                </span>
                <h3 className="text-xl font-black text-white italic uppercase tracking-tight">
                  {QUESTIONS[currentQuestion].text}
                </h3>
              </div>
              <span className="text-slate-700 font-mono text-[10px]">
                {currentQuestion + 1}/{QUESTIONS.length}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleAnswer(val)}
                  className="h-16 border-2 border-slate-800 hover:border-red-600 text-slate-500 hover:text-white font-black transition-all flex items-center justify-center group relative overflow-hidden"
                >
                  <span className="relative z-10">{val}</span>
                  <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6 text-[8px] font-black uppercase tracking-widest text-slate-600 italic">
              <span>Never / None</span>
              <span>Constant / Critical</span>
            </div>
          </motion.div>
        )}

        {step === 'loading' && (
          <motion.div 
            key="loading"
            className="flex flex-col items-center gap-4 z-10"
          >
            <Loader2 className="h-12 w-12 text-red-600 animate-spin" />
            <p className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
              Reconstructing Logic Chains...
            </p>
          </motion.div>
        )}

        {step === 'results' && results && (
          <motion.div 
            key="results"
            className="w-full z-10"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter mb-2">
                Diagnostic <span className="text-red-600">Complete</span>
              </h2>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                Systemic Drift Score: {results.overallDrift}%
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { label: 'HAI', val: results.hai, desc: 'Human-AI Resonance' },
                { label: 'AVS', val: results.avs, desc: 'Adoption Value' },
                { label: 'IGF', val: results.igf, desc: 'Inst. Governance' }
              ].map((r) => (
                <div key={r.label} className="p-6 bg-slate-900 border border-slate-800 text-center">
                  <span className="block text-red-600 font-black text-2xl mb-1">{r.val}%</span>
                  <span className="block text-white font-black text-[10px] uppercase tracking-widest mb-2">{r.label}</span>
                  <p className="text-slate-500 text-[9px] italic leading-tight">{r.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={reset}
                className="flex items-center justify-center gap-2 border-2 border-slate-800 text-slate-400 px-6 py-3 font-black uppercase tracking-widest text-[10px] hover:text-white transition-all"
              >
                <RefreshCcw className="h-3 w-3" /> Re-Scan
              </button>
              <button 
                className="bg-red-600 text-white px-10 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-red-600 transition-all"
              >
                Download Forensic Report
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PulseCheck;
