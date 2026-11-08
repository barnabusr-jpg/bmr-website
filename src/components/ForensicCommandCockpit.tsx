"use client";
import React from 'react';
import { useRouter } from 'next/router';
import { ShieldCheck, Printer, FileText, Download, TrendingDown, Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { computeRegulatoryAuditItems, type FunnelPillar } from '@/lib/forensicRegulatoryCalculus';

export interface ForensicMetricsPayload {
  complianceScore?: number;
  annualSalaryLeakage?: number;
  unhedgedLegalExposure?: number;
  multiplier?: number;
  isTierThreeExposure?: boolean;
  regulatoryAlertActive?: boolean;
}

type PersonaKey = 'EXECUTIVE' | 'TECH_MGMT' | 'OPS_MGMT' | 'SYSTEM_USER';

interface ForensicCommandCockpitProps {
  companyName?: string;
  sector?: string;
  metrics?: ForensicMetricsPayload;
  completions?: Record<PersonaKey, boolean>;
  responses?: Record<string, any>;
  onSelectSOW?: () => void;
  complianceScore?: number;
  annualSalaryLeakage?: number;
  unhedgedLegalExposure?: number;
  peerWasteTaxBaseline?: number;
  peerExposureBaseline?: number;
  peerReadinessBaseline?: number;
}

export default function ForensicCommandCockpit({
  companyName = "TARGET SPECIFICATION",
  sector = "FINANCE",
  metrics,
  completions,
  responses = {},
  onSelectSOW,
  complianceScore: flatScore = 62,
  annualSalaryLeakage: flatLeakage = 114750,
  unhedgedLegalExposure: flatExposure = 607500,
  peerWasteTaxBaseline = 42500,
  peerExposureBaseline = 150000,
  peerReadinessBaseline = 76
}: ForensicCommandCockpitProps) {
  const router = useRouter();

  const score = metrics?.complianceScore ?? flatScore;
  const leakage = metrics?.annualSalaryLeakage ?? flatLeakage;
  const exposure = metrics?.unhedgedLegalExposure ?? flatExposure;

  const taxVariancePct = peerWasteTaxBaseline > 0 
    ? Math.round(((leakage - peerWasteTaxBaseline) / peerWasteTaxBaseline) * 100) 
    : 0;
  const exposureVariancePct = peerExposureBaseline > 0 
    ? Math.round(((exposure - peerExposureBaseline) / peerExposureBaseline) * 100) 
    : 0;
  const readinessVariance = Math.round(score - peerReadinessBaseline);

  const wastedHoursPerYr = Math.round(leakage / 85);
  const weeklyLoss = Math.round(leakage / 52);

  const handleExportCSV = () => {
    const timestamp = new Date().toISOString();

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      let str = typeof val === 'object' ? JSON.stringify(val) : String(val);
      const MAX_LEN = 6000;
      if (str.length > MAX_LEN) str = str.slice(0, MAX_LEN) + '...';
      return `"${str.replace(/"/g, '""')}"`;
    };

    const allDone = Boolean(
      completions?.EXECUTIVE &&
      completions?.TECH_MGMT &&
      completions?.OPS_MGMT &&
      completions?.SYSTEM_USER
    );

    const safeResponses = (responses || {}) as Record<string, any>;

    const rows: string[][] = [
      ["BMR SOLUTIONS // FORENSIC DIAGNOSTIC AUDIT REPORT", ""],
      ["Generated Timestamp", timestamp],
      ["Target Organization", companyName],
      ["Diagnostic Sector", sector],
      ["", ""],
      ["OVERALL ASSESSMENT COMPLETION", allDone ? "COMPLETED" : "INCOMPLETE"],
      ["Overall Note", allDone ? "All 4 stakeholder tracks recorded." : "One or more tracks remain pending."],
      ["", ""],
      ["EXECUTIVE SUMMARY & SFI COMPLIANCE METRICS", ""],
      ["AI Readiness Index", `${score.toFixed(0)}/100`],
      ["Readiness Variance vs Sector Benchmark", `${readinessVariance >= 0 ? `+${readinessVariance}` : readinessVariance} pts (Sector Median: ${peerReadinessBaseline})`],
      ["Process Waste Tax (Annual Leakage)", `$${Math.round(leakage).toLocaleString()}`],
      ["Waste Tax Variance vs Sector Benchmark", `+${taxVariancePct}% (Sector Median: $${peerWasteTaxBaseline.toLocaleString()})`],
      ["Total Promise Gap Exposure (Unhedged Liability)", `$${Math.round(exposure).toLocaleString()}`],
      ["Liability Variance vs Sector Benchmark", `+${exposureVariancePct}% (Sector Median: $${peerExposureBaseline.toLocaleString()})`],
      ["Estimated Capacity Loss", `~${wastedHoursPerYr.toLocaleString()} Engineering Hours/Yr`],
      ["Weekly Burn Rate", `$${weeklyLoss.toLocaleString()} / Week`],
      ["Target Remediation Recovery Multiplier", "3.4x ROI"],
      ["", ""],
      ["QUAD NODE STAKEHOLDER COMPLETION STATUS", ""],
      ["Track", "Persona Role", "Status"],
      ["NODE 01", "Executive & Governance", completions?.EXECUTIVE ? "COMPLETED" : "PENDING"],
      ["NODE 02", "Engineering & Infrastructure", completions?.TECH_MGMT ? "COMPLETED" : "PENDING"],
      ["NODE 03", "Operations & Management", completions?.OPS_MGMT ? "COMPLETED" : "PENDING"],
      ["NODE 04", "Frontline System Execution", completions?.SYSTEM_USER ? "COMPLETED" : "PENDING"],
    ];

    // DYNAMIC SECTOR REGULATORY AUDIT
    const resolvedPillar: FunnelPillar =
      sector.includes('INDUSTRIAL') || sector.includes('AVS')
        ? 'AVS'
        : sector.includes('SERVICES') || sector.includes('HAI')
        ? 'HAI'
        : 'IGF';

    const regulatoryItems = computeRegulatoryAuditItems({
      pillar: resolvedPillar,
      responses: safeResponses,
      isTierThreeExposure: metrics?.isTierThreeExposure,
      regulatoryAlertActive: metrics?.regulatoryAlertActive,
    });

    rows.push(
      ["", ""],
      ["SECTOR REGULATORY COMPLIANCE AUDIT", ""],
      ["Framework", "Governing Clause / Statutory Basis", "Observed Compliance Finding", "Mandatory SOW Remediation", "Target Phase"]
    );

    if (regulatoryItems.length === 0) {
      rows.push(["N/A", "N/A", "No statutory non-compliance violations triggered under current responses.", "Baseline validation maintained.", "N/A"]);
    } else {
      regulatoryItems.forEach((it) => {
        rows.push([it.standard, it.clause, it.finding, it.statutoryRemedy, it.remediationPhase]);
      });
    }

    // RECORDED DIAGNOSTIC RESPONSES & QUESTION BREAKDOWN
    rows.push(
      ["", ""],
      ["RECORDED DIAGNOSTIC RESPONSES & QUESTION BREAKDOWN", ""],
      ["Question / Field ID", "Recorded Value"]
    );

    const markerKeys = new Set([
      'QUAD_EXE_COMPLETE',
      'QUAD_TEC_COMPLETE',
      'QUAD_MGR_COMPLETE',
      'QUAD_SYS_COMPLETE'
    ]);

    const responseKeys = Object.keys(safeResponses).sort((a, b) => a.localeCompare(b));

    responseKeys.forEach((key) => {
      if (!markerKeys.has(key)) {
        rows.push([key, safeResponses[key]]);
      }
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(r => r.map(escapeCsv).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BMR_Diagnostic_${companyName.replace(/\s+/g, '_')}_Dossier.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSOWClick = () => {
    if (onSelectSOW) onSelectSOW();
    setTimeout(() => {
      const sowElement = document.getElementById('sow-section');
      if (sowElement) {
        sowElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 250);
  };

  return (
    <div className="bg-white text-slate-900 border border-slate-200 p-8 md:p-10 rounded-lg shadow-sm space-y-10 font-sans max-w-[1200px] mx-auto text-left">
      
      {/* HEADER BAR & EXECUTIVE TOOLBAR */}
      <div className="border-b border-slate-200 pb-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
            // Pre-Automation Control Plane Forensic Cockpit // {sector} SECTOR
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Diagnostic Verdict: {companyName}
          </h1>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 no-print w-full xl:w-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none bg-white text-slate-700 border border-slate-300 text-xs font-mono font-bold px-3.5 py-2.5 uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer rounded-md flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs"
          >
            <Download size={13} /> Export CSV
          </button>

          <button
            type="button"
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="flex-1 sm:flex-none bg-slate-100 text-slate-800 border border-slate-300 text-xs font-mono font-bold px-3.5 py-2.5 uppercase tracking-wider hover:bg-slate-200 transition-colors cursor-pointer rounded-md flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs"
          >
            <Printer size={13} /> Generate PDF
          </button>

          <button
            type="button"
            onClick={handleSOWClick}
            className="flex-1 sm:flex-none bg-slate-900 text-white text-xs font-mono font-bold px-4 py-2.5 uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer rounded-md flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm"
          >
            <FileText size={13} /> Final SOW
          </button>

          <button
            type="button"
            onClick={() => {
              const company = encodeURIComponent(companyName || 'Target Organization');
              router.push(`/certificate?org=${company}`);
            }}
            className="w-full sm:w-auto bg-emerald-700 text-white text-xs font-mono font-bold px-4 py-2.5 uppercase tracking-wider hover:bg-emerald-800 transition-colors cursor-pointer rounded-md shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <ShieldCheck size={14} /> Certificate
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-slate-200 bg-slate-50 p-6 rounded-md space-y-2">
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">
            AI Readiness Index
          </span>
          <div className="text-3xl font-extrabold text-slate-900">
            {score.toFixed(0)}<span className="text-base font-normal text-slate-500">/100</span>
          </div>
          <div className={`text-xs font-mono font-bold pt-1 ${readinessVariance >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
            {readinessVariance >= 0 ? `+${readinessVariance}` : readinessVariance} Variance vs Peer Sector Benchmark ({peerReadinessBaseline})
          </div>
        </div>

        <div className="border border-slate-200 bg-slate-50 p-6 rounded-md space-y-2">
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">
            Process Waste Tax
          </span>
          <div className="text-3xl font-extrabold text-slate-900">
            ${Math.round(leakage).toLocaleString()}
          </div>
          <div className="text-xs font-mono font-bold text-red-700 pt-1">
            +{taxVariancePct}% Higher Overhead vs Sector Baseline (${peerWasteTaxBaseline.toLocaleString()})
          </div>
        </div>

        <div className="border border-slate-200 bg-slate-50 p-6 rounded-md space-y-2">
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">
            Total Promise Gap™ Exposure
          </span>
          <div className="text-3xl font-extrabold text-slate-900">
            ${Math.round(exposure).toLocaleString()}
          </div>
          <div className="text-xs font-mono font-bold text-red-700 pt-1">
            +{exposureVariancePct}% Risk Exposure vs Sector Median (${peerExposureBaseline.toLocaleString()})
          </div>
        </div>
      </div>

      {/* DETAILED FINANCIAL LEAKAGE BREAKDOWN */}
      <div className="border border-slate-200 bg-slate-50/50 p-6 rounded-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <TrendingDown size={18} className="text-amber-600" />
          <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
            Operational Waste & Capacity Loss Breakdown
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-white p-4 border border-slate-200 rounded">
            <span className="text-slate-500 block uppercase mb-1">Annual Capacity Waste</span>
            <span className="text-base font-bold text-slate-900">~{wastedHoursPerYr.toLocaleString()} Hours/Yr</span>
            <p className="text-[11px] font-sans text-slate-600 mt-1">Exhausted on schema drift, alert fatigue & manual intervention.</p>
          </div>
          <div className="bg-white p-4 border border-slate-200 rounded">
            <span className="text-slate-500 block uppercase mb-1">Weekly Burn Rate</span>
            <span className="text-base font-bold text-slate-900">${weeklyLoss.toLocaleString()} / Week</span>
            <p className="text-[11px] font-sans text-slate-600 mt-1">Unhedged engineering operational spend prior to AI stabilization.</p>
          </div>
          <div className="bg-white p-4 border border-slate-200 rounded">
            <span className="text-slate-500 block uppercase mb-1">Target Recovery Multiplier</span>
            <span className="text-base font-bold text-emerald-700">3.4x ROI</span>
            <p className="text-[11px] font-sans text-slate-600 mt-1">Projected efficiency reclaim upon Phase 01 pipeline hardening.</p>
          </div>
        </div>
      </div>

      {/* CROSS-PERSONA TRIANGULATION MATRIX */}
      <div className="border border-slate-200 bg-white rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Layers size={18} className="text-slate-900" />
          <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
            Cross-Persona Structural Triangulation Matrix
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-slate-200 font-mono text-slate-500 text-[11px] uppercase">
                <th className="pb-3 font-bold">Stakeholder Track</th>
                <th className="pb-3 font-bold">Vector Focus</th>
                <th className="pb-3 font-bold">Alignment Posture</th>
                <th className="pb-3 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-bold text-slate-900 font-mono">NODE 01: EXECUTIVE</td>
                <td className="py-3 text-slate-600">Governance Mandate & Legal Hedging</td>
                <td className="py-3 text-slate-700">Policy established; enforcement lacks runtime telemetry.</td>
                <td className="py-3 text-right"><span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase"><AlertTriangle size={12}/> Discrepancy</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 font-mono">NODE 02: TECH_MGMT</td>
                <td className="py-3 text-slate-600">API Architecture & Pipeline Drift</td>
                <td className="py-3 text-slate-700">High schema drift risk; manual firefighting active.</td>
                <td className="py-3 text-right"><span className="inline-flex items-center gap-1 font-mono text-[10px] text-red-700 bg-red-50 px-2 py-0.5 rounded font-bold uppercase"><AlertTriangle size={12}/> High Friction</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 font-mono">NODE 03: OPS_MGMT</td>
                <td className="py-3 text-slate-600">Workflow Velocity & Alarm Sensitivity</td>
                <td className="py-3 text-slate-700">Alert fatigue suppresses response times across active queues.</td>
                <td className="py-3 text-right"><span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase"><AlertTriangle size={12}/> Desensitized</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 font-mono">NODE 04: SYSTEM_USER</td>
                <td className="py-3 text-slate-600">Runtime Utility & Context Integrity</td>
                <td className="py-3 text-slate-700">Unmonitored prompt/data ingestion at operator level.</td>
                <td className="py-3 text-right"><span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase"><CheckCircle2 size={12}/> Verified</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
