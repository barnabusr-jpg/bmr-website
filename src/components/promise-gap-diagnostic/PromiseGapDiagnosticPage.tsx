import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";

// Explicit types to fix Build Error
type QuestionOption = { label: string; strength: number; weight: number; vector: string };
type Question = { id: number; lens: string; text: string; options: QuestionOption[] };

const diagnosticQuestions: Question[] = [
  /* ... (Include your 12 questions here) ... */
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
          localStorage.setItem('bmr_results_vault', JSON.stringify({ ...zoneResults, email: formData.email, role: formData.role }));
          const response = await fetch('/api/send-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: formData.name, email: formData.email, org: formData.organization, role: formData.role, zoneData: zoneResults }),
          });
          if (response.ok) { router.push('/diagnostic/results'); }
        } catch (error) {
          console.error("Forensic dispatch failed:", error); // Fixed Build Error
          setIsSubmitting(false);
        }
      };
      submitResults();
    }
  }, [step, isSubmitting, formData, router, zoneResults]);

  const handleAnswer = (option: QuestionOption) => {
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="p-10 bg-slate-900 border-slate-800 shadow-2xl">
              <form onSubmit={(e) => { 
                e.preventDefault(); 
                if (formData.email !== formData.confirmEmail) return alert("Emails match failed.");
                setStep(1); 
              }} className="space-y-6">
                <input required placeholder="Name" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                
                {/* STYLED SELECTOR: Matches dark theme and fixes the "odd" look */}
                <select 
                  required 
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white appearance-none cursor-pointer focus:border-[#00F2FF] outline-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300F2FF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.2em'
                  }}
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="Executive">Executive Perspective</option>
                  <option value="Manager">Manager Perspective</option>
                  <option value="Technical">Technical Perspective</option>
                </select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="email" placeholder="Email" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <input required type="email" placeholder="Confirm Email" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" value={formData.confirmEmail} onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} />
                </div>
                <input required placeholder="Organization" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                <button type="submit" className="w-full bg-[#00F2FF] text-[#020617] font-bold py-4 uppercase">Begin Observation</button>
              </form>
            </Card>
          </motion.div>
        )}
        {/* Step 1-12 Logic (ensure handleAnswer is used) */}
      </AnimatePresence>
    </div>
  );
}
