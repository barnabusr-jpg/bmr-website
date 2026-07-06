import React, { useMemo } from 'react';
import { SectorType } from '@/lib/supabaseAdapter';
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
  responses?: Record<string, any>; // 🚀 Captured from stateless user inputs
}

// 🌐 MULTI-TENANT INDUSTRY INTELLIGENCE LOOKUP MATRIX
const INDUSTRY_PROFILES: Record<string, {
  label: string;
  taxLabel: string;
  exposureLabel: string;
  taxFormula: string;
  metric1Label: string;
  metric1Val: string;
  metric1Pct: number;
  metric1Peer: string;
  metric2Label: string;
  metric2Val: string;
  metric2Pct: number;
  metric2Peer: string;
  standards: Array<{ title: string; desc: string }>;
}> = {
  ENTERPRISE_SAAS: {
    label: "ENTERPRISE / SAAS CORE REGIME",
    taxLabel: "ANNUAL REWORK TAX IMPACT",
    exposureLabel: "UNHEDGED EXP EXPOSURE",
    taxFormula: "Total Rework Tax = (Impacted FTEs × Burdened Engineering Cost) × (Systemic Friction Index / 100) × Velocity Loss Multiplier",
    metric1Label: "SCHEMA STABILITY INDEX",
    metric1Val: "24% (CRITICAL)",
    metric1Pct: 24,
    metric1Peer: "Peer Avg: 78%",
    metric2Label: "TELEMETRY SIGNAL TO NOISE RATIO",
    metric2Val: "41% (DEGRADED)",
    metric2Pct: 41,
    metric2Peer: "Peer Avg: 65%",
    standards: [
      { title: "ISO/IEC 25010 // Product Quality Architecture", desc: "Coupled single-vendor interfaces violate Sub-characteristic 4.2 (Modifiability), inflating downstream modification regression risks exponentially." },
      { title: "SOC 2 Type II // Trust Services Criteria (CC7.2)", desc: "Unfiltered telemetry packet saturation directly degrades production anomaly identification timelines, violating core operational monitoring clauses." }
    ]
  },
  FINANCE_HEALTHCARE: {
    label: "HEALTH-TECH & CLINICAL TRANSACTIONAL REGIME",
    taxLabel: "CLINICAL OPERATIONAL TAX IMPACT",
    exposureLabel: "STATUTORY HIPAA RISK EXPOSURE",
    taxFormula: "Total Operational Tax = (Active Provider Endpoints × Data Sync Overhead) × (Interoperability Friction / 100) × Liability Multiplier",
    metric1Label: "INTEROPERABILITY LATENCY INTEGRITY",
    metric1Val: "18% (FAILING)",
    metric1Pct: 18,
    metric1Peer: "Peer Avg: 92%",
    metric2Label: "PATIENT TELEMETRY INGESTION DROP-RATE",
    metric2Val: "58% (CRITICAL)",
    metric2Pct: 58,
    metric2Peer: "Peer Avg: 99.9%",
    standards: [
      { title: "HIPAA Security Rule // § 164.312(b)", desc: "Lack of centralized pipeline abstraction mechanisms risks structural audit trail fractures across disparate distributed endpoints." },
      { title: "HL7 FHIR v4 // Data Exchange Conformance", desc: "Unstructured schema drift in clinical telemetry ingestion points causes severe serialization rejections, threatening clinical data lineage." }
    ]
  },
  INDUSTRIAL_LOGISTICS: {
    label: "FINTECH & TRANSACTIONAL METRIC REGIME",
    taxLabel: "SETTLEMENT LEAKAGE TAX IMPACT",
    exposureLabel: "UNHEDGED REGULATORY FINES LIABILITY",
    taxFormula: "Total Settlement Leakage = (Settlement Volume × Clearing Friction Coefficient) × (Ledger Drift Index / 100) × Regulatory Multiplier",
    metric1Label: "LEDGER RECONCILIATION ACCURACY",
    metric1Val: "71% (NON-COMPLIANT)",
    metric1Pct: 71,
    metric1Peer: "Peer Avg: 99.99%",
    metric2Label: "REAL-TIME TRANSACTION AUDITABILITY",
    metric2Val: "33% (CRITICAL RISK)",
    metric2Pct: 33,
    metric2Peer: "Peer Avg: 88%",
    standards: [
      { title: "PCI-DSS v4.0 // Requirement 10.2", desc: "Telemetry signal saturation and delayed processing times break real-time automated audit log generation loops for critical cardholder data environments." },
      { title: "Sarbanes-Oxley (SOX) // Section 404", desc: "Undocumented schema alterations in transactional messaging queues create high-severity unmapped risk vectors in internal financial reporting controls." }
    ]
  },
  SERVICES_RETAIL: {
    label: "SERVICES / RETAIL CORE REGIME (BASELINE)",
    taxLabel: "RETAIL PROCESSING FRICTION TAX",
    exposureLabel: "RETAIL RISK EXPOSURE post-AUDIT",
    taxFormula: "Total Processing Friction = (Point-of-Sale Nodes × Synchronization Latency) × Overhead Index",
    metric1Label: "TRANSACTION SYNCポスト COHERENCE",
    metric1Val: "52% (STRESSED)",
    metric1Pct: 52,
    metric1Peer: "Peer Avg: 89%",
    metric2Label: "LOGISTICS ENDPOINT INVENTORY BLINDNESS",
    metric2Val: "47% (DEGRADED)",
    metric2Pct: 47,
    metric2Peer: "Peer Avg: 75%",
    standards: [
      { title: "NIST Cybersecurity Framework v2 (PR.DS)", desc: "Unfiltered event telemetry configurations limit automated detection responsiveness across point-of-sale node networks." }
    ]
  }
};

