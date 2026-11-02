"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Lock, Activity, Download } from "lucide-react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { AuditRecord } from "@/types/database.types";
import { isFiniteNumber } from "@/utils/auditGuards";
import { formatBMRCurrency } from "@/utils/formatters";
import { dispatchPDFGeneration } from "@/workers/auditExportWorker";
import ExportPlaybookButton from "@/components/diagnostic/ExportPlaybookButton";

interface DisplayAnomaly {
  id: string;
  description: string;
  directive: string;
}

interface LossTickerProps { 
  diagnosticCompletedAt?: string; 
  exposure: number;
  isArchived: boolean; 
}

interface UnifiedResultsPortalProps {
  auditId?: string;
}

const SECTOR_MULTIPLIERS: Record<string, number> = {
  FINANCE: 1.35, FINANCIAL_SERVICES: 1.35, COMPLIANCE: 1.35,
  HEALTHCARE: 1.40, LIABILITY: 1.40, INDUSTRIAL: 1.15,
  MANUFACTURING: 1.15, OPERATIONS: 1.15, SERVICES: 1.20,
  LABOR: 1.20, DEFAULT: 1.28
};

function RealTimeLossTicker({ diagnosticCompletedAt, exposure, isArchived }: LossTickerProps) {
  const frozenLossRef = useRef<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const anchorTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (isArchived) return;
    const parsed = diagnosticCompletedAt ? Date.parse(diagnosticCompletedAt) : Number.NaN;
    if (!Number.isNaN(parsed) && parsed > 0 && parsed < Date.now()) {
      anchorTimeRef.current = parsed;
      setElapsedSeconds(Math.max(0, (Date.now() - parsed) / 1000));
    } else {
      anchorTimeRef.current = Date.now();
      setElapsedSeconds(0);
    }

    const interval = setInterval(() => {
      setElapsedSeconds(Math.max(0, (Date.now() - anchorTimeRef.current) / 1000));
    }, 250);

    return () => clearInterval(interval);
  }, [diagnosticCompletedAt, isArchived]);

  const safeExposure = useMemo(() => {
    const parsed = Number(exposure);
    return isFiniteNumber(parsed) && parsed > 0 ? parsed : 462528;
  }, [exposure]);

  let dynamicAccumulatedLoss = (safeExposure / 31536000) * elapsedSeconds * 1.15;
  if (dynamicAccumulatedLoss <= 0 && elapsedSeconds > 0) dynamicAccumulatedLoss = 0.05 + elapsedSeconds * 0.01;

  if (isArchived) {
    if (frozenLossRef.current === null) frozenLossRef.current = dynamicAccumulatedLoss;
    dynamicAccumulatedLoss = frozenLossRef.current;
  } else {
    frozenLossRef.current = null;
  }

  return (
    <div className="font-mono font-bold mt-2 tracking-tight tabular-nums text-red-700 leading-none block break-keep text-4xl md:text-5xl">
      {"$" +
        dynamicAccumulatedLoss.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
    </div>
  );
}

