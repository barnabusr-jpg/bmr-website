import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShieldCheck, AlertCircle } from "lucide-react";
import DiagnosticResultsContent from "./DiagnosticResultsContent";

const diagnosticQuestions = [
  { id: 1, text: "How do teams handle verification of AI outputs before sharing them?", options: [
    { label: "Level 4: Forensic Assurance (Optimized)", weight: 1 },
    { label: "Level 3: Peer-Review Protocol (Managed)", weight: 3 },
    { label: "Level 2: Spot-Check Verification (Reactive)", weight: 5 },
    { label: "Level 1: No Verification (Undefined)", weight: 7 }
  ]},
  // ... Include all 12 questions using this 1, 3, 5, 7 weight distribution
];

export default function PromiseGapDiagnosticPage() {
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', confirmEmail: '', org: '', role: 'Executive' });
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    const e1 = formData.email.trim().toLowerCase();
    const e2 = formData.confirmEmail.trim().toLowerCase();
    setEmailError(!!(e1 && e2 && e1 !== e2));
  }, [formData.email, formData.confirmEmail]);

  const isLocked = emailError || !formData.email || !formData.confirmEmail || formData.email !== formData.confirmEmail;

  const handleAnswer = (option: { weight: number }) => {
    setAnswers([...answers, option.weight]);
    if (step < 12) setStep(step + 1);
    else setShowResults(true);
  };

  if (showResults) return <DiagnosticResultsContent answers={answers} userDetails={formData} />;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <div className="max-w-4xl mx-auto py-12">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800">
                <h2 className="text-3xl font-bold mb-6 italic uppercase">Forensic Signal Diagnostic</h2>
                <form onSubmit={(e) => { e.preventDefault(); if(!isLocked) setStep(1); }} className="space-y-6">
                  <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white outline-none focus:border-[#00F2FF]" placeholder="Full Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="email" className={`w-full p-4 bg-slate-950 border rounded text-white outline-none ${emailError ? 'border-red-500' : 'border-slate-800'}`} placeholder="Work Email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input type="email" className={`w-full p-4 bg-slate-950 border rounded text-white outline-none ${emailError ? 'border-red-500' : 'border-slate-800'}`} placeholder="Confirm Email" required onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} />
                  </div>
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
          ) : (
            <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center">
                <h2 className="text-2xl font-bold mb-12 italic uppercase">{diagnosticQuestions[step - 1].text}</h2>
                <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                  {diagnosticQuestions[step - 1].options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleAnswer(opt)} className="py-6 px-6 border border-slate-800 text-slate-300 uppercase text-[11px] font-bold hover:border-[#00F2FF] transition-all">
                      {opt.label}
                    </button>
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
