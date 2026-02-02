import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Activity, ArrowRight } from "lucide-react";

const diagnosticQuestions = [
  // LENS: TRUST
  { id: 1, lens: "Trust", text: "Our organization has a shared, non-technical language for defining AI reliability." },
  { id: 2, lens: "Trust", text: "We can clearly demonstrate to stakeholders how our AI outputs align with brand values." },
  { id: 3, lens: "Trust", text: "There is a high level of confidence that our AI behavior remains consistent in unscripted scenarios." },
  { id: 4, lens: "Trust", text: "We proactively measure stakeholder sentiment regarding our use of automated decision-making." },

  // LENS: GOVERN
  { id: 5, lens: "Govern", text: "Our AI projects follow a standardized oversight process from conception to delivery." },
  { id: 6, lens: "Govern", text: "Final accountability for AI-driven outcomes is clearly mapped to specific leadership roles." },
  { id: 7, lens: "Govern", text: "We have established protocols for human expert intervention when AI performance fluctuates." },
  { id: 8, lens: "Govern", text: "Our governance framework is designed to adapt as regulatory and technical landscapes evolve." },

  // LENS: EVOLVE
  { id: 9, lens: "Evolve", text: "We prioritize 'structured observation' to identify why system risks occur, not just where." },
  { id: 10, lens: "Evolve", text: "We have a formal 'de-risking' phase before any AI initiative moves to real-world operation." },
  { id: 11, lens: "Evolve", text: "Our AI strategy is integrated into the broader systemic goals of the organization." },
  { id: 12, lens: "Evolve", text: "Leadership regularly reviews how AI system behavior impacts our overall delivery risk." },
];

function LensIndicator({ label, isActive, isCompleted }: { label: string; isActive: boolean; isCompleted: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`h-14 w-14 rounded-full flex items-center justify-center transition-all duration-500 border-2 relative ${
        isActive || isCompleted ? "bg-[#14b8a6] border-[#14b8a6] shadow-[0_0_15px_rgba(20,184,166,0.3)]" : "bg-slate-900 border-slate-800"
      }`}>
        <Check className={`h-6 w-6 transition-opacity duration-300 ${isCompleted ? "opacity-100 text-white" : "opacity-0"}`} />
        {!isCompleted && <span className={`absolute text-xs font-bold ${isActive ? "text-white" : "text-slate-600"}`}>{label[0]}</span>}
      </div>
      <div className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${isActive || isCompleted ? "text-[#14b8a6]" : "text-slate-600"}`}>
        {label}
      </div>
    </div>
  );
}

export default function PromiseGapDiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "" });
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1); 
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [step]: value });
    setStep(step + 1);
  };

  const submitResults = async () => {
    const payload = { 
      answers, 
      to: formData.email, 
      firstName: formData.name.split(' ')[0],
      organization: formData.organization 
    };
    
    try {
      const res = await fetch('/api/send-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        router.push('/thank-you'); 
      } else {
        alert("Error sending results. Please try again.");
      }
    } catch {
      alert("Connection failed. Please check your network.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <Header />
      <main className="flex-grow py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center gap-8 md:gap-16 mb-20">
            <LensIndicator label="Trust" isActive={step >= 1 && step <= 4} isCompleted={step > 4} />
            <LensIndicator label="Govern" isActive={step >= 5 && step <= 8} isCompleted={step > 8} />
            <LensIndicator label="Evolve" isActive={step >= 9 && step <= 12} isCompleted={step > 12} />
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="intake" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <Card className="p-10 bg-slate-900/30 border-slate-800 border-2 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
                  <h2 className="text-3xl font-bold mb-4 tracking-tight">Systemic Diagnostic Intake</h2>
                  <p className="text-slate-400 font-light mb-10 leading-relaxed">
                    Identify where behavioral friction and misaligned expectations are forming 
                    within your AI-enabled systems.
                  </p>
                  <form onSubmit={handleIntakeSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-light text-slate-500 uppercase tracking-widest">Full Name</label>
                        <input required className="w-full p-4 rounded-md border border-slate-800 bg-slate-950 text-white focus:border-[#14b8a6] outline-none transition-colors" 
                          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-light text-slate-500 uppercase tracking-widest">Work Email</label>
                        <input required type="email" className="w-full p-4 rounded-md border border-slate-800 bg-slate-950 text-white focus:border-[#14b8a6] outline-none transition-colors" 
                          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-light text-slate-500 uppercase tracking-widest">Organization</label>
                      <input required className="w-full p-4 rounded-md border border-slate-800 bg-slate-950 text-white focus:border-[#14b8a6] outline-none transition-colors" 
                        value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                    </div>
                    <Button type="submit" className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-16 text-lg">
                      Begin Observation <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </Card>
              </motion.div>
            )}

            {step > 0 && step <= 12 && (
              <motion.div key="question" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                <Card className="p-12 bg-slate-900/30 border-slate-800 border-2 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
                  <span className="text-[#14b8a6] font-bold tracking-[0.3em] uppercase text-xs">Lens: {diagnosticQuestions[step - 1].lens}</span>
                  <h2 className="text-2xl md:text-4xl font-bold mt-6 mb-12 leading-tight tracking-tight text-white">{diagnosticQuestions[step - 1].text}</h2>
                  <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                    {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"].map((option) => (
                      <Button 
                        key={option} 
                        variant="outline" 
                        className="py-8 text-lg font-light border-slate-800 hover:border-[#14b8a6] hover:bg-[#14b8a6]/10 text-slate-300 hover:text-white transition-all duration-300 group relative overflow-hidden" 
                        onClick={() => handleAnswer(option)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#14b8a6]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        {option}
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
                  <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Observation Complete</h2>
                  <p className="text-slate-400 font-light text-lg mb-10 max-w-xl mx-auto">
                    Your responses have been recorded. We will synthesize these signals into a preliminary System Health Picture.
                  </p>
                  <Button className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold w-full h-16 text-lg" onClick={submitResults}>
                    Submit & Send Synthesis
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
