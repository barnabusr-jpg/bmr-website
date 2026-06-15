import React from 'react';
import { SectorType } from '../lib/supabaseAdapter';

interface CockpitProps {
  companyName: string;
  sector: SectorType;
  metrics: {
    multiplier: number;
    complianceScore: number;
    annualSalaryLeakage: number;
    unhedgedLegalExposure: number;
    isTierThreeExposure: boolean;
    regulatoryAlertActive: boolean;
  };
}

/**
 * 🕹️ SECTOR-AWARE FORENSIC COMMAND COCKPIT
 * Integrates dynamic financial data matrices with print-ready CSS 
 * overrides to instantly emit pristine white-background executive SOW proposals.
 */
export default function ForensicCommandCockpit({ companyName, sector, metrics }: CockpitProps) {
  const sectorLabel = {
    FINANCE_HEALTHCARE: 'Highly Regulated (Finance/Healthcare)',
    ENTERPRISE_SAAS: 'Enterprise/SaaS',
    INDUSTRIAL_LOGISTICS: 'Industrial/Logistics',
    SERVICES_RETAIL: 'Services/Retail (Baseline)',
  }[sector];

  return (
    <div className="bg-black text-zinc-100 font-mono p-8 border border-zinc-900 max-w-4xl mx-auto my-6 relative rounded-sm shadow-2xl">
      
      {/* SECTOR RISK TELEMETRY CONTROL BAR */}
      <div className="border-b border-zinc-900 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
        <div className="text-left not-italic">
          <span className="text-[9px] text-zinc-500 block tracking-widest font-black uppercase">// ACTIVE RISK MULTIPLIER SECTOR</span>
          <span className="text-sm font-black text-white">
            <span className="text-red-500 font-mono font-black">{metrics.multiplier.toFixed(2)}×</span> ({sectorLabel})
          </span>
        </div>
        
        <button
          type="button"
          onClick={() => typeof window !== 'undefined' && window.print()}
          className="w-full sm:w-auto bg-zinc-100 text-black text-[10px] font-black px-5 py-2.5 uppercase tracking-widest rounded-sm hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-lg font-mono"
        >
          🖨️ Print SOW Blueprint
        </button>
      </div>

      {/* DYNAMIC EXECUTIVE DASHBOARD METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 no-print not-italic">
        <div className="border border-zinc-900 p-5 bg-zinc-950/40 text-left rounded-sm">
          <span className="text-[9px] text-zinc-500 block font-black uppercase tracking-wider">// COMPLIANCE EXP INDEX</span>
          <span className="text-xl font-black text-white font-mono">{metrics.complianceScore.toFixed(0)} / 100</span>
        </div>
        <div className="border border-zinc-900 p-5 bg-zinc-950/40 text-left rounded-sm">
          <span className="text-[9px] text-zinc-500 block font-black uppercase tracking-wider">// REWORK TAX IMPACT</span>
          <span className="text-xl font-black text-red-500 font-mono">${metrics.annualSalaryLeakage.toLocaleString()}</span>
        </div>
        <div className="border border-zinc-900 p-5 bg-zinc-950/40 text-left rounded-sm">
          <span className="text-[9px] text-zinc-500 block font-black uppercase tracking-wider">// UNHEDGED EXPOSURE</span>
          <span className="text-xl font-black text-red-500 font-mono">${metrics.unhedgedLegalExposure.toLocaleString()}</span>
        </div>
      </div>

      {/* 📑 STATEMENT OF WORK (SOW) DOCUMENT ENGINE CONTAINER */}
      <div className="p-8 bg-zinc-950 border border-zinc-900 text-left rounded-sm font-sans print-override-container">
        
        {/* SOW Document Core Header */}
        <div className="border-b border-zinc-800 pb-4 mb-6 font-mono">
          <span className="text-[10px] text-red-500 font-black tracking-widest uppercase block">// ARCHITECTURE REMEDIATION PROPOSAL</span>
          <h3 className="text-xl font-black text-white uppercase tracking-wider mt-1 print-black-text">Target Entity: {companyName}</h3>
          <p className="text-xs text-zinc-500 mt-2">
            Sector Matrix: {sectorLabel} &bull; Security Envelope State: {metrics.isTierThreeExposure ? 'CRITICAL RISK TIER 3' : 'STANDARD RISK TIER 1'}
          </p>
        </div>

        {/* Narrative Framework Loop */}
        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed font-normal print-black-text">
          <div>
            <h4 className="font-mono text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 print-black-text">// SECTION 01: EXECUTIVE ANALYSIS SUMMARY</h4>
            <p>
              Cross-persona triangulation maps severe algorithmic and infrastructure operational design decay across organizational layers. For the target system profile <strong>{companyName}</strong>, this operational alignment breakdown causes a recurring annual revenue drain of <strong>${metrics.annualSalaryLeakage.toLocaleString()}</strong> driven directly by technical debt, developer cycle abandonment, and unhedged remediation efforts.
            </p>
            
            {/* Context-Aware Regulatory Danger Alert Trigger */}
            {metrics.regulatoryAlertActive && (
              <div className="mt-4 border border-red-900/60 bg-red-950/20 text-red-400 p-4 font-mono text-xs not-italic rounded-sm leading-relaxed print-alert-box">
                <strong>🚨 CRITICAL STATUTORY LIABILITY DETECTED:</strong> Operational parameters indicate compliance failure trails across localized application layers. This exposes data groups directly to statutory enforcement thresholds and unhedged liability positions modeling up to <strong>${metrics.unhedgedLegalExposure.toLocaleString()}</strong>.
              </div>
            )}
          </div>

          <hr className="border-zinc-900 print-hidden-line" />

          <div>
            <h4 className="font-mono text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 print-black-text">// SECTION 02: MANDATED TECHNICAL OVERRIDES</h4>
            <p className="mb-3">To neutralize localized technical debt leakage, the following structural engineering milestones are established under this SOW:</p>
            <ul className="list-decimal list-inside space-y-2 text-zinc-300 pl-1 print-black-text">
              <li><strong>Interface Abstraction Layering:</strong> Decouple primary logic routes from external runtime environments to completely isolate schema changes.</li>
              <li><strong>Telemetry Event Prioritization:</strong> Implement event filtering protocols to drop noise metrics and prevent critical telemetry alert fatigue.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
