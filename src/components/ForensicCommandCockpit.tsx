"use client";
import React from 'react';
import { useRouter } from 'next/router';
import { ShieldCheck, Printer, FileText, Download } from 'lucide-react';

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
  // Fallback flat props for backward compatibility
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

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `Organization,${companyName}\n`
      + `AI Readiness Index,${score}/100\n`
      + `Process Waste Tax,$${leakage}\n`
      + `Total Promise Gap Exposure,$${exposure}\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BMR_Diagnostic_${companyName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white text-slate-900 border border-slate-200 p-8 rounded-lg shadow-sm space-y-8 font-sans max-w-[1200px] mx-auto text-left">
      
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
            onClick={() => {
              const company = encodeURIComponent(companyName || 'Target Organization');
              router.push(`/sow?org=${company}`);
            }}
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

    </div>
  );
}
