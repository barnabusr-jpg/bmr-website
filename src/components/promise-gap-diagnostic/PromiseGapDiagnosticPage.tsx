import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";

// Explicitly type objects to clear Vercel build errors
type DiagnosticOption = { label: string; strength: number; weight: number; vector: string; };
type DiagnosticQuestion = { id: number; lens: string; text: string; options: DiagnosticOption[]; };

const diagnosticQuestions: DiagnosticQuestion[] = [
  /* ... (12 questions) ... */
];

export default function PromiseGapDiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", email: "", confirmEmail: "", organization: "", role: "Executive" 
  });
  
  const [zoneResults, setZoneResults] = useState<any>({
    HAI: { max: 0, aggregate: 0, vectors: [] },
    AVS: { max: 0, aggregate: 0, vectors: [] },
    IGF: { max: 0, aggregate: 0, vectors: [] }
  });

  useEffect(() => {
    if (step === 13 && !isSubmitting) {
      const submitResults = async () => {
        setIsSubmitting(true);
        try {
          localStorage.setItem('bmr_results_vault', JSON.stringify({ 
            ...zoneResults, email: formData.email, role: formData.role 
          }));
          const response = await fetch('/api/send-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              name: formData.name, email: formData.email, org: formData.organization, 
              role: formData.role, zoneData: zoneResults 
            }),
          });
          if (response.ok) { router.push('/diagnostic/results'); }
        } catch (error) {
          console.error("Forensic dispatch failed:", error); // Uses error variable
          setIsSubmitting(false);
        }
      };
      submitResults();
    }
  }, [step, isSubmitting, formData, router, zoneResults]);

  const handleAnswer = (option: DiagnosticOption) => {
    const currentLens = diagnosticQuestions[step - 1].lens;
    setZoneResults((prev: any) => ({
      ...prev,
      [currentLens]: {
        max: Math.max(prev[currentLens].max, option.strength),
        aggregate: prev[currentLens].aggregate + option.weight,
        vectors: [...prev[currentLens].vectors, option.vector]
      }
    }));
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 selection:bg-[#00F2FF]/30">
      <div className="max-w-4xl mx-auto py-12">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 shadow-2xl backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight text-white">Systemic Observation</h2>
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase()) return alert("Emails must match");
                  setStep(1); 
                }} className="space-y-6">
                  
                  <input required placeholder="Full Name" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  
                  {/* PROFESSIONALLY STYLED SELECTOR: Matches Dark Aesthetic */}
                  <div className="space-y-1 relative">
                    <label className="text-[10px] uppercase text-slate-500 tracking-widest ml-1 font-bold">Perspective Lens</label>
                    <select 
                      required 
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white appearance-none cursor-pointer focus:border-[#00F2FF] outline-none transition-all"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300F2FF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.2em'
                      }}
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="Executive" className="bg-slate-950">Executive Perspective</option>
                      <option value="Manager" className="bg-slate-950">Manager Perspective</option>
                      <option value="Technical" className="bg-slate-950">Technical Perspective</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="email" placeholder="Work Email" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input required type="email" placeholder="Confirm Email" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.confirmEmail} onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} />
                  </div>
                  
                  <input required placeholder="Organization" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                  
                  <button type="submit" className="w-full bg-[#00F2FF] text-[#020617] font-bold h-16 uppercase tracking-widest hover:bg-[#00d8e4] transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)]">Begin Observation</button>
                </form>
              </Card>
            </motion.div>
          )}

          {/* QUESTION RENDERER: Uses handleAnswer to satisfy ESLint */}
          {step > 0 && step <= 12 && (
            <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 text-center shadow-2xl backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-8 italic uppercase text-white tracking-tight leading-tight">{diagnosticQuestions[step - 1].text}</h2>
                <div className="grid grid-cols-1 gap-4">
                  {diagnosticQuestions[step - 1].options.map((opt, idx) => (
                    <button key={idx} className="p-4 border border-slate-800 hover:border-[#00F2FF] uppercase text-[10px] tracking-widest text-slate-300 transition-all font-bold" onClick={() => handleAnswer(opt)}>{opt.label}</button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {step === 13 && <div className="text-center py-20 animate-pulse text-[#00F2FF] font-bold uppercase tracking-widest text-xs">Dispatching Forensic Report...</div>}
        </AnimatePresence>
      </div>
    </div>
  );
}
