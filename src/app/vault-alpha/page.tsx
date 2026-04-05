"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FieldGuide from "@/components/field-guide/FieldGuidePage";

const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

export default function VaultAlpha() {
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState<string | null>(null);

  const selectSector = (id: string) => {
    setSector(id);
    localStorage.setItem("bmr_selected_sector", id);
    setStep("intake");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
      <Header />
      <main className="flex-grow pt-48 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {step === "triage" && (
              <motion.div key="triage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                <div className="text-center space-y-4">
                  <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-none">
                    <span>THE LOGIC </span><span className="text-red-600">DECAY SCREENING</span>
                  </h1>
                  <p className="text-slate-400 italic text-lg max-w-2xl mx-auto leading-relaxed">
                    <span>Most organizations </span><span className="text-red-600 font-bold uppercase italic leading-none">Automate Decay</span><span>. This turns a $1.2M AI project into a </span><span className="text-red-600 font-bold italic">$20.4M hemorrhage</span><span>.</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {sectors.map((s) => (
                    <button key={s.id} onClick={() => selectSector(s.id)} className="p-8 bg-slate-950 border-2 border-slate-900 hover:border-red-600 transition-all text-left group relative overflow-hidden flex flex-col justify-between min-h-[160px]">
                      <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-white leading-none">{s.label}</h3>
                        <p className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-[0.2em]">{s.risk}</p>
                      </div>
                      <ArrowRight className="absolute bottom-6 right-6 text-slate-900 group-hover:text-red-600 group-hover:translate-x-1 transition-all" size={18} />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "intake" && (
              <motion.div key="intake" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-12">
                <div className="text-center space-y-2">
                  <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
                    <span>FORENSIC PROTOCOL </span><span className="text-red-600">ENGAGED</span>
                  </h2>
                  <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic font-bold leading-none">
                    <span>Sector Calibrated: </span><span>{sector?.toUpperCase()}</span><span> // Baseline Lock Active</span>
                  </p>
                </div>
                <div className="bg-slate-900/10 border border-slate-900 p-12 relative rounded-sm">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none transition-all text-white placeholder:text-slate-700 uppercase" />
                      <input placeholder="CORPORATE_EMAIL" className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none transition-all text-white placeholder:text-slate-700 uppercase" />
                   </div>
                   <input placeholder="ENTITY_NAME" className="w-full bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none transition-all mb-12 text-white placeholder:text-slate-700 uppercase" />
                   <button onClick={() => setStep("diagnostic")} className="w-full bg-red-600 py-8 text-white font-black uppercase italic tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 shadow-lg shadow-red-900/20">
                     <span>Initialize Audit Observation </span><ArrowRight size={18} />
                   </button>
                </div>
              </motion.div>
            )}

            {step === "diagnostic" && (
              <motion.div key="diagnostic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <div className="text-center py-12 border-b border-slate-900">
                  <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
                    <span>FORENSIC </span><span className="text-red-600">VERDICT</span>
                  </h2>
                </div>
                <FieldGuide sector={sector || "general"} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
