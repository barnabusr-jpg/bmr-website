"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";

const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

export default function VaultAlpha() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");

  useEffect(() => {
    setMounted(true);
    console.log("BMR_CORE_LOADED");
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full">
        <AnimatePresence mode="wait">
          {step === "triage" && (
            <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
                  <span>LOGIC </span><span className="text-red-600">DECAY TEST</span>
                </h1>
                <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                  <span>Standard bypass active // Components detached</span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {sectors.map((s) => (
                  <button 
                    key={s.id} 
                    onClick={() => setStep("check")} 
                    className="p-8 bg-slate-950 border border-slate-900 hover:border-red-600 transition-all text-left flex flex-col gap-4"
                  >
                    <div className="text-red-600">{s.icon}</div>
                    <span className="font-black italic uppercase text-sm tracking-tighter">{s.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "check" && (
            <motion.div key="check" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8">
              <h2 className="text-4xl font-black uppercase italic italic"><span>BYPASS SUCCESSFUL</span></h2>
              <button 
                onClick={() => setStep("triage")}
                className="bg-red-600 px-8 py-4 font-black uppercase text-xs tracking-widest"
              >
                <span>Reset Protocol</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
