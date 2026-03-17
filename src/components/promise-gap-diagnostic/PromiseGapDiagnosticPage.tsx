import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Activity, Loader2, ShieldCheck } from "lucide-react";

interface ZoneData {
  max: number;
  aggregate: number;
  vectors: string[];
}

interface DiagnosticResults {
  HAI: ZoneData;
  AVS: ZoneData;
  IGF: ZoneData;
}

const perspectiveContexts: Record<string, string> = {
  "Executive": "Strategic Stewardship:",
  "Manager": "Operational Synchronization:",
  "Technical": "Forensic Reliability:"
};

const lensDefinitions: Record<string, string> = {
  "Executive": `Focus: Internal Governance (IGF). Strategic alignment and long-term ROI stability.`,
  "Manager": `Focus: Adoption Value (AVS). Workflow synchronization and operational friction.`,
  "Technical": `Focus: Trust Architecture (HAI). Forensic accuracy and system reliability.`
};

const calculatePillarPressure = (weight: number, role: string, zone: string) => {
  const multipliers: Record<string, string> = {
    "Executive": "IGF", 
    "Technical": "HAI", 
    "Manager": "AVS"    
  };
  return multipliers[role] === zone ? weight * 1.5 : weight;
};

const diagnosticQuestions = [
  { id: 1, lens: "HAI", text: "How do teams handle verification of AI outputs before sharing them?", options: [
    { label: "Stage 4: Persistent Forensic Reliability", strength: 5, weight: 8, vector: "Calibrate Empirical Trust" },
    { label: "Stage 3: Standardized Calibration Protocols", strength: 3, weight: 3, vector: "Standardize Trust Protocols" },
    { label: "Stage 2: Informal Verification Cycles", strength: 2, weight: 1, vector: "Optimize Interface Utility" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 2, lens: "HAI", text: "What is the process for identifying the cause of AI errors?", options: [
    { label: "Stage 4: Real-time Root-Cause Telemetry", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3: Formalized Forensic Retrospectives", strength: 3, weight: 3, vector: "Automate Root-Cause Diagnosis" },
    { label: "Stage 2: Ad-hoc Incident Investigation", strength: 2, weight: 1, vector: "Formalize Forensic Retrospectives" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Instrument Error Logging" }
  ]},
  { id: 3, lens: "HAI", text: "How do teams handle situations where AI tools may not be optimal?", options: [
    { label: "Stage 4: Dynamic Edge-Case Optimization", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3: Integrated Exception Workflows", strength: 3, weight: 3, vector: "Integrate Audit Workflows" },
    { label: "Stage 2: Tactical Tool Bypassing", strength: 2, weight: 1, vector: "Expand Algorithmic Scope" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Neutralize Operational Friction" }
  ]},
  { id: 4, lens: "HAI", text: "How does the organization review AI risk appetite against performance?", options: [
    { label: "Stage 4: Predictive Risk Modeling", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3: Data-Driven Performance Benchmarking", strength: 3, weight: 3, vector: "Increase Review Frequency" },
    { label: "Stage 2: Qualitative Risk Assessment", strength: 2, weight: 1, vector: "Predictive Risk Modeling" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Establish Risk Telemetry" }
  ]},
  { id: 5, lens: "AVS", text: "What is the standard process for pre-deployment risk reviews?", options: [
    { label: "Stage 4: Automated Deployment Guardrails", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3: Formalized Risk Tiering", strength: 3, weight: 3, vector: "Formalize Risk Tiering" },
    { label: "Stage 2: Fragmented Review Capacity", strength: 2, weight: 1, vector: "Augment Review Capacity" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Stabilize Deployment Guardrails" }
  ]},
  { id: 6, lens: "AVS", text: "How is responsibility assigned for AI failures?", options: [
    { label: "Stage 4: Persistent Accountability Telemetry", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3: Optimized Response Pathways", strength: 3, weight: 3, vector: "Optimize Response Latency" },
    { label: "Stage 2: Fragmented Ownership Matrix", strength: 2, weight: 1, vector: "Formalize Ownership Matrix" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Map Accountability Pathways" }
  ]},
  { id: 7, lens: "AVS", text: "How is AI compliance managed after deployment?", options: [
    { label: "Stage 4: Continuous Drift Detection", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3: Dynamic Compliance Benchmarking", strength: 3, weight: 3, vector: "Define Dynamic Compliance Standards" },
    { label: "Stage 2: Static Post-Launch Oversight", strength: 2, weight: 1, vector: "Instrument Persistent Oversight" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Deploy Continuous Monitoring" }
  ]},
  { id: 8, lens: "AVS", text: "What level of effort is required to maintain AI tools?", options: [
    { label: "Stage 4: Autonomous Maintenance Telemetry", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3: Strategic Lifecycle Optimization", strength: 3, weight: 3, vector: "Optimize Training Cycles" },
    { label: "Stage 2: Manual Correction Overhead", strength: 2, weight: 1, vector: "Automate Maintenance Telemetry" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Identify Stability Root Causes" }
  ]},
  { id: 9, lens: "IGF", text: "How are human corrections fed back into AI systems?", options: [
    { label: "Stage 4: Retraining Loop Automation", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3: Systematic Correction Refinement", strength: 3, weight: 3, vector: "Automate Training Loops" },
    { label: "Stage 2: Fragmented Feedback Ingestion", strength: 2, weight: 1, vector: "Formalize Correction Ingestion" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Establish Feedback Architecture" }
  ]},
  { id: 10, lens: "IGF", text: "How does leadership prioritize AI projects?", options: [
    { label: "Stage 4: Impact Telemetry Alignment", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3: Strategic Maturity Thresholds", strength: 3, weight: 3, vector: "Define Maturity Thresholds" },
    { label: "Stage 2: Technical Feature Prioritization", strength: 2, weight: 1, vector: "Manage Strategic Expectations" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Restore Strategic Alignment" }
  ]},
  { id: 11, lens: "IGF", text: "How does the organization prepare teams for AI deployments?", options: [
    { label: "Stage 4: Systematic Readiness Reporting", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3: Standardized Impact Benchmarking", strength: 3, weight: 3, vector: "Standardize Impact Reporting" },
    { label: "Stage 2: Tactical Change Readiness", strength: 2, weight: 1, vector: "Deploy Cultural Stabilization" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Synchronize Change Readiness" }
  ]},
  { id: 12, lens: "IGF", text: "How is the gap between expected and actual AI ROI measured?", options: [
    { label: "Stage 4: Automated Value Tracking", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3: Pilot ROI Benchmarking", strength: 3, weight: 3, vector: "Pilot ROI Benchmarks" },
    { label: "Stage 2: Speculative Impact Reporting", strength: 2, weight: 1, vector: "Pivot to Value Realization" },
    { label: "Stage 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Assign ROI Stewardship" }
  ]}
];

function LensIndicator({ acronym, isActive, isCompleted }: { acronym: string; isActive: boolean; isCompleted: boolean }) {
  return (
    <div className={`h-14 w-14 rounded-full flex items-center justify-center border-2 transition-all duration-700 
      ${isActive || isCompleted 
        ? "bg-[#0A1F33] border-[#00F2FF] shadow-[0_0_15px_rgba(0,242,255,0.4)]" 
        : "bg-slate-900 border-slate-800"}`}
    >
      {isCompleted ? (
        <span className="text-[#00F2FF] font-bold text-lg">✓</span>
      ) : (
        <span className={`text-[10px] font-bold ${isActive ? "text-[#00F2FF]" : "text-slate-600"}`}>
          {acronym}
        </span>
      )}
    </div>
  );
}

export default function PromiseGapDiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", confirmEmail: "", organization: "", role: "Executive" });
  
  const [zoneResults, setZoneResults] = useState<DiagnosticResults>({
    HAI: { max: 0, aggregate: 0, vectors: [] },
    AVS: { max: 0, aggregate: 0, vectors: [] },
    IGF: { max: 0, aggregate: 0, vectors: [] }
  });

  useEffect(() => {
    if (step === 0) {
      localStorage.removeItem('bmr_results_vault');
    }
  }, [step]);

  const currentQuestion = step > 0 && step <= 12 ? diagnosticQuestions[step - 1] : null;

  useEffect(() => {
    if (step === 13 && !isSubmitting) {
      const submitResults = async () => {
        setIsSubmitting(true);
        try {
          localStorage.setItem('bmr_results_vault', JSON.stringify({ 
            ...zoneResults, email: formData.email, role: formData.role, org: formData.organization 
          }));

          await fetch('/api/send-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              name: formData.name, email: formData.email, org: formData.organization, role: formData.role, 
              zoneData: zoneResults, bcc: 'hello@bmradvisory.co' 
            }),
          });
          router.push('/diagnostic/results'); 
        } catch (error) {
          console.error("Forensic dispatch failed", error);
          setIsSubmitting(false);
        }
      };
      submitResults();
    }
  }, [step, isSubmitting, formData, router, zoneResults]);

  const handleAnswer = (option: any) => {
    if (!currentQuestion) return;
    const dynamicWeight = calculatePillarPressure(option.weight, formData.role, currentQuestion.lens);

    setZoneResults((prev) => {
      const currentZone = prev[currentQuestion.lens as keyof DiagnosticResults];
      const updatedVectors = Array.from(new Set([...currentZone.vectors, option.vector]));
      return {
        ...prev,
        [currentQuestion.lens]: {
          max: Math.max(currentZone.max, option.strength),
          aggregate: currentZone.aggregate + dynamicWeight,
          vectors: updatedVectors
        }
      };
    });
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-center gap-8 mb-20">
          <LensIndicator acronym="HAI" isActive={step >= 1 && step <= 4} isCompleted={step > 4} />
          <LensIndicator acronym="AVS" isActive={step >= 5 && step <= 8} isCompleted={step > 8} />
          <LensIndicator acronym="IGF" isActive={step >= 9 && step <= 12} isCompleted={step > 12} />
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 backdrop-blur-sm shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight text-white underline decoration-[#00F2FF] underline-offset-8">Forensic Signal Diagnostic</h2>
                
                <div className="border-l-2 border-[#00F2FF] bg-[#0A1F33]/40 p-6 mb-8">
                  <h3 className="text-[#00F2FF] text-[10px] uppercase tracking-[4px] font-bold mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3" /> Audit Protocol
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed italic">
                    {`This diagnostic measures systemic maturity. In instances where a protocol is undefined, unobserved, or outside your current operational scope, select Stage 1 (Reactive). This ensures an accurate calibration of your organization's forensic baseline.`}
                  </p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); if (formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase()) return alert("Identity Mismatch."); setStep(1); }} className="space-y-6">
                  <input required placeholder="Full Name" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500 tracking-widest font-bold">Perspective Lens</label>
                    <select required className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white appearance-none cursor-pointer focus:border-[#00F2FF] outline-none" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                      <option value="Executive">Executive Perspective</option>
                      <option value="Manager">Manager Perspective</option>
                      <option value="Technical">Technical Perspective</option>
                    </select>
                    <p className="mt-2 text-[10px] italic text-[#00F2FF]/80">{lensDefinitions[formData.role]}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="email" placeholder="Work Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input required type="email" placeholder="Confirm Work Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none" value={formData.confirmEmail} onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} />
                  </div>
                  <input required placeholder="Organization" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                  <button type="submit" className="w-full bg-[#00F2FF] text-[#020617] font-black h-16 uppercase tracking-widest hover:bg-[#00d8e4] transition-all shadow-xl">Begin Observation</button>
                </form>
              </Card>
            </motion.div>
          )}

          {step > 0 && step <= 12 && currentQuestion && (
            <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center shadow-2xl backdrop-blur-sm">
                <span className="text-[#00F2FF] font-bold uppercase tracking-[0.4em] text-[10px]">
                  {perspectiveContexts[formData.role]} Signal {step} of 12 — {currentQuestion.lens} Zone
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-12 text-white italic uppercase leading-tight tracking-tighter">{currentQuestion.text}</h2>
                <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                  {currentQuestion.options.map((opt: any, idx: number) => (
                    <button key={idx} className="py-6 px-6 border border-slate-800 text-slate-300 uppercase tracking-widest text-[11px] font-bold hover:border-[#00F2FF] hover:bg-[#0A1F33]/50 transition-all text-left leading-relaxed active:bg-[#00F2FF]/10" onClick={() => handleAnswer(opt)}>{opt.label}</button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {step === 13 && (
            <motion.div key="dispatch" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center backdrop-blur-sm shadow-2xl">
                <Activity className="h-16 w-16 text-[#00F2FF] mx-auto mb-6 animate-pulse" />
                <h2 className="text-4xl font-black mb-4 text-white uppercase italic tracking-tighter">Forensic Topology Captured</h2>
                <p className="text-[#00F2FF] text-[10px] uppercase tracking-[0.3em] font-bold mb-10 animate-pulse italic text-center">Dispatching Maturity Benchmark to {formData.email}</p>
                <div className="flex justify-center"><Loader2 className="animate-spin h-10 w-10 text-[#00F2FF]" /></div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
