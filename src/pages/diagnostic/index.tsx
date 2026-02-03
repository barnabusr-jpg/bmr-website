import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Loader2 } from "lucide-react";

const diagnosticQuestions = [
  { id: 1, text: "Our AI's reported success metrics translate into zero additional manual verification work for our human teams." },
  { id: 2, text: "Our AI output requires zero manual intervention or senior-level review to meet our brand standards." },
  { id: 3, text: "Our AI's reliability is a systemic property; it does not depend on a specific power user to ensure correctness." },
  { id: 4, text: "Our staff uses AI as a primary tool for revenue-generating tasks rather than a task creating verification labor." },
  { id: 5, text: "Our AI oversight and governance protocols work identically across all departments." },
  { id: 6, text: "When an AI failure occurs, our system identifies the specific leader responsible in real-time." },
  { id: 7, text: "Our systems provide a proactive signal that triggers a human expert before an AI fluctuation impacts our P&L." },
  { id: 8, text: "We can update internal AI safety and regulatory rules across the entire organization in a single deployment cycle." },
  { id: 9, text: "When the system underperforms, we fix the architectural root cause rather than symptoms." },
  { id: 10, text: "Every AI initiative is stress-tested in a Safe-to-Fail environment before touching live budgets." },
  { id: 11, text: "Our AI spend has directly reduced the energy cost of achieving business goals." },
  { id: 12, text: "Leadership has a high-fidelity view of the Promise Gap—we see exactly where AI is delivering ROI." },
];

const ROI_SCALE = ["Value Drain", "Stranded Asset", "Utility Only", "Operational Lift", "Capital Multiplier"];

export default function DiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "" });
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const progress = step > 0 && step <= 12 ? (step / 12) * 100 : 0;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [step]: value }));
    setStep(prev => prev + 1);
  };

  const submitResults = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/send-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          answers, 
          to: formData.email, 
          firstName: formData.name.split(' ')[0], 
          organization: formData.organization 
        }),
      });

      if (res.ok) {
        router.push('/thank-you');
      } else {
        alert("Submission failed. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      <main className="py-24 px-6 container mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-10 bg-slate-900/40 border-slate-800 border-2">
                <h1 className="text-3xl font-bold mb-4">BMR Solutions Diagnostic</h1>
                <p className="text-slate-400 mb-8">Identify where your AI investment is leaking into hidden human labor.</p>
                <div className="space-y-4">
                  <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded outline-none text-white" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded outline-none text-white" placeholder="Work Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded outline-none text-white" placeholder="Organization" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
                  <Button onClick={() => setStep(1)} disabled={!formData.name || !formData.email} className="w-full bg-[#14b8a6] text-black font-bold h-14 mt-4">Begin Diagnostic</Button>
                </div>
              </Card>
            </motion.div>
          ) : step <= 12 ? (
            <motion.div key="question" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <p className="text-[#14b8a6] font-mono text-sm mb-4 uppercase">Signal {step} of 12</p>
              <h2 className="text-2xl font-bold mb-10">{diagnosticQuestions[step - 1].text}</h2>
              <div className="grid gap-3">
                {ROI_SCALE.map(opt => (
                  <Button key={opt} variant="outline" className="h-16 border-slate-800 hover:border-[#14b8a6] justify-start px-6 text-lg" onClick={() => handleAnswer(opt)}>
                    {opt}
                  </Button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="complete" className="text-center">
              <Activity className="h-16 w-16 text-[#14b8a6] mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Diagnostic Complete</h2>
              <Button onClick={submitResults} disabled={isSubmitting} className="bg-[#14b8a6] text-black font-bold h-16 w-full text-lg uppercase">
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Request Synthesis Report"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
