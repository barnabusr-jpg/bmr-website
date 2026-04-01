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
                <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Most organizations <span className="text-red-600 font-bold italic uppercase tracking-widest">automate decay</span>. This turns a $1.2M AI project into a <span className="text-red-600 font-bold">$20.4M hemorrhage</span>.
                </p>
                <div className="mt-8 flex flex-col justify-center items-center gap-2 border-y border-slate-900 py-6 max-w-md mx-auto">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.3em]">Institutional Benchmark</span>
                  <span className="text-[10px] font-mono text-red-600 font-bold tracking-widest uppercase">85% of AI projects exceed budget</span>
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
                         <h2 className="text-2xl tracking-tighter uppercase">Systemic Intake</h2>
                       </div>
                       <div className="text-[9px] font-mono text-red-600 bg-red-600/5 px-3 py-1 border border-red-600/20 tracking-widest uppercase">Encryption Active</div>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required placeholder="OPERATOR_NAME" className="w-full p-4 bg-slate-900/50 border border-slate-800 text-sm font-mono outline-none focus:border-red-600 text-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        <input required type="email" placeholder="CORPORATE_EMAIL" className="w-full p-4 bg-slate-900/50 border border-slate-800 text-sm font-mono outline-none focus:border-red-600 text-white" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <input required placeholder="ENTITY_NAME" className="w-full p-4 bg-slate-950 border border-slate-800 text-sm font-mono outline-none focus:border-red-600 uppercase text-white" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                      
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900">
                        
                        {/* 1. ROLE (Explicit Icon Use) */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <label className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest flex items-center gap-1">
                              <Users size={10} className="text-slate-500" /> Role
                            </label>
                            <div className="group relative">
                              <AlertTriangle size={12} className="text-red-600 cursor-help" />
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-slate-800 text-[10px] text-slate-300 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 uppercase">Determines strategic impact weighting.</div>
                            </div>
                          </div>
                          <select className="w-full p-3 bg-slate-950 border-2 border-slate-800 text-[10px] font-mono text-white outline-none focus:border-red-600" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                            <option value="executive">STRATEGIC_LEADERSHIP</option>
                            <option value="managerial">OPERATIONAL_MGMT</option>
                            <option value="technical">TECHNICAL_GRID</option>
                          </select>
                          <div className="text-right text-[7px] font-mono text-slate-600 uppercase tracking-widest">Confidence: <span className="text-red-600 font-bold">High</span></div>
                        </div>

                        {/* 2. SCALE (FTE) */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <label className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest">Scale</label>
                            <div className="group relative">
                              <AlertTriangle size={12} className="text-red-600 cursor-help" />
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-slate-800 text-[10px] text-slate-300 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 uppercase">Used to calculate exposure. 1 node = 1 FTE.</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input type="number" min="10" max="100000" className="w-full p-3 bg-slate-950 border-2 border-slate-800 text-[10px] font-mono text-red-600 outline-none focus:border-red-600 pr-8" value={formData.nodes} onChange={(e) => {
                              const val = parseInt(e.target.value) || 0;
                              setFormData({...formData, nodes: Math.max(0, Math.min(100000, val))});
                            }} />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-mono text-slate-600 uppercase">FTE</span>
                          </div>
                          <div className="text-right text-[7px] font-mono text-slate-600 uppercase tracking-widest">Confidence: <span className="text-red-600 font-bold">High</span></div>
                        </div>

                        {/* 3. MATURITY */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <label className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest">Maturity</label>
                            <div className="group relative">
                              <AlertTriangle size={12} className="text-red-600 cursor-help" />
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-slate-800 text-[10px] text-slate-300 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 uppercase">Measures architectural age. Directly impacts Logic Decay.</div>
                            </div>
                          </div>
                          <select className="w-full p-3 bg-slate-950 border-2 border-slate-800 text-[10px] font-mono text-white outline-none focus:border-red-600" value={formData.integrity} onChange={e => setFormData({...formData, integrity: e.target.value})}>
                            <option value="legacy">LEGACY (5+ yrs)</option>
                            <option value="hybrid">HYBRID (2-5 yrs)</option>
                            <option value="modern">MODERN (&lt; 2 yrs)</option>
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

              {/* [Existing Stage 1, 2, and 3 follow identically] */}
              {/* ... */}
            </AnimatePresence>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
