"use client";

import React from "react";
import { useDiagnostic } from "@/context/DiagnosticContext";

export default function MetricRelationshipHierarchyLine() {
  const { state } = useDiagnostic();
  const { calculations } = state;

  return (
    <div className="space-y-3 print-avoid-break">
      
      {/* EXPLANATION HEADER */}
      <div>
        <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest block">
          // METRIC RELATIONSHIP HIERARCHY
        </span>
        <p className="text-xs text-slate-600 font-sans mt-0.5">
          The Automation Readiness Index is designed to assess control strength; Process Waste Tax estimates current rework friction; Promise Gap™ exposure annualizes estimated operational risk when verification gaps remain.
        </p>
      </div>

      {/* THREE HEADLINE METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono print-avoid-break">
        
        {/* READINESS INDEX */}
        <div className="border border-slate-200 bg-slate-50 p-4 rounded-xs">
          <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
            01. Automation Readiness Index
          </span>
          <div className="text-3xl font-black text-slate-950">
            {calculations.readinessIndex} <span className="text-sm font-normal text-slate-500">/ 100</span>
          </div>
          <span className="text-[10px] text-slate-600 block mt-1">
            Current Verification Control Baseline
          </span>
        </div>

        {/* PROCESS WASTE TAX */}
        <div className="border border-slate-200 bg-slate-50 p-4 rounded-xs">
          <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
            02. Process Waste Tax (Annual)
          </span>
          <div className="text-3xl font-black text-slate-950">
            ${calculations.processWasteTax.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-600 block mt-1">
            Estimated Annual Rework Friction
          </span>
        </div>

        {/* PROMISE GAP EXPOSURE */}
        <div className="border border-slate-200 bg-slate-50 p-4 rounded-xs">
          <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
            03. Promise Gap™ Annual Risk
          </span>
          <div className="text-3xl font-black text-slate-950">
            ${calculations.promiseGapExposure.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-600 block mt-1">
            Unmanaged Unverified Expansion Exposure
          </span>
        </div>

      </div>

    </div>
  );
}
