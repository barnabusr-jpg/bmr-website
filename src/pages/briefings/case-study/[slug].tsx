"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldAlert, Activity, ArrowLeft, X, ExternalLink, Scale } from "lucide-react";

// 🛡️ RECONFIGURED 2026 ARCHIVE STORAGE
const ARCHIVE_CONTENT: Record<string, any> = {
  "fiduciary-regret": {
    title: "FIDUCIARY REGRET INDEX",
    node: "EXECUTIVE",
    impact: "55% RETRACT RATE",
    analysis: "A macroeconomic reversal surfaces as corporate executives report severe operational regret following aggressive automation downsizing.",
    ref: "ARCHIVE_REF_B01 // STATUS: IMMUTABLE",
    citation: "Recruiting News Network Research Summary. (2026).",
    dossierBody: [
      "INCIDENT: Corporate boards miscalculated automation licenses as a clean direct substitute for senior human capital.",
      "FRACTURE: Cutting specialized personnel permanently stripped out unwritten corporate memory and client relation context.",
      "RECOVERY: Nearly one third of these companies have been forced into expensive restaffing loops to recover lost expertise."
    ]
  },
  "system-overestimation": {
    title: "SYSTEM OVERESTIMATION GAP",
    node: "EXECUTIVE",
    impact: "REHIRE RESURGENCE",
    analysis: "Major technology providers reverse automated position replacements to stem severe pipeline outage vulnerabilities and workflow blindness.",
    ref: "ARCHIVE_REF_B02 // STATUS: IMMUTABLE",
    citation: "Business Insider Corporate Reports. (2026).",
    dossierBody: [
      "INCIDENT: Executive leadership executed sweeping workforce purges under the assumption that automation could independently execute complex data workflows.",
      "FRACTURE: Platforms hit a wall when unmanaged model hallucinations and nonconforming data payloads threatened platform stability.",
      "RECOVERY: Global technology employers rapidly scaled up human technical and client facing engineering teams to humanize operations."
    ]
  },
  "ford-gray-beard": {
    title: "FORD GRAY_BEARD COLLAPSE",
    node: "TECHNICAL",
    impact: "350 FTE BOOMERANG",
    analysis: "Ford Motor Company executes an emergency intake of three hundred fifty veteran engineers after automated design and quality pipelines short circuit.",
    ref: "ARCHIVE_REF_B03 // STATUS: IMMUTABLE",
    citation: "Business Insider and Forbes Industrial Analysis. (2026).",
    dossierBody: [
      "INCIDENT: Automated tools failed to independently predict failure points where mechanical, electrical, and software systems interact.",
      "FRACTURE: Experienced personnel departed before transferring decades of institutional context into training data pipelines.",
      "RECOVERY: Emergency influx of three hundred fifty veteran technical specialists deployed to rebuild data schemas and stabilize lines."
    ]
  },
  "drive-thru-drift": {
    title: "DRIVE_THRU DRIFT FAILURE",
    node: "TECHNICAL",
    impact: "SYSTEM SHUTDOWN",
    analysis: "McDonalds terminates a massive automated ordering deployment after unvalidated voice inputs corrupt downstream transmission databases.",
    ref: "ARCHIVE_REF_B04 // STATUS: IMMUTABLE",
    citation: "Tech Media Enterprise Disruption Logs. (2026).",
    dossierBody: [
      "INCIDENT: Enterprise exposed a voice processing model directly to raw unstructured public inputs without intermediate abstraction layering.",
      "FRACTURE: Lacking strict data schema constraints and boundary checking, the system suffered processing failures and added unauthorized items to orders.",
      "RECOVERY: The pilot was entirely shut down and human cashiers were brought back to secure the data gates."
    ]
  },
  "klarna-hybrid-shift": {
    title: "KLARNA HYBRID_SHIFT CALIBRATION",
    node: "MANAGERIAL",
    impact: "60/40 SPLIT SHIFT",
    analysis: "Klarna restores human recruiting and customer service protocols after automated chat assistants cripple user retention on edge case disputes.",
    ref: "ARCHIVE_REF_B05 // STATUS: IMMUTABLE",
    citation: "Toms Guide and LinkedIn Corporate Communications. (2026).",
    dossierBody: [
      "INCIDENT: Automated assistant effectively optimized highly predictable rule rich inputs but completely fractured when hitting complex interactions.",
      "FRACTURE: Middle management mistook routine automation for complete domain expertise, causing customer experience to suffer severely.",
      "RECOVERY: Transitioned to a human supervised hybrid structure to handle complex financial disputes requiring human judgment."
    ]
  },
  "bot-error-cascade": {
    title: "BOT ERROR_CASCADE INCIDENT",
    node: "MANAGERIAL",
    impact: "BANK WORKLOAD SPIKE",
    analysis: "Commonwealth Bank of Australia rescinds redundancies after an automated voice assistant spikes repeat call queue workloads.",
    ref: "ARCHIVE_REF_B06 // STATUS: IMMUTABLE",
    citation: "The Times of India Operations Desk. (2026).",
    dossierBody: [
      "INCIDENT: Management assumed a voice bot interface could replace human support lines seamlessly to reduce operational expenses.",
      "FRACTURE: System was entirely unequipped to resolve complex queries involving multivariable regulatory compliance and client history.",
      "RECOVERY: Inability to handle edge cases created an immediate processing bottleneck, forcing the bank to rescind staff redundancies."
    ]
  }
};

