import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShieldCheck, AlertCircle } from "lucide-react";
import DiagnosticResultsContent from "./DiagnosticResultsContent";

const diagnosticQuestions = [
  { id: 1, lens: "HAI", text: "How do teams handle verification of AI outputs before sharing them?", options: [
    { label: "Level 4: Forensic Assurance (Optimized)", strength: 5, weight: 8 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  // ... (Insert your other 10 questions here)
  { id: 12, lens: "IGF", text: "How is the gap between expected and actual AI ROI measured?", options: [
    { label: "Level 4: Automated Value Tracking", strength: 5, weight: 8 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]}
];

export default function PromiseGapDiagnosticPage() {
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', confirmEmail: '', org: '', role: 'Executive' 
  });
  const [answers, setAnswers] = useState<any[]>([]);

  // Monitor email matching in real-time
  useEffect(() => {
    const email1 = formData.email.trim().toLowerCase();
    const email2 = formData.confirmEmail.trim().toLowerCase();
    if (email1 && email2 && email1 !== email2) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [formData.email, formData.confirmEmail]);

  // Logic Gate: Must have name, matching emails, and organization to proceed
  const isLocked = emailError || !formData.email || !formData.confirmEmail || formData.email !== formData.confirmEmail;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLocked) setStep(1);
  };

  const handleAnswer = (option: any) => {
    const currentLens = diagnosticQuestions[step - 1].lens;
    const newAnswers = [...answers, { ...option, lens: currentLens }];
    setAnswers(newAnswers);

    if (step < 12) {
      setStep(step + 1);
    } else {
      // Final submission logic can be added here if needed
      setShowResults(true);
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
                  <p className="text-slate-300 text-xs italic">Email verification is required to unlock the organization profile.</p>
                </div>

                <form onSubmit={handleStart} className="space-y-6">
                  <input 
                    className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white focus:border-[#00F2FF] outline-none" 
                    placeholder="Full Name" required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="email"
                      className={`w-full p-4 bg-slate-950 border rounded text-white transition-all ${emailError ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-slate-800 focus:border-[#00F2FF]'}`} 
                      placeholder="Work Email" required 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                    <input 
                      type="email"
                      className={`w-full p-4 bg-slate-950 border rounded text-white transition-all ${emailError ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-slate-800 focus:border-[#00F2FF]'}`} 
                      placeholder="Confirm Work Email" required 
                      onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} 
                    />
                  </div>
                  
                  {emailError && (
                    <div className="flex items-center gap-2 text-red-400 text-[10px] uppercase font-bold animate-pulse">
                      <AlertCircle className="h-3 w-3" />
                      <span>Email Mismatch: Resolution required to unlock form.</span>
                    </div>
                  )}

                  {/* VISUAL LOCK: Dims and disables until email is valid */}
                  <div className={`transition-all duration-500 ${isLocked ? 'opacity-20 grayscale pointer-events-none' : 'opacity-100'}`}>
                    <input 
                      disabled={isLocked}
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white focus:border-[#00F2FF] outline-none mb-6" 
                      placeholder="Organization" required={!isLocked} 
                      onChange={(e) => setFormData({...formData, org: e.target.value})} 
                    />
                    <select 
                      disabled={isLocked}
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white focus:border-[#00F2FF] outline-none" 
                      value={formData.role} 
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="Executive">Executive Perspective</option>
                      <option value="Manager">Manager Perspective</option>
                      <option value="Technical">Technical Perspective</option>
                    </select>
                  </div>

                  <button 
                    disabled={isLocked}
                    type="submit" 
                    className={`w-full py-6 font-bold uppercase tracking-widest text-xs transition-all ${isLocked ? 'bg-slate-800 text-slate-500' : 'bg-[#00F2FF] text-[#020617] hover:bg-white shadow-[0_0_20px_rgba(0,242,255,0.1)]'}`}
                  >
                    {isLocked ? "Calibration Required" : "Begin Observation"}
                  </button>
                </form>
              </Card>
            </motion.div>
          )}

          {step > 0 && step <= 12 && (
             <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-12 bg-slate-900/30 border-slate-800 text-center">
                  <span className="text-[#00F2FF] font-bold uppercase tracking-[0.4em] text-[10px]">Signal {step} of 12</span>
                  <h2 className="text-2xl font-bold mt-10 mb-12 italic uppercase tracking-tighter">
                    {diagnosticQuestions[step - 1].text}
                  </h2>
                  <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                    {diagnosticQuestions[step - 1].options.map((opt, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => handleAnswer(opt)} 
                        className="py-6 px-6 border border-slate-800 text-slate-300 uppercase tracking-widest text-[11px] font-bold hover:border-[#00F2FF] transition-all text-left"
                      >
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
