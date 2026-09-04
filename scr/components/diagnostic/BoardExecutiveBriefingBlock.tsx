"use client";

import React from "react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { SECTOR_COPY_REGISTRY, DECISION_STAGE_REGISTRY } from "@/config/sectorCopyRegistry";

export default function BoardExecutiveBriefingBlock() {
  const { state } = useDiagnostic();
  const { answers, calculations } = state;

  const sectorConfig = SECTOR_COPY_REGISTRY[answers.sector] || SECTOR_COPY_REGISTRY.FINANCE;
  const stageConfig = DECISION_STAGE_REGISTRY[answers.decisionStage] || DECISION_STAGE_REGISTRY.ACTIVE_STABILIZATION;

  return (
    <div className="space-y-4 print-avoid-break">
      
      {/* EXECUTIVE SUMMARY BOX */}
      <div className="bg-slate-50 border border-slate-200 p-5 rounded-xs space-y-2">
        <span className="font-mono text-xs font-bold text-red-700 uppercase tracking-wider block">
          // EXECUTIVE BRIEFING & CONTROL VERDICT
        </span>
        <p className="text-sm text-slate-800 leading-relaxed font-sans">
          Control plane diagnostic completed for <strong>{answers.organizationName}</strong>. Based on assessed verification and workflow control patterns, current alignment indicates an estimated Process Waste Tax impact of approximately <strong>${calculations.processWasteTax.toLocaleString()}</strong> annually (Readiness Index: <strong>{calculations.readinessIndex} / 100</strong>).
        </p>
        <div className="pt-2 border-t border-slate-200 font-sans text-xs font-semibold text-slate-700">
          Recommended Focus: <span className="text-slate-950">{stageConfig.recommendedEmphasis}</span>
        </div>
      </div>

      {/* UNMANAGED RISK EXPOSURE BANNER (NON-PREDICTIVE / DEFENSIBLE) */}
      <div className="border-l-4 border-red-700 bg-red-50/50 p-4 rounded-xs space-y-1 font-sans">
        <span className="font-mono text-xs font-bold text-red-800 uppercase block">
          // {stageConfig.riskFramingHeader}
        </span>
        <p className="text-xs text-slate-800 leading-relaxed">
          Without verification gates and workflow stabilization criteria, Phase 02 automation may increase the probability of repeat rework and downstream reporting inconsistency during the initial rollout period {sectorConfig.failureAddOn}
        </p>
      </div>

    </div>
  );
}
