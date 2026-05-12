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
  
  const [liveSpend, setLiveSpend] = useState<number>(1.2);
  const [fteCount, setFteCount] = useState<number>(5);

  useEffect(() => {
    const urlId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : null;
    const finalId = id || urlId;
    if (!finalId || finalId === '[id]' || finalId === 'results') return;

    const fetchAuditData = async (retryCount = 0) => {
      const cleanUUID = String(finalId).trim().toLowerCase();
      const { data } = await supabase.from('audits').select('*').eq('id', cleanUUID).maybeSingle();

      if (data) {
        setReportData(data);
        const dbSpend = parseFloat(data.ai_spend) || 1.2;
        setLiveSpend(dbSpend);
        setFteCount(Math.round((dbSpend * 1000000) / 200000) || 5);
        setLoading(false);
      } else if (retryCount < 5) {
        setTimeout(() => fetchAuditData(retryCount + 1), 1000);
      } else {
        setLoading(false);
      }
    };
    fetchAuditData();
  }, [id, router.isReady]);

  const forensics = useMemo(() => {
    if (!reportData) return null;
    const decayPct = parseFloat(reportData.decay_pct) || 0;
    const laborWaste = (decayPct / 100) * 0.4 * (fteCount * 160000 * 1.3);
    const capitalExposure = (0.2 * (liveSpend * 1000000)) * 1.15;
    return { decay: decayPct, laborWaste, capitalExposure, status: decayPct > 60 ? "CRITICAL" : "STABLE" };
  }, [reportData, liveSpend, fteCount]);

  if (loading) return (
    <div className="bg-[#020617] min-h-screen text-red-600 flex flex-col items-center justify-center font-mono italic animate-pulse tracking-[0.4em] uppercase">
      <Activity size={48} className="mb-4" /> RECOVERING_SIGNAL_HANDSHAKE...
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
        
        {/* --- Header Section (Matched to PDF Metadata) --- */}
        <header className="mb-12 border-b-2 border-slate-900 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
            <div className="space-y-4">
              <h1 className="text-white text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                AI <span className="text-red-600">EFFICIENCY</span> VERDICT
              </h1>
              <div className="space-y-1 font-mono text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="text-red-600 italic">STATUS: {forensics.status}</span>
                  <span className="text-slate-800">//</span>
                  <span>AUTHORIZED BY: {reportData.lead_email?.toUpperCase()}</span>
                </div>
                <div>DIAGNOSTIC_OBSERVATION // ALPHA_7_INTAKE</div>
                <div className="text-slate-700">SIGNAL ID: {reportData.id.toUpperCase()}</div>
              </div>
            </div>
            <BarChart3 size={80} className="text-slate-800 hidden md:block" />
          </div>
        </header>

        {/* --- Forensic Disclaimer --- */}
        <div className="mb-16 border-l-2 border-slate-800 pl-8 py-2 max-w-3xl">
          <p className="text-slate-500 font-mono text-[12px] uppercase leading-relaxed tracking-wider font-bold">
            These metrics serve as a forensic baseline for organizational health. Your responses identify specific logic fractures. The system projects the <span className="text-red-600">fiscal impact</span>, converting observations into high-probability drift currently occurring at your node.
          </p>
        </div>

        {/* --- Executive Briefing (Matched to PDF Box Structure) --- */}
        <section className="bg-white p-12 mb-8 border-l-[20px] border-red-600 shadow-2xl">
          <div className="flex justify-between items-center mb-16">
             <h2 className="text-black text-4xl font-black uppercase italic tracking-tighter flex items-center gap-4">
               <Target className="text-red-600" /> EXECUTIVE BRIEFING
             </h2>
             <span className="text-slate-400 font-mono text-xs font-black">ENTITY // {reportData.org_name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-black">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono">Capacity Loss</span>
              <div className="text-5xl font-black italic leading-none">Wasting {forensics.decay}%</div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono">Financial Leak</span>
              <div className="text-5xl font-black italic leading-none">Tax: ${forensics.laborWaste.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono">Exposure</span>
              <div className="text-5xl font-black italic leading-none">Risk: ${forensics.capitalExposure.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            </div>
          </div>
        </section>

        {/* --- Visual High-Impact Numbers --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-10 border-l-[16px] border-slate-900 shadow-xl">
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] font-mono">Annual Labor Waste</span>
             <div className="text-6xl font-black text-black italic mt-4">
               ${forensics.laborWaste.toLocaleString(undefined, { maximumFractionDigits: 0 })}
             </div>
          </div>
          <div className="bg-red-600 p-10 shadow-xl text-white">
             <span className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] font-mono">Total Capital Exposure</span>
             <div className="text-6xl font-black italic mt-4">
               ${forensics.capitalExposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}
             </div>
          </div>
        </div>

        {/* --- Interactive Simulator --- */}
        <div className="bg-slate-950 border-2 border-slate-900 p-12 mb-16 space-y-12">
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

        {/* --- CTA --- */}
        <div className="bg-white p-16 flex flex-col md:flex-row justify-between items-center gap-12 group cursor-pointer hover:bg-slate-100 transition-all border-l-[20px] border-red-600 shadow-2xl" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}>
          <div className="text-left">
            <h4 className="text-black text-5xl font-black italic uppercase tracking-tighter leading-none">Eradicate the Tax</h4>
            <p className="text-slate-600 text-[13px] font-black uppercase tracking-widest mt-6 italic leading-relaxed max-w-md">Schedule your clinical briefing to recover lost engineering capacity.</p>
          </div>
          <div className="bg-red-600 text-white p-8 group-hover:translate-x-4 transition-transform shadow-lg"><ArrowRight size={48} /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