export default function UnifiedResultsPortal({ auditId }: UnifiedResultsPortalProps) {
  let pagesRouterId: string | null = null;
  try {
    const router = useRouter();
    pagesRouterId = typeof router?.query?.id === "string" ? router.query.id : null;
  } catch {
    // Fallback outside Pages Router
  }

  let navigationParamsId: string | null = null;
  try {
    const params = useParams();
    navigationParamsId = typeof params?.id === "string" ? params.id : null;
  } catch {
    // Fallback outside App Router
  }

  const resolvedId = auditId || pagesRouterId || navigationParamsId || null;

  const searchParams = useSearchParams();
  const live_sync = searchParams?.get("live_sync");
  const decay = searchParams?.get("decay");
  const querySpend = searchParams?.get("spend");
  const tax = searchParams?.get("tax");
  const querySector = searchParams?.get("sector");

  const [audit, setAudit] = useState<AuditRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [exportingPdf, setExportingPdf] = useState(false);

  useEffect(() => {
    if (!resolvedId) return;

    let cancelled = false;

    const isAuditRecord = (x: unknown): x is AuditRecord => {
      if (typeof x !== "object" || x === null) return false;
      return (
        "id" in x && typeof x.id === "string" &&
        "created_at" in x && typeof x.created_at === "string" &&
        "org_name" in x && typeof x.org_name === "string"
      );
    };

    const fetchInitialAudit = async () => {
      try {
        const { data, error } = await supabase
          .from("audits")
          .select("*")
          .eq("id", resolvedId)
          .single();

        if (error) throw error;
        if (!cancelled && data && isAuditRecord(data)) {
          setAudit(data);
        }
      } catch (err) {
        console.error("Audit state fetch failure:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchInitialAudit();

    let channel: RealtimeChannel | null = null;
    try {
      channel = supabase
        .channel(`live-workshop-${resolvedId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "audits",
            filter: `id=eq.${resolvedId}`,
          },
          (payload) => {
            const next = payload?.new;
            if (!cancelled && next && isAuditRecord(next)) {
              setAudit((prev) => (prev ? { ...prev, ...next } : next));
            }
          }
        );
      channel.subscribe();
    } catch (wsErr) {
      console.warn("Realtime WebSocket connection bypassed:", wsErr);
    }

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
    };
  }, [resolvedId]);

  const dbDecay = useMemo(() => {
    if (live_sync === "true" && decay) {
      const parsed = parseInt(decay, 10);
      return isFiniteNumber(parsed) ? parsed : 24;
    }
    return audit?.decay_pct ?? 24;
  }, [live_sync, decay, audit?.decay_pct]);

  const spend = useMemo(() => {
    if (live_sync === "true" && querySpend) {
      const parsed = parseFloat(querySpend);
      return isFiniteNumber(parsed) ? parsed : 1.2;
    }
    return audit?.ai_spend ?? 1.2;
  }, [live_sync, querySpend, audit?.ai_spend]);

  const metrics = useMemo(() => {
    const toSafeNumber = (val: unknown, fallback: number): number => {
      if (isFiniteNumber(val)) return val;
      if (typeof val === "string") {
        const parsed = Number(val);
        if (isFiniteNumber(parsed)) return parsed;
      }
      return fallback;
    };

    const safeSpend = Math.max(0, toSafeNumber(spend, 1.2));
    const safeDecay = Math.max(0, toSafeNumber(dbDecay, 24));

    const rawRoi = audit?.roi_pct;
    const rawFte = toSafeNumber(rawRoi, 0);
    const safeFteCount =
      rawFte > 0
        ? rawFte
        : Math.round((safeSpend * 1000000) / 200000) || 6;

    const selectedSectorKey = (querySector ?? audit?.sector ?? "SERVICES")
      .toUpperCase()
      .trim()
      .replace(/\s+/g, "_");

    const auditSectorMult = toSafeNumber(audit?.sector_multiplier, 1.0);
    const activeSectorMultiplier =
      auditSectorMult > 0 && auditSectorMult !== 1.0
        ? auditSectorMult
        : SECTOR_MULTIPLIERS[selectedSectorKey] ||
          SECTOR_MULTIPLIERS.DEFAULT ||
          1.28;

    const fullyLoadedCost = 160000 * 1.3;
    const baseLaborTaxPool = (safeDecay / 100) * 0.5 * (safeFteCount * fullyLoadedCost);

    let totalLaborTaxPool = baseLaborTaxPool;
    let totalExposure = Math.round(0.22 * (safeDecay / 25) * (safeSpend * 1000000) * activeSectorMultiplier);

    if (live_sync === "true" && tax) {
      const parsedTax = parseFloat(tax);
      if (isFiniteNumber(parsedTax)) {
        totalLaborTaxPool = parsedTax < 1000 ? parsedTax * 1000000 : parsedTax;
      }
    }

    return {
      fteCount: safeFteCount,
      totalLaborTaxPool,
      internalReworkTax: totalLaborTaxPool * 0.60,
      operationalDragTax: totalLaborTaxPool * 0.40,
      exposure: totalExposure,
    };
  }, [dbDecay, spend, audit?.roi_pct, audit?.sector, audit?.sector_multiplier, querySector, live_sync, tax]);

  const handleDownloadPreliminaryBrief = async () => {
    if (!audit) return;
    try {
      setExportingPdf(true);
      const blob = await dispatchPDFGeneration(audit, metrics);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `BMR-Diagnostic-Brief-${audit.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setExportingPdf(false);
    }
  };

  const anomaliesList: DisplayAnomaly[] = useMemo(() => {
    return [
      { 
        id: `Data Safety Rules // Impact ${formatBMRCurrency(metrics.totalLaborTaxPool * 0.35)}`, 
        description: "Baseline evaluation complete. Outside vendor data rules and safety verification controls are held under evaluation protocol.", 
        directive: "Compile your SteerCo Funding Dossier and book an executive briefing to reveal full remediation steps." 
      },
      { 
        id: `Vendor Change Response // Impact ${formatBMRCurrency(metrics.totalLaborTaxPool * 0.28)}`, 
        description: "Baseline evaluation complete. System response mechanisms for outside vendor API changes are held under evaluation protocol.", 
        directive: "Compile your SteerCo Funding Dossier and book an executive briefing to reveal full remediation steps." 
      },
      { 
        id: `Staff Memory Dependency // Impact ${formatBMRCurrency(metrics.totalLaborTaxPool * 0.22)}`, 
        description: "Baseline evaluation complete. Daily operational reliance on employee memory for broken system hand-offs is held under evaluation protocol.", 
        directive: "Compile your SteerCo Funding Dossier and book an executive briefing to reveal full remediation steps." 
      },
      { 
        id: `Emergency Playbooks // Impact ${formatBMRCurrency(metrics.totalLaborTaxPool * 0.15)}`, 
        description: "Baseline evaluation complete. Automated fallback guides and team playbooks for workflow failures are held under evaluation protocol.", 
        directive: "Compile your SteerCo Funding Dossier and book an executive briefing to reveal full remediation steps." 
      }
    ];
  }, [metrics.totalLaborTaxPool]);

  if (loading || !audit) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center font-bold">
        <Activity className="animate-spin mb-4 text-slate-950" size={48} />
        <p className="text-xs tracking-wider text-slate-600 font-mono">Loading diagnostic results...</p>
      </div>
    );
  }

  const calculatedExposureSum = metrics.exposure + metrics.totalLaborTaxPool;
  const safeExposureSum = calculatedExposureSum > 0 ? calculatedExposureSum : 462528;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden text-left antialiased">
      <div className="h-1 bg-slate-950 w-full" />

      {/* HEADER */}
      <nav className="h-20 bg-white border-b border-slate-200 px-6 md:px-12 flex items-center justify-between shadow-sm">
        <div>
          <div className="text-slate-950 text-xl font-extrabold tracking-tight">
            BMR<span className="text-emerald-700">SOLUTIONS</span>
          </div>
          <span className="text-xs text-slate-500 font-mono block mt-0.5">
            Portal Mode // Diagnostic Baseline
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ExportPlaybookButton />
          <button
            onClick={handleDownloadPreliminaryBrief}
            disabled={exportingPdf}
            className="flex items-center gap-2 border border-slate-300 hover:border-slate-950 text-slate-900 text-xs px-4 py-2 font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            <Download size={14} />
            {exportingPdf ? "Exporting Brief..." : "Export Promise Gap™ PDF"}
          </button>
        </div>
      </nav>

      {/* MAIN BODY */}
      <main className="max-w-7xl mx-auto pt-8 md:pt-12 px-6 md:px-12 pb-24 space-y-10">
        <div className="border-l-2 border-slate-300 pl-4 py-1 space-y-1">
          <span className="text-slate-500 font-mono text-xs font-bold block">// METHODOLOGY & CALCULATION INPUTS</span>
          <p className="text-slate-700 font-sans text-xs leading-relaxed max-w-4xl">
            This diagnostic uses standard industry baselines calibrated to your captured AI Readiness Score of {100 - dbDecay}%.
            Specific workforce calibration parameters assume default inputs of $${spend}M annual software allocations across {metrics.fteCount} FTE resources.
          </p>
        </div>

        {/* HERO EXECUTIVE CARD */}
        <div className="bg-white text-slate-950 p-8 md:p-12 border-l-8 md:border-l-[12px] border-slate-900 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-y border-r border-slate-200 shadow-sm">
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-slate-500 block mb-1 uppercase tracking-wider">
                Independent Governance // Zero Security Footprint
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-950">
                Diagnostic Results
              </h1>
              <p className="text-xs font-mono text-slate-500 mt-2">
                Prepared for: {audit?.org_name || "Evaluation Client System"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-left">
              <div className="flex flex-col justify-between">
                <span className="text-xs text-slate-500 font-medium">AI Readiness Score</span>
                <p className="text-sm font-bold mt-1 text-slate-950">
                  Readiness: <span className="text-emerald-700 text-base">{100 - dbDecay}%</span>
                </p>
              </div>

              <div className="flex flex-col justify-between">
                <span className="text-xs text-slate-500 font-medium">Process Waste & Rework</span>
                <p className="text-sm font-bold mt-1 text-slate-950">
                  Liability: <span className="font-mono text-slate-950">{formatBMRCurrency(metrics.totalLaborTaxPool)}</span>
                </p>
              </div>

              <div className="flex flex-col justify-between">
                <span className="text-xs text-slate-500 font-medium">Total Risk Exposure</span>
                <p className="text-sm font-bold mt-1 text-slate-950">
                  Total Risk: <span className="font-mono text-slate-950">{formatBMRCurrency(safeExposureSum)}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block md:col-span-1 justify-self-center h-full w-[1px] bg-slate-200" />
          
          <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end text-left md:text-right pt-4 md:pt-0 min-w-[240px] shrink-0">
            <span className="text-xs font-mono font-bold text-slate-500 block uppercase tracking-wider">Estimated Ongoing Capital Loss</span>
            <RealTimeLossTicker 
              diagnosticCompletedAt={audit?.compiled_at || audit?.created_at || audit?.updated_at || undefined} 
              exposure={safeExposureSum} 
              isArchived={audit?.status?.toUpperCase() === 'ARCHIVED'}
            />
            <span className="text-xs text-slate-500 block font-mono mt-2">
              Accumulated financial loss since assessment completed
            </span>
          </div>
        </div>

        {/* METRICS SPLIT CARDS (Matches Screenshot Exactly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-2 rounded-sm shadow-sm">
            <div className="text-4xl md:text-5xl font-black text-slate-950 font-mono tracking-tight">{formatBMRCurrency(metrics.internalReworkTax)}</div>
            <span className="text-xs font-bold text-slate-500 tracking-wider uppercase block">Wasted Engineering & Fix Hours</span>
          </div>
          <div className="bg-white border border-slate-200 p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-2 shadow-sm rounded-sm">
            <div className="text-4xl md:text-5xl font-black text-emerald-700 font-mono tracking-tight">{formatBMRCurrency(metrics.operationalDragTax)}</div>
            <span className="text-xs font-bold text-slate-500 tracking-wider uppercase block">Testing & Validation Fatigue</span>
          </div>
        </div>

        {/* ANOMALIES MATRIX (Matches Screenshot Exactly) */}
        <div className="pt-4 text-left">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <span className="text-xs font-mono font-bold text-slate-500 block uppercase tracking-wider">// HIGH-RISK OPERATIONAL AREAS</span>
            <h3 className="text-2xl font-black tracking-tight mt-1 text-slate-950 uppercase">Key Findings & Integration Risks</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {anomaliesList.map((frac, index) => (
              <div 
                key={frac.id || index} 
                className="border border-slate-200 bg-white p-6 rounded-sm flex flex-col justify-between relative min-h-[220px] shadow-sm"
              >
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 font-mono">
                  <span className="text-xs text-slate-500 font-bold uppercase">Finding #{index + 1}</span>
                  <span className="text-xs px-2.5 py-0.5 font-bold uppercase flex items-center gap-1.5 border rounded-sm bg-emerald-50 text-emerald-800 border-emerald-200">
                    <Lock size={12} /> 
                    Gate Cleared
                  </span>
                </div>
                <div className="my-4 space-y-2">
                  <h4 className="text-base font-bold text-slate-950">{frac.id}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{frac.description}</p>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <div className="text-xs text-slate-500 font-bold uppercase mb-1">Recommended Action:</div>
                  <div className="text-xs text-slate-800 font-medium">{frac.directive}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ENGAGEMENT ROADMAP & FORENSIC MILESTONES (NEXT STEPS PRESERVED) */}
        <div className="mt-12 border border-slate-200 bg-white p-8 rounded-sm shadow-sm font-sans">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-1">
              // ENGAGEMENT ROADMAP & FORENSIC MILESTONES
            </span>
            <h3 className="text-2xl font-black uppercase text-slate-950">
              HOW YOUR DIAGNOSTIC VERDICT IS PROCESSED
            </h3>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-8">
            Next, we convert your directional score into a comprehensive enterprise baseline by gathering input from key roles and preparing your final, board-ready <strong>Statement of Work (SOW)</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs mb-8">
            <div className="border border-slate-200 bg-slate-50 p-5 rounded-sm flex flex-col justify-between space-y-3 relative">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-700 font-bold block">// STAGE 01 // COMPLETE</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-xs">CURRENT</span>
                </div>
                <h4 className="font-bold text-slate-950 uppercase text-sm font-sans">
                  Initial Pulse Check (Directional Diagnostic Baseline)
                </h4>
                <p className="text-slate-600 font-sans mt-2 text-xs leading-normal">
                  Converts your start state into directional baselining (e.g., <strong>$118K waste</strong>, <strong>81% readiness</strong>) and identifies the top operational flags that must be validated next.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 uppercase font-mono">
                OUTPUT: DIRECTIONAL DIAGNOSTIC BASELINE (PRELIMINARY LEDGER)
              </div>
            </div>

            <div className="border border-slate-200 bg-slate-50 p-5 rounded-sm flex flex-col justify-between space-y-3">
              <div>
                <span className="text-red-700 font-bold block mb-2">// STAGE 02 // NEXT STEP</span>
                <h4 className="font-bold text-slate-950 uppercase text-sm font-sans">
                  Triangulation (3-Track Survey → Workforce Scale Lock-In)
                </h4>
                <p className="text-slate-600 font-sans mt-2 text-xs leading-normal">
                  Conducts a 3-person survey across <strong>Executive</strong>, <strong>Managerial</strong>, and <strong>Technical</strong> tracks to lock workforce scale and software run-rates (e.g., <strong>$3.2M spend</strong> / <strong>35 FTEs</strong>).
                </p>
                <p className="text-slate-600 font-sans mt-2 text-[11px] leading-normal">
                  <strong>Why numbers evolve:</strong> Stage 02 turns baseline assumptions into calibrated run-rate reality.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 uppercase font-mono">
                OUTPUT: TRIANGULATED RUN-RATE METRICS LEDGER
              </div>
            </div>

            <div className="border border-slate-200 bg-slate-50 p-5 rounded-sm flex flex-col justify-between space-y-3">
              <div>
                <span className="text-slate-500 font-bold block mb-2">// STAGE 03 // FINAL VERDICT</span>
                <h4 className="font-bold text-slate-950 uppercase text-sm font-sans">
                  QuadNode Forensic Cockpit (4-Persona Quad-Calibrated Analysis)
                </h4>
                <p className="text-slate-600 font-sans mt-2 text-xs leading-normal">
                  Expands into the 4-persona matrix by adding the <strong>System User</strong> track alongside Executive, Tech Mgmt, and Ops Mgmt—then produces the Final Diagnostic Verdict.
                </p>
                <p className="text-slate-600 font-sans mt-2 text-[11px] leading-normal">
                  <strong>Includes:</strong> peer variance benchmarking, true burn rate, cross-persona disconnects, and governance thresholds (circuit-breakers) that unlock the Final Active SOW.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 uppercase font-mono">
                OUTPUT: FINAL ACTIVE SOW + VERIFICATION CERTIFICATE
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-sm mb-8">
            <span className="text-red-700 font-mono text-xs font-bold uppercase tracking-wider block mb-3">
              // FINAL QUADNODE DELIVERABLES INCLUDED UPON COMPLETION:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[11px] text-slate-700">
              <div className="bg-white p-3 border border-slate-200">
                <strong className="text-slate-950 block mb-1">1. Sector Variance Index</strong>
                Re-indexes AI readiness vs. peer sector benchmarks (e.g., <em>Score 56</em> vs. <em>Benchmark 76</em>).
              </div>
              <div className="bg-white p-3 border border-slate-200">
                <strong className="text-slate-950 block mb-1">2. True Financial Burn Rate</strong>
                Quantifies annual capacity waste, weekly burn rate, and a recovery ROI multiplier.
              </div>
              <div className="bg-white p-3 border border-slate-200">
                <strong className="text-slate-950 block mb-1">3. Cross-Persona Alignment Matrix</strong>
                Pins down exact disconnects across Executive, Tech Mgmt, Ops Mgmt, and System User layers.
              </div>
              <div className="bg-white p-3 border border-slate-200">
                <strong className="text-slate-950 block mb-1">4. Governance & Compliance Supplement</strong>
                Generates circuit-breaker thresholds: DLP exposure ceilings, API schema mutation gates, and max drift tolerance.
              </div>
            </div>
          </div>

          <div className="bg-slate-950 text-white p-6 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-red-700">
            <div className="space-y-1">
              <span className="text-red-500 font-mono text-[10px] font-bold uppercase tracking-wider block">
                // STAGE 01 COMPLETE — ADMIN PROCEEDS TO TRIANGULATION
              </span>
              <h4 className="font-bold text-lg uppercase tracking-tight text-white">
                NEXT: THREE-TRACK TRIANGULATION (ADMIN-TRIGGERED)
              </h4>
              <p className="text-slate-400 text-xs font-sans">
                Your report is queued for Stage 02 calibration. After admin approval, QuadNode will expand into the 4-persona cockpit and unlock the Final Active SOW.
              </p>
            </div>
            <div className="text-xs text-slate-300 font-mono text-left md:text-right shrink-0">
              No action required by the user.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
