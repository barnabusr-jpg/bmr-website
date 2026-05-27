"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Lock, Unlock, Activity, Info, FileText } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { AuditRecord } from "@/types/database.types";

export default function UnifiedResultsPortal() {
  const router = useRouter();
  const { id } = router.query;

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audit, setAudit] = useState<AuditRecord | null>(null);
  const [liveErosion, setLiveErosion] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
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
        if (data) setAudit(data as AuditRecord);
      } catch (err) {
        console.error("PORTAL_DATABASE_FETCH_ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialAuditState();

    const channelSubscription = supabase
      .channel(`live-workshop-${id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "audits", filter: `id=eq.${id}` },
        (payload) => {
          if (payload.new) setAudit(payload.new as AuditRecord);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelSubscription);
    };
  }, [id, mounted]);

  const dbDecay = audit?.decay_pct || 24;
  const isPhaseTwoActive = !!audit?.is_released;
  const spend = audit?.ai_spend || 1.2;
  
  const fteCount = audit?.roi_pct ? audit.roi_pct : Math.round((spend * 1000000) / 200000) || 5;
  const sectorType = (audit?.sector || "general").toLowerCase().trim();
  
  let laborMultiplier = 0.4;
  let baseExposureRate = 0.18;
  let highExposureRate = 0.30;

  let accentColorClass = "text-red-600";
  let borderAccentClass = "border-red-600";
  let fallbackDirectiveColor = "text-red-500";

  if (sectorType === "finance" || sectorType === "banking") {
    laborMultiplier = 0.5;
    baseExposureRate = 0.22;
    highExposureRate = 0.35;
    accentColorClass = "text-green-500";
    borderAccentClass = "border-green-600";
    fallbackDirectiveColor = "text-green-500";
  } else if (sectorType === "healthcare" || sectorType === "medical") {
    laborMultiplier = 0.45;
    baseExposureRate = 0.20;
    highExposureRate = 0.32;
    accentColorClass = "text-blue-500";
    borderAccentClass = "border-blue-600";
    fallbackDirectiveColor = "text-blue-500";
  }

  const laborTax = (dbDecay / 100) * laborMultiplier * (fteCount * 160000 * 1.3);
  const selectedExposureRate = dbDecay > 60 ? highExposureRate : baseExposureRate;
  const exposure = (selectedExposureRate * (spend * 1000000)) * 1.15;

  useEffect(() => {
    if (loading) return;
    setLiveErosion(dbDecay * 1.45);
    const counterInterval = setInterval(() => {
      setLiveErosion((prev) => prev + 0.01);
    }, 150);
    return () => clearInterval(counterInterval);
  }, [loading, dbDecay]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-red-600 italic">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="font-mono text-xs uppercase tracking-[0.4em] font-black">DECRYPTING_SECURE_VAULT_METRICS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white relative font-sans overflow-x-hidden text-left uppercase italic font-black">
      <nav className="h-28 bg-black/40 backdrop-blur-md border-b border-slate-900/60 px-12 flex items-center justify-between">
        <div className="flex flex-col items-start space-y-0.5">
          <div className="text-white font-black uppercase text-xl tracking-tighter leading-none italic">
            BMR<span className={accentColorClass}>SOLUTIONS</span>
          </div>
          <span className={`text-[8px] font-mono uppercase tracking-[0.3em] font-black italic ${accentColorClass}`}>
            {isPhaseTwoActive ? "PORTAL_MODE // PARTNER_PHASE_2" : "PORTAL_MODE // DIAGNOSTIC_PHASE_1"}
          </span>
        </div>
        
        {isPhaseTwoActive && (
          <button
            onClick={() => window.open(`/api/generate-pdf?id=${id}`, "_blank")}
            className="flex items-center gap-2 bg-slate-950 hover:bg-white hover:text-black transition-all border border-slate-800 text-xs px-5 py-3 tracking-widest font-mono"
          >
            <FileText size={14} /> DOWNLOAD_FORENSIC_LEDGER.PDF
          </button>
        )}
      </nav>

      <main className="max-w-7xl mx-auto pt-16 px-12 pb-32 space-y-12">
        <div className={`bg-white text-black p-10 md:p-14 border-l-[16px] grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl relative transition-all duration-300 ${borderAccentClass}`}>
          <div className="md:col-span-7 flex flex-col justify-between space-y-10">
            <div>
              <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-black">
                {isPhaseTwoActive ? "SYSTEM_REALITY" : "EFFICIENCY_VERDICT"}
              </h1>
              <p className="text-[11px] font-mono text-slate-400 font-black uppercase tracking-widest mt-2">
                TARGET IDENTIFIER // {audit?.org_name || "EVALUATION CLIENT SYSTEM"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100 text-left">
              <div>
                <span className={`text-[9px] font-mono block uppercase font-black tracking-wider ${accentColorClass}`}>LOGIC_DECAY_COEFFICIENT</span>
                <p className="text-xs font-black uppercase mt-2 leading-tight text-slate-900">
                  DECAY INDEX: <span className={`${accentColorClass} text-base`}>{dbDecay}%</span>
                </p>
              </div>
              <div>
                <span className={`text-[9px] font-mono block uppercase font-black tracking-wider ${accentColorClass}`}>PROCESS_WASTE_TAX</span>
                <p className="text-xs font-black uppercase mt-2 leading-tight text-slate-900">
                  LIABILITY: <span className={`${accentColorClass} font-mono text-sm`}>${laborTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}.</span>
                </p>
              </div>
              <div>
                <span className={`text-[9px] font-mono block uppercase font-black tracking-wider ${accentColorClass}`}>PROJECTED_ANNUAL_EXPOSURE</span>
                <p className="text-xs font-black uppercase mt-2 leading-tight text-slate-900">
                  TOTAL CAPITAL RISK: <span className={`${accentColorClass} font-mono text-sm`}>${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}.</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block md:col-span-1 justify-self-center h-full w-[1px] bg-slate-200/80" />
          
          <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end text-left md:text-right pt-6 md:pt-0">
            <span className="text-[10px] font-mono text-slate-400 font-black tracking-widest uppercase block">
              CAPITAL_EROSION_VELOCITY
            </span>
            <div className={`text-4xl md:text-5xl font-mono font-black mt-2 tracking-tight italic leading-none tabular-nums ${accentColorClass}`}>
              ${((exposure / 31536000) * liveErosion).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[9px] font-mono text-slate-400 block tracking-wider uppercase mt-1">REAL-TIME_ACCUMULATED_DRIFT_LOSS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#050b18] border border-slate-900 p-16 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
            <div className="text-6xl md:text-7xl font-black text-white tracking-tighter italic font-mono">
              ${laborTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <span className="text-[10px] font-mono text-slate-500 tracking-[0.25em] uppercase font-black block">
              VALIDATED_REWORK_LIABILITY_TAX
            </span>
          </div>
          <div className="bg-[#050b18] border border-slate-900 p-16 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
            <div className={`text-6xl md:text-7xl font-black tracking-tighter italic font-mono ${accentColorClass}`}>
              ${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <span className={`text-[10px] font-mono tracking-[0.25em] uppercase font-black block ${accentColorClass}`}>
              TOTAL_COMPUTATIONAL_EXPOSURE_INDEX
            </span>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-900 p-6 text-left flex items-start gap-4 shadow-xl">
          <Info className={`${accentColorClass} shrink-0 mt-0.5`} size={16} />
          <div className="space-y-1">
            <span className="text-white font-mono text-[10px] tracking-widest uppercase font-black block">
              SYSTEM CONFIGURATION // MODEL_READOUT_SPECIFICATION
            </span>
            <p className="text-slate-400 font-sans text-[11px] leading-relaxed font-black italic uppercase tracking-tight normal-case">
              {isPhaseTwoActive 
                ? `Operational metrics have been actively calibrated live to your team's real-world footprint of $${spend}M annual software allocations across an ecosystem of ${fteCount} FTE resources.` 
                : `Metrics are currently generated using proportional standard model assumptions indexed to your captured Logic Decay Coefficient of ${dbDecay}%. Specific workforce calibration parameters are held inside terminal status.`
              }
            </p>
          </div>
        </div>

        <div className="pt-8 text-left">
          <div className="border-b border-slate-900 pb-4 mb-8 flex justify-between items-end">
            <div>
              <span className="text-[10px] font-mono text-slate-500 tracking-widest font-black uppercase">// DETECTED_VULNERABILITY_LOCATIONS</span>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mt-1 text-white">IDENTIFIED SYSTEMIC ANOMALIES</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isPhaseTwoActive && audit?.fractures && audit.fractures.length > 0 ? (
              audit.fractures.map((frac: any, index: number) => {
                const isCritical = frac.severity === 'CRITICAL';
                const directiveTextColor = isCritical ? 'text-red-500' : fallbackDirectiveColor;

                return (
                  <div 
                    key={frac.id || index} 
                    className={`border p-8 bg-slate-950/60 flex flex-col justify-between relative transition-all duration-300 min-h-[280px] ${
                      isCritical ? 'border-red-600/40 hover:border-red-600 bg-red-950/5' : `border-slate-900 hover:${borderAccentClass}/30`
                    }`}
                  >
                    <div className="flex justify-between items-center border-b border-slate-900 pb-4 font-mono">
                      <span className="text-[10px] text-slate-500 tracking-widest font-black">// INDEX NODE FR-0{index + 1}</span>
                      <span className={`text-[9px] tracking-widest px-2.5 py-0.5 font-black flex items-center gap-1.5 ${isCritical ? 'bg-red-600/20 text-red-500 border border-red-600/30' : 'bg-amber-600/20 text-amber-500 border border-amber-600/30'}`}>
                        <Unlock size={10} /> {frac.severity || 'HIGH'} RISK
                      </span>
                    </div>

                    <div className="my-6 space-y-2">
                      <h4 className="text-xl font-black italic tracking-tight text-white uppercase font-mono">
                        {String(frac.id || 'ANOMALY_DETECTED').replace(/_/g, " ")}
                      </h4>
                      <p className="text-xs font-sans normal-case text-slate-300 font-normal leading-relaxed">
                        {frac.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-900 pt-4 font-mono">
                      <div className="text-[9px] text-slate-600 tracking-widest font-black mb-1">REQUIRED TARGETED REMEDIATION DIRECTIVE:</div>
                      <div className={`text-xs font-black uppercase italic tracking-tight ${directiveTextColor}`}>
                        {frac.directive}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              [1, 2, 3, 4].map((nodeIdx) => (
                <div key={nodeIdx} className="border border-slate-900 p-8 bg-slate-950/20 flex flex-col justify-between relative min-h-[280px]">
                  <div className="flex justify-between items-center border-b border-slate-900/60 pb-4 font-mono">
                    <span className="text-[10px] text-slate-600 tracking-widest font-black">// INDEX NODE FR-0{nodeIdx}</span>
                    <span className="text-[9px] tracking-widest px-2.5 py-0.5 font-black bg-slate-950 text-slate-500 border border-slate-900/60 flex items-center gap-1.5">
                      <Lock size={10} className="text-slate-600" /> RESTRICTED_ACCESS
                    </span>
                  </div>

                  <div className="my-6 space-y-2">
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-sm tracking-tight font-black">
                      [SUB_SURFACE_ANOMALY_DETECTED]
                    </div>
                    <p className="text-[11px] font-sans normal-case text-slate-500 font-normal leading-relaxed">
                      Diagnostic telemetry captures distinct structural variance matching high-risk infrastructure leakage inside this layer. Granular root-cause metrics and custom technical log anomalies are restricted until a partnership framework is initialized.
                    </p>
                  </div>

                  <div className="border-t border-slate-900/60 pt-4 font-mono">
                    <div className="text-[9px] text-slate-600 tracking-widest font-black mb-0.5">REMEDIATION PROTOCOL ACTIONABLE PLAYBOOK:</div>
                    <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight">
                      REQUIRES COMMERCIALLY EXPEDITED PARTNERSHIP BRIEFING
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {!isPhaseTwoActive && (
          <div 
            className="bg-white p-10 md:p-14 flex flex-col items-center justify-center group cursor-pointer border-l-[16px] shadow-2xl italic text-center mt-12 hover:bg-slate-50 transition-all duration-300" 
            onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-briefing')}
            style={{ borderColor: sectorType === "finance" ? "#16a34a" : sectorType === "healthcare" ? "#2563eb" : "#dc2626" }}
          >
            <div className="max-w-4xl w-full flex flex-col items-center space-y-4">
              <h4 className="text-black text-2xl md:text-3xl font-black tracking-tighter leading-none italic uppercase transition-colors group-hover:text-red-600">
                INITIALIZE_DIAGNOSTIC_BRIEFING
              </h4>
              <p className="text-slate-500 text-[10px] font-black italic tracking-[0.25em] uppercase">
                [ CLICK TO ENGAGE WORKSHOP CONFIGURATOR & CONFIRM RECONSTRUCTION RUN ]
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-900/80 text-[10px] font-mono text-slate-500 tracking-widest font-black uppercase italic">
          <div>DATA_VERTICLES_SECURED</div>
          <div className="text-left md:text-center">DRIFT_DIAGNOSTICS_PORTAL_v2.6</div>
          <div className="text-left md:text-right flex items-center md:justify-end gap-2">
            SYSTEM_STATUS <span className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${isPhaseTwoActive ? 'bg-green-500' : 'bg-red-600'}`} /> 
            <span className={isPhaseTwoActive ? "text-green-500" : "text-red-600"}>
              {isPhaseTwoActive ? "DEPLOYMENT: FULL_ACCESS_PARTNER" : "DEPLOYMENT: GATED_BASELINE_PREVIEW"}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
