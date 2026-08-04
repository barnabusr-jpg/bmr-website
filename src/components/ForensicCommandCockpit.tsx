"use client";
import React, { useMemo } from 'react';
import { SectorType } from '@/lib/supabaseAdapter';
import { Activity, AlertTriangle, Copy, Check, FileText, TrendingUp, TrendingDown, Minus } from 'lucide-react';
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
  responses?: Record<string, any>; 
}

const PILLAR_REGISTRIES: Record<string, {
  label: string;
  badge: string;
  taxTitle: string;
  standards: Array<{ title: string; desc: string }>;
  riskDossier: { title: string; desc: string };
}> = {
  IGF: {
    label: "GOVERNANCE & CONTROLS (IGF)",
    badge: "GOVERNANCE_GAP",
    taxTitle: "GOVERNANCE STRAIN OVERHEAD",
    standards: [
      { title: "PCI-DSS v4.0 // Requirement 10.2", desc: "Telemetry signal saturation and delayed processing times interrupt real-time automated audit log generation loops for critical cardholder data environments." },
      { title: "Sarbanes-Oxley (SOX) // Section 404", desc: "Undocumented schema alterations in transactional messaging queues create high-severity unmapped risk vectors in internal financial reporting controls." }
    ],
    riskDossier: {
      title: "UNSANCTIONED INTEGRATION POSITION EXPOSURE",
      desc: "Proprietary procedural logs and workflow operations parameters are leaking through public endpoints to generate text optimizations, breaking explicit vertical data handling provisions."
    }
  },
  AVS: {
    label: "PIPELINE DRIFT & ARCHITECTURAL STRAIN (AVS)",
    badge: "ENGINEERING_ARCH",
    taxTitle: "PROCESS WASTE TAX",
    standards: [
      { title: "ISO 9001:2015 // Clause 8.5.1", desc: "Uncontrolled schema alterations in transactional messaging queues create high-severity unmapped risk vectors in baseline distribution metrics." },
      { title: "HL7 FHIR v4 // Data Exchange Conformance", desc: "Unstructured schema drift in operational telemetry ingestion points causes severe serialization rejections, threatening transactional data lineage." }
    ],
    riskDossier: {
      title: "SHADOW INFRASTRUCTURE PIPELINE DRIFT",
      desc: "Multi-node verification parameters uncover undocumented data interfaces running unmapped APIs, driving unmitigated system complexity and engineering rework overhead."
    }
  },
  HAI: {
    label: "TELEMETRY DECOUPLING & FATIGUE (HAI)",
    badge: "PROCESS_STRAIN",
    taxTitle: "TELEMETRY FATIGUE DRIFT",
    standards: [
      { title: "NIST Cybersecurity Framework v2 (PR.DS)", desc: "Unfiltered event telemetry configurations limit automated detection responsiveness across distributed endpoint node networks." }
    ],
    riskDossier: {
      title: "STOCHASTIC BLACK-BOX DECISION DRIFT LIABILITY",
      desc: "Opaque algorithmic optimization steps run with zero intermediate state logging persistence parameters, skewing tracking profiles and triggering severe operational blindness."
    }
  }
};

