import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Activity, Loader2 } from "lucide-react";

// --- FORENSIC DATA CONTROLLER ---
const diagnosticQuestions = [
  { 
    id: 1, lens: "HAI", 
    text: "Why do frontline teams manually verify AI outputs before sharing them with stakeholders?", 
    options: [
      { label: "AI is unreliable and requires constant oversight.", strength: 5, weight: 8, vector: "Calibrate Empirical Trust" },
      { label: "Manual verification is faster than fixing the AI system.", strength: 5, weight: 8, vector: "Optimize Interface Utility" },
      { label: "We lack clear guidelines on when to trust the AI.", strength: 3, weight: 3, vector: "Standardize Trust Protocols" },
      { label: "Manual verification is an industry compliance requirement.", strength: 2, weight: 1, vector: "Audit Compliance Overlays" },
      { label: "We don’t manually verify—the AI is fully trusted.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 2, lens: "HAI", 
    text: "When an AI error occurs, why does it often take days to identify the cause?", 
    options: [
      { label: "We don't track errors; we just fix them and move on.", strength: 5, weight: 8, vector: "Instrument Error Logging" },
      { label: "We rely on ad-hoc investigations rather than formal processes.", strength: 4, weight: 5, vector: "Formalize Forensic Retrospectives" },
      { label: "Our team lacks the training to diagnose algorithmic errors.", strength: 3, weight: 3, vector: "Synchronize Change Management" },
      { label: "Diagnosis is slowed by a lack of automated tracking tools.", strength: 2, weight: 1, vector: "Automate Root-Cause Diagnosis" },
      { label: "Errors are diagnosed in hours via automated tracking.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 3, lens: "HAI", 
    text: "Why do teams sometimes bypass the AI and use manual processes instead?", 
    options: [
      { label: "The AI is slower or less reliable than manual work.", strength: 5, weight: 8, vector: "Neutralize Operational Friction" },
      { label: "The AI doesn’t handle edge cases effectively.", strength: 4, weight: 5, vector: "Expand Algorithmic Scope" },
      { label: "Teams aren’t trained to use the AI effectively.", strength: 3, weight: 3, vector: "Synchronize Change Management" },
      { label: "Manual work is required for compliance or audits.", strength: 2, weight: 1, vector: "Integrate Audit Workflows" },
      { label: "The AI is fully trusted and never bypassed.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 4, lens: "HAI", 
    text: "Why does the organization maintain a static risk appetite despite AI performance changes?", 
    options: [
      { label: "We don’t track AI performance for risk decisions.", strength: 5, weight: 8, vector: "Establish Risk Telemetry" },
      { label: "Our governance structure is not built for dynamic updates.", strength: 4, weight: 5, vector: "Implement Adaptive Risk Logic" },
      { label: "We only adjust risk appetite after a major failure occurs.", strength: 3, weight: 3, vector: "Predictive Risk Modeling" },
      { label: "Risk reviews are scheduled but not tied to real-time data.", strength: 2, weight: 1, vector: "Increase Review Frequency" },
      { label: "Risk models are dynamically updated via AI performance data.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 5, lens: "AVS", 
    text: "Why are AI projects sometimes launched without a formal risk review?", 
    options: [
      { label: "We prioritize deployment speed over structural stability.", strength: 5, weight: 8, vector: "Stabilize Deployment Guardrails" },
      { label: "Risk reviews are perceived as bureaucratic bottlenecks.", strength: 3, weight: 3, vector: "Streamline Governance Cycles" },
      { label: "We lack the internal resources to conduct thorough reviews.", strength: 3, weight: 3, vector: "Augment Review Capacity" },
      { label: "We assume low-risk projects do not require formal review.", strength: 2, weight: 1, vector: "Formalize Risk Tiering" },
      { label: "We never bypass formal risk reviews.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 6, lens: "AVS", 
    text: "When an AI failure occurs, why is responsibility often unclear?", 
    options: [
      { label: "No designated leader is held accountable for AI outcomes.", strength: 5, weight: 8, vector: "Map Accountability Pathways" },
      { label: "Teams often argue over which department 'owns' the fix.", strength: 4, weight: 5, vector: "Formalize Ownership Matrix" },
      { label: "Responsibility is assigned ad-hoc after the failure occurs.", strength: 3, weight: 3, vector: "Standardize Escalation Paths" },
      { label: "Ownership is clear, but the notification process is slow.", strength: 2, weight: 1, vector: "Optimize Response Latency" },
      { label: "Designated leaders own the fix and are notified instantly.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 7, lens: "AVS", 
    text: "Why is compliance treated as a one-time 'checkbox' at launch?", 
    options: [
      { label: "Leadership prioritizes deployment speed over ongoing audits.", strength: 5, weight: 8, vector: "Instrument Persistent Oversight" },
      { label: "We assume compliance remains static once the model is live.", strength: 4, weight: 5, vector: "Deploy Continuous Monitoring" },
      { label: "Ongoing compliance monitoring is too resource-intensive.", strength: 3, weight: 3, vector: "Automate Compliance Telemetry" },
      { label: "We only conduct continuous compliance for 'high-risk' models.", strength: 2, weight: 1, vector: "Define Dynamic Compliance Standards" },
      { label: "Compliance is audited as a continuous requirement.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 8, lens: "AVS", 
    text: "Why does it take significant human effort to keep AI tools running?", 
    options: [
      { label: "The AI requires constant manual correction of outputs.", strength: 5, weight: 8, vector: "Identify Stability Root Causes" },
      { label: "We lack automated monitoring for model maintenance.", strength: 4, weight: 5, vector: "Automate Maintenance Telemetry" },
      { label: "The AI is in an early stage where high manual overhead is expected.", strength: 3, weight: 3, vector: "Accelerate Maturity Roadmap" },
      { label: "Human hours are focused on training rather than maintenance.", strength: 2, weight: 1, vector: "Optimize Training Cycles" },
      { label: "AI tools run autonomously with minimal human intervention.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 9, lens: "IGF", 
    text: "Why are human corrections rarely fed back into the AI model?", 
    options: [
      { label: "We do not have a system for making model corrections.", strength: 5, weight: 8, vector: "Establish Feedback Architecture" },
      { label: "Human corrections are not systematically tracked or logged.", strength: 4, weight: 5, vector: "Close the Feedback Circuit" },
      { label: "Feedback is only shared ad-hoc for critical errors.", strength: 3, weight: 3, vector: "Formalize Correction Ingestion" },
      { label: "Corrections are logged manually but reviewed infrequently.", strength: 2, weight: 1, vector: "Automate Training Loops" },
      { label: "Corrections are automatically incorporated into the model.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 10, lens: "IGF", 
    text: "Why does leadership focus on 'features' rather than human 'impact'?", 
    options: [
      { label: "Innovation and speed are prioritized over operational ROI.", strength: 5, weight: 8, vector: "Restore Strategic Alignment" },
      { label: "Leadership lacks clear visibility into frontline human impact.", strength: 4, weight: 5, vector: "Restore Executive Visibility" },
      { label: "Stakeholder pressure demands constant feature rollout.", strength: 3, weight: 3, vector: "Manage Strategic Expectations" },
      { label: "We are in an early adoption stage where features take priority.", strength: 2, weight: 1, vector: "Define Maturity Thresholds" },
      { label: "Leadership balances technical features and human impact equally.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 11, lens: "IGF", 
    text: "Why are AI projects paused because teams aren't ready for change?", 
    options: [
      { label: "Leadership pushes deployments faster than change management allows.", strength: 5, weight: 8, vector: "Synchronize Change Readiness" },
      { label: "The organization lacks proper AI training frameworks.", strength: 4, weight: 5, vector: "Deploy Cultural Stabilization" },
      { label: "The strategic impact of AI was never clearly communicated.", strength: 4, weight: 5, vector: "Standardize Impact Reporting" },
      { label: "Projects are deprioritized in favor of higher-priority work.", strength: 2, weight: 1, vector: "Assess Resource Allocation" },
      { label: "Teams are fully trained and aligned for every deployment.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  },
  { 
    id: 12, lens: "IGF", 
    text: "Why isn't the 'Promise Gap' (expected vs. actual ROI) measured?", 
    options: [
      { label: "No specific leader is assigned to track AI value realization.", strength: 5, weight: 8, vector: "Assign ROI Stewardship" },
      { label: "We lack the internal tools to measure actual business impact.", strength: 4, weight: 5, vector: "Instrument the Promise Gap™" },
      { label: "Our focus is on innovation scale, not immediate ROI metrics.", strength: 4, weight: 5, vector: "Pivot to Value Realization" },
      { label: "We are still piloting benchmarks for ROI measurement.", strength: 2, weight: 1, vector: "Pilot ROI Benchmarks" },
      { label: "We formally measure ROI against initial expectations.", strength: 1, weight: 0, vector: "Maintain Baseline" }
    ]
  }
];

// --- VISUAL INDICATOR COMPONENT ---
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
  const [formData, setFormData] = useState({ name: "", email: "", organization: "" });
  
  // --- FORENSIC STATE STORAGE ---
  const [zoneResults, setZoneResults] = useState<Record<string, { max: number; aggregate: number; vectors: string[] }>>({
    HAI: { max: 0, aggregate: 0, vectors: [] },
    AVS: { max: 0, aggregate: 0, vectors: [] },
    IGF: { max: 0, aggregate: 0, vectors: [] }
  });

  // --- SUBMISSION DISPATCH ---
  useEffect(() => {
    if (step === 13 && !isSubmitting) {
      const submitResults = async () => {
        setIsSubmitting(true);
        try {
          // Store raw forensic data for results page
          localStorage.setItem('bmr_results_vault', JSON.stringify(zoneResults));
          
          const response = await fetch('/api/send-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              name: formData.name, 
              email: formData.email, 
              org: formData.organization, 
              zoneData: zoneResults 
            }),
          });
          
          if (response.ok) { 
            router.push('/diagnostic/results'); 
          }
        } catch (error) {
          console.error("Forensic dispatch failed", error);
          setIsSubmitting(false);
        }
      };
      submitResults();
    }
  }, [step, isSubmitting, formData, router, zoneResults]);

  // --- ANCHOR LOGIC HANDLER ---
  const handleAnswer = (option: { strength: number; weight: number; vector: string }) => {
    const currentLens = diagnosticQuestions[step - 1].lens;
    
    setZoneResults(prev => ({
      ...prev,
      [currentLens]: {
        max: Math.max(prev[currentLens].max, option.strength), // Capture intensity peak
        aggregate: prev[currentLens].aggregate + option.weight, // Track volume
        vectors: [...prev[currentLens].vectors, option.vector] // Map roadmap targets
      }
    }));
    
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 selection:bg-[#00F2FF]/30">
      <div className="max-w-4xl mx-auto py-12">
        {/* PROGRESS BRIDGE */}
        <div className="flex justify-center gap-8 mb-20">
          <LensIndicator acronym="HAI" isActive={step >= 1 && step <= 4} isCompleted={step > 4} />
          <LensIndicator acronym="AVS" isActive={step >= 5 && step <= 8} isCompleted={step > 8} />
          <LensIndicator acronym="IGF" isActive={step >= 9 && step <= 12} isCompleted={step > 12} />
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 0: INTAKE */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight text-white">Systemic Observation</h2>
                <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-6">
                  <input required placeholder="Full Name" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input required type="email" placeholder="Work Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <input required placeholder="Organization" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00F2FF] outline-none transition-colors" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                  <button type="submit" className="w-full bg-[#00F2FF] text-[#020617] font-bold h-16 uppercase tracking-widest hover:bg-[#00d8e4] transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)]">Begin Observation</button>
                </form>
              </Card>
            </motion.div>
          )}

          {/* STEPS 1-12: TRIAGE */}
          {step > 0 && step <= 12 && (
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center shadow-2xl backdrop-blur-sm">
                <span className="text-[#00F2FF] font-bold uppercase tracking-[0.4em] text-[10px] glow-sm">
                  Pressure Signal {step} of 12
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-12 text-white italic uppercase leading-tight">
                  {diagnosticQuestions[step - 1].text}
                </h2>
                <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                  {diagnosticQuestions[step - 1].options.map((opt, idx) => (
                    <button 
                      key={idx} 
                      className="py-6 px-6 border border-slate-800 text-slate-300 uppercase tracking-widest text-xs 
                        hover:border-[#00F2FF] hover:bg-[#0A1F33]/50 transition-all duration-300 text-left leading-relaxed
                        active:bg-[#00F2FF]/10 focus:outline-none" 
                      onClick={() => handleAnswer(opt)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* STEP 13: PROCESSING */}
          {step === 13 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center backdrop-blur-sm">
                <Activity className="h-16 w-16 text-[#00F2FF] mx-auto mb-6 animate-pulse" />
                <h2 className="text-4xl font-bold mb-4 text-white uppercase italic tracking-tighter">Signals Captured</h2>
                <p className="text-slate-400 uppercase tracking-widest text-xs mb-10">Constructing Forensic Topology...</p>
                <div className="flex justify-center"><Loader2 className="animate-spin h-10 w-10 text-[#00F2FF]" /></div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
