import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Activity } from "lucide-react";

/* 1. DATA: Questions from rules.json */
const diagnosticQuestions = [
  { id: 1, lens: "Trust", text: "Do teams feel safe reporting AI failures or 'near misses' without fear of blame?" },
  { id: 2, lens: "Trust", text: "Is there a clear, shared understanding of what 'Ethical AI' means in daily practice?" },
  { id: 3, lens: "Trust", text: "Are end-users' lived experiences actively used to refine AI model behavior?" },
  { id: 4, lens: "Trust", text: "Is there transparency regarding how AI-driven decisions are made and audited?" },
  { id: 5, lens: "Govern", text: "Are accountability structures for AI outcomes clearly defined across the org?" },
  { id: 6, lens: "Govern", text: "Does the org have a consistent policy for human-in-the-loop overrides?" },
  { id: 7, lens: "Govern", text: "Is there a formal mechanism to halt AI deployments if safety thresholds are met?" },
  { id: 8, lens: "Govern", text: "Are regulatory compliance checks integrated into the automated delivery pipeline?" },
  { id: 9, lens: "Evolve", text: "Can the system adapt to data drift without requiring a full manual redesign?" },
  { id: 10, lens: "Evolve", text: "Is there a feedback loop that translates operational friction into technical debt fixes?" },
  { id: 11, lens: "Evolve", text: "Do teams have the resources to continuously monitor post-deployment performance?" },
  { id: 12, lens: "Evolve", text: "Is the org prepared to decommission AI models that no longer provide value?" },
];

/* 2. SUB-COMPONENT: Lens Indicator (Fixed Solid Teal Color) */
function LensIndicator({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* FIXED: Using solid #14b8a6 to ensure "Govern" is never grey */}
      <div className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
        isActive ? "bg-[#14b8a6]" : "bg-muted border-2 border-border"
      }`}>
        <Check className={`h-6 w-6 ${isActive ? "text-white" : "text-muted-foreground"}`} />
      </div>
      <div className={`text-sm font-bold ${isActive ? "text-[#14b8a6]" : "text-muted-foreground"}`}>{label}</div>
    </div>
  );
}

export default function PromiseGapDiagnosticPage({ onSubmit }: { onSubmit: any }) {
  const [step, setStep] = useState(0); // 0 = Intake, 1-12 = Questions, 13 = Results
  const [formData, setFormData] = useState({ name: "", email: "", organization: "" });
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1); 
  };

  const handleAnswer = (value: string) => {
    const nextStep = step + 1;
    setAnswers({ ...answers, [step]: value });
    setStep(nextStep);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          
          {/* Progress Section */}
          <div className="flex justify-center gap-8 md:gap-16 mb-16">
            <LensIndicator label="Trust" isActive={step >= 0 && step <= 4} />
            <LensIndicator label="Govern" isActive={step >= 5 && step <= 8} />
            <LensIndicator label="Evolve" isActive={step >= 9} />
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 0: INTAKE */}
            {step === 0 && (
              <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="p-8 border-2 shadow-xl">
                  <h2 className="text-3xl font-bold mb-6">Diagnostic Intake</h2>
                  <form onSubmit={handleIntakeSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <input required className="w-full p-3 rounded-md border bg-card" 
                          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Work Email *</label>
                        <input required type="email" className="w-full p-3 rounded-md border bg-card" 
                          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization *</label>
                      <input required className="w-full p-3 rounded-md border bg-card" 
                        value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                    </div>
                    <Button type="submit" className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-lg py-6">
                      Begin Assessment
                    </Button>
                  </form>
                </Card>
              </motion.div>
            )}

            {/* STEP 1-12: QUESTIONS */}
            {step > 0 && step <= 12 && (
              <motion.div key="question" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                <Card className="p-10 border-2 shadow-2xl relative text-center">
                  <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-xs">
                    Lens: {diagnosticQuestions[step - 1].lens}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-10 leading-snug">
                    {diagnosticQuestions[step - 1].text}
                  </h2>
                  <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                    {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"].map((option) => (
                      <Button key={option} variant="outline" className="py-6 text-md hover:border-[#14b8a6] hover:bg-[#14b8a6]/5"
                        onClick={() => handleAnswer(option)}>
                        {option}
                      </Button>
                    ))}
                  </div>
                  <p className="mt-8 text-muted-foreground text-sm">Signal {step} of 12</p>
                </Card>
              </motion.div>
            )}

            {/* STEP 13: RESULTS SUMMARY */}
            {step === 13 && (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-10 border-2 border-[#14b8a6] shadow-2xl text-center">
                  <Activity className="h-12 w-12 text-[#14b8a6] mx-auto mb-4" />
                  <h2 className="text-3xl font-bold">Assessment Complete</h2>
                  <p className="text-muted-foreground mt-2">Analysis prepared for {formData.organization}</p>
                  <Button 
                    className="mt-8 bg-[#14b8a6] hover:bg-[#0d9488] w-full py-6 text-lg" 
                    onClick={() => onSubmit(answers, formData.email, formData.name)}
                  >
                    Submit & Send Report
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
