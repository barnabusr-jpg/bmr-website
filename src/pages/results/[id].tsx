"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { Lock, Unlock, Activity, Check } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { AnomalyNode, AuditRecord } from "@/types/database.types";
import { GovernanceSupplementView } from "@/components/GovernanceSupplementView";

interface LossTickerProps { 
  diagnosticCompletedAt: string | null | undefined; 
  exposure: number;
  anomalies: Array<{ severity: string }>;
  isArchived: boolean; 
}

// 🏎️ ACCELERATED HIGH-PERFORMANCE DIRECT-DOM TICKER ENGINE
function RealTimeLossTicker({ 
  diagnosticCompletedAt, 
  exposure,
  anomalies,
  isArchived
}: LossTickerProps) {
  const displayRef = useRef<HTMLDivElement>(null);
  const runningTotalRef = useRef<number>(0);

  // Compute velocity multiplier based on telemetry anomalies
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
    // 🔒 ANCHOR ALIGNMENT SYNCHRONIZATION PROTOCOL
    // Fall back to a completely unified static milestone string if the parent state
    // is resolving asynchronous fields, ensuring zero starting delta offsets.
    const targetTimestamp = diagnosticCompletedAt || "2026-07-16T00:00:00.000Z";
    const baselineAnchorTime = new Date(targetTimestamp).getTime();
    
    const validExposure = exposure && !isNaN(exposure) && exposure > 0 ? exposure : 280000;
    const lossPerSecond = (validExposure / 31536000) * severityVelocityMultiplier;

    const initialAccumulatedLoss = Math.max(0, (Date.now() - baselineAnchorTime) / 1000) * lossPerSecond;
    runningTotalRef.current = initialAccumulatedLoss;

    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const updateTicker = (now: number) => {
      if (isArchived) {
        if (displayRef.current) {
          displayRef.current.textContent = `$${runningTotalRef.current.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;
        }
        return;
      }

      const deltaSeconds = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (deltaSeconds > 0 && deltaSeconds < 1) {
        runningTotalRef.current += deltaSeconds * lossPerSecond;
      }

      if (displayRef.current) {
        displayRef.current.textContent = `$${runningTotalRef.current.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }

      animationFrameId = requestAnimationFrame(updateTicker);
    };

    animationFrameId = requestAnimationFrame(updateTicker);
    return () => cancelAnimationFrame(animationFrameId);
  }, [diagnosticCompletedAt, exposure, severityVelocityMultiplier, isArchived]);

  return (
    <div 
      ref={displayRef}
      className="font-mono font-black mt-2 tracking-tighter tabular-nums text-red-500 leading-none block break-keep text-4xl md:text-5xl"
    >
      $0.00
    </div>
  );
}

