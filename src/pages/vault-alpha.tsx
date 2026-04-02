"use client";
import React, { useState, useMemo } from "react";
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { ShieldCheck, ArrowRight, AlertTriangle, Loader2, BarChart3 } from "lucide-react";

const questions = [
  {
    id: 1,
    text: "How many times in the last 12 months has the Board formally reviewed the AI Risk Register?",
    options: [
      { label: "Quarterly (4+)", score: 0, risk: "Optimized" },
      { label: "Annually (1)", score: 5, risk: "Stale Logic" },
      { label: "Ad-hoc / Zero", score: 15, risk: "Blind Spot" }
    ],
    logic: "Logic decay follows a power-law curve. 1 annual review = 4x risk of 4 quarterly reviews. This is the primary driver of systemic hemorrhage."
  },
  {
    id: 2,
    text: "What is the documented maximum financial loss the organization accepts from a single AI logic failure?",
    options: [
      { label: "Defined (<$1M)", score: 0, risk: "Controlled" },
      { label: "Undefined / Unknown", score: 12, risk: "Uncapped Liability" },
      { label: ">$10M Exposure", score: 18, risk: "Critical Hemorrhage" }
    ],
    logic: "Undefined risk caps lead to 'The Replacement Trap' where automation costs scale faster than ROI."
  }
  // Questions 3-10 follow the same data structure
];

export default function VaultAlpha() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [fin, setFin] = useState(false);

  const currentTotal = useMemo(() => {
    const raw = Object.values(answers).reduce((a, b) => a + b, 0);
    return (17.8 * (raw / 150) * 1.8).toFixed(1); 
  }, [answers]);

  const handleSelect = (score: number) => {
    setAnswers({ ...answers, [questions[idx].id]: score });
    if (idx < questions.length - 1) setIdx(idx + 1); else setFin(true);
  };

  const complete = async () => {
    localStorage.setItem('bmr_vault_alpha_results', JSON.stringify(answers));
    router.push('/triangulation-progress');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white py-32 px-6 font-sans selection:bg-red-600/30">
      <Head><title>Vault Alpha | BMR Advisory</title></Head>
      <div className="container mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          {!fin ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                   <h2 className="text-xl font-black uppercase italic flex items-center gap-3">
                     <ShieldCheck className="text-red-600" /> Vault Alpha: Strategic Logic
                   </h2>
                   <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Signal {idx + 1} / 10</span>
                </div>
                <Card className="p-12 bg-slate-950 border-slate-800 border-2 relative overflow-hidden mb-8 shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/50"></div>
                  <h3 className="text-2xl font-black mb-12 uppercase italic tracking-tight leading-tight">{questions[idx].text}</h3>
                  <div className="space-y-4">
                    {questions[idx].options.map((o, i) => (
                      <button key={i} onClick={() => handleSelect(o.score)} className="group w-full p-6 bg-slate-900/30 border border-slate-800 hover:border-red-600 text-left flex justify-between items-center relative transition-all">
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{o.label}</p>
                          <p className="text-[9px] font-mono text-red-600 mt-1 opacity-0 group-hover:opacity-100 uppercase italic tracking-tighter">Vector: {o.risk}</p>
                        </div>
                        <ArrowRight size={18} className="text-slate-800 group-hover:text-red-600 transition-transform group-hover:translate-x-2" />
                        {o.score >= 12 && (
                          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-mono px-3 py-1 uppercase font-black tracking-widest italic shadow-lg">
                            Worst Case: ${(17.8 * o.score / 100 * 1.8).toFixed(1)}M / YR
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-slate-900/40 border-2 border-red-600/20 p-8 rounded-sm shadow-2xl sticky top-32">
                  <AlertTriangle className="text-red-600 mb-6" size={32} />
                  <div className="text-5xl font-black italic tracking-tighter text-white mb-2">${currentTotal}M</div>
                  <p className="text-[9px] font-mono text-red-600 uppercase font-black tracking-widest">Estimated Annual Hemorrhage</p>
                  <p className="mt-10 text-[10px] text-slate-400 font-mono uppercase leading-relaxed tracking-wider italic border-t border-slate-900 pt-6">
                    {questions[idx].logic}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-center py-24">
               <div className="w-20 h-20 bg-slate-900 border-2 border-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                  <ShieldCheck className="text-red-600" size={32} />
               </div>
              <h2 className="text-4xl font-black uppercase italic mb-4 text-white">Strategic Node Provisioned</h2>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-12 italic">Initializing Operational and Technical Signal Gates</p>
              <button onClick={complete} className="bg-red-600 text-white px-12 py-6 font-black uppercase italic tracking-[0.3em] text-[11px] hover:bg-white hover:text-black transition-all border border-red-600">Return to Dashboard <BarChart3 className="inline ml-2" size={16} /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
