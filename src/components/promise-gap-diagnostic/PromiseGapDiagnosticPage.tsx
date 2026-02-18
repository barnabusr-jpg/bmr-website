import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Activity, Loader2 } from "lucide-react";

// --- (Keep your existing diagnosticQuestions array here) ---

export default function PromiseGapDiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    confirmEmail: "", 
    organization: "", 
    role: "Executive" 
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
          console.error("Forensic dispatch failed", error);
          setIsSubmitting(false);
        }
      };
      submitResults();
    }
  }, [step, isSubmitting, formData, router, zoneResults]);

  // (Include handleAnswer logic here)

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 selection:bg-[#00F2FF]/30">
      <div className="max-w-4xl mx-auto py-12">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 backdrop-blur-sm shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight text-white">Systemic Observation</h2>
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase()) {
                    alert("Email addresses do not match. Please verify.");
                    return;
                  }
                  setStep(1); 
                }} className="space-y-6">
                  <input required placeholder="Full Name" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500 tracking-widest ml-1 font-bold">Perspective Lens</label>
                    <select 
                      required
                      className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="Executive">Executive (ROI & Strategy focus)</option>
                      <option value="Manager">Manager (Workflow & Team focus)</option>
                      <option value="Technical">Technical (Security & Maintenance focus)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="email" placeholder="Work Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input required type="email" placeholder="Confirm Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none" value={formData.confirmEmail} onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} />
                  </div>
                  
                  <input required placeholder="Organization" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                  
                  <button type="submit" className="w-full bg-[#00F2FF] text-[#020617] font-bold h-16 uppercase tracking-widest hover:bg-[#00d8e4] transition-all">
                    Begin Observation
                  </button>
                </form>
              </Card>
            </motion.div>
          )}
          {/* ... (Step 1-13 UI) ... */}
        </AnimatePresence>
      </div>
    </div>
  );
}
