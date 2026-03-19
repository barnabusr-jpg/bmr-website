"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Loader2, ShieldCheck, Activity, ArrowRight } from "lucide-react";

const diagnosticQuestions = [
  { text: "AI standard operating procedures (SOPs) are documented and followed.", lens: "HAI", options: [
    { label: "Non-existent", strength: 1, weight: 10 }, { label: "Ad-hoc/Manual", strength: 2, weight: 25 },
    { label: "Formalized", strength: 3, weight: 50 }, { label: "Automated/Optimized", strength: 4, weight: 100 }
  ]},
  { text: "Our organization has a clear AI ethics and governance framework.", lens: "HAI", options: [
    { label: "No framework", strength: 1, weight: 10 }, { label: "Basic guidelines", strength: 2, weight: 25 },
    { label: "Comprehensive policy", strength: 3, weight: 50 }, { label: "Audited compliance", strength: 4, weight: 100 }
  ]},
  { text: "AI roles and responsibilities are clearly defined across teams.", lens: "HAI", options: [
    { label: "Undefined", strength: 1, weight: 10 }, { label: "Informal roles", strength: 2, weight: 25 },
    { label: "Dedicated AI team", strength: 3, weight: 50 }, { label: "Cross-functional AI matrix", strength: 4, weight: 100 }
  ]},
  { text: "We conduct regular AI risk assessments and impact audits.", lens: "HAI", options: [
    { label: "Never", strength: 1, weight: 10 }, { label: "Rarely/Reactive", strength: 2, weight: 25 },
    { label: "Annually", strength: 3, weight: 50 }, { label: "Continuous monitoring", strength: 4, weight: 100 }
  ]},
  { text: "Our AI systems directly contribute to measurable business ROI.", lens: "AVS", options: [
    { label: "Not tracked", strength: 1, weight: 10 }, { label: "Anecdotal evidence", strength: 2, weight: 25 },
    { label: "Specific KPIs", strength: 3, weight: 50 }, { label: "Direct revenue/savings impact", strength: 4, weight: 100 }
  ]},
  { text: "AI initiatives are aligned with the core strategic vision.", lens: "AVS", options: [
    { label: "Disconnected", strength: 1, weight: 10 }, { label: "Loosely aligned", strength: 2, weight: 25 },
    { label: "Strategically integrated", strength: 3, weight: 50 }, { label: "Strategy-driven AI", strength: 4, weight: 100 }
  ]},
  { text: "We have a dedicated budget and resources for AI scaling.", lens: "AVS", options: [
    { label: "No budget", strength: 1, weight: 10 }, { label: "Project-based funding", strength: 2, weight: 25 },
    { label: "Annual AI budget", strength: 3, weight: 50 }, { label: "Venture-scale resource pool", strength: 4, weight: 100 }
  ]},
  { text: "Customer value is a primary driver for AI implementation.", lens: "AVS", options: [
    { label: "Internal focus only", strength: 1, weight: 10 }, { label: "Secondary consideration", strength: 2, weight: 25 },
    { label: "Key success metric", strength: 3, weight: 50 }, { label: "Core value proposition", strength: 4, weight: 100 }
  ]},
  { text: "Our data infrastructure can handle real-time AI processing.", lens: "IGF", options: [
    { label: "Legacy/Siloed", strength: 1, weight: 10 }, { label: "Partially integrated", strength: 2, weight: 25 },
    { label: "Cloud-native/Scaled", strength: 3, weight: 50 }, { label: "Edge/Real-time optimized", strength: 4, weight: 100 }
  ]},
  { text: "We leverage proprietary datasets to train specialized models.", lens: "IGF", options: [
    { label: "Public data only", strength: 1, weight: 10 }, { label: "Minimal internal data", strength: 2, weight: 25 },
    { label: "Significant internal data", strength: 3, weight: 50 }, { label: "Massive proprietary flywheel", strength: 4, weight: 100 }
  ]},
  { text: "API and model versioning are strictly controlled.", lens: "IGF", options: [
    { label: "Manual/Inconsistent", strength: 1, weight: 10 }, { label: "Basic versioning", strength: 2, weight: 25 },
    { label: "Automated pipelines", strength: 3, weight: 50 }, { label: "Full MLOps lifecycle", strength: 4, weight: 100 }
  ]},
  { text: "Computing resources (GPU/Cloud) are managed efficiently.", lens: "IGF", options: [
    { label: "High waste", strength: 1, weight: 10 }, { label: "Some optimization", strength: 2, weight: 25 },
    { label: "Managed auto-scaling", strength: 3, weight: 50 }, { label: "Hyper-optimized orchestration", strength: 4, weight: 100 }
  ]}
];

function VectorIndicator({ num, isActive, isDone }: { num: number, isActive: boolean, isDone: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 transition-all duration-700">
      <div className={`h-12 w-12 flex items-center justify-center border-2 rounded-none transition-all duration-700 
        ${isActive || isDone ? "bg-[#14b8a6]/10 border-[#14b8a6]" : "bg-slate-900/50 border-slate-800"}`}>
        {isDone ? <span className="text-[#14b8a6] font-black text-sm uppercase italic">Pass</span> : 
        <span className={`text-xs font-black ${isActive ? "text-[#14b8a6]" : "text-slate-700"}`}>0{num}</span>}
      </div>
      <span className={`text-[8px] font-black tracking-widest uppercase ${isActive ? "text-[#14b8a6]" : "text-slate-800"}`}>Lens</span>
    </div>
  );
}

export default function PromiseGapDiagnosticPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [emailError, setEmailError] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", confirmEmail: "", organization: "", role: "Executive" });
  const [results, setResults] = useState({ HAI: { max: 0, aggregate: 0 }, AVS: { max: 0, aggregate: 0 }, IGF: { max: 0, aggregate: 0 } });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (step === 13 && mounted) {
      localStorage.setItem('bmr_results_vault', JSON.stringify({ ...formData, ...results }));
      fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, zoneData: results }),
      }).then(() => router.push('/diagnostic/results'));
    }
  }, [step, formData, results, router, mounted]);

  const handleAnswer = (opt: any) => {
    const currentQ = diagnosticQuestions[step - 1];
    const lens = currentQ.lens as keyof typeof results;
    setResults(prev => ({
      ...prev,
      [lens]: { max: Math.max(prev[lens].max, opt.strength), aggregate: prev[lens].aggregate + opt.weight }
    }));
    setStep(step + 1);
  };

  if (!mounted) return null;
  const currentQ = step > 0 && step <= 12 ? diagnosticQuestions[step - 1] : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center gap-6 mb-20">
        <VectorIndicator num={1} isActive={step >= 1 && step <= 4} isDone={step > 4} />
        <VectorIndicator num={2} isActive={step >= 5 && step <= 8} isDone={step > 8} />
        <VectorIndicator num={3} isActive={step >= 9 && step <= 12} isDone={step > 12} />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="p-10 bg-slate-900/20 border-2 border-slate-800 backdrop-blur-md rounded-none relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#14b8a6]"></div>
              <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter text-white">Forensic <span className="text-[#14b8a6]">Observation</span></h2>
              
              <form onSubmit={(e) => { 
                e.preventDefault(); 
                if (formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase()) { setEmailError(true); return; }
                setStep(1); 
              }} className="space-y-6">
                <input required placeholder="Full Name" className="w-full p-5 bg-slate-950/50 border border-slate-800 rounded-none text-white outline-none focus:border-[#14b8a6] transition-colors" onChange={e => setFormData({...formData, name: e.target.value})} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="email" placeholder="Work Email" className={`w-full p-5 bg-slate-950/50 border ${emailError ? 'border-red-500' : 'border-slate-800'} rounded-none text-white outline-none focus:border-[#14b8a6] transition-colors`} onChange={e => {setFormData({...formData, email: e.target.value}); setEmailError(false);}} />
                  <input required type="email" placeholder="Confirm Email" className={`w-full p-5 bg-slate-950/50 border ${emailError ? 'border-red-500' : 'border-slate-800'} rounded-none text-white outline-none focus:border-[#14b8a6] transition-colors`} onChange={e => {setFormData({...formData, confirmEmail: e.target.value}); setEmailError(false);}} />
                </div>

                <input required placeholder="Organization" className="w-full p-5 bg-slate-950/50 border border-slate-800 rounded-none text-white outline-none focus:border-[#14b8a6] transition-colors" onChange={e => setFormData({...formData, organization: e.target.value})} />
                
                <select className="w-full p-5 bg-slate-950/50 border border-slate-800 rounded-none text-white appearance-none cursor-pointer focus:border-[#14b8a6] transition-colors" onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="Executive">Executive Perspective</option>
                  <option value="Manager">Manager Perspective</option>
                  <option value="Technical">Technical Perspective</option>
                </select>
                
                {emailError && (
                  <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest italic">! Emails do not match. Verify entry.</p>
                )}

                <button type="submit" className="w-full bg-[#14b8a6] text-[#020617] font-black h-16 uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-xl">Begin Protocol</button>
              </form>
            </Card>
          </motion.div>
        ) : step <= 12 ? (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="space-y-8">
               <div className="flex items-center gap-3">
                 <Activity className="text-[#14b8a6] h-4 w-4" />
                 <span className="text-[#14b8a6] font-black uppercase tracking-[0.3em] text-[10px]">Signal {step} of 12</span>
               </div>
               <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-tight min-h-[120px]">{currentQ?.text}</h2>
               <div className="grid grid-cols-1 gap-4 mt-12">
                 {currentQ?.options.map((opt, i) => (
                   <button key={i} className="group relative flex items-center justify-between py-8 px-10 border-2 border-slate-800 bg-slate-900/20 text-slate-300 uppercase tracking-widest text-[11px] font-black hover:border-[#14b8a6]/40 hover:text-white transition-all text-left rounded-none overflow-hidden" onClick={() => handleAnswer(opt)}>
                     <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500"></div>
                     <span className="group-hover:italic group-hover:translate-x-2 transition-all duration-300">{opt.label}</span>
                     <ArrowRight size={16} className="text-slate-800 group-hover:text-[#14b8a6] transition-colors" />
                   </button>
                 ))}
               </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <ShieldCheck className="h-20 w-20 text-[#14b8a6] mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-black uppercase italic mb-4 tracking-tighter">Signals Captured</h2>
            <div className="flex items-center justify-center gap-3 text-slate-500 font-bold text-[10px] tracking-widest uppercase italic">
              <Loader2 className="animate-spin h-4 w-4" /> Hardening Forensic Report...
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
