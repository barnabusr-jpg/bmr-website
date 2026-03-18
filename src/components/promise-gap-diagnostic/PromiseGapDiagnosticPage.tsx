import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShieldCheck, AlertCircle } from "lucide-react";
import DiagnosticResultsContent from "./DiagnosticResultsContent";

const diagnosticQuestions = [
  { id: 1, lens: "HAI", text: "How do teams handle verification of AI outputs before sharing them?", options: [
    { label: "Level 4: Forensic Assurance (Optimized)", strength: 5, weight: 8 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]}
  // ... Keep all 12 of your questions here
];

export default function PromiseGapDiagnosticPage() {
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', confirmEmail: '', org: '', role: 'Executive' 
  });
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    const email1 = formData.email.trim().toLowerCase();
    const email2 = formData.confirmEmail.trim().toLowerCase();
    setEmailError(!!(email1 && email2 && email1 !== email2));
  }, [formData.email, formData.confirmEmail]);

  const isLocked = emailError || !formData.email || !formData.confirmEmail || formData.email !== formData.confirmEmail;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLocked) setStep(1);
  };

  const handleAnswer = (option: any) => {
    const currentLens = diagnosticQuestions[step - 1]?.lens || "HAI";
    setAnswers([...answers, { ...option, lens: currentLens }]);
    if (step < 12) setStep(step + 1);
    else setShowResults(true);
  };

  if (showResults) return <DiagnosticResultsContent />;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <div className="max-w-4xl mx-auto py-12">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800">
                <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight">Forensic Signal Diagnostic</h2>
                <div className="border-l-2 border-[#00F2FF] bg-[#0A1F33]/40 p-6 mb-8">
                  <h3 className="text-[#00F2FF] text-[10px] uppercase tracking-[4px] font-bold mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3" /> Audit Protocol
                  </h3>
                  <p className="text-slate-300 text-xs italic">Email signature must match to unlock organization data.</p>
                </div>
                <form onSubmit={handleStart} className="space-y-6">
                  <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" placeholder="Full Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="email" className={`w-full p-4 bg-slate-950 border rounded text-white ${emailError ? 'border-red-500' : 'border-slate-800'}`} placeholder="Work Email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input type="email" className={`w-full p-4 bg-slate-950 border rounded text-white ${emailError ? 'border-red-500' : 'border-slate-800'}`} placeholder="Confirm Email" required onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} />
                  </div>
                  {emailError && <div className="text-red-400 text-[10px] uppercase font-bold animate-pulse flex items-center gap-2"><AlertCircle className="h-3 w-3" /> Mismatch Detected</div>}
                  <div className={isLocked ? "opacity-20 pointer-events-none" : "opacity-100"}>
                    <input disabled={isLocked} className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white mb-6" placeholder="Organization" required={!isLocked} onChange={(e) => setFormData({...formData, org: e.target.value})} />
                    <select disabled={isLocked} className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                      <option value="Executive">Executive</option>
                      <option value="Manager">Manager</option>
                      <option value="Technical">Technical</option>
                    </select>
                  </div>
                  <button disabled={isLocked} type="submit" className={`w-full py-6 font-bold uppercase text-xs ${isLocked ? 'bg-slate-800 text-slate-500' : 'bg-[#00F2FF] text-[#020617]'}`}>
                    {isLocked ? "Calibration Required" : "Begin Observation"}
                  </button>
                </form>
              </Card>
            </motion.div>
          )}
          {step > 0 && (
             <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-12 bg-slate-900/30 border-slate-800 text-center">
                  <h2 className="text-2xl font-bold mb-12 uppercase italic">{diagnosticQuestions[step - 1].text}</h2>
                  <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                    {diagnosticQuestions[step - 1].options.map((opt, idx) => (
                      <button key={idx} onClick={() => handleAnswer(opt)} className="py-6 px-6 border border-slate-800 text-slate-300 uppercase text-[11px] font-bold hover:border-[#00F2FF]">{opt.label}</button>
                    ))}
                  </div>
                </Card>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
