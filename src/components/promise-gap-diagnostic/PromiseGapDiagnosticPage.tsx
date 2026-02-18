import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";

const diagnosticQuestions = [
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
            body: JSON.stringify({ name: formData.name, email: formData.email, org: formData.organization, role: formData.role, zoneData: zoneResults }),
          });
          if (response.ok) { router.push('/diagnostic/results'); }
        } catch (error) {
          console.error("Dispatch failed", error);
          setIsSubmitting(false);
        }
      };
      submitResults();
    }
  }, [step, isSubmitting, formData, router, zoneResults]);

  const handleAnswer = (option: any) => {
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
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="p-10 bg-slate-900 border-slate-800">
              <form onSubmit={(e) => { 
                e.preventDefault(); 
                if (formData.email !== formData.confirmEmail) return alert("Emails must match");
                setStep(1); 
              }} className="space-y-4">
                <input required placeholder="Name" className="w-full p-4 bg-slate-950 border border-slate-800 rounded" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <select required className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                  <option value="Executive">Executive</option>
                  <option value="Manager">Manager</option>
                  <option value="Technical">Technical</option>
                </select>
                <input required type="email" placeholder="Email" className="w-full p-4 bg-slate-950 border border-slate-800 rounded" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input required type="email" placeholder="Confirm Email" className="w-full p-4 bg-slate-950 border border-slate-800 rounded" value={formData.confirmEmail} onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} />
                <input required placeholder="Organization" className="w-full p-4 bg-slate-950 border border-slate-800 rounded" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                <button type="submit" className="w-full bg-cyan-500 py-4 text-black font-bold uppercase">Begin</button>
              </form>
            </Card>
          </motion.div>
        )}
        {step > 0 && step <= 12 && (
          <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="p-10 bg-slate-900 border-slate-800 text-center">
              <h2 className="text-2xl font-bold mb-8 uppercase italic">{diagnosticQuestions[step - 1].text}</h2>
              <div className="grid grid-cols-1 gap-4">
                {diagnosticQuestions[step - 1].options.map((opt, idx) => (
                  <button key={idx} className="p-4 border border-slate-800 hover:border-cyan-400 uppercase text-xs" onClick={() => handleAnswer(opt)}>{opt.label}</button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
        {step === 13 && <div className="text-center py-20 animate-pulse uppercase">Dispatching Forensic Report...</div>}
      </AnimatePresence>
    </div>
  );
}
