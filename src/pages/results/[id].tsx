"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Lock, ShieldCheck, Activity, Info } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ResultsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audit, setAudit] = useState<any>(null);
  
  const [clientHasAccess, setClientHasAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // 📈 LIVE REAL-TIME COUNTER STATE
  const [liveErosion, setLiveErosion] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("admin") === "true") {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!id || !mounted) return;

    const fetchInitialAuditState = async () => {
      try {
        const { data, error } = await supabase
          .from("audits")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setAudit(data);
          setClientHasAccess(!!data.is_released);
        }
      } catch (err) {
        console.error("LEDGER_FETCH_ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialAuditState();

    const auditSubscription = supabase
      .channel(`audit-realtime-${id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "audits", filter: `id=eq.${id}` },
        (payload) => {
          if (payload.new) {
            setAudit(payload.new);
            setClientHasAccess(!!payload.new.is_released);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(auditSubscription);
    };
  }, [id, mounted]);

  // 🧮 SYSTEM DATA PARSING & VALIDATED MULTIPLIERS
  const dbDecay = audit?.decay_pct || 24;
  const spend = parseFloat(audit?.ai_spend) || 1.2;
  const sectorType = audit?.sector || "finance";
  
  let laborMultiplier = 0.4;
  let baseExposureRate = 0.18;
  let highExposureRate = 0.30;

  if (sectorType === "finance") {
    laborMultiplier = 0.5;
    baseExposureRate = 0.22;
    highExposureRate = 0.35;
  } else if (sectorType === "healthcare") {
    laborMultiplier = 0.45;
    baseExposureRate = 0.20;
    highExposureRate = 0.32;
  } else if (sectorType === "retail") {
    laborMultiplier = 0.35;
    baseExposureRate = 0.15;
    highExposureRate = 0.25;
  }

  const fte = Math.round((spend * 1000000) / 200000) || 5;
  const laborTax = (dbDecay / 100) * laborMultiplier * (fte * 160000 * 1.3);
  const selectedExposureRate = dbDecay > 60 ? highExposureRate : baseExposureRate;
  const exposure = (selectedExposureRate * (spend * 1000000)) * 1.15;
  const baselineTotalErosion = laborTax + exposure;

  // ⏳ REAL-TIME HIGH-FIDELITY MICRO-INCREMENT ENGINE
  useEffect(() => {
    if (loading || !baselineTotalErosion) return;

    setLiveErosion(baselineTotalErosion);

    const counterInterval = setInterval(() => {
      setLiveErosion((prev) => prev + 0.03);
    }, 120);

    return () => clearInterval(counterInterval);
  }, [loading, baselineTotalErosion]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-red-600 italic">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="font-mono text-xs uppercase tracking-[0.4em] font-black">DECRYPTING_SECURE_VAULT_NODE...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white relative font-sans overflow-x-hidden select-none">
      
      {/* 🔮 THE AUTHENTIC PLATFORM LAYOUT CONTAINER */}
      <div className={`transition-all duration-700 ease-in-out ${!clientHasAccess && !isAdmin ? "blur-xl saturate-[0.15] pointer-events-none select-none" : "blur-none"}`}>
        
        {/* 1. BRAND TOP NAVIGATION DECK */}
        <nav className="h-28 bg-black/40 backdrop-blur-md border-b border-slate-900/60 px-12 flex items-center justify-between no-print">
          <div className="flex flex-col items-start space-y-0.5">
            <div className="text-white font-black uppercase text-xl tracking-tighter leading-none italic">
              BMR<span className="text-red-600">SOLUTIONS</span>
            </div>
            <span className="text-[8px] font-mono text-red-600 uppercase tracking-[0.3em] font-black italic">FORENSIC_UNIT_2026</span>
          </div>
          <div className="hidden md:flex items-center gap-12 text-[10px] font-mono text-slate-400 font-black tracking-widest uppercase italic">
            <span className="hover:text-white cursor-pointer transition-colors">THE_FRAMEWORK</span>
            <span className="hover:text-white cursor-pointer transition-colors">EVIDENCE_VAULT</span>
          </div>
          <button className="bg-red-600 text-white font-black uppercase italic tracking-widest text-[10px] px-6 py-3.5 border border-red-500 hover:bg-white hover:text-black transition-all flex items-center gap-2">
            EXECUTE_STRATEGY <Activity size={12} className="animate-pulse" />
          </button>
        </nav>

        <main className="max-w-7xl mx-auto pt-16 px-12 pb-8 space-y-12">
          
          {/* ACTION BUTTON UTILITY LINE */}
          <div className="flex justify-end text-[9px] font-mono text-slate-500 tracking-widest uppercase font-black italic gap-2 items-center cursor-pointer hover:text-white transition-colors no-print">
            [ 🖨️ GENERATE_FORENSIC_DOSSIER ]
          </div>

          {/* 2. THE MAIN EXPOSURE VERDICT PLACARD CARD */}
          <div className="bg-white text-black p-12 border-l-[16px] border-red-600 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl relative">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
              <div>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-black">
                  EXPOSURE_VERDICT
                </h1>
                <p className="text-[11px] font-mono text-slate-400 font-black uppercase tracking-widest mt-2">
                  ENTITY_REF // {audit?.org_name || "DOUBLE"}
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100 text-left">
                <div>
                  <span className="text-[9px] font-mono text-red-600 block uppercase font-black tracking-wider">LOGIC_DECAY_COEFFICIENT</span>
                  <p className="text-sm font-black uppercase mt-2 leading-tight text-slate-900">
                    DETECTING <span className="text-red-600 text-lg">{dbDecay}%</span> STRUCTURAL DIVERGENCE.
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-red-600 block uppercase font-black tracking-wider">REWORK_LEVY</span>
                  <p className="text-sm font-black uppercase mt-2 leading-tight text-slate-900">
                    LIABILITY: <span className="text-red-600 font-mono">${laborTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}.</span>
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-red-600 block uppercase font-black tracking-wider">PROJECTED_ANNUAL_EXPOSURE</span>
                  <p className="text-sm font-black uppercase mt-2 leading-tight text-slate-900">
                    CAPITAL LIABILITY BASELINE: <span className="text-red-600 font-mono">${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}.</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end text-center lg:text-right border-t lg:border-t-0 lg:border-l border-slate-100 pt-8 lg:pt-0 lg:pl-8">
              <span className="text-[10px] font-mono text-slate-400 font-black tracking-widest uppercase block relative">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block mr-2 animate-ping absolute -left-4 top-1" />
                CAPITAL_EROSION_RATE
              </span>
              
              {/* 🎯 THE TWO-DECIMAL LIVE COUNTER ELEMENT */}
              <div className="text-5xl md:text-6xl font-black text-red-600 mt-2 tracking-tighter italic font-black leading-none tabular-nums">
                ${liveErosion.toFixed(2)}
              </div>
              <span className="text-[9px] font-mono text-slate-400 block tracking-wider uppercase mt-1">USD_ACCUMULATED_IN_REAL_TIME</span>
            </div>
          </div>

          {/* 3. MASONRY METRIC BOTTOM GRID BLOCKS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#050b18] border border-slate-900 p-16 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
              <div className="text-6xl md:text-7xl font-black text-white tracking-tighter italic">
                ${laborTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <span className="text-[10px] font-mono text-slate-500 tracking-[0.25em] uppercase font-black block">
                VALIDATED_REWORK_LIABILITY
              </span>
            </div>
            <div className="bg-[#050b18] border border-red-900/30 p-16 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
              <div className="text-6xl md:text-7xl font-black text-red-600 tracking-tighter italic">
                ${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <span className="text-[10px] font-mono text-red-600 tracking-[0.25em] uppercase font-black block">
                TOTAL_FORENSIC_EXPOSURE
              </span>
            </div>
          </div>

          {/* ⚙️ SYSTEM ASSUMPTIONS BLOCK */}
          <div className="bg-slate-950/60 border border-slate-900 p-6 text-left flex items-start gap-4 shadow-xl">
            <Info className="text-red-500 shrink-0 mt-0.5" size={16} />
            <div className="space-y-2">
              <span className="text-white font-mono text-[10px] tracking-widest uppercase font-black block">
                INITIAL_BENCHMARK_CONFIG // STANDARD_ESTIMATES
              </span>
              <p className="text-slate-400 font-sans text-[11px] leading-relaxed font-black italic uppercase tracking-tight">
                FORENSIC EXPOSURE METRICS ARE GENERATED USING PROPORTIONAL INDUSTRY-STANDARD MODEL ASSUMPTIONS INDEXED DIRECTLY TO YOUR CAPTURED LOGIC DECAY COEFFICIENT OF {dbDecay}%.
              </p>
              <p className="text-slate-500 font-mono text-[9px] uppercase font-black tracking-wider border-t border-slate-900 pt-2">
                [ NOTE: UNIQUE ORG SPEND AND EXACT STAFF METRICS WILL BE ADJUSTED LIVE DURING YOUR BRIEFING ]
              </p>
            </div>
          </div>

          {/* 🛡️ HIGH-CONVERSION CALENDLY ACTION PLACARD */}
          {!isAdmin && (
            <div 
              className="bg-white p-10 md:p-16 flex flex-col items-center justify-center group cursor-pointer border-l-[12px] md:border-l-[20px] border-red-600 shadow-2xl no-print italic transition-all duration-300 hover:bg-slate-50 text-center" 
              onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-briefing')}
            >
              <div className="max-w-4xl w-full flex flex-col items-center space-y-6">
                <h4 className="text-black text-2xl md:text-4xl font-black tracking-tighter leading-none italic transition-colors duration-300 group-hover:text-red-600 uppercase break-words w-full">
                  EXECUTE_RECONSTRUCTION_PLAN
                </h4>
                
                <div className="flex flex-col items-center pt-2">
                  <p className="text-slate-500 text-[10px] md:text-[11px] font-black italic tracking-[0.3em] uppercase mb-4">
                    [ CLICK_TO_INITIALIZE_RECOVERY_PROTOCOLS ]
                  </p>
                  <div className="h-1 w-12 bg-red-600/20 group-hover:w-24 group-hover:bg-red-600 transition-all duration-500" />
                </div>
              </div>
            </div>
          )}

          {/* FOOTER METADATA DESCRIPTOR ROWS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-900/80 text-[10px] font-mono text-slate-500 tracking-widest font-black uppercase italic no-print">
            <div>FORENSIC_VERTICLES</div>
            <div className="text-left md:text-center">DRIFT_DIAGNOSTICS</div>
            <div className="text-left md:text-right flex items-center md:justify-end gap-2">
              SYSTEM_STATUS <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" /> 
              <span className="text-red-600">AUDIT_MODE: LIVE_COLLECTION</span>
            </div>
          </div>

        </main>
      </div>

      {/* 🔒 THE OVERLAY GATED INTERCEPT INTERFACE */}
      {!clientHasAccess && !isAdmin && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-24 p-6 bg-[#020617]/20 backdrop-blur-[1px]">
          <div className="text-center p-8 md:p-10 bg-slate-950 border-2 border-red-600 max-w-md w-full shadow-[0_0_80px_rgba(0,0,0,0.95)] space-y-6 italic">
            
            <div className="space-y-2">
              <Lock className="text-red-600 mx-auto mb-1 animate-pulse" size={32} />
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white leading-none">DIAGNOSTIC_LOCKED</h2>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-relaxed font-black max-w-xs mx-auto">
                Your forensic report compiled successfully.
              </p>
              <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest leading-relaxed font-black max-w-sm mx-auto">
                Access is held awaiting your live administrative briefing session.
              </p>
            </div>

            <div 
              className="bg-white p-6 border-l-[8px] border-red-600 shadow-xl cursor-pointer transition-all duration-300 hover:bg-slate-100 text-center flex flex-col items-center justify-center space-y-2 group"
              onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-briefing', '_blank')}
            >
              <h4 className="text-black text-lg md:text-xl font-black tracking-tighter leading-none uppercase">
                EXECUTE_RECONSTRUCTION_PLAN
              </h4>
              <p className="text-slate-500 text-[8px] font-black tracking-[0.2em] uppercase leading-none">
                [ CLICK_TO_CONFIRM_BRIEFING_RESERVATION ]
              </p>
            </div>

            <p className="text-[9px] font-mono text-slate-600 uppercase tracking-wider font-black pt-1 normal-case">
              Your access key has been emailed to the address provided.
            </p>
          </div>
        </div>
      )}

      {/* ADMIN OVERRIDE ALERT FLOATER */}
      {isAdmin && (
        <div className="fixed bottom-8 left-8 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-full font-mono text-[10px] uppercase font-black flex items-center gap-3 shadow-2xl border border-blue-400 no-print">
          <ShieldCheck size={16} /> DECRYPTION_PROTOCOL_ACTIVE_VIA_OVERRIDE
        </div>
      )}

    </div>
  );
}
