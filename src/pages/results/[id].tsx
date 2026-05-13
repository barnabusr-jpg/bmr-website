"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Sliders, Activity, ArrowRight, BarChart3, Printer } from "lucide-react";
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
  const [liveBleed, setLiveBleed] = useState(0);

  useEffect(() => {
    const pathId = id || window.location.pathname.split('/').pop();
    if (!pathId || pathId === '[id]' || pathId === 'results') return;

    const fetchAuditData = async (retryCount = 0) => {
      const cleanId = String(pathId).trim().toLowerCase();
      const { data: audit } = await supabase.from('audits').select('*').eq('id', cleanId).maybeSingle();

      if (audit) {
        setLiveSpend(parseFloat(audit.ai_spend) || 1.2);
        setFteCount(Math.round((parseFloat(audit.ai_spend) * 1000000) / 200000) || 5);
        setReportData(audit);
        setLoading(false);
      } else if (retryCount < 5) {
        setTimeout(() => fetchAuditData(retryCount + 1), 1000);
      } else {
        setLoading(false);
      }
    };
    fetchAuditData();
  }, [id, router.isReady]);

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    
    const dbDecay = parseInt(reportData.decay_pct) || 0;
    
    // 📌 1. REWORK TAX FORMULA (From Documentation)
    // (FTEs × % Rework) × ($160K × 1.3 burden)
    const reworkPercent = (dbDecay / 100) * 0.40; // Aligning with 20-40% benchmark
    const annualReworkTax = (fteCount * reworkPercent) * (160000 * 1.3);
    
    // 📌 2. INACTION PENALTY FORMULA (From Documentation)
    // (Base Risk × AI Spend) × (1 + Annual Drift Rate)
    const baseRisk = dbDecay > 60 ? 0.30 : 0.18; // 18-30% Benchmark
    const annualDriftRate = 0.15; // 15% Compounding decay
    const totalAIInvestment = liveSpend * 1000000;
    
    const inactionPenalty = (baseRisk * totalAIInvestment) * (1 + annualDriftRate);
    
    // 🛡️ COUNTER LOGIC: Convert the Inaction Penalty into a per-second bleed
    const bleedPerSecond = inactionPenalty / 31536000;
    
    // Historical calculation since file creation
    const createdAt = new Date(reportData.created_at || Date.now()).getTime();
    const secondsSinceCreation = (Date.now() - createdAt) / 1000;
    
    return {
      fiduciaryDecay: dbDecay,
      agencyFailure: Math.min(dbDecay * 1.15, 100),
      logicFracture: Math.max(dbDecay - 10, 0),
      reworkTax: annualReworkTax,
      inactionPenalty: inactionPenalty,
      bleedPerSecond: bleedPerSecond,
      historicalBleed: secondsSinceCreation * bleedPerSecond
    };
  }, [reportData, liveSpend, fteCount]);

  // 🛡️ TICKER ENGINE: High-frequency compounding updates
  useEffect(() => {
    if (!activeMetrics?.bleedPerSecond) return;
    let currentAccumulated = activeMetrics.historicalBleed;
    const ticker = setInterval(() => {
      currentAccumulated += (activeMetrics.bleedPerSecond / 10);
      setLiveBleed(currentAccumulated);
    }, 100);
    return () => clearInterval(ticker);
  }, [activeMetrics]);

  if (loading || !reportData) return <div className="bg-[#020617] h-screen text-red-600 flex items-center justify-center font-mono italic animate-pulse">EXTRACTING_FORENSIC_DATA...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic selection:bg-red-600/30">
      <style jsx global>{` @media print { .no-print { display: none !important; } } `}</style>
      <div className="no-print"><Header /></div>

      <div className="container mx-auto max-w-4xl mt-24 relative italic font-black uppercase">
        <header className="flex justify-between items-end mb-12 border-b-2 border-slate-900 pb-10">
          <div>
            <h1 className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              AI <span className="text-red-600">EFFICIENCY</span> VERDICT
            </h1>
            <div className="space-y-1 mt-6 font-mono text-[11px] uppercase tracking-[0.4em] font-black">
              <p className="text-slate-500">CASE_FILE: BMR-2026-{reportData.id.slice(0,4).toUpperCase()}</p>
              <p className="text-red-600">AUTHORIZED BY: BMR SOLUTIONS</p>
            </div>
          </div>
          <BarChart3 size={64} className="text-slate-800" />
        </header>

        {/* EXECUTIVE BRIEFING WITH INTEGRATED COUNTER */}
        <div className="bg-white p-12 mb-16 border-l-[16px] border-red-600 shadow-2xl text-black">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-2">
              <h2 className="text-black text-4xl font-black uppercase italic tracking-tighter underline decoration-red-600/30">Executive Briefing</h2>
              <span className="text-slate-400 font-mono text-[10px] font-black uppercase tracking-widest block">ENTITY // {reportData.org_name}</span>
            </div>

            {/* LIVE INACTION COUNTER */}
            <div className="no-print text-right border-r-4 border-red-600 pr-4">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Accumulated_Inaction_Cost</span>
              <div className="text-xl font-black text-red-600 tabular-nums">
                ${liveBleed.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-800 font-black">
            <div className="space-y-3 font-black uppercase">
              <span className="text-[11px] text-red-600 tracking-widest font-mono italic">Fiduciary Decay</span>
              <p className="text-[15px] leading-tight italic font-black">
                {activeMetrics?.fiduciaryDecay}% Drift. <span className="text-slate-400 normal-case font-medium block mt-2 text-[12px]">Erosion of capital efficiency due to unmonitored automation overhead.</span>
              </p>
            </div>
            <div className="space-y-3 font-black uppercase">
              <span className="text-[11px] text-red-600 tracking-widest font-mono italic">Agency Failure</span>
              <p className="text-[15px] leading-tight italic font-black">
                {activeMetrics?.agencyFailure.toFixed(0)}% Violation. <span className="text-slate-400 normal-case font-medium block mt-2 text-[12px]">Disconnect between autonomous output and organizational intent.</span>
              </p>
            </div>
            <div className="space-y-3 font-black uppercase">
              <span className="text-[11px] text-red-600 tracking-widest font-mono italic">Logic Fracture</span>
              <p className="text-[15px] leading-tight italic font-black">
                {activeMetrics?.logicFracture.toFixed(0)}% Integrity Loss. <span className="text-slate-400 normal-case font-medium block mt-2 text-[12px]">Structural weaknesses in decision-making chains and data flow.</span>
              </p>
            </div>
          </div>
        </div>

        {/* IMPACT VISUALS (Anchored to Rework Tax & Inaction Penalty) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 italic font-black uppercase">
          <div className="bg-slate-950 border border-slate-900 p-12 flex flex-col justify-center">
            <div className="text-6xl md:text-7xl font-black italic text-white tracking-tighter">
              ${activeMetrics?.reworkTax.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-6">Annual Hidden Labor Tax</div>
          </div>
          <div className="bg-red-950/20 border-2 border-red-600/50 p-12 flex flex-col justify-center border-l-8 border-red-600">
            <div className="text-6xl md:text-7xl font-black text-red-500 tracking-tighter">
              ${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className="text-[11px] font-mono text-red-400 uppercase tracking-widest mt-6">Total Capital Exposure</div>
          </div>
        </div>

        {/* SIMULATOR */}
        <div className="bg-slate-950/40 border border-slate-800 p-12 space-y-16 mb-16 rounded-xl no-print italic font-black uppercase">
          <div className="flex items-center gap-4 text-red-600 font-black italic">
            <Sliders size={24} />
            <h3 className="text-[12px] font-mono uppercase tracking-[0.5em]">Forensic Exposure Simulator</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="flex justify-between items-end italic"><span className="text-[11px] font-mono text-slate-500">Spend</span><span className="text-2xl text-white font-black">${liveSpend.toFixed(1)}M</span></div>
              <input type="range" min="0.1" max="50" step="0.1" value={liveSpend} onChange={(e) => setLiveSpend(parseFloat(e.target.value))} className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600" />
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end italic"><span className="text-[11px] font-mono text-slate-500">Headcount</span><span className="text-2xl text-white font-black">{fteCount} FTEs</span></div>
              <input type="range" min="1" max="500" step="1" value={fteCount} onChange={(e) => setFteCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white p-16 flex flex-col md:flex-row justify-between items-center gap-12 group cursor-pointer hover:bg-slate-100 transition-all border-l-[20px] border-red-600 shadow-2xl no-print" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}>
          <div className="text-left font-black italic">
            <h4 className="text-black text-5xl uppercase tracking-tighter leading-none">Eradicate the Tax</h4>
            <p className="text-slate-600 text-[13px] uppercase tracking-widest mt-6 max-w-md">Schedule your clinical briefing to recover lost engineering capacity.</p>
          </div>
          <div className="bg-red-600 text-white p-8 group-hover:translate-x-4 transition-transform shadow-lg"><ArrowRight size={48} /></div>
        </div>
      </div>
      <div className="no-print"><Footer /></div>
    </div>
  );
}
