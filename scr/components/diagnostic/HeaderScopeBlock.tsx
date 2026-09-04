"use client";

import React from "react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { SECTOR_COPY_REGISTRY, DECISION_STAGE_REGISTRY } from "@/config/sectorCopyRegistry";

export default function HeaderScopeBlock() {
  const { state } = useDiagnostic();
  const { answers } = state;

  const sectorConfig = SECTOR_COPY_REGISTRY[answers.sector] || SECTOR_COPY_REGISTRY.FINANCE;
  const stageConfig = DECISION_STAGE_REGISTRY[answers.decisionStage] || DECISION_STAGE_REGISTRY.ACTIVE_STABILIZATION;

  return (
    <div className="border-b border-slate-200 pb-6 print-avoid-break">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* BRANDING & METADATA */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-red-700 tracking-widest uppercase">
            <span>// BMR CONTROL PLANE</span>
            <span>•</span>
            <span>FORENSIC DIAGNOSTIC</span>
          </div>
          <h1 className="text-3xl font-black uppercase text-slate-950 tracking-tight">
            {answers.organizationName}
          </h1>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-wide">
            OPERATIONAL BOUNDARY ASSESSMENT & REMEDIATION MATRIX
          </p>
        </div>

        {/* SECTOR & STAGE BADGES */}
        <div className="flex flex-col md:items-end gap-1.5 font-mono text-xs">
          <div className="bg-slate-950 text-white font-bold px-3 py-1.5 rounded-xs uppercase tracking-wider text-[11px]">
            {sectorConfig.label}
          </div>
          <div className="bg-slate-100 text-slate-700 border border-slate-300 font-semibold px-2.5 py-1 rounded-xs uppercase text-[10px]">
            STAGE: {answers.decisionStage.replace(/_/g, " ")}
          </div>
        </div>

      </div>
    </div>
  );
}
