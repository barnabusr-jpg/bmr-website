"use client";
import React, { useState } from "react";
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Activity, Loader2, ArrowRight, Lock, Users, ShieldCheck, AlertTriangle, TrendingUp } from "lucide-react";

const diagnosticQuestions = [
  { id: 1, text: "Our organization has a shared, non-technical language for defining AI reliability." },
  { id: 2, text: "We can clearly demonstrate to stakeholders how our AI outputs align with brand values." },
  { id: 3, text: "There is a high level of confidence that our AI behavior remains consistent in unscripted scenarios." },
  { id: 4, text: "We proactively measure stakeholder sentiment regarding our use of automated decision-making." },
  { id: 5, text: "Our AI projects follow a standardized oversight process from conception to delivery." },
  { id: 6, text: "Final accountability for AI-driven outcomes is clearly mapped to specific leadership roles." },
  { id: 7, text: "We have established protocols for human expert intervention when AI performance fluctuates." },
  { id: 8, text: "Our governance framework is designed to adapt as regulatory and technical landscapes evolve." },
  { id: 9, text: "We prioritize 'structured observation' to identify why system risks occur, not just where." },
  { id: 10, text: "We have a formal 'de-risking' phase before any AI initiative moves to real-world operation." },
  { id: 11, text: "Our AI strategy is integrated into the broader systemic goals of the organization." },
  { id: 12, text: "Leadership regularly reviews how AI system behavior impacts our overall delivery risk." },
];

const options = ["Manual Friction", "Passive Support", "System Disconnect", "Team Relief", "Force Multiplier"];

export default function PromiseGap() {
  const router = useRouter();
  const [step, setStep] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", email: "", organization: "", role: "executive", nodes: 500, integrity: "hybrid" 
  });
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [step]: value });
    setStep(step + 1);
  };

  const submitResults = async () => {
    setIsSubmitting(true);
    localStorage.setItem('bmr_triage_baseline', JSON.stringify(formData));
    localStorage.setItem('bmr_diagnostic_answers', JSON.stringify(answers));
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/diagnostic-results');
  };

  return (
    <>
      <Head><title>Forensic Triage | BMR Advisory</title></Head>
      <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
        <Header />
        <main className="flex-grow py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Card className="p-10 bg-slate-950 border-slate-800 border-2 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-10 border-b border-slate-900 pb-6 italic">
                       <div className="flex items-center gap-4 text-white uppercase"><Lock className="text-red-600" size={24} /> <h2>Systemic Intake</h2></div>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="NAME" className="p-4 bg-slate-900/50 border border-slate-800 text-sm font-mono text-white outline-none focus:border-red-600" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        <input required type="email" placeholder="EMAIL" className="p-4 bg-slate-900/50 border border-slate-800 text-sm font-mono text-white outline-none focus:border-red-600" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <input required placeholder="ENTITY" className="w-full p-4 bg-slate-950 border border-slate-800 text-sm font-mono text-white outline-none focus:border-red-600 uppercase" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500 font-mono flex items-center gap-1"><Users size={10} /> Role</label>
                          <select className="w-full p-3 bg-slate-950 border-2 border-slate-800 text-[10px] font-mono text-white" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                            <option value="executive">STRATEGIC_LEADERSHIP</option>
                            <option value="managerial">OPERATIONAL_MGMT</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500 font-mono">Scale</label>
                          <input type="number" className="w-full p-3 bg-slate-950 border-2 border-slate-800 text-[10px] font-mono text-red-600" value={formData.nodes} onChange={e => setFormData({...formData, nodes: parseInt(e.target.value) || 0})} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500 font-mono">Maturity</label>
                          <select className="w-full p-3 bg-slate-950 border-2 border-slate-800 text-[10px] font-mono text-white" value={formData.integrity} onChange={e => setFormData({...formData, integrity: e.target.value})}>
                            <option value="legacy">LEGACY</option>
                            <option value="hybrid">HYBRID</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="w-full mt-8 bg-red-600 py-8 font-black uppercase italic tracking-widest text-white hover:bg-white hover:text-black transition-all">Initialize Observation</button>
                    </form>
                  </Card>
                </motion.div>
              )}

              {step > 0 && step <= 12 && (
                <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Card className="p-12 bg-slate-950 border-slate-800 border-2 text-center relative shadow-2xl">
                    <span className="text-red-600 font-black uppercase text-[10px] tracking-[0.4em]">Signal {step} / 12</span>
                    <h2 className="text-3xl font-black mt-12 mb-16 text-white italic uppercase tracking-tighter leading-tight max-w-2xl mx-auto">
                      {diagnosticQuestions[step - 1].text}
                    </h2>
                    <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                      {options.map((opt) => (
                        <button key={opt} className="group py-6 px-8 text-[11px] font-black uppercase tracking-[0.2em] border border-slate-800 text-slate-400 hover:border-red-600 hover:text-white transition-all flex justify-between items-center" onClick={() => handleAnswer(opt)}>
                          {opt} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {step === 13 && (
                <motion.div key="synthesis" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="p-16 bg-slate-950 border-slate-800 border-2 text-center shadow-2xl relative">
                    <Activity className="h-16 w-16 text-red-600 mx-auto mb-8 animate-pulse" />
                    <h2 className="text-5xl font-black mb-12 text-white italic uppercase tracking-tighter">Initial Signal Detected</h2>
                    <div className="mb-12 max-w-md mx-auto border border-slate-900 p-8 bg-slate-900/20">
                      <div className="flex justify-between items-center mb-4 uppercase text-[10px] font-mono">
                        <span className="text-slate-500 tracking-widest">Risk Level</span>
                        <span className="text-red-600 font-bold">Critical</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5 }} className="bg-red-600 h-full shadow-[0_0_10px_#dc2626]"></motion.div>
                      </div>
                      <p className="text-slate-400 text-[10px] mt-6 font-mono uppercase tracking-widest text-center italic">
                        <ShieldCheck size={12} className="inline mr-2 text-red-600" /> Screening Confidence: 65%
                      </p>
                    </div>
                    <button className="bg-red-600 w-full py-8 font-black uppercase tracking-[0.4em] text-[12px] italic text-white flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all" onClick={submitResults} disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <><TrendingUp size={20} /> Unlock Financial Verdict</>}
                    </button>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
