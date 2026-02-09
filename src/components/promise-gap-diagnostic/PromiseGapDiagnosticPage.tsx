import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Loader2, ShieldCheck, Zap, BarChart3 } from "lucide-react"; 

const diagnosticQuestions = [
  // HAI - TRUST
  { id: 1, lens: "HAI", text: "How often do frontline teams manually verify AI outputs before sharing them with stakeholders?", weights: { 4: "Manual Friction", 3: "Manual Friction", 2: "System Disconnect", 1: "Force Multiplier", 0: "Force Multiplier" }},
  { id: 2, lens: "HAI", text: "How often can your team identify the specific cause of an AI error within 24 hours?", weights: { 4: "Force Multiplier", 3: "Team Relief", 2: "Passive Support", 1: "System Disconnect", 0: "Manual Friction" }},
  { id: 3, lens: "HAI", text: "How often do teams use 'shadow' manual processes instead of the AI because it’s more reliable?", weights: { 4: "Manual Friction", 3: "Manual Friction", 2: "System Disconnect", 1: "Passive Support", 0: "Force Multiplier" }},
  { id: 4, lens: "HAI", text: "How often does your organization adjust its risk appetite based on actual AI performance data?", weights: { 4: "Force Multiplier", 3: "Team Relief", 2: "Passive Support", 1: "System Disconnect", 0: "System Disconnect" }},
  
  // AVS - GOVERN
  { id: 5, lens: "AVS", text: "How often are AI projects launched without a formal risk review to hit delivery deadlines?", weights: { 4: "System Disconnect", 3: "System Disconnect", 2: "Passive Support", 1: "Team Relief", 0: "Force Multiplier" }},
  { id: 6, lens: "AVS", text: "How often is there confusion over which leader 'owns' fixing an AI-driven failure?", weights: { 4: "System Disconnect", 3: "System Disconnect", 2: "Passive Support", 1: "Team Relief", 0: "Force Multiplier" }},
  { id: 7, lens: "AVS", text: "How often is compliance treated as a one-time 'checkbox' at launch rather than an ongoing requirement?", weights: { 4: "Passive Support", 3: "Passive Support", 2: "System Disconnect", 1: "Team Relief", 0: "Force Multiplier" }},
  { id: 8, lens: "AVS", text: "How often does your organization track the human hours required to keep AI tools running?", weights: { 4: "Team Relief", 3: "Team Relief", 2: "Passive Support", 1: "Manual Friction", 0: "Manual Friction" }},
  
  // IGF - EVOLVE
  { id: 9, lens: "IGF", text: "How often are human corrections fed back into the AI to improve future accuracy?", weights: { 4: "Force Multiplier", 3: "Team Relief", 2: "Passive Support", 1: "System Disconnect", 0: "System Disconnect" }},
  { id: 10, lens: "IGF", text: "How often does leadership focus more on AI 'features' than the human 'impact' of those features?", weights: { 4: "Passive Support", 3: "Passive Support", 2: "System Disconnect", 1: "Team Relief", 0: "Force Multiplier" }},
  { id: 11, lens: "IGF", text: "How often are AI projects paused because the team isn’t ready for the change?", weights: { 4: "Force Multiplier", 3: "Team Relief", 2: "Passive Support", 1: "System Disconnect", 0: "System Disconnect" }},
  { id: 12, lens: "IGF", text: "How often does your organization measure the 'Promise Gap' (expected vs. actual ROI) for AI initiatives?", weights: { 4: "Force Multiplier", 3: "Team Relief", 2: "Passive Support", 1: "Manual Friction", 0: "Manual Friction" }},
];

const frequencyScale = [
  { label: "Always", value: 4 },
  { label: "Frequently", value: 3 },
  { label: "Sometimes", value: 2 },
  { label: "Rarely", value: 1 },
  { label: "Never", value: 0 }
];

function LensIndicator({ label, acronym, isActive, isCompleted }: { label: string; acronym: string; isActive: boolean; isCompleted: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`h-14 w-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
        isActive || isCompleted ? "bg-[#14b8a6] border-[#14b8a6] shadow-[0_0_15px_rgba(20,184,166,0.2)]" : "bg-slate-900 border-slate-800"
      }`}>
        {isCompleted ? <span className="text-white font-bold text-lg">✓</span> : <span className={`text-[10px] font-bold ${isActive ? "text-white" : "text-slate-600"}`}>{acronym}</span>}
      </div>
      <div className={`text-[10px] font-bold uppercase tracking-widest ${isActive || isCompleted ? "text-[#14b8a6]" : "text-slate-600"}`}>{label}</div>
    </div>
  );
}

