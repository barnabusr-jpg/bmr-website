"use client";
import React, { useState } from "react";
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Activity, Loader2, ArrowRight, Lock, Users, ShieldCheck } from "lucide-react";

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
    name: "", email: "", organization: "", role: "managerial", nodes: 500, integrity: "hybrid" 
  });
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [step]: value });
    setStep(step + 1);
  };

  const submitResults = async () => {
    setIsSubmitting(true);
    // Persist baseline for the results engine
    localStorage.setItem('bmr_triage_baseline', JSON.stringify(formData));
    localStorage.setItem('bmr_diagnostic_answers', JSON.stringify(answers));
    
    // Artificial delay for forensic "processing"
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/diagnostic-results');
  };

  return (
    <>
      <Head>
        <title>Forensic Triage | BMR Advisory</title>
      </Head>
      
      <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
        <Header />
        
        <main className="flex-grow py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              
              {/* STAGE 0: THE FORENSIC GATEKEEPER */}
              {step === 0 && (
                <motion.div 
                  key="intake" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="p-10 bg-slate-950 border-slate-800 border-2 relative overflow-hidden shadow-2xl shadow-red-900/10">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/50"></div>
                    <div className="absolute top-0 left-0 w-[1px] h-full bg-red-600/50"></div>
                    
                    <div className="flex items-center justify-between mb-12 border-b border-slate-900 pb-6">
                       <div className="flex items-center gap-4">
                         <Lock className="text-red-600" size={24} />
                         <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Systemic Intake</h2>
                       </div>
                       <div className="text-[10px] font-mono text-red-600 font-bold tracking-widest bg-red-600/5 px-3 py-1 border border-red-600/20">
                         ENCRYPTION_ACTIVE
                       </div>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest">Operator Name</label>
                          <input required placeholder="REQUIRED_FIELD" className="w-full p-4 bg-slate-900/50 border border-slate-800 text-sm font-mono text-white outline-none focus:border-red-600 transition-colors" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest">Corporate Email</label>
                          <input required type="email" placeholder="ENCRYPTED_ID" className="w-full p-4 bg-slate-900/50 border border-slate-800 text-sm font-mono text-white outline-none focus:border-red-600 transition-colors" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest">Target Organization</label>
                        <input required placeholder="ENTITY_NAME" className="w-full p-4 bg-slate-900/50 border border-slate-800 text-sm font-mono text-white outline-none focus:border-red-600 transition-colors uppercase" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900">
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1 font-mono"><Users size={12} className="text-red-600" /> Authority</label>
                          <select className="w-full p-3 bg-slate-950 border border-slate-800 text-[10px] font-mono text-white uppercase" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                            <option value="executive">EXECUTIVE_NODE</option>
                            <option value="managerial">MANAGERIAL_HUB</option>
                            <option value="technical">TECHNICAL_GRID</option>
                          </select>
                        </div>
                        <div className="space-y-2 text-slate-500">
                          <label className="text-[9px] uppercase font-bold font-mono tracking-widest">Node Density</label>
                          <input type="number" className="w-full p-3 bg-slate-950 border border-slate-800 text-[10px] font-mono text-red-600" value={formData.nodes} onChange={e => setFormData({...formData, nodes: parseInt(e.target.value) || 0})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest">Integrity Baseline</label>
                          <select className="w-full p-3 bg-slate-950 border border-slate-800 text-[10px] font-mono text-white uppercase" value={formData.integrity} onChange={e => setFormData({...formData, integrity: e.target.value})}>
                            <option value="legacy">LEGACY_SILO</option>
                            <option value="hybrid">HYBRID_MESH</option>
                            <option value="modern">MODERN_STACK</option>
                          </select>
                        </div>
                      </div>

                      <button type="submit" className="group w-full mt-8 bg-red-600 hover:bg-white text-white hover:text-black py-6 font-black uppercase italic tracking-[0.3em] text-[11px] border border-red-600 flex items-center justify-center gap-4 transition-all duration-300">
                        Initialize Audit Observation <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </form>
                  </Card>
                </motion.div>
              )}

              {/* STAGE 1: THE FORENSIC QUESTIONS */}
              {step > 0 && step <= 12 && (
                <motion.div 
                  key="question" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="p-12 bg-slate-950 border-slate-800 border-2 text-center relative overflow-hidden shadow-2xl shadow-red-900/10">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/30"></div>
                    <div className="absolute top-0 left-0 w-[1px] h-full bg-red-600/30"></div>
                    
                    <div className="flex justify-center mb-8">
                      <div className="bg-red-600/10 border border-red-600/20 px-4 py-1 rounded-full">
                        <span className="text-red-600 font-black uppercase text-[10px] tracking-[0.3em]">Signal {step} / 12</span>
                      </div>
                    </div>

                    <h2 className="text-3xl font-black mt-6 mb-16 text-white italic uppercase tracking-tighter leading-tight max-w-2xl mx-auto">
                      {diagnosticQuestions[step - 1].text}
                    </h2>

                    <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                      {options.map((opt) => (
                        <button 
                          key={opt} 
                          className="group py-6 px-8 text-[11px] font-black uppercase tracking-[0.2em] border border-slate-800 bg-slate-900/30 text-slate-400 hover:border-red-600 hover:text-white hover:bg-red-600/5 transition-all text-left flex justify-between items-center" 
                          onClick={() => handleAnswer(opt)}
                        >
                          {opt}
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* STAGE 2: THE SYNTHESIS */}
              {step === 13 && (
                <motion.div 
                  key="synthesis" 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="p-16 bg-slate-950 border-slate-800 border-2 text-center relative overflow-hidden shadow-2xl shadow-red-900/20">
                    <Activity className="h-16 w-16 text-red-600 mx-auto mb-8 animate-pulse" />
                    <h2 className="text-5xl font-black mb-4 text-white italic uppercase tracking-tighter">Observation Complete</h2>
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-12">Synthesizing Logic Chains and Financial Leakage</p>
                    
                    <button 
                      className="bg-red-600 hover:bg-white text-white hover:text-black font-black w-full py-8 uppercase tracking-[0.4em] text-[12px] italic border border-red-600 flex items-center justify-center gap-4 transition-all" 
                      onClick={submitResults} 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Processing Logic...
                        </>
                      ) : (
                        <>
                          Generate Forensic Synthesis <ShieldCheck size={20} />
                        </>
                      )}
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
