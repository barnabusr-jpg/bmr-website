import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Activity, Loader2 } from "lucide-react";

// --- PERSPECTIVE LENS CONTEXTS: Role-Based Question Framing ---
const perspectiveContexts: Record<string, string> = {
  "Executive": "Strategic Stewardship:",
  "Manager": "Operational Synchronization:",
  "Technical": "Forensic Reliability:"
};

const lensDefinitions: Record<string, string> = {
  "Executive": "Focus: Internal Governance (IGF). Strategic alignment and long-term ROI stability.",
  "Manager": "Focus: Adoption Value (AVS). Workflow synchronization and operational friction.",
  "Technical": "Focus: Trust Architecture (HAI). Forensic accuracy and system reliability."
};

const calculatePillarPressure = (weight: number, role: string, zone: string) => {
  const multipliers: Record<string, string> = {
    "Executive": "IGF", 
    "Technical": "HAI", 
    "Manager": "AVS"    
  };
  return multipliers[role] === zone ? weight * 1.5 : weight;
};

// --- CORE DIAGNOSTIC DATA ---
const diagnosticQuestions = [
  { id: 1, lens: "HAI", text: "How do teams handle verification of AI outputs before sharing them?", options: [
    { label: "Teams always manually verify outputs before sharing.", strength: 5, weight: 8, vector: "Calibrate Empirical Trust" },
    { label: "Teams manually verify high-risk outputs only.", strength: 5, weight: 8, vector: "Optimize Interface Utility" },
    { label: "Teams use automated checks for most outputs.", strength: 3, weight: 3, vector: "Standardize Trust Protocols" },
    { label: "Outputs are fully automated with no manual review.", strength: 2, weight: 1, vector: "Audit Compliance Overlays" },
    { label: "No verification process currently exists.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 2, lens: "HAI", text: "What is the process for identifying the cause of AI errors?", options: [
    { label: "Errors are not tracked; we fix and move on.", strength: 5, weight: 8, vector: "Instrument Error Logging" },
    { label: "We investigate ad-hoc without formal processes.", strength: 4, weight: 5, vector: "Formalize Forensic Retrospectives" },
    { label: "We document errors but lack tools to diagnose quickly.", strength: 3, weight: 3, vector: "Synchronize Change Management" },
    { label: "We automate error tracking but reviews are slow.", strength: 2, weight: 1, vector: "Automate Root-Cause Diagnosis" },
    { label: "Errors are diagnosed in hours via automated tools.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 3, lens: "HAI", text: "How do teams handle situations where AI tools may not be optimal?", options: [
    { label: "Teams always bypass AI for manual processes.", strength: 5, weight: 8, vector: "Neutralize Operational Friction" },
    { label: "Teams often bypass AI for edge cases.", strength: 4, weight: 5, vector: "Expand Algorithmic Scope" },
    { label: "Teams sometimes bypass AI due to training gaps.", strength: 3, weight: 3, vector: "Synchronize Change Management" },
    { label: "Teams rarely bypass AI (only for compliance).", strength: 2, weight: 1, vector: "Integrate Audit Workflows" },
    { label: "AI is never bypassed; tools are fully integrated.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 4, lens: "HAI", text: "How does the organization review AI risk appetite against performance?", options: [
    { label: "We don’t track performance for risk decisions.", strength: 5, weight: 8, vector: "Establish Risk Telemetry" },
    { label: "Risk appetite is updated only after major failures.", strength: 4, weight: 5, vector: "Implement Adaptive Risk Logic" },
    { label: "Risk reviews are scheduled but not data-driven.", strength: 3, weight: 3, vector: "Predictive Risk Modeling" },
    { label: "Risk appetite is reviewed quarterly with data.", strength: 2, weight: 1, vector: "Increase Review Frequency" },
    { label: "Risk models are dynamically updated with real-time data.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 5, lens: "AVS", text: "What is the standard process for pre-deployment risk reviews?", options: [
    { label: "No formal review is conducted.", strength: 5, weight: 8, vector: "Stabilize Deployment Guardrails" },
    { label: "Reviews are perceived as bottlenecks and skipped.", strength: 3, weight: 3, vector: "Streamline Governance Cycles" },
    { label: "Reviews are conducted but lack resources.", strength: 3, weight: 3, vector: "Augment Review Capacity" },
    { label: "Low-risk projects skip formal reviews.", strength: 2, weight: 1, vector: "Formalize Risk Tiering" },
    { label: "All projects undergo formal risk reviews.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 6, lens: "AVS", text: "How is responsibility assigned for AI failures?", options: [
    { label: "No designated owner exists.", strength: 5, weight: 8, vector: "Map Accountability Pathways" },
    { label: "Teams argue over ownership after failures.", strength: 4, weight: 5, vector: "Formalize Ownership Matrix" },
    { label: "Responsibility is assigned ad-hoc.", strength: 3, weight: 3, vector: "Standardize Escalation Paths" },
    { label: "Ownership is clear but notifications are slow.", strength: 2, weight: 1, vector: "Optimize Response Latency" },
    { label: "Designated leaders own fixes and are notified instantly.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 7, lens: "AVS", text: "How is AI compliance managed after deployment?", options: [
    { label: "Compliance is a one-time checkbox at launch.", strength: 5, weight: 8, vector: "Instrument Persistent Oversight" },
    { label: "We assume compliance is static post-launch.", strength: 4, weight: 5, vector: "Deploy Continuous Monitoring" },
    { label: "Ongoing monitoring is too resource-intensive.", strength: 3, weight: 3, vector: "Automate Compliance Telemetry" },
    { label: "We monitor only high-risk models.", strength: 2, weight: 1, vector: "Define Dynamic Compliance Standards" },
    { label: "Compliance is audited as a continuous requirement.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 8, lens: "AVS", text: "What level of effort is required to maintain AI tools?", options: [
    { label: "AI requires constant manual correction.", strength: 5, weight: 8, vector: "Identify Stability Root Causes" },
    { label: "We lack automated monitoring for maintenance.", strength: 4, weight: 5, vector: "Automate Maintenance Telemetry" },
    { label: "High manual overhead is expected in early stages.", strength: 3, weight: 3, vector: "Accelerate Maturity Roadmap" },
    { label: "Human effort is focused on training.", strength: 2, weight: 1, vector: "Optimize Training Cycles" },
    { label: "AI tools run autonomously with minimal intervention.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 9, lens: "IGF", text: "How are human corrections fed back into AI systems?", options: [
    { label: "No system exists for corrections.", strength: 5, weight: 8, vector: "Establish Feedback Architecture" },
    { label: "Corrections are not systematically tracked.", strength: 4, weight: 5, vector: "Close the Feedback Circuit" },
    { label: "Feedback is shared ad-hoc for critical errors.", strength: 3, weight: 3, vector: "Formalize Correction Ingestion" },
    { label: "Corrections are logged but reviewed infrequently.", strength: 2, weight: 1, vector: "Automate Training Loops" },
    { label: "Corrections are automatically incorporated.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 10, lens: "IGF", text: "How does leadership prioritize AI projects?", options: [
    { label: "Leadership focuses only on technical features.", strength: 5, weight: 8, vector: "Restore Strategic Alignment" },
    { label: "Leadership lacks visibility into human impact.", strength: 4, weight: 5, vector: "Restore Executive Visibility" },
    { label: "Stakeholders demand constant feature rollouts.", strength: 3, weight: 3, vector: "Manage Strategic Expectations" },
    { label: "We are in early adoption where features take priority.", strength: 2, weight: 1, vector: "Define Maturity Thresholds" },
    { label: "Leadership balances features and impact equally.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 11, lens: "IGF", text: "How does the organization prepare teams for AI deployments?", options: [
    { label: "Deployments are pushed faster than training allows.", strength: 5, weight: 8, vector: "Synchronize Change Readiness" },
    { label: "We lack proper training frameworks.", strength: 4, weight: 5, vector: "Deploy Cultural Stabilization" },
    { label: "The strategic impact was never communicated.", strength: 4, weight: 5, vector: "Standardize Impact Reporting" },
    { label: "Projects are deprioritized for higher-priority work.", strength: 2, weight: 1, vector: "Assess Resource Allocation" },
    { label: "Teams are fully trained and aligned.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 12, lens: "IGF", text: "How is the gap between expected and actual AI ROI measured?", options: [
    { label: "No one tracks AI value realization.", strength: 5, weight: 8, vector: "Assign ROI Stewardship" },
    { label: "We lack tools to measure impact.", strength: 4, weight: 5, vector: "Instrument the Promise Gap™" },
    { label: "Our focus is on innovation scale, not ROI.", strength: 4, weight: 5, vector: "Pivot to Value Realization" },
    { label: "We are still piloting benchmarks for ROI measurement.", strength: 2, weight: 1, vector: "Pilot ROI Benchmarks" },
    { label: "We formally measure ROI against expectations.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]}
];

// --- COMPONENTS ---
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
  
  const [zoneResults, setZoneResults] = useState<any>({
    HAI: { max: 0, aggregate: 0, vectors: [] },
    AVS: { max: 0, aggregate: 0, vectors: [] },
    IGF: { max: 0, aggregate: 0, vectors: [] }
  });

  const currentQuestion = step > 0 && step <= 12 ? diagnosticQuestions[step - 1] : null;

  useEffect(() => {
    if (step === 13 && !isSubmitting) {
      const submitResults = async () => {
        setIsSubmitting(true);
        try {
          localStorage.setItem('bmr_results_vault', JSON.stringify({ ...zoneResults, email: formData.email, role: formData.role }));
          await fetch('/api/send-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              name: formData.name, email: formData.email, org: formData.organization, 
              role: formData.role, zoneData: zoneResults, bcc: 'hello@bmradvisory.co' 
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

    setZoneResults((prev: any) => ({
      ...prev,
      [currentQuestion.lens]: {
        max: Math.max(prev[currentQuestion.lens].max, option.strength),
        aggregate: prev[currentQuestion.lens].aggregate + dynamicWeight,
        vectors: [...prev[currentQuestion.lens].vectors, option.vector]
      }
    }));
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
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
                <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight text-white underline decoration-cyan-500 underline-offset-8">Systemic Observation</h2>
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    if (formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase()) {
                      return alert("Identity Mismatch: Work Email and Confirmation must match.");
                    }
                    setStep(1); 
                  }} 
                  className="space-y-6"
                >
                  <input required placeholder="Full Name" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <div className="space-y-1 relative">
                    <label className="text-[10px] uppercase text-slate-500 tracking-widest ml-1 font-bold">Perspective Lens</label>
                    <select required className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white appearance-none cursor-pointer focus:border-[#00F2FF] outline-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300F2FF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                      value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="Executive">Executive Perspective</option>
                      <option value="Manager">Manager Perspective</option>
                      <option value="Technical">Technical Perspective</option>
                    </select>
                    <p className="mt-2 text-[10px] italic text-[#00F2FF]/80 ml-1">{lensDefinitions[formData.role]}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="email" placeholder="Work Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input required type="email" placeholder="Confirm Work Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none" value={formData.confirmEmail} onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})} />
                  </div>
                  <input required placeholder="Organization" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                  <button type="submit" className="w-full bg-[#00F2FF] text-[#020617] font-bold h-16 uppercase tracking-widest hover:bg-[#00d8e4] transition-all">Begin Observation</button>
                </form>
              </Card>
            </motion.div>
          )}

          {step > 0 && step <= 12 && currentQuestion && (
            <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center shadow-2xl backdrop-blur-sm">
                {/* DYNAMIC ROLE-BASED CONTEXT HEADER */}
                <span className="text-[#00F2FF] font-bold uppercase tracking-[0.4em] text-[10px]">
                  {perspectiveContexts[formData.role]} Signal {step} of 12 — {currentQuestion.lens} Zone
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-12 text-white italic uppercase leading-tight">{currentQuestion.text}</h2>
                <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                  {currentQuestion.options.map((opt: any, idx: number) => (
                    <button key={idx} className="py-6 px-6 border border-slate-800 text-slate-300 uppercase tracking-widest text-xs hover:border-[#00F2FF] hover:bg-[#0A1F33]/50 transition-all text-left leading-relaxed active:bg-[#00F2FF]/10" onClick={() => handleAnswer(opt)}>{opt.label}</button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {step === 13 && (
            <motion.div key="dispatch" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center backdrop-blur-sm shadow-2xl">
                <Activity className="h-16 w-16 text-[#00F2FF] mx-auto mb-6 animate-pulse" />
                <h2 className="text-4xl font-bold mb-4 text-white uppercase italic tracking-tighter">Signals Captured</h2>
                <p className="text-[#00F2FF] text-[10px] uppercase tracking-[0.3em] font-bold mb-10 animate-pulse italic">Dispatching role-aware report to {formData.email}</p>
                <div className="flex justify-center"><Loader2 className="animate-spin h-10 w-10 text-[#00F2FF]" /></div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
