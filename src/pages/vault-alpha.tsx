"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Banknote, Stethoscope, Factory, ShieldCheck, ArrowRight, AlertTriangle } from "lucide-react";

const sectors = [
  { id: "finance", label: "Financial Services", icon: <Banknote size={24} />, mult: 1.8, desc: "Fiduciary & Regulatory Logic" },
  { id: "healthcare", label: "Life Sciences", icon: <Stethoscope size={24} />, mult: 2.0, desc: "Clinical & Safety Logic" },
  { id: "manufacturing", label: "Industrial / Logistics", icon: <Factory size={24} />, mult: 1.4, desc: "Operational & Margin Logic" }
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
    return (17.8 * 0.45 * selectedSector.mult).toFixed(1);
  }, [selectedSector]);

  return (
    <div className="min-h-screen bg-[#020617] text-white py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          {step === "sector" && (
            <motion.div key="sector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-4xl font-black uppercase italic mb-12 text-center tracking-tighter">
                Initialize <span className="text-red-600">Sector Calibration</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sectors.map((s) => (
                  <button key={s.id} onClick={() => selectSector(s)} className="p-10 bg-slate-950 border-2 border-slate-900 hover:border-red-600 transition-all text-left group relative overflow-hidden">
                    <div className="text-red-600 mb-6">{s.icon}</div>
                    <h3 className="text-xl font-black uppercase italic mb-2">{s.label}</h3>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{s.desc}</p>
                    <ArrowRight className="absolute bottom-8 right-8 text-slate-900 group-hover:text-red-600 transition-transform group-hover:translate-x-2" size={20} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "diagnostic" && (
            <motion.div key="diag" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black uppercase italic flex items-center gap-3">
                    <ShieldCheck className="text-red-600" /> {selectedSector?.label} Audit Node
                  </h2>
                </div>
                <Card className="p-12 bg-slate-950 border-slate-800 border-2 h-64 flex items-center justify-center">
                   <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic text-center">
                      Forensic Questions Initializing for {selectedSector?.label} Sector...
                   </p>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="bg-slate-900/40 border-2 border-red-600/20 p-8 sticky top-32">
                  <AlertTriangle className="text-red-600 mb-6" size={32} />
                  <div className="text-5xl font-black italic tracking-tighter text-white mb-2">${currentHemorrhage}M</div>
                  <p className="text-[9px] font-mono text-red-600 uppercase font-black tracking-widest">
                    {selectedSector?.label} Hemorrhage Signal
                  </p>
                  <p className="mt-8 pt-6 border-t border-slate-800 text-[10px] text-slate-400 italic leading-relaxed uppercase tracking-wider">
                    Calculated against a $1.2M baseline investment calibrated for the {selectedSector?.id} sector.
                  </p>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
