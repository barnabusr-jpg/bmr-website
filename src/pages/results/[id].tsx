"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { Lock, Unlock, Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { AnomalyNode, AuditRecord } from "@/types/database.types";

interface LossTickerProps { 
  diagnosticCompletedAt: string; 
  exposure: number;
  anomalies: Array<{ severity: string }>;
  isArchived: boolean; 
}

// 🏎️ ACCELERATED COMPARE-STATE TICKER ENGINE (STAYS ACTIVE FOR REAL-TIME STREAMING)
function RealTimeLossTicker({ 
  diagnosticCompletedAt, 
  exposure,
  anomalies,
  isArchived
}: LossTickerProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const frozenLossRef = useRef<number | null>(null);

  const severityVelocityMultiplier = useMemo(() => {
    let multiplier = 1.0;
    if (!anomalies) return multiplier;
    anomalies.forEach(anomaly => {
      const severity = anomaly?.severity?.toUpperCase();
      if (severity === 'CRITICAL') multiplier += 2.5; 
      if (severity === 'HIGH') multiplier += 1.5;
      if (severity === 'MEDIUM') multiplier += 0.5;
    });
    return multiplier;
  }, [anomalies]);

  useEffect(() => {
    if (!diagnosticCompletedAt || isNaN(Date.parse(diagnosticCompletedAt))) {
      setElapsedSeconds(0);
      return;
    }

    const baselineAnchorTime = new Date(diagnosticCompletedAt).getTime();

    const calculateDeltaTime = () => {
      if (isArchived) return;
      const currentRealTime = Date.now();
      const absoluteDeltaInSeconds = Math.max(0, (currentRealTime - baselineAnchorTime) / 1000);
      setElapsedSeconds(absoluteDeltaInSeconds * severityVelocityMultiplier);
    };

    calculateDeltaTime();
    const interval = setInterval(calculateDeltaTime, 100); 

    return () => clearInterval(interval);
  }, [diagnosticCompletedAt, severityVelocityMultiplier, isArchived]);

  const validExposure = exposure && !isNaN(exposure) ? exposure : 0;
  let dynamicAccumulatedLoss = (validExposure / 31536000) * elapsedSeconds;

  if (isArchived) {
    if (frozenLossRef.current === null) {
      frozenLossRef.current = dynamicAccumulatedLoss;
    }
    dynamicAccumulatedLoss = frozenLossRef.current;
  } else {
    frozenLossRef.current = null; 
  }

  return (
    <div className={`font-mono font-black mt-2 tracking-tighter tabular-nums text-red-500 leading-none block break-keep ${
      dynamicAccumulatedLoss > 9999 ? "text-3xl lg:text-4xl" : "text-4xl md:text-5xl"
    }`}>
      ${dynamicAccumulatedLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </div>
  );
}

export default function PublicUserPortal() {
  const router = useRouter();
  const { id } = router.query;

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audit, setAudit] = useState<AuditRecord | null>(null);

  useEffect(() => { 
    setMounted(true); 
  }, []);

  // 📡 REAL-TIME SUBSCRIPTION LISTENER (Stream values directly from your Admin Sliders live)
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
        if (data) setAudit(data as AuditRecord);
      } catch (err) { 
        console.error("Audit state fetch failure:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    
    fetchInitialAuditState();

    const channelSubscription = supabase.channel(`live-workshop-${id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "audits", filter: `id=eq.${id}` }, 
        (payload) => { if (payload.new) setAudit(payload.new as AuditRecord); }
      ).subscribe();

    return () => { supabase.removeChannel(channelSubscription); };
  }, [id, mounted]);

  const dbDecay = audit?.decay_pct || 24;
  const spend = audit?.ai_spend || 1.2;

  const isPhaseTwoActive = useMemo(() => {
    return !!audit?.is_released || audit?.status?.toUpperCase() === 'PAID';
  }, [audit?.is_released, audit?.status]);

  const isPaidGateUnlocked = useMemo(() => {
    return audit?.status?.toUpperCase() === 'PAID';
  }, [audit?.status]);

  const metrics = useMemo(() => {
    const fteCount = audit?.roi_pct ? audit.roi_pct : Math.round((spend * 1000000) / 200000) || 6;
    const laborMultiplier = 0.5;
    const totalLaborTaxPool = (dbDecay / 100) * laborMultiplier * (fteCount * 160000 * 1.3);
    
    return {
      fteCount,
      totalLaborTaxPool,
      internalReworkTax: totalLaborTaxPool * 0.60,
      operationalDragTax: totalLaborTaxPool * 0.40,
      exposure: (0.22 * (dbDecay / 25) * (spend * 1000000)) * 1.15
    };
  }, [dbDecay, spend, audit?.roi_pct]);

  const accentColorClass = isPhaseTwoActive ? "text-red-500" : "text-green-500"; 
  const borderAccentClass = isPhaseTwoActive ? "border-red-600" : "border-green-600"; 

  const genericAnomalies: AnomalyNode[] = useMemo(() => [
    { 
      id: `ANOMALY SEGMENT ALPHA // LOSS BASELINE $${(metrics.totalLaborTaxPool * 0.35).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
      description: "Diagnostic scan parameters verified. Detailed root cause analytics and process map variations are fully compiled and locked under initial intake protocols.", 
      severity: "SECURE GATE", 
      directive: "Requires active 30 question operational diagnostic to unmask root cause paths." 
    },
    { 
      id: `ANOMALY SEGMENT BETA // LOSS BASELINE $${(metrics.totalLaborTaxPool * 0.28).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
      description: "Diagnostic scan parameters verified. Detailed root cause analytics and process map variations are fully compiled and locked under initial intake protocols.", 
      severity: "SECURE GATE", 
      directive: "Requires active 30 question operational diagnostic to unmask root cause paths." 
    },
    { 
      id: `ANOMALY SEGMENT GAMMA // LOSS BASELINE $${(metrics.totalLaborTaxPool * 0.22).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
      description: "Diagnostic scan parameters verified. Detailed root cause analytics and process map variations are fully compiled and locked under initial intake protocols.", 
      severity: "SECURE GATE", 
      directive: "Requires active 30 question operational diagnostic to unmask root cause paths." 
    },
    { 
      id: `ANOMALY SEGMENT DELTA // LOSS BASELINE $${(metrics.totalLaborTaxPool * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
      description: "Diagnostic scan parameters verified. Detailed root cause analytics and process map variations are fully compiled and locked under initial intake protocols.", 
      severity: "SECURE GATE", 
      directive: "Requires active 30 question operational diagnostic to unmask root cause paths." 
    }
  ], [metrics.totalLaborTaxPool]);

  const activeAnomaliesList = useMemo(() => {
    if (isPaidGateUnlocked && audit?.anomalies && audit.anomalies.length > 0) {
      return audit.anomalies.map((anom: any) => ({
        id: anom.title || anom.anomaly_id || "IDENTIFIED SYSTEMIC ANOMALY",
        description: anom.description || anom.impact_narrative || "No description provided.",
        severity: anom.severity?.toUpperCase() || "CRITICAL",
        directive: anom.remediation_directive || anom.directive || "Remediation plan held in terminal ledger state."
      }));
    }
    return genericAnomalies;
  }, [isPaidGateUnlocked, audit?.anomalies, genericAnomalies]);

  const fireBriefingSequence = () => {
    if (audit?.id) {
      fetch('/api/cancel-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId: audit.id }),
      }).catch((err) => console.error('Silent reminder cancellation skipped:', err));
    }

    const clientEmail = audit?.lead_email ? encodeURIComponent(audit.lead_email) : "";
    const baseCalendlyUrl = "https://calendly.com/hello-bmradvisory/forensic-briefing";
    const specializedUrl = clientEmail ? `${baseCalendlyUrl}?email=${clientEmail}` : baseCalendlyUrl;
    window.open(specializedUrl, "_blank");
  };

  if (!mounted || loading || !router.isReady || !audit) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-green-500 italic font-black">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="font-mono text-xs uppercase tracking-[0.4em]">DECRYPTING SECURE VAULT METRICS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden text-left uppercase italic font-black">
      <nav className="h-28 bg-black/40 backdrop-blur-md border-b border-slate-900/60 px-6 md:px-12 flex items-center justify-between">
        <div>
          <div className="text-white text-xl tracking-tighter italic">BMR<span className={accentColorClass}>SOLUTIONS</span></div>
          <span className={`text-[8px] font-mono uppercase tracking-[0.3em] italic block mt-0.5 ${accentColorClass}`}>
            {isPhaseTwoActive ? "PORTAL MODE // PARTNER SYSTEM REALITY" : "PORTAL MODE // DIAGNOSTIC PHASE 1"}
          </span>
        </div>
        {isPhaseTwoActive && (
          <button onClick={() => window.open(`/api/generate-pdf?id=${id}`, "_blank")} className="flex items-center gap-2 bg-slate-950 hover:bg-white hover:text-black border border-slate-800 text-xs px-5 py-3 font-mono">
              DOWNLOAD FORENSIC LEDGER PDF
          </button>
        )}
      </nav>

      <main className="max-w-7xl mx-auto pt-12 md:pt-16 px-6 md:px-12 pb-32 space-y-12">
        <div className="border-l-2 border-slate-800 pl-4 py-1 space-y-1">
          <span className="text-slate-500 font-mono text-[9px] tracking-[0.3em] block">// METHODOLOGY METRIC READOUT SPECIFICATION</span>
          <p className="text-slate-300 font-sans text-xs leading-relaxed font-black normal-case max-w-4xl">
            {isPhaseTwoActive 
              ? `Operational metrics have been actively calibrated live to your team's real world footprint of $${spend}M annual software allocations across an ecosystem of ${metrics.fteCount} FTE resources.` 
              : `Metrics are currently generated using proportional standard model assumptions indexed to your captured Logic Decay Coefficient of ${dbDecay}%. Specific workforce calibration parameters are held inside terminal status using system defaults of $1.2M annual software allocations across an ecosystem of 6 FTE resources.`
            }
          </p>
        </div>

        <div className={`bg-white text-black p-8 md:p-14 border-l-[12px] md:border-l-[16px] grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl relative ${borderAccentClass}`}>
          <div className="md:col-span-7 flex flex-col justify-between space-y-8 md:space-y-10">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none md:leading-none text-black break-words">
                {isPhaseTwoActive ? "SYSTEM REALITY" : "EFFICIENCY VERDICT"}
              </h1>
              <p className="text-[10px] md:text-[11px] font-mono text-slate-400 tracking-widest mt-2.5">
                TARGET IDENTIFIER // {audit?.org_name || "EVALUATION CLIENT SYSTEM"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 md:pt-8 border-t border-slate-100 text-left">
              <div className="flex flex-col justify-between">
                <div className="min-h-[28px] sm:min-h-[36px] flex items-end">
                  <span className={`text-[9px] font-mono block tracking-wider uppercase ${accentColorClass}`}>LOGIC DECAY COEFFICIENT</span>
                </div>
                <p className="text-xs font-black mt-2 leading-tight text-slate-900">
                  DECAY INDEX: <span className={`${accentColorClass} text-base`}>{dbDecay}%</span>
                </p>
              </div>

              <div className="flex flex-col justify-between">
                <div className="min-h-[28px] sm:min-h-[36px] flex items-end">
                  <span className={`text-[9px] font-mono block tracking-wider uppercase ${accentColorClass} leading-tight`}>PROCESS WASTE TAX</span>
                </div>
                <p className="text-xs font-black mt-2 leading-tight text-slate-900">
                  LIABILITY TOTAL: <span className={`${accentColorClass} font-mono text-sm`}>${metrics.totalLaborTaxPool.toLocaleString(undefined, { maximumFractionDigits: 0 })}.</span>
                </p>
              </div>

              <div className="flex flex-col justify-between">
                <div className="min-h-[28px] sm:min-h-[36px] flex items-end">
                  <span className={`text-[9px] font-mono block tracking-wider uppercase ${accentColorClass}`}>PROJECTED ANNUAL EXPOSURE</span>
                </div>
                <p className="text-xs font-black mt-2 leading-tight text-slate-900">
                  TOTAL CAPITAL RISK: <span className={`${accentColorClass} font-mono text-sm`}>${(metrics.exposure + metrics.totalLaborTaxPool).toLocaleString(undefined, { maximumFractionDigits: 0 })}.</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block md:col-span-1 justify-self-center h-full w-[1px] bg-slate-200/80" />
          
          <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end text-left md:text-right pt-4 md:pt-0 min-w-[240px] lg:min-w-[290px] shrink-0 md:pr-4">
            <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block whitespace-nowrap">// CAPITAL EROSION VELOCITY</span>
            <RealTimeLossTicker 
              diagnosticCompletedAt={audit.completed_at || audit.updated_at || new Date().toISOString()} 
              exposure={metrics.exposure + metrics.totalLaborTaxPool} 
              anomalies={activeAnomaliesList}
              isArchived={audit.status?.toUpperCase() === 'ARCHIVED'}
            />
            <span className="text-[9px] font-mono text-slate-400 block tracking-wider uppercase mt-1.5 whitespace-nowrap">
              {audit?.status?.toUpperCase() === 'ARCHIVED' ? "// METRIC LOCKED // ARCHIVED VALUE" : "// REAL TIME LOSS SINCE VERDICT LOCK"}
            </span>
          </div>
        </div>

        {/* METRICS SPLIT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#050b18] border border-slate-900 p-12 md:p-16 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
            <div className="text-5xl md:text-7xl font-black text-white tracking-tighter font-mono">${metrics.internalReworkTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <span className="text-[10px] font-mono text-slate-500 tracking-[0.25em] block">VALIDATED REWORK LIABILITY TAX</span>
          </div>
          <div className="bg-[#050b18] border border-slate-900 p-12 md:p-16 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
            <div className={`text-5xl md:text-7xl font-black tracking-tighter font-mono ${accentColorClass}`}>${metrics.operationalDragTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <span className={`text-[10px] font-mono tracking-[0.25em] block ${accentColorClass}`}>SYSTEMIC OPERATIONAL DRAG TAX</span>
          </div>
        </div>

        {/* ANOMALIES CHART INDEX */}
        <div className="pt-8 text-left">
          <div className="border-b border-slate-900 pb-4 mb-8">
            <span className="text-[10px] font-mono text-slate-500 tracking-widest block">// DETECTED VULNERABILITY LOCATIONS</span>
            <h3 className="text-3xl font-black tracking-tighter mt-1 text-white">IDENTIFIED SYSTEMIC ANOMALIES</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeAnomaliesList.map((frac: any, index: number) => (
              <div key={frac.id || index} className={`border p-8 bg-slate-950/60 flex flex-col justify-between relative min-h-[280px] transition-all ${isPaidGateUnlocked ? 'border-red-500/20 bg-red-950/5' : 'border-green-500/20 bg-green-950/5'}`}>
                <div className="flex justify-between items-center border-b border-slate-900 pb-4 font-mono">
                  <span className="text-[10px] text-slate-500 tracking-widest">// INDEX NODE FR-0{index + 1}</span>
                  <span className={`text-[9px] tracking-widest px-2.5 py-0.5 flex items-center gap-1.5 border uppercase ${isPaidGateUnlocked ? 'bg-red-600/20 text-red-500 border-red-600/30' : 'bg-green-600/20 text-green-500 border-green-600/30'}`}>
                    {isPaidGateUnlocked ? <Unlock size={10} /> : <Lock size={10} />} 
                    {isPaidGateUnlocked ? frac.severity : "SECURE GATE"}
                  </span>
                </div>
                <div className="my-6 space-y-2">
                  <h4 className="text-xl font-black text-white font-mono">{String(frac.id || 'ANOMALY DETECTED')}</h4>
                  <p className="text-xs font-mono text-slate-300 font-normal leading-relaxed normal-case">{frac.description}</p>
                </div>
                <div className="border-t border-slate-900 pt-4 font-mono">
                  <div className="text-[9px] text-slate-600 tracking-widest mb-1">REQUIRED TARGETED REMEDIATION DIRECTIVE:</div>
                  <div className={`text-xs font-sans tracking-wide font-medium normal-case ${accentColorClass}`}>{frac.directive}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌐 RESTORED WHITE CALL-TO-ACTION BANNER: Renders exclusively for unpaid users */}
        {!isPhaseTwoActive && (
          <div 
            className="bg-white text-black p-10 md:p-14 flex flex-col items-center justify-center group cursor-pointer border-l-[16px] shadow-2xl text-center mt-12 hover:bg-slate-50 transition-all duration-300 border-green-600" 
            onClick={fireBriefingSequence}
          >
            <h4 className="text-black text-2xl md:text-3xl font-black transition-colors group-hover:text-green-600">INITIALIZE DIAGNOSTIC BRIEFING</h4>
            <p className="text-slate-500 text-[10px] font-black tracking-[0.25em] mt-2">[ CLICK TO ENGAGE WORKSHOP CONFIGURATOR & CONFIRM RECONSTRUCTION RUN ]</p>
          </div>
        )}
      </main>
    </div>
  );
}