export default function CaseAutopsy() {
  const router = useRouter();
  const { slug } = router.query;
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<any>(null);
  const [showDossier, setShowDossier] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && router.isReady && slug) {
      const data = ARCHIVE_CONTENT[slug as string];
      if (data) { 
        setActive(data); 
      } else { 
        console.error(`FORENSIC_DATA_MISSING: Could not find case data for slug: ${slug}`);
      }
    }
  }, [mounted, router.isReady, slug]);

  if (!mounted || !active) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-6">
      <Activity className="animate-spin text-red-600" size={48} />
      <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
        Synchronizing_Dossier_Vault...
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 overflow-x-hidden uppercase font-black">
      <Header />
      <main className="pt-44 pb-24 px-6 max-w-7xl mx-auto text-left relative">
        <button onClick={() => router.push('/briefings')} className="flex items-center gap-3 text-slate-600 hover:text-white transition-all font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-16 italic">
          <ArrowLeft size={14} /> BACK_TO_THE_VAULT
        </button>

        <div className="border-l-8 border-red-600 pl-10 mb-20 max-w-5xl">
          <span className="text-red-600 font-mono text-[11px] font-black uppercase tracking-[0.4em]">IDENTIFIED_NODE: {active.node}</span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mt-4 italic">{active.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div className="bg-white p-10 md:p-14 text-slate-950 shadow-2xl border-l-[12px] border-red-600 flex-grow">
              <div className="flex items-center gap-3 text-red-600 font-mono text-[10px] font-black uppercase tracking-widest mb-8 italic"><ShieldAlert size={18} /> FORENSIC_AUTOPSY_REPORT</div>
              <p className="text-xl md:text-3xl font-black uppercase italic leading-tight mb-12">{active.analysis}</p>
              <button onClick={() => setShowDossier(true)} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-red-600 border-b-2 border-red-600 pb-1 hover:text-black hover:border-black transition-all italic underline-offset-4 font-black">VIEW_DOSSIER // DEEP_DIVE <ExternalLink size={12} /></button>
            </div>
            
            {/* 🛡️ SYSTEM DATA BASELINE EVALUATION */}
            <div className="bg-slate-900/50 border border-slate-800 p-10 md:p-14 shadow-2xl flex flex-col gap-8">
              <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] font-black uppercase tracking-widest italic">
                <Scale size={18} /> THE_BMR_LOGIC_BASELINE
              </div>
              <div className="space-y-6">
                <h4 className="text-2xl font-black text-white italic tracking-tight uppercase">
                  METHODOLOGY: {active.node === 'EXECUTIVE' ? 'FIDUCIARY_DISPLACEMENT' : active.node === 'TECHNICAL' ? 'INGESTION_BLINDNESS' : 'PROCESS_STRAIN'}
                </h4>
                
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-black normal-case italic">
                  {active.node === 'EXECUTIVE' && (
                    "This autopsy utilizes the BMR Forensic Framework to map the distance between short term corporate downsizing targets and long term operational resilience. Corporate boards miscalculated automation licenses as a clean direct substitute for senior human capital."
                  )}
                  {active.node === 'TECHNICAL' && (
                    "Analysis focuses on data lineage degradation and the failure of ingestion abstraction protocols within automated environments. We identify fractures where architectural optimism overrides documented validation schemas."
                  )}
                  {active.node === 'MANAGERIAL' && (
                    "Evaluation identifies the collapse of human supervision gates. We isolate failure patterns within exception handling and tribal knowledge layers to prevent operational bottlenecks before manifestation."
                  )}
                </p>
                
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-black normal-case italic">
                  Standard cybersecurity identifies bugs. BMR identifies <span className="text-red-600 font-black uppercase">Fractures</span>. We execute deep layer audits to verify alignment between operational reality and technical architecture.
                </p>
              </div>
            </div>

            <button 
              onClick={() => router.push('/pulse-check')} 
              className="w-full bg-red-600 text-white py-8 font-black uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all shadow-2xl italic text-xl border-2 border-red-600"
            >
              EXECUTE_STRATEGY
            </button>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-8 h-full min-h-full">
            <div className="bg-slate-950 border border-slate-900 p-8 md:p-10 shadow-2xl flex flex-col justify-center min-h-[450px] flex-grow">
              <div className="flex items-center gap-3 text-red-600 mb-8">
                <Activity size={16} className="animate-pulse" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic tracking-[0.3em]">IMPACT_METRIC</span>
              </div>
              <div className="text-red-600 font-black text-[clamp(1.5rem,3.5vw,2.5rem)] uppercase italic leading-[1.1] tracking-tighter break-words underline decoration-4 underline-offset-[10px]">
                {active.impact}
              </div>
            </div>
          </aside>
        </div>

        {showDossier && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 italic">
            <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-sm" onClick={() => setShowDossier(false)} />
            <div className="bg-white text-slate-950 max-w-2xl w-full p-12 shadow-2xl relative z-10 border-t-[16px] border-red-600 italic">
              <button onClick={() => setShowDossier(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-600 transition-colors"><X size={24} /></button>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-10 italic leading-none">PRIMARY_EVIDENCE_LOG</h3>
              <div className="space-y-6">
                {active.dossierBody.map((paragraph: string, i: number) => (
                  <p key={i} className="text-base font-black leading-relaxed uppercase italic text-slate-800 border-l-2 border-slate-200 pl-6">{paragraph}</p>
                ))}
              </div>
              <div className="mt-12 pt-6 border-t border-slate-100 font-mono text-[9px] text-slate-400 uppercase tracking-widest font-black leading-tight italic">CITED_MATERIAL: {active.citation}</div>
              <button onClick={() => setShowDossier(false)} className="mt-8 w-full bg-slate-950 text-white py-4 font-black uppercase tracking-widest text-[11px] hover:bg-red-600 transition-all shadow-xl italic font-black">CLOSE_DOSSIER</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
