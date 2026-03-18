import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Loader2 } from "lucide-react";
import DiagnosticResultsContent from "./DiagnosticResultsContent";

const lensDefinitions: Record<string, string> = {
  "Executive": "Focus: Strategic alignment, enterprise risk stewardship, and long-term ROI stability.",
  "Manager": "Focus: Operational workflow synchronization, adoption friction, and team output.",
  "Technical": "Focus: System reliability, architectural integrity, and forensic data accuracy."
};

const diagnosticQuestions = [
  { id: 1, lens: "HAI", text: "How do teams handle verification of AI outputs before sharing them?", options: [
    { label: "Level 4: Forensic Assurance (Optimized)", strength: 5, weight: 8 },
    { label: "Level 3: Protocolized Verification", strength: 3, weight: 3 },
    { label: "Level 2: Ad-Hoc / Fragmented Cycles", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 2, lens: "HAI", text: "What is the process for identifying the cause of AI errors?", options: [
    { label: "Level 4: Real-Time Root-Cause Telemetry", strength: 5, weight: 8 },
    { label: "Level 3: Formalized Forensic Retrospectives", strength: 3, weight: 3 },
    { label: "Level 2: Tactical Incident Investigation", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  // ... [Note: Questions 3-12 would follow the same structure as your provided list]
];

export default function PromiseGapDiagnosticPage() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', confirmEmail: '', org: '', role: 'Executive' 
  });
  const [answers, setAnswers] = useState<any[]>([]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email !== formData.confirmEmail) {
      alert("Emails do not match.");
      return;
    }
    setStep(1);
  };

  const handleAnswer = async (option: any) => {
    const newAnswers = [...answers, { ...option, lens: diagnosticQuestions[step - 1].lens }];
    setAnswers(newAnswers);

    if (step < 12) {
      setStep(step + 1);
    } else {
      await finishDiagnostic(newAnswers);
    }
  };

  const finishDiagnostic = async (finalAnswers: any[]) => {
    setIsSubmitting(true);

    // Calculate Scores per Pillar
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

    // Save for the Results Component to read
    localStorage.setItem('bmr_results_vault', JSON.stringify({
      ...formData,
      ...zoneData,
      timestamp: new Date().toISOString()
    }));

    try {
      // Trigger the API logic you built earlier
      await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          org: formData.org,
          role: formData.role,
          zoneData
        }),
      });
      setShowResults(true);
    } catch (err) {
      console.error("Transmission failed", err);
      setShowResults(true); // Show results anyway so user isn't stuck
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResults) return <DiagnosticResultsContent />;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <div className="max-w-4xl mx-auto py-12">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight">Forensic Signal Diagnostic</h2>
                <form onSubmit={handleStart} className="space-y-6">
                  <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded" placeholder="Full Name" required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="email" className="w-full p-4 bg-slate-950 border border-slate-800 rounded" placeholder="Work Email" required 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input type="email" className="w-full p-4 bg-slate-950 border border-slate-800 rounded" placeholder="Confirm Email" required 
                      onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} />
                  </div>

                  <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded" placeholder="Organization" required 
                    onChange={(e) => setFormData({...formData, org: e.target.value})} />

                  <select className="w-full p-4 bg-slate-950 border border-slate-800 rounded" value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})}>
                    <option value="Executive">Executive Perspective</option>
                    <option value="Manager">Manager Perspective</option>
                    <option value="Technical">Technical Perspective</option>
                  </select>

                  <button type="submit" className="w-full py-6 bg-[#00F2FF] text-[#020617] font-bold uppercase tracking-widest text-xs">
                    Begin Observation
                  </button>
                </form>
              </Card>
            </motion.div>
          )}

          {step > 0 && step <= 12 && (
             <motion.div key={step} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <Card className="p-12 bg-slate-900/30 border-slate-800 text-center relative overflow-hidden">
                  {isSubmitting && (
                    <div className="absolute inset-0 z-50 bg-slate-950/90 flex flex-col items-center justify-center">
                      <Loader2 className="h-8 w-8 text-[#00F2FF] animate-spin mb-4" />
                      <p className="text-[10px] uppercase tracking-[4px] text-[#00F2FF]">Analyzing Forensic Signature...</p>
                    </div>
                  )}
                  <span className="text-[#00F2FF] font-bold uppercase tracking-[0.4em] text-[10px]">Signal {step} of 12</span>
                  <h2 className="text-2xl font-bold mt-10 mb-12 italic uppercase tracking-tighter">
                    {diagnosticQuestions[step - 1].text}
                  </h2>
                  <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                    {diagnosticQuestions[step - 1].options.map((opt, idx) => (
                      <button key={idx} onClick={() => handleAnswer(opt)} 
                              className="py-6 px-6 border border-slate-800 text-slate-300 uppercase tracking-widest text-[11px] font-bold hover:border-[#00F2FF] hover:bg-[#0A1F33]/50 transition-all text-left">
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
