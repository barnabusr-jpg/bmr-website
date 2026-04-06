"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";
import FieldGuide from "@/components/field-guide/FieldGuidePage";
import DiagnosticStep from "./DiagnosticStep";
import { diagnosticQuestions } from "@/data/diagnosticQuestions"; 

const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState<string | null>(null);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // 🛡️ SSR SAFETY CHECK: Prevents "motion is not defined" error during Vercel build
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[600px] bg-[#020617]" />;
  }

  const handleNext = () => {
    if (diagnosticQuestions && currentDimension < diagnosticQuestions.length - 1) {
      setCurrentDimension(prev => prev + 1);
    } else {
      setStep("diagnostic");
    }
  };

  // --- VIEW: TRIAGE ---
  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
      <div className="text-center space-y-6">
        <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white">
          <span>THE LOGIC </span><span className="text-red-600">DECAY SCREENING</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left group min-h-[180px] flex flex-col justify-between">
            <div className="text-red-600 mb-4">{s.icon}</div>
            <div className="space-y-1">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-white leading-none">{s.label}</h3>
              <p className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-[0.2em]">{s.risk}</p>
            </div>
            <ArrowRight className="text-slate-800 group-hover:text-red-600 transition-all" size={18} />
          </button>
        ))}
      </div>
    </motion.div>
  );

  // --- VIEW: INTAKE ---
  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }} className="space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-white">
          <span>FORENSIC PROTOCOL </span><span className="text-red-600">ENGAGED</span>
        </h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-bold">
          <span>Sector Calibrated: </span><span className="text-white font-black">{sector?.toUpperCase()}</span><span> // Baseline Lock Active</span>
        </p>
      </div>
      <div className="bg-slate-950/30 border border-slate-900 p-12 relative backdrop-blur-md max-w-3xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none text-white uppercase placeholder:text-slate-800 transition-all" />
          <input placeholder="CORPORATE_EMAIL" className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none text-white uppercase placeholder:text-slate-800 transition-all" />
        </div>
        <input placeholder="ENTITY_NAME" className="w-full bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none mb-12 text-white uppercase placeholder:text-slate-800 transition-all" />
        <button onClick={() => setStep("audit")} className="w-full bg-red-600 py-8 text-white font-black uppercase italic tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group">
          <span>Initialize Audit Observation </span><ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
        </button>
      </div>
    </motion.div>
  );

  // --- VIEW: AUDIT ---
  const activeQuestions = diagnosticQuestions?.[currentDimension];
  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
      {activeQuestions ? (
        <>
          <DiagnosticStep 
            dimensionTitle={activeQuestions.title}
            dimensionDescription={activeQuestions.description}
            questions={activeQuestions.questions}
            answers={answers}
            onAnswerChange={(qId, val) => setAnswers(prev => ({ ...prev, [qId]: val }))}
          />
          <div className="pt-12 border-t border-slate-900 flex justify-end">
            <button onClick={handleNext} className="bg-red-600 px-12 py-6 text-white font-black uppercase italic tracking-widest text-xs hover:bg-white hover:text-black transition-all">
              {currentDimension === diagnosticQuestions.length - 1 ? "Generate Final Verdict" : "Next Dimension"}
            </button>
          </div>
        </>
      ) : (
        <div className="p-20 border border-red-900 bg-red-900/10 text-center">
          <p className="text-red-600 font-black uppercase italic">Forensic Data Node Missing</p>
        </div>
      )}
    </motion.div>
  );

  // --- VIEW: VERDICT ---
  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="text-center py-12 border-b border-slate-900">
        <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white"><span>FORENSIC </span><span className="text-red-600">VERDICT</span></h2>
      </div>
      <FieldGuide sector={sector || "general"} answers={answers} />
    </motion.div>
  );

  // FINAL RENDER MAP
  const stepMap: Record<string, React.ReactNode> = {
    triage: Triage,
    intake: Intake,
    audit: Audit,
    diagnostic: Verdict
  };

  return (
    <AnimatePresence mode="wait">
      {stepMap[step] || Triage}
    </AnimatePresence>
  );
}
