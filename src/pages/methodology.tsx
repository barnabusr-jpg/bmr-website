"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight, ShieldCheck, Activity, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/router';

export default function MethodologyPage() {
  const router = useRouter();

  const forensicNodes = [
    { id: "NODE_01", title: "Executive Triangulation", icon: ShieldCheck, desc: "Aligning institutional intent with machine execution." },
    { id: "NODE_02", title: "Managerial Recovery", icon: TrendingUp, desc: "Identifying labor gaps and reclaiming capacity." },
    { id: "NODE_03", title: "Technical Hardening", icon: Activity, desc: "Neutralizing operational logic drift." }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans text-left italic">
      <Header />
      <main className="flex-grow pt-48 pb-20 px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto space-y-32 text-left">
          <header className="border-l-8 border-red-600 pl-10 md:pl-16">
            <h2 className="text-red-600 font-mono text-xs font-black tracking-[0.5em] uppercase italic mb-6">PROTOCOL // TRIANGULATION</h2>
            <h1 className="text-7xl md:text-[120px] font-black italic uppercase tracking-tighter leading-[0.8] m-0">Our <br /><span className="text-slate-800">Process.</span></h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {forensicNodes.map((node, i) => (
              <div key={i} className="border-t-2 border-slate-900 pt-10 group">
                <div className="flex justify-between items-start mb-8">
                  <node.icon size={32} className="text-red-600" />
                  <span className="text-[10px] font-mono text-slate-800 font-black tracking-widest">{node.id}</span>
                </div>
                <h3 className="text-3xl font-black italic uppercase mb-6 group-hover:text-red-600 transition-colors">{node.title}</h3>
                <p className="text-slate-500 font-medium italic leading-relaxed text-lg uppercase">{node.desc}</p>
              </div>
            ))}
          </div>

          {/* 🛡️ VAULT CARD: FIXED ROUTING TO /briefings */}
          <section className="bg-white p-12 md:p-24 text-left shadow-2xl border-l-[24px] border-red-600 relative overflow-hidden">
            <div className="max-w-3xl space-y-10 relative z-10 text-left">
              <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-black leading-none italic">The Evidence <br /><span className="text-red-600 italic">Vault.</span></h2>
              <p className="text-2xl md:text-3xl text-slate-600 italic font-black uppercase tracking-tight">Access protected forensic briefings to see where systemic decay occurs in enterprise AI.</p>
              <button 
                onClick={() => router.push('/briefings')} 
                className="inline-flex items-center gap-6 py-8 px-14 bg-red-600 hover:bg-black text-white font-black uppercase italic tracking-[0.3em] text-lg"
              >
                ACCESS THE VAULT <ChevronRight size={28} />
              </button>
            </div>
          </section>

          <div className="text-center py-32 border-t border-slate-900">
            <button 
              onClick={() => router.push('/pulse-check')}
              className="bg-white text-black py-10 px-20 font-black uppercase italic tracking-[0.4em] text-xl hover:bg-red-600 hover:text-white transition-all border-l-[20px] border-red-600 shadow-2xl"
            >
              INITIATE_DIAGNOSTIC
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
