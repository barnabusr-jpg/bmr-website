import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Loader2 } from "lucide-react";

const diagnosticQuestions = [
  { id: 1, lens: "Trust", text: "Our AI’s reported 'success' metrics translate into zero additional manual verification work for our human teams." },
  { id: 2, lens: "Trust", text: "Our AI output requires zero manual intervention or senior-level review to meet our brand standards." },
  { id: 3, lens: "Trust", text: "Our AI’s reliability is a systemic property; it does not depend on a specific 'power user' or 'Sue' to ensure the output is correct." },
  { id: 4, lens: "Trust", text: "Our staff uses the AI as a primary tool for revenue-generating tasks, rather than a secondary task that creates 'verification labor'." },
  { id: 5, lens: "Govern", text: "Our AI oversight and governance protocols work identically across all departments, requiring zero 'reinvention of the wheel'." },
  { id: 6, lens: "Govern", text: "When an AI failure occurs, our system identifies the specific leader responsible for the fix in real-time, eliminating 'finger-pointing'." },
  { id: 7, lens: "Govern", text: "Our systems provide a proactive signal that triggers a human expert before an AI fluctuation impacts our P&L." },
  { id: 8, lens: "Govern", text: "We can update our internal AI safety and regulatory rules across the entire organization in a single deployment cycle." },
  { id: 9, lens: "Evolve", text: "When the system underperforms, we fix the architectural root cause rather than applying manual 'patches' to the symptoms." },
  { id: 10, lens: "Evolve", text: "Every AI initiative is stress-tested in a 'Safe-to-Fail' environment before it is allowed to touch our live operational budget." },
  { id: 11, lens: "Evolve", text: "Our AI spend has directly reduced the 'energy cost' of achieving our business goals, rather than adding a new layer of complexity." },
  { id: 12, lens: "Evolve", text: "Leadership has a high-fidelity view of the 'Promise Gap™'—we can see exactly where AI is delivering ROI and where it is creating 'noise'." },
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
      if (res.ok) router.push('/thank-you');
    } catch (e) {
      console.error("Submission error", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      {step > 0 && step <= 12 && (
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-900 z-50">
          <motion.div className="h-full bg-[#14b8a6]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
        </div>
      )}

      <main className="py-24 px-6 container mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-10 bg-slate-900/40 border-slate-800 border-2">
                <h1 className="text-3xl font-bold mb-4 font-display">ROI Recovery Audit</h1>
                <p className="text-slate-400 mb-8">Identify where your AI investment is leaking into hidden labor.</p>
                <div className="space-y-4 text-left">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Full Name</label>
                    <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded outline-none focus:border-[#14b8a6]" placeholder="Jane Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Work Email</label>
                    <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded outline-none focus:border-[#14b8a6]" placeholder="jane@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Organization</label>
                    <input className="w-full p-4 bg-slate-950 border border-slate-800 rounded outline-none focus:border-[#14b8a6]" placeholder="Acme Corp" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
                  </div>
                  <Button disabled={!formData.email || !formData.name} onClick={() => setStep(1)} className="w-full bg-[#14b8a6] text-black font-bold h-14 mt-4 hover:bg-[#0d9488]">Begin Observation</Button>
                </div>
              </Card>
            </motion.div>
          ) : step <= 12 ? (
            <motion.div key="question" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <p className="text-[#14b8a6] font-mono text-sm mb-4">SIGNAL {step} OF 12</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-10 leading-tight">{diagnosticQuestions[step - 1].text}</h2>
              <div className="grid gap-3">
                {ROI_SCALE.map(opt => (
                  <Button key={opt} variant="outline" className="h-16 border-slate-800 hover:border-[#14b8a6] justify-start px-6 text-lg transition-all" onClick={() => handleAnswer(opt)}>
                    {opt}
                  </Button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <Activity className="h-16 w-16 text-[#14b8a6] mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Observation Complete</h2>
              <p className="text-slate-400 mb-10">Data captured for {formData.organization}. Ready for synthesis.</p>
              <Button onClick={submitResults} disabled={isSubmitting} className="bg-[#14b8a6] text-black font-bold h-16 w-full text-lg">
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
