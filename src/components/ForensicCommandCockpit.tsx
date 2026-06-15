import React, { useEffect, useState } from 'react';
import { Shield, Zap, AlertTriangle, FileText, CheckCircle, MessageSquare, ArrowLeft } from 'lucide-react';
import { InMemoryCalculatedMetrics } from '../types/forensicRuntime';

export default function ForensicCommandCockpit({ 
  companyName, 
  onReset 
}: { 
  companyName: string; 
  onReset: () => void; 
}) {
  const [metrics, setMetrics] = useState<InMemoryCalculatedMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read the compiled data matrix straight from the local browser sandbox cache
    if (typeof window !== 'undefined') {
      const cachedData = window.sessionStorage.getItem(`bmr_runtime_${companyName}`);
      if (cachedData) {
        setMetrics(JSON.parse(cachedData));
      }
      setLoading(false);
    }
  }, [companyName]);

  const renderUrgencyBadge = (igf: number, avs: number, hai: number) => {
    const maxScore = Math.max(igf, avs, hai);
    if (maxScore >= 1.4) return <span className="bg-red-600 text-white px-3 py-1 text-[10px] font-black tracking-widest animate-pulse flex items-center gap-2 rounded-sm font-mono"><AlertTriangle size={12}/> CRITICAL LIABILITY THREAT CONTAINER</span>;
    if (maxScore >= 0.8) return <span className="bg-orange-600 text-white px-3 py-1 text-[10px] font-black tracking-widest flex items-center gap-2 rounded-sm font-mono"><Zap size={12}/> SYSTEMIC STRUCTURAL DRIFT</span>;
    return <span className="bg-green-600 text-white px-3 py-1 text-[10px] font-black tracking-widest flex items-center gap-2 rounded-sm font-mono"><CheckCircle size={12}/> NOMINAL FUNCTIONAL METRIC BOUNDARY</span>;
  };

  if (loading) return <div className="font-mono text-xs text-zinc-500 bg-black p-12 text-left">POLLING RUNTIME CACHE MATRIX...</div>;
  if (!metrics) return <div className="font-mono text-xs text-red-500 bg-black p-12 text-left">CRITICAL SYSTEM FAILURE: LOCAL CACHE RECORD CODES NOT RECOVERED</div>;

  return (
    <div className="bg-black text-zinc-100 font-mono p-8 border border-zinc-900 max-w-5xl mx-auto my-12 text-left select-text rounded-sm">
      
      {/* Upper Cockpit System Header */}
      <div className="border-b border-zinc-900 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-md font-black tracking-widest text-red-500 uppercase flex items-center gap-2">
            THE LEGAL BLACK BOX // STANDALONE RISK COCKPIT
          </h1>
          <p className="text-[10px] text-zinc-500 mt-1 uppercase font-black">
            SANDBOX MATRIX INSTANCE NODE: {metrics.companyName}
          </p>
        </div>
        <div className="shrink-0">
          {renderUrgencyBadge(metrics.igfScore, metrics.avsScore, metrics.haiScore)}
        </div>
      </div>

      {/* PricingFunnel Key Performance Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-sm">
          <span className="text-[10px] text-zinc-500 block font-black tracking-widest">// COMPLIANCE SCORE</span>
          <span className={`text-4xl font-black block mt-2 ${metrics.complianceScore < 60 ? 'text-red-500' : 'text-yellow-500'}`}>
            {metrics.complianceScore}/100
          </span>
          <p className="text-[11px] font-sans text-zinc-400 mt-3 normal-case leading-relaxed font-normal">
            Weighted assessment scale tracing operational logic exposure metrics, missing audit trail records, and regulatory compliance gaps.
          </p>
        </div>

        <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-sm">
          <span className="text-[10px] text-zinc-500 block font-black tracking-widest">// REWORK TAX (AVS)</span>
          <span className="text-4xl font-black block text-red-500 mt-2">
            ${metrics.annualSalaryLeakage.toLocaleString()} <span className="text-xs text-zinc-600 font-bold">/ YR</span>
          </span>
          <p className="text-[11px] font-sans text-zinc-400 mt-3 normal-case leading-relaxed font-normal">
            Quantified overhead engineering leakage lost to fixing silent schema changes and running continuous manual data scrub operations.
          </p>
        </div>

        <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-sm">
          <span className="text-[10px] text-zinc-500 block font-black tracking-widest">// ACCUMULATED PROFIT WASTE</span>
          <span className="text-4xl font-black block text-red-400 mt-2">
            ${metrics.reworkCosts.toLocaleString()} <span className="text-xs text-zinc-600 font-bold">/ YR</span>
          </span>
          <p className="text-[11px] font-sans text-zinc-400 mt-3 normal-case leading-relaxed font-normal">
            Financial capital lost to unchecked pricing slips, untracked background workflow tasks, and human workflow workarounds.
          </p>
        </div>
      </div>

      {/* Tactical Polish: Countdown Alert Block */}
      {metrics.complianceScore < 85 && (
        <div className="border border-red-600 bg-red-950/20 p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-sm">
          <div className="not-italic">
            <span className="text-white font-black block tracking-widest text-xs uppercase">// NEXT REGULATORY AUDIT TARGET COUNTDOWN</span>
            <p className="text-xs text-zinc-300 mt-2 font-sans font-normal normal-case leading-relaxed max-w-2xl">
              Your low runtime compliance score ({metrics.complianceScore}/100) points to severe unhedged exposures. This creates a high probability of audit failure if targeted oversight checks are initiated.
            </p>
          </div>
          <div className="text-left md:text-right shrink-0 font-mono">
            <span className="text-3xl text-red-500 font-black block tracking-tight leading-none">45 DAYS</span>
            <span className="text-[9px] text-red-400 font-black block tracking-wider uppercase mt-1">REMEDIATION WINDOW</span>
          </div>
        </div>
      )}

      {/* 30-Day Actionable Trust Panel */}
      <div className="border border-zinc-900 bg-zinc-950 p-6 mb-8 rounded-sm">
        <h3 className="text-xs font-black tracking-widest text-zinc-400 mb-4 uppercase">// 30-DAY QUICK WINS (LOCALIZED RISK RELIEF PROTOCOLS)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-400 font-sans normal-case leading-relaxed font-normal">
          <div className="border-l border-zinc-800 pl-4">
            <strong className="text-zinc-200 font-mono text-[11px] uppercase tracking-wider block mb-1 font-bold">01. Harden Trace Headers</strong>
            <p>Inject immutable log validation fields directly into the transaction layer, reducing engineering data recovery latency by up to 80%.</p>
          </div>
          <div className="border-l border-zinc-800 pl-4">
            <strong className="text-zinc-200 font-mono text-[11px] uppercase tracking-wider block mb-1 font-bold">02. Encapsulate Integrations</strong>
            <p>Deploy route middleware proxies around third-party models, completely neutralizing unexpected vendor-side data contract changes.</p>
          </div>
          <div className="border-l border-zinc-800 pl-4">
            <strong className="text-zinc-200 font-mono text-[11px] uppercase tracking-wider block mb-1 font-bold">03. Automate Data Sanitization</strong>
            <p>Embed automated self-healing edge checkers at interface inputs, eliminating up to 15 hours of manual text scrubbing loops per week.</p>
          </div>
        </div>
      </div>

      {/* Conversion Actions Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 border border-zinc-900 p-6 bg-zinc-950/30 flex flex-col justify-between rounded-sm">
          <div>
            <span className="text-xs text-red-500 font-black block tracking-widest mb-4">// DETECTED UNHEDGED EXPOSURE HEADERS</span>
            <div className="space-y-2 text-xs font-sans normal-case text-zinc-300 font-normal">
              {metrics.complianceFailures.length > 0 ? (
                metrics.complianceFailures.map((fail, idx) => (
                  <div key={idx} className="border-l-2 border-red-600 bg-red-950/10 p-3 flex items-start gap-3 rounded-sm">
                    <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-500 font-mono text-[10px] font-black tracking-wider block uppercase mb-1">STATUTORY FRACTION</strong>
                      {fail}
                    </div>
                  </div>
                ))
              ) : (
                <div className="border-l-2 border-green-600 bg-green-950/10 p-3 text-zinc-400 rounded-sm">
                  No explicit legal infractions flagged under minimal constraint parameters.
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 font-mono">
            <button
              onClick={() => alert(`SIMULATION ROUTE: Compiling local browser memory metrics down into an un-gated PDF export array for client target: ${companyName}`)}
              className="bg-zinc-900 text-white border border-zinc-800 px-4 py-3 text-[11px] font-black uppercase tracking-wider rounded-sm transition-colors hover:bg-zinc-800 flex items-center gap-2 cursor-pointer"
            >
              <FileText size={13}/> Download Board-Ready Report
            </button>

            <button
              onClick={() => alert(`INTERCOM SIMULATION: Triggering active client-side web chat parameters for client code: ${companyName}`)}
              className="bg-black border border-zinc-800 text-zinc-400 px-4 py-3 text-[11px] font-black uppercase tracking-wider rounded-sm transition-colors hover:border-zinc-700 hover:text-white flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare size={13}/> Consult Active Advisor
            </button>
          </div>
        </div>

        {/* Closing Monetization Container Panel */}
        <div className="lg:col-span-5 border-2 border-red-900 bg-red-950/5 p-8 flex flex-col justify-between rounded-sm">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-black text-red-500 tracking-widest block">// CONTRACT_SOW_SHIELD_GATE</span>
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none font-mono">PRE-WIRE REMEDIATION</h3>
            <p className="text-xs font-sans font-normal text-zinc-300 normal-case leading-relaxed tracking-wide">
              Your runtime data evaluation models indicate a total strategic risk and operational exposure threshold of <strong className="text-white font-mono font-black text-xs">${metrics.unhedgedLegalExposure.toLocaleString()}</strong>.
            </p>
            <p className="text-xs font-sans font-normal text-zinc-400 normal-case leading-relaxed">
              To shield executive operations from corporate liability drift omissions, initialize your customized, high-ticket Statement of Work contract preview.
            </p>
          </div>

          <button
            onClick={() => alert(`SOW AUTOMATION: Launching interactive Statement of Work template generator filled with compiled metrics data object for: ${companyName}`)}
            className="w-full bg-red-600 text-white font-mono font-black text-xs py-4 uppercase tracking-widest mt-8 flex items-center justify-center gap-2 border border-red-500 rounded-sm hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            Generate Tier 3 SOW Blueprint
          </button>
        </div>
      </div>

      {/* Back button link to return to fresh run */}
      <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-start">
        <button 
          onClick={onReset}
          className="text-[10px] text-zinc-500 font-black tracking-widest uppercase hover:text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft size={12}/> Restart Ingestion Run
        </button>
      </div>

    </div>
  );
}
// build kick
