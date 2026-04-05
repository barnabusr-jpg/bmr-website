"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";
import FieldGuide from "@/components/field-guide/FieldGuidePage";

const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

export default function ConsolidatedDiagnostic() {
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState<string | null>(null);

  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
      <div className="text-center space-y-6">
        <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white">
          <span>THE LOGIC </span><span className="text-red-600">DECAY SCREENING</span>
        </h1>
        <p className="text-slate-400 italic text-xl max-w-2xl mx-auto leading-relaxed">
          <span>Most organizations </span><span className="text-red-600 font-bold uppercase italic leading-none">Automate Decay</span><span>. This turns a $1.2M AI project into a </span><span className="text-red-600 font-bold italic leading-none">$20.4M hemorrhage</span><span>.</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left group relative min-h-[180px] flex flex-col justify-between backdrop-blur-sm">
            <div className="text-red-600 mb-4">{s.icon}</div>
            <div className="space-y-1">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-white leading-none">{s.label}</h3>
              <p className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-[0.2em]">{s.risk}</p>
            </div>
            <ArrowRight className="absolute bottom-6 right-6 text-slate-800 group-hover:text-red-600 transition-all" size={18} />
          </button>
        ))}
      </div>
    </motion.div>
  );

  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
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
          <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none text-white uppercase" />
          <input placeholder="CORPORATE_EMAIL" className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none text-white uppercase" />
        </div>
        <input placeholder="ENTITY_NAME" className="w-full bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none mb-12 text-white uppercase" />
        <button onClick={() => setStep("diagnostic")} className="w-full bg-red-600 py-8 text-white font-black uppercase italic tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4">
          <span>Initialize Audit Observation </span><ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );

  const Diagnostic = (
    <motion.div key="diagnostic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="text-center py-12 border-b border-slate-900">
        <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none text-white">
          <span>FORENSIC </span><span className="text-red-600">VERDICT</span>
        </h2>
      </div>
      <FieldGuide sector={sector || "general"} />
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {step === "triage" ? Triage : step === "intake" ? Intake : Diagnostic}
    </AnimatePresence>
  );
}
