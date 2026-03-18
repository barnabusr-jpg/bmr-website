import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Loader2, AlertCircle } from "lucide-react";
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
  { id: 3, lens: "HAI", text: "How do teams handle situations where AI tools may not be optimal?", options: [
    { label: "Level 4: Dynamic Edge-Case Optimization", strength: 5, weight: 8 },
    { label: "Level 3: Integrated Exception Workflows", strength: 3, weight: 3 },
    { label: "Level 2: Manual Tool Bypassing", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 4, lens: "HAI", text: "How does the organization review AI risk appetite against performance?", options: [
    { label: "Level 4: Predictive Risk Modeling", strength: 5, weight: 8 },
    { label: "Level 3: Data-Driven Performance Benchmarking", strength: 3, weight: 3 },
    { label: "Level 2: Qualitative Risk Assessment", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 5, lens: "AVS", text: "What is the standard process for pre-deployment risk reviews?", options: [
    { label: "Level 4: Automated Deployment Guardrails", strength: 5, weight: 8 },
    { label: "Level 3: Formalized Risk Tiering", strength: 3, weight: 3 },
    { label: "Level 2: Fragmented Review Capacity", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 6, lens: "AVS", text: "How is responsibility assigned for AI failures?", options: [
    { label: "Level 4: Persistent Accountability Telemetry", strength: 5, weight: 8 },
    { label: "Level 3: Optimized Response Pathways", strength: 3, weight: 3 },
    { label: "Level 2: Fragmented Ownership Matrix", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 7, lens: "AVS", text: "How is AI compliance managed after deployment?", options: [
    { label: "Level 4: Continuous Drift Detection", strength: 5, weight: 8 },
    { label: "Level 3: Dynamic Compliance Benchmarking", strength: 3, weight: 3 },
    { label: "Level 2: Static Post-Launch Oversight", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 8, lens: "AVS", text: "What level of effort is required to maintain AI tools?", options: [
    { label: "Level 4: Autonomous Maintenance Telemetry", strength: 5, weight: 8 },
    { label: "Level 3: Strategic Lifecycle Optimization", strength: 3, weight: 3 },
    { label: "Level 2: Manual Correction Overhead", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 9, lens: "IGF", text: "How are human corrections fed back into AI systems?", options: [
    { label: "Level 4: Retraining Loop Automation", strength: 5, weight: 8 },
    { label: "Level 3: Systematic Correction Refinement", strength: 3, weight: 3 },
    { label: "Level 2: Fragmented Feedback Ingestion", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 10, lens: "IGF", text: "How does leadership prioritize AI projects?", options: [
    { label: "Level 4: Impact Telemetry Alignment", strength: 5, weight: 8 },
    { label: "Level 3: Strategic Maturity Thresholds", strength: 3, weight: 3 },
    { label: "Level 2: Technical Feature Prioritization", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 11, lens: "IGF", text: "How does the organization prepare teams for AI deployments?", options: [
    { label: "Level 4: Systematic Readiness Reporting", strength: 5, weight: 8 },
    { label: "Level 3: Standardized Impact Benchmarking", strength: 3, weight: 3 },
    { label: "Level 2: Tactical Change Readiness", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 12, lens: "IGF", text: "How is the gap between expected and actual AI ROI measured?", options: [
    { label: "Level 4: Automated Value Tracking", strength: 5, weight: 8 },
    { label: "Level 3: Pilot ROI Benchmarking", strength: 3, weight: 3 },
    { label: "Level 2: Speculative Impact Reporting", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]}
];

export default function PromiseGapDiagnosticPage() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', confirmEmail: '', org: '', role: 'Executive' 
  });
  const [answers, setAnswers] = useState<any[]>([]);

  // THE FIX: Strict Guard Clause
  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normalize both inputs for comparison
    const email1 = formData.email.trim().toLowerCase();
    const email2 = formData.confirmEmail.trim().toLowerCase();

    if (email1 !== email2) {
      setEmailError(true);
      return; // CRITICAL: This return prevents the code from reaching setStep(1)
    }
    
    setEmailError(false);
    setStep(1); // Only triggers if the if-statement above is false
  };

  const handleAnswer = async (option: any) => {
    const currentLens = diagnosticQuestions[step - 1].lens;
    const newAnswers = [...answers, { ...option, lens: currentLens }];
    setAnswers(newAnswers);

    if (step < 12) {
      setStep(step + 1);
    } else {
      await finishDiagnostic(newAnswers);
    }
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
          // Removed 'role' from transmission to match API expectations
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
                <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight text-white">Forensic Signal Diagnostic</h2>
                
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
                      className={`w-full p-4 bg-slate-950 border rounded text-white outline-none transition-all ${emailError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-800 focus:border-[#00F2FF]'}`} 
                      placeholder="Work Email" required 
                      onChange={(e) => {
                        setFormData({...formData, email: e.target.value});
                        setEmailError(false);
                      }} 
                    />
                    <input 
                      type="email"
                      className={`w-full p-4 bg-slate-950 border rounded text-white outline-none transition-all ${emailError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-800 focus:border-[#00F2FF]'}`} 
                      placeholder="Confirm Work Email" required 
                      onChange={(e) => {
                        setFormData({...formData, confirmEmail: e.target.value});
                        setEmailError(false);
                      }} 
                    />
                  </div>
                  
                  {emailError && (
                    <div className="flex items-center gap-2 text-red-400 text-xs mt-1 animate-pulse">
                      <AlertCircle className="h-3 w-3" />
                      <span>The email addresses provided do not match. Please verify.</span>
                    </div>
                  )}

                  <input 
                    className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white focus:border-[#00F2FF] outline-none transition-all" 
                    placeholder="Organization" required 
                    onChange={(e) => setFormData({...formData, org: e.target.value})} 
                  />

                  <div className="space-y-1">
                    <select 
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white focus:border-[#00F2FF] outline-none transition-all" 
                      value={formData.role} 
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="Executive">Executive Perspective</option>
                      <option value="Manager">Manager Perspective</option>
                      <option value="Technical">Technical Perspective</option>
                    </select>
                    <p className="mt-2 text-[10px] italic text-[#00F2FF]/80">{lensDefinitions[formData.role]}</p>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-6 bg-[#00F2FF] text-[#020617] font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.1)]"
                  >
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
                      <button 
                        key={idx} 
                        onClick={() => handleAnswer(opt)} 
                        className="py-6 px-6 border border-slate-800 text-slate-300 uppercase tracking-widest text-[11px] font-bold hover:border-[#00F2FF] hover:bg-[#0A1F33]/50 transition-all text-left"
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
