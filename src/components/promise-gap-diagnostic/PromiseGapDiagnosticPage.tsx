import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Loader2, ShieldCheck } from "lucide-react";

// (Note: Ensure diagnosticQuestions array is defined here)

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
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", confirmEmail: "", organization: "", role: "Executive" });
  const [results, setResults] = useState({ HAI: { max: 0, aggregate: 0 }, AVS: { max: 0, aggregate: 0 }, IGF: { max: 0, aggregate: 0 } });

  const currentQ = step > 0 && step <= 12 ? diagnosticQuestions[step - 1] : null;

  useEffect(() => {
    if (step === 13) {
      localStorage.setItem('bmr_results_vault', JSON.stringify({ ...formData, ...results }));
      fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, zoneData: results }),
      }).then(() => router.push('/diagnostic/results'));
    }
  }, [step, formData, results, router]); // Added missing dependencies here

  const handleAnswer = (opt: any) => {
    const lens = currentQ!.lens;
    setResults(prev => ({
      ...prev,
      [lens]: { max: Math.max(prev[lens as keyof typeof results].max, opt.strength), 
               aggregate: prev[lens as keyof typeof results].aggregate + opt.weight }
    }));
    setStep(step + 1);
  };

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
              <Card className="p-10 bg-slate-900/30 border-slate-800 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 italic uppercase underline decoration-[#00F2FF] underline-offset-8">Systemic Observation</h2>
                <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-6">
                  <input required placeholder="Full Name" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white outline-none focus:border-[#00F2FF]" onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input required type="email" placeholder="Work Email" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white outline-none focus:border-[#00F2FF]" onChange={e => setFormData({...formData, email: e.target.value})} />
                  <input required placeholder="Organization" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white outline-none focus:border-[#00F2FF]" onChange={e => setFormData({...formData, organization: e.target.value})} />
                  <select className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" onChange={e => setFormData({...formData, role: e.target.value})}>
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
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center">
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
