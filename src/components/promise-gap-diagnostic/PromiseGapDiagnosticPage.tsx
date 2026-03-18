import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Loader2, ShieldCheck } from "lucide-react";

interface ZoneData { max: number; aggregate: number; vectors: string[]; }
interface DiagnosticResults { HAI: ZoneData; AVS: ZoneData; IGF: ZoneData; }

const calculatePillarPressure = (weight: number, role: string, zone: string) => {
  const multipliers: Record<string, string> = { "Executive": "IGF", "Technical": "HAI", "Manager": "AVS" };
  return multipliers[role] === zone ? weight * 1.2 : weight;
};

const diagnosticQuestions = [
  { id: 1, lens: "HAI", text: "How do teams handle verification of AI outputs before sharing them?", options: [
    { label: "Stage 4 (Optimized): Automated validation protocols + systematic forensic audits.", strength: 5, weight: 8, vector: "Calibrate Empirical Trust" },
    { label: "Stage 3 (Integrated): Documented workflow for manual/human-in-the-loop verification.", strength: 3, weight: 4, vector: "Standardize Trust Protocols" },
    { label: "Stage 2 (Emerging): Ad-hoc verification by individual team members without formal standards.", strength: 2, weight: 2, vector: "Optimize Interface Utility" },
    { label: "Stage 1 (Reactive): No verification process exists.", strength: 1, weight: 0, vector: "Maintain Baseline" }
  ]},
  { id: 2, lens: "HAI", text: "What is the process for identifying the cause of AI errors?", options: [
    { label: "Stage 4 (Optimized): Errors diagnosed in real-time via automated root-cause telemetry.", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3 (Integrated): Formalized error tracking and documented forensic retrospectives.", strength: 3, weight: 4, vector: "Automate Root-Cause Diagnosis" },
    { label: "Stage 2 (Emerging): Ad-hoc investigation without formal processes.", strength: 2, weight: 2, vector: "Formalize Forensic Retrospectives" },
    { label: "Stage 1 (Reactive): Errors are not tracked.", strength: 1, weight: 0, vector: "Instrument Error Logging" }
  ]},
  { id: 3, lens: "HAI", text: "How do teams handle situations where AI tools may not be optimal?", options: [
    { label: "Stage 4 (Optimized): AI is fully integrated; tools are dynamically optimized for edge cases.", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3 (Integrated): Teams rarely bypass AI, utilizing integrated audit workflows.", strength: 3, weight: 4, vector: "Integrate Audit Workflows" },
    { label: "Stage 2 (Emerging): Teams often bypass AI for edge cases due to perceived tool gaps.", strength: 2, weight: 2, vector: "Expand Algorithmic Scope" },
    { label: "Stage 1 (Reactive): Teams always bypass AI for manual processes.", strength: 1, weight: 0, vector: "Neutralize Operational Friction" }
  ]},
  { id: 4, lens: "HAI", text: "How does the organization review AI risk appetite against performance?", options: [
    { label: "Stage 4 (Optimized): Risk models are dynamically updated via real-time performance data.", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3 (Integrated): Risk appetite is reviewed quarterly using verified benchmarks.", strength: 3, weight: 4, vector: "Increase Review Frequency" },
    { label: "Stage 2 (Emerging): Risk reviews are scheduled but rely on qualitative logic.", strength: 2, weight: 2, vector: "Predictive Risk Modeling" },
    { label: "Stage 1 (Reactive): No tracking for risk decisions.", strength: 1, weight: 0, vector: "Establish Risk Telemetry" }
  ]},
  { id: 5, lens: "AVS", text: "What is the standard process for pre-deployment risk reviews?", options: [
    { label: "Stage 4 (Optimized): Automated deployment guardrails and mandatory formal risk reviews.", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3 (Integrated): Formalized risk tiering; all high-risk projects undergo review.", strength: 3, weight: 4, vector: "Formalize Risk Tiering" },
    { label: "Stage 2 (Emerging): Reviews are conducted but seen as bottlenecks.", strength: 2, weight: 2, vector: "Augment Review Capacity" },
    { label: "Stage 1 (Reactive): No formal review is conducted.", strength: 1, weight: 0, vector: "Stabilize Deployment Guardrails" }
  ]},
  { id: 6, lens: "AVS", text: "How is responsibility assigned for AI failures?", options: [
    { label: "Stage 4 (Optimized): Clear ownership matrix with instant, automated failure notifications.", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3 (Integrated): Ownership is clear; designated leaders manage standardized escalation.", strength: 3, weight: 4, vector: "Optimize Response Latency" },
    { label: "Stage 2 (Emerging): Responsibility is assigned ad-hoc.", strength: 2, weight: 2, vector: "Formalize Ownership Matrix" },
    { label: "Stage 1 (Reactive): No designated owner exists.", strength: 1, weight: 0, vector: "Map Accountability Pathways" }
  ]},
  { id: 7, lens: "AVS", text: "How is AI compliance managed after deployment?", options: [
    { label: "Stage 4 (Optimized): Compliance managed via persistent, automated oversight and drift detection.", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3 (Integrated): Ongoing monitoring for high-risk models with dynamic compliance.", strength: 3, weight: 4, vector: "Define Dynamic Compliance Standards" },
    { label: "Stage 2 (Emerging): Compliance is a one-time launch checkbox.", strength: 2, weight: 2, vector: "Instrument Persistent Oversight" },
    { label: "Stage 1 (Reactive): No post-launch oversight exists.", strength: 1, weight: 0, vector: "Deploy Continuous Monitoring" }
  ]},
  { id: 8, lens: "AVS", text: "What level of effort is required to maintain AI tools?", options: [
    { label: "Stage 4 (Optimized): AI tools run autonomously with automated maintenance telemetry.", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3 (Integrated): Effort is focused on training and strategic cycles vs. manual fixes.", strength: 3, weight: 4, vector: "Optimize Training Cycles" },
    { label: "Stage 2 (Emerging): High manual overhead or constant monitoring required.", strength: 2, weight: 2, vector: "Automate Maintenance Telemetry" },
    { label: "Stage 1 (Reactive): AI requires constant manual correction.", strength: 1, weight: 0, vector: "Identify Stability Root Causes" }
  ]},
  { id: 9, lens: "IGF", text: "How are human corrections fed back into AI systems?", options: [
    { label: "Stage 4 (Optimized): Corrections are automatically ingested into validated retraining loops.", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3 (Integrated): Corrections are logged and reviewed systematically for refinement.", strength: 3, weight: 4, vector: "Automate Training Loops" },
    { label: "Stage 2 (Emerging): Feedback is shared ad-hoc for critical errors.", strength: 2, weight: 2, vector: "Formalize Correction Ingestion" },
    { label: "Stage 1 (Reactive): No system exists for corrections.", strength: 1, weight: 0, vector: "Establish Feedback Architecture" }
  ]},
  { id: 10, lens: "IGF", text: "How does leadership prioritize AI projects?", options: [
    { label: "Stage 4 (Optimized): Real-time impact telemetry informs all strategic prioritization.", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3 (Integrated): Leadership balances technical features with maturity and human impact.", strength: 3, weight: 4, vector: "Define Maturity Thresholds" },
    { label: "Stage 2 (Emerging): Focus remains on technical features or innovation scale.", strength: 2, weight: 2, vector: "Manage Strategic Expectations" },
    { label: "Stage 1 (Reactive): Priority is ad-hoc or lacks executive visibility.", strength: 1, weight: 0, vector: "Restore Strategic Alignment" }
  ]},
  { id: 11, lens: "IGF", text: "How does the organization prepare teams for AI deployments?", options: [
    { label: "Stage 4 (Optimized): Systematic readiness training aligned with impact reporting.", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3 (Integrated): Teams are trained using formal frameworks and communicated impacts.", strength: 3, weight: 4, vector: "Standardize Impact Reporting" },
    { label: "Stage 2 (Emerging): Deployments often push faster than cultural stability allows.", strength: 2, weight: 2, vector: "Deploy Cultural Stabilization" },
    { label: "Stage 1 (Reactive): No formal training frameworks exist.", strength: 1, weight: 0, vector: "Synchronize Change Readiness" }
  ]},
  { id: 12, lens: "IGF", text: "How is the gap between expected and actual AI ROI measured?", options: [
    { label: "Stage 4 (Optimized): AI ROI is measured via automated value-realization tracking vs. KPIs.", strength: 5, weight: 8, vector: "Maintain Baseline" },
    { label: "Stage 3 (Integrated): ROI is formally measured against expectations using pilot benchmarks.", strength: 3, weight: 4, vector: "Pilot ROI Benchmarks" },
    { label: "Stage 2 (Emerging): Lack of tools or benchmarks to measure real impact.", strength: 2, weight: 2, vector: "Pivot to Value Realization" },
    { label: "Stage 1 (Reactive): No tracking of AI value realization.", strength: 1, weight: 0, vector: "Assign ROI Stewardship" }
  ]}
];

function LensIndicator({ acronym, isActive, isCompleted }: { acronym: string; isActive: boolean; isCompleted: boolean }) {
  return (
    <div className={`h-14 w-14 rounded-full flex items-center justify-center border-2 transition-all duration-700 
      ${isActive || isCompleted ? "bg-[#0A1F33] border-[#00F2FF] shadow-[0_0_15px_rgba(0,242,255,0.4)]" : "bg-slate-900 border-slate-800"}`}
    >
      {isCompleted ? <span className="text-[#00F2FF] font-bold text-lg">✓</span> : <span className={`text-[10px] font-bold ${isActive ? "text-[#00F2FF]" : "text-slate-600"}`}>{acronym}</span>}
    </div>
  );
}

export default function PromiseGapDiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", confirmEmail: "", organization: "", role: "Executive" });
  const [zoneResults, setZoneResults] = useState<DiagnosticResults>({
    HAI: { max: 0, aggregate: 0, vectors: [] }, AVS: { max: 0, aggregate: 0, vectors: [] }, IGF: { max: 0, aggregate: 0, vectors: [] }
  });

  const currentQuestion = step > 0 && step <= 12 ? diagnosticQuestions[step - 1] : null;

  useEffect(() => {
    if (step === 13 && !isSubmitting) {
      const submit = async () => {
        setIsSubmitting(true);
        localStorage.setItem('bmr_results_vault', JSON.stringify({ ...zoneResults, ...formData }));
        await fetch('/api/send-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, zoneData: zoneResults }),
        });
        router.push('/diagnostic/results');
      };
      submit();
    }
  }, [step, isSubmitting, formData, router, zoneResults]);

  const handleAnswer = (option: any) => {
    if (!currentQuestion) return;
    const weight = calculatePillarPressure(option.weight, formData.role, currentQuestion.lens);
    setZoneResults(prev => ({
      ...prev,
      [currentQuestion.lens]: {
        max: Math.max(prev[currentQuestion.lens as keyof DiagnosticResults].max, option.strength),
        aggregate: prev[currentQuestion.lens as keyof DiagnosticResults].aggregate + weight,
        vectors: [...prev[currentQuestion.lens as keyof DiagnosticResults].vectors, option.vector]
      }
    }));
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
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 italic uppercase text-white underline decoration-[#00F2FF] underline-offset-8">Systemic Observation</h2>
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase()) {
                    alert("Identity Mismatch. Please check your email entries.");
                    return;
                  }
                  setStep(1); 
                }} className="space-y-6">
                  <input required placeholder="Full Name" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" onChange={e => setFormData({...formData, name: e.target.value})} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="email" placeholder="Work Email" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" onChange={e => setFormData({...formData, email: e.target.value})} />
                    <input required type="email" placeholder="Confirm Work Email" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" onChange={e => setFormData({...formData, confirmEmail: e.target.value})} />
                  </div>
                  <input required placeholder="Organization" className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" onChange={e => setFormData({...formData, organization: e.target.value})} />
                  <select className="w-full p-4 bg-slate-950 border border-slate-800 rounded text-white" onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="Executive">Executive Perspective</option>
                    <option value="Manager">Manager Perspective</option>
                    <option value="Technical">Technical Perspective</option>
                  </select>
                  <button type="submit" className="w-full bg-[#00F2FF] text-[#020617] font-black h-16 uppercase tracking-widest hover:bg-white transition-all">Begin Observation</button>
                </form>
              </Card>
            </motion.div>
          )}
          {step > 0 && step <= 12 && currentQuestion && (
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 text-center">
                <span className="text-[#00F2FF] font-bold uppercase tracking-[0.4em] text-[10px]">Signal {step} of 12</span>
                <h2 className="text-2xl font-bold mt-6 mb-12 italic uppercase text-white">{currentQuestion.text}</h2>
                <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                  {currentQuestion.options.map((opt, i) => (
                    <button key={i} className="py-6 px-6 border border-slate-800 text-slate-300 uppercase tracking-widest text-xs hover:border-[#00F2FF] hover:bg-[#0A1F33]/50 transition-all text-left" onClick={() => handleAnswer(opt)}>{opt.label}</button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
          {step === 13 && (
            <div className="text-center py-20">
              <ShieldCheck className="h-16 w-16 text-[#00F2FF] mx-auto mb-6" />
              <h2 className="text-2xl font-bold uppercase italic text-white mb-2">Signals Captured</h2>
              <Loader2 className="animate-spin h-8 w-8 text-[#00F2FF] mx-auto mt-4" />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
