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

  // DYNAMIC GOVERNANCE TARGETS CALCULATED FROM QUAD MATRIX RESULTS
  const governanceCalibrations = useMemo(() => {
    const taxPool = metrics?.totalLaborTaxPool || 180000;
    const reliability = forensicAnalytics?.reliabilityIndex || 65;
    const decay = metrics?.decay || 24;

    // Control parameters indexed dynamically to Quad Control Output
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
    <div className="border border-slate-200 bg-white p-6 md:p-8 rounded-lg shadow-sm space-y-6 font-sans text-slate-700 mt-8 text-left">
      
      {/* HEADER SECTION */}
      <div className="border-b border-slate-100 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wider block uppercase">// PRE-AUTOMATION AI CONTROL PLANE</span>
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Governance & Compliance Supplement
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Entity: {orgName} // Sign-Off Tier: {governanceCalibrations.signOffTier}
          </p>
        </div>
        <div className="bg-slate-100 border border-slate-200 px-3.5 py-1.5 font-mono text-xs text-slate-800 font-bold rounded-md tracking-wider uppercase flex items-center gap-2 shrink-0">
          <ShieldCheck size={16} className="text-emerald-600" /> Quad Calibrated
        </div>
      </div>

      {/* SECTION A: EXECUTIVE SIGN-OFF CHECKLIST */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <FileCheck size={14} className="text-slate-900" /> Section A // Executive Sign-Off & Deployment Gates
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="border border-slate-200 bg-slate-50 p-4 rounded-md">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">DLP Risk Exposure Ceiling</span>
            <strong className="text-slate-900 text-base block font-sans font-bold mt-1">{governanceCalibrations.dlpRiskAllowance}</strong>
            <span className="text-[10px] text-slate-500 block mt-1">Gated under Purview sensitivity policies</span>
          </div>
          <div className="border border-slate-200 bg-slate-50 p-4 rounded-md">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">API Schema Mutation Gate</span>
            <strong className="text-slate-900 text-base block font-sans font-bold mt-1">{governanceCalibrations.apiInvalidationThreshold}</strong>
            <span className="text-[10px] text-slate-500 block mt-1">Circuit breaker trigger point</span>
          </div>
          <div className="border border-slate-200 bg-slate-50 p-4 rounded-md">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Max Process Drift Tolerance</span>
            <strong className="text-slate-900 text-base block font-sans font-bold mt-1">{governanceCalibrations.processDriftTolerance}</strong>
            <span className="text-[10px] text-slate-500 block mt-1">
              Indexed to {100 - (metrics?.decay || 24)}% AI Readiness Gap
            </span>
          </div>
        </div>
      </div>

      {/* SECTION B: SYSTEM CONTROL TARGETS */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <Layers size={14} className="text-slate-900" /> Section B // Purview & API Ingestion Contracts
        </h4>
        <div className="space-y-3 font-sans text-xs text-slate-700">
          <div className="flex items-start gap-3 border border-slate-200 bg-slate-50 p-4 rounded-md">
            <Lock size={16} className="text-slate-900 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-bold block uppercase font-mono text-[11px] mb-1">Ingestion Contract Gate (Purview / DLP)</strong>
              Enforces automated sensitivity labeling across all downstream AI model context stores before data ingestion.
            </div>
          </div>
          <div className="flex items-start gap-3 border border-slate-200 bg-slate-50 p-4 rounded-md">
            <Cpu size={16} className="text-slate-900 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-bold block uppercase font-mono text-[11px] mb-1">Microservice Adapter Decoupling</strong>
              Isolates sliding third-party API data payloads through abstract serialization interfaces to prevent runtime model degradation.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION C: FAILURE BEHAVIOR DIRECTIVES */}
      <div className="space-y-2 pt-3 border-t border-slate-100 font-mono text-xs text-slate-600">
        <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
          <AlertTriangle size={14} className="text-amber-600" /> Failure & Recovery Behavior Protocol
        </div>
        <p className="font-sans leading-relaxed text-xs font-normal">
          In the event that operational drift exceeds the calibrated threshold of <span className="text-slate-900 font-bold">{governanceCalibrations.processDriftTolerance}</span> or an API schema mutation triggers a circuit break, automated fallback runbooks will halt unverified agent operations and trigger immediate steerco escalation.
        </p>
      </div>

    </div>
  );
}
