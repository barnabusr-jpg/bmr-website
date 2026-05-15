"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { ArrowRight, ShieldCheck, Printer, Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForensicVerdict() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveSpend, setLiveSpend] = useState<number>(1.2);
  const [fteCount, setFteCount] = useState<number>(5);
  const [liveBleed, setLiveBleed] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') setIsAdmin(true);

    if (router.isReady) {
      const pathId = params.get('id') || window.location.pathname.split('/').pop();
      if (pathId && pathId !== '[id]' && pathId !== 'results') {
        fetchAuditData(pathId as string);
      } else {
        setLoading(false);
      }
    }
  }, [router.isReady]);

  const fetchAuditData = async (pathId: string) => {
    const { data: audit } = await supabase.from('audits').select('*').eq('id', pathId).maybeSingle();
    if (audit) {
      setLiveSpend(parseFloat(audit.ai_spend) || 1.2);
      setFteCount(Math.round((parseFloat(audit.ai_spend) * 1000000) / 200000) || 5);
      setReportData(audit);
    }
    setLoading(false);
  };

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    const dbDecay = parseInt(reportData.decay_pct) || 0;
    const reworkTaxCalculated = (fteCount * (dbDecay / 100) * 0.40) * (160000 * 1.3);
    const inactionPenaltyCalculated = ((dbDecay > 60 ? 0.30 : 0.18) * (liveSpend * 1000000)) * 1.15;
    const bleedPerSecond = inactionPenaltyCalculated / 31536000;
    const createdAt = new Date(reportData.created_at || Date.now()).getTime();
    
    return {
      decay: dbDecay,
      reworkTax: reworkTaxCalculated,
      inactionPenalty: inactionPenaltyCalculated,
      bleedPerSecond: bleedPerSecond,
      historicalBleed: ((Date.now() - createdAt) / 1000) * bleedPerSecond
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

  const blurStyle = {
    filter: isAdmin ? 'none' : 'blur(15px)',
    WebkitFilter: isAdmin ? 'none' : 'blur(15px)',
    transition: 'filter 0.5s ease-in-out',
    userSelect: isAdmin ? 'auto' : 'none',
    pointerEvents: isAdmin ? 'auto' : 'none',
  } as React.CSSProperties;

  if (loading || !reportData) return (
    <div className="bg-[#020617] h-screen flex flex-col items-center justify-center gap-6 font-mono italic text-red-600 font-black uppercase">
      <Activity className="animate-spin" size={48} />
      AUTHENTICATING_VERDICT_VAULT...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic selection:bg-red-600/30 uppercase font-black overflow-x-hidden">
      <div className="no-print"><Header /></div>

      <div className="container mx-auto max-w-4xl mt-24 relative print:mt-0">
        
        {/* 📑 PDF EXPORT */}
        <div className="absolute -top-12 right-0 no-print">
          <button onClick={() => window.print()} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] tracking-[0.3em] font-mono font-black italic">
            <Printer size={14} /> GENERATE_FORENSIC_DOSSIER
          </button>
        </div>

        {isAdmin && (
          <div className="fixed bottom-8 left-8 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-full font-mono text-[10px] uppercase font-black flex items-center gap-3 shadow-2xl border border-blue-400 no-print">
            <ShieldCheck size={16} /> DECRYPTION_PROTOCOL_ACTIVE
          </div>
        )}

        {/* 🏢 EXECUTIVE VERDICT BOX */}
        <div className="bg-white p-12 mb-20 border-l-[16px] border-red-600 shadow-2xl text-black print:border-l-[10px] print:shadow-none">
          <div className="flex justify-between items-center mb-12 border-b border-slate-100 pb-10">
            <div className="space-y-2 text-left">
              <h2 className="text-black text-5xl font-black uppercase tracking-tighter underline decoration-red-600/20 italic leading-none">
                EXPOSURE_VERDICT
              </h2>
              <span className="text-slate-400 font-mono text-[10px] block font-black uppercase tracking-widest italic mt-4">
                ENTITY_REF // {reportData.org_name}
              </span>
            </div>

            <div className="text-right flex flex-col items-end self-center shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-red-600 animate-pulse rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-black italic leading-none">
                  CAPITAL_EROSION_RATE
                </span>
              </div>
              <div className="text-4xl font-black text-red-600 tabular-nums tracking-tighter italic leading-none py-1">
                ${liveBleed.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
              </div>
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.3em] mt-1 font-black leading-none italic">
                USD_ACCUMULATED_IN_REAL_TIME
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-800 text-left font-black italic">
            <div className="space-y-3">
              <span className="text-red-600 text-[11px] font-mono tracking-widest font-black uppercase">LOGIC_DECAY_COEFFICIENT</span>
              <p className="text-[15px] leading-tight font-black italic uppercase">
                Detecting <span className="text-red-600 text-xl font-black" style={blurStyle}>
                  {(activeMetrics?.decay).toFixed(0)}%
                </span> Divergence.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-red-600 text-[11px] font-mono tracking-widest font-black uppercase">REWORK_LEVY</span>
              <p className="text-[15px] leading-tight font-black italic uppercase">
                Liability: <span className="text-red-600 text-xl font-black" style={blurStyle}>
                  ${activeMetrics?.reworkTax.toLocaleString(undefined, {maximumFractionDigits:0})}
                </span>.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-red-600 text-[11px] font-mono tracking-widest font-black uppercase">INACTION_PENALTY</span>
              <p className="text-[15px] leading-tight font-black italic uppercase">
                Exposure: <span className="text-red-600 text-xl font-black" style={blurStyle}>
                  ${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}
                </span>.
              </p>
            </div>
          </div>
        </div>

        {/* 📊 DATA BLOCKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-24 text-center">
          <div className="bg-slate-950 border border-slate-900 p-12 shadow-2xl italic">
            <div className="text-6xl font-black text-white tracking-tighter italic break-all" style={blurStyle}>
              ${activeMetrics?.reworkTax.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-6 tracking-widest uppercase font-black italic">VALIDATED_REWORK_LIABILITY</div>
          </div>
          <div className="bg-red-950/20 border-2 border-red-600/50 p-12 border-l-8 border-red-600 shadow-2xl italic">
            <div className="text-6xl font-black text-red-500 tracking-tighter italic break-all" style={blurStyle}>
              ${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className="text-[11px] font-mono text-red-400 mt-6 tracking-widest uppercase font-black italic">TOTAL_FORENSIC_EXPOSURE</div>
          </div>
        </div>

        {/* 🛡️ RECONSTRUCTION CTA - REDUCED FONT SIZE // ARCHITECTURAL STACK */}
        {!isAdmin && (
          <div 
            className="bg-white p-8 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-center group cursor-pointer border-l-[12px] md:border-l-[20px] border-red-600 shadow-2xl no-print mb-20 italic gap-8" 
            onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}
          >
            <div className="text-left font-black italic uppercase flex-1 min-w-0">
              {/* FIXED: Reduced to text-4xl on mobile and text-5xl on desktop to ensure perfect fit while maintaining the stack */}
              <h4 className="text-black text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.9] mb-4 italic">
                <span className="block md:inline">EXECUTE_</span>
                <span className="block md:inline">RECONSTRUCTION_PLAN</span>
              </h4>
              <p className="text-slate-600 text-xs md:text-[14px] font-black italic mt-4 md:mt-6 leading-tight">
                Initialize recovery protocols to stabilize operational capital.
              </p>
            </div>
            <div className="bg-red-600 text-white p-6 md:p-10 group-hover:translate-x-4 transition-transform shadow-lg self-end md:self-center shrink-0">
              <ArrowRight size={40} className="md:w-[64px] md:h-[64px]" />
            </div>
          </div>
        )}
      </div>
      <div className="no-print mt-20"><Footer /></div>
    </div>
  );
}
