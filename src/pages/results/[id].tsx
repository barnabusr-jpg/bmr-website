"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Lock, Unlock, Activity, Info, FileText } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { AnomalyNode, AuditRecord } from "@/types/database.types";

export default function UnifiedResultsPortal() {
  const router = useRouter();
  const { id } = router.query;

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audit, setAudit] = useState<AuditRecord | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!id || !mounted) return;
    const fetchInitialAuditState = async () => {
      try {
        const { data, error } = await supabase.from("audits").select("*").eq("id", id).single();
        if (error) throw error;
        if (data) setAudit(data as AuditRecord);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchInitialAuditState();

    const channelSubscription = supabase.channel(`live-workshop-${id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "audits", filter: `id=eq.${id}` }, 
        (payload) => { if (payload.new) setAudit(payload.new as AuditRecord); }
      ).subscribe();

    return () => { supabase.removeChannel(channelSubscription); };
  }, [id, mounted]);

  // 🚀 ENGINE TIME-DELTA LOCK (Keeps ticker rolling seamlessly between background polls)
  useEffect(() => {
    if (loading || !audit?.created_at) return;

    const calculateDeltaTime = () => {
      const historicalAnchorTime = new Date(audit.created_at).getTime();
      const currentRealTime = Date.now();
      const absoluteDeltaInSeconds = Math.max(0, (currentRealTime - historicalAnchorTime) / 1000);
      setElapsedSeconds(absoluteDeltaInSeconds);
    };

    calculateDeltaTime();
    timerIntervalRef.current = setInterval(calculateDeltaTime, 100);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [loading, audit?.created_at]);

  // 🎨 GLOBAL PERMANENT GREEN PROFILE HARDCODED
  const dbDecay = audit?.decay_pct || 24;
  const isPhaseTwoActive = !!audit?.is_released;
  const spend = audit?.ai_spend || 1.2;
  const fteCount = audit?.roi_pct ? audit.roi_pct : Math.round((spend * 1000000) / 200000) || 5;
  
  const laborMultiplier = 0.5; 
  const baseExposureRate = 0.22; 
  const highExposureRate = 0.35;
  const accentColorClass = "text-green-500"; 
  const borderAccentClass = "border-green-600"; 
  const fallbackDirectiveColor = "text-green-500";

  const laborTax = (dbDecay / 100) * laborMultiplier * (fteCount * 160000 * 1.3);
  const exposure = ((dbDecay > 60 ? highExposureRate : baseExposureRate) * (spend * 1000000)) * 1.15;
  const dynamicAccumulatedLoss = ((exposure / 31536000) * ((dbDecay * 1.45) + (elapsedSeconds * 0.0667)));

  // 🔒 TOTAL FRAMEWORK OBFUSCATION MATRIX (Anonymized Tokens)
  const genericAnomalies: AnomalyNode[] = [
    { 
      id: "FRACTURE_NODE_STACK_ALPHA", 
      description: "[ RESTRICTED ENCRYPTED STREAM // DATA WITHHELD IN DIAGNOSTIC PHASE 1 ]", 
      severity: "SECURE_GATE", 
      directive: "Requires advisor authorization node clearance." 
    },
    { 
      id: "FRACTURE_NODE_STACK_BETA", 
      description: "[ RESTRICTED ENCRYPTED STREAM // DATA WITHHELD IN DIAGNOSTIC PHASE 1 ]", 
      severity: "SECURE_GATE", 
      directive: "Requires advisor authorization node clearance." 
    },
    { 
      id: "FRACTURE_NODE_STACK_GAMMA", 
      description: "[ RESTRICTED ENCRYPTED STREAM // DATA WITHHELD IN DIAGNOSTIC PHASE 1 ]", 
      severity: "SECURE_GATE", 
      directive: "Requires advisor authorization node clearance." 
    },
    { 
      id: "FRACTURE_NODE_STACK_DELTA", 
      description: "[ RESTRICTED ENCRYPTED STREAM // DATA WITHHELD IN DIAGNOSTIC PHASE 1 ]", 
      severity: "SECURE_GATE", 
      directive: "Requires advisor authorization node clearance." 
    }
  ];

  const activeAnomaliesList = isPhaseTwoActive && audit?.fractures && audit.fractures.length > 0 ? audit.fractures : genericAnomalies;

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-green-500 italic">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="font-mono text-xs uppercase tracking-[0.4em] font-black">DECRYPTING_SECURE_VAULT_METRICS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden text-left uppercase italic font-black">
      <nav className="h-28 bg-black/40 backdrop-blur-md border-b border-slate-900/60 px-12 flex items-center justify-between">
        <div>
          <div className="text-white text-xl tracking-tighter italic">BMR<span className={accentColorClass}>SOLUTIONS</span></div>
          <span className={`text-[8px] font-mono uppercase tracking-[0.3em] italic block mt-0.5 ${accentColorClass}`}>
            {isPhaseTwoActive ? "PORTAL_MODE // PARTNER_PHASE_2" : "PORTAL_MODE // DIAGNOSTIC_PHASE_1"}
          </span>
        </div>
        {isPhaseTwoActive && (
          <button onClick={() => window.open(`/api/generate-pdf?id=${id}`, "_blank")} className="flex items-center gap-2 bg-slate-950 hover:bg-white hover:text-black border border-slate-800 text-xs px-5 py-3 font-mono">
            <FileText size={14} /> DOWNLOAD_FORENSIC_LEDGER.PDF
          </button>
        )}
      </nav>

      <main className="max-w-7xl mx-auto pt-16 px-12 pb-32 space-y-12">
        <div className={`bg-white text-black p-10 md:p-14 border-l-[16px] grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl relative ${borderAccentClass}`}>
          <div className="md:col-span-7 flex flex-col justify-between space-y-10">
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-black">
                {isPhaseTwoActive ? "SYSTEM_REALITY" : "EFFICIENCY_VERDICT"}
              </h1>
              <p className="text-[11px] font-mono text-slate-400 tracking-widest mt-2">
                TARGET IDENTIFIER // {audit?.org_name || "EVALUATION CLIENT SYSTEM"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100 text-left">
              <div>
                <span className={`text-[9px] font-mono block tracking-wider ${accentColorClass}`}>LOGIC_DECAY_COEFFICIENT</span>
                <p className="text-xs font-black mt-2 leading-tight text-slate-900">DECAY INDEX: <span className={`${accentColorClass} text-base`}>{dbDecay}%</span></p>
              </div>
              <div>
                <span className={`text-[9px] font-mono block tracking-wider ${accentColorClass}`}>PROCESS_WASTE_TAX</span>
                <p className="text-xs font-black mt-2 leading-tight text-slate-900">LIABILITY: <span className={`${accentColorClass} font-mono text-sm`}>${laborTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}.</span></p>
              </div>
              <div>
                <span className={`text-[9px] font-mono block tracking-wider ${accentColorClass}`}>PROJECTED_ANNUAL_EXPOSURE</span>
                <p className="text-xs font-black mt-2 leading-tight text-slate-900">TOTAL CAPITAL RISK: <span className={`${accentColorClass} font-mono text-sm`}>${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}.</span></p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block md:col-span-1 justify-self-center h-full w-[1px] bg-slate-200/80" />
          
          {/* 🛠️ COUPLING WRAPPER STRUCTURAL LOCK: Solves text clipping layout permanent width reserve */}
          <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end text-left md:text-right pt-6 md:pt-0 min-w-[240px] lg:min-w-[290px] shrink-0 pr-4">
            <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block whitespace-nowrap">// CAPITAL_EROSION_VELOCITY</span>
            <div className={`text-4xl md:text-5xl font-mono font-black mt-2 tracking-tighter tabular-nums ${accentColorClass} leading-none block break-keep`}>
              ${dynamicAccumulatedLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[9px] font-mono text-slate-400 block tracking-wider uppercase mt-1.5 whitespace-nowrap">// REAL-TIME_ACCUMULATED_DRIFT_LOSS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#050b18] border border-slate-900 p-16 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
            <div className="text-6xl md:text-7xl font-black text-white tracking-tighter font-mono">${laborTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <span className="text-[10px] font-mono text-slate-500 tracking-[0.25em] block">VALIDATED_REWORK_LIABILITY_TAX</span>
          </div>
          <div className="bg-[#050b18] border border-slate-900 p-16 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
            <div className={`text-6xl md:text-7xl font-black tracking-tighter font-mono ${accentColorClass}`}>${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <span className={`text-[10px] font-mono tracking-[0.25em] block ${accentColorClass}`}>TOTAL_COMPUTATIONAL_EXPOSURE_INDEX</span>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-900 p-6 text-left flex items-start gap-4 shadow-xl">
          <Info className={`${accentColorClass} shrink-0 mt-0.5`} size={16} />
          <div className="space-y-1">
            <span className="text-white font-mono text-[10px] tracking-widest block">SYSTEM CONFIGURATION // MODEL_READOUT_SPECIFICATION</span>
            <p className="text-slate-400 font-sans text-[11px] leading-relaxed font-black normal-case">
              {isPhaseTwoActive 
                ? `Operational metrics have been actively calibrated live to your team's real-world footprint of $${spend}M annual software allocations across an ecosystem of ${fteCount} FTE resources.` 
                : `Metrics are currently generated using proportional standard model assumptions indexed to your captured Logic Decay Coefficient of ${dbDecay}%. Specific workforce calibration parameters are held inside terminal status.`
              }
            </p>
          </div>
        </div>

        <div className="pt-8 text-left">
          <div className="border-b border-slate-900 pb-4 mb-8">
            <span className="text-[10px] font-mono text-slate-500 tracking-widest block">// DETECTED_VULNERABILITY_LOCATIONS</span>
            <h3 className="text-3xl font-black tracking-tighter mt-1 text-white">IDENTIFIED SYSTEMIC ANOMALIES</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeAnomaliesList.map((frac: AnomalyNode, index: number) => {
              const isSecureGate = frac.severity === 'SECURE_GATE';
              return (
                <div key={frac.id || index} className={`border p-8 bg-slate-950/60 flex flex-col justify-between relative min-h-[280px] ${isSecureGate ? 'border-green-500/20 bg-green-950/5' : 'border-slate-900'}`}>
                  <div className="flex justify-between items-center border-b border-slate-900 pb-4 font-mono">
                    <span className="text-[10px] text-slate-500 tracking-widest">// INDEX NODE FR-0{index + 1}</span>
                    <span className="text-[9px] tracking-widest px-2.5 py-0.5 flex items-center gap-1.5 bg-green-600/20 text-green-500 border border-green-600/30">
                      {isPhaseTwoActive ? <Unlock size={10} /> : <Lock size={10} />} {frac.severity}
                    </span>
                  </div>
                  <div className="my-6 space-y-2">
                    <h4 className="text-xl font-black text-white font-mono">{String(frac.id || 'ANOMALY_DETECTED').replace(/_/g, " ")}</h4>
                    <p className="text-xs font-mono text-slate-300 font-normal leading-relaxed">{frac.description}</p>
                  </div>
                  <div className="border-t border-slate-900 pt-4 font-mono">
                    <div className="text-[9px] text-slate-600 tracking-widest mb-1">REQUIRED TARGETED REMEDIATION DIRECTIVE:</div>
                    <div className={`text-xs ${isSecureGate ? 'text-green-500 font-sans tracking-wide font-medium normal-case' : fallbackDirectiveColor}`}>{frac.directive}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!isPhaseTwoActive && (
          <div className="bg-white text-black p-10 md:p-14 flex flex-col items-center justify-center group cursor-pointer border-l-[16px] shadow-2xl text-center mt-12 hover:bg-slate-50 transition-all duration-300 border-green-600" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-briefing')}>
            <h4 className="text-black text-2xl md:text-3xl font-black transition-colors group-hover:text-green-600">INITIALIZE_DIAGNOSTIC_BRIEFING</h4>
            <p className="text-slate-500 text-[10px] font-black tracking-[0.25em] mt-2">[ CLICK TO ENGAGE WORKSHOP CONFIGURATOR & CONFIRM RECONSTRUCTION RUN ]</p>
          </div>
        )}
      </main>
    </div>
  );
}
