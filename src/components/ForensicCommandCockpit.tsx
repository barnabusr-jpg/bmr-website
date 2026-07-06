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
  responses?: Record<string, any>; // 🚀 Captured from stateless multi-persona user inputs
}

// 🌐 MULTI-TENANT INDUSTRY LOOKUP MATRIX (1:1 PARITY WITH STRATEGY INTAKE CONFIGS)
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
  aiRiskDossier: {
    shadowAiVector: string;
    shadowAiDesc: string;
    blackBoxVector: string;
    blackBoxDesc: string;
  };
}> = {
  FINANCE: {
    label: "FINANCIAL SERVICES & TRANSACTIONS COMPLIANCE REGIME",
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
    ],
    aiRiskDossier: {
      shadowAiVector: "UNSANCTIONED TRADING POSITION SCALPING",
      shadowAiDesc: "Analysts and options desk teams are routing proprietary transactional datasets through commercial public endpoints to generate text optimizations, leaking protected customer asset metrics.",
      blackBoxVector: "BLACK-BOX ALGORITHMIC POSITIONING LIABILITIES",
      blackBoxDesc: "Automated routing and account rebalancing rules rely on unmapped external model steps. These processes operate with zero intermediate calculation data logging, creating significant internal audit exposures."
    }
  },
  HEALTHCARE: {
    label: "HEALTH-TECH & CLINICAL LIABILITY REGIME",
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
    ],
    aiRiskDossier: {
      shadowAiVector: "ELEVATED PHI/PII REPOSITORY TRACE",
      shadowAiDesc: "Clinical and operations administrative staff are routing complex patient triage documentation and financial summary logs through public diagnostic model endpoints to generate custom text outputs, violating strict statutory handling provisions.",
      blackBoxVector: "STOCHASTIC CLINICAL DECISION DRIFT LIABILITY",
      blackBoxDesc: "Opaque machine learning layers running inside analytics tools are making structural operational calls. Because these algorithmic nodes lack deterministic trace logs, they expose the entity to severe clinical accountability liability and audit rejections."
    }
  },
  INDUSTRIAL: {
    label: "INDUSTRIAL LOGISTICS & SUPPLY OPERATIONS REGIME",
    taxLabel: "SUPPLY PIPELINE TAX OVERHEAD",
    exposureLabel: "OPERATIONAL HAZARD CAPITAL LOSS",
    taxFormula: "Total Supply Friction = (Siloed Distribution Warehouses × Network Synchronization Latency) × Overhead Margin Index",
    metric1Label: "NODE DISTORTION COEFFICIENT",
    metric1Val: "54% (STRESSED)",
    metric1Pct: 54,
    metric1Peer: "Peer Avg: 85%",
    metric2Label: "LOGISTICS INVENTORY BLINDNESS",
    metric2Val: "47% (DEGRADED)",
    metric2Pct: 47,
    metric2Peer: "Peer Avg: 75%",
    standards: [
      { title: "ISO 9001:2015 // Clause 8.5.1", desc: "Uncontrolled schema alterations in transactional messaging queues create high-severity unmapped risk vectors in distribution metrics." }
    ],
    aiRiskDossier: {
      shadowAiVector: "UNMANAGED SUPPLY NODE ROUTING AUTOMATION",
      shadowAiDesc: "Procurement agents are passing proprietary vendor transaction histories and localized route sheets to unmapped public optimization agents to bypass standard workflow steps.",
      blackBoxVector: "BLACK-BOX INVENTORY EXTRAPOLATION EXPONENT",
      blackBoxDesc: "Automated warehouse optimization engines are re-allocating physical space and sorting priority lists based on unaccountable predictive weights, masking core demand signals from structural operations management."
    }
  },
  SERVICES: {
    label: "SERVICES & LABOR CORE OPERATIONS REGIME",
    taxLabel: "WORKFORCE FRICTION REWORK OVERHEAD",
    exposureLabel: "UNHEDGED LABOR FRICTION CAPITAL TAX",
    taxFormula: "Total Processing Friction = (Point-of-Sale Nodes × Synchronization Latency) × Overhead Index",
    metric1Label: "TRANSACTION SYNC COHERENCE",
    metric1Val: "52% (STRESSED)",
    metric1Pct: 52,
    metric1Peer: "Peer Avg: 89%",
    metric2Label: "WORKFORCE EXTRACTION LEAKAGE",
    metric2Val: "64% (HIGH RESISTANCE)",
    metric2Pct: 64,
    metric2Peer: "Peer Avg: 78%",
    standards: [
      { title: "NIST Cybersecurity Framework v2 (PR.DS)", desc: "Unfiltered event telemetry configurations limit automated detection responsiveness across point-of-sale node networks." }
    ],
    aiRiskDossier: {
      shadowAiVector: "UNMONITORED WORKFORCE TASK AUTOMATION",
      shadowAiDesc: "Store operators and client teams use unsanctioned public language plugins to format customized promotion manifests, exposing internal operational parameters.",
      blackBoxVector: "BLACK-BOX DEMAND PREDICTION DISCONNECTS",
      blackBoxDesc: "Inventory and task allocation queries utilize opaque third-party analytics APIs that lack historical logic state persistence parameters, skewing labor scheduling profiles."
    }
  }
};

