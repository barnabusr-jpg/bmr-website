"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Banknote, Stethoscope, Factory, ShoppingCart, ShieldCheck, ArrowRight, AlertTriangle } from "lucide-react";

const sectors = [
  { id: "finance", label: "Financial Services", icon: <Banknote size={24} />, mult: 1.65, desc: "Fiduciary & Regulatory Logic" },
  { id: "healthcare", label: "Life Sciences", icon: <Stethoscope size={24} />, mult: 1.80, desc: "Clinical & Safety Logic" },
  { id: "manufacturing", label: "Industrial / Logistics", icon: <Factory size={24} />, mult: 1.45, desc: "Operational & Margin Logic" },
  { id: "retail", label: "Retail / E-Commerce", icon: <ShoppingCart size={24} />, mult: 1.20, desc: "Customer Trust & Churn Calibration" }
];

export default function VaultAlpha() {
  const [step, setStep] = useState("sector");
  const [selectedSector, setSelectedSector] = useState<any>(null);

  const selectSector = (s: any) => {
    setSelectedSector(s);
    localStorage.setItem("bmr_selected_sector", s.id);
    setStep("diagnostic");
  };

  const currentHemorrhage = useMemo(() => {
    if (!selectedSector) return "0.0";
    // Using the 1.2M baseline as the starting point for the live signal
    return (1.2 * selectedSector.mult).toFixed(1);
  }, [selectedSector]);

  return (
    <div className="min-h-screen bg-[#020617] text-white py-32 px-6 font-sans">
      <div className="container mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          {step === "sector" && (
            <motion.div key="sector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-16">
                <h2 className="text-5xl font-black uppercase italic mb-4 tracking-tighter">
                  Initialize <span className="text-red-600">Sector Calibration</span>
                </h2>
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] italic font-bold">
                  Select Economic Anchor to Unlock $1.2M Baseline Audit
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sectors.map((s) => (
                  <button 
                    key={s.id} 
                    onClick={() => selectSector(s)} 
                    className="p-8 bg-slate-950 border-2 border-slate-900 hover:border-red-600 transition-all text-left group relative overflow-hidden flex flex-col justify-between min-h-[180px]"
                  >
                    <div>
                      <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
                      <h3 className="text-xl font-black uppercase italic leading-none tracking-tighter mb-2">{s.label}</h3>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-relaxed">{s.desc}</p>
                    </div>
                    <ArrowRight className="absolute bottom-6 right-6 text-slate-900 group-hover:text-red-600 transition-transform group-hover:translate-x-1" size={18} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "diagnostic" && (
            <motion.div key="diag" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-12 border-b border-slate-900 pb-6">
                  <h2 className="text-xl font-black uppercase italic flex items-center gap-3">
                    <ShieldCheck className="text-red-600" /> {selectedSector?.label} Audit Node
                  </h2>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic">Diagnostic Active</span>
                </div>

                <Card className="p-16 bg-slate-950 border-slate-800 border-2 border-dashed h-96 flex flex-col items-center justify-center space-y-6">
                   <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                   <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] italic text-center max-w-sm">
                      Initializing forensic logic chains for {selectedSector?.label} environment...
                   </p>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="bg-slate-900/40 border-2 border-red-600/20 p-8 sticky top-32">
                  <div className="flex items-center gap-2 mb-8">
                    <AlertTriangle className="text-red-600" size={16} />
                    <span className="text-[10px] font-mono uppercase text-slate-500 tracking-widest font-bold">Baseline Signal</span>
                  </div>
                  
                  <div className="text-6xl font-black italic tracking-tighter text-white mb-2">${currentHemorrhage}M</div>
                  
                  <p className="text-[10px] font-mono text-red-600 uppercase font-black tracking-widest mb-10">
                    CALIBRATED {selectedSector?.id} LIABILITY
                  </p>
                  
                  <div className="space-y-6 pt-6 border-t border-slate-800">
                    <p className="text-[10px] text-slate-400 italic leading-relaxed uppercase tracking-wider">
                      This signal represents the compounding drift of your initial $1.2M capital investment.
                    </p>
                    <p className="text-[9px] text-slate-600 font-mono uppercase tracking-[0.2em]">
                      Status: Logic Trace Validated
                    </p>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
