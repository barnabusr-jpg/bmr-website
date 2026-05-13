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
    const reworkPercent = (dbDecay / 100) * 0.40; 
    const annualReworkTax = (fteCount * reworkPercent) * (160000 * 1.3);
    const baseRisk = dbDecay > 60 ? 0.30 : 0.18;
    const inactionPenalty = (baseRisk * (liveSpend * 1000000)) * 1.15;
    const bleedPerSecond = inactionPenalty / 31536000;
    const createdAt = new Date(reportData.created_at || Date.now()).getTime();
    const secondsSinceCreation = (Date.now() - createdAt) / 1000;
    
    return {
      decay: dbDecay,
      reworkTax: annualReworkTax,
      inactionPenalty: inactionPenalty,
      bleedPerSecond: bleedPerSecond,
      historicalBleed: secondsSinceCreation * bleedPerSecond
    };
  }, [reportData, liveSpend, fteCount]);

  useEffect(() => {
    if (!activeMetrics?.bleedPerSecond) return;
    let currentAccumulated = activeMetrics.historicalBleed;
    const ticker = setInterval(() => {
      currentAccumulated += (activeMetrics.bleedPerSecond / 10);
      setLiveBleed(currentAccumulated);
    }, 100);
    return () => clearInterval(ticker);
  }, [activeMetrics]);

  if (loading || !reportData) return <div className="bg-[#020617] h-screen text-red-600 flex items-center justify-center font-mono animate-pulse italic">FINALIZING_FORENSIC_FILE...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic selection:bg-red-600/30">
      
      {/* 🛡️ BLUR STYLING */}
      <style jsx global>{`
        .red-blur {
          filter: blur(8px);
          user-select: none;
          pointer-events: none;
          transition: filter 0.3s ease;
        }
        @media print {
          .no-print { display: none !important; }
          .red-blur { filter: blur(12px) !important; color: #dc2626 !important; background: #dc2626 !important; }
        }
      `}</style>

      <div className="no-print"><Header /></div>

      <div className="container mx-auto max-w-4xl mt-24 relative italic font-black uppercase">
        
        {/* PDF EXPORT BUTTON */}
        <button 
          onClick={() => window.print()} 
          className="no-print absolute -top-16 right-0 flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-red-600 text-white px-6 py-2 rounded-sm font-mono text-[10px] uppercase tracking-[0.2em] transition-all"
        >
          <Printer size={14} /> EXPORT_VERDICT_PREVIEW
        </button>

        <header className="flex justify-between items-end mb-12 border-b-2 border-slate-900 pb-10">
          <div>
            <h1 className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              AI <span className="text-red-600">EFFICIENCY</span> VERDICT
            </h1>
          </div>
          <BarChart3 size={64} className="text-slate-800" />
        </header>

        {/* EXECUTIVE BRIEFING (Blurred Data) */}
        <div className="bg-white p-12 mb-16 border-l-[16px] border-red-600 shadow-2xl text-black">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-2">
              <h2 className="text-black text-4xl font-black uppercase italic tracking-tighter underline">Executive Briefing</h2>
              <span className="text-slate-400 font-mono text-[10px] font-black uppercase block">ENTITY // {reportData.org_name}</span>
            </div>

            {/* LIVE COUNTER (NOT BLURRED) */}
            <div className="no-print text-right border-r-4 border-red-600 pr-4">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Accumulated_Inaction_Cost</span>
              <div className="text-xl font-black text-red-600 tabular-nums">
                ${liveBleed.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-800 font-black">
            <div className="space-y-3 font-black uppercase">
              <span className="text-[11px] text-red-600 tracking-widest font-mono italic">Capacity Loss</span>
              <p className="text-[15px] leading-tight italic font-black">
                Wasting <span className="text-red-600 text-xl font-black red-blur">{(activeMetrics?.decay * 0.4).toFixed(0)}%</span> total capacity.
              </p>
            </div>
            <div className="space-y-3 font-black uppercase">
              <span className="text-[11px] text-red-600 tracking-widest font-mono italic">Annual Rework Tax</span>
              <p className="text-[15px] leading-tight italic font-black">
                Hidden cost of <span className="text-red-600 text-xl font-black red-blur">${activeMetrics?.reworkTax.toLocaleString()}</span>.
              </p>
            </div>
            <div className="space-y-3 font-black uppercase">
              <span className="text-[11px] text-red-600 tracking-widest font-mono italic">Inaction Penalty</span>
              <p className="text-[15px] leading-tight italic font-black">
                Exposure risk: <span className="text-red-600 text-xl font-black red-blur">${activeMetrics?.inactionPenalty.toLocaleString()}</span>.
              </p>
            </div>
          </div>
        </div>

        {/* IMPACT VISUALS (Blurred Data) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 italic font-black uppercase">
          <div className="bg-slate-950 border border-slate-900 p-12 flex flex-col justify-center">
            <div className="text-6xl md:text-7xl font-black italic text-white tracking-tighter red-blur">
              ${activeMetrics?.reworkTax.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-6">Annual Hidden Labor Tax</div>
          </div>
          <div className="bg-red-950/20 border-2 border-red-600/50 p-12 flex flex-col justify-center border-l-8 border-red-600">
            <div className="text-6xl md:text-7xl font-black text-red-500 tracking-tighter red-blur">
              ${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className="text-[11px] font-mono text-red-400 uppercase font-black tracking-widest mt-6">Total Capital Exposure</div>
          </div>
        </div>

        {/* CTA (Unlocked Results) */}
        <div className="bg-white p-16 flex flex-col md:flex-row justify-between items-center gap-12 group cursor-pointer hover:bg-slate-100 transition-all border-l-[20px] border-red-600 shadow-2xl no-print" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}>
          <div className="text-left font-black italic uppercase">
            <h4 className="text-black text-5xl tracking-tighter leading-none">Eradicate the Tax</h4>
            <p className="text-slate-600 text-[13px] tracking-widest mt-6 max-w-md">Schedule your clinical briefing to unlock full audit results and recover lost capacity.</p>
          </div>
          <div className="bg-red-600 text-white p-8 group-hover:translate-x-4 transition-transform shadow-lg"><ArrowRight size={48} /></div>
        </div>
      </div>
      <div className="no-print"><Footer /></div>
    </div>
  );
}
