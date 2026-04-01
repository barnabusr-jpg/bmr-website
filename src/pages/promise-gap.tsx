"use client";
import React, { useState } from "react";
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Loader2, ArrowRight, Lock, Users } from "lucide-react";

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
    localStorage.setItem('bmr_triage_baseline', JSON.stringify(formData));
    localStorage.setItem('bmr_diagnostic_answers', JSON.stringify(answers));
    
    // Explicit route to the results component
    router.push('/diagnostic/results');
  };

  return (
    <>
      <Head><title>Forensic Triage | BMR Advisory</title></Head>
      <div className="min-h-screen bg-[#020617] text-white flex flex-col">
        <Header />
        <main className="flex-grow py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="p-10 bg-slate-900/30 border-slate-800 border-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
                    <div className="flex items-center gap-3 mb-8">
                       <Lock className="text-[#14b8a6]" size={20} />
                       <h2 className="text-2xl font-black uppercase italic tracking-tighter">Systemic Intake</h2>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="Full Name" className="w-full p-4 bg-slate-950 border border-slate-800 text-sm font-mono outline-none focus:border-[#14b8a6]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        <input required type="email" placeholder="Email" className="w-full p-4 bg-slate-950 border border-slate-800 text-sm font-mono outline-none focus:border-[#14b8a6]" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <input required placeholder="Organization" className="w-full p-4 bg-slate-950 border border-slate-800 text-sm font-mono outline-none focus:border-[#14b8a6]" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1"><Users size={10} /> Authority</label>
                          <select className="w-full p-3 bg-slate-950 border border-slate-800 text-xs text-white" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                            <option value="executive">EXECUTIVE</option>
                            <option value="managerial">MANAGERIAL</option>
                            <option value="technical">TECHNICAL</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500">Nodes</label>
                          <input type="number" className="w-full p-3 bg-slate-950 border border-slate-800 text-xs text-[#14b8a6]" value={formData.nodes} onChange={e => setFormData({...formData, nodes: parseInt(e.target.value) || 0})} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500">Integrity</label>
                          <select className="w-full p-3 bg-slate-950 border border-slate-800 text-xs text-white" value={formData.integrity} onChange={e => setFormData({...formData, integrity: e.target.value})}>
                            <option value="legacy">LEGACY</option>
                            <option value="hybrid">HYBRID</option>
                            <option value="modern">MODERN</option>
                          </select>
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-[#14b8a6] hover:bg-white text-black font-black uppercase tracking-widest h-16 flex items-center justify-center gap-3 transition-all">
                        Initialize Observation <ArrowRight size={18} />
                      </Button>
                    </form>
                  </Card>
                </motion.div>
              )}

              {step > 0 && step <= 12 && (
                <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Card className="p-12 bg-slate-900/30 border-slate-800 border-2 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
                    <span className="text-[#14b8a6] font-black uppercase text-[10px]">Signal {step} / 12</span>
                    <h2 className="text-2xl font-black mt-6 mb-12 text-white italic">{diagnosticQuestions[step - 1].text}</h2>
                    <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
                      {options.map((opt) => (
                        <Button key={opt} variant="outline" className="py-7 text-xs font-black uppercase border-slate-800 hover:border-[#14b8a6] text-slate-400" onClick={() => handleAnswer(opt)}>{opt}</Button>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {step === 13 && (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="p-12 bg-slate-900/30 border-slate-800 border-2 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
                    <Activity className="h-16 w-16 text-[#14b8a6] mx-auto mb-6" />
                    <h2 className="text-4xl font-black mb-10 text-white italic uppercase">Observation Complete</h2>
                    <Button className="bg-[#14b8a6] hover:bg-white text-black font-black w-full h-16 uppercase tracking-widest flex items-center justify-center gap-3 transition-all" onClick={submitResults} disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="animate-spin" /> : "Generate Forensic Synthesis"}
                    </Button>
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
