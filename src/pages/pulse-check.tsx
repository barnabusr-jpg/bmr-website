"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';
import { Lock, Landmark, HeartPulse, Factory, ShoppingCart } from 'lucide-react';

export default function PulseCheck() {
  const router = useRouter();

  const handleStartAudit = (node: string) => {
    // 🛡️ FIX: Redirecting to the 'diagnostic' folder and the node's specific page
    // This assumes you have executive.tsx, managerial.tsx, and technical.tsx 
    // inside your src/pages/diagnostic/ folder.
    router.push(`/diagnostic/${node.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white italic selection:bg-red-600/30 font-sans">
      <Header />
      <main className="pt-40 pb-32 max-w-[1400px] mx-auto px-6 text-center">
        
        {/* 2.0 HEADLINE */}
        <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none mb-8">
          AI <span className="text-red-600">EFFICIENCY</span> AUDIT
        </h1>
        <p className="text-slate-500 text-xl md:text-2xl font-bold uppercase max-w-3xl mx-auto mb-24 italic">
          Most AI systems leak capital through manual rework. Identify your Operational Focus to begin.
        </p>

        {/* STEP 1 SELECTION */}
        <div className="mb-32">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-[1px] w-24 bg-red-600/30" />
            <h3 className="text-red-600 font-mono text-xs font-black tracking-[0.5em] uppercase italic">STEP 1: SELECT YOUR PERSPECTIVE</h3>
            <div className="h-[1px] w-24 bg-red-600/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((node) => (
              <button 
                key={node} 
                onClick={() => handleStartAudit(node)} 
                className="group p-12 border border-slate-900 bg-slate-950/50 hover:border-red-600 transition-all text-center relative overflow-hidden shadow-2xl"
              >
                <Lock className="mx-auto mb-6 text-slate-700 group-hover:text-red-600 transition-colors" size={24} />
                <h4 className="text-2xl font-black italic uppercase text-slate-400 group-hover:text-white mb-2 italic">{node}</h4>
                <p className="text-[9px] font-mono text-slate-700 uppercase tracking-widest italic group-hover:text-red-600 italic">
                  {node === 'EXECUTIVE' ? 'FIDUCIARY & GOVERNANCE' : node === 'MANAGERIAL' ? 'OPERATIONAL EFFICIENCY' : 'STRUCTURAL EXECUTION'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* INDUSTRY SECTORS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 opacity-30 hover:opacity-100 transition-opacity">
          {[
            { name: 'FINANCE', sub: 'COMPLIANCE', icon: Landmark },
            { name: 'HEALTHCARE', sub: 'LIABILITY', icon: HeartPulse },
            { name: 'INDUSTRIAL', sub: 'OPERATIONS', icon: Factory },
            { name: 'SERVICES', sub: 'LABOR', icon: ShoppingCart },
          ].map((card) => (
            <div key={card.name} className="p-10 border border-slate-900 bg-slate-950/20 text-left group hover:border-red-600 transition-all">
              <card.icon className="text-red-600/30 mb-12 group-hover:text-red-600" size={24} />
              <h5 className="text-3xl font-black italic uppercase text-slate-800 group-hover:text-white transition-colors italic">{card.name}</h5>
              <p className="text-[9px] font-mono text-red-600 font-black tracking-widest italic">{card.sub}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
