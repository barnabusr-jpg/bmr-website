"use client";

import React from "react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { SECTOR_COPY_REGISTRY } from "@/config/sectorCopyRegistry";

export default function QuadNodeSummaryMatrixTable() {
  const { state } = useDiagnostic();
  const { answers, nodeSummaries } = state;

  const sectorConfig = SECTOR_COPY_REGISTRY[answers.sector] || SECTOR_COPY_REGISTRY.FINANCE;

  return (
    <div className="space-y-3 print-avoid-break text-left">
      
      {/* SECTION HEADER */}
      <div className="border-b border-slate-200 pb-2">
        <span className="font-mono text-xs font-bold text-red-700 uppercase tracking-widest block">
          // SECTION 6: QUAD-NODE CONTROL MATRIX (CONSOLIDATED VIEW)
        </span>
        <p className="text-xs text-slate-600 font-sans mt-0.5">
          Forensic control evaluation mapped across four operational nodes for {sectorConfig.label}.
        </p>
      </div>

      {/* MATRIX TABLE */}
      <div className="overflow-x-auto border border-slate-200 bg-white rounded-xs shadow-xs print-avoid-break">
        <table className="w-full text-left font-sans text-xs border-collapse">
          <thead className="bg-slate-950 text-white font-mono text-[11px] uppercase tracking-wider">
            <tr>
              <th className="p-3.5 border-b border-slate-800 w-1/5">Control Plane Node</th>
              <th className="p-3.5 border-b border-slate-800 w-1/4">Observed Pattern</th>
              <th className="p-3.5 border-b border-slate-800 w-1/3">Operational Impact ({sectorConfig.label})</th>
              <th className="p-3.5 border-b border-slate-800">Recommended Gate</th>
              <th className="p-3.5 border-b border-slate-800 text-center w-28">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {nodeSummaries.map((node) => (
              <tr key={node.nodeId} className="hover:bg-slate-50/50 print-avoid-break">
                
                {/* NODE NAME */}
                <td className="p-3.5 font-mono font-bold text-slate-950 align-top">
                  {node.name}
                  <span className="block text-[10px] text-slate-400 font-normal uppercase mt-0.5">
                    {node.nodeId}
                  </span>
                </td>

                {/* OBSERVED PATTERN */}
                <td className="p-3.5 align-top leading-relaxed text-slate-800">
                  {node.observedPattern}
                </td>

                {/* SECTOR OPERATIONAL IMPACT */}
                <td className="p-3.5 align-top leading-relaxed text-slate-600">
                  {node.operationalImpact}
                </td>

                {/* RECOMMENDED GATE */}
                <td className="p-3.5 align-top font-semibold text-slate-900 leading-relaxed">
                  {node.recommendedGate}
                </td>

                {/* STATUS BADGE */}
                <td className="p-3.5 align-top text-center font-mono">
                  <span className="inline-block bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 text-[10px] font-bold uppercase">
                    {node.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
