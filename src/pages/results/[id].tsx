"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Activity, BarChart3, ArrowRight, ShieldAlert, Target, Sliders, Zap } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query;
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // 🎚️ Simulator States
  const [liveSpend, setLiveSpend] = useState<number>(1.2);
  const [fteCount, setFteCount] = useState<number>(5);

  useEffect(() => {
    const urlId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : null;
    const finalId = id || urlId;
    if (!finalId || finalId === '[id]' || finalId === 'results') return;

    const fetchAuditData = async (retryCount = 0) => {
      const cleanUUID = String(finalId).trim().toLowerCase();
      const { data, error } = await supabase.from('audits').select('*').eq('id', cleanUUID).maybeSingle();

      if (data) {
        setReportData(data);
        // Set initial slider values based on DB if available, else use defaults
        setLiveSpend(parseFloat(data.ai_spend) || 1.2);
        setFteCount(Math.round((parseFloat(data.ai_spend) * 1000000) / 200000) || 5);
        setLoading(false);
      } else if (retryCount < 5) {
        setTimeout(() => fetchAuditData(retryCount + 1), 1000);
      } else {
        setLoading(false);
      }
    };
    fetchAuditData();
  }, [id, router.isReady]);

  // 🧪 Live Forensic Logic (Linked to Sliders)
  const forensics = useMemo(() => {
    if (!reportData) return null;
    const decayPct = parseFloat(reportData.decay_pct) || 0;
    
    // Annual Labor Waste: (Decay * 0.4) * (FTEs * Avg Salary * Overhead)
    const laborWaste = (decayPct / 100) * 0.4 * (fteCount * 160000 * 1.3);
    
    // Total Capital Exposure: (20% of Spend * Risk Multiplier)
    const capitalExposure = (0.2 * (liveSpend * 1000000)) * 1.15;

    return {
      decay: decayPct,
      laborWaste,
      capitalExposure,
      status: decayPct > 60 ? "CRITICAL_FRACTURE" : "STABLE_DRIFT"
    };
  }, [reportData, liveSpend, fteCount]);

  if (loading) return (
    <div className="bg-[#020617] min-h-screen text-red-600 flex flex-col items-center justify-center font-mono italic animate-pulse tracking-[0.4em] uppercase">
      <Activity size={48} className="mb-4" /> SYNTHESIZING_VERDICT...
    </div>
  );

  if (!reportData || !forensics) return (
    <div className="bg-[#020617] min-h-screen text-slate-500 flex flex-col items-center justify-center font-mono italic uppercase tracking-widest text-center">
      <p className="text-red-600 text-2xl mb-4 font-black">SIGNAL_LOST</p>
      <button onClick={() => window.location.href = '/'} className="underline hover:text-white mt-4">RE-INITIALIZE</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic text-left selection:bg-red-600/30">
      <Header />
      <main className="container mx-auto max-w-5xl mt-24">
        {/* Header Block */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b-2 border-slate-900 pb-12 gap-8">
          <div className="space-y-4">
            <h1 className="text-white text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
              AI <span className="text-red-600">EFFICIENCY</span> VERDICT
            </h1>
            <div className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.3em] font-black text-slate-500">
              <span className="flex items-center gap-2 text-red-600">
                <ShieldAlert size={14} /> STATUS: {forensics.status}
              </span>
              <span>ENTITY: {reportData.org_name}</span>
              <span>CASE: {reportData.id.slice(0, 8).toUpperCase()}</span>
            </div>
          </div>
          <BarChart3 size={80} className="text-slate-800 hidden md:block" />
        </header>

        {/* Forensic Briefing Section */}
        <section className="bg-white p-12 mb-8 border-l-[20px] border-red-600 shadow-2xl">
          <h2 className="text-black text-4xl font-black uppercase italic tracking-tighter mb-12 flex items-center gap-4">
            <Target className="text-red-600" /> FORENSIC BRIEFING
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-4 border-l-2 border-slate-100 pl-8">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono italic">Efficiency Decay</span>
              <div className="text-7xl font-black italic text-black leading-none">{forensics.decay}%</div>
            </div>
            <div className="space-y-4 border-l-2 border-slate-100 pl-8">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono italic">Annual Labor Waste</span>
              <div className="text-7xl font-black italic text-black leading-none">
                ${forensics.laborWaste.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </section>

        {/* Total Capital Exposure Block */}
        <div className="bg-red-600 p-12 mb-16 text-white shadow-2xl">
           <span className="text-[11px] font-black uppercase text-white/70 tracking-widest font-mono italic">Total Capital Exposure</span>
           <div className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none mt-4">
             ${forensics.capitalExposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}
           </div>
        </div>

        {/* 🎚️ Forensic Exposure Simulator */}
        <div className="bg-slate-900/50 border-2 border-slate-800 p-12 mb-16 space-y-12 shadow-inner">
          <div className="flex items-center gap-4 text-red-600">
            <Sliders size={24} />
            <h3 className="text-[12px] font-mono font-black uppercase tracking-[0.5em] italic">Forensic Exposure Simulator</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Spend</span>
                <span className="text-2xl font-black italic text-white">${liveSpend.toFixed(1)}M</span>
              </div>
              <input type="range" min="0.1" max="50" step="0.1" value={liveSpend} onChange={(e) => setLiveSpend(parseFloat(e.target.value))} className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600" />
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Headcount</span>
                <span className="text-2xl font-black italic text-white">{fteCount} FTEs</span>
              </div>
              <input type="range" min="1" max="500" step="1" value={fteCount} onChange={(e) => setFteCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600" />
            </div>
          </div>
        </div>

        {/* Calendly CTA */}
        <section 
          className="bg-white p-16 flex flex-col md:flex-row justify-between items-center gap-12 group cursor-pointer hover:bg-slate-100 transition-all border-l-[20px] border-red-600 shadow-2xl" 
          onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}
        >
          <div className="text-left">
            <h4 className="text-black text-5xl font-black italic uppercase tracking-tighter leading-none">Eradicate the Tax</h4>
            <p className="text-slate-600 text-[13px] font-black uppercase tracking-widest mt-6 italic leading-relaxed max-w-md">Schedule your clinical briefing to recover lost engineering capacity.</p>
          </div>
          <div className="bg-red-600 text-white p-8 group-hover:translate-x-4 transition-transform shadow-lg">
            <ArrowRight size={48} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
