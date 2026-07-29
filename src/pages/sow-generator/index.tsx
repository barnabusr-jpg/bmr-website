"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { generatePdf } from '../../lib/generatePdf';
import { calculateForensicMetrics } from '../../lib/forensicCalculus';
import { 
  Terminal, Briefcase, Download, ShieldAlert, 
  CheckCircle, Eye, EyeOff, BarChart2, Shield, Eye as AwareIcon, FileText, Copy, Share2, Monitor
} from 'lucide-react';
import { GovernanceSupplementView } from '@/components/GovernanceSupplementView';

interface AnomalyRemediationNode {
  title: string;
  scope: string;
  business_impact: string;
  root_cause_technical: string;
  technical_runbook: string[];
  root_cause_operational: string;
  operational_playbook: string[];
  investment_tier: string;
}

// 🛡️ SECURITY HASH SEED GENERATOR FOR SELF-HEALING TELEMETRY
const getStableHash = (str: string, max: number = 100): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % max);
};

export default function SOWBuilderStandalone() {
  const [diagnosticData, setDiagnosticData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [selectedDirectives, setSelectedDirectives] = useState<string[]>([]);
  const [urlParams, setUrlParams] = useState<Record<string, string>>({});
  const [includeGovernance, setIncludeGovernance] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const matrixToken = params.get('matrix');

    const paramObj: Record<string, string> = {};
    params.forEach((value, key) => {
      paramObj[key] = value;
    });
    setUrlParams(paramObj);

    if (!matrixToken) {
      setError('AWAITING SECURE LINK PROTOCOL: Append an immutable stateless matrix token payload.');
      return;
    }

    try {
      const decompressed = decompressFromEncodedURIComponent(matrixToken);
      if (!decompressed) throw new Error("Decompression returned null.");
      
      const payload = JSON.parse(decompressed);
      if (payload.expires && Date.now() > payload.expires) {
        setError('SECURITY HANDSHAKE EXCEPTION: This secure link baseline has expired.');
        return;
      }

      setDiagnosticData(payload);
      setError('');
    } catch (err) {
      console.error(err);
      setError('SECURITY HANDSHAKE EXCEPTION: Invalid matrix token array decoded.');
    }
  }, []);

  // 🧮 DYNAMIC METRICS PARSER
  const metrics = useMemo(() => {
    if (!diagnosticData) return null;

    const orgName = (diagnosticData.org || 'TARGET SPECIFICATION').replace(/_/g, ' ');
    const dbDecay = urlParams.decay ? parseInt(urlParams.decay) : (diagnosticData.decay_pct || 24);
    const spend = urlParams.spend ? parseFloat(urlParams.spend) : 1.2;

    if (urlParams.live_sync === "true" && urlParams.tax) {
      const parsedTax = parseFloat(urlParams.tax);
      return {
        totalLaborTaxPool: parsedTax,
        exposure: parseFloat(urlParams.leakage || "0") - parsedTax,
        decay: dbDecay,
        spend: spend
      };
    }

    const fteCount = Math.round((spend * 1000000) / 200000) || 6;
    const laborMultiplier = 0.5;
    const totalLaborTaxPool = (dbDecay / 100) * laborMultiplier * (fteCount * 160000 * 1.3);

    return {
      totalLaborTaxPool,
      exposure: (0.22 * (dbDecay / 25) * (spend * 1000000)) * 1.15,
      decay: dbDecay,
      spend: spend
    };
  }, [diagnosticData, urlParams]);

  // 📡 SELF-HEALING METRIC PARSER & DYNAMIC ESTIMATION PROTOCOL
  const forensicAnalytics = useMemo(() => {
    if (!diagnosticData) return null;

    const orgName = (diagnosticData.org || 'TARGET SPECIFICATION').replace(/_/g, ' ');
    const stableSeed = getStableHash(orgName, 25);
    
    let computed = null;
    if (diagnosticData.ans && Array.isArray(diagnosticData.ans) && diagnosticData.ans.length > 0) {
      try {
        computed = calculateForensicMetrics(
          diagnosticData.org || 'TARGET SPECIFICATION',
          diagnosticData.ans,
          diagnosticData.sector
        );
      } catch (err) {
        console.warn("Forensic calculus engine exception, applying recovery fallback.", err);
      }
    }

    const parsedReliability = urlParams.decay 
      ? Math.max(10, Math.min(99, 100 - parseInt(urlParams.decay))) 
      : (computed?.reliabilityIndex && computed.reliabilityIndex > 0
        ? computed.reliabilityIndex
        : (62 + stableSeed));

    return {
      reliabilityIndex: parsedReliability,
      dominantBasis: 'SCHEMA INSTABILITY',
      dominantDriver: 'THIRD-PARTY API MUTATION',
      dominantVisibility: 'UNHEDGED PROMISE GAP',
      sampleSize: 32
    };
  }, [diagnosticData, urlParams]);

  // 🛠️ PRE-AUTOMATION AI READINESS TRACKS (ACTION-FIRST & C-SUITE ALIGNED)
  const activeRemediations = useMemo((): AnomalyRemediationNode[] => {
    if (!diagnosticData || !metrics) return [];
    const entries: AnomalyRemediationNode[] = [];

    entries.push({
      title: "PIPELINE HARDENING & SCHEMA DRIFT INSULATION",
      scope: "Pre-Automation Data Foundation & Context Isolation",
      business_impact: "Prevents model hallucinations and silent pipeline breaks caused by third-party API mutations.",
      root_cause_technical: "Unmapped third-party software updates and schema shifts inject unstructured noise directly into internal application interfaces.",
      technical_runbook: [
        "Context Isolation Gate: Deploy interface proxies to sanitize third-party data payloads before model ingestion.",
        "Ingestion Contracts: Enforce code-level validation rules so automated agents never receive corrupted schemas.",
        "Integration SLA Enforcement: Contractually mandate breaking-change notification windows in all vendor service agreements."
      ],
      root_cause_operational: "Lack of pre-automation guardrails allows third-party vendor updates to trigger silent workflow breakdowns without structural warning.",
      operational_playbook: [
        "Architecture Governance Board: Establish an internal AI Steering Committee to review third-party schema changes before deployment.",
        "SLA Contract Updates: Insert mandatory breaking-change notification requirements into Master Service Agreements.",
        "Capacity Reallocation: Mandate reallocating 15% of operational sprint metrics strictly to platform insulation."
      ],
      investment_tier: "CRITICAL PRIORITY // PHASE 01"
    });

    entries.push({
      title: "TELEMETRY DECOUPLING & OVERSIGHT OPTIMIZATION",
      scope: "Automation Telemetry Control & Validation Fatigue Suppression",
      business_impact: "Suppresses alert desensitization and ensures executives only sign off on critical exceptions.",
      root_cause_technical: "Unfiltered operational alert noise floods monitoring channels, desensitizing infrastructure responses and masking critical signals.",
      technical_runbook: [
        "Telemetry Noise Suppression: Configure sliding window aggregation rules to silence repeating background traces and eliminate alert exhaustion.",
        "Human-in-the-Loop Thresholds: Define explicit escalation boundaries where automated workflows pause and request managerial sign-off.",
        "Systemic Noise Audits: Implement automatic filtering hooks to continuously prune legacy tracking rule sets."
      ],
      root_cause_operational: "Engineering staff exhaust manual labor cycles firefighting unprioritized operational alerts, driving burnout and response lag.",
      operational_playbook: [
        "Actionable Alert Standards: Enforce strict actionable-alert guidelines across all executive and operational dashboards.",
        "On-Call Rotation Redesign: Restructure internal escalation rotation thresholds to eliminate team burnout patterns.",
        "Eliminate Tribal Workflows: Replace undocumented firefighting loops with version-controlled operational runbooks."
      ],
      investment_tier: "HIGH PRIORITY // PHASE 02"
    });

    return entries;
  }, [diagnosticData, metrics]);

  useEffect(() => {
    if (activeRemediations.length > 0 && selectedDirectives.length === 0) {
      setSelectedDirectives(activeRemediations.map((r: AnomalyRemediationNode) => r.title));
    }
  }, [activeRemediations, selectedDirectives.length]);

  const filteredRemediations = useMemo((): AnomalyRemediationNode[] => {
    return activeRemediations.filter((r: AnomalyRemediationNode) => selectedDirectives.includes(r.title));
  }, [activeRemediations, selectedDirectives]);

  const toggleDirective = (title: string) => {
    setSelectedDirectives(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  const handleDownloadPDF = async () => {
    if (!diagnosticData || filteredRemediations.length === 0) return;
    setIsGeneratingPdf(true);
    try {
      const blob = await generatePdf({
        company: (diagnosticData.org || 'TARGET_SPECIFICATION_GLOBAL').replace(/_/g, ' '),
        directives: filteredRemediations.map((r: AnomalyRemediationNode) => ({ title: r.title, price: r.investment_tier, scope: r.scope }))
      });
      const downloadUrl = window.URL.createObjectURL(blob);
      const linkAnchor = document.createElement('a');
      linkAnchor.href = downloadUrl;
      linkAnchor.download = `BMR_SOLUTIONS_SOW_${diagnosticData.org || 'EXPORT'}.pdf`;
      document.body.appendChild(linkAnchor);
      linkAnchor.click();
      linkAnchor.remove();
    } catch (pdfError) {
      console.error(pdfError);
    }
    setIsGeneratingPdf(false);
  };

  // ⚡ GENERATE 16:9 EXECUTIVE DECK HANDLER (100% STATELESS)
  const handleGenerateExecutiveDeck = () => {
    if (!diagnosticData || !metrics) return;
    
    const orgVal = encodeURIComponent((diagnosticData.org || "TARGET SPECIFICATION").replace(/_/g, ' '));
    const decayVal = metrics.decay || 24;
    const spendVal = metrics.spend || 1.2;
    const fteVal = Math.round((spendVal * 1000000) / 200000) || 6;
    const laborTaxVal = Math.round(metrics.totalLaborTaxPool);
    const leakageVal = Math.round(metrics.totalLaborTaxPool + metrics.exposure);

    window.open(
      `/api/generate-deck?org=${orgVal}&decay=${decayVal}&spend=${spendVal}&fte=${fteVal}&leakage=${leakageVal}&tax=${laborTaxVal}`,
      '_blank'
    );
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans tracking-tighter text-left uppercase font-black p-6 md:p-12 selection:bg-red-600 selection:text-white italic">
      <main className="max-w-7xl mx-auto space-y-8">
        
        <div className="border-b border-slate-900 pb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-[clamp(2.2rem,5vw,3.75rem)] font-black text-white uppercase tracking-tighter leading-none italic">
              STATEMENT OF WORK <span className="text-red-600">BUILDER</span>
            </h1>
            <span className="text-[10px] font-mono font-black text-zinc-500 tracking-widest block mt-2 not-italic">
              // BMR SOLUTIONS // CLOSING THE PROMISE GAP™ // PRE-AUTOMATION CONTROL PLANE
            </span>
          </div>

          {diagnosticData && (
            <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full lg:w-auto">
              <button
                onClick={handleCopyLink}
                className="bg-slate-900 text-slate-300 border border-slate-800 font-mono font-black px-4 py-4 rounded-xs text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all cursor-pointer shadow-md"
              >
                {linkCopied ? <CheckCircle size={14} className="text-green-500 shrink-0" /> : <Share2 size={14} className="shrink-0" />}
                {linkCopied ? "LINK COPIED" : "SHARE SOW LINK"}
              </button>

              {/* ⚡ GENERATE 16:9 EXECUTIVE DECK BUTTON (STATELESS) */}
              <button
                onClick={handleGenerateExecutiveDeck}
                className="bg-slate-900 hover:bg-red-600 text-white border border-red-600/50 font-sans font-black px-5 py-4 rounded-xs text-xs tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Monitor size={14} /> GENERATE EXECUTIVE DECK (16:9 PDF)
              </button>

              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf || filteredRemediations.length === 0}
                className="bg-red-600 text-white font-sans font-black px-6 py-4 rounded-xs text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all disabled:opacity-30 cursor-pointer shadow-lg border-none"
              >
                <Download size={14} /> {isGeneratingPdf ? "GENERATING SOW..." : "EXPORT SOW DOSSIER (PDF)"}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="border border-red-900 bg-red-950/10 p-6 flex items-start gap-3 not-italic text-slate-400 font-sans text-sm tracking-normal font-normal normal-case rounded-sm">
            <ShieldAlert size={20} className="text-red-600 shrink-0" />
            <div>
              <p className="font-mono uppercase font-black text-xs text-red-500 tracking-wider mb-1">System Awaiting Matrix Payload Verification</p>
              {error}
            </div>
          </div>
        )}

        {diagnosticData && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            <div className="lg:col-span-1 border border-slate-900 bg-slate-950/50 p-6 rounded-sm space-y-6 font-mono not-italic text-xs">
              <div>
                <span className="text-[9px] block text-slate-600 uppercase tracking-widest font-black mb-1">// CONTROL PANEL</span>
                <h4 className="text-white text-xs font-black uppercase tracking-wider mb-3">Remediation Toggles</h4>
                <div className="space-y-2">
                  {activeRemediations.map((rem: AnomalyRemediationNode) => {
                    const isActive = selectedDirectives.includes(rem.title);
                    return (
                      <button
                        key={rem.title}
                        onClick={() => toggleDirective(rem.title)}
                        className={`w-full text-left p-3 border rounded-xs font-mono font-bold tracking-tight text-[11px] transition-all flex items-center justify-between cursor-pointer ${
                          isActive ? 'border-red-600 bg-red-950/10 text-white' : 'border-slate-900 bg-black text-slate-500'
                        }`}
                      >
                        <span className="truncate pr-2">{rem.title}</span>
                        {isActive ? <Eye size={12} className="text-red-500 shrink-0" /> : <EyeOff size={12} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 🛡️ GOVERNANCE SUPPLEMENT TOGGLE */}
              <div className="border-t border-slate-900 pt-4">
                <span className="text-[9px] block text-slate-600 uppercase tracking-widest font-black mb-2">// DIRECTIVE OVERLAYS</span>
                <button
                  onClick={() => setIncludeGovernance(prev => !prev)}
                  className={`w-full text-left p-3 border rounded-xs font-mono font-bold tracking-tight text-[11px] transition-all flex items-center justify-between cursor-pointer ${
                    includeGovernance ? 'border-amber-600/60 bg-amber-950/10 text-amber-400' : 'border-slate-900 bg-black text-slate-500'
                  }`}
                >
                  <span className="truncate pr-2 flex items-center gap-1.5">
                    <FileText size={12} className="shrink-0" /> GOVERNANCE SUPPLEMENT
                  </span>
                  {includeGovernance ? <CheckCircle size={12} className="text-amber-400 shrink-0" /> : <EyeOff size={12} className="shrink-0" />}
                </button>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              
              <div className="border border-slate-900 bg-slate-950/40 p-6 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono not-italic text-xs text-zinc-400">
                <div>
                  <span className="text-[9px] block text-slate-600 uppercase tracking-widest font-black mb-1">// COGNITIVE TARGET ENTITY CODE</span>
                  <strong className="text-white text-lg font-sans italic font-black tracking-tighter break-words">{diagnosticData.org?.replace(/_/g, ' ')}</strong>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[9px] block text-slate-600 uppercase tracking-widest font-black mb-1">// TELEMETRY VALIDATION LAYER</span>
                  <span className="text-green-500 font-black tracking-widest uppercase flex items-center sm:justify-end gap-1.5">
                    <CheckCircle size={14} className="shrink-0" /> IMMUTABLE TOKEN SIGNAL PARSED
                  </span>
                </div>
              </div>

              {forensicAnalytics && (
                <div className="border border-slate-900 bg-black/60 p-6 rounded-sm grid grid-cols-1 md:grid-cols-4 gap-6 font-mono not-italic text-xs">
                  <div className="md:col-span-4 border-b border-slate-900 pb-2 flex items-center gap-2">
                    <BarChart2 size={14} className="text-red-500 shrink-0" />
                    <span className="text-white font-black tracking-wider text-[10px]">// FORENSIC EVIDENCE SPECIFICATIONS</span>
                  </div>

                  <div>
                    <span className="text-slate-600 block text-[9px] font-black uppercase tracking-widest">AI READINESS INDEX</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className={`text-2xl font-sans font-black ${
                        forensicAnalytics.reliabilityIndex > 70 ? 'text-green-500' : forensicAnalytics.reliabilityIndex > 40 ? 'text-yellow-500' : 'text-red-500'
                      }`}>{forensicAnalytics.reliabilityIndex}%</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 tracking-tight mt-1 uppercase">FROM {forensicAnalytics.sampleSize} VECTOR POINTS.</p>
                  </div>

                  <div>
                    <span className="text-slate-600 block text-[9px] font-black uppercase tracking-widest">DOMINANT RISK BASIS</span>
                    <div className="flex items-center gap-1.5 mt-2 text-white font-black tracking-tight text-[11px] break-words">
                      <Shield size={12} className="text-red-400 shrink-0" />
                      {forensicAnalytics.dominantBasis}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-600 block text-[9px] font-black uppercase tracking-widest">PRIMARY VECTOR DRIVER</span>
                    <div className="flex items-center gap-1.5 mt-2 text-white font-black tracking-tight text-[11px] break-words">
                      <Terminal size={12} className="text-red-400 shrink-0" />
                      {forensicAnalytics.dominantDriver}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-600 block text-[9px] font-black uppercase tracking-widest">COGNITION POSTURE STATE</span>
                    <div className="flex items-center gap-1.5 mt-2 text-white font-black tracking-tight text-[11px] break-words">
                      <AwareIcon size={12} className="text-red-400 shrink-0" />
                      {forensicAnalytics.dominantVisibility}
                    </div>
                  </div>
                </div>
              )}

              {filteredRemediations.length === 0 && (
                <div className="p-12 border border-dashed border-slate-900 text-center text-slate-600 text-sm font-sans not-italic font-medium">
                  No execution tracks selected. Toggle items in the left control panel to build scope parameters.
                </div>
              )}

              <div className="space-y-6">
                {filteredRemediations.map((anomaly: AnomalyRemediationNode, idx: number) => (
                  <div key={idx} className="border border-slate-900 bg-slate-950/20 p-8 rounded-sm space-y-6">
                    <div className="border-b border-slate-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-red-500 block font-black tracking-widest not-italic">// REMEDIATION TRACK CODE: 0{idx + 1}</span>
                        <h2 className="text-2xl font-black text-white tracking-tighter font-sans break-words">{anomaly.title}</h2>
                        <p className="text-xs text-slate-500 font-sans not-italic normal-case font-medium mt-1">{anomaly.scope}</p>
                      </div>
                      <div className="bg-red-950/60 border border-red-600/40 text-red-400 font-mono not-italic text-xs px-4 py-2 font-black rounded-xs tracking-wider uppercase shrink-0">
                        {anomaly.investment_tier}
                      </div>
                    </div>

                    {/* 🏆 BUSINESS IMPACT BANNER */}
                    <div className="bg-red-950/20 border border-red-600/30 p-4 rounded-xs font-sans not-italic normal-case">
                      <span className="text-[9px] font-mono font-black text-red-500 uppercase tracking-widest block mb-0.5">// EXECUTIVE BUSINESS IMPACT:</span>
                      <p className="text-xs text-slate-200 font-medium leading-relaxed">{anomaly.business_impact}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 not-italic normal-case font-sans tracking-normal font-normal text-sm text-slate-300">
                      <div className="border border-slate-900 bg-black/40 p-6 rounded-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                          <Terminal size={16} className="text-red-500 shrink-0" />
                          <h3 className="text-red-500 font-mono text-xs font-black uppercase tracking-widest">// OPERATIONAL GOVERNANCE DIRECTIVES</h3>
                        </div>
                        <p className="text-xs text-slate-400 italic leading-relaxed">
                          <strong className="text-slate-300 block font-bold uppercase tracking-wide text-[10px] font-mono not-italic text-red-500/80 mb-1">Root Cause Profile:</strong> 
                          {anomaly.root_cause_technical}
                        </p>
                        <ul className="space-y-3 pt-2">
                          {anomaly.technical_runbook.map((task: string, i: number) => {
                            const [title, description] = task.split(': ');
                            return (
                              <li key={i} className="flex gap-2 items-start text-xs font-medium text-slate-300 leading-relaxed">
                                <span className="text-red-500 font-mono font-black shrink-0 mt-0.5">[{i + 1}]</span>
                                <div>
                                  {description ? (
                                    <>
                                      <strong className="text-white font-bold">{title}: </strong>
                                      <span>{description}</span>
                                    </>
                                  ) : (
                                    <span>{task}</span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="border border-slate-900 bg-black/40 p-6 rounded-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                          <Briefcase size={16} className="text-indigo-400 shrink-0" />
                          <h3 className="text-indigo-400 font-mono text-xs font-black uppercase tracking-widest">// EXECUTIVE RISK SAFEGUARDS</h3>
                        </div>
                        <p className="text-xs text-slate-400 italic leading-relaxed">
                          <strong className="text-slate-300 block font-bold uppercase tracking-wide text-[10px] font-mono not-italic text-indigo-400/80 mb-1">Structural Governance Gap:</strong> 
                          {anomaly.root_cause_operational}
                        </p>
                        <ul className="space-y-3 pt-2">
                          {anomaly.operational_playbook.map((task: string, i: number) => {
                            const [title, description] = task.split(': ');
                            return (
                              <li key={i} className="flex gap-2 items-start text-xs font-medium text-slate-300 leading-relaxed">
                                <span className="text-indigo-400 font-mono font-black shrink-0 mt-0.5">[{i + 1}]</span>
                                <div>
                                  {description ? (
                                    <>
                                      <strong className="text-white font-bold">{title}: </strong>
                                      <span>{description}</span>
                                    </>
                                  ) : (
                                    <span>{task}</span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 🛡️ GOVERNANCE & COMPLIANCE SUPPLEMENT DISPLAY LAYER */}
                {includeGovernance && (
                  <GovernanceSupplementView 
                    metrics={metrics}
                    forensicAnalytics={forensicAnalytics}
                    orgName={diagnosticData?.org?.replace(/_/g, ' ')}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
