"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TRIAD_DATA = [
  { title: "Human Alignment", q: "Do your AI outputs match your human expectations?", f: "FRACTURE: Customer service tools issuing incorrect data to users.", risk: "Ignoring this fracture erodes customer trust and exposes legal risk.", fix: "Forensic Logging identifies the gap between intention and reality.", node: "HAI NODE" },
  { title: "Business Value", q: "Does your tool provide a clear return on investment?", f: "FRACTURE: AI costs exceeding realized labor savings.", risk: "Ignoring this leads to wasted budgets and executive skepticism.", fix: "We align machine execution with realized operational value.", node: "AVS NODE" },
  { title: "Safe Evolution", q: "Is your AI drifting into unknown risks?", f: "FRACTURE: Hallucinating models training on bad data.", risk: "Ignoring this leads to public failure and exposure.", fix: "Constant integrity monitoring prevents system drift.", node: "IGF NODE" }
];

export default function MethodologyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30 text-left overflow-x-hidden">
      <Header />
      {/* ADJUSTED PADDING: px-6 for mobile, px-10 for desktop */}
      <main className="flex-grow pt-32 md:pt-48 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
          
          {/* FIX 1: Responsive Font Sizes for the Main Title */}
          <section id="forensic-integrity" style={{ scrollMarginTop: '140px' }} className="space-y-8 border-l-4 border-red-600 pl-6 md:pl-12 text-left">
            <h1 className="text-5xl md:text-[110px] font-black uppercase italic tracking-tighter leading-[0.9] md:leading-[0.8]">
              The Key <br /> To Forensic <br /> <span className="text-red-600">Integrity.</span>
            </h1>
            <div className="text-slate-400 text-lg md:text-2xl italic max-w-3xl leading-relaxed font-medium space-y-6">
              <p>BMR Solutions identifies the fractures where AI falls short of strategic goals.</p>
              <p className="text-white">Every day you wait, these fractures grow.</p>
            </div>
          </section>

          {/* FIX 2: Triad Grid. Stacks vertically on mobile automatically */}
          <section id="integrity-triad" style={{ scrollMarginTop: '140px' }} className="py-12 md:py-20 border-y border-slate-900 text-left">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-12 md:mb-16">
              The <span className="text-red-600">Integrity Triad</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {TRIAD_DATA.map((layer, i) => (
                <div key={i} className="p-8 md:p-10 border border-slate-800 bg-slate-900/10 flex flex-col justify-between min-h-[400px] md:min-h-[450px]">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black mb-4 italic uppercase text-white">{layer.title}</h3>
                    <p className="text-sm md:text-base text-slate-400 mb-6 italic font-bold">{layer.q}</p>
                    <div className="space-y-4 text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-left leading-relaxed">
                      <p className="text-red-600 font-black">{layer.f}</p>
                      <p className="text-slate-500">THE RISK: {layer.risk}</p>
                      <p className="text-green-500">THE BMR FIX: {layer.fix}</p>
                    </div>
                  </div>
                  <div className="text-[10px] md:text-[11px] text-slate-700 font-mono font-bold tracking-[0.4em] uppercase mt-8 border-t border-slate-800 pt-4">
                    {layer.node} // SECURED
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FIX 3: Rework Tax. Stack button below text on mobile */}
          <section id="rework-tax" style={{ scrollMarginTop: '140px' }} className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 py-12 text-left">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">Rework Tax <span className="text-red-600">Exposure</span></h2>
              <p className="text-slate-400 text-lg md:text-xl italic font-medium leading-relaxed">There is a hidden tax for unreliable automation that every organization pays.</p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 p-8 md:p-12 lg:mt-20">
              <button onClick={() => router.push('/pulse-check')} className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-[0.2em] md:tracking-[0.3em] hover:bg-white hover:text-black transition-all text-xs md:text-sm">
                INITIALIZE FULL EXPOSURE AUDIT
              </button>
            </div>
          </section>

          {/* FIX 4: Vault CTA. Smaller padding for mobile */}
          <section className="py-12 md:py-20 bg-red-600/5 border border-red-600/20 p-8 md:p-16 mb-20 text-left">
            <div className="max-w-3xl space-y-6 md:space-y-8">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-red-600">The Evidence Vault</h2>
              <p className="text-lg md:text-2xl text-slate-300 leading-relaxed italic font-medium">Access forensic analysis nodes.</p>
              <button 
                onClick={() => router.push('/vault')}
                className="inline-flex items-center gap-4 md:gap-6 py-6 px-8 md:px-12 bg-red-600 hover:bg-white hover:text-black text-white font-black uppercase italic transition-all tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm"
              >
                Access The Vault <ChevronRight size={20} />
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
