"use client";

import React from "react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { SECTOR_COPY_REGISTRY } from "@/config/sectorCopyRegistry";
import { getStatusProvenanceBadge } from "@/lib/playbookExportAdapter";
import { getInsulationBandConfig, GateStatus } from "@/types/playbookExport";

export default function QuadNodeSummaryMatrixTable() {
  const { state, getDiagnosticSnapshot } = useDiagnostic();
  const { answers } = state;
  const { nodeMatrix } = getDiagnosticSnapshot();

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
              <th className="p-3.5 border-b border-slate-800 w-1/4">Operational Impact ({sectorConfig.label})</th>
              <th className="p-3.5 border-b border-slate-800">Recommended Gate</th>
              <th className="p-3.5 border-b border-slate-800 text-center w-28">Insulation</th>
              <th className="p-3.5 border-b border-slate-800 text-right w-36">Status & Provenance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {nodeMatrix.map((node) => {
              const badge = getStatusProvenanceBadge(
                node.status as GateStatus,
                node.statusSource as "RESPONSE_DERIVED" | "METHODOLOGY_BASELINE"
              );
              const insulationConfig = getInsulationBandConfig(node.insulationIntegrityPct);

              return (
                <tr key={node.nodeKey} className="hover:bg-slate-50/50 print-avoid-break">
                  
                  {/* NODE NAME */}
                  <td className="p-3.5 font-mono font-bold text-slate-950 align-top">
                    {node.nodeLabel}
                    <span className="block text-[10px] text-slate-400 font-normal uppercase mt-0.5">
                      {node.nodeKey}
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

                  {/* INSULATION INTEGRITY METER */}
                  <td className="p-3.5 align-top text-center font-mono font-bold text-slate-700 whitespace-nowrap">
                    <div className="inline-flex flex-col items-center gap-1">
                      <span>{node.insulationIntegrityPct}%</span>
                      <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className={`h-full ${insulationConfig.twBgClass}`}
                          style={{ width: `${node.insulationIntegrityPct}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* STATUS & PROVENANCE BADGE */}
                  <td className="p-3.5 align-top text-right whitespace-nowrap font-mono">
                    <div className="inline-flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-xs border ${badge.badgeClass}`}
                      >
                        {badge.label}
                      </span>
                      <span className="text-[9px] text-slate-400 tracking-tight">
                        {badge.provenance}
                      </span>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
