"use client";
import React, { useMemo } from 'react';
import { SectorType } from '@/lib/supabaseAdapter';
import { Activity, AlertTriangle, Copy, Check, FileText } from 'lucide-react';
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
    label: "COMPLIANCE & LEGAL REGIME (IGF)",
    badge: "COMPLIANCE_IGF",
    taxTitle: "REGULATORY COMPLIANCE FRICTION OVERHEAD",
    standards: [
      { title: "PCI-DSS v4.0 // Requirement 10.2", desc: "Telemetry signal saturation and delayed processing times break real-time automated audit log generation loops for critical cardholder data environments." },
      { title: "Sarbanes-Oxley (SOX) // Section 404", desc: "Undocumented schema alterations in transactional messaging queues create high-severity unmapped risk vectors in internal financial reporting controls." }
    ],
    riskDossier: {
      title: "UNSANCTIONED INTEGRATION POSITION EXPOSURE",
      desc: "Proprietary procedural logs and workflow operations parameters are leaking through public endpoints to generate text optimizations, breaking explicit vertical data handling provisions."
    }
  },
  AVS: {
    label: "TECHNICAL DEBT & REWORK TAX REGIME (AVS)",
    badge: "TECH_DEBT_AVS",
    taxTitle: "ANNUAL SYSTEM REWORK OVERHEAD TAX",
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
    label: "AUTOMATION BIAS & FATIGUE REGIME (HAI)",
    badge: "AUTOMATION_HAI",
    taxTitle: "COGNITIVE FRICTION OPERATIONS DRIFT",
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

  // 📡 DYNAMIC TRIANGULATION SPECTRUM DETECTOR
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

  // 🛰️ DETERMINISTIC TELEMETRY ANCHOR LOOP
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

  // ⏱️ Enforces 24-Hour Expiration Inside the Compressed Generator URL Hook 
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
    <div className="bg-[#020617] text-slate-200 font-sans tracking-tighter text-left italic uppercase font-black overflow-x-hidden p-10 max-w-[1600px] mx-auto pb-32">
      
      {/* HEADER TELEMETRY READOUT */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-black p-6 border border-slate-900 mb-6 no-print gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex items-center gap-3 shrink-0">
            <Activity className="text-red-600 animate-pulse" size={20} />
            <span className="text-white font-black uppercase italic tracking-[0.1em] text-sm font-mono">
              COMBINED COGNITIVE TRIANGULATION REGIME MATRIX:
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {detectedPillars.map((p: string) => (
              <span key={p} className="bg-red-950/40 border border-red-800 text-red-500 font-mono text-[11px] px-3 py-1 rounded-xs tracking-normal">
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
            className="bg-red-600 text-white text-[10px] font-black px-6 py-2.5 uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer font-mono shrink-0 leading-none inline-flex items-center gap-2 decoration-0"
          >
            <FileText size={12} /> OPEN SOW TERMINAL
          </a>
          <button
            type="button"
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="bg-zinc-800 text-white border border-slate-700 text-[10px] font-black px-6 py-2.5 uppercase tracking-widest hover:bg-slate-700 transition-all cursor-pointer font-mono shrink-0 leading-none"
          >
            PRINT DOSSIER
          </button>
        </div>
      </div>

      {/* SUMMARY INDEX DISPLAY MODULES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 italic no-print">
        <div className="bg-slate-950/60 border border-slate-800 p-6 flex flex-col justify-between min-h-[110px] relative transition-all hover:bg-slate-950">
          <span className="text-[9px] font-mono text-slate-500 font-black tracking-widest uppercase block">// INTEGRITY COMPLIANCE INDEX</span>
          <div className="text-4xl font-black italic tracking-tighter mt-4 leading-none text-white font-sans">
            {metrics.complianceScore.toFixed(0)}/100
          </div>
        </div>

        <div className="bg-slate-950/60 border border-yellow-600/30 p-6 flex flex-col justify-between min-h-[110px] relative transition-all hover:bg-slate-950">
          <span className="text-[9px] font-mono text-yellow-500 font-black tracking-widest uppercase block">// AGGREGATED SYSTEM REWORK OVERHEAD TAX</span>
          <div className="text-4xl font-black italic tracking-tighter mt-4 leading-none text-yellow-500 font-sans">
            ${metrics.annualSalaryLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="bg-slate-950/60 border border-red-600/30 p-6 flex flex-col justify-between min-h-[110px] relative transition-all hover:bg-slate-950">
          <span className="text-[9px] font-mono text-red-500 font-black tracking-widest uppercase block">// UNHEDGED FORENSIC INACTION LIABILITY</span>
          <div className="text-4xl font-black italic tracking-tighter mt-4 leading-none text-red-500 font-sans">
            ${metrics.unhedgedLegalExposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      {/* CORE SPECIFICATION VIEW SHEET */}
      <div className="bg-white text-black p-10 border-l-[16px] border-slate-900 shadow-2xl space-y-6 mb-10 font-sans">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-100 pb-4 gap-2">
          <div className="not-italic">
            <span className="text-xs font-mono tracking-widest text-red-600 font-black uppercase">// ENGAGEMENT_ROADMAP_CONFIGURATION</span>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter text-black leading-none mt-1">
              TARGET STRATEGIC VERDICT DOSSIER: {companyName}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-black tracking-wider uppercase">
            {metrics.isTierThreeExposure ? 'TIER_03 // LOGIC RECONSTRUCTION' : 'TIER_01 // DRIFT DIAGNOSTICS'}
          </span>
        </div>

        <div className="space-y-6 text-sm text-slate-800 leading-relaxed font-sans font-medium normal-case">
          <div>
            <h4 className="font-mono text-xs font-black text-slate-400 uppercase tracking-widest mb-2 italic">// SECTION 01: EXECUTIVE ANALYSIS SUMMARY</h4>
            <p>
              Cross-persona triangulation logs identify stacked risk vectors and unmapped operational vulnerabilities across core development pipelines for <strong>{companyName}</strong>. At existing workforce resource parameters, this systemic friction generates an aggregated annual loss run-rate calculated at <strong>${metrics.annualSalaryLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>, requiring structural remediation actions.
            </p>

            {/* IP Leakage Formula Block Completely Erased From This Section Thread */}

            <div className="my-8 border-t border-b border-slate-200 py-6 not-italic normal-case font-medium">
              <span className="text-[10px] font-mono font-black tracking-widest text-slate-400 block mb-4 uppercase">// IDENTIFIED LOGIC FRACTURES INVENTORY ({detectedPillars.length})</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detectedPillars.map((p: string) => (
                  <div key={p} className="border border-slate-200 bg-slate-50/70 p-5 rounded-sm space-y-2">
                    <span className="text-[9px] font-mono text-red-600 font-black tracking-widest block">// EXPOSURE LAYER: {PILLAR_REGISTRIES[p]?.badge}</span>
                    <h5 className="font-sans text-sm font-black text-slate-950 uppercase italic">{PILLAR_REGISTRIES[p]?.riskDossier.title}</h5>
                    <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal">{PILLAR_REGISTRIES[p]?.riskDossier.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {metrics.regulatoryAlertActive && (
              <div className="mt-4 border-2 border-red-600/30 bg-red-50 p-6 flex flex-col space-y-2 text-left italic uppercase font-black tracking-tighter">
                <span className="text-[10px] font-mono font-black text-red-600 tracking-widest block">// SECURE_BRIEFING_ALIGNMENT_ALERT</span>
                <div className="text-2xl text-red-600 flex items-center gap-2">
                  <AlertTriangle size={24} className="animate-pulse" /> SYSTEMIC ASYMMETRIC OVERHEAD GAP ENCOUNTERED
                </div>
                <p className="text-xs leading-relaxed font-sans text-slate-700 normal-case font-normal border-l-2 border-red-600 pl-4 py-1 not-italic">
                  Local system configurations trigger out-of-bounds metrics. Projections trace an unhedged operational and regulatory fine vulnerability of up to <strong>${metrics.unhedgedLegalExposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> if pipelines are left unmodified.
                </p>
              </div>
            )}
          </div>

          {(aiTelemetryMetrics.showsShadowAiRisk || aiTelemetryMetrics.showsBlackBoxRisk) && (
            <div className="my-10 border-t-2 border-slate-900 pt-6 not-italic normal-case font-medium">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-black uppercase tracking-widest italic mb-4">
                <AlertTriangle size={16} className="animate-pulse" /> 
                <span>// TRIANGULATION WARNING: COGNITIVE FRICTION ENCOUNTERED</span>
              </div>
              <div className="text-xs bg-red-950/5 border border-red-900/30 p-4 text-slate-700 font-normal">
                Operational data streams indicate users are passing structural tracking contexts into unsecured machine-learning analytics nodes lacking historical trace parameters.
              </div>
            </div>
          )}

          <hr className="border-slate-100" />

          <div className="bg-slate-50 border border-slate-200 p-6 my-6 font-mono text-xs text-slate-700 not-italic normal-case font-medium">
            <div className="text-[10px] text-black font-black tracking-widest uppercase mb-3">// ARCHITECTURAL CODES & REGULATORY STANDARDS PARITY LOOKUP</div>
            <ul className="space-y-4 list-none p-0 m-0 text-[11px]">
              {detectedPillars.flatMap((p: string) => PILLAR_REGISTRIES[p]?.standards || []).map((std, idx: number) => (
                <li key={idx} className="flex items-start gap-2 border-b border-slate-200/50 pb-2 last:border-0 last:pb-0">
                  <span className="text-red-600 font-bold shrink-0">[NON-COMPLIANT]</span>
                  <div>
                    <strong className="text-black">{std.title}:</strong> {std.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h4 className="font-mono text-xs font-black text-slate-400 uppercase tracking-widest mb-3 italic">// SECTION 02: REMEDIATION ROADMAP PROGRESSION</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 italic font-black">
              <div className="flex flex-col justify-between border border-slate-100 bg-slate-50/60 p-5 space-y-3 relative rounded-xs">
                <div className="space-y-1 not-italic font-sans">
                  <div className="flex justify-between items-center font-mono text-[9px] text-slate-400 font-black uppercase italic">
                    <span>PHASE 01</span>
                    <span className="text-red-600 font-black uppercase">CORE RECONSTRUCTION</span>
                  </div>
                  <h5 className="text-sm font-black italic uppercase tracking-tight text-slate-900 font-sans">Pipeline Abstraction Layering</h5>
                  <p className="text-[11px] leading-relaxed text-slate-500 font-medium normal-case">Deploying decoupled adapter patterns to fully insulate backend transactional structures from system drift.</p>
                </div>
                <div className="font-mono text-xl font-black text-slate-200/60 absolute bottom-1 right-2 select-none">01</div>
              </div>
              <div className="flex flex-col justify-between border border-slate-100 bg-slate-50/60 p-5 space-y-3 relative rounded-xs">
                <div className="space-y-1 not-italic font-sans">
                  <div className="flex justify-between items-center font-mono text-[9px] text-slate-400 font-black uppercase italic">
                    <span>PHASE 02</span>
                    <span className="text-amber-600 font-black uppercase">GOVERNANCE INDEX</span>
                  </div>
                  <h5 className="text-sm font-black italic uppercase tracking-tight text-slate-900 font-sans">Telemetry Filter Prioritization</h5>
                  <p className="text-[11px] leading-relaxed text-slate-500 font-medium normal-case">Structuring central monitoring parameters across networks to eliminate background noise and alert fatigue thresholds.</p>
                </div>
                <div className="font-mono text-xl font-black text-slate-200/60 absolute bottom-1 right-2 select-none">02</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* STATELESS SHARE CARD TERMINAL */}
      <div className="bg-slate-950/40 border border-slate-900 p-8 space-y-4 no-print">
        <div>
          <span className="text-[9px] font-mono text-red-500 block font-black tracking-widest">// IMMUTABLE STATELESS SOW GENERATOR INDEX TOKEN</span>
          <h4 className="text-xl font-black uppercase tracking-tight text-white mt-0.5">PERMANENT DEPLOYABLE BLUEPRINT INTERFACE</h4>
          <p className="text-xs font-sans text-slate-400 font-normal normal-case not-italic mt-1 leading-relaxed">
            This engine processes configurations completely database-free. Copy this encrypted URL token to load the interactive SOW Generator workbench containing your exact alignment data at any moment.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch gap-2 font-mono not-italic text-xs">
          <input
            type="text"
            value={generatorLink}
            readOnly
            onClick={(e) => (e.target as HTMLInputElement).select()}
            className="flex-1 bg-black border border-slate-800 p-3 text-slate-300 font-mono text-[11px] focus:outline-none focus:border-slate-600 truncate selection:bg-red-950 selection:text-red-400"
          />
          <button
            type="button"
            onClick={handleCopy}
            className={`px-6 py-3 font-sans font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer text-white ${
              copied ? 'bg-green-600' : 'bg-red-600 hover:bg-red-500'
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'COPIED' : 'COPY SOW BLUEPRINT LINK'}
          </button>
        </div>
      </div>

    </div>
  );
}
