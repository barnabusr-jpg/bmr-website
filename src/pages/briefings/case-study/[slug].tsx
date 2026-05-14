"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldAlert, Activity, ArrowLeft, X, ExternalLink, Scale } from "lucide-react";

const ARCHIVE_CONTENT: Record<string, any> = {
  // ... (Keep your ARCHIVE_CONTENT data objects exactly as they are)
};

export default function CaseAutopsy() {
  const router = useRouter();
  const { slug } = router.query;
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<any>(null);
  const [showDossier, setShowDossier] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && router.isReady && slug) {
      const data = ARCHIVE_CONTENT[slug as string];
      if (data) { setActive(data); } else { router.push('/briefings'); }
    }
  }, [mounted, router.isReady, slug, router]);

  if (!mounted || !active) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <Activity className="animate-spin text-red-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 overflow-x-hidden uppercase font-black">
      <Header />
      <main className="pt-44 pb-24 px-6 max-w-7xl mx-auto text-left relative">
        <button onClick={() => router.push('/briefings')} className="flex items-center gap-3 text-slate-600 hover:text-white transition-all font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-16 italic">
          <ArrowLeft size={14} /> BACK_TO_THE_VAULT
        </button>

        <div className="border-l-8 border-red-600 pl-10 mb-20 max-w-5xl">
          <span className="text-red-600 font-mono text-[11px] font-black uppercase tracking-[0.4em]">IDENTIFIED_NODE: {active.node}</span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mt-4 italic">{active.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div className="bg-white p-10 md:p-14 text-slate-950 shadow-2xl border-l-[12px] border-red-600 flex-grow">
              <div className="flex items-center gap-3 text-red-600 font-mono text-[10px] font-black uppercase tracking-widest mb-8 italic"><ShieldAlert size={18} /> FORENSIC_AUTOPSY_REPORT</div>
              <p className="text-xl md:text-3xl font-black uppercase italic leading-tight mb-12">{active.analysis}</p>
              <button onClick={() => setShowDossier(true)} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-red-600 border-b-2 border-red-600 pb-1 hover:text-black hover:border-black transition-all italic underline-offset-4 font-black">VIEW_DOSSIER // DEEP_DIVE <ExternalLink size={12} /></button>
            </div>
            
            {/* 🛡️ METHODOLOGY: Updated to Forensic Standard */}
            <div className="bg-slate-900/50 border border-slate-800 p-10 md:p-14 shadow-2xl flex flex-col gap-8">
              <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] font-black uppercase tracking-widest italic"><Scale size={18} /> THE_BMR_LOGIC_BASELINE</div>
              <div className="space-y-6">
                <h4 className="text-2xl font-black text-white italic tracking-tight">METHODOLOGY: FORENSIC DIVERGENCE</h4>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-black normal-case italic">
                  This autopsy is generated through the lens of the **BMR Forensic Framework**—a methodology forged in high-stakes environments where a 1% logic shear isn't a glitch, it's a catastrophic liability. 
                </p>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-black normal-case italic">
                  Traditional cybersecurity identifies bugs; BMR identifies <span className="text-red-600 font-black uppercase">Fractures</span>. By mapping the distance between executive fiduciary duty and autonomous privilege, we stop market volatility before it manifests.
                </p>
              </div>
            </div>

            {/* PRIMARY CTA: Standardized Verbiage */}
            <button 
              onClick={() => router.push('/audit')} 
              className="w-full bg-red-600 text-white py-8 font-black uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all shadow-2xl italic text-xl border-2 border-red-600"
            >
              INITIALIZE_RECOVERY_CONSULT
            </button>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-8 h-full min-h-full">
            <div className="bg-slate-950 border border-slate-900 p-8 md:p-10 shadow-2xl flex flex-col justify-center min-h-[450px] flex-grow">
              <div className="flex items-center gap-3 text-red-600 mb-8">
                <Activity size={16} className="animate-pulse" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic tracking-[0.3em]">IMPACT_METRIC</span>
              </div>
              <div className="text-red-600 font-black text-[clamp(1.5rem,3.5vw,2.5rem)] uppercase italic leading-[1.1] tracking-tighter break-words underline decoration-4 underline-offset-[10px]">
                {active.impact}
              </div>
            </div>
            
            {/* 🗑️ REDUNDANT BUTTON REMOVED FROM ASIDE */}
          </aside>
        </div>

        {/* DOSSIER MODAL */}
        {showDossier && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 italic">
            <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-sm" onClick={() => setShowDossier(false)} />
            <div className="bg-white text-slate-950 max-w-2xl w-full p-12 shadow-2xl relative z-10 border-t-[16px] border-red-600 italic">
              <button onClick={() => setShowDossier(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-600 transition-colors"><X size={24} /></button>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-10 italic leading-none">PRIMARY_EVIDENCE_LOG</h3>
              <div className="space-y-6">
                {active.dossierBody.map((paragraph: string, i: number) => (
                  <p key={i} className="text-base font-black leading-relaxed uppercase italic text-slate-800 border-l-2 border-slate-200 pl-6">{paragraph}</p>
                ))}
              </div>
              <div className="mt-12 pt-6 border-t border-slate-100 font-mono text-[9px] text-slate-400 uppercase tracking-widest font-black leading-tight italic">CITED_MATERIAL: {active.citation}</div>
              <button onClick={() => setShowDossier(false)} className="mt-8 w-full bg-slate-950 text-white py-4 font-black uppercase tracking-widest text-[11px] hover:bg-red-600 transition-all shadow-xl italic font-black">CLOSE_DOSSIER</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