export default function PromiseGapDiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing observation patterns...");
  const [formData, setFormData] = useState({ name: "", email: "", organization: "" });
  const [stateScores, setStateScores] = useState<Record<string, number>>({
    "Manual Friction": 0, "Passive Support": 0, "System Disconnect": 0, "Team Relief": 0, "Force Multiplier": 0
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSubmitting) {
      const sequence = ["Analyzing observation patterns...", "Mapping systemic friction points...", "Calibrating Promise Gap™ gravity...", "Finalizing synthesis..."];
      let i = 0;
      interval = setInterval(() => {
        if (i < sequence.length - 1) { i++; setLoadingText(sequence[i]); }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleAnswer = (value: number) => {
    const question = diagnosticQuestions[step - 1];
    const stateToIncrement = question.weights[value as keyof typeof question.weights];
    setStateScores(prev => ({ ...prev, [stateToIncrement]: prev[stateToIncrement] + 1 }));
    setStep(step + 1);
  };

  const submitResults = async () => {
    setIsSubmitting(true);
    try {
      // NOTE: Ensure your API filename matches this path
      const apiCall = fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name, 
          email: formData.email, 
          org: formData.organization, 
          scores: stateScores 
        }),
      });

      const minDelay = new Promise(resolve => setTimeout(resolve, 3500));
      const [res] = await Promise.all([apiCall, minDelay]);

      if (res.ok) {
        router.push('/diagnostic/results');
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submission failed", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="w-full max-w-4xl mx-auto py-12 px-6 font-sans">
        <div className="flex justify-center gap-8 md:gap-16 mb-20">
          <LensIndicator label="Trust" acronym="HAI" isActive={step >= 1 && step <= 4} isCompleted={step > 4} />
          <LensIndicator label="Govern" acronym="AVS" isActive={step >= 5 && step <= 8} isCompleted={step > 8} />
          <LensIndicator label="Evolve" acronym="IGF" isActive={step >= 9 && step <= 12} isCompleted={step > 12} />
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="intake" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="p-10 bg-slate-900/30 border-slate-800 border-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
                <h2 className="text-3xl font-bold mb-2 text-white italic uppercase tracking-tight">Systemic Observation</h2>
                <p className="text-slate-400 mb-8 italic font-light">Identify the friction points where AI potential meets reality.</p>
                <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-6">
                  <input required placeholder="Full Name" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#14b8a6] outline-none transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input required type="email" placeholder="Work Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#14b8a6] outline-none transition-all" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <input required placeholder="Organization" className="w-full p-4 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#14b8a6] outline-none transition-all" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                  <Button type="submit" className="w-full bg-[#14b8a6] text-[#020617] font-bold h-16 text-lg uppercase tracking-[0.2em] hover:bg-[#0d9488]">Begin Observation</Button>
                </form>
              </Card>
            </motion.div>
          )}

          {step > 0 && step <= 12 && (
            <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 border-2 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
                <span className="text-[#14b8a6] font-bold uppercase tracking-[0.4em] text-[10px]">Signal {step} of 12</span>
                <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-12 leading-tight text-white italic uppercase tracking-tight">{diagnosticQuestions[step - 1].text}</h2>
                <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                  {frequencyScale.map((f) => (
                    <Button key={f.value} variant="outline" className="py-8 text-lg font-light border-slate-800 hover:border-[#14b8a6] hover:bg-[#14b8a6]/5 transition-all text-slate-300 hover:text-white uppercase tracking-widest text-xs" onClick={() => handleAnswer(f.value)}>
                      {f.label}
                    </Button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {step === 13 && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-12 bg-slate-900/30 border-slate-800 border-2 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
                <Activity className="h-16 w-16 text-[#14b8a6] mx-auto mb-6" />
                <h2 className="text-4xl font-bold mb-4 text-white uppercase tracking-tighter italic">Signals Captured</h2>
                <p className="text-slate-400 mb-10 font-light tracking-wide italic">{isSubmitting ? loadingText : "Synthesis complete. Finalizing your organizational report..."}</p>
                <Button className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold w-full h-16 text-lg uppercase tracking-[0.2em] shadow-lg shadow-[#14b8a6]/10" onClick={submitResults} disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="animate-spin h-6 w-6" /> : "Request Systemic Synthesis"}
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
