"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserCheck, BarChart3, ShieldCheck, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

export default function MethodologyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* SECTION 1: THE HERO */}
          <section className="text-left space-y-6 border-l-2 border-red-600 pl-8">
            <h1 className="text-[70px] md:text-[90px] font-black uppercase italic tracking-tighter leading-[0.85]">
              The Key <br /> To Forensic <br /> <span className="text-red-600">Integrity.</span>
            </h1>
            <div className="text-slate-400 text-lg italic max-w-2xl leading-relaxed font-medium">
              <p>BMR Solutions identifies the fractures where artificial intelligence falls short of your strategic goals.</p>
              <p className="text-white mt-2">These fractures cost organizations millions in rework and legal exposure while eroding trust.</p>
              <p className="mt-2 text-red-600 font-bold">Every day you wait, these fractures grow. They turn small leaks into catastrophic failures.</p>
              <p className="mt-2">We help identify and protect logic chains before architectural collapse becomes inevitable.</p>
            </div>
          </section>

          {/* SECTION 2: THE INTEGRITY TRIAD */}
          <section className="py-10 border-y border-slate-900">
            <div className="mb-10 text-left">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">
                The <span className="text-red-600 font-black">Integrity Triad</span>
              </h2>
              <p className="text-sm text-slate-500 max-w-3xl italic">
                This is accomplished by examining distinct logic nodes to ensure your organization remains aligned 
                on the factors that keep your organization out of the danger zones.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Human Alignment", 
                  q: "Do your AI outputs match your human expectations?", 
                  f: "FRACTURE: Customer service tools issuing incorrect data to users.", 
                  risk: "Ignoring this fracture erodes customer trust and exposes the company to potential lawsuits.",
                  fix: "Forensic Logging identifies the gap between intention and reality to ensure outputs match your expectations.",
                  node: "HAI NODE" 
                },
                { 
                  title: "Business Value", 
                  q: "Does your tool provide a clear return on investment?", 
                  f: "FRACTURE: AI costs exceeding realized labor savings.", 
                  risk: "Ignoring this fracture leads to wasted budgets and executive skepticism.",
                  fix: "We align machine execution with realized operational value to stop capital leaks.",
                  node: "AVS NODE" 
                },
                { 
                  title: "Safe Evolution", 
                  q: "Is your AI drifting into new and unknown risks?", 
                  f: "FRACTURE: Hallucinating models that continue to train on bad data.", 
                  risk: "Ignoring this fracture leads to public failures and legal exposure.",
                  fix: "Constant integrity monitoring prevents system drift before it reaches the public.",
                  node: "IGF NODE" 
                }
              ].map((layer, i) => (
                <div key={i} className="p-8 border border-slate-800 bg-slate-900/10 group hover:border-red-600/40 transition-all text-left">
                  <h3 className="text-xl font-black mb-3 italic uppercase tracking-tighter text-white">{layer.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed italic font-bold">{layer.q}</p>
                  <p className="text-[10px] text-red-600 font-mono font-bold uppercase mb-2 tracking-widest leading-tight">
                    {layer.f}
                  </p>
                  <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest mb-4">
                    THE RISK: {layer.risk}
                  </p>
                  <p className="text-[9px] text-green-500/70 font-mono uppercase tracking-widest mb-6">
                    THE BMR FIX: {layer.fix}
                  </p>
                  <div className="text-[10px] text-slate-800 font-mono font-bold tracking-[0.3em] uppercase">
                    {layer.node} // SECURED
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: REWORK TAX EXPOSURE */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-6 text-left">
            <div className="space-y-6">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                Rework Tax <span className="text-red-600 font-black">Exposure</span>
              </h2>
              <div className="text-slate-400 text-base italic leading-relaxed font-medium">
                <p>There is a hidden tax for unreliable automation that every organization pays.</p>
                <p className="block mt-4 text-white font-bold italic">For a team of ten experts spending 20% of their time fixing AI mistakes, this tax can exceed $500,000 per year.</p>
                <p className="mt-4 text-red-600 font-bold italic">This is money drained from innovation, growth, and shareholder value every year.</p>
                <p className="mt-4">These taxes are levied when experts spend hours fixing machine errors or when junior staff are unable to identify system drift. At BMR Solutions, we use proprietary industry benchmarks to identify these capital leaks.</p>
              </div>
            </div>
            <div className="bg-slate-900/20 border border-slate-900 p-8">
               <p className="text-sm text-slate-300 italic leading-relaxed mb-6 font-bold">
                 Contrary to belief, Rework Tax is not a simple math formula. It is identified through 
                 a full Forensic Triage protocol.
               </p>
               <button 
                  onClick={() => router.push('/pulse-check')}
                  className="w-full py-4 bg-red-600 text-white font-black uppercase italic tracking-[0.2em] hover:bg-white hover:text-black transition-all text-xs"
                >
                  INITIALIZE FULL EXPOSURE AUDIT
                </button>
            </div>
          </section>

          {/* SECTION 4: CASE STUDY */}
          <section className="py-10 bg-slate-900/10 border-t border-slate-900 text-left">
            <div className="max-w-4xl space-y-8">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-red-600 font-black">
                The Cost of the Silent Divergence
              </h2>
              <p className="text-slate-400 text-sm italic font-medium leading-relaxed">
                Consider an organization that implements a high-scale automated system. On day one, 
                the system is perfect. However, over time, the machine logic drifts away from the 
                original corporate policy. This is not a computer crash. It is a slow, quiet divergence.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-b border-slate-900 pb-8">
                <div className="space-y-2 border-l border-slate-800 pl-4">
                   <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">The Executive Risk</p>
                   <p className="text-xs text-slate-500 italic">The board believes the company follows a specific legal strategy while AI executes a high-risk path.</p>
                </div>
                <div className="space-y-2 border-l border-slate-800 pl-4">
                   <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">The Operational Drain</p>
                   <p className="text-xs text-slate-500 italic">Staff spends hours every day correcting errors created by a system that was supposed to save time.</p>
                </div>
                <div className="space-y-2 border-l border-slate-800 pl-4">
                   <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">The Public Failure</p>
                   <p className="text-xs text-slate-500 italic">Users receive incorrect data. This leads to negative headlines, public loss of trust, and potential legal investigation.</p>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="p-6 bg-slate-900/30 border border-slate-800">
                   <h3 className="text-lg font-black italic uppercase tracking-tighter text-red-600 mb-4 font-black">The BMR Fix</h3>
                   <p className="text-slate-400 text-sm italic leading-relaxed font-medium">
                     BMR Solutions implements a forensic logging protocol to align decisions with actions. 
                     Within thirty days, the Systemic Friction Index is restored. Logic is realigned, and legal exposure is eliminated.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-6 border border-red-900/30 bg-red-950/5">
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-4 font-black">Before BMR (simulation)</p>
                      <ul className="text-xs text-slate-500 space-y-2 font-mono">
                        <li>15% Systemic Friction Index</li>
                        <li>$1.2M Legal Exposure</li>
                        <li>$500K Annual Rework Tax</li>
                      </ul>
                   </div>
                   <div className="p-6 border border-green-900/30 bg-green-950/5 text-left">
                      <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-4 font-black">After BMR (simulation)</p>
                      <ul className="text-xs text-slate-400 space-y-2 font-mono">
                        <li className="text-green-400 font-bold">82% Systemic Friction Index</li>
                        <li className="text-green-400 font-bold">Legal Exposure Eliminated</li>
                        <li className="text-green-400 font-bold">Rework Tax Cut by 40%</li>
                      </ul>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: BOARDROOM BRIEFING */}
          <section className="py-12 bg-slate-900/20 border border-slate-900 p-10 text-left relative overflow-hidden">
            <div className="max-w-4xl space-y-6 relative z-10">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white font-black">
                Boardroom Briefing
              </h2>
              <p className="text-slate-400 text-base italic leading-relaxed font-medium">
                The board expects AI to deliver strategic value. When it does not, the consequences are severe:
              </p>
              <ul className="space-y-4 text-slate-300 text-sm italic list-none">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-black mt-1">/</span>
                  <p><span className="text-white font-black italic uppercase tracking-widest text-[10px] mr-2">Legal Exposure:</span> AI-driven errors can void contracts and trigger lawsuits.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-black mt-1">/</span>
                  <p><span className="text-white font-black italic uppercase tracking-widest text-[10px] mr-2">Reputation Risk:</span> Public failures erode trust and damage brand value.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-black mt-1">/</span>
                  <p><span className="text-white font-black italic uppercase tracking-widest text-[10px] mr-2">Capital Leaks:</span> Rework tax drains budgets and reduce ROI.</p>
                </li>
              </ul>
              <p className="text-slate-400 text-base italic leading-relaxed mt-6">
                BMR Solutions provides the forensic evidence the board needs to trust your AI investments. 
                Without it, your AI initiatives are a ticking time bomb, and you are one bad headline away from disaster.
              </p>
            </div>
          </section>

          {/* SECTION 6: THE AI TIME BOMB */}
          <section className="py-12 bg-red-600/5 border border-red-600/20 p-10 text-left">
            <div className="max-w-3xl space-y-6">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-red-600 font-black">
                The AI Time Bomb
              </h2>
              <div className="text-base text-slate-300 leading-relaxed italic font-medium">
                <p>Systemic decay is a silent killer. Logic fractures weaken contracts while 
                increasing the verification burden on your best people. The longer these fractures 
                exist, the more expensive the recovery.</p>
                <p className="block mt-4 text-white font-bold italic">Every day you wait, the cost fractures increase by two percent.</p>
              </div>
              <button 
                onClick={() => router.push('/pulse-check')}
                className="inline-flex items-center gap-4 py-4 px-8 bg-red-600 hover:bg-white hover:text-black text-white font-black uppercase italic transition-all tracking-[0.2em] text-xs font-black shadow-[0_0_20px_rgba(220,38,38,0.15)]"
              >
                Run The Forensic Triage <ChevronRight size={16} />
              </button>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}

