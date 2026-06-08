"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Activity, Monitor } from "lucide-react";
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
  // ⚙️ RECONCILED DYNAMIC CALCULATION BLOCK (FIXED TARGET BOUNDARIES)
  // =========================================================================
  const dbDecay = audit?.decay_pct ? parseFloat(audit.decay_pct as any) : 24;
  const normalizedSector = (audit?.sector || "finance").toLowerCase().trim();
  const laborMultiplier = normalizedSector === 'finance' ? 0.5 : normalizedSector === 'healthcare' ? 0.45 : 0.4;

  const sfiScore = audit?.sfi_score || 0;
  const rawStatus = (audit?.status || "").toUpperCase().trim();
  
  const isPhaseTwoActive = (rawStatus === "TRIANGULATING" || rawStatus === "BRIDGE_ACTIVE" || rawStatus === "DIAGNOSTIC_ACTIVE" || rawStatus === "COMPLETE" || rawStatus === "COMPLETED" || sfiScore > 0);

  const liveSpend = audit?.ai_spend ? parseFloat(audit.ai_spend as any) : 11.3;
  const liveFte = audit?.roi_pct ? parseInt(audit.roi_pct as any, 10) : 150;
  
  const baselineSpend = 3.3;
  const baselineFte = 40;

  const currentActiveSpend = isPhaseTwoActive ? liveSpend : baselineSpend;
  const currentActiveFte = isPhaseTwoActive ? liveFte : baselineFte;

  const totalLaborTaxPool = (dbDecay / 100) * laborMultiplier * (currentActiveFte * 160000 * 1.3);
  const internalReworkTax = totalLaborTaxPool * 0.60;   
  const operationalDragTax = totalLaborTaxPool * 0.40;  
  
  const exposure = ((dbDecay > 60 ? 0.30 : 0.18) * (currentActiveSpend * 1000000)) * 1.15;
  const dynamicAccumulatedLoss = (exposure / 31536000) * elapsedSeconds;

  const genericAnomalies: AnomalyNode[] = [
    { 
      id: `ANOMALY SEGMENT ALPHA // LOSS BASELINE $${(totalLaborTaxPool * 0.58).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
      description: "Initial diagnostic parameters verified. Preliminary structural risks have been recorded under initial intake protocols.", 
      severity: "SECURE GATE", 
      directive: "Phase 2 operational diagnostic unmasks root cause pathways causing organizational impact." 
    },
    { 
      id: `ANOMALY SEGMENT BETA // LOSS BASELINE $${(exposure * 0.70).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
      description: "Initial diagnostic parameters verified. Preliminary structural risks have been recorded under initial intake protocols.", 
      severity: "SECURE GATE", 
      directive: "Phase 2 operational diagnostic unmasks root cause pathways causing organizational impact." 
    }
  ];

  const activeAnomaliesList = (sfiScore > 0 && audit?.fractures && audit.fractures.length > 0) ? audit.fractures : genericAnomalies;

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-red-600 italic">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="font-mono text-xs uppercase tracking-[0.4em] font-black">DECRYPTING SECURE VAULT METRICS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden text-left uppercase italic font-black select-none">
      <nav className="h-28 bg-black/40 backdrop-blur-md border-b border-slate-900/60 px-6 md:px-12 flex items-center justify-between">
        <div>
          <div className="text-white text-xl tracking-tighter italic">BMR<span className="text-red-600">SOLUTIONS</span></div>
          <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-red-600 block mt-0.5">
            {isPhaseTwoActive ? "PORTAL MODE // SYSTEM REALITY SIMULATION" : "PORTAL MODE // INTAKE EFFICIENCY VERDICT"}
          </span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-12 md:pt-16 px-6 md:px-12 pb-32 space-y-6">
        
        <div className="bg-white text-black p-8 md:p-14 border-l-[12px] md:border-l-[16px] grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-red-600 shadow-2xl relative">
          <div className="md:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none text-black break-words">
                {isPhaseTwoActive ? "SYSTEM REALITY" : "EFFICIENCY VERDICT"}
              </h1>
              <p className="text-[10px] font-mono text-slate-400 tracking-widest mt-2.5">TARGET IDENTIFIER // {audit?.org_name || "EVALUATION SYSTEM"}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-left">
              <div><span className="text-[9px] font-mono block text-red-600 uppercase">LOGIC DECAY COEFFICIENT</span><p className="text-xs font-black mt-2 text-slate-900">DECAY INDEX: <span className="text-red-600 text-base">{dbDecay}%</span></p></div>
              <div><span className="text-[9px] font-mono block text-red-600 uppercase">PROCESS WASTE TAX</span><p className="text-xs font-black mt-2 text-slate-900">LIABILITY TOTAL: <span className="text-red-600 font-mono text-sm">${totalLaborTaxPool.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></p></div>
              <div><span className="text-[9px] font-mono block text-red-600 uppercase">PROJECTED ANNUAL EXPOSURE</span><p className="text-xs font-black mt-2 text-slate-900">TOTAL CAPITAL RISK: <span className="text-red-600 font-mono text-sm">${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></p></div>
            </div>
          </div>
          
          <div className="md:col-span-5 flex flex-col justify-center items-start md:items-end text-left md:text-right">
            <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">// CAPITAL EROSION VELOCITY</span>
            <div className="font-mono font-black mt-2 tracking-tighter tabular-nums text-red-600 text-4xl md:text-5xl">
              ${dynamicAccumulatedLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <div className="border border-slate-800 bg-slate-950 p-8 shadow-xl flex items-start gap-4">
          <Monitor className="text-red-600 mt-0.5 shrink-0" size={20} />
          <div className="space-y-1.5">
            <span className="text-white font-mono text-xs font-black tracking-widest block">SYSTEM CONFIGURATION // MODEL READOUT SPECIFICATION</span>
            <div className="text-slate-400 font-mono text-[12px] leading-relaxed normal-case italic font-black">
              {isPhaseTwoActive 
                ? `Operational metrics have been calibrated live to your team's real-world footprint of $${liveSpend.toFixed(1)}M annual software allocations across an ecosystem of ${liveFte} FTE resources.` 
                : `These operational metrics have been calibrated based on a generic footprint of $${baselineSpend.toFixed(1)}M annual software allocations across an ecosystem of ${baselineFte} FTE resources.`}
              <span className="text-slate-500 block mt-1 text-[11px] font-sans font-black tracking-normal">This provides critical structural context regarding baseline operational waste figures, which remain subject to live interactive tuning via simulation arrays.</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#050b18] border border-slate-900 p-12 text-center space-y-4 shadow-xl">
            <div className="text-5xl font-black text-white font-mono">${internalReworkTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <span className="text-[10px] font-mono text-slate-500 tracking-[0.25em] block">VALIDATED REWORK LIABILITY TAX</span>
          </div>
          <div className="bg-[#050b18] border border-slate-900 p-12 text-center space-y-4 shadow-xl">
            <div className="text-5xl font-black text-red-600 font-mono">${operationalDragTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <span className="text-[10px] font-mono text-red-600 tracking-[0.25em] block">SYSTEMIC OPERATIONAL DRAG TAX</span>
          </div>
        </div>

        <div className="pt-8 space-y-6">
          <div className="text-[10px] font-mono text-slate-500 font-black tracking-widest block">// DETECTED VULNERABILITY LOCATIONS</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeAnomaliesList.map((anomaly, idx) => (
              <div key={idx} className="border border-slate-900 bg-slate-950/40 p-8 flex flex-col justify-between min-h-[260px]">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">// INDEX NODE FR-0{idx + 1}</span>
                    <span className="text-[9px] font-mono px-3 py-1 bg-red-950/40 text-red-400 border border-red-900/30 font-black tracking-widest">{anomaly.severity || "SECURE GATE"}</span>
                  </div>
                  <h3 className="text-xl font-black italic text-white uppercase tracking-tight mb-2">
                    {anomaly.id}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed lowercase italic mb-6">
                    {anomaly.description}
                  </p>
                </div>
                <div className="border-t border-slate-900/60 pt-4 font-mono text-[11px] leading-tight">
                  <span className="text-red-500 font-black uppercase block mb-1">REQUIRED TARGETED REMEDIATION DIRECTIVE:</span>
                  <span className="text-slate-300 italic font-black">{anomaly.directive}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
