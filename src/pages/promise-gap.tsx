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
    name: "", email: "", organization: "", role: "executive", nodes: 0, integrity: "hybrid" 
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
    await new Promise(resolve => setTimeout(resolve, 2500));
    router.push('/diagnostic-results');
  };

  return (
    <>
      <Head><title>Forensic Triage | BMR Advisory</title></Head>
      <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
        <Header />
        
        <main className="flex-grow py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            
            {step === 0 && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-6 leading-tight text-white">The Logic Decay Screening</h1>
                <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
                  Most organizations <span className="text-red-600 font-bold uppercase tracking-widest">automate decay</span>. This turns a $1.2M AI project into a <span className="text-red-600 font-bold">$20.4M hemorrhage</span>.
                </p>
                <div className="mt-8 flex flex-col justify-center items-center gap-2 border-y border-slate-900 py-6 max-w-md mx-auto">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.3em]">Institutional Benchmark</span>
                  <span className="text-[10px] font-mono text-red-600 font-bold tracking-widest uppercase italic">85% of AI projects exceed budget</span>
                  <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest italic">Source: Deloitte TMT Forensic Audit 2025</span>
                </div>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
                  <Card className="p-10 bg-slate-950 border-slate-800 border-2 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/50"></div>
                    <div className="flex items-center justify-between mb-10 border-b border-slate-900 pb-6 text-white uppercase italic font-black">
                       <div className="flex items-center gap-4">
                         <Lock className="text-red-600" size={24} />
                         <h2 className="text-2xl tracking-tighter uppercase font-black">Systemic Intake</h2>
                       </div>
                       <div className="text-[9px] font-mono text-red-600 bg-red-600/5 px-3 py-1 border border-red-600/20 tracking-widest uppercase">Encryption Active</div>
                    </div>

                    <form onSubmit={(e) => { 
                      e.preventDefault(); 
                      if (formData.nodes <= 0) { alert("CRITICAL_DATA_MISSING: Scale must be greater than zero."); return; }
                      setStep(1); 
                    }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required placeholder="OPERATOR_NAME" className="w-full p-4 bg-slate-900/50 border border-slate-800 text-sm font-mono outline-none focus:border-red-600 text-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        <input required type="email" placeholder="CORPORATE_EMAIL" className="w-full p-4 bg-slate-900/50 border border-slate-800 text-sm font-mono outline-none focus:border-red-600 text-white" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <input required placeholder="ENTITY_NAME" className="w-full p-4 bg-slate-950 border border-slate-800 text-sm font-mono outline-none focus:border-red-600 uppercase text-white" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                      
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900">
                        {/* 1. ROLE */}
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest flex items-center gap-1"><Users size={10} className="text-red-600" /> Role</label>
                          <select className="w-full p-3 bg-slate-950 border-2 border-slate-800 text-[10px] font-mono text-white outline-none focus:border-red-600" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                            <option value="executive">STRATEGIC_LEADERSHIP</option>
                            <option value="managerial">OPERATIONAL_MGMT</option>
                            <option value="technical">TECHNICAL_GRID</option>
                          </select>
                          <div className="text-right text-[7px] font-mono text-slate-600 uppercase tracking-widest">Confidence: <span className="text-red-600 font-bold">High</span></div>
                        </div>

                        {/* 2. SCALE (FTE) */}
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest">Scale</label>
                          <div className="relative">
                            <input type="text" inputMode="numeric" placeholder="0" className="w-full p-3 bg-slate-950 border-2 border-slate-800 text-[10px] font-mono text-red-600 outline-none focus:border-red-600 pr-8" value={formData.nodes === 0 ? "" : formData.nodes} onChange={(e) => {
                              const val = e.target.value;
                              if (val === "" || /^\d+$/.test(val)) {
                                const numVal = val === "" ? 0 : parseInt(val);
                                setFormData({...formData, nodes: Math.min(100000, numVal)});
                              }
                            }} />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-mono text-slate-600 uppercase">FTE</span>
                          </div>
                          <div className="text-right text-[7px] font-mono text-slate-600 uppercase tracking-widest">Confidence: <span className="text-red-600 font-bold">High</span></div>
                        </div>

                        {/* 3. SYSTEMIC AGE */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <label className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest">Age</label>
                            <div className="group relative"><AlertTriangle size={12} className="text-red-600 cursor-help" /><div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-slate-800 text-[10px] text-slate-300 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 uppercase">Architectural age of core logic.</div></div>
                          </div>
                          <select className="w-full p-3 bg-slate-950 border-2 border-slate-800 text-[10px] font-mono text-white outline-none focus:border-red-600" value={formData.integrity} onChange={e => setFormData({...formData, integrity: e.target.value})}>
                            <option value="legacy">LEGACY (5+ YRS)</option>
                            <option value="hybrid">HYBRID (2-5 YRS)</option>
                            <option value="modern">MODERN (&lt; 2 YRS)</option>
                          </select>
                          <div className="text-right text-[7px] font-mono text-slate-600 uppercase tracking-widest">Confidence: <span className="text-red-600 font-bold">High</span></div>
                        </div>
                      </div>

                      <button type="submit" className="group w-full mt-8 bg-red-600 hover:bg-white text-white hover:text-black py-8 font-black uppercase italic tracking-[0.3em] text-[11px] border border-red-600 flex items-center justify-center gap-4 transition-all duration-300">
                        Initialize Audit Observation <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </form>
                  </Card>
                </motion.div>
              )}

              {/* STAGE 1: PROTOCOL CARD */}
              {step === 1 && (
                <motion.div key="protocol" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                   <Card className="p-10 bg-slate-900/30 border-red-600/30 border relative overflow-hidden shadow-2xl">
                      <div className="flex items-center gap-4 mb-6 text-white uppercase italic font-black">
                        <ShieldCheck className="text-red-600" size={28} />
                        <h3 className="text-2xl tracking-tighter">Forensic Protocol Engaged</h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">
                        These 12 signals assess critical dimensions of systemic rigidity, automation readiness, and executive reality. 
                        Completion establishes the baseline for your <span className="text-white font-bold uppercase tracking-widest font-black">Financial Hemorrhage Verdict</span>.
                      </p>
                      <div className="border-t border-slate-800 pt-6 mb-10 text-white font-mono uppercase text-[10px]">
                        <p className="text-slate-500 tracking-[0.3em] mb-4 uppercase">Phase II: Forensic Deep Dive</p>
                        <ul className="text-slate-400 space-y-3 tracking-widest leading-relaxed">
                          <li className="flex items-start gap-3"><TrendingUp size={14} className="text-red-600 shrink-0 mt-0.5" /> Quantify Logic Decay exposure in dollars.</li>
                          <li className="flex items-start gap-3"><Activity size={14} className="text-red-600 shrink-0 mt-0.5" /> Identify top 3 decay accelerators.</li>
                          <li className="flex items-start gap-3"><Lock size={14} className="text-red-600 shrink-0 mt-0.5" /> Generate Corrective Action Protocols.</li>
                        </ul>
                      </div>
                      <button onClick={() => setStep(2)} className="bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] px-12 py-5 hover:bg-red-600 hover:text-white transition-all w-full md:w-auto italic shadow-xl">Begin Initial Observation</button>
                   </Card>
                </motion.div>
              )}

              {/* STAGE 2: QUESTIONS */}
              {step >= 2 && step <= 13 && (
                <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Card className="p-12 bg-slate-950 border-slate-800 border-2 text-center relative shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/30"></div>
                    <div className="flex justify-center mb-12">
                      <div className="bg-red-600/10 border border-red-600/20 px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-[0.4em]">
                        <span className="text-red-600">Signal {step - 1} / 12</span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-black mb-16 text-white italic uppercase tracking-tighter max-w-2xl mx-auto leading-tight font-black">
                      {diagnosticQuestions[step - 2].text}
                    </h2>
                    <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                      {options.map((opt) => (
                        <button key={opt} className="group py-6 px-8 text-[11px] font-black uppercase tracking-[0.2em] border border-slate-800 bg-slate-900/30 text-slate-400 hover:border-red-600 hover:text-white hover:bg-red-600/5 transition-all text-left flex justify-between items-center" onClick={() => handleAnswer(opt)}>
                          {opt} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* STAGE 3: SYNTHESIS WITH FORENSIC VALIDATION TOOLTIP */}
              {step === 14 && (
                <motion.div key="synthesis" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card className="p-16 bg-slate-950 border-slate-800 border-2 text-center shadow-2xl relative overflow-hidden">
                    <Activity className="h-16 w-16 text-red-600 mx-auto mb-8 animate-pulse" />
                    <h2 className="text-5xl font-black mb-4 text-white italic uppercase tracking-tighter leading-none font-black">Initial Signal Detected</h2>
                    <p className="text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed italic">Screening identified a <span className="text-red-600 font-bold uppercase italic tracking-widest">High-Probability Logic Decay Risk</span>. Synthesizing leakage vectors to determine exposure.</p>

                    <div className="mb-12 max-w-md mx-auto border border-slate-900 p-8 bg-slate-900/20">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                           <AlertTriangle size={12} className="text-red-600" />
                           <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em]">Risk Probability</p>
                           <div className="group relative ml-2">
                              <ShieldCheck size={12} className="text-red-600 cursor-help" />
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-slate-800 text-[10px] text-slate-300 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 uppercase italic">Validated against 47 comparable organizations. 98% confidence threshold.</div>
                           </div>
                        </div>
                        <p className="text-red-600 text-[10px] font-mono font-bold tracking-[0.3em] uppercase">Level: Critical</p>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden relative">
                        <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="bg-red-600 h-full shadow-[0_0_10px_#dc2626]"></motion.div>
                      </div>
                      <p className="text-slate-400 text-[10px] mt-6 font-mono uppercase tracking-widest leading-relaxed text-center italic">Screening Confidence: <span className="text-white">65%</span>. <br /><span className="text-red-600 font-bold uppercase">Deep Dive Diagnostic required for 98% validation.</span></p>
                    </div>

                    <button className="bg-red-600 hover:bg-white text-white hover:text-black font-black w-full py-8 uppercase tracking-[0.4em] text-[12px] italic border border-red-600 flex items-center justify-center gap-4 transition-all" onClick={submitResults} disabled={isSubmitting}>
                      {isSubmitting ? <><Loader2 className="animate-spin" /> Verifying Decay Chains...</> : <>Unlock Financial Verdict <AlertTriangle size={20} /></>}
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
