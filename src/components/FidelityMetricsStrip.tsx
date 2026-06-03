import React, { useEffect, useState } from 'react';
import { MetricState } from '../types/bmr';
import { AlertTriangle, Download, ShieldAlert } from 'lucide-react';

interface ComponentProps {
  auditId: string;
}

declare global {
  interface Window {
    Intercom?: (command: string, arg1?: string, arg2?: string) => void;
  }
}

export const FidelityMetricsStrip: React.FC<ComponentProps> = ({ auditId }) => {
  const [metrics, setMetrics] = useState<MetricState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function reconcileModuleState() {
      try {
        const res = await fetch(`/api/calculate-fidelity?auditId=${auditId}`);
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error("Multi-pillar sub-module state sync broken:", err);
      } finally {
        setLoading(false);
      }
    }
    reconcileModuleState();
  }, [auditId]);

  if (loading) {
    return <div className="font-mono text-zinc-600 text-xs tracking-widest animate-pulse py-4">// POLLING COMPREHENSIVE SUB-SURFACE METRICS...</div>;
  }
  if (!metrics) {
    return <div className="font-mono text-zinc-600 text-xs py-4">// UNABLE TO RECONCILE CURRENT CONFIGURATION ROW KEY</div>;
  }

  const currentPillar = metrics.target_pillar || 'HAI';
  const daysRemaining = Math.ceil((new Date(metrics.audit_deadline_iso || '').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) || 45;
  const varianceGap = metrics.asymmetric_variance_gap ?? Math.max(0, 100 - metrics.compliance_score);

  const pillarConfigurations: Record<'HAI' | 'AVS' | 'IGF', { title: string; color: string; label: string; msg: string; wins: string[]; chat: string }> = {
    HAI: {
      title: "THE COGNITIVE FIDELITY AUDIT [HAI-P1]", color: "text-red-500", label: "// HUMAN TRUST BOUNDARY MATRIX:",
      msg: metrics.friction_score >= 1.2 ? "CRITICAL AUTOMATION BIAS // Boardroom automation policies are disconnected from engineering realities. Alert telemetry floor saturation triggers complete user bypass." : "NOMINAL VERIFICATION // Human supervision loops are calibrated cleanly across execution nodes.",
      wins: ["Configure Telemetry Filtering (HAI-TSF-17) -> Drops alert data noise profiles by 60% to recover team focus limits.", "Harden Boundary Intercepts (HAI-DET-16) -> Automatically routes workflow logical drifts to isolated staging containers."],
      chat: `URGENT HAI DRIFT // Client ID: ${auditId} // System exhibits critical Automation Bias configuration failures.`
    },
    AVS: {
      title: "VALUE LEAKAGE DIAGNOSTIC [AVS-P2]", color: "text-orange-500", label: "// REWORK TAX LIQUIDITY TRACKER:",
      msg: metrics.friction_score >= 1.2 ? "CRITICAL VALUE STRAIN // Ground-level system operators are actively bypassing automated interfaces using private, undocumented shadow spreadsheets to maintain processing speeds." : "OPTIMIZED FLOWS // Code execution matching vectors hit design target values with zero runtime rework leakage.",
      wins: ["Deploy Polymorphic Ingest Schema Shields (AVS-PVI-16) -> Stops database validation string corruption anomalies.", "Enforce Idempotency Route Handlers (AVS-IDS-17) -> Eradicates double-commit ledger balance calculation skews."],
      chat: `URGENT AVS WASTE // Client ID: ${auditId} // Data validation friction thresholds have breached operational caps.`
    },
    IGF: {
      title: "THE LEGAL BLACK BOX [IGF-P3]", color: "text-purple-500", label: "// SOVEREIGN RISK DRIFT OVERVIEW:",
      msg: metrics.friction_score >= 1.2 ? "GDPR COMPLIANCE INFRACTION // System choices lack append-only trace log permanence. Local configuration parameters dissolve instantly on thread execution, triggering unhedged enforcement risks." : "DEFENSIBLE RECORD PROVENANCE // Audit traces write to immutable Write-Once-Read-Many backend blocks.",
      wins: ["Isolate WORM Storage Subsystems (IGF-WORM-16) -> Blocks internal user role access history alteration possibilities.", "Compile Versioned Parameter Trees (IGF-VPT-19) -> Implements declarative Git-Ops history metrics across cloud engines."],
      chat: `URGENT IGF LANDMINE // Client ID: ${auditId} // Automated decision parameters lack immutable log tracking keys.`
    }
  };

  const config = pillarConfigurations[currentPillar];
  const totalExposureTax = metrics.annual_salary_leakage + metrics.rework_costs + metrics.unhedged_legal_exposure;

  return (
    <div className="border border-zinc-800 bg-zinc-950 p-6 font-mono text-zinc-100 my-4 w-full select-text">
      
      {/* 🛠️ REGULATORY DEADLINE COUNTDOWN HARDENED VALUE STRIP */}
      <div className="mb-4 bg-red-950/20 border border-red-900/60 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-red-500 animate-pulse shrink-0" size={18} />
          <div>
            <span className="text-[10px] text-red-400 block font-bold">SYSTEMIC RISK LIQUIDATION PROTOCOL ACTIVE</span>
            <p className="text-xs text-zinc-300 font-sans normal-case">
              Pre-enforcement window closes in <strong className="text-red-500 font-mono text-sm">{daysRemaining} days</strong>. Unmitigated liability accumulation equals <strong className="text-zinc-100 font-mono">${(totalExposureTax / 365).toFixed(2)}/day</strong>.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => window.open(`/intel/emergency-stabilization?client_id=${auditId}&pillar=${currentPillar}`, '_blank')}
          className="bg-red-600 hover:bg-white hover:text-red-600 text-white font-bold text-[10px] px-4 py-2 tracking-widest transition-all cursor-pointer border border-red-600 shrink-0"
        >
          DEPLOY EMERGENCY STABILIZATION PACKAGE
        </button>
      </div>

      <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4">
        <div>
          <span className="text-[10px] text-zinc-500 block">4-NODE TRIANGULATION SENSOR MATRIX // ZERO-DATA AUDITING ARCHITECTURE</span>
          <h4 className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>{config.title}</h4>
        </div>
        <span className={`text-xs px-2 py-0.5 font-bold tracking-widest ${varianceGap >= 40 ? "bg-red-600 text-white animate-pulse" : "bg-zinc-800 text-zinc-400"}`}>
          {varianceGap >= 40 ? "CRITICAL ASYMMETRIC VARIANCE" : "NOMINAL PARITY PROFILE"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="border border-zinc-900 bg-black/40 p-3">
          <span className="text-[10px] text-zinc-500 block">// COMPLIANCE SCORE</span>
          <span className={`text-xl font-bold ${metrics.compliance_score < 70 ? "text-red-500" : "text-yellow-500"}`}>{metrics.compliance_score.toFixed(0)}/100</span>
        </div>
        <div className="border border-zinc-900 bg-black/40 p-3">
          <span className="text-[10px] text-zinc-500 block">// ASYMMETRIC VARIANCE GAP (V_gap)</span>
          <span className="text-xl font-bold text-red-400">{varianceGap.toFixed(0)}% DELTA</span>
        </div>
        <div className="border border-zinc-900 bg-black/40 p-3">
          <span className="text-[10px] text-zinc-500 block">// DERIVED WORKFORCE MANUAL LABOR TAX</span>
          <span className="text-xl font-bold text-zinc-200">${metrics.rework_costs.toLocaleString()} / YR</span>
        </div>
        <div className="border border-zinc-900 bg-black/40 p-3">
          <span className="text-[10px] text-zinc-500 block">// TOTAL FINANCIAL EXPOSURE TAX</span>
          <span className="text-xl font-bold text-red-500">${totalExposureTax.toLocaleString()}</span>
        </div>
      </div>

      <div className="border border-zinc-900 bg-black/20 p-3 mb-4 text-xs">
        <span className="text-zinc-400 block font-bold mb-1">// SYSTEMIC BEHAVIORAL DECOUPLING VERDICT:</span>
        <p className="text-zinc-300 leading-relaxed normal-case font-sans">{config.msg}</p>
      </div>

      <div className="border border-zinc-900 bg-black/40 p-4 mb-4 text-xs">
        <span className="text-zinc-500 font-bold block mb-2">// TRIANGULATED REMEDIATION PRIORITY WAVES:</span>
        <div className="space-y-1.5">
          {config.wins.map((w, i) => (
            <div key={i} className="text-zinc-400 flex items-start"><span className="text-green-500 mr-2">[!]</span><p className="normal-case font-sans">{w}</p></div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between mt-4 pt-4 border-t border-zinc-900">
        <div>
          <span className="text-[11px] text-zinc-400 font-bold block uppercase tracking-wider">EXECUTIVE DECISION SUPPORT PIPELINE</span>
          <span className="text-[10px] text-zinc-500 block">Synthesize raw operational telemetry into boardroom risk mitigation assets.</span>
        </div>
        
        {/* 🛠️ BOARD-READY STRATEGIC REPORT EXPORT ACTIONS */}
        <div className="flex flex-wrap gap-3">
          <button 
            type="button"
            onClick={() => window.open(`/api/generate-board-brief?id=${auditId}&pillar=${currentPillar}`, "_blank")}
            className="bg-white hover:bg-red-600 hover:text-white text-black font-bold text-[10px] px-4 py-2.5 tracking-widest transition-all cursor-pointer flex items-center gap-2 border border-white"
          >
            <Download size={14} />
            <span>EXPORT BOARD-READY BRIEF (PDF)</span>
          </button>
          
          {metrics.compliance_score < 80 && (
            <button 
              type="button"
              onClick={() => window.open(`/intel/sow-preview?client_id=${auditId}&pillar=${metrics.target_pillar}`, '_blank')}
              className="bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-bold text-[10px] px-4 py-2.5 tracking-widest transition-colors cursor-pointer flex items-center gap-2"
            >
              <ShieldAlert size={14} className="text-orange-500" />
              <span>GENERATE COMPOSABLE SOW PREVIEW</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
