"use client";
import React, { useMemo } from 'react';
import { ShieldCheck, Lock, FileCheck, Layers, Cpu, AlertTriangle } from 'lucide-react';

interface GovernanceSupplementProps {
  metrics?: {
    totalLaborTaxPool: number;
    exposure: number;
    decay: number;
    spend: number;
  } | null;
  forensicAnalytics?: {
    reliabilityIndex: number;
    dominantBasis: string;
    dominantDriver: string;
    dominantVisibility: string;
    sampleSize: number;
  } | null;
  orgName?: string;
}

export function GovernanceSupplementView({ 
  metrics, 
  forensicAnalytics, 
  orgName = "TARGET SPECIFICATION" 
}: GovernanceSupplementProps) {

  // 🧮 DYNAMIC GOVERNANCE TARGETS CALCULATED FROM QUAD MATRIX RESULTS
  const governanceCalibrations = useMemo(() => {
    const taxPool = metrics?.totalLaborTaxPool || 180000;
    const reliability = forensicAnalytics?.reliabilityIndex || 65;
    const decay = metrics?.decay || 24;

    // Control parameters indexed dynamically to Quad Forensic Output
    const dlpRiskAllowance = Math.round((taxPool * 0.12) / 1000) * 1000;
    const apiInvalidationThreshold = Math.max(1, Math.round((100 - reliability) / 5));
    const processDriftTolerance = (decay * 0.45).toFixed(1);

    return {
      dlpRiskAllowance: `$${dlpRiskAllowance.toLocaleString()}`,
      apiInvalidationThreshold: `${apiInvalidationThreshold} Mutations / 10k Calls`,
      processDriftTolerance: `${processDriftTolerance}%`,
      signOffTier: taxPool > 250000 ? "EXECUTIVE BOARD LEVEL (CISO / CTO)" : "PLATFORM STEERCO"
    };
  }, [metrics, forensicAnalytics]);

  return (
    <div className="border border-amber-900/60 bg-amber-950/10 p-8 md:p-10 rounded-sm space-y-8 font-sans not-italic text-slate-300 mt-8">
      
      {/* HEADER SECTION */}
      <div className="border-b border-amber-900/60 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono text-amber-500 font-black tracking-widest block">// POST-QUAD GOVERNANCE CONTROL PLANE</span>
          <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic mt-1">
            GOVERNANCE & COMPLIANCE SUPPLEMENT
          </h3>
          <p className="text-xs text-amber-400/80 font-mono mt-1">
            ENTITY: {orgName} // SIGN-OFF TIER: {governanceCalibrations.signOffTier}
          </p>
        </div>
        <div className="bg-amber-950/40 border border-amber-600/40 px-4 py-2 font-mono text-xs text-amber-400 font-black rounded-xs tracking-wider uppercase flex items-center gap-2">
          <ShieldCheck size={16} /> QUAD CALIBRATED
        </div>
      </div>

      {/* SECTION A: EXECUTIVE SIGN-OFF CHECKLIST */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
          <FileCheck size={14} /> SECTION A // EXECUTIVE SIGN-OFF & DEPLOYMENT GATES
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="border border-amber-900/40 bg-black/50 p-4 rounded-xs">
            <span className="text-[9px] text-zinc-500 block">DLP RISK EXPOSURE CEILING</span>
            <strong className="text-white text-base block mt-1">{governanceCalibrations.dlpRiskAllowance}</strong>
            <span className="text-[9px] text-amber-500/80 block mt-1">Gated under Purview policies</span>
          </div>
          <div className="border border-amber-900/40 bg-black/50 p-4 rounded-xs">
            <span className="text-[9px] text-zinc-500 block">API SCHEMA MUTATION GATE</span>
            <strong className="text-white text-base block mt-1">{governanceCalibrations.apiInvalidationThreshold}</strong>
            <span className="text-[9px] text-amber-500/80 block mt-1">Circuit breaker trigger point</span>
          </div>
          <div className="border border-amber-900/40 bg-black/50 p-4 rounded-xs">
            <span className="text-[9px] text-zinc-500 block">MAX PROCESS DRIFT TOLERANCE</span>
            <strong className="text-white text-base block mt-1">{governanceCalibrations.processDriftTolerance}</strong>
            <span className="text-[9px] text-amber-500/80 block mt-1">Indexed to {metrics?.decay || 24}% Decay</span>
          </div>
        </div>
      </div>

      {/* SECTION B: SYSTEM CONTROL TARGETS */}
      <div className="space-y-4 pt-2 border-t border-amber-900/40">
        <h4 className="text-xs font-mono font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
          <Layers size={14} /> SECTION B // PURVIEW & API INGESTION CONTRACTS
        </h4>
        <ul className="space-y-2 font-mono text-xs text-zinc-300">
          <li className="flex items-start gap-2 border border-slate-900 bg-black/40 p-3 rounded-xs">
            <Lock size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block uppercase">Ingestion Contract Gate (Purview / DLP)</strong>
              Enforces automated sensitivity labeling across all downstream AI model context stores before data ingestion.
            </div>
          </li>
          <li className="flex items-start gap-2 border border-slate-900 bg-black/40 p-3 rounded-xs">
            <Cpu size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block uppercase">Microservice Adapter Decoupling</strong>
              Isolates sliding third-party API data payloads through abstract serialization interfaces to prevent runtime sprint degradation.
            </div>
          </li>
        </ul>
      </div>

      {/* SECTION C: FAILURE BEHAVIOR DIRECTIVES */}
      <div className="space-y-2 pt-2 border-t border-amber-900/40 font-mono text-[11px] text-zinc-400">
        <div className="flex items-center gap-2 text-amber-500 font-black">
          <AlertTriangle size={14} /> FAILURE & RECOVERY BEHAVIOR PROTOCOL
        </div>
        <p className="normal-case leading-relaxed">
          In the event that operational drift exceeds the calibrated threshold of <span className="text-white font-bold">{governanceCalibrations.processDriftTolerance}</span> or an API schema mutation triggers a circuit break, automated fallback runbooks will halt unverified batch operations and alert the designated steerco.
        </p>
      </div>

    </div>
  );
}
