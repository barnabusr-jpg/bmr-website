"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Sliders, Users, Activity, Clock, ArrowRight, ShieldAlert, BarChart3 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query;
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveSpend, setLiveSpend] = useState<number>(1.2);
  const [fteCount, setFteCount] = useState<number>(5);

  useEffect(() => {
    if (!id) return;
    const fetchAuditData = async () => {
      const { data: audit } = await supabase.from('audits').select('*').eq('id', id).single();
      if (audit) {
        setLiveSpend(parseFloat(audit.ai_spend) || 1.2);
        setFteCount(Math.round((parseFloat(audit.ai_spend) * 1000000) / 200000));
        setReportData(audit);
      }
      setLoading(false);
    };
    fetchAuditData();
  }, [id]);

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
      riskLevel: dbDecay > 60 ? 'FRACTURED' : 'NOMINAL'
    };
  }, [reportData, liveSpend, fteCount]);

  if (loading) return <div className="bg-[#020617] min-h-screen text-red-600 p-20 font-mono italic animate-pulse text-center uppercase tracking-widest">Synthesizing_Verdict...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-12 px-6 font-sans text-left tracking-tight">
      <div className="container mx-auto max-w-4xl">
        
        <header className="flex justify-between items-end mb-12 border-b border-slate-900 pb-8">
          <div>
            <h1 className="text-white text-5xl font-black uppercase italic tracking-tighter leading-none">AI <span className="text-red-600">EFFICIENCY</span> VERDICT</h1>
            <p className="text-slate-500 font-mono text-[10px] mt-4 uppercase tracking-widest font-black italic">Ref ID: {id?.toString().slice(0,8).toUpperCase()} // Status: {activeMetrics?.riskLevel}</p>
          </div>
          <BarChart3 className="text-slate-800 hidden md:block" size={48} />
        </header>

        {/* 🛡️ HIGH CONTRAST EXECUTIVE SUMMARY */}
        <div className="bg-white p-10 mb-12 border-l-[12px] border-red-600 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <h2 className="text-black text-3xl font-black uppercase italic mb-8 tracking-tighter">Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-800">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-red-600 tracking-widest font-mono">Operational Leak</span>
              <p className="text-sm font-bold leading-snug uppercase italic">Your team is losing <span className="text-red-600">{activeMetrics?.wasteRatio.toFixed(0)}%</span> of capacity to manual rework and drift.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-red-600 tracking-widest font-mono">Financial Tax</span>
              <p className="text-sm font-bold leading-snug uppercase italic">This creates hidden labor waste of <span className="text-red-600">${activeMetrics?.totalTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span> per year.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-red-600 tracking-widest font-mono">12-Month Risk</span>
              <p className="text-sm font-bold leading-snug uppercase italic">Inaction exposes <span className="text-red-600">${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}</span> to systemic drift.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-slate-950 border border-slate-900 p-10">
            <div className="text-6xl font-black italic text-white">${activeMetrics?.totalTax.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-4 font-black italic">Hidden Labor Waste / Year</div>
          </div>
          <div className="bg-red-950/20 border border-red-600/50 p-10">
            <div className="text-6xl font-black text-red-500 leading-none italic">${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            <div className="text-[10px] font-mono text-red-400 uppercase font-black tracking-widest mt-4 italic">Total Capital Exposure</div>
          </div>
        </div>

        {/* GHOST FTE BLOCK */}
        <div className="bg-slate-950 border border-slate-900 p-10 mb-12 flex items-center gap-8 relative overflow-hidden group">
            <ShieldAlert size={80} className="text-red-600 absolute right-10 opacity-10 group-hover:opacity-30 transition-opacity" />
            <div className="relative z-10">
                <div className="text-5xl font-black italic text-white mb-2">{activeMetrics?.wasteRatio.toFixed(0)}%</div>
                <div className="text-[10px] font-mono text-red-600 uppercase font-black tracking-widest mb-6 italic italic">Engineering Waste Ratio</div>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-tight leading-relaxed max-w-xl font-black italic">
                    Your team of <span className="text-white">{fteCount} engineers</span> is spending {activeMetrics?.wasteRatio.toFixed(0)}% capacity on manual fixes—equivalent to losing <span className="text-red-500">{activeMetrics?.ghostFTEs} full-time salaries</span> to drift.
                </p>
            </div>
        </div>

        <div className="bg-slate-900/30 border border-slate-800 p-10 space-y-12 mb-12 rounded-lg">
          <div className="flex items-center gap-3 text-red-600"><Sliders size={20} /><h3 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] italic">Exposure Simulator</h3></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex justify-between items-end"><span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black italic">AI_Investment</span><span className="text-xl font-black italic text-white">${liveSpend.toFixed(1)}M</span></div>
              <input type="range" min="0.1" max="50" step="0.1" value={liveSpend} onChange={(e) => setLiveSpend(parseFloat(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end"><span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black italic">Headcount</span><span className="text-xl font-black italic text-white">{fteCount} FTEs</span></div>
              <input type="range" min="1" max="200" step="1" value={fteCount} onChange={(e) => setFteCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-12 flex flex-col md:flex-row justify-between items-center gap-8 group cursor-pointer hover:bg-slate-100 transition-all border-l-[12px] border-red-600" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}>
          <div className="text-left">
            <h4 className="text-black text-4xl font-black italic uppercase tracking-tighter leading-none">Eradicate the Tax</h4>
            <p className="text-slate-600 text-[11px] font-black uppercase tracking-widest mt-4 italic leading-relaxed max-w-md">Schedule your clinical briefing to harden your system and recover lost engineering capacity.</p>
          </div>
          <div className="bg-red-600 text-white p-6 group-hover:scale-110 transition-transform"><ArrowRight size={32} /></div>
        </div>
      </div>
    </div>
  );
}
