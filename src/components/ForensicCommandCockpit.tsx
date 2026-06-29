import React, { useMemo } from 'react';
import { SectorType } from '../lib/supabaseAdapter';
import { Activity, AlertTriangle, Copy, Check } from 'lucide-react';
import { compressToEncodedURIComponent } from 'lz-string';

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
  responses?: Record<string, any>; // 🚀 Added to capture stateless user inputs
}

/**
 * 🕹️ SECTOR-AWARE FORENSIC COMMAND COCKPIT (CLEAN RETRIEVAL EDITION)
 * Inherits strict dashboard parallax parity while adding a stateless, 
 * zero-database magic link recovery module.
 */
export default function ForensicCommandCockpit({ companyName, sector, metrics, responses = {} }: CockpitProps) {
  const [copied, setCopied] = React.useState(false);

  const sectorLabel = {
    FINANCE_HEALTHCARE: 'Highly Regulated (Finance/Healthcare)',
    ENTERPRISE_SAAS: 'Enterprise/SaaS',
    INDUSTRIAL_LOGISTICS: 'Industrial/Logistics',
    SERVICES_RETAIL: 'Services/Retail (Baseline)',
  }[sector];

  // 🔐 Compress contextual operational parameters into an immutable URL token
  const magicLink = useMemo(() => {
    if (typeof window === 'undefined' || !responses) return '';
    
    const payload = {
      org: companyName,
      sec: sector,
      ans: responses
    };
    
    const compressed = compressToEncodedURIComponent(JSON.stringify(payload));
    return `${window.location.origin}/diagnostic/summary?matrix=${compressed}`;
  }, [companyName, sector, responses]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(magicLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard write exception:', err);
    }
  };

  return (
    <div className="bg-[#020617] text-slate-200 font-sans tracking-tighter text-left italic uppercase font-black overflow-x-hidden p-10 max-w-[1600px] mx-auto pb-32">
      
      {/* HEADER TELEMETRY READOUT (Client-Safe Dashboard Style) */}
      <div className="flex items-center justify-between bg-black p-6 border border-slate-900 mb-6 no-print">
        <div className="flex items-center gap-3 shrink-0">
          <Activity className="text-red-600 animate-pulse" size={20} />
          <span className="text-white font-black uppercase italic tracking-[0.1em] text-sm font-mono">
            SYSTEM RISK SECTOR REGIME: <span className="text-red-600">{sectorLabel}</span>
          </span>
        </div>
        
        <button
          type="button"
          onClick={() => typeof window !== 'undefined' && window.print()}
          className="bg-zinc-100 text-black text-[10px] font-black px-6 py-2.5 uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all cursor-pointer font-mono shrink-0 leading-none"
        >
          PRINT SOW DOSSIER (PDF)
        </button>
      </div>

      {/* MATCHING QUAD-STYLE SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 italic no-print">
        <div className="bg-slate-950/60 border border-slate-800 p-6 flex flex-col justify-between min-h-[110px] relative transition-all hover:bg-slate-950">
          <span className="text-[9px] font-mono text-slate-500 font-black tracking-widest uppercase block">// COMPLIANCE EXP INDEX</span>
          <div className="text-4xl font-black italic tracking-tighter mt-4 leading-none text-white font-sans">
            {metrics.complianceScore.toFixed(0)}/100
          </div>
        </div>

        <div className="bg-slate-950/60 border border-yellow-600/30 p-6 flex flex-col justify-between min-h-[110px] relative transition-all hover:bg-slate-950">
          <span className="text-[9px] font-mono text-yellow-500 font-black tracking-widest uppercase block">// ANNUAL REWORK TAX IMPACT</span>
          <div className="text-4xl font-black italic tracking-tighter mt-4 leading-none text-yellow-500 font-sans">
            ${metrics.annualSalaryLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="bg-slate-950/60 border border-red-600/30 p-6 flex flex-col justify-between min-h-[110px] relative transition-all hover:bg-slate-950">
          <span className="text-[9px] font-mono text-red-500 font-black tracking-widest uppercase block">// UNHEDGED EXP EXPOSURE</span>
          <div className="text-4xl font-black italic tracking-tighter mt-4 leading-none text-red-500 font-sans">
            ${metrics.unhedgedLegalExposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      {/* RECOMMENDED STATEMENT OF WORK COMPONENT CONTAINER */}
      <div className="bg-white text-black p-10 border-l-[16px] border-slate-900 shadow-2xl space-y-6 mb-10 font-sans">
        
        {/* Document Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-100 pb-4 gap-2">
          <div className="not-italic">
            <span className="text-xs font-mono tracking-widest text-red-600 font-black uppercase">// ENGAGEMENT_ROADMAP_CONFIGURATION</span>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter text-black leading-none mt-1">
              TARGET STRATEGIC VERDICT DOSSIER: {companyName}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-black tracking-wider uppercase">
            {metrics.isTierThreeExposure ? 'TIER_03 // CRITICAL RECONSTRUCTION' : 'TIER_01 // DRIFT DIAGNOSTICS'}
          </span>
        </div>

        {/* Narrative Block Segment */}
        <div className="space-y-6 text-sm text-slate-800 leading-relaxed font-sans font-medium normal-case">
          <div>
            <h4 className="font-mono text-xs font-black text-slate-400 uppercase tracking-widest mb-2 italic">// SECTION 01: EXECUTIVE ANALYSIS SUMMARY</h4>
            <p>
              Cross-persona triangulation logs identify a significant technical debt layer across operations pipelines for <strong>{companyName}</strong>. At current workforce configurations, this structural friction generates a predictable annual leakage calculated at <strong>${metrics.annualSalaryLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>, resulting directly in developers abandoning active sprints to manage single-vendor dependencies manually.
            </p>
            
            {/* Dashboard-Aligned Alert Box */}
            {metrics.regulatoryAlertActive && (
              <div className="mt-4 border-2 border-red-600/30 bg-red-50 p-6 flex flex-col space-y-2 text-left italic uppercase font-black tracking-tighter">
                <span className="text-[10px] font-mono font-black text-red-600 tracking-widest block">// SECURE_BRIEFING_ALIGNMENT_ALERT</span>
                <div className="text-2xl text-red-600 flex items-center gap-2">
                  <AlertTriangle size={24} className="animate-pulse" /> HIGH STATUTORY EXPOSURE THRESHOLD DETECTED
                </div>
                <p className="text-xs leading-relaxed font-sans text-slate-700 normal-case font-normal border-l-2 border-red-600 pl-4 py-1 not-italic">
                  Localized operational systems fail baseline regulatory schema checks. System architecture trends project a maximum unhedged compliance exposure of <strong>${metrics.unhedgedLegalExposure.toLocaleString()}</strong> under modern regulatory frameworks.
                </p>
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* SOW Milestones Checklist */}
          <div>
            <h4 className="font-mono text-xs font-black text-slate-400 uppercase tracking-widest mb-3 italic">// SECTION 02: REMEDIATION ROADMAP</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 italic font-black">
              
              <div className="flex flex-col justify-between border border-slate-100 bg-slate-50/60 p-5 space-y-3 relative">
                <div className="space-y-1 not-italic font-sans">
                  <div className="flex justify-between items-center font-mono text-[9px] text-slate-400 font-black uppercase italic">
                    <span>PHASE 01</span>
                    <span className="text-red-600 font-black uppercase">CORE RISK</span>
                  </div>
                  <h5 className="text-sm font-black italic uppercase tracking-tight text-slate-900 font-sans">Pipeline Abstraction Layering</h5>
                  <p className="text-[11px] leading-relaxed text-slate-500 font-medium normal-case">Deploying vendor-agnostic adapter interfaces to insulate application databases from arbitrary external breaking modifications.</p>
                </div>
                <div className="font-mono text-xl font-black text-slate-200/60 absolute bottom-1 right-2 select-none">01</div>
              </div>

              <div className="flex flex-col justify-between border border-slate-100 bg-slate-50/60 p-5 space-y-3 relative">
                <div className="space-y-1 not-italic font-sans">
                  <div className="flex justify-between items-center font-mono text-[9px] text-slate-400 font-black uppercase italic">
                    <span>PHASE 02</span>
                    <span className="text-amber-600 font-black uppercase">MODERATE RISK</span>
                  </div>
                  <h5 className="text-sm font-black italic uppercase tracking-tight text-slate-900 font-sans">Telemetry Filter Prioritization</h5>
                  <p className="text-[11px] leading-relaxed text-slate-500 font-medium normal-case">Configuring internal monitoring alerts to filter background noise and eradicate structural operator alert fatigue.</p>
                </div>
                <div className="font-mono text-xl font-black text-slate-200/60 absolute bottom-1 right-2 select-none">02</div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 🔗 STATELESS RECORD MAGIC LINK RETRIEVAL INTERFACE CARD */}
      <div className="bg-slate-950/40 border border-slate-900 p-8 space-y-4 no-print">
        <div>
          <span className="text-[9px] font-mono text-red-500 font-black tracking-widest block">// IMMUTABLE RETRIEVAL LOG DEPLOYMENT</span>
          <h4 className="text-xl font-black uppercase tracking-tight text-white mt-0.5">PERMANENT STATELESS SHARE URL</h4>
          <p className="text-xs font-sans text-slate-400 font-normal normal-case not-italic mt-1 leading-relaxed">
            This platform runs database-free architecture patterns. Bookmark or copy this cryptographically compressed hyperlink token to re-compile this exact Statement of Work dataset dynamically at any future date.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch gap-2 font-mono not-italic text-xs">
          <input
            type="text"
            value={magicLink}
            readOnly
            onClick={(e) => (e.target as HTMLInputElement).select()}
            className="flex-1 bg-black border border-slate-800 p-3 text-slate-300 font-mono text-[11px] focus:outline-none focus:border-slate-600 truncate selection:bg-red-950 selection:text-red-400"
          />
          <button
            type="button"
            onClick={handleCopy}
            className={`px-6 py-3 font-sans font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer ${
              copied ? 'bg-green-600 text-white' : 'bg-red-600 text-white hover:bg-red-500'
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'COPIED' : 'COPY LEDGER LINK'}
          </button>
        </div>
      </div>

    </div>
  );
}
