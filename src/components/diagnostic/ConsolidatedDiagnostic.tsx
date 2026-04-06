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
  const [userRole, setUserRole] = useState("");
  const [entityName, setEntityName] = useState("");
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  // Transition Handler
  const handleNext = () => {
    const totalDimensions = diagnosticQuestions?.length || 0;
    if (currentDimension < totalDimensions - 1) {
      setCurrentDimension(prev => prev + 1);
    } else {
      setStep("verdict");
    }
  };

  const renderContent = () => {
    switch (step) {
      case "triage":
        return (
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

      case "intake":
        return (
          <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-5xl font-black uppercase italic text-white"><span>FORENSIC PROTOCOL </span><span className="text-red-600">ENGAGED</span></h2>
            </div>
            <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-3xl mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono text-white uppercase outline-none focus:border-red-600" />
                <input placeholder="CORPORATE_EMAIL" className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono text-white uppercase outline-none focus:border-red-600" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <input value={entityName} onChange={(e) => setEntityName(e.target.value)} placeholder="ENTITY_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono text-white uppercase outline-none focus:border-red-600" />
                <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono text-white uppercase outline-none focus:border-red-600 appearance-none">
                  <option value="" disabled>SELECT_OPERATOR_ROLE</option>
                  <option value="executive">EXECUTIVE_STRATEGY</option>
                  <option value="managerial">MANAGERIAL_OPERATIONS</option>
                  <option value="technical">TECHNICAL_IMPLEMENTATION</option>
                </select>
              </div>
              <button onClick={() => setStep("audit")} className="w-full bg-red-600 py-8 text-white font-black uppercase italic tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all">
                <span>Initialize Audit Observation</span>
              </button>
            </div>
          </motion.div>
        );

      case "audit":
        const activeQuestions = diagnosticQuestions?.[currentDimension];
        if (!activeQuestions) return <div className="text-red-600 font-mono">CRITICAL_DATA_NODE_FAILURE</div>;
        return (
          <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
            <DiagnosticStep 
              dimensionTitle={activeQuestions.title}
              dimensionDescription={activeQuestions.description}
              questions={activeQuestions.questions}
              answers={answers}
              onAnswerChange={(qId, val) => setAnswers(prev => ({ ...prev, [qId]: val }))}
            />
            <div className="pt-12 border-t border-slate-900 flex justify-end">
              <button onClick={handleNext} className="bg-red-600 px-12 py-6 text-white font-black uppercase italic tracking-widest text-xs">
                {currentDimension === (diagnosticQuestions?.length || 0) - 1 ? "Generate Final Verdict" : "Next Dimension"}
              </button>
            </div>
          </motion.div>
        );

      case "verdict":
        return (
          <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="text-center py-12 border-b border-slate-900">
              <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white"><span>FORENSIC </span><span className="text-red-600">VERDICT</span></h2>
            </div>
            <FieldGuide sector={sector || "general"} answers={answers} />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderContent()}
    </AnimatePresence>
  );
}
