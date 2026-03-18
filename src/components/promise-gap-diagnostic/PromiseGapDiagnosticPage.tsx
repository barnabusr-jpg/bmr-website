import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

const lensDefinitions: Record<string, string> = {
  "Executive": "Focus: Strategic alignment, enterprise risk stewardship, and long-term ROI stability.",
  "Manager": "Focus: Operational workflow synchronization, adoption friction, and team output.",
  "Technical": "Focus: System reliability, architectural integrity, and forensic data accuracy."
};

const diagnosticQuestions = [
  { id: 1, lens: "HAI", text: "How do teams handle verification of AI outputs before sharing them?", options: [
    { label: "Level 4: Forensic Assurance (Optimized)", strength: 5, weight: 8, vector: "Verification Reliability" },
    { label: "Level 3: Protocolized Verification", strength: 3, weight: 3, vector: "Standardized Checkpoints" },
    { label: "Level 2: Ad-Hoc / Fragmented Cycles", strength: 2, weight: 1, vector: "Manual Validation" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Baseline Stabilization" }
  ]},
  { id: 2, lens: "HAI", text: "What is the process for identifying the cause of AI errors?", options: [
    { label: "Level 4: Real-Time Root-Cause Telemetry", strength: 5, weight: 8, vector: "Error Resolution" },
    { label: "Level 3: Formalized Forensic Retrospectives", strength: 3, weight: 3, vector: "Diagnostic Protocols" },
    { label: "Level 2: Tactical Incident Investigation", strength: 2, weight: 1, vector: "Reactive Troubleshooting" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Forensic Setup" }
  ]},
  { id: 3, lens: "HAI", text: "How do teams handle situations where AI tools may not be optimal?", options: [
    { label: "Level 4: Dynamic Edge-Case Optimization", strength: 5, weight: 8, vector: "Edge-Case Management" },
    { label: "Level 3: Integrated Exception Workflows", strength: 3, weight: 3, vector: "Workflow Guardrails" },
    { label: "Level 2: Manual Tool Bypassing", strength: 2, weight: 1, vector: "Tactical Overrides" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Operational Resilience" }
  ]},
  { id: 4, lens: "HAI", text: "How does the organization review AI risk appetite against performance?", options: [
    { label: "Level 4: Predictive Risk Modeling", strength: 5, weight: 8, vector: "Risk Stewardship" },
    { label: "Level 3: Data-Driven Performance Benchmarking", strength: 3, weight: 3, vector: "Impact Benchmarks" },
    { label: "Level 2: Qualitative Risk Assessment", strength: 2, weight: 1, vector: "Perceived Reliability" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Risk Calibration" }
  ]},
  { id: 5, lens: "AVS", text: "What is the standard process for pre-deployment risk reviews?", options: [
    { label: "Level 4: Automated Deployment Guardrails", strength: 5, weight: 8, vector: "Deployment Integrity" },
    { label: "Level 3: Formalized Risk Tiering", strength: 3, weight: 3, vector: "Review Capacity" },
    { label: "Level 2: Fragmented Review Capacity", strength: 2, weight: 1, vector: "Deployment Speed" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Launch Stabilization" }
  ]},
  { id: 6, lens: "AVS", text: "How is responsibility assigned for AI failures?", options: [
    { label: "Level 4: Persistent Accountability Telemetry", strength: 5, weight: 8, vector: "Ownership Clarity" },
    { label: "Level 3: Optimized Response Pathways", strength: 3, weight: 3, vector: "Incident Response" },
    { label: "Level 2: Fragmented Ownership Matrix", strength: 2, weight: 1, vector: "Assigned Stewardship" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Accountability Mapping" }
  ]},
  { id: 7, lens: "AVS", text: "How is AI compliance managed after deployment?", options: [
    { label: "Level 4: Continuous Drift Detection", strength: 5, weight: 8, vector: "Drift Management" },
    { label: "Level 3: Dynamic Compliance Benchmarking", strength: 3, weight: 3, vector: "Compliance Sync" },
    { label: "Level 2: Static Post-Launch Oversight", strength: 2, weight: 1, vector: "Oversight Latency" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Post-Launch Monitoring" }
  ]},
  { id: 8, lens: "AVS", text: "What level of effort is required to maintain AI tools?", options: [
    { label: "Level 4: Autonomous Maintenance Telemetry", strength: 5, weight: 8, vector: "Maintenance Overhead" },
    { label: "Level 3: Strategic Lifecycle Optimization", strength: 3, weight: 3, vector: "Lifecycle Strategy" },
    { label: "Level 2: Manual Correction Overhead", strength: 2, weight: 1, vector: "Operational Drag" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "System Stability" }
  ]},
  { id: 9, lens: "IGF", text: "How are human corrections fed back into AI systems?", options: [
    { label: "Level 4: Retraining Loop Automation", strength: 5, weight: 8, vector: "Intelligence Ingestion" },
    { label: "Level 3: Systematic Correction Refinement", strength: 3, weight: 3, vector: "Loop Optimization" },
    { label: "Level 2: Fragmented Feedback Ingestion", strength: 2, weight: 1, vector: "Feedback Loops" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Training Architecture" }
  ]},
  { id: 10, lens: "IGF", text: "How does leadership prioritize AI projects?", options: [
    { label: "Level 4: Impact Telemetry Alignment", strength: 5, weight: 8, vector: "Strategic Prioritization" },
    { label: "Level 3: Strategic Maturity Thresholds", strength: 3, weight: 3, vector: "Value Thresholds" },
    { label: "Level 2: Technical Feature Prioritization", strength: 2, weight: 1, vector: "Execution Focus" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Vision Synchronization" }
  ]},
  { id: 11, lens: "IGF", text: "How does the organization prepare teams for AI deployments?", options: [
    { label: "Level 4: Systematic Readiness Reporting", strength: 5, weight: 8, vector: "Change Readiness" },
    { label: "Level 3: Standardized Impact Benchmarking", strength: 3, weight: 3, vector: "Team Stabilization" },
    { label: "Level 2: Tactical Change Readiness", strength: 2, weight: 1, vector: "Adoption Support" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Cultural Readiness" }
  ]},
  { id: 12, lens: "IGF", text: "How is the gap between expected and actual AI ROI measured?", options: [
    { label: "Level 4: Automated Value Tracking", strength: 5, weight: 8, vector: "Value Realization" },
    { label: "Level 3: Pilot ROI Benchmarking", strength: 3, weight: 3, vector: "Economic Impact" },
    { label: "Level 2: Speculative Impact Reporting", strength: 2, weight: 1, vector: "ROI Reporting" },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0, vector: "Economic Stewardship" }
  ]}
];

export default function PromiseGapDiagnosticPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', org: '', role: 'Executive' });

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
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
                    {`This diagnostic measures systemic maturity. Select Level 1 if a protocol is reactive or undefined.`}
                  </p>
                </div>
                <form onSubmit={handleStart} className="space-y-6">
                  <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" 
                         placeholder="Full Name" required 
                         onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <div className="space-y-1">
                    <select className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" 
                            value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                      <option value="Executive">Executive Perspective</option>
                      <option value="Manager">Manager Perspective</option>
                      <option value="Technical">Technical Perspective</option>
                    </select>
                    <p className="mt-2 text-[10px] italic text-[#00F2FF]/80">{lensDefinitions[formData.role]}</p>
                  </div>
                  <button type="submit" className="w-full py-6 bg-[#00F2FF] text-[#020617] font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">
                    Begin Observation
                  </button>
                </form>
              </Card>
            </motion.div>
          )}

          {step > 0 && step <= 12 && (
             <motion.div key={step} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <Card className="p-12 bg-slate-900/30 border-slate-800 text-center">
                  <span className="text-[#00F2FF] font-bold uppercase tracking-[0.4em] text-[10px]">Signal {step} of 12</span>
                  <h2 className="text-2xl font-bold mt-10 mb-12 italic uppercase tracking-tighter">
                    {diagnosticQuestions[step - 1].text}
                  </h2>
                  <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                    {diagnosticQuestions[step - 1].options.map((opt, idx) => (
                      <button key={idx} onClick={() => setStep(step + 1)} 
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
