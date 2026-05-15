"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Stethoscope, Factory, ShoppingCart } from "lucide-react";

const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

export default function PulseCheck() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [selectedLens, setSelectedLens] = useState<string | null>(null);
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const validateIntake = () => {
    return operatorName.length > 1 && entityName.length > 1 && email.includes('@') && email === confirmEmail;
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans italic overflow-x-hidden uppercase font-black relative flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center py-40 px-6 relative text-center">
        <AnimatePresence mode="wait">
          
          {step === 'triage' && (
            <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-5xl space-y-16">
              <div className="border-b border-slate-900 pb-12 flex flex-col items-center">
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white italic">
                  STRATEGY <span className="text-red-600">INTAKE</span>
                </h1>

                <motion.div 
                  animate={{ opacity: [1, 0.4, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex items-center gap-4 mt-8 text-red-600"
                >
                   <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)]" />
                   <p className="text-[10px] font-mono uppercase tracking-[0.5em] font-bold">
                     {selectedLens ? `STATUS: FOCUS LOCKED [${selectedLens}] // SELECT SECTOR` : "STATUS: AWAITING FOCUS SELECTION"}
                   </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((node) => (
                  <button key={node} onClick={() => setSelectedLens(node)}
                    className={`p-10 border-2 flex flex-col items-center justify-center gap-4 transition-all min-h-[180px] ${selectedLens === node ? 'bg-red-600 border-red-600 text-white shadow-2xl scale-105' : 'bg-slate-950 border-slate-900 text-slate-700 hover:border-slate-500'}`}>
                    <span className="font-black italic text-xl tracking-[0.1em] uppercase">{node}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full pt-10">
                {sectors.map((s) => (
                  <button key={s.id} disabled={!selectedLens} onClick={() => setStep("intake")}
                    className="p-10 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-center flex flex-col items-center justify-between h-64 group disabled:opacity-20">
                    <div className="text-red-600 group-hover:scale-110 transition-transform mb-4">{s.icon}</div>
                    <div>
                      <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter leading-none">{s.label}</h3>
                      <p className="text-[11px] font-mono font-bold text-red-600 uppercase tracking-widest mt-2 italic">{s.risk}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'intake' && (
            <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-4xl space-y-12 italic text-center">
              <div className="border-b border-slate-900 pb-10 flex flex-col items-center">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none italic">
                  ENTITY <span className="text-red-600 italic">REGISTRATION</span>
                </h2>
                <motion.div 
                  animate={{ opacity: [1, 0.4, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex items-center gap-4 mt-8 text-red-600"
                >
                   <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)]" />
                   <p className="text-[10px] font-mono uppercase tracking-[0.5em] font-bold">
                     {validateIntake() ? "VALIDATION COMPLETE // INITIALIZE INTAKE" : "STATUS: PROVIDE ENTITY DETAILS"}
                   </p>
                </motion.div>
              </div>

              <div className="bg-slate-950 border border-slate-900 p-12 space-y-12 shadow-2xl text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Full Name</label>
                    <input placeholder="ENTER NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Organization</label>
                    <input placeholder="ENTER COMPANY" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                  </div>
                  <div className="space-y-3 relative">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Business Email</label>
                    <input placeholder="USER@COMPANY.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Verify Email</label>
                    <input placeholder="CONFIRM EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                  </div>
                </div>
                <div className="pt-6">
                  <button disabled={!validateIntake()} onClick={() => setStep("audit")}
                    className="w-full py-8 font-black uppercase italic bg-red-600 text-white disabled:opacity-10 text-2xl tracking-[0.2em] hover:bg-white hover:text-red-600 transition-all border-2 border-red-600 flex items-center justify-center">
                    INITIALIZE INTAKE
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
