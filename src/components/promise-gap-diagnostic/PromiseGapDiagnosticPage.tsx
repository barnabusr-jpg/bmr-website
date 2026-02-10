import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Activity, Loader2 } from "lucide-react"; 

const diagnosticQuestions = [
  { id: 1, lens: "HAI", text: "How often do frontline teams manually verify AI outputs before sharing them with stakeholders?", weights: { 4: "Manual Friction", 3: "Manual Friction", 2: "System Disconnect", 1: "Force Multiplier", 0: "Force Multiplier" }},
  { id: 2, lens: "HAI", text: "How often can your team identify the specific cause of an AI error within 24 hours?", weights: { 4: "Force Multiplier", 3: "Team Relief", 2: "Passive Support", 1: "System Disconnect", 0: "Manual Friction" }},
  { id: 3, lens: "HAI", text: "How often do teams use 'shadow' manual processes instead of the AI because it’s more reliable?", weights: { 4: "Manual Friction", 3: "Manual Friction", 2: "System Disconnect", 1: "Passive Support", 0: "Force Multiplier" }},
  { id: 4, lens: "HAI", text: "How often does your organization adjust its risk appetite based on actual AI performance data?", weights: { 4: "Force Multiplier", 3: "Team Relief", 2: "Passive Support", 1: "System Disconnect", 0: "System Disconnect" }},
  { id: 5, lens: "AVS", text: "How often are AI projects launched without a formal risk review to hit delivery deadlines?", weights: { 4: "System Disconnect", 3: "System Disconnect", 2: "Passive Support", 1: "Team Relief", 0: "Force Multiplier" }},
  { id: 6, lens: "AVS", text: "How often is there confusion over which leader 'owns' fixing an AI-driven failure?", weights: { 4: "System Disconnect", 3: "System Disconnect", 2: "Passive Support", 1: "Team Relief", 0: "Force Multiplier" }},
  { id: 7, lens: "AVS", text: "How often is compliance treated as a one-time 'checkbox' at launch rather than an ongoing requirement?", weights: { 4: "Passive Support", 3: "Passive Support", 2: "System Disconnect", 1: "Team Relief", 0: "Force Multiplier" }},
  { id: 8, lens: "AVS", text: "How often does your organization track the human hours required to keep AI tools running?", weights: { 4: "Team Relief", 3: "Team Relief", 2: "Passive Support", 1: "Manual Friction", 0: "Manual Friction" }},
  { id: 9, lens: "IGF", text: "How often are human corrections fed back into the AI to improve future accuracy?", weights: { 4: "Force Multiplier", 3: "Team Relief", 2: "Passive Support", 1: "System Disconnect", 0: "System Disconnect" }},
  { id: 10, lens: "IGF", text: "How often does leadership focus more on AI 'features' than the human 'impact' of those features?", weights: { 4: "Passive Support", 3: "Passive Support", 2: "System Disconnect", 1: "Team Relief", 0: "Force Multiplier" }},
  { id: 11, lens: "IGF", text: "How often are AI projects paused because the team isn’t ready for the change?", weights: { 4: "Force Multiplier", 3: "Team Relief", 2: "Passive Support", 1: "System Disconnect", 0: "System Disconnect" }},
  { id: 12, lens: "IGF", text: "How often does your organization measure the 'Promise Gap' (expected vs. actual ROI) for AI initiatives?", weights: { 4: "Force Multiplier", 3: "Team Relief", 2: "Passive Support", 1: "Manual Friction", 0: "Manual Friction" }},
];

const frequencyScale = [
  { label: "Always", value: 4 }, { label: "Frequently", value: 3 }, { label: "Sometimes", value: 2 }, { label: "Rarely", value: 1 }, { label: "Never", value: 0 }
];

function LensIndicator({ acronym, isActive, isCompleted }: { acronym: string; isActive: boolean; isCompleted: boolean }) {
  return (
    <div className={`h-14 w-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive || isCompleted ? "bg-[#14b8a6] border-[#14b8a6]" : "bg-slate-900 border-slate-800"}`}>
      {isCompleted ? <span className="text-white font-bold text-lg">✓</span> : <span className={`text-[10px] font-bold ${isActive ? "text-white" : "text-slate-600"}`}>{acronym}</span>}
    </div>
  );
}

export default function PromiseGapDiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "" });
  const [stateScores, setStateScores] = useState<Record<string, number>>({
    "Manual Friction": 0, "Passive Support": 0, "System Disconnect": 0, "Team Relief": 0, "Force Multiplier": 0
  });

  useEffect(() => {
    if (step === 13 && !isSubmitting) {
      const submitResults = async () => {
        setIsSubmitting(true);
        const lensResults = { "hai": stateScores["Manual Friction"] > 2, "avs": stateScores["System Disconnect"] > 2, "igf": stateScores["Passive Support"] > 2 };
        try {
          localStorage.setItem('bmr_results_vault', JSON.stringify(lensResults));
          const response = await fetch('/api/send-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: formData.name, email: formData.email, org: formData.organization, scores: stateScores }),
          });
          if (response.ok) { router.push('/diagnostic/results'); }
        } catch (error) {
          console.error("Forensic dispatch failed", error);
          setIsSubmitting(false);
        }
      };
      submitResults();
    }
  }, [step, isSubmitting, formData, router, stateScores]);

  const handleAnswer = (value: number) => {
    const question = diagnosticQuestions[step - 1];
    const stateToIncrement = question.weights[value as keyof typeof question.weights];
    setStateScores(prev => ({ ...prev, [stateToIncrement]: prev[stateToIncrement] + 1 }));
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
            <Card className="p-10 bg-slate-900/30 border-slate-800">
              <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight text-white">Systemic Observation</h2>
              <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-6">
                <input required placeholder="Full Name" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Work Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input required placeholder="Organization" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                <button type="submit" className="w-full bg-[#14b8a6] text-[#020617] font-bold h-16 uppercase tracking-widest hover:bg-[#0d9488]">Begin Observation</button>
              </form>
            </Card>
          )}
          {step > 0 && step <= 12 && (
            <Card className="p-12 bg-slate-900/30 border-slate-800 text-center">
              <span className="text-[#14b8a6] font-bold uppercase tracking-[0.4em] text-[10px]">Signal {step} of 12</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-12 text-white italic uppercase">{diagnosticQuestions[step - 1].text}</h2>
              <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {frequencyScale.map((f) => (
                  <button key={f.value} className="py-6 border border-slate-800 text-slate-300 uppercase tracking-widest text-xs hover:border-[#14b8a6]" onClick={() => handleAnswer(f.value)}>{f.label}</button>
                ))}
              </div>
            </Card>
          )}
          {step === 13 && (
            <Card className="p-12 bg-slate-900/30 border-slate-800 text-center">
              <Activity className="h-16 w-16 text-[#14b8a6] mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4 text-white uppercase italic">Signals Captured</h2>
              <div className="flex justify-center mt-10"><Loader2 className="animate-spin h-10 w-10 text-[#14b8a6]" /></div>
            </Card>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
