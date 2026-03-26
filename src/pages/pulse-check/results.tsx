import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { AlertTriangle, Zap, ShieldAlert, Activity } from 'lucide-react';

type Archetype = 'ReplacementTrap' | 'HollowChevron' | 'ShadowShear' | 'CollectiveDelusion';

interface ResultData {
  archetype: Archetype;
  deltaGap: number;
  reworkTax: number;
  shadowAI: number;
  expertiseDebt: number;
  financialImpact: number;
  fractureVelocity: number;
  perspective: string;
}

export default function PulseCheckResults() {
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('bmr_results');
    if (data) {
      try {
        setResult(JSON.parse(data));
      } catch (e) {
        console.error("Forensic Data Corruption", e);
      }
    }
  }, []);

  if (!result) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-mono text-red-600 uppercase tracking-widest gap-4">
      <Activity className="animate-pulse h-8 w-8" /> 
      <span>Analyzing Forensic Data...</span>
    </div>
  );

  const daysToCollapse = Math.round(Math.abs(10 / result.fractureVelocity) * 30);

  const roadmap = {
    ReplacementTrap: [
      { title: "Audit Training Data", desc: "Identify toxic data increasing Rework Tax." },
      { title: "Block Unsanctioned Tools", desc: "Eliminate Shadow AI compliance risks." }
    ],
    HollowChevron: [
      { title: "Manual Task Drills", desc: "Ensure staff can perform tasks without AI." },
      { title: "Log Overrides", desc: "Track when humans override AI decisions." }
    ],
    ShadowShear: [
      { title: "Enforce Governance", desc: "Bring all AI tools under compliance." },
      { title: "Audit Data Leakage", desc: "Secure data being input into unsanctioned tools." }
    ],
    CollectiveDelusion: [
      { title: "Friction Reviews", desc: "Align executive and frontline perceptions." },
      { title: "Stress-Test Outputs", desc: "Identify fragility under high-volume." }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600">
      <Head><title>BMR | Verdict: {result.archetype}</title></Head>
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center py-16 border border-slate-900 bg-slate-900/20 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
            <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-6" />
            
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">
              {result.archetype.replace(/([A-Z])/g, ' $1').trim()}
            </h1>

            <div className="max-w-xl mx-auto px-6 space-y-8">
              <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em] border-y border-slate-800 py-4 text-center">
                System Decay Rate: <span className="text-red-600">{result.fractureVelocity}/mo</span> | Collapse in {daysToCollapse} Days
              </p>

              {/* DIVERGENCE METER */}
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Divergence (Δ)</span>
                  <span className="text-3xl font-black italic text-red-600">{result.deltaGap}</span>
                </div>
                <div className="w-full bg-slate-900 h-4 border border-slate-800 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${(result.deltaGap / 10) * 100}%` }} 
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" 
                  />
                </div>
              </div>

              {/* PROFIT HEMORRHAGE */}
              <div className="bg-red-600/10 border border-red-600/30 p-8 text-center">
                <div className="text-[10px] font-black text-red-600 uppercase mb-2 tracking-widest">Annual Profit Hemorrhage</div>
                <div className="text-5xl font-black text-red-600">${result.financialImpact.toFixed(1)}M</div>
                <div className="text-[10px] text-slate-500 mt-4 uppercase text-center">
                  Rework: ${result.reworkTax.toFixed(1)}M | Shadow: ${result.shadowAI.toFixed(1)}M
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-12 px-6">
              <button onClick={() => window.location.href='/audit'} className="bg-red-600 p-6 flex flex-col items-center group transition-all">
                <Zap className="h-5 w-5 mb-2" />
                <span className="font-black text-[10px] tracking-widest uppercase">Run 30-Question Audit</span>
              </button>
              <button onClick={() => window.open('https://calendly.com/bmr', '_blank')} className="bg-white text-black p-6 flex flex-col items-center group transition-all">
                <ShieldAlert className="h-5 w-5 mb-2" />
                <span className="font-black text-[10px] tracking-widest uppercase">Book Emergency Triage</span>
              </button>
            </div>
          </div>

          <div className="border border-slate-900 p-8 bg-slate-900/20">
            <h2 className="text-xl font-black uppercase italic mb-6 text-center md:text-left">Hardening Roadmap</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {roadmap[result.archetype].map((step, i) => (
                <div key={i} className="flex gap-4 text-left">
                  <div className="text-red-600 font-black">0{i+1}</div>
                  <div>
                    <div className="font-bold uppercase text-xs">{step.title}</div>
                    <div className="text-slate-500 text-sm mt-1">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
