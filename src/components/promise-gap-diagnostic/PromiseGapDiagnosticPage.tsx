import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Loader2 } from "lucide-react"; 

const diagnosticQuestions = [
  { id: 1, lens: "Trust", text: "Our organization has a shared, non-technical language for defining AI reliability." },
  { id: 2, lens: "Trust", text: "We can clearly demonstrate to stakeholders how our AI outputs align with brand values." },
  { id: 3, lens: "Trust", text: "There is a high level of confidence that our AI behavior remains consistent in unscripted scenarios." },
  { id: 4, lens: "Trust", text: "We proactively measure stakeholder sentiment regarding our use of automated decision-making." },
  { id: 5, lens: "Govern", text: "Our AI projects follow a standardized oversight process from conception to delivery." },
  { id: 6, lens: "Govern", text: "Final accountability for AI-driven outcomes is clearly mapped to specific leadership roles." },
  { id: 7, lens: "Govern", text: "We have established protocols for human expert intervention when AI performance fluctuates." },
  { id: 8, lens: "Govern", text: "Our governance framework is designed to adapt as regulatory and technical landscapes evolve." },
  { id: 9, lens: "Evolve", text: "We prioritize 'structured observation' to identify why system risks occur, not just where." },
  { id: 10, lens: "Evolve", text: "We have a formal 'de-risking' phase before any AI initiative moves to real-world operation." },
  { id: 11, lens: "Evolve", text: "Our AI strategy is integrated into the broader systemic goals of the organization." },
  { id: 12, lens: "Evolve", text: "Leadership regularly reviews how AI system behavior impacts our overall delivery risk." },
];

const systemicStates = [
  "Manual Friction",
  "Passive Support",
  "System Disconnect",
  "Team Relief",
  "Force Multiplier"
];

function LensIndicator({ label, isActive, isCompleted }: { label: string; isActive: boolean; isCompleted: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`h-14 w-14 rounded-full flex items-center justify-center border-2 relative transition-all duration-500 ${
        isActive || isCompleted ? "bg-[#14b8a6] border-[#14b8a6] shadow-[0_0_15px_rgba(20,184,166,0.3)]" : "bg-slate-900 border-slate-800"
      }`}>
        {isCompleted ? (
          <span className="text-white text-lg">✓</span>
        ) : (
          <span className={`text-xs font-bold ${isActive ? "text-white" : "text-slate-600"}`}>{label[0]}</span>
        )}
      </div>
      <div className={`text-xs font-bold uppercase tracking-widest ${isActive || isCompleted ? "text-[#14b8a6]" : "text-slate-600"}`}>
        {label}
      </div>
    </div>
  );
}

export default function PromiseGapDiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "" });
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [step]: value });
    setStep(step + 1);
  };

  const submitResults = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/send-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          org: formData.organization,
          results: answers
        }),
      });
      if (res.ok) {
        router.push('/thank-you');
      } else {
        setIsSubmitting(false);
      }
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      <div className="flex justify-center gap-8 md:gap-16 mb-20">
        <LensIndicator label="Trust" isActive={step >= 1 && step <= 4} isCompleted={step > 4} />
        <LensIndicator label="Govern" isActive={step >= 5 && step <= 8} isCompleted={step > 8} />
        <LensIndicator label="Evolve" isActive={step >= 9 && step <= 12} isCompleted={step > 12} />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="intake" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="p-10 bg-slate-900/30 border-slate-800 border-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
              <h2 className="text-3xl font-bold mb-6">Diagnostic Intake</h2>
              <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-6">
                <input required placeholder="Full Name" className="w-full p-4 rounded bg-slate-950 border border-slate-800 outline-none focus:border-[#14b8a6]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Work Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800 outline-none focus:border-[#14b8a6]" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input required placeholder="Organization" className="w-full p-4 rounded bg-slate-950 border border-slate-800 outline-none focus:border-[#14b8a6]" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                <Button type="submit" className="w-full bg-[#14b8a6] text-[#020617] font-bold h-16 text-lg group">
                  Begin Observation
                </Button>
              </form>
            </Card>
          </motion.div>
        )}

        {step > 0 && step <= 12 && (
          <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card className="p-12 bg-slate-900/30 border-slate-800 border-2 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
              <span className="text-[#14b8a6] font-bold uppercase tracking-widest text-xs">Signal {step} of 12</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-12 leading-tight text-white">{diagnosticQuestions[step - 1].text}</h2>
              <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {systemicStates.map((state) => (
                  <Button 
                    key={state} 
                    variant="outline" 
                    className="py-8 text-lg font-light border-slate-800 hover:border-[#14b8a6] hover:bg-[#14b8a6]/10 transition-all text-slate-300 hover:text-white" 
                    onClick={() => handleAnswer(state)}
                  >
                    {state}
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
              <h2 className="text-4xl font-bold mb-10 text-white">Observation Complete</h2>
              <Button 
                className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold w-full h-16 text-lg" 
                onClick={submitResults} 
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit & Send Synthesis"}
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
