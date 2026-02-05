import React, { useState } from "react";
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

export default function PromiseGap() {
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
        body: JSON.stringify({ results: answers, email: formData.email, name: formData.name, org: formData.organization }),
      });
      if (res.ok) router.push('/thank-you');
      else setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>The Promise Gap | BMR Solutions</title>
      </Head>
      <div className="min-h-screen bg-[#020617] text-white flex flex-col">
        <Header />
        <main className="flex-grow py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="p-10 bg-slate-900/30 border-slate-800 border-2 relative">
                    <h2 className="text-3xl font-bold mb-6 text-[#14b8a6]">Systemic Diagnostic Intake</h2>
                    <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-6">
                      <input required placeholder="Full Name" className="w-full p-4 rounded bg-slate-950 border border-slate-800" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      <input required type="email" placeholder="Work Email" className="w-full p-4 rounded bg-slate-950 border border-slate-800" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      <input required placeholder="Organization" className="w-full p-4 rounded bg-slate-950 border border-slate-800" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                      <Button type="submit" className="w-full bg-[#14b8a6] text-[#020617] font-bold h-16">Begin Observation</Button>
                    </form>
                  </Card>
                </motion.div>
              )}

              {step > 0 && step <= 12 && (
                <motion.div key="question" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="p-12 bg-slate-900/30 border-slate-800 border-2 text-center">
                    <span className="text-[#14b8a6] font-bold uppercase text-xs">Signal {step} of 12</span>
                    <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-12 leading-tight">{diagnosticQuestions[step - 1].text}</h2>
                    <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                      {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"].map((option) => (
                        <Button key={option} variant="outline" className="py-8 text-lg border-slate-800 hover:border-[#14b8a6] hover:bg-[#14b8a6]/10" onClick={() => handleAnswer(option)}>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {step === 13 && (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="p-12 bg-slate-900/30 border-slate-800 border-2 text-center">
                    <Activity className="h-16 w-16 text-[#14b8a6] mx-auto mb-6" />
                    <h2 className="text-4xl font-bold mb-10">Observation Complete</h2>
                    <Button className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold w-full h-16" onClick={submitResults} disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit & Send Synthesis"}
                    </Button>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
