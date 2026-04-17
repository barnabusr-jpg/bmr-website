"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserCheck, BarChart3, ShieldCheck, Activity, ChevronRight } from 'lucide-react';

export default function MethodologyPage() {
  // Calculator State
  const [experts, setExperts] = useState(10);
  const [percent, setPercent] = useState(30);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // The logic is hidden to protect your Intellectual Property
  const triggerAnalysis = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
      <Header />
      
      <main className="flex-grow pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* SECTION 1: THE HERO */}
          <div className="text-center space-y-12">
            <h1 className="text-[120px] font-black uppercase italic tracking-tighter leading-[0.8]">
              The <span className="text-red-600 font-black italic text-[140px]">Heart</span> <br /> 
              of Forensic <br /> Integrity.
            </h1>
            <p className="text-slate-400 text-xl italic max-w-3xl mx-auto leading-relaxed font-medium">
              BMR Advisory provides the truth about your systems. We find the fractures where 
              artificial intelligence fails to meet your strategic goals. We protect your logic chains.
            </p>
          </div>

          {/* SECTION 2: THE INTEGRITY TRIAD */}
          <section className="py-24 border-y border-slate-900">
            <h2 className="text-4xl font-black italic uppercase mb-16 tracking-tighter">
              The <span className="text-red-600">Integrity Triad</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Human Alignment", 
                  q: "Do your AI outputs match your human expectations?", 
                  f: "FRACTURE: Your customer service tool gives wrong refunds.", 
                  node: "HAI NODE" 
                },
                { 
                  title: "Business Value", 
                  q: "Does your tool provide a clear return on investment?", 
                  f: "FRACTURE: Your tool costs $500K but saves only $300K.", 
                  node: "AVS NODE" 
                },
                { 
                  title: "Safe Evolution", 
                  q: "Is your tool drifting into new and unknown risks?", 
                  f: "FRACTURE: Your model creates false info as it trains.", 
                  node: "IGF NODE" 
                }
              ].map((layer, i) => (
                <div key={i} className="p-10 border border-slate-900 bg-slate-900/20 group hover:border-red-600 transition-all relative">
                  <h3 className="text-2xl font-black mb-4 italic uppercase tracking-tighter">{layer.title}</h3>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed italic">{layer.q}</p>
                  <p className="text-[10px] text-red-600 font-mono font-bold uppercase mb-8 tracking-widest">
                    {layer.f}
                  </p>
                  <div className="text-[10px] text-slate-700 font-mono font-bold tracking-[0.3em] uppercase">
                    {layer.node} // SECURED
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: REWORK TAX EXPOSURE (BLACK BOX) */}
          <section className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">
                Rework Tax <span className="text-red-600">Exposure</span>
              </h2>
              <p className="text-slate-400 text-lg italic leading-relaxed font-medium">
                Your experts should not have to babysit artificial intelligence. When they spend 
                their day fixing machine errors, you pay a hidden tax. Use our forensic benchmark 
                to find your current annual loss.
              </p>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Number of Experts Checking AI</label>
                  <input 
                    type="number" 
                    value={experts} 
                    onChange={(e) => setExperts(parseInt(e.target.value))} 
                    className="bg-slate-950 border border-slate-800 p-6 text-white w-full outline-none focus:border-red-600 transition-all font-mono" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Estimated Verification Time (%)</label>
                  <input 
                    type="number" 
                    value={percent} 
                    onChange={(e) => setPercent(parseInt(e.target.value))} 
                    className="bg-slate-950 border border-slate-800 p-6 text-white w-full outline-none focus:border-red-600 transition-all font-mono" 
                  />
                </div>
                <button 
                  onClick={triggerAnalysis} 
                  className="w-full py-8 bg-red-600 text-white font-black uppercase italic tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                >
                  Initialize Forensic Analysis
                </button>
              </div>
            </div>

            <div className="bg-slate-900/10 border border-slate-900 p-16 h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden">
              {isCalculating ? (
                <div className="flex flex-col items-center gap-6">
                  <Activity className="text-red-600 animate-pulse" size={64} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500">Scanning Logic Nodes...</span>
                </div>
              ) : showResult ? (
                <div className="space-y-4 animate-in fade-in duration-700">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Annual Rework Tax Found</p>
                  <div className="text-7xl font-black text-white italic tracking-tighter">
                    ${(experts * 49200 * (percent / 100)).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-red-900 font-mono uppercase font-black tracking-widest mt-6 italic">
                    * Based on BMR Industry benchmarks for logic decay.
                  </p>
                </div>
              ) : (
                <p className="text-slate-800 italic text-xs uppercase tracking-[0.4em] font-black animate-pulse">
                  System Awaiting Input
                </p>
              )}
            </div>
          </section>

          {/* SECTION 4: THE AI TIME BOMB */}
          <section className="py-32 bg-red-600/5 border border-red-600/20 text-center p-12">
            <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-6xl font-black italic uppercase tracking-tighter text-red-600">
                The AI Time Bomb
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed italic font-medium">
                Every day you wait, your artificial intelligence is quietly decaying. 
                False information increases. Your contracts weaken. 
                The longer you wait, the more expensive the fix becomes.
              </p>
              <p className="text-2xl font-black text-white uppercase italic tracking-tighter">
                Act now to save 40 percent on rework costs within 90 days.
              </p>
              <button className="px-12 py-8 bg-red-600 hover:bg-white hover:text-black text-white font-black uppercase italic transition-all flex items-center gap-6 mx-auto tracking-[0.2em] text-sm">
                Run The Forensic Triage <ChevronRight size={20} />
              </button>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
