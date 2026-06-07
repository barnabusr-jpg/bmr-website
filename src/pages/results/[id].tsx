"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Lock, Unlock, Activity, Info } from "lucide-react";
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
    if (!id || !mounted || id === "undefined") return;
    
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
        (payload) => { 
          if (payload.new) {
            console.log("⚡ Live Workshop Sync Payload:", payload.new);
            
            const incomingIsReleased = !!payload.new.is_released;
            const sfi = payload.new.sfi_score || 0;

            // 🛡️ DATA SAFEGUARD GATE: Force numbers to freeze if SFI has not been calculated yet
            if (incomingIsReleased && sfi > 0) {
              setAudit(payload.new as AuditRecord); 
            } else {
              setAudit((prevAudit) => {
                if (!prevAudit) return payload.new as AuditRecord;
                return {
                  ...payload.new,
                  ai_spend: prevAudit.ai_spend,
                  decay_pct: prevAudit.decay_pct,
                  roi_pct: prevAudit.roi_pct,
                  sector: prevAudit.sector
                } as AuditRecord;
              });
            }
          }
        }
      ).subscribe();

    return () => { supabase.removeChannel(channelSubscription); };
  }, [id, mounted]);

  useEffect(() => {
    if (loading || !audit?.created_at) return;
    const calculateDeltaTime = () => {
      const historicalAnchorTime = new Date(audit.created_at).getTime();
      setElapsedSeconds(Math.max(0, (Date.now() - historicalAnchorTime) / 1000));
    };
    calculateDeltaTime();
    timerIntervalRef.current = setInterval(calculateDeltaTime, 100);
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [loading, audit?.created_at]);

  // =========================================================================
  // ⚙️ RECONCILED DYNAMIC CALCULATION BLOCK
  // =========================================================================
  const spend = audit?.ai_spend ? parseFloat(audit.ai_spend as any) : 1.2;
  const dbDecay = audit?.decay_pct ? parseFloat(audit.decay_pct as any) : 24;
  const fteCount = audit?.roi_pct ? parseInt(audit.roi_pct as any, 10) : Math.round((spend * 1000000) / 200000) || 5;

  const sfiScore = audit?.sfi_score || 0;
  const rawStatus = (audit?.status || "").toUpperCase().trim();
  
  // 🛡️ FRONTEND PRESENTER SAFE INTERCEPT: 
  // Force Phase 1 "EFFICIENCY VERDICT" view if SFI is 0, completely ignoring rogue string properties.
  const isPhaseTwoActive = sfiScore > 0 && (!!audit?.is_released || rawStatus === "COMPLETE" || rawStatus === "COMPLETED");

  const normalizedSector = (audit?.sector || "finance").toLowerCase().trim();
  const laborMultiplier = normalizedSector === 'finance' ? 0.5 : normalizedSector === 'healthcare' ? 0.45 : 0.4;
  
  const totalLaborTaxPool = (dbDecay / 100) * laborMultiplier * (fteCount * 160000 * 1.3);
  const internalReworkTax = totalLaborTaxPool * 0.60;   
  const operationalDragTax = totalLaborTaxPool * 0.40;  
  const exposure = (0.22 * (dbDecay / 25) * (spend * 1000000)) * 1.15;
  const dynamicAccumulatedLoss = (exposure / 31536000) * elapsedSeconds;

  const genericAnomalies: AnomalyNode[] = [
    { id: `ANOMALY SEGMENT ALPHA // LOSS BASELINE $${(totalLaborTaxPool * 0.35).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, description: "Diagnostic scan parameters verified.", severity: "SECURE GATE", directive: "Requires active 30 question operational diagnostic." },
    { id: `ANOMALY SEGMENT BETA // LOSS BASELINE $${(totalLaborTaxPool * 0.28).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, description: "Diagnostic scan parameters verified.", severity: "SECURE GATE", directive: "Requires active 30 question operational diagnostic." }
  ];

  const activeAnomaliesList = isPhaseTwoActive && audit?.fractures && audit.fractures.length > 0 ? audit.fractures : genericAnomalies;

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-green-500 italic">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="font-mono text-xs uppercase tracking-[0.4em] font-black">DECRYPTING SECURE VAULT METRICS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden text-left uppercase italic font-black">
      <nav className="h-28 bg-black/40 backdrop-blur-md border-b border-slate-900/60 px-6 md:px-12 flex items-center justify-between">
        <div>
          <div className="text-white text-xl tracking-tighter italic">BMR<span className="text-green-500">SOLUTIONS</span></div>
          <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-green-500 block mt-0.5">
            {isPhaseTwoActive ? "PORTAL MODE // PARTNER PHASE 2" : "PORTAL MODE // DIAGNOSTIC PHASE 1"}
          </span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-12 md:pt-16 px-6 md:px-12 pb-32 space-y-12">
        <div className={`bg-white text-black p-8 md:p-14 border-l-[12px] md:border-l-[16px] grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-green-600 shadow-2xl relative`}>
          <div className="md:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none text-black break-words">
                {isPhaseTwoActive ? "SYSTEM REALITY" : "EFFICIENCY VERDICT"}
              </h1>
              <p className="text-[10px] font-mono text-slate-400 tracking-widest mt-2.5">TARGET IDENTIFIER // {audit?.org_name || "EVALUATION SYSTEM"}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-left">
              <div><span className="text-[9px] font-mono block text-green-500 uppercase">LOGIC DECAY COEFFICIENT</span><p className="text-xs font-black mt-2 text-slate-900">DECAY INDEX: <span className="text-green-500 text-base">{dbDecay}%</span></p></div>
              <div><span className="text-[9px] font-mono block text-green-500 uppercase">PROCESS WASTE TAX</span><p className="text-xs font-black mt-2 text-slate-900">LIABILITY TOTAL: <span className="text-green-500 font-mono text-sm">${totalLaborTaxPool.toLocaleString(undefined, { maximumFractionDigits: 0 })}.</span></p></div>
              <div><span className="text-[9px] font-mono block text-green-500 uppercase">PROJECTED ANNUAL EXPOSURE</span><p className="text-xs font-black mt-2 text-slate-900">TOTAL CAPITAL RISK: <span className="text-green-500 font-mono text-sm">${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}.</span></p></div>
            </div>
          </div>
          
          <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end text-left md:text-right">
            <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">// CAPITAL EROSION VELOCITY</span>
            <div className="font-mono font-black mt-2 tracking-tighter tabular-nums text-green-500 text-4xl md:text-5xl">
              ${dynamicAccumulatedLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#050b18] border border-slate-900 p-12 text-center space-y-4 shadow-xl">
            <div className="text-5xl font-black text-white font-mono">${internalReworkTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <span className="text-[10px] font-mono text-slate-500 tracking-[0.25em] block">VALIDATED REWORK LIABILITY TAX</span>
          </div>
          <div className="bg-[#050b18] border border-slate-900 p-12 text-center space-y-4 shadow-xl">
            <div className="text-5xl font-black text-green-500 font-mono">${operationalDragTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <span className="text-[10px] font-mono text-green-500 tracking-[0.25em] block">SYSTEMIC OPERATIONAL DRAG TAX</span>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-900 p-6 flex items-start gap-4">
          <Info className="text-green-500 shrink-0 mt-0.5" size={16} />
          <div className="space-y-1">
            <span className="text-white font-mono text-[10px] tracking-widest block">SYSTEM CONFIGURATION // MODEL READOUT SPECIFICATION</span>
            <div className="text-slate-400 font-sans text-[11px] font-black normal-case">
              {isPhaseTwoActive 
                ? `Operational metrics have been actively calibrated live to your team's real world footprint of $${spend}M annual software allocations across an ecosystem of ${fteCount} FTE resources.` 
                : `Metrics are currently generated using proportional standard model assumptions indexed to your captured Logic Decay Coefficient of ${dbDecay}%. Specific workforce calibration parameters are held inside terminal status.`}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
