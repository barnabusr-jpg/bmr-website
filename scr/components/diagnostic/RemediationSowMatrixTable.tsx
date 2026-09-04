"use client";

import React from "react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { SECTOR_COPY_REGISTRY, DECISION_STAGE_REGISTRY } from "@/config/sectorCopyRegistry";
import { SowOptionLevel } from "@/types/diagnostic";

export default function RemediationSowMatrixTable() {
  const { state, updateSowOption } = useDiagnostic();
  const { answers, sowSelections } = state;

  const sectorConfig = SECTOR_COPY_REGISTRY[answers.sector] || SECTOR_COPY_REGISTRY.FINANCE;
  const stageConfig = DECISION_STAGE_REGISTRY[answers.decisionStage] || DECISION_STAGE_REGISTRY.ACTIVE_STABILIZATION;

  const handleOptionChange = (phaseId: "PHASE_01" | "PHASE_02" | "PHASE_03", option: SowOptionLevel) => {
    updateSowOption(phaseId, option);
  };

  return (
    <div className="space-y-6 print-avoid-break text-left">
      
      {/* SECTION HEADER */}
      <div className="border-b border-slate-200 pb-2">
        <span className="font-mono text-xs font-bold text-red-700 uppercase tracking-widest block">
          // SECTION 7: TARGET IMPLEMENTATION STATEMENT OF WORK (SOW)
        </span>
        <p className="text-xs text-slate-600 font-sans mt-0.5">
          Active remediation phases and option levels calibrated for {sectorConfig.label}.
        </p>
      </div>

      {/* SOW MATRIX TABLE */}
      <div className="overflow-x-auto border border-slate-200 bg-white rounded-xs shadow-xs print-avoid-break">
        <table className="w-full text-left font-sans text-xs border-collapse">
          <thead className="bg-slate-950 text-white font-mono text-[11px] uppercase tracking-wider">
            <tr>
              <th className="p-3.5 border-b border-slate-800 w-1/6">Phase & Timeline</th>
              <th className="p-3.5 border-b border-slate-800 w-1/4">Scope Boundary</th>
              <th className="p-3.5 border-b border-slate-800 w-2/5">Selected Remediation Action</th>
              <th className="p-3.5 border-b border-slate-800">Governance Owner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            
            {/* PHASE 01 */}
            <tr className="hover:bg-slate-50/50 print-avoid-break">
              <td className="p-3.5 font-mono font-bold text-slate-950 align-top">
                PHASE 01
                <span className="block text-[10px] text-slate-500 font-normal uppercase mt-0.5">
                  {stageConfig.sowPhase1Timeline}
                </span>
              </td>
              <td className="p-3.5 align-top font-semibold text-slate-900 leading-relaxed">
                Input Verification & Pipeline Hardening
              </td>
              <td className="p-3.5 align-top space-y-2">
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xs leading-relaxed text-slate-800">
                  {sectorConfig.sowMenu.phase1[sowSelections.PHASE_01]}
                </div>
                <div className="flex gap-2 print-hide font-mono text-[10px]">
                  {(["OPTION_A", "OPTION_B", "OPTION_C"] as SowOptionLevel[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionChange("PHASE_01", opt)}
                      className={`px-2 py-1 rounded-xs border font-bold cursor-pointer transition-colors ${
                        sowSelections.PHASE_01 === opt
                          ? "bg-slate-950 text-white border-slate-950"
                          : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {opt.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </td>
              <td className="p-3.5 align-top leading-relaxed text-slate-600">
                <strong className="text-slate-900 block font-mono text-[11px]">VP of Data / CTO</strong>
                Agreed structural pass thresholds prior to execution.
              </td>
            </tr>

            {/* PHASE 02 */}
            <tr className="hover:bg-slate-50/50 print-avoid-break">
              <td className="p-3.5 font-mono font-bold text-slate-950 align-top">
                PHASE 02
                <span className="block text-[10px] text-slate-500 font-normal uppercase mt-0.5">
                  {stageConfig.sowPhase2Timeline}
                </span>
              </td>
              <td className="p-3.5 align-top font-semibold text-slate-900 leading-relaxed">
                Workflow Ownership & Dependency Isolation
              </td>
              <td className="p-3.5 align-top space-y-2">
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xs leading-relaxed text-slate-800">
                  {sectorConfig.sowMenu.phase2[sowSelections.PHASE_02]}
                </div>
                <div className="flex gap-2 print-hide font-mono text-[10px]">
                  {(["OPTION_A", "OPTION_B", "OPTION_C"] as SowOptionLevel[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionChange("PHASE_02", opt)}
                      className={`px-2 py-1 rounded-xs border font-bold cursor-pointer transition-colors ${
                        sowSelections.PHASE_02 === opt
                          ? "bg-slate-950 text-white border-slate-950"
                          : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {opt.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </td>
              <td className="p-3.5 align-top leading-relaxed text-slate-600">
                <strong className="text-slate-900 block font-mono text-[11px]">VP of Operations</strong>
                Estimated 25% - 40% reduction in manual rework loops.
              </td>
            </tr>

            {/* PHASE 03 */}
            <tr className="hover:bg-slate-50/50 print-avoid-break">
              <td className="p-3.5 font-mono font-bold text-slate-950 align-top">
                PHASE 03
                <span className="block text-[10px] text-slate-500 font-normal uppercase mt-0.5">
                  {stageConfig.sowPhase3Timeline}
                </span>
              </td>
              <td className="p-3.5 align-top font-semibold text-slate-900 leading-relaxed">
                Continuous Governance & Deployment Gates
              </td>
              <td className="p-3.5 align-top space-y-2">
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xs leading-relaxed text-slate-800">
                  {sectorConfig.sowMenu.phase3[sowSelections.PHASE_03]}
                </div>
                <div className="flex gap-2 print-hide font-mono text-[10px]">
                  {(["OPTION_A", "OPTION_B", "OPTION_C"] as SowOptionLevel[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionChange("PHASE_03", opt)}
                      className={`px-2 py-1 rounded-xs border font-bold cursor-pointer transition-colors ${
                        sowSelections.PHASE_03 === opt
                          ? "bg-slate-950 text-white border-slate-950"
                          : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {opt.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </td>
              <td className="p-3.5 align-top leading-relaxed text-slate-600">
                <strong className="text-slate-900 block font-mono text-[11px]">CRO / CISO</strong>
                Pre-deployment gate coverage verified.
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* SECURITY & DATA HANDLING FAST FACTS */}
      <div className="bg-slate-950 text-white p-5 rounded-xs space-y-3 print-avoid-break">
        <span className="font-mono text-xs font-bold text-red-700 uppercase tracking-widest block">
          // SECURITY & DATA HANDLING FAST FACTS
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-slate-300">
          <div>
            <strong className="text-white font-mono uppercase block mb-0.5 text-[11px]">ZERO PERSISTENT STORAGE</strong>
            Processes inputs dynamically without database persistence.
          </div>
          <div>
            <strong className="text-white font-mono uppercase block mb-0.5 text-[11px]">STATELESS TOKEN ARCHITECTURE</strong>
            Uses Base64URL-encoded URL parameters for stateless reproduction.
          </div>
          <div>
            <strong className="text-white font-mono uppercase block mb-0.5 text-[11px]">SEPARATION OF INFRASTRUCTURE</strong>
            Does not require direct integration with client internal networks.
          </div>
        </div>
      </div>

    </div>
  );
}