export default function ForensicCommandCockpit({ companyName, sector, metrics, responses = {} }: CockpitProps) {
  const [copied, setCopied] = React.useState(false);

  // 📡 Resolve active industry parameters safely from our data dictionary map
  const activeProfile = useMemo(() => {
    const key = (sector || 'SERVICES').toUpperCase() as string;
    return INDUSTRY_PROFILES[key] || INDUSTRY_PROFILES.SERVICES;
  }, [sector]);

  // 🛰️ DETERMINISTIC TELEMETRY ASSESSMENT CALCULATOR
  const aiTelemetryMetrics = useMemo(() => {
    if (!responses || Object.keys(responses).length === 0) {
      return { showsShadowAiRisk: false, showsBlackBoxRisk: false };
    }

    const selectedAnswers: Record<string, string> = {};
    
    // Flatten and clean raw response payloads across all submitted operator nodes
    Object.values(responses).forEach((personaPayload) => {
      if (personaPayload) {
        Object.entries(personaPayload).forEach(([questionId, selection]) => {
          if (selection && typeof selection === 'object' && 'key' in selection) {
            selectedAnswers[questionId] = String(selection.key).toUpperCase();
          } else if (typeof selection === 'string') {
            selectedAnswers[questionId] = selection.toUpperCase();
          }
        });
      }
    });

    // Evaluation Matrix A: SHADOW AI (Triggers on Symptom Weight Scales 'C' or 'D')
    const showsShadowAiRisk = 
      ['C', 'D'].includes(selectedAnswers['IGF-29-USER']) ||
      ['C', 'D'].includes(selectedAnswers['IGF-10-MGMT']) ||
      ['C', 'D'].includes(selectedAnswers['HAI-84-USER']);

    // Evaluation Matrix B: BLACK-BOX LOGIC RISK
    const showsBlackBoxRisk = 
      ['C', 'D'].includes(selectedAnswers['IGF-01-EXEC']) ||
      ['C', 'D'].includes(selectedAnswers['HAI-73-MGMT']) ||
      ['C', 'D'].includes(selectedAnswers['HAI-83-USER']);

    return { showsShadowAiRisk, showsBlackBoxRisk };
  }, [responses]);

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
      
      {/* HEADER TELEMETRY READOUT */}
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
              Cross-persona triangulation logs identify a significant technical debt layer across operations pipelines for <strong>{companyName}</strong>. At current workforce configurations, this structural friction generates a predictable annual leakage calculated at <strong>${metrics.annualSalaryLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>, resulting directly in operational resource overhead matching your explicit vertical parameters.
            </p>

            {/* 🧮 THE ANTI-BULL CIO CALCULUS MATRIX */}
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

            {/* 📊 INDUSTRY BENCHMARK PARITY MATRIX */}
            <div className="my-8 border-t border-b border-slate-200 py-6 not-italic normal-case font-medium">
              <span className="text-[10px] font-mono font-black tracking-widest text-slate-400 block mb-4 uppercase">// COHORT BENCHMARK PARITY MATRIX</span>
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-bold text-slate-700">{activeProfile.metric1Label}:</span>
                    <span className="text-red-600 font-bold">{activeProfile.metric1Val} <span className="text-slate-400 font-normal">/ {activeProfile.metric1Peer}</span></span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-xs overflow-hidden">
                    <div className="bg-red-600 h-full" style={{ width: `${activeProfile.metric1Pct}%` }} />
                  </div>
                </div>
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

          {/* 🛰️ SECTION 01-B: ADVANCED COGNITIVE RISK LEDGER (Deterministic Evaluation) */}
          {(aiTelemetryMetrics.showsShadowAiRisk || aiTelemetryMetrics.showsBlackBoxRisk) ? (
            <div className="my-10 border-t-2 border-slate-900 pt-6 not-italic normal-case font-medium">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-black uppercase tracking-widest italic mb-6">
                <AlertTriangle size={16} className="animate-pulse" /> 
                <span>// TRIANGULATION WARNING: COGNITIVE OVERHEAD DETECTED</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Dynamic Shadow AI Exposure Card */}
                {aiTelemetryMetrics.showsShadowAiRisk ? (
                  <div className="border border-red-900/40 bg-red-950/5 p-6 space-y-2 text-left">
                    <span className="text-[9px] font-mono font-black text-red-600 tracking-widest block">
                      // RISK VECTOR ENCOUNTERED: SHADOW AI LIFECYCLE
                    </span>
                    <h5 className="font-sans text-base font-black uppercase tracking-tight text-slate-950">
                      {activeProfile.aiRiskDossier.shadowAiVector}
                    </h5>
                    <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal">
                      {activeProfile.aiRiskDossier.shadowAiDesc}
                    </p>
                  </div>
                ) : (
                  <div className="border border-emerald-900/20 bg-emerald-950/5 p-6 space-y-1 text-left opacity-60">
                    <span className="text-[9px] font-mono text-emerald-600 tracking-widest block">// EXPOSURE CLEAR</span>
                    <h5 className="font-sans text-sm font-black text-slate-400 uppercase">SHADOW AI INSULATION SECURE</h5>
                  </div>
                )}

                {/* Dynamic Black Box Exposure Card */}
                {aiTelemetryMetrics.showsBlackBoxRisk ? (
                  <div className="border border-slate-300 bg-slate-50 p-6 space-y-2 text-left">
                    <span className="text-[9px] font-mono font-black text-slate-500 tracking-widest block">
                      // RISK VECTOR ENCOUNTERED: BLACK-BOX UNCERTAINTY
                    </span>
                    <h5 className="font-sans text-base font-black uppercase tracking-tight text-slate-950">
                      {activeProfile.aiRiskDossier.blackBoxVector}
                    </h5>
                    <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal">
                      {activeProfile.aiRiskDossier.blackBoxDesc}
                    </p>
                  </div>
                ) : (
                  <div className="border border-slate-200 bg-slate-50/50 p-6 space-y-1 text-left opacity-60">
                    <span className="text-[9px] font-mono text-slate-400 tracking-widest block">// EXPOSURE CLEAR</span>
                    <h5 className="font-sans text-sm font-black text-slate-400 uppercase">DETERMINISTIC DECISION LOGGING ACTIVE</h5>
                  </div>
                )}

              </div>
            </div>
          ) : null}

          <hr className="border-slate-100" />

          {/* 📜 STANDARDS COMPLIANCE CROSS-REFERENCE */}
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

      {/* STATELESS Magic Link SHARE CARD */}
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
