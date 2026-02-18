import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Activity, Loader2 } from "lucide-react";

// --- INTERNAL FORENSIC LOGIC: Role-Aware Weighting ---
const calculatePillarPressure = (weight: number, role: string, zone: string) => {
  const multipliers: Record<string, string> = {
    "Executive": "IGF",
    "Technical": "HAI",
    "Manager": "AVS"
  };
  return multipliers[role] === zone ? weight * 1.5 : weight;
};

// --- DATA STRUCTURE TYPES ---
type DiagnosticOption = { label: string; strength: number; weight: number; vector: string; };
type DiagnosticQuestion = { id: number; lens: string; text: string; options: DiagnosticOption[]; };

const diagnosticQuestions: DiagnosticQuestion[] = [
  /* ... (Keep your 12 questions exactly as defined in your prompt) ... */
];

function LensIndicator({ acronym, isActive, isCompleted }: { acronym: string; isActive: boolean; isCompleted: boolean }) {
  return (
    <div className={`h-14 w-14 rounded-full flex items-center justify-center border-2 transition-all duration-700 
      ${isActive || isCompleted 
        ? "bg-[#0A1F33] border-[#00F2FF] shadow-[0_0_15px_rgba(0,242,255,0.4)]" 
        : "bg-slate-900 border-slate-800"}`}
    >
      {isCompleted ? (
        <span className="text-[#00F2FF] font-bold text-lg">✓</span>
      ) : (
        <span className={`text-[10px] font-bold ${isActive ? "text-[#00F2FF]" : "text-slate-600"}`}>
          {acronym}
        </span>
      )}
    </div>
  );
}

export default function PromiseGapDiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "", role: "Executive" });
  
  const [zoneResults, setZoneResults] = useState<Record<string, { max: number; aggregate: number; vectors: string[] }>>({
    HAI: { max: 0, aggregate: 0, vectors: [] },
    AVS: { max: 0, aggregate: 0, vectors: [] },
    IGF: { max: 0, aggregate: 0, vectors: [] }
  });

  useEffect(() => {
    if (step === 13 && !isSubmitting) {
      const submitResults = async () => {
        setIsSubmitting(true);
        try {
          localStorage.setItem('bmr_results_vault', JSON.stringify({ ...zoneResults, email: formData.email, role: formData.role }));
          
          await fetch('/api/send-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              name: formData.name, 
              email: formData.email, 
              org: formData.organization, 
              role: formData.role, // Dispatched to Airtable
              zoneData: zoneResults 
            }),
          });
          
          router.push('/diagnostic/results'); 
        } catch (error) {
          console.error("Forensic dispatch failed", error);
          setIsSubmitting(false);
        }
      };
      submitResults();
    }
  }, [step, isSubmitting, formData, router, zoneResults]);

  const handleAnswer = (option: DiagnosticOption) => {
    const currentLens = diagnosticQuestions[step - 1].lens;
    // Apply Role-Based Weighting Logic
    const dynamicWeight = calculatePillarPressure(option.weight, formData.role, currentLens);

    setZoneResults(prev => ({
      ...prev,
      [currentLens]: {
        max: Math.max(prev[currentLens].max, option.strength),
        aggregate: prev[currentLens].aggregate + dynamicWeight,
        vectors: [...prev[currentLens].vectors, option.vector]
      }
    }));
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-center gap-8 mb-20">
          <LensIndicator acronym="HAI" isActive={step >= 1 && step <= 4} isCompleted={step > 4} />
          <LensIndicator acronym="AVS" isActive={step >= 5 && step <= 8} isCompleted={step > 8} />
          <LensIndicator acronym="IGF" isActive={step >= 9 && step <= 12} isCompleted={step > 12} />
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 backdrop-blur-sm shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight text-white">Systemic Observation</h2>
                <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-6">
                  <input required placeholder="Full Name" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  
                  {/* ROLE SELECTOR INTEGRATION */}
                  <div className="space-y-1 relative">
                    <label className="text-[10px] uppercase text-slate-500 tracking-widest ml-1 font-bold">Perspective Lens</label>
                    <select 
                      required 
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white appearance-none cursor-pointer focus:border-[#00F2FF] outline-none transition-all"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300F2FF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em'
                      }}
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="Executive">Executive Perspective</option>
                      <option value="Manager">Manager Perspective</option>
                      <option value="Technical">Technical Perspective</option>
                    </select>
                  </div>

                  <input required type="email" placeholder="Work Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <input required placeholder="Organization" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                  
                  <button type="submit" className="w-full bg-[#00F2FF] text-[#020617] font-bold h-16 uppercase tracking-widest hover:bg-[#00d8e4] transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)]">Begin Observation</button>
                </form>
              </Card>
            </motion.div>
          )}

          {/* QUESTION RENDERER */}
          {step > 0 && step <= 12 && (
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center shadow-2xl backdrop-blur-sm">
                <span className="text-[#00F2FF] font-bold uppercase tracking-[0.4em] text-[10px]">Signal {step} of 12 — {diagnosticQuestions[step - 1].lens} Zone</span>
                <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-12 text-white italic uppercase leading-tight">{diagnosticQuestions[step - 1].text}</h2>
                <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                  {diagnosticQuestions[step - 1].options.map((opt, idx) => (
                    <button key={idx} className="py-6 px-6 border border-slate-800 text-slate-300 uppercase tracking-widest text-xs hover:border-[#00F2FF] hover:bg-[#0A1F33]/50 transition-all duration-300 text-left leading-relaxed active:bg-[#00F2FF]/10" onClick={() => handleAnswer(opt)}>{opt.label}</button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* DISPATCH SCREEN */}
          {step === 13 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center backdrop-blur-sm shadow-2xl">
                <Activity className="h-16 w-16 text-[#00F2FF] mx-auto mb-6 animate-pulse" />
                <h2 className="text-4xl font-bold mb-4 text-white uppercase italic tracking-tighter">Signals Captured</h2>
                <p className="text-[#00F2FF] text-[10px] uppercase tracking-[0.3em] font-bold mb-10 animate-pulse italic">Dispatching role-aware report to {formData.email}</p>
                <div className="flex justify-center"><Loader2 className="animate-spin h-10 w-10 text-[#00F2FF]" /></div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
