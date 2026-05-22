"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { ShieldCheck, Printer, Activity, Info, Lock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForensicVerdict() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveBleed, setLiveBleed] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }

    const pathSegments = typeof window !== "undefined" ? window.location.pathname.split('/') : [];
    const directPathToken = pathSegments[pathSegments.length - 1];

    const fallbackId = router.query.id || params.get('id') || directPathToken;
    const cleanId = typeof fallbackId === 'string' ? fallbackId.trim() : '';

    // If we have a structured UUID signature, fetch immediately
    if (cleanId && cleanId !== '[id]' && cleanId !== 'undefined' && cleanId !== 'results') {
      fetchAuditData(cleanId);
    } else if (router.isReady) {
      // Router stabilized but pathing tokens are completely missing
      setLoading(false);
    }
  }, [router.isReady, router.query.id]);

  const fetchAuditData = async (pathId: string) => {
    try {
      const { data: audit, error } = await supabase
        .from('audits')
        .select('*')
        .eq('id', pathId)
        .maybeSingle();
        
      if (error) throw error;
      if (audit) {
        setReportData(audit);
      }
    } catch (err) {
      console.error("FORENSIC_DEBUG: Database sync drop ->", err);
    } finally {
      setLoading(false);
    }
  };

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    
    const dbDecay = parseInt(reportData.decay_pct) || 0;
    const impliedSpend = 0.5 + (dbDecay * 0.05); 
    const impliedFte = Math.round((impliedSpend * 1000000) / 200000) || 3;

    const reworkTaxCalculated = (impliedFte * (dbDecay / 100) * 0.40) * (160000 * 1.3);
    const inactionPenaltyCalculated = ((dbDecay > 60 ? 0.30 : 0.18) * (impliedSpend * 1000000)) * 1.15;
    
    const bleedPerSecond = inactionPenaltyCalculated / 31536000;
    const createdAt = new Date(reportData.created_at || Date.now()).getTime();
    
    return {
      decay: dbDecay,
      spend: impliedSpend,
      fte: impliedFte,
      reworkTax: reworkTaxCalculated,
      inactionPenalty: inactionPenaltyCalculated,
      bleedPerSecond: bleedPerSecond,
      historicalBleed: ((Date.now() - createdAt) / 1000) * bleedPerSecond
    };
  }, [reportData]);

  useEffect(() => {
    if (!activeMetrics?.bleedPerSecond) return;
    let currentAccumulated = activeMetrics.historicalBleed;
    const ticker = setInterval(() => {
      currentAccumulated += (activeMetrics.bleedPerSecond / 10);
      setLiveBleed(currentAccumulated);
    }, 100);
    return () => clearInterval(ticker);
  }, [activeMetrics]);

  const baseBlurRequired = reportData?.status !== 'COMPLETE' || reportData?.is_released !== true;
  const shouldBlurScreen = baseBlurRequired && !isAdmin;

  const blurStyle = {
    filter: shouldBlurScreen ? 'blur(12px)' : 'none',
    WebkitFilter: shouldBlurScreen ? 'blur(12px)' : 'none',
    transition: 'filter 0.4s ease-in-out',
    userSelect: shouldBlurScreen ? 'none' : 'auto',
    pointerEvents: shouldBlurScreen ? 'none' : 'auto',
  } as React.CSSProperties;

  if (loading) {
    return (
      <div className="bg-[#020617] h-screen flex flex-col items-center justify-center gap-6 font-mono italic text-red-600 font-black uppercase">
        <Activity className="animate-spin" size={48} />
        AUTHENTICATING_VERDICT_VAULT...
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="bg-[#020617] h-screen flex flex-col items-center justify-center gap-4 font-mono text-slate-400 uppercase tracking-widest text-xs italic">
        <span className="text-red-600 font-black text-xl">INVALID_METRIC_TARGET</span>
        <span>The requested client workspace link has expired or does not exist.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic selection:bg-red-600/30 uppercase font-black overflow-x-hidden relative">
      <div className="no-print"><Header /></div>

      {/* 📊 BACKGROUND RESULTS PANEL (ALWAYS RENDERED) */}
      <div className="container mx-auto max-w-4xl mt-24 relative print:mt-0">
        <div className="absolute -top-12 right-0 no-print">
          <button onClick={() => window.print()} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] tracking-[0.3em] font-mono font-black italic">
            <Printer size={14} /> GENERATE_FORENSIC_DOSSIER
          </button>
        </div>

        {/* 🏢 CARD */}
        <div className="bg-white p-12 mb-20 border-l-[16px] border-red-600 shadow-2xl text-black print:border-l-[10px] print:shadow-none">
          <div className="flex justify-between items-center mb-12 border-b border-slate-100 pb-10">
            <div className="space-y-2 text-left">
              <h2 className="text-black text-5xl font-black uppercase tracking-tighter underline decoration-red-600/20 italic leading-none">
                EXPOSURE_VERDICT
              </h2>
              <span className="text-slate-400 font-mono text-[10px] block font-black uppercase tracking-widest italic mt-4">
                ENTITY_REF // {reportData.org_name || "UNKNOWN_TARGET"}
              </span>
            </div>

            <div className="text-right flex flex-col items-end self-center shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-red-600 animate-pulse rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-black italic leading-none">
                  CAPITAL_EROSION_RATE
                </span>
              </div>
              <div style={blurStyle} className="text-4xl font-black text-red-600 tabular-nums tracking-tighter italic leading-none py-1">
                ${liveBleed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                </span> Structural Divergence.
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
              <span className="text-red-600 text-[11px] font-mono tracking-widest font-black uppercase">PROJECTED_ANNUAL_EXPOSURE</span>
              <p className="text-[15px] leading-tight font-black italic uppercase">
                Capital Liability Baseline: <span className="text-red-600 text-xl font-black" style={blurStyle}>
                  ${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}
                </span>.
              </p>
            </div>
          </div>
        </div>

        {/* 📊 MATRICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-center">
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

        {/* ⚙️ PANEL */}
        <div className="bg-slate-950/60 border border-slate-900 p-6 mb-20 text-left flex items-start gap-4 shadow-xl">
          <Info className="text-red-500 shrink-0 mt-0.5" size={16} />
          <div className="space-y-2">
            <span className="text-white font-mono text-[10px] tracking-widest uppercase font-black block">
              INITIAL_BENCHMARK_CONFIG // STANDARD_ESTIMATES
            </span>
            <p className="text-slate-400 font-sans text-[11px] leading-relaxed font-black italic uppercase tracking-tight">
              FORENSIC EXPOSURE METRICS ARE GENERATED USING PROPORTIONAL INDUSTRY-STANDARD MODEL ASSUMPTIONS INDEXED DIRECTLY TO YOUR SPECIFIC CAPACITY COEFFICIENT OF {(activeMetrics?.decay || 0)}%.
            </p>
          </div>
        </div>
      </div>

      {/* 🔒 TRANSLUCENT OVERLAY GATING BLOCK */}
      {shouldBlurScreen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#020617]/40 backdrop-blur-[2px]">
          <div className="text-center p-12 md:p-16 bg-slate-950 border-2 border-red-600 max-w-xl w-full shadow-[0_0_100px_rgba(0,0,0,0.95)] italic space-y-10">
            <div className="space-y-4">
              <Lock className="text-red-600 mx-auto mb-2 animate-pulse" size={48} />
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none">DIAGNOSTIC_LOCKED</h2>
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest leading-relaxed font-black max-w-sm mx-auto">
                Your forensic report compiled successfully.
              </p>
              <p className="text-[11px] font-mono text-red-500 uppercase tracking-widest leading-relaxed font-black max-w-sm mx-auto">
                Access is held awaiting your live administrative briefing session.
              </p>
            </div>

            <div 
              className="bg-white p-8 border-l-[12px] border-red-600 shadow-2xl cursor-pointer transition-all duration-300 hover:bg-slate-100 text-center flex flex-col items-center justify-center space-y-3"
              onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-briefing', '_blank')}
            >
              <h4 className="text-black text-xl md:text-2xl font-black tracking-tighter leading-none uppercase">
                EXECUTE_RECONSTRUCTION_PLAN
              </h4>
              <p className="text-slate-500 text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase leading-none">
                [ CLICK_TO_CONFIRM_BRIEFING_RESERVATION ]
              </p>
            </div>

            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-black pt-2 normal-case">
              Your access key has been emailed to the email address provided.
            </p>
          </div>
        </div>
      )}

      {/* 🛡️ DECAL */}
      {isAdmin && (
        <div className="fixed bottom-8 left-8 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-full font-mono text-[10px] uppercase font-black flex items-center gap-3 shadow-2xl border border-blue-400 no-print">
          <ShieldCheck size={16} /> DECRYPTION_PROTOCOL_ACTIVE_VIA_OVERRIDE
        </div>
      )}

      <div className="no-print mt-20"><Footer /></div>
    </div>
  );
}
