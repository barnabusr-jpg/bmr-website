"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { Lock, Unlock, Activity, FileText } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { AnomalyNode, AuditRecord } from "@/types/database.types";

interface LossTickerProps { 
  diagnosticCompletedAt?: string; 
  exposure: number;
  anomalies: Array<{ severity: string }>;
  isArchived: boolean; 
}

// 🏢 CANONICAL SECTOR RISK MULTIPLIERS (Indexed to 4-Card Strategy Intake UI)
const SECTOR_MULTIPLIERS: Record<string, number> = {
  // Option 1: Finance / Compliance
  FINANCE: 1.35,
  FINANCIAL_SERVICES: 1.35,
  COMPLIANCE: 1.35,

  // Option 2: Healthcare / Liability
  HEALTHCARE: 1.40,
  LIABILITY: 1.40,

  // Option 3: Industrial / Operations
  INDUSTRIAL: 1.15,
  MANUFACTURING: 1.15,
  OPERATIONS: 1.15,

  // Option 4: Services / Labor
  SERVICES: 1.20,
  LABOR: 1.20,

  // Standard Fallback
  DEFAULT: 1.28
};

// 🏎️ ACCELERATED COMPARE-STATE TICKER ENGINE (CONTINUOUS LIVE TICKER)
function RealTimeLossTicker({ 
  diagnosticCompletedAt, 
  exposure,
  anomalies,
  isArchived
}: LossTickerProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(10);
  const frozenLossRef = useRef<number | null>(null);
  
  // Anchor baseline initialized to 10 seconds ago
  const anchorTimeRef = useRef<number>(Date.now() - 10000);

  const severityVelocityMultiplier = useMemo(() => {
    let multiplier = 1.0;
    if (!anomalies || !Array.isArray(anomalies)) return multiplier;
    anomalies.forEach(anomaly => {
      const severity = anomaly?.severity?.toUpperCase();
      if (severity === 'CRITICAL') multiplier += 2.5; 
      if (severity === 'HIGH') multiplier += 1.5;
      if (severity === 'MEDIUM') multiplier += 0.5;
    });
    return multiplier;
  }, [anomalies]);

  useEffect(() => {
    // Override anchor time if valid DB timestamp exists and is in the past
    let parsed = diagnosticCompletedAt ? Date.parse(diagnosticCompletedAt) : NaN;
    if (!isNaN(parsed) && parsed > 0 && parsed < Date.now()) {
      anchorTimeRef.current = parsed;
    }

    const interval = setInterval(() => {
      if (isArchived) return;
      const now = Date.now();
      const delta = Math.max(0.1, (now - anchorTimeRef.current) / 1000);
      setElapsedSeconds(delta * severityVelocityMultiplier);
    }, 100); 

    return () => clearInterval(interval);
  }, [diagnosticCompletedAt, severityVelocityMultiplier, isArchived]);

  // 🛡️ Ensure valid non-zero exposure ($462,528 fallback if prop is 0/null/NaN)
  const safeExposure = useMemo(() => {
    const parsed = Number(exposure);
    return (!isNaN(parsed) && parsed > 0) ? parsed : 462528;
  }, [exposure]);

  let dynamicAccumulatedLoss = (safeExposure / 31536000) * elapsedSeconds;

  // Guarantee visible progression
  if (dynamicAccumulatedLoss <= 0) {
    dynamicAccumulatedLoss = 0.05 + (elapsedSeconds * 0.01);
  }

  if (isArchived) {
    if (frozenLossRef.current === null) {
      frozenLossRef.current = dynamicAccumulatedLoss;
    }
    dynamicAccumulatedLoss = frozenLossRef.current;
  } else {
    frozenLossRef.current = null; 
  }

  return (
    <div className="font-mono font-bold mt-2 tracking-tight tabular-nums text-red-600 leading-none block break-keep text-4xl md:text-5xl">
      ${dynamicAccumulatedLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </div>
  );
}

export default function UnifiedResultsPortal() {
  const router = useRouter();
  const { id, live_sync, unblurred, decay, spend: querySpend, leakage, tax, sector: querySector } = router.query;

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audit, setAudit] = useState<AuditRecord | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  useEffect(() => { 
    setMounted(true); 
  }, []);

  // 📡 DATABASE FETCH & REALTIME LISTENER
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

  const dbDecay = useMemo(() => {
    if (live_sync === "true" && decay) return parseInt(decay as string);
    return audit?.decay_pct || 24;
  }, [live_sync, decay, audit?.decay_pct]);

  const spend = useMemo(() => {
    if (live_sync === "true" && querySpend) return parseFloat(querySpend as string);
    return audit?.ai_spend || 1.2;
  }, [live_sync, querySpend, audit?.ai_spend]);

  const isPhaseTwoActive = useMemo(() => {
    return (
      !!audit?.is_released || 
      unblurred === "true" || 
      audit?.status?.toUpperCase() === 'PAID' ||
      audit?.status?.toUpperCase() === 'UNBLURRED'
    );
  }, [audit?.is_released, unblurred, audit?.status]);

  const isPaidGateUnlocked = useMemo(() => {
    return audit?.status?.toUpperCase() === 'PAID';
  }, [audit?.status]);

  // 🧮 UNIFIED & DYNAMIC METRICS CALCULATION ENGINE
  const metrics = useMemo(() => {
    const fteCount = audit?.roi_pct 
      ? audit.roi_pct 
      : Math.round((spend * 1000000) / 200000) || 6;

    const baseLaborTaxPool = (dbDecay / 100) * 0.5 * (fteCount * 160000 * 1.3);

    const selectedSectorKey = (
      (querySector as string) || 
      (audit as any)?.sector || 
      "SERVICES"
    ).toUpperCase().trim().replace(/\s+/g, "_");

    const activeSectorMultiplier = 
      (audit as any)?.sector_multiplier && (audit as any).sector_multiplier > 0
        ? (audit as any).sector_multiplier
        : SECTOR_MULTIPLIERS[selectedSectorKey] || SECTOR_MULTIPLIERS.DEFAULT;

    let totalLaborTaxPool = baseLaborTaxPool;
    let totalExposure = Math.round(0.22 * (dbDecay / 25) * (spend * 1000000) * activeSectorMultiplier);

    if (live_sync === "true" && tax) {
      const parsedTax = parseFloat(tax as string);
      totalLaborTaxPool = parsedTax < 1000 ? parsedTax * 1000000 : parsedTax;
      totalExposure = Math.round(0.22 * (dbDecay / 25) * (spend * 1000000) * activeSectorMultiplier);
    }

    return {
      fteCount,
      activeSectorMultiplier,
      totalLaborTaxPool,
      internalReworkTax: totalLaborTaxPool * 0.60,
      operationalDragTax: totalLaborTaxPool * 0.40,
      exposure: totalExposure
    };
  }, [dbDecay, spend, audit?.roi_pct, (audit as any)?.sector, (audit as any)?.sector_multiplier, querySector, live_sync, tax]);

  const accentColorClass = isPhaseTwoActive ? "text-red-600" : "text-emerald-700"; 
  const borderAccentClass = isPhaseTwoActive ? "border-red-600" : "border-slate-900"; 

  const genericAnomalies: AnomalyNode[] = useMemo(() => [
    { 
      id: `ANOMALY SEGMENT ALPHA // LOSS BASELINE $${(metrics.totalLaborTaxPool * 0.35).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
      description: "Pre-automation diagnostic verified. Detailed context isolation and schema drift vectors are locked under intake security protocols.", 
      severity: "SECURE GATE", 
      directive: "Schedule your executive data briefing to unlock complete pre-automation vectors." 
    },
    { 
      id: `ANOMALY SEGMENT BETA // LOSS BASELINE $${(metrics.totalLaborTaxPool * 0.28).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
      description: "Pre-automation diagnostic verified. Detailed context isolation and schema drift vectors are locked under intake security protocols.", 
      severity: "SECURE GATE", 
      directive: "Schedule your executive data briefing to unlock complete pre-automation vectors." 
    },
    { 
      id: `ANOMALY SEGMENT GAMMA // LOSS BASELINE $${(metrics.totalLaborTaxPool * 0.22).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
      description: "Pre-automation diagnostic verified. Detailed context isolation and schema drift vectors are locked under intake security protocols.", 
      severity: "SECURE GATE", 
      directive: "Schedule your executive data briefing to unlock complete pre-automation vectors." 
    },
    { 
      id: `ANOMALY SEGMENT DELTA // LOSS BASELINE $${(metrics.totalLaborTaxPool * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
      description: "Pre-automation diagnostic verified. Detailed context isolation and schema drift vectors are locked under intake security protocols.", 
      severity: "SECURE GATE", 
      directive: "Schedule your executive data briefing to unlock complete pre-automation vectors." 
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
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-900 font-bold">
        <Activity className="animate-spin mb-4 text-slate-900" size={48} />
        <p className="font-mono text-xs tracking-widest text-slate-600 uppercase">DECRYPTING SECURE VAULT METRICS...</p>
      </div>
    );
  }

  const verifyIsAdminView = String(router.query.live_sync).toLowerCase() === "true";

  // Calculate clean exposure sum with non-zero fallback
  const calculatedExposureSum = metrics.exposure + metrics.totalLaborTaxPool;
  const safeExposureSum = calculatedExposureSum > 0 ? calculatedExposureSum : 462528;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden text-left antialiased">
      {/* TOP DECK ACCENT BAR */}
      <div className="h-1 bg-slate-900 w-full" />

      {/* NAVIGATION HEADER */}
      <nav className="h-20 bg-white border-b border-slate-200 px-6 md:px-12 flex items-center justify-between shadow-sm">
        <div>
          <div className="text-slate-900 text-xl font-bold tracking-tight">
            BMR<span className={accentColorClass}>SOLUTIONS</span>
          </div>
          <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 block mt-0.5">
            {isPhaseTwoActive ? "PORTAL MODE // PRE-AUTOMATION CONTROL PLANE" : "PORTAL MODE // DIAGNOSTIC PHASE 1"}
          </span>
        </div>
        {isPhaseTwoActive && (
          <button 
            onClick={() => window.open(`/api/generate-pdf?id=${id}`, "_blank")} 
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs px-5 py-2.5 font-medium rounded transition-colors shadow-sm"
          >
            <FileText size={14} />
            DOWNLOAD FORENSIC LEDGER PDF
          </button>
        )}
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto pt-8 md:pt-12 px-6 md:px-12 pb-24 space-y-10">
        
        {/* METHODOLOGY HEADER */}
        <div className="border-l-2 border-slate-300 pl-4 py-1 space-y-1">
          <span className="text-slate-500 font-mono text-[10px] tracking-wider block uppercase">// METHODOLOGY METRIC READOUT SPECIFICATION</span>
          <p className="text-slate-700 font-sans text-xs leading-relaxed max-w-4xl">
            {isPhaseTwoActive 
              ? `Operational metrics have been actively calibrated live to your team's real world footprint of $${spend}M annual software allocations across an ecosystem of ${metrics.fteCount} FTE resources.` 
              : `Metrics are currently generated using proportional standard model assumptions indexed to your captured AI Readiness Gap of ${100 - dbDecay}% (${dbDecay}% Friction). Specific workforce calibration parameters are held inside terminal status using system defaults of $${spend}M annual software allocations across an ecosystem of ${metrics.fteCount} FTE resources.`
            }
          </p>
        </div>

        {/* HERO EXECUTIVE SUMMARY CARD */}
        <div className={`bg-white text-slate-900 p-8 md:p-12 border-l-8 md:border-l-[12px] grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-sm border-slate-200 ${borderAccentClass}`}>
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold tracking-wider text-slate-500 block uppercase mb-1">
                INDEPENDENT FORENSIC VERIFICATION // ZERO-ACCESS AUDIT
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                {isPhaseTwoActive ? "SYSTEM REALITY" : "EFFICIENCY VERDICT"}
              </h1>
              <p className="text-xs font-mono text-slate-500 tracking-wider mt-2">
                TARGET IDENTIFIER // {audit?.org_name || "EVALUATION CLIENT SYSTEM"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-left">
              <div className="flex flex-col justify-between">
                <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">AI READINESS GAP</span>
                <p className="text-sm font-bold mt-1 text-slate-900">
                  READINESS: <span className={`${accentColorClass} text-base`}>{100 - dbDecay}%</span>
                </p>
              </div>

              <div className="flex flex-col justify-between">
                <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">PROCESS WASTE TAX™</span>
                <p className="text-sm font-bold mt-1 text-slate-900">
                  LIABILITY: <span className="font-mono text-slate-900">${metrics.totalLaborTaxPool.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </p>
              </div>

              <div className="flex flex-col justify-between">
                <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">PROMISE GAP™ EXPOSURE</span>
                <p className="text-sm font-bold mt-1 text-slate-900">
                  TOTAL RISK: <span className="font-mono text-slate-900">${safeExposureSum.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block md:col-span-1 justify-self-center h-full w-[1px] bg-slate-200" />
          
          <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end text-left md:text-right pt-4 md:pt-0 min-w-[240px] shrink-0">
            <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase block">// CAPITAL EROSION VELOCITY</span>
            
            {/* 🏎️ SAFE TICKER CALL WITH COMPILED_AT & NON-ZERO FALLBACK */}
            <RealTimeLossTicker 
              diagnosticCompletedAt={(audit as any)?.compiled_at || audit?.created_at || (audit as any)?.updated_at} 
              exposure={safeExposureSum} 
              anomalies={activeAnomaliesList}
              isArchived={audit?.status?.toUpperCase() === 'ARCHIVED'}
            />
            
            <span className="text-[10px] font-mono text-slate-500 block tracking-wider uppercase mt-2">
              {audit?.status?.toUpperCase() === 'ARCHIVED' ? "// METRIC LOCKED // ARCHIVED VALUE" : "// REAL TIME LOSS SINCE VERDICT LOCK"}
            </span>
          </div>
        </div>

        {/* METRICS SPLIT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-2 shadow-sm rounded-lg">
            <div className="text-4xl md:text-5xl font-extrabold text-slate-900 font-mono tracking-tight">${metrics.internalReworkTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <span className="text-xs font-mono text-slate-500 tracking-wider block uppercase">REWORK & SCHEMA DRIFT TAX</span>
          </div>
          <div className="bg-white border border-slate-200 p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-2 shadow-sm rounded-lg">
            <div className={`text-4xl md:text-5xl font-extrabold font-mono tracking-tight ${accentColorClass}`}>${metrics.operationalDragTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <span className="text-xs font-mono text-slate-500 tracking-wider block uppercase">VALIDATION & TELEMETRY FATIGUE TAX</span>
          </div>
        </div>

        {/* REMEDIATION & PARTNER HAND-OFF DIRECTIVE BANNER */}
        <div className="p-5 bg-slate-100 border-l-4 border-slate-900 rounded-r shadow-sm space-y-1">
          <span className="text-slate-900 font-mono text-xs font-bold block uppercase tracking-wider">
            // REMEDIATION HAND-OFF DIRECTIVE:
          </span>
          <p className="text-slate-700 text-xs leading-relaxed">
            BMR Solutions operates strictly as an independent forensic observer and does not author software code or perform direct system integration. The execution guidelines below are engineered for hand-off to your internal software engineering personnel or designated third-party consulting partners.
          </p>
        </div>

        {/* ANOMALIES CHART INDEX */}
        <div className="pt-4 text-left">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <span className="text-[10px] font-mono text-slate-500 tracking-wider block uppercase">// DETECTED VULNERABILITY LOCATIONS</span>
            <h3 className="text-2xl font-bold tracking-tight mt-1 text-slate-900">IDENTIFIED SYSTEMIC ANOMALIES</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeAnomaliesList.map((frac: any, index: number) => (
              <div 
                key={frac.id || index} 
                className={`border p-6 bg-white rounded-lg flex flex-col justify-between relative min-h-[260px] shadow-sm transition-all ${
                  isPaidGateUnlocked ? 'border-red-200 bg-red-50/20' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 font-mono">
                  <span className="text-[10px] text-slate-500 tracking-wider">// INDEX NODE FR-0{index + 1}</span>
                  <span className={`text-[10px] tracking-wider px-2.5 py-0.5 font-medium flex items-center gap-1.5 border rounded uppercase ${
                    isPaidGateUnlocked ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {isPaidGateUnlocked ? <Unlock size={12} /> : <Lock size={12} />} 
                    {isPaidGateUnlocked ? frac.severity : "GATE CLEARED"}
                  </span>
                </div>
                <div className="my-4 space-y-2">
                  <h4 className="text-base font-bold text-slate-900 font-mono">{String(frac.id || 'ANOMALY DETECTED')}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{frac.description}</p>
                </div>
                <div className="border-t border-slate-100 pt-3 font-mono">
                  <div className="text-[10px] text-slate-500 tracking-wider mb-1">REQUIRED TARGETED REMEDIATION DIRECTIVE:</div>
                  <div className="text-xs font-sans text-slate-800 font-medium">{frac.directive}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔒 VIEW A: Admin Command Controls */}
        {verifyIsAdminView ? (
          <div className="pt-6 border-t border-slate-200 mt-8">
            <span className="text-[10px] font-mono text-slate-500 block mb-3 tracking-wider uppercase">// ADMINISTRATOR CONTROLS SYSTEM</span>
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
                  className={`flex items-center justify-center gap-3 text-xs font-mono tracking-wider p-4 border rounded uppercase transition-all duration-300 w-full ${
                    isPaidGateUnlocked
                      ? "bg-red-600 hover:bg-red-700 text-white border-red-500 cursor-pointer shadow-sm"
                      : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60 pointer-events-none select-none"
                  }`}
                >
                  <Activity size={14} className={isPaidGateUnlocked ? "animate-pulse" : ""} />
                  {isPaidGateUnlocked ? "LAUNCH 360 DEEP DIVE" : "360 DEEP DIVE LOCKED // AWAITING VERIFIED INTAKE PAYMENT"}
                </button>
              </div>

              <button 
                onClick={fireBriefingSequence}
                className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 text-xs font-mono tracking-wider p-4 uppercase w-full font-bold rounded cursor-pointer transition-colors shadow-sm"
              >
                COMPILE PARTIAL ANSWERS
              </button>
            </div>
          </div>
        ) : (
          /* 🌐 VIEW B: Customer Landing CTA */
          !isPhaseTwoActive && (
            <div 
              className="bg-white text-slate-900 p-8 md:p-12 flex flex-col items-center justify-center group cursor-pointer border-l-8 border-slate-900 shadow-sm text-center mt-12 hover:bg-slate-100/50 transition-all duration-300 rounded-r-lg" 
              onClick={fireBriefingSequence}
            >
              <h4 className="text-slate-900 text-xl md:text-2xl font-bold transition-colors group-hover:text-slate-700">
                GENERATE STEERCO FUNDING DOSSIER & SOW
              </h4>
              <p className="text-slate-500 text-xs font-mono tracking-wider mt-2">
                [ STATUS: PROVISIONAL // READY FOR CFO & STEERCO SUBMISSION ]
              </p>
            </div>
          )
        )}
      </main>
    </div>
  );
}
