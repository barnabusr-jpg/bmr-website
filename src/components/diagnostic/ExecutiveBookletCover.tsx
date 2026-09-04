"use client";

import React from "react";
import { DiagnosticState } from "@/types/diagnostic";
import { SECTOR_COPY_REGISTRY, DECISION_STAGE_REGISTRY } from "@/config/sectorCopyRegistry";

interface ExecutiveBookletCoverProps {
  state: DiagnosticState;
}

/**
 * Dynamic C-Suite Booklet Cover & Executive Synthesis Page (Page 1)
 * Enforces fail-closed audit purity and explicit inline page breaks for Puppeteer PDF determinism.
 */
export const ExecutiveBookletCover: React.FC<ExecutiveBookletCoverProps> = ({ state }) => {
  // Fail-closed invariant gate: Refuse to render unverified or partial state
  if (!state || !state.isComplete) {
    return (
      <div
        className="w-full max-w-5xl mx-auto bg-slate-950 border-2 border-red-600 rounded-lg p-12 text-white font-mono my-8"
        style={{ breakAfter: "page", pageBreakAfter: "always" }}
      >
        <div className="flex items-center gap-3 text-red-500 mb-4">
          <span className="text-xl">⚠️</span>
          <h2 className="text-lg font-bold tracking-widest uppercase">
            // REPORT GENERATION REJECTED
          </h2>
        </div>
        <p className="text-sm text-slate-300 mb-6">
          INVARIANT FAILURE: Executive Briefing Booklet cannot compile from an unverified or incomplete state session.
        </p>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded text-xs text-red-400">
          ERROR_CODE: INCOMPLETE_DIAGNOSTIC_STATE
        </div>
      </div>
    );
  }

  const { answers, calculations, nodeSummaries } = state;

  const orgName = answers?.organizationName?.trim() || "ENTERPRISE ORGANIZATION";
  const sectorKey = answers?.sector || "FINANCE";
  const stageKey = answers?.decisionStage || "ACTIVE_STABILIZATION";

  const sectorCopy = SECTOR_COPY_REGISTRY[sectorKey] || SECTOR_COPY_REGISTRY["FINANCE"];
  const stageCopy = DECISION_STAGE_REGISTRY[stageKey] || DECISION_STAGE_REGISTRY["ACTIVE_STABILIZATION"];

  // Strictly formatted numbers aligned with CSV & Board telemetry
  const formatCurrency = (val?: number) =>
    typeof val === "number" && Number.isFinite(val) ? `$${val.toLocaleString()}` : "$0";

  const readinessIndex = Number.isFinite(calculations?.readinessIndex) ? calculations.readinessIndex : 0;
  const wasteTax = formatCurrency(calculations?.processWasteTax);
  const promiseGap = formatCurrency(calculations?.promiseGapExposure);
  const capacityHours = Number.isFinite(calculations?.annualCapacityHours)
    ? `~${calculations.annualCapacityHours.toLocaleString()} Hours/Yr`
    : "0 Hours/Yr";
  const weeklyBurn = `${formatCurrency(calculations?.weeklyBurnRate)} / Week`;
  const recoveryMultiplier = Number.isFinite(calculations?.recoveryMultiplier)
    ? `${calculations.recoveryMultiplier}x ROI`
    : "0x ROI";

  return (
    <div
      className="w-full max-w-5xl mx-auto bg-white text-slate-900 font-sans p-8 md:p-12 border border-slate-200 rounded-lg shadow-xl print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none"
      style={{ breakAfter: "page", pageBreakAfter: "always" }}
    >
      {/* HEADER BAR: Enterprise Metadata & Scope Badge */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 border-b-2 border-slate-900 gap-4">
        <div>
          <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">
            // FORENSIC CONTROL PLANE // C-SUITE BRIEFING BOOKLET
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1 uppercase">
            Executive Diagnostic Cover
          </h1>
          <p className="text-sm font-semibold text-blue-700 mt-0.5">
            ENTITY: {orgName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-slate-900 text-white font-mono text-xs font-bold rounded uppercase">
            {sectorKey} SECTOR
          </span>
          <span className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 font-mono text-xs font-bold rounded uppercase">
            {stageCopy.title}
          </span>
        </div>
      </div>

      {/* SECTION 1: Headline Financial & Readiness Scorecard */}
      <div className="mb-10">
        <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">
          01 // Headline Readiness &amp; Quantified Financial Metrics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-md">
            <p className="text-xs font-mono font-semibold text-slate-500 uppercase">
              AI Readiness Index
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-slate-900">{readinessIndex}</span>
              <span className="text-lg font-bold text-slate-400">/ 100</span>
            </div>
            <p className="text-xs text-red-600 font-medium mt-2">
              Current Verification Control Baseline
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-md">
            <p className="text-xs font-mono font-semibold text-slate-500 uppercase">
              Process Waste Tax
            </p>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{wasteTax}</p>
            <p className="text-xs text-red-600 font-medium mt-2">
              Annualized Rework &amp; Rerun Friction
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-md">
            <p className="text-xs font-mono font-semibold text-slate-500 uppercase">
              Total Promise Gap™ Exposure
            </p>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{promiseGap}</p>
            <p className="text-xs text-red-600 font-medium mt-2">
              Unhedged Expansion Risk Ceiling
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Operational Capacity Drag */}
      <div className="mb-10">
        <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">
          02 // Operational Waste &amp; Capacity Loss Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-slate-200 rounded-md bg-white">
            <p className="text-xs font-mono text-slate-500 uppercase">Annual Capacity Waste</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{capacityHours}</p>
            <p className="text-xs text-slate-500 mt-1">Senior Engineering Latency Drag</p>
          </div>

          <div className="p-4 border border-slate-200 rounded-md bg-white">
            <p className="text-xs font-mono text-slate-500 uppercase">Weekly Burn Rate</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{weeklyBurn}</p>
            <p className="text-xs text-slate-500 mt-1">Immediate Direct Weekly Loss</p>
          </div>

          <div className="p-4 border border-slate-200 rounded-md bg-white">
            <p className="text-xs font-mono text-slate-500 uppercase">Target Recovery Multiplier</p>
            <p className="text-xl font-bold text-emerald-700 mt-1">{recoveryMultiplier}</p>
            <p className="text-xs text-slate-500 mt-1">Capital Recovery Potential</p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Quad-Node Triangulation Summary Table */}
      <div className="mb-10">
        <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">
          03 // Quad-Node Triangulation Summary
        </h2>

        <div className="overflow-x-auto border border-slate-200 rounded-md">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 font-mono text-slate-700">
                <th className="p-3">NODE ID</th>
                <th className="p-3">CONTROL NODE</th>
                <th className="p-3">OBSERVED PATTERN</th>
                <th className="p-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {Array.isArray(nodeSummaries) && nodeSummaries.length > 0 ? (
                nodeSummaries.map((node) => (
                  <tr key={node.nodeId} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{node.nodeId}</td>
                    <td className="p-3 font-semibold text-slate-800">{node.name}</td>
                    <td className="p-3 text-slate-600">{node.observedPattern}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 font-mono text-[10px] font-bold rounded bg-amber-100 text-amber-900">
                        {node.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-slate-400 font-mono">
                    No control matrix nodes populated.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER */}
      <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-slate-500 font-mono gap-2">
        <p>CONFIDENTIAL // EXECUTIVE BOARD LEVEL BRIEFING</p>
        <p>EVIDENCE STANDARD: NO RAW DATA OR CODE INSPECTED</p>
      </div>
    </div>
  );
};
