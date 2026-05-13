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

  // 🛡️ THE SUB-PENNY TICKER STATE
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
    
    // 🛡️ ORIGINAL COMPOUNDING FORMULA
    const createdAt = new Date(reportData.created_at || Date.now()).getTime();
    const now = Date.now();
    const secondsSinceCreation = (now - createdAt) / 1000;
    
    const annualExposure = (liveSpend * 1000000) * (dbDecay / 100) * 0.22;
    const bleedPerSecond = annualExposure / 31536000;
    
    return {
      fiduciaryDecay: dbDecay,
      agencyFailure: Math.min(dbDecay * 1.1, 100),
      logicFracture: Math.max(dbDecay - 15, 0),
      exposure: annualExposure,
      historicalBleed: secondsSinceCreation * bleedPerSecond,
      bleedPerSecond: bleedPerSecond
    };
  }, [reportData, liveSpend]);

  // 🛡️ TICKER ENGINE: High-frequency sub-penny updates
  useEffect(() => {
    if (!activeMetrics?.bleedPerSecond) return;

    let currentAccumulated = activeMetrics.historicalBleed;

    const ticker = setInterval(() => {
      currentAccumulated += (activeMetrics.bleedPerSecond / 20); // Update every 50ms
      setLiveBleed(currentAccumulated);
    }, 50);

    return () => clearInterval(ticker);
  }, [activeMetrics]);

  if (loading || !reportData) return (
    <div className="bg-[#020617] h-screen text-red-600 flex items-center justify-center font-mono italic animate-pulse">
      SCANNING_VECTORS...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic selection:bg-red-600/30">
      
      <style jsx global>{`
        @media print { .no-print { display: none !important; } }
      `}</style>

      <div className="no-print"><Header /></div>

      <div className="container mx-auto max-w-4xl mt-24 relative italic font-black uppercase">
        
        {/* HEADER */}
        <header className="flex justify-between items-end mb-12 border-b-2 border-slate-900 pb-10">
          <div>
            <h1 className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              AI <span className="text-red-600">EFFICIENCY</span> VERDICT
            </h1>
            <div className="space-y-1 mt-6 font-mono text-[11px] uppercase tracking-[0.4em] font-black italic">
              <p className="text-slate-500">CASE_FILE: BMR-2026-{reportData.id.slice(0,4).toUpperCase()}</p>
              <p className="text-red-600">AUTHORIZED BY: BMR SOLUTIONS</p>
            </div>
          </div>
          <BarChart3 size={64} className="text-slate-800" />
        </header>

        {/* EXECUTIVE BRIEFING */}
        <div className="bg-white p-12 mb-16 border-l-[16px] border-red-600 shadow-2xl text-black">
          
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-2">
              <h2 className="text-black text-4xl font-black uppercase italic tracking-tighter underline decoration-red-600/30">Executive Briefing</h2>
              <span className="text-slate-400 font-mono text-[10px] font-black uppercase tracking-widest block">ENTITY // {reportData.org_name}</span>
            </div>

            {/* 🛡️ SUBTLE TICKER REMINDER */}
            <div className="no-print text-right border-r-4 border-red-600 pr-4">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-1 font-black">Accumulated_Inaction_Cost</span>
              <div className="text-xl font-black text-red-600 tabular-nums tracking-tighter">
                ${liveBleed.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
              </div>
            </div>
          </div>

          {/* ORIGINAL METRICS & EXPLANATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-800 font-black">
            <div className="space-y-3 font-black uppercase">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono italic">Fiduciary Decay</span>
              <p className="text-[15px] font-bold leading-tight uppercase italic font-black">
                {activeMetrics?.fiduciaryDecay}% Drift. <span className="text-slate-400 normal-case font-medium block mt-2 text-[12px]">Measures the erosion of capital efficiency due to unmonitored automation overhead.</span>
              </p>
            </div>
            <div className="space-y-3 font-black uppercase">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono italic">Agency Failure</span>
              <p className="text-[15px] font-bold leading-tight uppercase italic font-black">
                {activeMetrics?.agencyFailure.toFixed(0)}% Violation. <span className="text-slate-400 normal-case font-medium block mt-2 text-[12px]">Calculates the disconnect between autonomous output and organizational intent.</span>
              </p>
            </div>
            <div className="space-y-3 font-black uppercase">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono italic">Logic Fracture</span>
              <p className="text-[15px] font-bold leading-tight uppercase italic font-black">
                {activeMetrics?.logicFracture.toFixed(0)}% Integrity Loss. <span className="text-slate-400 normal-case font-medium block mt-2 text-[12px]">Identifies structural weaknesses in decision-making chains and data flow.</span>
              </p>
            </div>
          </div>
        </div>

        {/* IMPACT VISUALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 italic font-black uppercase">
          <div className="bg-slate-950 border border-slate-900 p-12 flex flex-col justify-center">
            <div className="text-6xl md:text-7xl font-black italic text-white leading-none tracking-tighter">
              {activeMetrics?.fiduciaryDecay}%
            </div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-6 font-black italic">Total Operational Drift</div>
          </div>
          <div className="bg-red-950/20 border-2 border-red-600/50 p-12 flex flex-col justify-center border-l-8 border-red-600">
            <div className="text-6xl md:text-7xl font-black text-red-500 leading-none italic tracking-tighter">
              ${activeMetrics?.exposure.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className="text-[11px] font-mono text-red-400 uppercase font-black tracking-widest mt-6 italic">Projected Annual Exposure</div>
          </div>
        </div>

        {/* SIMULATOR */}
        <div className="bg-slate-950/40 border border-slate-800 p-12 space-y-16 mb-16 rounded-xl no-print italic font-black uppercase">
          <div className="flex items-center gap-4 text-red-600 font-black italic">
            <Sliders size={24} />
            <h3 className="text-[12px] font-mono font-black uppercase tracking-[0.5em] italic">Forensic Exposure Simulator</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 italic font-black uppercase">
            <div className="space-y-6">
              <div className="flex justify-between items-end italic font-black uppercase"><span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Spend</span><span className="text-2xl font-black italic text-white font-black uppercase">${liveSpend.toFixed(1)}M</span></div>
              <input type="range" min="0.1" max="50" step="0.1" value={liveSpend} onChange={(e) => setLiveSpend(parseFloat(e.target.value))} className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600" />
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end italic font-black uppercase"><span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Headcount</span><span className="text-2xl font-black italic text-white font-black uppercase">{fteCount} FTEs</span></div>
              <input type="range" min="1" max="500" step="1" value={fteCount} onChange={(e) => setFteCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div 
          className="bg-white p-16 flex flex-col md:flex-row justify-between items-center gap-12 group cursor-pointer hover:bg-slate-100 transition-all border-l-[20px] border-red-600 shadow-2xl no-print italic font-black uppercase" 
          onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}
        >
          <div className="text-left italic font-black uppercase">
            <h4 className="text-black text-5xl font-black italic uppercase tracking-tighter leading-none italic font-black">Eradicate the Tax</h4>
            <p className="text-slate-600 text-[13px] font-black uppercase tracking-widest mt-6 italic leading-relaxed max-w-md italic font-black">Schedule your clinical briefing to recover lost engineering capacity.</p>
          </div>
          <div className="bg-red-600 text-white p-8 group-hover:translate-x-4 transition-transform shadow-lg"><ArrowRight size={48} /></div>
        </div>
      </div>
      
      <div className="no-print"><Footer /></div>
    </div>
  );
}
