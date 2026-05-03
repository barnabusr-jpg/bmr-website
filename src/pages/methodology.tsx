"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TRIAD_DATA = [
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
];

export default function MethodologyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30 text-left">
      <Header />
      
      <main className="flex-grow pt-48 pb-20 px-6">
        <div className="max-w-5xl mx-auto space-y-32 text-left">
          
          {/* SECTION 1: HERO */}
          <section id="forensic-integrity" style={{ scrollMarginTop: '140px' }} className="space-y-8 border-l-4 border-red-600 pl-12 text-left">
            <h1 className="text-[80px] md:text-[110px] font-black uppercase italic tracking-tighter leading-[0.8]">
              The Key <br /> To Forensic <br /> <span className="text-red-600">Integrity.</span>
            </h1>
            <div className="text-slate-400 text-2xl italic max-w-3xl leading-relaxed font-medium space-y-6">
              <p>BMR Solutions identifies the fractures where artificial intelligence falls short of your strategic goals.</p>
              <p className="text-white">These fractures cost organizations millions in rework and legal exposure while eroding trust.</p>
              <p className="text-red-600 font-bold uppercase tracking-tight text-xl">Every day you wait, these fractures grow. They turn small leaks into catastrophic failures.</p>
            </div>
          </section>

          {/* SECTION 2: THE INTEGRITY TRIAD */}
          <section id="integrity-triad" style={{ scrollMarginTop: '140px' }} className="py-20 border-y border-slate-900 text-left">
            <div className="mb-16 text-left">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-6">
                The <span className="text-red-600">Integrity Triad</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-3xl italic leading-relaxed">
                This is accomplished by examining distinct logic nodes to ensure your organization remains aligned on the factors that keep your operations out of the danger zones.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {TRIAD_DATA.map((layer, i) => (
                <div key={i} className="p-10 border border-slate-800 bg-slate-900/10 group hover:border-red-600/40 transition-all flex flex-col justify-between min-h-[450px] text-left">
                  <div>
                    <h3 className="text-2xl font-black mb-4 italic uppercase tracking-tighter text-white">{layer.title}</h3>
                    <p className="text-base text-slate-400 mb-6 leading-relaxed italic font-bold">{layer.q}</p>
                    
                    <div className="space-y-4 text-left">
                        <p className="text-[12px] text-red-600 font-mono font-black uppercase tracking-[0.2em] leading-tight">
                        {layer.f}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono uppercase tracking-widest leading-relaxed">
                        THE RISK: {layer.risk}
                        </p>
                        <p className="text-[11px] text-green-500 font-mono uppercase tracking-widest leading-relaxed">
                        THE BMR FIX: {layer.fix}
                        </p>
                    </div>
                  </div>
                  
                  <div className="text-[11px] text-slate-700 font-mono font-bold tracking-[0.4em] uppercase mt-8 border-t border-slate-800 pt-4">
                    {layer.node} // SECURED
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: REWORK TAX */}
          <section id="rework-tax" style={{ scrollMarginTop: '140px' }} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start py-12 text-left">
            <div className="space-y-8">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">
                Rework Tax <span className="text-red-600">Exposure</span>
              </h2>
              <div className="text-slate-400 text-xl italic leading-relaxed font-medium space-y-6">
                <p>There is a hidden tax for unreliable automation that every organization pays.</p>
                <p className="text-white font-bold text-2xl">For a team of ten experts spending 20% of their time fixing AI mistakes, this tax can exceed $500,000 per year.</p>
                <p className="text-red-600 font-bold text-xl uppercase tracking-tight">This is money drained from innovation, growth, and shareholder value every year.</p>
              </div>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 p-12 lg:mt-20 text-left">
               <p className="text-lg text-slate-300 italic leading-relaxed mb-8 font-bold">
                 Contrary to belief, Rework Tax is not a simple math formula. It is identified through 
                 a full Forensic Triage protocol.
               </p>
               <button 
                  onClick={() => router.push('/pulse-check')}
                  className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-[0.3em] hover:bg-white hover:text-black transition-all text-sm"
                >
                  INITIALIZE FULL EXPOSURE AUDIT
                </button>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
