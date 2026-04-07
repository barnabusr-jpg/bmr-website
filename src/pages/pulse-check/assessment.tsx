"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  { text: "Does your AI output directly trigger a fiscal or operational action without a manual 'Circuit Breaker'?", weight: 15 },
  { text: "Have employees utilized unvetted LLM endpoints for sensitive document summarization in the last 30 days?", weight: 12 },
  { text: "Is there a documented >15% decrease in manual 'double-check' protocols for AI-generated financial or legal reports?", weight: 10 },
  { text: "Does your organization lack a centralized registry of all third-party AI dependencies (Shadow AI)?", weight: 9 },
  { text: "Are AI-generated customer responses considered legally binding by your current Terms of Service?", weight: 11 },
  { text: "Has your model's accuracy drifted by more than 5% without an automated security alert?", weight: 8 },
  { text: "Is sensitive PII ingested into training sets without a dynamic de-identification layer?", weight: 14 },
  { text: "Do non-technical executives have the power to override AI security warnings for speed-to-market?", weight: 13 },
  { text: "Is there a verified plan for 'Human-in-the-loop' recovery in the event of a total model blackout?", weight: 7 },
  { text: "Are AI vendors allowed to use your corporate data for their own model training?", weight: 10 },
  { text: "Does your internal audit team lack a dedicated 'Forensic AI' specialist?", weight: 8 },
  { text: "Can a single human clerical error trigger a high-velocity automated market or supply-chain event?", weight: 15 }
];

export default function ForensicAssessment() {
  const [step, setStep] = useState(0);
  const [totalRisk, setTotalRisk] = useState(0);
  const router = useRouter();

  const handleAnswer = (impact: number) => {
    const newScore = totalRisk + impact;
    if (step < QUESTIONS.length - 1) {
      setTotalRisk(newScore);
      setStep(step + 1);
    } else {
      router.push(`/pulse-check/results?score=${newScore}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow pt-48 px-6 container mx-auto max-w-4xl">
        <div className="space-y-12">
          <div className="flex justify-between items-end border-b border-slate-900 pb-4">
            <h2 className="text-xl font-black uppercase italic tracking-tighter italic font-mono text-red-600">NODE_STEP_0{step + 1}</h2>
            <div className="h-1 w-48 bg-slate-900"><motion.div className="h-full bg-red-600" animate={{ width: `${((step + 1) / 12) * 100}%` }} /></div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12 py-12">
              <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-tight text-slate-200">{QUESTIONS[step].text}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
                <button onClick={() => handleAnswer(QUESTIONS[step].weight)} className="p-8 border border-slate-800 bg-slate-950/50 text-left hover:border-red-600 group transition-all">
                  <p className="text-[9px] font-mono text-red-600 uppercase tracking-widest mb-2 font-black">Option_01</p>
                  <p className="text-xl font-black uppercase italic text-slate-400 group-hover:text-white transition-colors">AFFIRMATIVE / HIGH_RISK</p>
                </button>
                <button onClick={() => handleAnswer(0)} className="p-8 border border-slate-800 bg-slate-950/50 text-left hover:border-slate-500 group transition-all">
                  <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-2 font-black">Option_02</p>
                  <p className="text-xl font-black uppercase italic text-slate-400 group-hover:text-white transition-colors">NEGATIVE / LOW_RISK</p>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
