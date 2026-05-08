"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Sliders, Users, Activity, ArrowRight, ShieldAlert, BarChart3, FileText } from "lucide-react";
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
      riskStatus: dbDecay > 60 ? 'CRITICAL_FRACTURE' : 'OPERATIONAL_VARIANCE'
    };
  }, [reportData, liveSpend, fteCount]);

  if (loading) return <div className="bg-[#020617] min-h-screen text-red-600 p-20 font-mono italic animate-pulse text-center uppercase tracking-widest text-2xl">GENERATING_CASE_FILE...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans text-left tracking-tight">
      <div className="container mx-auto max-w-4xl print:max-w-none print:px-0">
        
        {/* CASE FILE HEADER */}
        <header className="flex justify-between items-end mb-12 border-b-2 border-slate-900 pb-10 print:border-slate-300">
          <div>
            <h1 className="text-white text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none print:text-black">
              AI <span className="text-red-600">EFFICIENCY</span> VERDICT
            </h1>
            <p className="text-slate-500 font-mono text-[11px] mt-6 uppercase tracking-[0.4em] font-black italic print:text-slate-600">
              CASE_FILE: BMR-2026-{id?.toString().slice(0,4).toUpperCase()} // NODE: {activeMetrics?.riskStatus}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-slate-800 print:text-slate-400">
            <BarChart3 size={56} />
            <span className="text-[9px] font-mono uppercase tracking-widest font-black italic">Forensic_Grade_Assessment</span>
          </div>
        </header>

        {/* 🛡️ THE EXECUTIVE SUMMARY (HIGH CONTRAST / PRINT-OPTIMIZED) */}
        <div className="bg-white p-12 mb-16 border-l-[16px] border-red-600 shadow-[0_40px_80px_rgba(0,0,0,0.6)] print:shadow-none print:border-2 print:border-red-600">
          <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-6">
            <h2 className="text-black text-4xl font-black uppercase italic tracking-tighter leading-none">Executive Briefing</h2>
            <div className="text-red-600"><FileText size={32} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-800">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono">Capacity Loss</span>
              <p className="text-[15px] font-bold leading-relaxed uppercase italic">Your organization is wasting <span className="text-red-600 text-xl">{activeMetrics?.wasteRatio.toFixed(0)}%</span> of total engineering capacity on manual intervention.</p>
            </div>
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono">Financial Leak</span>
              <p className="text-[15px] font-bold leading-relaxed uppercase italic">This creates a hidden labor tax of <span className="text-red-600 text-xl">${activeMetrics?.totalTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span> every 12 months.</p>
            </div>
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono">Compounding Risk</span>
              <p className="text-[15px] font-bold leading-relaxed uppercase italic">Unaddressed drift exposes <span className="text-red-600 text-xl">${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}</span> to logic collapse.</p>
            </div>
          </div>
        </div>

        {/* 📊 THE IMPACT VISUALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <div className="bg-slate-950 border border-slate-900 p-12 flex flex-col justify-center print:bg-slate-50 print:border-slate-200">
            <div className="text-6xl md:text-7xl font-black italic text-white leading-none tracking-tighter print:text-black">
              ${activeMetrics?.totalTax.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-6 font-black italic">Annual Hidden Labor Waste</div>
          </div>
          <div className="bg-red-950/20 border-2 border-red-600/50 p-12 flex flex-col justify-center print:bg-red-50">
            <div className="text-6xl md:text-7xl font-black text-red-500 leading-none italic tracking-tighter">
              ${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className="text-[11px] font-mono text-red-400 uppercase font-black tracking-widest mt-6 italic">Projected 12-Month Penalty</div>
          </div>
        </div>

        {/* GHOST FTE DEEP DIVE */}
        <div className="bg-slate-950 border-2 border-slate-900 p-12 mb-16 flex items-center gap-10 relative overflow-hidden group print:bg-white">
            <ShieldAlert size={120} className="text-red-600 absolute right-12 opacity-5 group-hover:opacity-20 transition-opacity" />
            <div className="relative z-10">
                <div className="text-6xl font-black italic text-white mb-4 leading-none print:text-black">{activeMetrics?.wasteRatio.toFixed(0)}%</div>
                <div className="text-[11px] font-mono text-red-600 uppercase font-black tracking-widest mb-8 italic">Engineering Efficiency Variance</div>
                <p className="text-[14px] text-slate-400 font-mono uppercase tracking-tight leading-relaxed max-w-xl font-black italic print:text-slate-600">
                    A team of <span className="text-white print:text-black">{fteCount} Engineers</span> is operating at reduced efficiency—the equivalent of losing <span className="text-red-500 font-black">{activeMetrics?.ghostFTEs} Full-Time Salaries</span> to structural system drift.
                </p>
            </div>
        </div>

        {/* INTERACTIVE CALIBRATION */}
        <div className="bg-slate-950/40 border border-slate-900 p-12 space-y-16 mb-16 rounded-xl print:hidden">
          <div className="flex items-center gap-4 text-red-600">
            <Sliders size={24} />
            <h3 className="text-[12px] font-mono font-black uppercase tracking-[0.5em] italic">Exposure Calibration Simulator</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black italic">AI Capital Spend</span>
                <span className="text-2xl font-black italic text-white">${liveSpend.toFixed(1)}M</span>
              </div>
              <input type="range" min="0.1" max="50" step="0.1" value={liveSpend} onChange={(e) => setLiveSpend(parseFloat(e.target.value))} className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600 hover:accent-white transition-all" />
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Engineering Headcount</span>
                <span className="text-2xl font-black italic text-white">{fteCount} FTEs</span>
              </div>
              <input type="range" min="1" max="250" step="1" value={fteCount} onChange={(e) => setFteCount(parseInt(e.target.value))} className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600 hover:accent-white transition-all" />
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div 
          className="bg-white p-16 flex flex-col md:flex-row justify-between items-center gap-12 group cursor-pointer hover:bg-slate-100 transition-all border-l-[20px] border-red-600 shadow-2xl print:border-2" 
          onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}
        >
          <div className="text-left">
            <h4 className="text-black text-5xl font-black italic uppercase tracking-tighter leading-none">Eradicate the Tax</h4>
            <p className="text-slate-600 text-[13px] font-black uppercase tracking-widest mt-6 italic leading-relaxed max-w-md">Schedule your forensic briefing to recover lost engineering capacity and harden your AI roadmap.</p>
          </div>
          <div className="bg-red-600 text-white p-8 group-hover:translate-x-4 transition-transform shadow-lg">
            <ArrowRight size={48} />
          </div>
        </div>

        <p className="mt-12 text-center text-slate-700 font-mono text-[9px] uppercase tracking-[0.5em] italic">BMR Advisory // Fiduciary Protection Framework active</p>
      </div>
    </div>
  );
}
