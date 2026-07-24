import React from 'react';

export const GovernanceSupplementView: React.FC = () => {
  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-xs p-6 font-mono text-slate-200 mt-6 not-italic">
      
      {/* Header with Strict Scope Disclaimer & Applicability Micro-Block */}
      <div className="border-b border-slate-800 pb-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-amber-400 tracking-wider">
              // GOVERNANCE & COMPLIANCE SUPPLEMENT
            </h3>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              REQUIRED OPERATIONAL PREREQUISITES (CLIENT RESPONSIBILITY)
            </p>
          </div>
          <span className="text-[10px] text-amber-400/90 bg-amber-950/40 px-2.5 py-1 rounded-xs border border-amber-800/60 font-semibold self-start sm:self-auto uppercase tracking-wider">
            NON-DELIVERABLE DIRECTIVE BOUNDARY
          </span>
        </div>

        {/* Disclaimer Paragraphs */}
        <div className="space-y-2 mt-3 text-xs text-slate-400 leading-relaxed font-sans normal-case">
          <p>
            <strong className="text-slate-300 font-mono uppercase text-[11px]">Scope Boundary Notice:</strong> BMR Solutions generates evidence-backed technical requirements and deployment gates. BMR does not configure, enforce, or attest to tenant settings; execution, tenant configuration, and administrative sign-offs remain the explicit responsibility of the Client (or Client-designated administrators).
          </p>
          <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-xs border border-slate-800/60 font-mono">
            <strong className="text-amber-400/90 uppercase">// APPLICABILITY:</strong> This supplement applies when workspace tools or autonomous agents are granted access to indexing, search, or automated ingestion/production execution pipelines.
          </p>
        </div>
      </div>

      {/* Grid Layout: Prerequisites & Proof Targets vs. Control Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* SECTION A: Sign-Off Checklist & Proof Targets */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xs p-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="text-amber-400">SECTION A</span> — REQUIRED SIGN-OFF CHECKLIST
          </h4>
          
          <div className="space-y-3.5 font-sans normal-case">
            {/* Item 1 */}
            <div className="border-b border-slate-800/50 pb-2.5">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2 font-mono uppercase">
                <span className="text-amber-400">[ ]</span> Executive Metric Alignment
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Approve single-source-of-truth metric definitions across Finance, Sales, and Operations.
              </p>
              <div className="text-[10px] text-emerald-400/90 font-mono font-medium mt-1 bg-emerald-950/30 px-2 py-0.5 rounded-xs inline-block border border-emerald-900/40 uppercase">
                Proof Target: Signed Metric Charter / Approval Record (Retain for Audit)
              </div>
            </div>

            {/* Item 2 */}
            <div className="border-b border-slate-800/50 pb-2.5">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2 font-mono uppercase">
                <span className="text-amber-400">[ ]</span> Access Entitlement Review
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Prune broad directory permissions (e.g., SharePoint/OneDrive) prior to agent indexing.
              </p>
              <div className="text-[10px] text-emerald-400/90 font-mono font-medium mt-1 bg-emerald-950/30 px-2 py-0.5 rounded-xs inline-block border border-emerald-900/40 uppercase">
                Proof Target: Permission Review Export + Before/After Scan Summary (Retain for Audit)
              </div>
            </div>

            {/* Item 3 */}
            <div>
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2 font-mono uppercase">
                <span className="text-amber-400">[ ]</span> Policy Boundary Confirmation
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Confirm rules for PII handling, prompt logging, retention, and third-party API data isolation.
              </p>
              <div className="text-[10px] text-emerald-400/90 font-mono font-medium mt-1 bg-emerald-950/30 px-2 py-0.5 rounded-xs inline-block border border-emerald-900/40 uppercase">
                Proof Target: Enabled Policy Rule Set + Tenant Configuration Export (Retain for Audit)
              </div>
            </div>
          </div>
        </div>

        {/* SECTION B: System Control Targets & Logging Baseline */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xs p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-amber-400">SECTION B</span> — SYSTEM CONTROL TARGETS
            </h4>
            
            <div className="space-y-2.5 font-sans normal-case">
              <div className="bg-slate-950/60 p-2.5 rounded-xs border border-slate-800/80">
                <div className="text-xs font-bold text-slate-200 font-mono uppercase">
                  Control Target 01: Microsoft Purview / DLP
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Configure real-time prompt-blocking for Sensitive Information Types (SITs) at runtime.
                </p>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xs border border-slate-800/80">
                <div className="text-xs font-bold text-slate-200 font-mono uppercase">
                  Control Target 02: Ingestion Contract Enforcement
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Mandate YAML schema contract validation across all active API ingestion boundaries.
                </p>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xs border border-slate-800/80">
                <div className="text-xs font-bold text-slate-200 font-mono uppercase">
                  Control Target 03: Entra ID Access Review Cadence
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Establish an automated quarterly entitlement audit cadence to prevent privilege accumulation.
                </p>
              </div>

              {/* Minimum Logging Baseline Requirement */}
              <div className="bg-slate-950/60 p-2.5 rounded-xs border border-amber-900/40">
                <div className="text-xs font-bold text-amber-400/90 font-mono uppercase">
                  Control Target 04: Minimum Logging Baseline
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Retain agent/tool access logs and policy-block event telemetry per enterprise compliance policy.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION C: Deployment Gates with Failure Behaviors */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xs space-y-3">
        <div className="text-xs font-bold text-amber-400 tracking-wider">
          // SECTION C — DEPLOYMENT GATES & FAILURE BEHAVIORS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xs border border-slate-800 flex flex-col justify-between">
            <div>
              <strong className="text-amber-400 block mb-1 uppercase">Gate 01: Access Review Passed</strong>
              <p className="text-[11px] text-slate-400 font-sans normal-case">Pre-indexing requirement.</p>
            </div>
            <p className="text-[10px] text-red-400/90 mt-2 font-mono font-medium bg-red-950/30 p-1.5 rounded-xs border border-red-900/30 uppercase leading-normal">
              Failure Behavior: If not passed, workspace indexing and agent search must be disabled.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xs border border-slate-800 flex flex-col justify-between">
            <div>
              <strong className="text-amber-400 block mb-1 uppercase">Gate 02: Contracts Verified</strong>
              <p className="text-[11px] text-slate-400 font-sans normal-case">Pre-automation requirement.</p>
            </div>
            <p className="text-[10px] text-red-400/90 mt-2 font-mono font-medium bg-red-950/30 p-1.5 rounded-xs border border-red-900/30 uppercase leading-normal">
              Failure Behavior: If not passed, live production pipeline automation must be constrained.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xs border border-slate-800 flex flex-col justify-between">
            <div>
              <strong className="text-amber-400 block mb-1 uppercase">Gate 03: Quarterly Recertification</strong>
              <p className="text-[11px] text-slate-400 font-sans normal-case">Pre-privilege scale requirement.</p>
            </div>
            <p className="text-[10px] text-red-400/90 mt-2 font-mono font-medium bg-red-950/30 p-1.5 rounded-xs border border-red-900/30 uppercase leading-normal">
              Failure Behavior: If not passed, agent privilege scaling and access expansion must halt.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