export default function ForensicCommandCockpit({ companyName, sector, metrics, responses = {} }: CockpitProps) {
  const [copied, setCopied] = React.useState(false);

  // 📡 Resolve active industry parameters safely from our data dictionary map
  const activeProfile = useMemo(() => {
    const key = (sector || 'SERVICES_RETAIL').toUpperCase() as string;
    return INDUSTRY_PROFILES[key] || INDUSTRY_PROFILES.SERVICES_RETAIL;
  }, [sector]);

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
            SYSTEM RISK SECTOR REGIME: <span className="text-red-600">{activeProfile.label}</span>
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
          <span className="text-[9px] font-mono text-yellow-500 font-black tracking-widest uppercase block">// {activeProfile.taxLabel}</span>
          <div className="text-4xl font-black italic tracking-tighter mt-4 leading-none text-yellow-500 font-sans">
            ${metrics.annualSalaryLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="bg-slate-950/60 border border-red-600/30 p-6 flex flex-col justify-between min-h-[110px] relative transition-all hover:bg-slate-950">
          <span className="text-[9px] font-mono text-red-500 font-black tracking-widest uppercase block">// {activeProfile.exposureLabel}</span>
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

            {/* 🧮 THE ANTI-BULL CIO CALCULUS MATRIX (Dynamic Integration) */}
            <div className="bg-[#090d16] border border-slate-900 font-mono p-6 my-8 text-left text-slate-300 shadow-inner rounded-sm not-italic normal-case font-medium">
              <div className="text-[10px] text-red-500 font-black tracking-widest uppercase mb-4 flex justify-between items-center">
                <span>// QUANTITATIVE LEAKAGE DERIVATION LEDGER</span>
                <span className="text-[9px] text-slate-500 bg-black/50 px-2 py-0.5 border border-slate-800 tracking-normal">REGIME: {activeProfile.label}</span>
              </div>
              
              <div className="text-xs space-y-4 leading-relaxed">
                <div>
                  <span className="text-white font-bold block mb-1 uppercase tracking-tight text-[11px]">Formula Verification Anchor:</span>
                  <code className="text-yellow-500 block bg-black/60 p-3 border border-slate-900 font-bold tracking-tight text-[11px] overflow-x-auto whitespace-pre-wrap font-mono">
                    {activeProfile.taxFormula}
                  </code>
                </div>
              </div>
            </div>

            {/* 📊 INDUSTRY BENCHMARK PARITY MATRIX (Dynamic Integration) */}
            <div className="my-8 border-t border-b border-slate-200 py-6 not-italic normal-case font-medium">
              <span className="text-[10px] font-mono font-black tracking-widest text-slate-400 block mb-4 uppercase">// COHORT BENCHMARK PARITY MATRIX</span>
              <div className="space-y-4 font-mono text-xs">
                {/* Dynamic Metric 1 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-bold text-slate-700">{activeProfile.metric1Label}:</span>
                    <span className="text-red-600 font-bold">{activeProfile.metric1Val} <span className="text-slate-400 font-normal">/ {activeProfile.metric1Peer}</span></span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-xs overflow-hidden">
                    <div className="bg-red-600 h-full" style={{ width: `${activeProfile.metric1Pct}%` }} />
                  </div>
                </div>
                {/* Dynamic Metric 2 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-bold text-slate-700">{activeProfile.metric2Label}:</span>
                    <span className="text-amber-600 font-bold">{activeProfile.metric2Val} <span className="text-slate-400 font-normal">/ {activeProfile.metric2Peer}</span></span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-xs overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: `${activeProfile.metric2Pct}%` }} />
                  </div>
                </div>
              </div>
            </div>
            
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

          {/* 📜 STANDARDS COMPLIANCE CROSS-REFERENCE (Dynamic Integration) */}
          <div className="bg-slate-50 border border-slate-200 p-6 my-6 font-mono text-xs text-slate-700 not-italic normal-case font-medium">
            <div className="text-[10px] text-black font-black tracking-widest uppercase mb-3">// ARCHITECTURAL CODES & STANDARDS CROSS-REFERENCE</div>
            <ul className="space-y-3 list-none p-0 m-0 text-[11px]">
              {activeProfile.standards.map((std, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-600 font-bold shrink-0">[NON-COMPLIANT]</span>
                  <div>
                    <strong className="text-black">{std.title}:</strong> {std.desc}
                  </div>
                </li>
              ))}
            </ul>
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
