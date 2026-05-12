"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Sliders, Activity, ArrowRight, BarChart3 } from "lucide-react";
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
    // 🛡️ WAIT FOR ROUTER TO HYDRATE ID
    if (!router.isReady || !id) return;

    const fetchAuditData = async () => {
      const { data: audit, error } = await supabase
        .from('audits')
        .select('*')
        .eq('id', id)
        .single();

      if (audit) {
        setLiveSpend(parseFloat(audit.ai_spend) || 1.2);
        setFteCount(Math.round((parseFloat(audit.ai_spend) * 1000000) / 200000) || 5);
        setReportData(audit);
      }
      setLoading(false);
    };

    fetchAuditData();
  }, [id, router.isReady]);

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    const dbDecay = parseInt(reportData.decay_pct) || 50;
    const currentSpend = liveSpend * 1000000;
    const reworkPercent = (dbDecay / 100) * 0.4; 
    const annualReworkTax = (fteCount * reworkPercent) * 160000 * 1.3;
    const baseRiskPercent = dbDecay > 70 ? 0.30 : 0.18;
    const inactionPenalty = (baseRiskPercent * currentSpend) * 1.15;

    return {
      totalTax: annualReworkTax,
      inactionPenalty: inactionPenalty,
      wasteRatio: reworkPercent * 100,
      ghostFTEs: Math.round(fteCount * reworkPercent),
      riskStatus: dbDecay > 60 ? 'FRACTURED' : 'STABLE'
    };
  }, [reportData, liveSpend, fteCount]);

  if (loading) {
    return (
      <div className="bg-[#020617] min-h-screen text-red-600 flex flex-col items-center justify-center font-mono italic animate-pulse uppercase tracking-[0.5em] text-2xl text-center">
        <Activity size={48} className="mb-4" />
        GENERATING_CASE_FILE...
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="bg-[#020617] min-h-screen text-slate-500 flex flex-col items-center justify-center font-mono italic uppercase tracking-widest text-center">
        <p className="text-red-600 text-2xl mb-4 font-black">SIGNAL_ID_NOT_FOUND</p>
        <button onClick={() => window.location.href = '/'} className="underline hover:text-white">Re-Initialize Triage</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic text-left selection:bg-red-600/30">
      <Header />
      <div className="container mx-auto max-w-4xl mt-24">
        <header className="flex justify-between items-end mb-12 border-b-2 border-slate-900 pb-10">
          <div>
            <h1 className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              AI <span className="text-red-600 italic">EFFICIENCY</span> VERDICT
            </h1>
            <p className="text-slate-500 font-mono text-[11px] mt-6 uppercase tracking-[0.4em] font-black italic">
              CASE_FILE: BMR-2026-{id?.toString().slice(0,4).toUpperCase()} // STATUS: {activeMetrics?.riskStatus}
            </p>
          </div>
          <BarChart3 size={64} className="text-slate-800" />
        </header>

        <div className="mb-12 border-l-4 border-red-600 pl-8 py-2">
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black italic mb-4 italic">DIAGNOSTIC_OBSERVATION // ALPHA_7_INTAKE</p>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed italic font-medium max-w-3xl">
            These metrics serve as a forensic baseline for organizational health. Your responses identify specific logic fractures from your immediate perspective. The system projects the fiscal impact of these fractures.
          </p>
        </div>

        <div className="bg-white p-12 mb-16 border-l-[16px] border-red-600 shadow-2xl">
          <h2 className="text-black text-4xl font-black uppercase italic tracking-tighter mb-10 underline decoration-red-600/30 italic">Executive Briefing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-800 italic">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono">Capacity Loss</span>
              <p className="text-[15px] font-bold leading-relaxed uppercase italic">Wasting <span className="text-red-600 text-xl">{activeMetrics?.wasteRatio.toFixed(0)}%</span> total capacity.</p>
            </div>
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono">Financial Leak</span>
              <p className="text-[15px] font-bold leading-relaxed uppercase italic">Labor tax: <span className="text-red-600 text-xl">${activeMetrics?.totalTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span></p>
            </div>
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono">Exposure</span>
              <p className="text-[15px] font-bold leading-relaxed uppercase italic">Risk: <span className="text-red-600 text-xl">${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}</span></p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 italic">
          <div className="bg-slate-950 border border-slate-900 p-12 flex flex-col justify-center">
            <div className="text-6xl md:text-7xl font-black italic text-white leading-none tracking-tighter font-black">${activeMetrics?.totalTax.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-6 font-black italic">Annual Labor Waste</div>
          </div>
          <div className="bg-red-950/20 border-2 border-red-600/50 p-12 flex flex-col justify-center border-l-8 border-red-600">
            <div className="text-6xl md:text-7xl font-black text-red-500 leading-none italic tracking-tighter font-black">${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            <div className="text-[11px] font-mono text-red-400 uppercase font-black tracking-widest mt-6 italic">Total Capital Exposure</div>
          </div>
        </div>

        <div className="bg-white p-16 flex flex-col md:flex-row justify-between items-center gap-12 group cursor-pointer hover:bg-slate-100 transition-all border-l-[20px] border-red-600 shadow-2xl italic" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}>
          <div className="text-left">
            <h4 className="text-black text-5xl font-black italic uppercase tracking-tighter leading-none italic">Eradicate the Tax</h4>
            <p className="text-slate-600 text-[13px] font-black uppercase tracking-widest mt-6 italic max-w-md">Schedule your briefing to recover lost engineering capacity.</p>
          </div>
          <div className="bg-red-600 text-white p-8 group-hover:translate-x-4 transition-transform shadow-lg"><ArrowRight size={48} /></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
