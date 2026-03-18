import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import DiagnosticResultsContent from "./DiagnosticResultsContent";

const lensDefinitions: Record<string, string> = {
  "Executive": "Focus: Strategic alignment, enterprise risk stewardship, and long-term ROI stability.",
  "Manager": "Focus: Operational workflow synchronization, adoption friction, and team output.",
  "Technical": "Focus: System reliability, architectural integrity, and forensic data accuracy."
};

// ... (diagnosticQuestions array remains unchanged)

export default function PromiseGapDiagnosticPage() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', confirmEmail: '', org: '', role: 'Executive' 
  });
  const [answers, setAnswers] = useState<any[]>([]);

  // REAL-TIME VALIDATION GATE
  // Triggers whenever email or confirmEmail changes
  useEffect(() => {
    const email1 = formData.email.trim().toLowerCase();
    const email2 = formData.confirmEmail.trim().toLowerCase();

    // Only show error if both fields have content and they don't match
    if (email1 && email2 && email1 !== email2) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [formData.email, formData.confirmEmail]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailError && formData.email && formData.confirmEmail) {
      setStep(1);
    }
  };

  const handleAnswer = async (option: any) => {
    const currentLens = diagnosticQuestions[step - 1].lens;
    const newAnswers = [...answers, { ...option, lens: currentLens }];
    setAnswers(newAnswers);
    if (step < 12) setStep(step + 1);
    else await finishDiagnostic(newAnswers);
  };

  const finishDiagnostic = async (finalAnswers: any[]) => {
    setIsSubmitting(true);
    const calculatePillar = (lens: string) => {
      const pillarAnswers = finalAnswers.filter(a => a.lens === lens);
      return {
        aggregate: pillarAnswers.reduce((sum, a) => sum + (a.strength + a.weight), 0),
        max: Math.max(...pillarAnswers.map(a => a.strength))
      };
    };

    const zoneData = {
      HAI: calculatePillar("HAI"),
      AVS: calculatePillar("AVS"),
      IGF: calculatePillar("IGF")
    };

    localStorage.setItem('bmr_results_vault', JSON.stringify({
      ...formData,
      ...zoneData,
      timestamp: new Date().toISOString()
    }));

    try {
      await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          org: formData.org,
          zoneData
        }),
      });
      setShowResults(true);
    } catch (err) {
      console.error("Transmission failed", err);
      setShowResults(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResults) return <DiagnosticResultsContent />;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto py-12">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight">Forensic Signal Diagnostic</h2>
                
                <div className="border-l-2 border-[#00F2FF] bg-[#0A1F33]/40 p-6 mb-8">
                  <h3 className="text-[#00F2FF] text-[10px] uppercase tracking-[4px] font-bold mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3" /> Audit Protocol
                  </h3>
                  <p className="text-slate-300 text-xs italic">
                    This diagnostic measures systemic maturity. Select Level 1 if a protocol is reactive or undefined.
                  </p>
                </div>

                <form onSubmit={handleStart} className="space-y-6">
                  <input 
                    className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white focus:border-[#00F2FF] outline-none transition-all" 
                    placeholder="Full Name" required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="email"
                      className={`w-full p-4 bg-slate-950 border rounded text-white outline-none transition-all ${emailError ? 'border-red-500 ring-1 ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-slate-800 focus:border-[#00F2FF]'}`} 
                      placeholder="Work Email" required 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                    <input 
                      type="email"
                      className={`w-full p-4 bg-slate-950 border rounded text-white outline-none transition-all ${emailError ? 'border-red-500 ring-1 ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-slate-800 focus:border-[#00F2FF]'}`} 
                      placeholder="Confirm Work Email" required 
                      onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} 
                    />
                  </div>
                  
                  {emailError && (
                    <div className="flex items-center gap-2 text-red-400 text-[10px] uppercase tracking-wider mt-1 animate-pulse font-bold">
                      <AlertCircle className="h-3 w-3" />
                      <span>Action Required: Email Mismatch. Correct before proceeding.</span>
                    </div>
                  )}

                  {/* DISABLED STATE: This field locks if emails don't match */}
                  <input 
                    disabled={emailError}
                    className={`w-full p-4 rounded text-white outline-none transition-all ${emailError ? 'bg-slate-900 border-slate-800 opacity-30 cursor-not-allowed' : 'bg-slate-950 border-slate-800 border focus:border-[#00F2FF]'}`} 
                    placeholder={emailError ? "Verification Required..." : "Organization"} 
                    required 
                    onChange={(e) => setFormData({...formData, org: e.target.value})} 
                  />

                  <div className="space-y-1">
                    <select 
                      disabled={emailError}
                      className={`w-full p-4 rounded text-white outline-none transition-all ${emailError ? 'bg-slate-900 border-slate-800 opacity-30' : 'bg-slate-950 border-slate-800 border focus:border-[#00F2FF]'}`} 
                      value={formData.role} 
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="Executive">Executive Perspective</option>
                      <option value="Manager">Manager Perspective</option>
                      <option value="Technical">Technical Perspective</option>
                    </select>
                    {!emailError && <p className="mt-2 text-[10px] italic text-[#00F2FF]/80">{lensDefinitions[formData.role]}</p>}
                  </div>

                  <button 
                    disabled={emailError || !formData.email || !formData.confirmEmail}
                    type="submit" 
                    className={`w-full py-6 font-bold uppercase tracking-widest text-xs transition-all ${emailError ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-[#00F2FF] text-[#020617] hover:bg-white shadow-[0_0_20px_rgba(0,242,255,0.1)]'}`}
                  >
                    {emailError ? "Resolve Email Variance" : "Begin Observation"}
                  </button>
                </form>
              </Card>
            </motion.div>
          )}

          {/* ... (steps 1-12 logic remains unchanged) */}
        </AnimatePresence>
      </div>
    </div>
  );
}
