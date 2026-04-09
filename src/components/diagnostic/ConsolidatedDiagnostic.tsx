"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Banknote, Stethoscope, Factory, ShoppingCart, ChevronRight, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ForensicLoader from "@/components/ForensicLoader";
import LogicLeakTicker from "@/components/LogicLeakTicker";

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState("finance");
  const [userRole, setUserRole] = useState("executive"); // The Identity Anchor
  const [aiSpend, setAiSpend] = useState(1.2);
  const [operatorName, setOperatorName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (confirmEmail.length > 0 && email !== confirmEmail) setValidationError("EMAIL_MISMATCH");
    else setValidationError(null);
  }, [email, confirmEmail]);

  if (!mounted) return null;

  const getLiveMetrics = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const multiplier = Math.pow(aiSpend / 1.2, 1.15); 
    const scaledTotal = (totalSum * 0.04 * 1.1) * multiplier;
    return {
      decay: Math.min(Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100), 98),
      rework: (scaledTotal * 0.38).toFixed(1),
      delta: (scaledTotal * 0.32).toFixed(1),
      roi: aiSpend > 0 ? -((scaledTotal / aiSpend) * 100).toFixed(1) : "0"
    };
  };

  const getMissingNodes = (role: string) => {
    return ["executive", "managerial", "technical"].filter(r => r !== role);
  };

  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">FORENSIC PROTOCOL <span className="text-red-600">ENGAGED</span></h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic">Sector: {sector.toUpperCase()} // Anchor: {userRole.toUpperCase()}</p>
      </div>
      <div className="bg-slate-950 border border-slate-900 p-12 max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-2">Operational_Lens</label>
            <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase text-white w-full focus:border-red-600 outline-none appearance-none">
              <option value="executive">EXECUTIVE // CAPITAL_EXPOSURE</option>
              <option value="managerial">MANAGERIAL // VELOCITY_LATENCY</option>
              <option value="technical">TECHNICAL // STACK_DECAY</option>
            </select>
          </div>
          <input placeholder="OPERATOR_NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600" />
          <input placeholder="CORPORATE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600" />
          <input placeholder="CONFIRM_PROTOCOL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className={`bg-slate-950 border ${validationError ? 'border-red-600 animate-pulse' : 'border-slate-800'} p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600`} />
        </div>
        <button disabled={!!validationError || !email} onClick={() => { setIsLoading(true); setStep("audit"); }} className="w-full py-8 font-black uppercase italic text-xs tracking-[0.4em] bg-red-600 text-white hover:bg-white hover:text-black transition-all">Initialize Observation</button>
      </div>
    </motion.div>
  );

  const Verdict = (
    <motion.div key="verdict" className="space-y-12 py-10 px-4">
      <h2 className="text-7xl font-black italic uppercase text-white text-center">CAPITAL DECAY: <span className="text-red-600">{getLiveMetrics().decay}%</span></h2>
      <div className="max-w-2xl mx-auto space-y-12">
        {/* TRIANGULATION PENDING UI */}
        <div className="bg-red-600/5 border border-red-600/20 p-8">
          <h3 className="text-white font-black uppercase italic text-sm mb-4 tracking-widest flex items-center gap-3"><Activity className="text-red-600 animate-pulse" size={18} /> TRIANGULATION_PENDING</h3>
          <p className="text-slate-500 text-[10px] uppercase mb-6">Signal ({userRole}) recorded. Authorization for the 30-Question Audit and Field Guide V1 requires counter-signals from:</p>
          <div className="grid grid-cols-2 gap-4">
            {getMissingNodes(userRole).map(node => (
              <div key={node} className="p-4 bg-slate-950 border border-slate-900 text-center">
                <p className="text-red-600 font-mono text-[10px] font-black uppercase tracking-widest animate-pulse">Awaiting_{node}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-950 p-8 border border-slate-900 space-y-6">
          <div className="flex justify-between items-end">
            <div><label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Capital_Exposure</label><p className="text-3xl font-black text-white italic">${aiSpend.toFixed(1)}M</p></div>
            <div className="text-right"><label className="text-[10px] font-mono text-red-600 uppercase tracking-[0.3em]">Dynamic_ROI</label><p className="text-3xl font-black text-red-600 italic">{getLiveMetrics().roi}%</p></div>
          </div>
          <input type="range" min="0.1" max="10" step="0.1" value={aiSpend} onChange={(e) => setAiSpend(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 accent-red-600 appearance-none cursor-pointer" />
        </div>
        <button className="w-full py-6 bg-red-600 text-white font-black uppercase italic text-xs hover:bg-white hover:text-black transition-all">REQUEST_AUDIT_AUTHORIZATION</button>
        <button onClick={() => window.print()} className="w-full py-4 border border-slate-800 text-slate-400 font-black uppercase italic text-[10px] hover:text-white transition-all flex items-center justify-center gap-4"><Download size={14} /> DOWNLOAD_FORENSIC_SUMMARY</button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 relative">
      <AnimatePresence mode="wait">{isLoading && <ForensicLoader onComplete={() => { setIsLoading(false); setStep(step === "intake" ? "audit" : "verdict"); }} />}</AnimatePresence>
      <AnimatePresence mode="wait">
        {step === 'triage' && Triage}
        {step === 'intake' && Intake}
        {step === 'verdict' && Verdict}
      </AnimatePresence>
      <LogicLeakTicker />
    </div>
  );
}
