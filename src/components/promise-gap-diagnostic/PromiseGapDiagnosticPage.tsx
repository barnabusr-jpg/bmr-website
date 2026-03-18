import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShieldCheck, AlertCircle } from "lucide-react";
import DiagnosticResultsContent from "./DiagnosticResultsContent";

const diagnosticQuestions = [
  { id: 1, lens: "HAI", text: "How do teams handle verification of AI outputs before sharing them?", options: [
    { label: "Level 4: Forensic Assurance (Optimized)", weight: 1 },
    { label: "Level 3: Peer-Review Protocol (Managed)", weight: 3 },
    { label: "Level 2: Spot-Check Verification (Reactive)", weight: 5 },
    { label: "Level 1: No Verification (Undefined)", weight: 7 }
  ]},
  { id: 2, lens: "HAI", text: "What is the primary method for identifying AI-generated hallucinations?", options: [
    { label: "Level 4: Automated Cross-Reference Tools", weight: 1 },
    { label: "Level 3: Structured Manual Review", weight: 3 },
    { label: "Level 2: Ad-hoc Discovery", weight: 5 },
    { label: "Level 1: Consumer Reliance", weight: 7 }
  ]},
  { id: 3, lens: "HAI", text: "How are AI prompt libraries managed across the organization?", options: [
    { label: "Level 4: Centralized & Audited Repository", weight: 1 },
    { label: "Level 3: Departmental Shared Folders", weight: 3 },
    { label: "Level 2: Individual Personal Lists", weight: 5 },
    { label: "Level 1: No Formal Storage", weight: 7 }
  ]},
  { id: 4, lens: "HAI", text: "How frequently is AI output accuracy audited by third parties?", options: [
    { label: "Level 4: Continuous Automated Auditing", weight: 1 },
    { label: "Level 3: Quarterly Manual Reviews", weight: 3 },
    { label: "Level 2: Annual Compliance Check", weight: 5 },
    { label: "Level 1: Never Audited", weight: 7 }
  ]},
  { id: 5, lens: "AVS", text: "How is AI performance mapped to specific business KPIs?", options: [
    { label: "Level 4: Real-time Dashboard Integration", weight: 1 },
    { label: "Level 3: Monthly KPI Attribution", weight: 3 },
    { label: "Level 2: Anecdotal Success Stories", weight: 5 },
    { label: "Level 1: No Performance Mapping", weight: 7 }
  ]},
  { id: 6, lens: "AVS", text: "What is the process for retiring inefficient AI models?", options: [
    { label: "Level 4: Automated Lifecycle Decommissioning", weight: 1 },
    { label: "Level 3: Scheduled Periodic Reviews", weight: 3 },
    { label: "Level 2: Manual Removal on Failure", weight: 5 },
    { label: "Level 1: Indefinite Operation", weight: 7 }
  ]},
  { id: 7, lens: "AVS", text: "How are team members trained on new AI capabilities?", options: [
    { label: "Level 4: Role-Specific Certification Paths", weight: 1 },
    { label: "Level 3: Regular Workshops & Seminars", weight: 3 },
    { label: "Level 2: Ad-hoc Tool Demonstrations", weight: 5 },
    { label: "Level 1: Self-Taught / No Training", weight: 7 }
  ]},
  { id: 8, lens: "AVS", text: "How is user feedback incorporated into AI tool refinement?", options: [
    { label: "Level 4: Direct API-to-Engineering Loop", weight: 1 },
    { label: "Level 3: Monthly Stakeholder Meetings", weight: 3 },
    { label: "Level 2: Reactive Helpdesk Tickets", weight: 5 },
    { label: "Level 1: No Feedback Integration", weight: 7 }
  ]},
  { id: 9, lens: "IGF", text: "How is sensitive data leakage prevented in AI interactions?", options: [
    { label: "Level 4: Enterprise-Grade DLP Scrubbing", weight: 1 },
    { label: "Level 3: Strict Manual Access Controls", weight: 3 },
    { label: "Level 2: General Privacy Policy Guideline", weight: 5 },
    { label: "Level 1: Relying on User Discretion", weight: 7 }
  ]},
  { id: 10, lens: "IGF", text: "Who holds ultimate accountability for AI-generated decisions?", options: [
    { label: "Level 4: Dedicated AI Ethics Committee", weight: 1 },
    { label: "Level 3: C-Suite Executive Sponsor", weight: 3 },
    { label: "Level 2: Individual Department Heads", weight: 5 },
    { label: "Level 1: Distributed / Unclear", weight: 7 }
  ]},
  { id: 11, lens: "IGF", text: "How are AI vendor risks assessed during procurement?", options: [
    { label: "Level 4: Forensic Security Due Diligence", weight: 1 },
    { label: "Level 3: Standard IT Audit Checklist", weight: 3 },
    { label: "Level 2: Basic TOS Review", weight: 5 },
    { label: "Level 1: No Formal Risk Assessment", weight: 7 }
  ]},
  { id: 12, lens: "IGF", text: "How is the gap between expected and actual AI ROI measured?", options: [
    { label: "Level 4: Automated Value Tracking", weight: 1 },
    { label: "Level 3: Quarterly Financial Audits", weight: 3 },
    { label: "Level 2: Year-End Budget Review", weight: 5 },
    { label: "Level 1: Not Formally Measured", weight: 7 }
  ]}
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
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto py-12">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight">Forensic Signal Diagnostic</h2>
                <div className="border-l-2 border-[#00F2FF] bg-[#0A1F33]/40 p-6 mb-8">
                  <h3 className="text-[#00F2FF] text-[10px] uppercase font-bold mb-3 flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Audit Protocol</h3>
                  <p className="text-slate-300 text-xs italic">Email verification is required to unlock organization fields.</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); if(!isLocked) setStep(1); }} className="space-y-6">
                  <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white focus:border-[#00F2FF] outline-none" placeholder="Full Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="email" className={`w-full p-4 bg-slate-950 border rounded text-white outline-none ${emailError ? 'border-red-500' : 'border-slate-800 focus:border-[#00F2FF]'}`} placeholder="Work Email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input type="email" className={`w-full p-4 bg-slate-950 border rounded text-white outline-none ${emailError ? 'border-red-500' : 'border-slate-800 focus:border-[#00F2FF]'}`} placeholder="Confirm Email" required onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} />
                  </div>
                  {emailError && <div className="text-red-400 text-[10px] uppercase font-bold flex items-center gap-2 animate-pulse"><AlertCircle className="h-3 w-3" /> Mismatch Detected</div>}
                  <div className={`transition-all duration-500 ${isLocked ? 'opacity-20 grayscale pointer-events-none' : 'opacity-100'}`}>
                    <input disabled={isLocked} className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white mb-6 outline-none focus:border-[#00F2FF]" placeholder="Organization" required={!isLocked} onChange={(e) => setFormData({...formData, org: e.target.value})} />
                    <select disabled={isLocked} className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white outline-none" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                      <option value="Executive">Executive Perspective</option>
                      <option value="Manager">Manager Perspective</option>
                      <option value="Technical">Technical Perspective</option>
                    </select>
                  </div>
                  <button disabled={isLocked} type="submit" className={`w-full py-6 font-bold uppercase tracking-widest text-xs transition-all ${isLocked ? 'bg-slate-800 text-slate-500' : 'bg-[#00F2FF] text-[#020617] hover:bg-white'}`}>
                    {isLocked ? "Calibration Required" : "Begin Observation"}
                  </button>
                </form>
              </Card>
            </motion.div>
          ) : (
             <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-12 bg-slate-900/30 border-slate-800 text-center">
                  <span className="text-[#00F2FF] font-bold uppercase tracking-[0.4em] text-[10px]">Signal {step} of 12</span>
                  <h2 className="text-2xl font-bold mt-10 mb-12 italic uppercase tracking-tighter">{diagnosticQuestions[step - 1].text}</h2>
                  <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                    {diagnosticQuestions[step - 1].options.map((opt, idx) => (
                      <button key={idx} onClick={() => handleAnswer(opt)} className="py-6 px-6 border border-slate-800 text-slate-300 uppercase tracking-widest text-[11px] font-bold hover:border-[#00F2FF] transition-all">
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
