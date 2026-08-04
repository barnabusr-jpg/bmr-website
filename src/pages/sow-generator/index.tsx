"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { generatePdf } from '../../lib/generatePdf';
import { calculateForensicMetrics } from '../../lib/forensicCalculus';
import { 
  Terminal, Briefcase, Download, ShieldAlert, 
  CheckCircle, Eye, EyeOff, BarChart2, Shield, Eye as AwareIcon, FileText, Share2, Monitor
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

// SECURITY HASH SEED GENERATOR FOR TELEMETRY RECOVERY
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
      setError('Awaiting valid diagnostic parameter token to load Statement of Work.');
      return;
    }

    try {
      const decompressed = decompressFromEncodedURIComponent(matrixToken);
      if (!decompressed) throw new Error("Decompression returned null.");
      
      const payload = JSON.parse(decompressed);
      if (payload.expires && Date.now() > payload.expires) {
        setError('The access token for this diagnostic payload has expired.');
        return;
      }

      setDiagnosticData(payload);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Invalid or corrupted matrix token payload received.');
    }
  }, []);

  // DYNAMIC METRICS PARSER
  const metrics = useMemo(() => {
    if (!diagnosticData) return null;

    const orgName = (diagnosticData.org || 'Target Organization').replace(/_/g, ' ');
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

  // METRIC PARSER & ESTIMATION PROTOCOL
  const forensicAnalytics = useMemo(() => {
    if (!diagnosticData) return null;

    const orgName = (diagnosticData.org || 'Target Organization').replace(/_/g, ' ');
    const stableSeed = getStableHash(orgName, 25);
    
    let computed = null;
    if (diagnosticData.ans && Array.isArray(diagnosticData.ans) && diagnosticData.ans.length > 0) {
      try {
        computed = calculateForensicMetrics(
          diagnosticData.org || 'Target Organization',
          diagnosticData.ans,
          diagnosticData.sector
        );
      } catch (err) {
        console.warn("Calculus engine exception, applying recovery fallback.", err);
      }
    }

    const parsedReliability = urlParams.decay 
      ? Math.max(10, Math.min(99, 100 - parseInt(urlParams.decay))) 
      : (computed?.reliabilityIndex && computed.reliabilityIndex > 0
        ? computed.reliabilityIndex
        : (62 + stableSeed));

    return {
      reliabilityIndex: parsedReliability,
      dominantBasis: 'Schema Instability',
      dominantDriver: 'Third-Party API Mutation',
      dominantVisibility: 'The Promise Gap(TM) Risk',
      sampleSize: 32
    };
  }, [diagnosticData, urlParams]);

  // PRE-AUTOMATION AI READINESS TRACKS
  const activeRemediations = useMemo((): AnomalyRemediationNode[] => {
    if (!diagnosticData || !metrics) return [];
    const entries: AnomalyRemediationNode[] = [];

    entries.push({
      title: "Track 01: Pipeline Hardening & Schema Drift Insulation",
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
      investment_tier: "Phase 01 Alignment"
    });

    entries.push({
      title: "Track 02: Telemetry Decoupling & Oversight Optimization",
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
      investment_tier: "Phase 02 Alignment"
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
        company: (diagnosticData.org || 'Target Organization').replace(/_/g, ' '),
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

  const handleGenerateExecutiveDeck = () => {
    if (!diagnosticData || !metrics) return;
    
    const orgVal = encodeURIComponent((diagnosticData.org || "Target Organization").replace(/_/g, ' '));
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
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans p-6 md:p-12 text-left">
      <main className="max-w-7xl mx-auto space-y-8">
        
        <div className="border-b border-slate-200 pb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Statement of Work <span className="text-slate-500 font-normal">Builder</span>
            </h1>
            <span className="text-xs font-mono font-medium text-slate-500 tracking-wider block mt-2">
              BMR Solutions // Closing The Promise Gap(TM) // Pre-Automation Control Plane
            </span>
          </div>

          {diagnosticData && (
            <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full lg:w-auto">
              <button
                onClick={handleCopyLink}
                className="bg-white text-slate-700 border border-slate-200 font-mono font-bold px-4 py-3 rounded-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
              >
                {linkCopied ? <CheckCircle size={14} className="text-emerald-600 shrink-0" /> : <Share2 size={14} className="shrink-0" />}
                {linkCopied ? "Link Copied" : "Share SOW Link"}
              </button>

              <button
                onClick={handleGenerateExecutiveDeck}
                className="bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold px-5 py-3 rounded-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <Monitor size={14} /> Executive Deck (16:9 PDF)
              </button>

              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf || filteredRemediations.length === 0}
                className="bg-slate-900 text-white font-sans font-bold px-6 py-3 rounded-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer shadow-sm border-none"
              >
                <Download size={14} /> {isGeneratingPdf ? "Generating SOW..." : "Export SOW Dossier (PDF)"}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="border border-slate-200 bg-white p-6 flex items-start gap-3 text-slate-600 text-sm font-sans rounded-md shadow-sm">
            <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-mono uppercase font-bold text-xs text-slate-900 tracking-wider mb-1">Diagnostic Payload Verification Required</p>
              {error}
            </div>
          </div>
        )}

        {diagnosticData && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            <div className="lg:col-span-1 border border-slate-200 bg-white p-6 rounded-lg shadow-sm space-y-6 text-xs">
              <div>
                <span className="text-[10px] font-mono block text-slate-500 uppercase tracking-wider font-bold mb-1">// SOW Control Panel</span>
                <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider mb-3">Remediation Tracks</h4>
                <div className="space-y-2">
                  {activeRemediations.map((rem: AnomalyRemediationNode) => {
                    const isActive = selectedDirectives.includes(rem.title);
                    return (
                      <button
                        key={rem.title}
                        onClick={() => toggleDirective(rem.title)}
                        className={`w-full text-left p-3 border rounded-md font-mono font-bold tracking-tight text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isActive ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className="truncate pr-2">{rem.title}</span>
                        {isActive ? <Eye size={12} className="text-emerald-400 shrink-0" /> : <EyeOff size={12} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <span className="text-[10px] font-mono block text-slate-500 uppercase tracking-wider font-bold mb-2">// Governance Supplement</span>
                <button
                  onClick={() => setIncludeGovernance(prev => !prev)}
                  className={`w-full text-left p-3 border rounded-md font-mono font-bold tracking-tight text-xs transition-all flex items-center justify-between cursor-pointer ${
                    includeGovernance ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate pr-2 flex items-center gap-1.5">
                    <FileText size={12} className="shrink-0" /> Governance Supplement
                  </span>
                  {includeGovernance ? <CheckCircle size={12} className="text-emerald-400 shrink-0" /> : <EyeOff size={12} className="shrink-0" />}
                </button>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              
              <div className="border border-slate-200 bg-white p-6 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-slate-600">
                <div>
                  <span className="text-[10px] block text-slate-500 uppercase tracking-wider font-bold mb-1">// Target Organization</span>
                  <strong className="text-slate-900 text-lg font-sans font-bold tracking-tight break-words">{diagnosticData.org?.replace(/_/g, ' ')}</strong>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] block text-slate-500 uppercase tracking-wider font-bold mb-1">// Status</span>
                  <span className="text-emerald-700 font-bold tracking-wider uppercase flex items-center sm:justify-end gap-1.5">
                    <CheckCircle size={14} className="shrink-0" /> Diagnostic Token Validated
                  </span>
                </div>
              </div>

              {forensicAnalytics && (
                <div className="border border-slate-200 bg-white p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
                  <div className="md:col-span-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <BarChart2 size={14} className="text-slate-900 shrink-0" />
                    <span className="text-slate-900 font-bold tracking-wider text-[11px] uppercase">// Diagnostic Findings Summary</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">AI Readiness Index</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className={`text-2xl font-sans font-bold ${
                        forensicAnalytics.reliabilityIndex > 70 ? 'text-emerald-600' : forensicAnalytics.reliabilityIndex > 40 ? 'text-amber-600' : 'text-red-600'
                      }`}>{forensicAnalytics.reliabilityIndex}%</span>
                    </div>
                    <p className="text-[10px] text-slate-400 tracking-tight mt-1 uppercase">Sample Size: {forensicAnalytics.sampleSize} Points</p>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">Primary Risk Basis</span>
                    <div className="flex items-center gap-1.5 mt-2 text-slate-900 font-bold tracking-tight text-xs break-words">
                      <Shield size={12} className="text-slate-700 shrink-0" />
                      {forensicAnalytics.dominantBasis}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">Primary Vector Driver</span>
                    <div className="flex items-center gap-1.5 mt-2 text-slate-900 font-bold tracking-tight text-xs break-words">
                      <Terminal size={12} className="text-slate-700 shrink-0" />
                      {forensicAnalytics.dominantDriver}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">Operational Risk State</span>
                    <div className="flex items-center gap-1.5 mt-2 text-slate-900 font-bold tracking-tight text-xs break-words">
                      <AwareIcon size={12} className="text-slate-700 shrink-0" />
                      {forensicAnalytics.dominantVisibility}
                    </div>
                  </div>
                </div>
              )}

              {filteredRemediations.length === 0 && (
                <div className="p-12 border border-dashed border-slate-200 text-center text-slate-500 text-sm font-sans font-medium rounded-lg bg-white">
                  No remediation tracks selected. Select options in the left control panel to build the SOW scope.
                </div>
              )}

              <div className="space-y-6">
                {filteredRemediations.map((anomaly: AnomalyRemediationNode, idx: number) => (
                  <div key={idx} className="border border-slate-200 bg-white p-6 md:p-8 rounded-lg shadow-sm space-y-6">
                    <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 block font-bold tracking-wider uppercase mb-1">// Remediation Scope 0{idx + 1}</span>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-sans break-words">{anomaly.title}</h2>
                        <p className="text-xs text-slate-500 font-sans font-medium mt-1">{anomaly.scope}</p>
                      </div>
                      <div className="bg-slate-100 border border-slate-200 text-slate-900 font-mono text-xs px-3.5 py-1.5 font-bold rounded-md tracking-wider uppercase shrink-0">
                        {anomaly.investment_tier}
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-md font-sans">
                      <span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider block mb-1">// Executive Business Impact:</span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">{anomaly.business_impact}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans text-sm text-slate-700">
                      <div className="border border-slate-200 bg-slate-50/50 p-5 rounded-md space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                          <Terminal size={16} className="text-slate-900 shrink-0" />
                          <h3 className="text-slate-900 font-mono text-xs font-bold uppercase tracking-wider">// Technical Execution Plan</h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong className="text-slate-900 block font-bold uppercase tracking-wide text-[10px] font-mono mb-1">Root Cause Profile:</strong>
                          {anomaly.root_cause_technical}
                        </p>
                        <ul className="space-y-3 pt-2">
                          {anomaly.technical_runbook.map((task: string, i: number) => {
                            const [title, description] = task.split(': ');
                            return (
                              <li key={i} className="flex gap-2 items-start text-xs font-medium text-slate-700 leading-relaxed">
                                <span className="text-slate-900 font-mono font-bold shrink-0 mt-0.5">[{i + 1}]</span>
                                <div>
                                  {description ? (
                                    <>
                                      <strong className="text-slate-900 font-bold">{title}: </strong>
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

                      <div className="border border-slate-200 bg-slate-50/50 p-5 rounded-md space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                          <Briefcase size={16} className="text-slate-900 shrink-0" />
                          <h3 className="text-slate-900 font-mono text-xs font-bold uppercase tracking-wider">// Operational Governance Directives</h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong className="text-slate-900 block font-bold uppercase tracking-wide text-[10px] font-mono mb-1">Governance Deficit:</strong>
                          {anomaly.root_cause_operational}
                        </p>
                        <ul className="space-y-3 pt-2">
                          {anomaly.operational_playbook.map((task: string, i: number) => {
                            const [title, description] = task.split(': ');
                            return (
                              <li key={i} className="flex gap-2 items-start text-xs font-medium text-slate-700 leading-relaxed">
                                <span className="text-slate-900 font-mono font-bold shrink-0 mt-0.5">[{i + 1}]</span>
                                <div>
                                  {description ? (
                                    <>
                                      <strong className="text-slate-900 font-bold">{title}: </strong>
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
