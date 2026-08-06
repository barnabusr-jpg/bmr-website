"use client";
import React from 'react';
import { useRouter } from 'next/router';
import { ShieldCheck, Printer, FileText, Download, AlertTriangle, CheckCircle2, TrendingDown, Layers } from 'lucide-react';

export interface ForensicMetricsPayload {
  complianceScore?: number;
  annualSalaryLeakage?: number;
  unhedgedLegalExposure?: number;
  multiplier?: number;
  isTierThreeExposure?: boolean;
  regulatoryAlertActive?: boolean;
}

interface ForensicCommandCockpitProps {
  companyName?: string;
  sector?: string;
  metrics?: ForensicMetricsPayload;
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
  onSelectSOW,
  complianceScore: flatScore = 62,
  annualSalaryLeakage: flatLeakage = 114750,
  unhedgedLegalExposure: flatExposure = 607500,
  peerWasteTaxBaseline = 42500,
  peerExposureBaseline = 150000,
  peerReadinessBaseline = 76
}: ForensicCommandCockpitProps) {
  const router = useRouter();

  // Resolve live metrics from passed object or fallback to flat props
  const score = metrics?.complianceScore ?? flatScore;
  const leakage = metrics?.annualSalaryLeakage ?? flatLeakage;
  const exposure = metrics?.unhedgedLegalExposure ?? flatExposure;

  // Dynamic Sector Variance Calculations
  const taxVariancePct = peerWasteTaxBaseline > 0 
    ? Math.round(((leakage - peerWasteTaxBaseline) / peerWasteTaxBaseline) * 100) 
    : 0;
  const exposureVariancePct = peerExposureBaseline > 0 
    ? Math.round(((exposure - peerExposureBaseline) / peerExposureBaseline) * 100) 
    : 0;
  const readinessVariance = Math.round(score - peerReadinessBaseline);

  // Derived Financial Itemizations
  const wastedHoursPerYr = Math.round(leakage / 85); // Assuming ~$85/hr blended engineering rate
  const weeklyLoss = Math.round(leakage / 52);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `Organization,${companyName}\n`
      + `AI Readiness Index,${score}/100\n`
      + `Process Waste Tax,$${leakage}\n`
      + `Total Promise Gap Exposure,$${exposure}\n`
      + `Estimated Engineering Loss Hours,${wastedHoursPerYr} hrs/yr\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BMR_Diagnostic_${companyName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSOWClick = () => {
    if (onSelectSOW) onSelectSOW();
    const element = document.getElementById('sow-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-slate-900 border border-slate-200 p-8 md:p-10 rounded-lg shadow-sm space-y-10 font-sans max-w-[1200px] mx-auto text-left">
      
      {/* HEADER BAR & EXECUTIVE ACTIONS */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
            // Pre-Automation Control Plane Forensic Cockpit // {sector} SECTOR
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Diagnostic Verdict: {companyName}
          </h1>
        </div>

        {/* Executive Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 no-print">
          <button
            type="button"
            onClick={handleExportCSV}
            className="bg-white text-slate-700 border border-slate-300 text-xs font-mono font-bold px-4 py-2.5 uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer rounded-md flex items-center gap-2"
          >
            <Download size={14} /> Export CSV
          </button>

          <button
            type="button"
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="bg-slate-100 text-slate-800 border border-slate-300 text-xs font-mono font-bold px-4 py-2.5 uppercase tracking-wider hover:bg-slate-200 transition-colors cursor-pointer rounded-md flex items-center gap-2"
          >
            <Printer size={14} /> Generate PDF
          </button>

          <button
            type="button"
            onClick={handleSOWClick}
            className="bg-slate-900 text-white text-xs font-mono font-bold px-4 py-2.5 uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer rounded-md flex items-center gap-2"
          >
            <FileText size={14} /> Final SOW
          </button>

          <button
            type="button"
            onClick={() => {
              const company = encodeURIComponent(companyName || 'Target Organization');
              router.push(`/certificate?org=${company}`);
            }}
            className="bg-emerald-700 text-white text-xs font-mono font-bold px-5 py-2.5 uppercase tracking-wider hover:bg-emerald-800 transition-colors cursor-pointer rounded-md shadow-sm flex items-center gap-2"
          >
            <ShieldCheck size={16} /> View Verification Certificate
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1: AI Readiness Index */}
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

        {/* Metric 2: Process Waste Tax */}
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

        {/* Metric 3: Total Promise Gap Exposure */}
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

      {/* DETAILED ANALYSIS SECTION 1: FINANCIAL LEAKAGE DEEP-DIVE */}
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

      {/* DETAILED ANALYSIS SECTION 2: CROSS-PERSONA TRIANGULATION MATRIX */}
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
                <td className="py-3 font-bold text-slate-900 font-mono">EXECUTIVE</td>
                <td className="py-3 text-slate-600">Governance Mandate & Legal Hedging</td>
                <td className="py-3 text-slate-700">Policy established; enforcement lacks runtime telemetry.</td>
                <td className="py-3 text-right"><span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase"><AlertTriangle size={12}/> Discrepancy</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 font-mono">TECH_MGMT</td>
                <td className="py-3 text-slate-600">API Architecture & Pipeline Drift</td>
                <td className="py-3 text-slate-700">High schema drift risk; manual firefighting active.</td>
                <td className="py-3 text-right"><span className="inline-flex items-center gap-1 font-mono text-[10px] text-red-700 bg-red-50 px-2 py-0.5 rounded font-bold uppercase"><AlertTriangle size={12}/> High Friction</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 font-mono">OPS_MGMT</td>
                <td className="py-3 text-slate-600">Workflow Velocity & Alarm Sensitivity</td>
                <td className="py-3 text-slate-700">Alert fatigue suppresses response times across active queues.</td>
                <td className="py-3 text-right"><span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase"><AlertTriangle size={12}/> Desensitized</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 font-mono">SYSTEM_USER</td>
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