export default function ForensicCommandCockpit({ companyName, sector, metrics, responses = {} }: CockpitProps) {
  const [copied, setCopied] = React.useState(false);

  // 🧮 DYNAMIC INDUSTRY PEER BASELINE CALCULATOR
  const peerBenchmarks = useMemo(() => {
    const readinessScore = metrics.complianceScore || 0;
    const wasteTax = metrics.annualSalaryLeakage || 0;
    const exposure = metrics.unhedgedLegalExposure || 0;

    // Sector Baseline Assumptions
    const peerReadinessBaseline = 76; // Peer average score
    const peerWasteTaxBaseline = 42500; // Average baseline waste for standard team size
    const peerExposureBaseline = 150000; // Average baseline unhedged risk

    const readinessVariance = readinessScore - peerReadinessBaseline;
    const taxVariancePct = peerWasteTaxBaseline > 0 ? Math.round(((wasteTax - peerWasteTaxBaseline) / peerWasteTaxBaseline) * 100) : 0;
    const exposureVariancePct = peerExposureBaseline > 0 ? Math.round(((exposure - peerExposureBaseline) / peerExposureBaseline) * 100) : 0;

    return {
      peerReadinessBaseline,
      readinessVariance,
      peerWasteTaxBaseline,
      taxVariancePct,
      peerExposureBaseline,
      exposureVariancePct
    };
  }, [metrics]);

  const detectedPillars = useMemo((): string[] => {
    const active = new Set<string>();
    if (responses && Object.keys(responses).length > 0) {
      Object.values(responses).forEach((personaPayload) => {
        if (personaPayload && typeof personaPayload === 'object') {
          Object.keys(personaPayload).forEach((questionId) => {
            const cleanKey = String(questionId).toUpperCase();
            if (cleanKey.startsWith('IGF-')) active.add('IGF');
            if (cleanKey.startsWith('AVS-') || cleanKey.includes('DECAY') || cleanKey.includes('SPEND')) active.add('AVS');
            if (cleanKey.startsWith('HAI-')) active.add('HAI');
          });
        }
      });
    }

    const sectorString = String(sector || '').toUpperCase();
    if (sectorString.includes('COMPLIANCE') || sectorString.includes('IGF')) active.add('IGF');
    if (sectorString.includes('DEBT') || sectorString.includes('AVS')) active.add('AVS');
    if (sectorString.includes('BIAS') || sectorString.includes('HAI')) active.add('HAI');

    if (active.size === 0) {
      active.add('AVS');
      active.add('IGF');
    }
    
    return Array.from(active);
  }, [responses, sector]);

  const aiTelemetryMetrics = useMemo(() => {
    const selectedAnswers: Record<string, string> = {};
    Object.values(responses || {}).forEach((personaPayload) => {
      if (personaPayload && typeof personaPayload === 'object') {
        Object.entries(personaPayload).forEach(([questionId, selection]) => {
          if (selection && typeof selection === 'object' && 'key' in selection) {
            selectedAnswers[questionId] = String((selection as any).key).toUpperCase();
          } else {
            selectedAnswers[questionId] = String(selection).toUpperCase();
          }
        });
      }
    });

    return {
      showsShadowAiRisk: ['C', 'D'].includes(selectedAnswers['IGF-29-USER']) || ['C', 'D'].includes(selectedAnswers['IGF-10-MGMT']) || ['C', 'D'].includes(selectedAnswers['HAI-84-USER']),
      showsBlackBoxRisk: ['C', 'D'].includes(selectedAnswers['IGF-01-EXEC']) || ['C', 'D'].includes(selectedAnswers['HAI-73-MGMT']) || ['C', 'D'].includes(selectedAnswers['HAI-83-USER'])
    };
  }, [responses]);

  const generatorLink = useMemo(() => {
    if (typeof window === 'undefined' || !responses) return '';
    const payload = { 
      org: companyName, 
      sec: sector, 
      ans: responses,
      expires: Date.now() + 86400000 
    };
    const compressed = compressToEncodedURIComponent(JSON.stringify(payload));
    return `${window.location.origin}/sow-generator?matrix=${compressed}`;
  }, [companyName, sector, responses]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatorLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard write exception:', err);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans text-left overflow-x-hidden p-6 md:p-10 max-w-[1600px] mx-auto pb-32 space-y-6">
      
      {/* HEADER TELEMETRY READOUT */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 border border-slate-200 rounded-lg shadow-sm no-print gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex items-center gap-2.5 shrink-0">
            <Activity className="text-slate-900 animate-pulse" size={18} />
            <span className="text-slate-900 font-mono font-bold uppercase tracking-wider text-xs">
              TRIANGULATION REGIME MATRIX:
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {detectedPillars.map((p: string) => (
              <span key={p} className="bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px] px-3 py-1 rounded-md font-bold tracking-tight">
                // {PILLAR_REGISTRIES[p]?.label || p}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={generatorLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 text-white text-xs font-bold px-5 py-2.5 uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer rounded-md shadow-sm font-sans shrink-0 inline-flex items-center gap-2 decoration-0"
          >
            <FileText size={14} /> Open SOW Terminal
          </a>
          <button
            type="button"
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="bg-white text-slate-700 border border-slate-200 text-xs font-mono font-bold px-5 py-2.5 uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer shrink-0 rounded-md shadow-sm"
          >
            Print Dossier
          </button>
        </div>
      </div>

      {/* SUMMARY INDEX DISPLAY MODULES WITH PEER BENCHMARKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 no-print font-sans">
        
        {/* KPI 1: AI READINESS INDEX */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wider uppercase block">// AI Readiness Index</span>
            <div className="text-4xl font-extrabold tracking-tight mt-2 text-slate-900">
              {metrics.complianceScore.toFixed(0)}<span className="text-slate-400 text-2xl font-normal">/100</span>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-500">Peer Sector Baseline: {peerBenchmarks.peerReadinessBaseline}/100</span>
            <span className={`font-bold flex items-center gap-1 ${
              peerBenchmarks.readinessVariance >= 0 ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {peerBenchmarks.readinessVariance >= 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
              {peerBenchmarks.readinessVariance >= 0 ? `+${peerBenchmarks.readinessVariance}` : `${peerBenchmarks.readinessVariance}`} Variance
            </span>
          </div>
        </div>

        {/* KPI 2: PROCESS WASTE TAX */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wider uppercase block">// Process Waste Tax</span>
            <div className="text-4xl font-extrabold tracking-tight mt-2 text-slate-900">
              ${metrics.annualSalaryLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-500">Peer Sector Baseline: ${peerBenchmarks.peerWasteTaxBaseline.toLocaleString()}</span>
            <span className={`font-bold flex items-center gap-1 ${
              peerBenchmarks.taxVariancePct <= 0 ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {peerBenchmarks.taxVariancePct <= 0 ? <Minus size={12}/> : <TrendingUp size={12}/>}
              {peerBenchmarks.taxVariancePct > 0 ? `+${peerBenchmarks.taxVariancePct}%` : `${peerBenchmarks.taxVariancePct}%`} Overhead
            </span>
          </div>
        </div>

        {/* KPI 3: PROMISE GAP EXPOSURE */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wider uppercase block">// Promise Gap™ Exposure</span>
            <div className="text-4xl font-extrabold tracking-tight mt-2 text-slate-900">
              ${metrics.unhedgedLegalExposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-500">Peer Sector Median: ${peerBenchmarks.peerExposureBaseline.toLocaleString()}</span>
            <span className={`font-bold flex items-center gap-1 ${
              peerBenchmarks.exposureVariancePct <= 0 ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {peerBenchmarks.exposureVariancePct <= 0 ? <Minus size={12}/> : <AlertTriangle size={12}/>}
              {peerBenchmarks.exposureVariancePct > 0 ? `+${peerBenchmarks.exposureVariancePct}%` : `${peerBenchmarks.exposureVariancePct}%`} Exposure
            </span>
          </div>
        </div>

      </div>

      {/* CORE SPECIFICATION VIEW SHEET */}
      <div className="bg-white text-slate-900 p-8 md:p-10 border border-slate-200 rounded-lg shadow-sm space-y-6 font-sans">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-5 gap-2">
          <div>
            <span className="text-xs font-mono tracking-wider text-slate-500 font-bold uppercase block mb-1">// Strategic Verdict Dossier</span>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Client Target: {companyName}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 border border-slate-200 px-3 py-1 rounded-md uppercase tracking-wider">
            {metrics.isTierThreeExposure ? 'Tier 03 // Logic Reconstruction' : 'Tier 01 // Drift Diagnostics'}
          </span>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-sans">
          <div>
            <h4 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">// Executive Analysis Summary</h4>
            <p className="text-slate-600 font-medium">
              Cross-persona triangulation logs identify stacked risk vectors and unmapped operational vulnerabilities across core development pipelines for <strong className="text-slate-900 font-bold">{companyName}</strong>. At existing workforce resource parameters, this systemic friction generates an aggregated annual loss run-rate calculated at <strong className="text-slate-900 font-bold">${metrics.annualSalaryLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>, requiring structural remediation actions.
            </p>

            <div className="my-8 border-t border-b border-slate-100 py-6">
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 block mb-4 uppercase">// Identified Logic Fractures Inventory ({detectedPillars.length})</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detectedPillars.map((p: string) => (
                  <div key={p} className="border border-slate-200 bg-slate-50 p-5 rounded-md space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wider block uppercase">// Exposure Layer: {PILLAR_REGISTRIES[p]?.badge}</span>
                    <h5 className="font-sans text-sm font-bold text-slate-900 uppercase">{PILLAR_REGISTRIES[p]?.riskDossier.title}</h5>
                    <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal">{PILLAR_REGISTRIES[p]?.riskDossier.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {metrics.regulatoryAlertActive && (
              <div className="mt-4 border border-amber-200 bg-amber-50/60 p-6 rounded-md flex flex-col space-y-2 text-left">
                <span className="text-[10px] font-mono font-bold text-amber-800 tracking-wider block uppercase">// Pre-Automation Alignment Alert</span>
                <div className="text-sm font-bold text-amber-900 flex items-center gap-2 uppercase font-mono">
                  <AlertTriangle size={16} className="text-amber-700 shrink-0" /> Systemic Asymmetric Overhead Gap Encountered
                </div>
                <p className="text-xs leading-relaxed font-sans text-slate-700 font-normal border-l-2 border-amber-600 pl-4 py-1 mt-1">
                  Local system configurations trigger out-of-bounds metrics. Projections trace an unhedged operational vulnerability of up to <strong className="text-slate-900 font-bold">${metrics.unhedgedLegalExposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> if pipelines are left unmodified prior to scaling autonomous agents.
                </p>
              </div>
            )}
          </div>

          {(aiTelemetryMetrics.showsShadowAiRisk || aiTelemetryMetrics.showsBlackBoxRisk) && (
            <div className="my-8 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-2 text-amber-800 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle size={15} className="text-amber-600 shrink-0" /> 
                <span>// Triangulation Warning: Cognitive Friction Encountered</span>
              </div>
              <div className="text-xs bg-slate-50 border border-slate-200 p-4 rounded-md text-slate-600 font-normal leading-relaxed">
                Operational data streams indicate users are passing structural tracking contexts into unsecured machine-learning analytics nodes lacking historical trace parameters.
              </div>
            </div>
          )}

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-md font-mono text-xs text-slate-700">
            <div className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mb-3">// Architectural Codes & Governance Standards Parity Lookup</div>
            <ul className="space-y-3 list-none p-0 m-0 text-xs">
              {detectedPillars.flatMap((p: string) => PILLAR_REGISTRIES[p]?.standards || []).map((std, idx: number) => (
                <li key={idx} className="flex items-start gap-2 border-b border-slate-200/60 pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-900 font-bold shrink-0">[REVIEW REQUIRED]</span>
                  <div>
                    <strong className="text-slate-900 font-bold">{std.title}:</strong> <span className="text-slate-600">{std.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">// Remediation Roadmap Progression</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-200 bg-slate-50 p-5 rounded-md space-y-2">
                <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 font-bold uppercase">
                  <span>Phase 01</span>
                  <span className="text-slate-900 font-bold">Core Reconstruction</span>
                </div>
                <h5 className="text-sm font-bold text-slate-900">Pipeline Abstraction Layering</h5>
                <p className="text-xs leading-relaxed text-slate-600 font-normal">Deploying decoupled adapter patterns to fully insulate backend transactional structures from system drift.</p>
              </div>

              <div className="border border-slate-200 bg-slate-50 p-5 rounded-md space-y-2">
                <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 font-bold uppercase">
                  <span>Phase 02</span>
                  <span className="text-slate-900 font-bold">Governance Index</span>
                </div>
                <h5 className="text-sm font-bold text-slate-900">Telemetry Filter Prioritization</h5>
                <p className="text-xs leading-relaxed text-slate-600 font-normal">Structuring central monitoring parameters across networks to eliminate background noise and alert fatigue thresholds.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* STATELESS SHARE CARD TERMINAL */}
      <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-lg shadow-sm space-y-4 no-print">
        <div>
          <span className="text-[10px] font-mono text-slate-500 block font-bold tracking-wider uppercase">// Deployable SOW Generator Matrix</span>
          <h4 className="text-lg font-bold text-slate-900 tracking-tight mt-1">Interactive SOW Workbench Link</h4>
          <p className="text-xs font-sans text-slate-600 font-normal leading-relaxed mt-1">
            This engine processes configurations completely database-free. Copy this tokenized URL to load the interactive SOW Generator workbench containing your exact alignment data at any moment.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch gap-3 font-mono text-xs">
          <input
            type="text"
            value={generatorLink}
            readOnly
            onClick={(e) => (e.target as HTMLInputElement).select()}
            className="flex-1 bg-slate-50 border border-slate-200 p-3 text-slate-700 font-mono text-xs rounded-md focus:outline-none focus:border-slate-400 truncate"
          />
          <button
            type="button"
            onClick={handleCopy}
            className={`px-6 py-3 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer text-white rounded-md shadow-sm ${
              copied ? 'bg-emerald-600' : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy SOW Blueprint Link'}
          </button>
        </div>
      </div>

    </div>
  );
}
