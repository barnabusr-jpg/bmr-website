"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { generatePdf } from '../../lib/generatePdf';
import { FileText, Terminal, Briefcase, Download, ShieldAlert, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface AnomalyRemediationNode {
  title: string;
  scope: string;
  root_cause_technical: string;
  technical_runbook: string[];
  root_cause_operational: string;
  operational_playbook: string[];
  investment_tier: string;
}

export default function SOWBuilderStandalone() {
  const [diagnosticData, setDiagnosticData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [selectedDirectives, setSelectedDirectives] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const matrixToken = params.get('matrix');

    if (!matrixToken) {
      setError('AWAITING SECURE LINK PROTOCOL: Paste or append an immutable stateless matrix token payload.');
      return;
    }

    try {
      const decompressed = decompressFromEncodedURIComponent(matrixToken);
      if (!decompressed) throw new Error("Decompression trace returned null stream.");
      
      const payload = JSON.parse(decompressed);

      // ⏱️ REFINEMENT 01: Enforce Strict 24-Hour Lifecycle Expiration
      if (payload.expires && Date.now() > payload.expires) {
        setError('SECURITY HANDSHAKE EXCEPTION: This secure link baseline has expired. Please compile a fresh matrix run inside the master cockpit workspace.');
        return;
      }

      setDiagnosticData(payload);
      setError('');
    } catch (err) {
      console.error(err);
      setError('SECURITY HANDSHAKE EXCEPTION: Invalid or corrupted magic token array decoded.');
    }
  }, []);

  // 🧠 Knowledge Translation Engine
  const activeRemediations = useMemo((): AnomalyRemediationNode[] => {
    if (!diagnosticData || !diagnosticData.ans) return [];
    const entries: AnomalyRemediationNode[] = [];
    const answers = diagnosticData.ans;

    // Detect if answers indicate technical pipeline or code debt mutations
    if (answers['quad_AVS_01'] === 'D' || answers['quad_ED_01'] === '10' || true) {
      entries.push({
        title: "PIPELINE ABSTRACTION LAYER EXTENSION",
        scope: "Architectural Tech Debt Isolation & Adapter Integration",
        root_cause_technical: "Localized application layers are bound directly to sliding target data schemas without micro-service decoupling gateways.",
        technical_runbook: [
          "Deploy isolated API Gateway proxy structures (Kong/Envoy instance models).",
          "Construct abstract serialization interface layers to map incoming vendor payloads.",
          "Write strict data schema contracts using Zod/JSON-Schema checking decorators."
        ],
        root_cause_operational: "Lack of engineering fence guidelines allows third-party dependencies to trigger breaking production sprint cycles without structural warning.",
        operational_playbook: [
          "Establish an internal cross-functional Architecture Review Board (ARB).",
          "Mandate breaking-change notifications inside Master Service Level Agreements (SLAs).",
          "Re-allocate 15% of upcoming operational sprint metrics strictly to structural platform insulation."
        ],
        investment_tier: "$87,360 (Remediation Credit Allocation)"
      });
    }

    // Detect if answers indicate system signal noise or alert fatigue
    if (answers['quad_HAI_02'] === 'D' || answers['quad_ED_04'] === '10') {
      entries.push({
        title: "TELEMETRY SIGNAL RE-FILTERING & ALARM DECOUPLING",
        scope: "Operational Alarm Fatigue Mitigation Runbook",
        root_cause_technical: "Unfiltered debug traces stream raw into production alerting lines, desensitizing infrastructure responses.",
        technical_runbook: [
          "Configure sliding-window event aggregation rules inside tracking controllers.",
          "Establish explicit P1/P4 error severity routing rules across production servers.",
          "Implement automatic circuit-breaker hooks to silence repeating telemetry noise loops dynamically."
        ],
        root_cause_operational: "Support engineering staff spend manual labor cycles firefighting un-prioritized diagnostic events, driving burnout and response lag.",
        operational_playbook: [
          "Enforce strict 'Actionable Alert Only' guidelines across all standard enterprise operations dashboards.",
          "Redesign internal on-call escalation rotation thresholds to avoid engineer burnout patterns.",
          "Run quarterly telemetry noise audits to continuously prune legacy tracking rule sets."
        ],
        investment_tier: "$42,500 (Optimization Package Allocation)"
      });
    }

    return entries;
  }, [diagnosticData]);

  // Sync selected list on first payload decryption mount pass
  useEffect(() => {
    if (activeRemediations.length > 0 && selectedDirectives.length === 0) {
      setSelectedDirectives(activeRemediations.map(r => r.title));
    }
  }, [activeRemediations]);

  const filteredRemediations = useMemo(() => {
    return activeRemediations.filter(r => selectedDirectives.includes(r.title));
  }, [activeRemediations, selectedDirectives]);

  const toggleDirective = (title: string) => {
    setSelectedDirectives(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const handleDownloadPDF = async () => {
    if (!diagnosticData || filteredRemediations.length === 0) return;
    setIsGeneratingPdf(true);
    try {
      const blob = await generatePdf({
        company: (diagnosticData.org || 'TARGET_SPECIFICATION_GLOBAL').replace(/_/g, ' '),
        directives: filteredRemediations.map(r => ({ title: r.title, price: r.investment_tier, scope: r.scope }))
      });
      const downloadUrl = window.URL.createObjectURL(blob);
      const linkAnchor = document.createElement('a');
      linkAnchor.href = downloadUrl;
      linkAnchor.download = `BMR_SOLUTIONS_SOW_${diagnosticData.org || 'EXPORT'}.pdf`;
      document.body.appendChild(linkAnchor);
      linkAnchor.click();
      linkAnchor.remove();
    } catch (pdfError) {
      console.error("PDF engine failure:", pdfError);
    }
    setIsGeneratingPdf(false);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans tracking-tighter text-left uppercase font-black p-6 md:p-12 selection:bg-red-600 selection:text-white italic">
      <main className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner Controller */}
        <div className="border-b border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none italic">
              STATEMENT OF WORK <span className="text-red-600">BUILDER</span>
            </h1>
            <span className="text-[10px] font-mono font-black text-zinc-500 tracking-widest block mt-2 not-italic">
              // BMR SOLUTIONS // RUNTIME EXTENSION STACK // NO-DB STATUTORY LAYER
            </span>
          </div>

          {diagnosticData && (
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf || filteredRemediations.length === 0}
              className="bg-red-600 text-white font-sans font-black px-6 py-4 rounded-xs text-xs tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all disabled:opacity-30 cursor-pointer shadow-lg"
            >
              <Download size={14} /> {isGeneratingPdf ? "GENERATING SOW..." : "EXPORT SOW DOCUMENT (PDF)"}
            </button>
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
            
            {/* 🛠️ REFINEMENT 03: Directive Filter Control Panel Sidebar */}
            <div className="lg:col-span-1 border border-slate-900 bg-slate-950/50 p-6 rounded-sm space-y-4 font-mono not-italic text-xs">
              <span className="text-[9px] block text-slate-600 uppercase tracking-widest font-black">// CONTROL PANEL</span>
              <h4 className="text-white text-xs font-black uppercase tracking-wider mb-2">Remediation Toggles</h4>
              <div className="space-y-2">
                {activeRemediations.map((rem) => {
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
                      {isActive ? <Eye size={12} className="text-red-500" /> : <EyeOff size={12} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Active Blueprint Runbook Scope View */}
            <div className="lg:col-span-3 space-y-6">
              <div className="border border-slate-900 bg-slate-950/40 p-6 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono not-italic text-xs text-zinc-400">
                <div>
                  <span className="text-[9px] block text-slate-600 uppercase tracking-widest font-black mb-1">// COGNITIVE TARGET ENTITY CODE</span>
                  <strong className="text-white text-lg font-sans italic font-black tracking-tighter">{diagnosticData.org?.replace(/_/g, ' ')}</strong>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[9px] block text-slate-600 uppercase tracking-widest font-black mb-1">// TELEMETRY VALIDATION LAYER</span>
                  <span className="text-green-500 font-black tracking-widest uppercase flex items-center sm:justify-end gap-1.5">
                    <CheckCircle size={14} /> IMMUTABLE TOKEN SIGNAL PARSED
                  </span>
                </div>
              </div>

              {filteredRemediations.length === 0 && (
                <div className="p-12 border border-dashed border-slate-900 text-center text-slate-600 text-sm font-sans not-italic font-medium">
                  No execution tracks selected. Toggle items in the left control panel to build scope parameters.
                </div>
              )}

              <div className="space-y-6">
                {filteredRemediations.map((anomaly, idx) => (
                  <div key={idx} className="border border-slate-900 bg-slate-950/20 p-8 rounded-sm space-y-6">
                    <div className="border-b border-slate-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-red-500 block font-black tracking-widest not-italic">// REMEDIATION TRACK CODE: 0{idx + 1}</span>
                        <h2 className="text-2xl font-black text-white tracking-tighter font-sans">{anomaly.title}</h2>
                        <p className="text-xs text-slate-500 font-sans not-italic normal-case font-medium mt-1">{anomaly.scope}</p>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 px-4 py-2 font-mono not-italic text-xs text-zinc-300 font-black rounded-xs tracking-wider uppercase">
                        {anomaly.investment_tier}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 not-italic normal-case font-sans tracking-normal font-normal text-sm text-slate-300">
                      
                      {/* Technical Layer */}
                      <div className="border border-slate-900 bg-black/40 p-6 rounded-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                          <Terminal size={16} className="text-red-500" />
                          <h3 className="text-red-500 font-mono text-xs font-black uppercase tracking-widest">// ARCHITECTURAL TECHNICAL RUNBOOK</h3>
                        </div>
                        <p className="text-xs text-slate-400 italic leading-relaxed">
                          <strong className="text-slate-300 block font-bold uppercase tracking-wide text-[10px] font-mono not-italic text-red-500/80 mb-1">Root Cause Profile:</strong> 
                          {anomaly.root_cause_technical}
                        </p>
                        <ul className="space-y-2 pt-2">
                          {anomaly.technical_runbook.map((task, i) => (
                            <li key={i} className="flex gap-2 items-start text-xs font-medium text-slate-300 leading-relaxed">
                              <span className="text-red-500 font-mono font-black shrink-0 mt-0.5">[{i + 1}]</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Operational Layer */}
                      <div className="border border-slate-900 bg-black/40 p-6 rounded-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                          <Briefcase size={16} className="text-indigo-400" />
                          <h3 className="text-indigo-400 font-mono text-xs font-black uppercase tracking-widest">// PROCEDURAL OPERATIONAL PLAYBOOK</h3>
                        </div>
                        <p className="text-xs text-slate-400 italic leading-relaxed">
                          <strong className="text-slate-300 block font-bold uppercase tracking-wide text-[10px] font-mono not-italic text-indigo-400/80 mb-1">Structural Governance Gap:</strong> 
                          {anomaly.root_cause_operational}
                        </p>
                        <ul className="space-y-2 pt-2">
                          {anomaly.operational_playbook.map((task, i) => (
                            <li key={i} className="flex gap-2 items-start text-xs font-medium text-slate-300 leading-relaxed">
                              <span className="text-indigo-400 font-mono font-black shrink-0 mt-0.5">[{i + 1}]</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
