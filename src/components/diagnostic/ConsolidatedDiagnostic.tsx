"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";
import FieldGuide from "@/components/field-guide/FieldGuidePage";
import DiagnosticStep from "./DiagnosticStep";
// Import your question data here
import { diagnosticQuestions } from "@/data/diagnosticQuestions"; 

export default function ConsolidatedDiagnostic() {
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState<string | null>(null);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerChange = (qId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  // Logic to advance the audit or finish
  const handleNext = () => {
    if (currentDimension < diagnosticQuestions.length - 1) {
      setCurrentDimension(prev => prev + 1);
    } else {
      setStep("diagnostic");
    }
  };

  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
      {/* ... Existing Triage Header ... */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="...">
             {/* ... Existing Button Content ... */}
          </button>
        ))}
      </div>
    </motion.div>
  );

  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
      {/* ... Existing Intake Form ... */}
      <button onClick={() => setStep("audit")} className="...">
        <span>Initialize Audit Observation </span><ArrowRight size={18} />
      </button>
    </motion.div>
  );

  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
      <DiagnosticStep 
        dimensionTitle={diagnosticQuestions[currentDimension].title}
        dimensionDescription={diagnosticQuestions[currentDimension].description}
        questions={diagnosticQuestions[currentDimension].questions}
        answers={answers}
        onAnswerChange={handleAnswerChange}
      />
      
      <div className="pt-12 border-t border-slate-900 flex justify-end">
        <button 
          onClick={handleNext}
          className="bg-red-600 px-12 py-6 text-white font-black uppercase italic tracking-widest text-xs hover:bg-white hover:text-black transition-all"
        >
          {currentDimension === diagnosticQuestions.length - 1 ? "Generate Final Verdict" : "Next Dimension"}
        </button>
      </div>
    </motion.div>
  );

  const Diagnostic = (
    <motion.div key="diagnostic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
      {/* ... Existing Diagnostic Verdict ... */}
      <FieldGuide sector={sector || "general"} answers={answers} />
    </motion.div>
  );

  // Map the views to current state
  let content;
  if (step === "triage") content = Triage;
  else if (step === "intake") content = Intake;
  else if (step === "audit") content = Audit;
  else content = Diagnostic;

  return (
    <AnimatePresence mode="wait">
      {content}
    </AnimatePresence>
  );
}