export default function UnifiedResultsPortal() {
  const router = useRouter();
  const { id, live_sync, unblurred, decay, spend: querySpend, leakage, tax } = router.query;

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audit, setAudit] = useState<AuditRecord | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => { 
    setMounted(true); 
  }, []);

  // 📡 REAL-TIME SUBSCRIPTION LISTENER
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
        loading && setLoading(false); 
      }
    };
    
    fetchInitialAuditState();

    const channelSubscription = supabase.channel(`live-workshop-${id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "audits", filter: `id=eq.${id}` }, 
        (payload) => { if (payload.new) setAudit(payload.new as AuditRecord); }
      ).subscribe();

    return () => { supabase.removeChannel(channelSubscription); };
  }, [id, mounted]);

  const dbDecay = useMemo(() => {
    if (live_sync === "true" && decay) return parseInt(decay as string);
    return audit?.decay_pct || 24;
  }, [live_sync, decay, audit?.decay_pct]);

  const spend = useMemo(() => {
    if (live_sync === "true" && querySpend) return parseFloat(querySpend as string);
    return audit?.ai_spend || 1.2;
  }, [live_sync, querySpend, audit?.ai_spend]);

  const isPhaseTwoActive = useMemo(() => {
    return !!audit?.is_released || unblurred === "true" || audit?.status?.toUpperCase() === 'PAID';
  }, [audit?.is_released, unblurred, audit?.status]);

  const isPaidGateUnlocked = useMemo(() => {
    return audit?.status?.toUpperCase() === 'PAID';
  }, [audit?.status]);

  const metrics = useMemo(() => {
    if (live_sync === "true" && leakage && tax) {
      const parsedTax = parseFloat(tax as string);
      return {
        fteCount: audit?.roi_pct ? audit.roi_pct : Math.round((spend * 1000000) / 200000) || 6,
        totalLaborTaxPool: parsedTax,
        internalReworkTax: parsedTax * 0.60,
        operationalDragTax: parsedTax * 0.40,
        exposure: parseFloat(leakage as string) - parsedTax
      };
    }

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
  }, [dbDecay, spend, audit?.roi_pct, live_sync, leakage, tax]);

  const accentColorClass = isPhaseTwoActive ? "text-red-500" : "text-green-500"; 
  const borderAccentClass = isPhaseTwoActive ? "border-red-600" : "border-green-600"; 

  // 📝 CLEANED PLACEHOLDER TEXT DATA STRINGS WITH ROBUST BASELINE FALLBACKS
  const genericAnomalies: AnomalyNode[] = useMemo(() => {
    const pool = metrics.totalLaborTaxPool > 0 ? metrics.totalLaborTaxPool : 180000;
    
    return [
      { 
        id: `ANOMALY SEGMENT ALPHA // LOSS BASELINE $${(pool * 0.35).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
        description: "Diagnostic scan parameters verified. Detailed root cause analytics and process map variations are fully compiled and locked under initial intake protocols.", 
        severity: "SECURE GATE", 
        directive: "Schedule your forensic data briefing to unlock complete segment vectors." 
      },
      { 
        id: `ANOMALY SEGMENT BETA // LOSS BASELINE $${(pool * 0.28).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
        description: "Diagnostic scan parameters verified. Detailed root cause analytics and process map variations are fully compiled and locked under initial intake protocols.", 
        severity: "SECURE GATE", 
        directive: "Schedule your forensic data briefing to unlock complete segment vectors." 
      },
      { 
        id: `ANOMALY SEGMENT GAMMA // LOSS BASELINE $${(pool * 0.22).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
        description: "Diagnostic scan parameters verified. Detailed root cause analytics and process map variations are fully compiled and locked under initial intake protocols.", 
        severity: "SECURE GATE", 
        directive: "Schedule your forensic data briefing to unlock complete segment vectors." 
      },
      { 
        id: `ANOMALY SEGMENT DELTA // LOSS BASELINE $${(pool * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
        description: "Diagnostic scan parameters verified. Detailed root cause analytics and process map variations are fully compiled and locked under initial intake protocols.", 
        severity: "SECURE GATE", 
        directive: "Schedule your forensic data briefing to unlock complete segment vectors." 
      }
    ];
  }, [metrics.totalLaborTaxPool]);

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

  const fireTriangulationCalibrationSequence = () => {
    const clientEmail = audit?.lead_email ? encodeURIComponent(audit.lead_email) : "";
    
    const isQuadNode = 
      router.query.type?.toString().toLowerCase() === 'quad' || 
      audit?.audit_type?.toString().toLowerCase() === 'quad' ||
      audit?.status?.toUpperCase() === 'QUAD_ACTIVE';

    const baseCalibrationUrl = isQuadNode
      ? "https://calendly.com/hello-bmradvisory/quad-node-calibration"
      : "https://calendly.com/hello-bmradvisory/systems-triangulation-calibration";

    const specializedUrl = clientEmail ? `${baseCalibrationUrl}?email=${clientEmail}` : baseCalibrationUrl;
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

  const verifyIsAdminView = String(router.query.live_sync).toLowerCase() === "true";

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
          <button 
            onClick={() => {
              const queryParams = new URLSearchParams(window.location.search);
              if (!queryParams.has("id") && id) {
                queryParams.set("id", id as string);
              }
              window.open(`/api/generate-pdf?${queryParams.toString()}`, "_blank");
            }} 
            className="flex items-center gap-2 bg-slate-950 hover:bg-white hover:text-black border border-slate-800 text-xs px-5 py-3 font-mono"
          >
              DOWNLOAD FORENSIC LEDGER PDF
          </button>
        )}
      </nav>

      <main className="max-w-7xl mx-auto pt-12 md:pt-16 px-6 md:px-12 pb-32 space-y-12">
        <div className="border-l-2 border-slate-800 pl-4 py-1 space-y-1">
          <span className="text-slate-500 font-mono text-[9px] tracking-[0.3em] block">// METHODOLOGY METRIC READOUT SPECIFICATION</span>
          <p className="text-slate-300 font-sans text-xs leading-relaxed font-black normal-case max-w-4xl">
            {isPhaseTwoActive 
              ? `Operational metrics have been actively calibrated live to your team's real world footprint of $${Number(audit?.ai_spend || spend).toFixed(1)}M annual software allocations across an ecosystem of ${metrics.fteCount} FTE resources.` 
              : `Metrics are currently generated using proportional standard model assumptions indexed to your captured Logic Decay Coefficient of ${dbDecay}%. Specific workforce calibration parameters are held inside terminal status using system defaults of $1.2M annual software allocations across an ecosystem of 6 FTE resources.`
            }
          </p>
        </div>

        {audit?.status?.toUpperCase() === 'TRIANGULATION_ACTIVE' && (
          <div className="bg-slate-950 border border-amber-600/30 p-6 font-mono text-left space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-[10px] tracking-widest text-amber-500 font-black uppercase">
                // ACTIVE SYSTEM TRIANGULATION DETECTED
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans normal-case">
              <p className="text-xs text-slate-300 max-w-3xl font-medium leading-relaxed">
                Your telemetry tracks are currently processing. Please remind your team operators to review their email folders and complete their configuration inputs. You must select the calendar connection terminal to lock in your verification review session now.
              </p>
              <button 
                onClick={fireTriangulationCalibrationSequence}
                className="bg-amber-600 hover:bg-amber-700 text-black border border-amber-500 text-[10px] font-mono tracking-widest px-5 py-3 uppercase font-black shrink-0 self-start md:self-auto cursor-pointer transition-all"
              >
                Lock Calibration Date
              </button>
            </div>
          </div>
        )}

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
              diagnosticCompletedAt={audit?.created_at || "2026-07-16T00:00:00.000Z"} 
              exposure={metrics.exposure + metrics.totalLaborTaxPool} 
              anomalies={activeAnomaliesList}
              isArchived={audit?.status?.toUpperCase() === 'ARCHIVED'}
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
              <div 
                key={`anomaly-node-${index}`} 
                className={`border p-8 bg-slate-950/60 flex flex-col justify-between relative min-h-[280px] transition-all ${isPaidGateUnlocked ? 'border-red-500/20 bg-red-950/5' : 'border-green-500/20 bg-green-950/5'}`}
              >
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

        {/* 🛡️ GOVERNANCE & COMPLIANCE SUPPLEMENT DIRECTIVE BLOCK */}
        <GovernanceSupplementView />

        {/* Admin Command Strip Container */}
        {verifyIsAdminView && (
          <div className="pt-6 border-t border-slate-900/60 mt-8 space-y-6">
            <div className="bg-slate-950 border-2 border-dashed border-red-600/20 p-6 font-mono text-left">
              <span className="text-[9px] tracking-widest text-red-500 font-black block uppercase mb-1.5">// ADMINISTRATIVE RECOVERY SYSTEM</span>
              <p className="text-xs text-slate-400 normal-case mb-4 font-medium font-sans">Automatically re-transmit the secure access link to the target stakeholder's inbox without leaving the workspace presentation.</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-black border border-slate-900 p-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-tight">Registered Recipient Email:</span>
                  <span className="text-slate-500 font-mono text-xs lowercase select-all break-all tracking-tight font-bold mt-1">
                    {audit?.lead_email || "No email bound to dossier state."}
                  </span>
                </div>
                <button 
                  disabled={!audit?.lead_email}
                  onClick={async () => {
                    try {
                      const res = await fetch('/api/resend-verdict', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ auditId: audit?.id || id }),
                      });
                      if (!res.ok) throw new Error();
                      setCopiedLink(true); 
                      setTimeout(() => setCopiedLink(false), 3000);
                    } catch (err) {
                      alert("METRIC EXCEPTION: Re-transmission pathway obstructed.");
                    }
                  }}
                  className={`font-black px-5 py-3 text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer border shrink-0 ${
                    copiedLink 
                      ? "bg-green-600 border-green-600 text-white" 
                      : "bg-red-600 border-red-600 text-white hover:bg-white hover:text-black"
                  } ${!audit?.lead_email ? "opacity-30 cursor-not-allowed pointer-events-none" : ""}`}
                >
                  {copiedLink ? <Check size={12} /> : <Activity size={12} className={copiedLink ? "" : "animate-pulse"} />}
                  {copiedLink ? "EMAIL SENT SUCCESSFULLY" : "AUTO-RESEND LINK"}
                </button>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-900 p-8 font-mono text-left">
              <div className="border-b border-slate-900 pb-3 mb-6">
                <span className="text-[9px] tracking-widest text-amber-500 font-black block uppercase">// LIVE CONSULTATION PLAYBOOK DISPATCH</span>
                <h4 className="text-lg font-black text-white italic tracking-tight mt-1">CORE PERSONA DISCOVERY LENSES</h4>
                <p className="text-[11px] text-slate-500 normal-case font-sans mt-1">Execute these hard-targeted diagnostic vectors at the tail-end of Call 1 immediately following the presentation of the primary System Verdict.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-xs normal-case font-medium">
                <div className="border border-slate-900 bg-black/40 p-5 space-y-3">
                  <span className="text-[9px] font-mono tracking-widest text-red-500 font-black block uppercase">// 1. THE STRATEGIC LENS (C-SUITE / BOARD LIABILITY)</span>
                  <div className="space-y-2 text-slate-300">
                    <p><strong>Q1:</strong> "When you look at your annual automation expenditure, what percentage of that capital do you estimate is currently leaking into repetitive, unbudgeted maintenance cycles?"</p>
                    <p className="pt-2 border-t border-slate-900/50"><strong>Q2:</strong> "If an automated data transformation or pipeline failure causes an unhedged operational exposure today, how long does it take for that risk to surface at the board or executive governance layer?"</p>
                  </div>
                </div>

                <div className="border border-slate-900 bg-black/40 p-5 space-y-3">
                  <span className="text-[9px] font-mono tracking-widest text-blue-400 font-black block uppercase">// 2. THE PIPELINE ENGINEERING LENS (DARRYL / INFRASTRUCTURE)</span>
                  <div className="space-y-2 text-slate-300">
                    <p><strong>Q1:</strong> "How frequently do unannounced third-party API mutations or silent schema transformations break your downstream data integrity? Is it a daily firefight or an intermittent weekly drift?"</p>
                    <p className="pt-2 border-t border-slate-900/50"><strong>Q2:</strong> "What is your primary data ingestion framework right now—are you relying on event-driven streaming runtimes, or scheduled cloud-bucket batch pipelines?"</p>
                  </div>
                </div>

                <div className="border border-slate-900 bg-black/40 p-5 space-y-3">
                  <span className="text-[9px] font-mono tracking-widest text-purple-400 font-black block uppercase">// 3. THE OPERATIONAL MANAGEMENT LENS (TEAM SHADOW LABOR)</span>
                  <div className="space-y-2 text-slate-300">
                    <p><strong>Q1:</strong> "What percentage of your core engineering team's capacity is being burned on 'shadow labor'—meaning they are manually repeating repairs and nursing broken integrations instead of building new velocity?"</p>
                    <p className="pt-2 border-t border-slate-900/50"><strong>Q2:</strong> "When a critical structural fracture happens, do your teams have documented, immutable recovery runbooks, or are you heavily reliant on undocumented tribal knowledge to patch the system?"</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-mono text-slate-500 block mb-3 tracking-widest">// ADMINISTRATOR CONTROLS SYSTEM</span>
              <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full">
                <div className="w-full">
                  <button
                    disabled={!isPaidGateUnlocked}
                    onClick={(e) => {
                      if (!isPaidGateUnlocked) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      setIsEmailModalOpen(true);
                    }}
                    className={`flex items-center justify-center gap-3 text-xs font-mono tracking-wider p-5 border uppercase transition-all duration-300 w-full ${
                      isPaidGateUnlocked
                        ? "bg-red-600 hover:bg-red-700 text-white border-red-500 cursor-pointer shadow-lg shadow-red-950/20"
                        : "bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed opacity-50 pointer-events-none select-none"
                    }`}
                  >
                    <Activity size={14} className={isPaidGateUnlocked ? "animate-pulse" : ""} />
                    {isPaidGateUnlocked ? "LAUNCH 360 DEEP DIVE" : "360 DEEP DIVE LOCKED // AWAITING VERIFIED INTAKE PAYMENT"}
                  </button>
                </div>

                <button 
                  onClick={fireBriefingSequence}
                  className="bg-amber-600 hover:bg-amber-700 text-black border border-amber-500 text-xs font-mono tracking-wider p-5 uppercase w-full font-black tracking-tight cursor-pointer"
                >
                  COMPILE PARTIAL ANSWERS
                </button>
              </div>
            </div>
          </div>
        )}

        {!verifyIsAdminView && !isPhaseTwoActive && (
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
