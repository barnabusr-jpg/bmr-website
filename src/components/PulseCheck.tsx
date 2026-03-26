import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, ShieldAlert, Activity } from "lucide-react";

const QUESTIONS = [
  {
    id: 'q1',
    text: "How often are AI decisions manually overridden by humans?",
    options: [
      { label: "Never (0–5%)", value: "never" },
      { label: "Rarely (6–15%)", value: "rarely" },
      { label: "Sometimes (16–30%)", value: "sometimes" },
      { label: "Often (30%+)", value: "often" }
    ]
  },
  {
    id: 'q2',
    text: "Are AI decisions logged and auditable?",
    options: [
      { label: "Yes, fully auditable", value: "yes" },
      { label: "No, logs are incomplete", value: "no" }
    ]
  },
  // Additional questions from your documentation...
];

export default function PulseCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = async (value: string) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: value };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const res = await fetch('/api/pulse-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: newAnswers }),
      });
      const data = await res.json();
      setResult(data);
    }
  };

  if (result) {
    return (
      <Card className="p-8 bg-slate-900 border-red-900/50 text-white max-w-2xl mx-auto border-2 font-mono">
        <div className="flex items-center gap-3 text-red-500 mb-6 uppercase tracking-widest text-[10px] font-black">
          <ShieldAlert className="h-4 w-4" />
          Stress Test Complete // Results Gated
        </div>
        <h3 className="text-3xl font-black italic mb-4">{result.archetype}</h3>
        <div className="text-5xl font-black text-white mb-6 tracking-tighter italic">Δ: {result.delta}</div>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed italic border-l-2 border-slate-700 pl-4">
          "Your system shows signs of active shear. Strategic intent is diverging from operational reality."
        </p>
        <Button className="w-full bg-red-600 hover:bg-red-700 font-black uppercase text-xs h-14">
          Unlock Full 72-Question Deep Audit
        </Button>
      </Card>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-20 px-6">
      <div className="mb-12">
        <div className="flex justify-between text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-4">
          <span>Forensic Probe {step + 1}/{QUESTIONS.length}</span>
          <span>Auth Required</span>
        </div>
        <div className="h-1 bg-slate-200 w-full">
          <div 
            className="h-full bg-red-600 transition-all duration-500" 
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} 
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-black italic text-slate-900 leading-tight">
            {QUESTIONS[step].text}
          </h2>
          <div className="grid gap-3">
            {QUESTIONS[step].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="group flex justify-between items-center p-6 border-2 border-slate-200 hover:border-red-600 hover:bg-red-50 transition-all text-left"
              >
                <span className="font-bold text-slate-700 group-hover:text-red-900">{opt.label}</span>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-red-600" />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
