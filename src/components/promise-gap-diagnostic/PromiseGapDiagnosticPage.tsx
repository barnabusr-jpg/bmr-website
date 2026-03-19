"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";

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
    <div className={`h-14 w-14 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-700 
      ${isActive || isDone ? "bg-[#0A1F33] border-[#00F2FF] shadow-[0_0_15px_rgba(0,242,255,0.4)]" : "bg-slate-900 border-slate-800"}`}>
      {isDone ? <span className="text-[#00F2FF] font-bold text-lg">✓</span> : 
      <><span className={`text-[8px] font-bold ${isActive ? "text-[#00F2FF]" : "text-slate-600"}`}>VECTOR</span>
      <span className={`text-[12px] font-black ${isActive ? "text-[#00F2FF]" : "text-slate-600"}`}>0{num}</span></>}
    </div>
  );
}

export default function PromiseGapDiagnosticPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [emailError, setEmailError] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    confirmEmail: "", 
    organization: "", 
    role: "Executive" 
  });
  const [results, setResults] = useState({ 
    HAI: { max: 0, aggregate: 0 }, 
    AVS: { max: 0, aggregate: 0 }, 
    IGF: { max: 0, aggregate: 0 } 
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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
      [lens]: { 
        max: Math.max(prev[lens].max, opt.strength), 
        aggregate: prev[lens].aggregate + opt.weight 
      }
    }));
    setStep(step + 1);
  };

  if (!mounted) return null;

  const currentQ = step > 0 && step <= 12 ? diagnosticQuestions[step - 1] : null;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-center gap-8 mb-20">
          <VectorIndicator num={1} isActive={step >= 1 && step <= 4} isDone={step > 4} />
          <VectorIndicator num={2} isActive={step >= 5 && step <= 8} isDone={step > 8} />
          <VectorIndicator num={3} isActive={step >= 9 && step <= 12} isDone={step > 12} />
        </div>

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 backdrop-blur-sm rounded-none">
                <h2 className="text-3xl font-bold mb-6 italic uppercase underline decoration-[#00F2FF] underline-offset-8">Systemic Observation</h2>
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    if (formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase()) {
                      setEmailError(true);
                      return;
                    }
                    setStep(1); 
                  }} 
                  className="space-y-6"
                >
                  <input required placeholder="Full Name" className="w-full p-4 bg-slate-950 border border-slate-800 rounded-none text-white outline-none focus:border-[#00F2FF]" onChange={e => setFormData({...formData, name: e.target.value})} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="email" placeholder="Work Email" className={`w-full p-4 bg-slate-950 border ${emailError ? 'border-red-500' : 'border-slate-800'} rounded-none text-white outline-none focus:border-[#00F2FF]`} onChange={e => {setFormData({...formData, email: e.target.value}); setEmailError(false);}} />
                    <input required type="email" placeholder="Confirm Email" className={`w-full p-4 bg-slate-950 border ${emailError ? 'border-red-500' : 'border-slate-800'} rounded-none text-white outline-none focus:border-[#00F2FF]`} onChange={e => {setFormData({...formData, confirmEmail: e.target.value}); setEmailError(false);}} />
                  </div>

                  {emailError && (
                    <div className="flex items-center gap-2 text-red-500 text-xs uppercase font-bold tracking-widest">
                      <AlertCircle size={14} /> Emails do not match. Verify entry.
                    </div>
                  )}

                  <input required placeholder="Organization" className="w-full p-4 bg-slate-950 border border-slate-800 rounded-none text-white outline-none focus:border-[#00F2FF]" onChange={e => setFormData({...formData, organization: e.target.value})} />
                  
                  <select className="w-full p-4 bg-slate-950 border border-slate-800 rounded-none text-white appearance-none cursor-pointer focus:border-[#00F2FF]" onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="Executive">Executive Perspective</option>
                    <option value="Manager">Manager Perspective</option>
                    <option value="Technical">Technical Perspective</option>
                  </select>
                  
                  <button type="submit" className="w-full bg-[#00F2FF] text-[#020617] font-black h-16 uppercase tracking-widest hover:bg-white transition-all">Begin Observation</button>
                </form>
              </Card>
            </motion.div>
          ) : step <= 12 ? (
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center rounded-none">
                <span className="text-[#00F2FF] font-bold uppercase tracking-[0.4em] text-[10px]">Signal {step} of 12</span>
                <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-12 italic uppercase">{currentQ?.text}</h2>
                <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                  {currentQ?.options.map((opt, i) => (
                    <button key={i} className="py-6 px-6 border border-slate-800 text-slate-300 uppercase tracking-widest text-[11px] font-bold hover:border-[#00F2FF] hover:bg-[#0A1F33]/50 transition-all text-left" onClick={() => handleAnswer(opt)}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <ShieldCheck className="h-16 w-16 text-[#00F2FF] mx-auto mb-6" />
              <h2 className="text-2xl font-bold uppercase italic mb-2">Signals Captured</h2>
              <Loader2 className="animate-spin h-8 w-8 text-[#00F2FF] mx-auto" />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
