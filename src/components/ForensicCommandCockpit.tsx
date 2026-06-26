import React, { useMemo } from 'react';
import { SectorType } from '../lib/supabaseAdapter';
import { Activity, Copy, Check } from 'lucide-react';
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
  responses: Record<string, any>;
}

/**
 * 🕹️ SECTOR-AWARE FORENSIC COMMAND COCKPIT (CLEAN RETRIEVAL EDITION)
 * Cleans out internal calculation indicators from customer view while
 * exposing a stateless, zero-database link sharing interface block.
 */
export default function ForensicCommandCockpit({ companyName, sector, metrics, responses }: CockpitProps) {
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

  // Convert and sanitize numerical values safely to prevent layout dropouts
  const displayCompliance = typeof metrics.complianceScore === 'number' ? Math.round(metrics.complianceScore) : 0;
  const displayLeakage = typeof metrics.annualSalaryLeakage === 'number' ? metrics.annualSalaryLeakage : 0;
  const displayExposure = typeof metrics.unhedgedLegalExposure === 'number' ? metrics.unhedgedLegalExposure : 0;

  return (
    <div className="bg-[#020617] text-slate-200 font-sans tracking-tighter text-left italic uppercase font-black overflow-x-hidden p-10 max-w-[1600px] mx-auto pb-32 selection:bg-red-600/30">
      
      {/* HEADER TELEMETRY READOUT */}
      <div className="flex items-center justify-between bg-black p-6 border border-slate-900 mb-6 no-print">
        <div className="flex items-center gap-3 shrink-0">
          <Activity className="text-red-600 animate-pulse" size={20} />
          <span className="text-white font-black uppercase italic tracking-[0.1em] text-sm font-mono">
            // PLATFORM RUNTIME INTEGRITY // COMPILATION POSTURE DETECTED
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 italic no-print w-full items-stretch">
        <div className="bg-slate-950/60 border border-slate-800 p-6 flex flex-col justify-between min-h-[110px] relative transition-all hover:bg-slate-950">
          <span className="text-[9px] font-mono text-slate-500 font-black tracking-widest uppercase block">// COMPLIANCE EXP INDEX</span>
          <div className="text-4xl font-black italic tracking-tighter mt-4 leading-none text-white font-sans whitespace-nowrap">
            {displayCompliance}/100
          </div>
        </div>

        <div className="bg-slate-950/60 border border-yellow-600/30 p-6 flex flex-col justify-between min-h-[110px] relative transition-all hover:bg-slate-950">
          <span className="text-[9px] font-mono text-yellow-500 font-black tracking-widest uppercase block">// ANNUAL REWORK TAX IMPACT</span>
          <div className="text-4xl font-black italic tracking-tighter mt-4 leading-none text-yellow-500 font-sans whitespace-nowrap">
            ${displayLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="bg-slate-950/60 border border-red-600/30 p-6 flex flex-col justify-between min-h-[110px] relative transition-all hover:bg-slate-950">
          <span className="text-[9px] font-mono text-red-500 font-black tracking-widest uppercase block">// UNHEDGED EXP EXPOSURE</span>
          <div className="text-4xl font-black italic tracking-tighter mt-4 leading-none text-red-500 font-sans whitespace-nowrap">
            ${displayExposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      {/* RECOMMENDED STATEMENT OF WORK COMPONENT CONTAINER */}
      <div className="bg-white text-black p-10 border-l-[16px] border-slate-900 shadow-2xl space-y-6 mb-10 font-sans">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-100 pb-4 gap-2">
          <div className="not-italic">
            <span className="text-xs font-mono tracking-widest text-red-600 font-black uppercase">// ENGAGEMENT_ROADMAP_CONFIGURATION</span>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter text-black leading-none mt-1 whitespace-normal break-normal">
              TARGET SOW DOSSIER: {companyName}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-black tracking-wider uppercase shrink-0">
            {metrics.isTierThreeExposure ? 'TIER_03 // CRITICAL RECONSTRUCTION' : 'TIER_01 // DRIFT DIAGNOSTICS'}
          </span>
        </div>

        <div className="space-y-6 text-sm text-slate-800 leading-relaxed font-sans font-medium normal-case not-italic">
          <p>
            Cross-persona quad-vector correlation logs identify a significant technical debt layer across operations pipelines for <strong>{companyName}</strong>. At current workforce configurations, this structural friction generates a predictable annual leakage calculated at <strong className="text-black">${displayLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>.
          </p>
        </div>
      </div>

      {/* 🔗 STATELESS RECORD MAGIC LINK RETRIEVAL INTERFACE CARD */}
      <div className="bg-slate-950/40 border border-slate-900 p-8 space-y-4 no-print rounded-xs">
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
              copied ? 'bg-green-600 text-white border-green-700' : 'bg-red-600 text-white border-red-700 hover:bg-red-500'
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
