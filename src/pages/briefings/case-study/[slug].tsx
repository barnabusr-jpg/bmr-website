"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldAlert, Activity, ArrowLeft, FileText, X, ExternalLink, Scale } from "lucide-react";

const ARCHIVE_CONTENT: Record<string, any> = {
  "chatbot-liability": {
    title: "THE AIR CANADA PRECEDENT",
    node: "EXECUTIVE",
    impact: "$812.00 CAD + COSTS",
    analysis: "A landmark legal ruling confirmed corporate liability for the 'hallucinations' of autonomous agents.",
    ref: "ARCHIVE_REF_B01 // STATUS: IMMUTABLE",
    citation: "Civil Resolution Tribunal. (2024). Moffatt v. Air Canada (2024 BCCRT 149).",
    dossierBody: [
      "INCIDENT: Chatbot provided invented refund policy for bereavement travel.", 
      "VERDICT: Air Canada ordered to pay $812.00 CAD plus court fees.", 
      "DEFENSE: Company claimed chatbot was a 'separate legal entity'.", 
      "IMPLICATION: AI outputs are binding contractual representations for the parent corporation."
    ]
  },
  "fiduciary-gate-failure": {
    title: "UNITEDHEALTH ALGO_BIAS",
    node: "EXECUTIVE",
    impact: "$1.5B CLASS ACTION",
    analysis: "A federal suit alleges AI was used to override clinical judgment, creating a catastrophic Fiduciary Gate failure.",
    ref: "ARCHIVE_REF_B02 // STATUS: IMMUTABLE",
    citation: "U.S. District Court. (2024). Estate of Lokken v. UnitedHealth Group.",
    dossierBody: [
      "INCIDENT: AI tool 'nH Predict' used to deny Medicare Advantage claims.", 
      "FRACTURE: Algorithm override of clinical physician recommendations.", 
      "VERDICT: AI logs ruled discoverable, stripping 'Black Box' corporate defense."
    ]
  },
  "salesforce-failure": {
    title: "FORCEDLEAK AGENT BYPASS",
    node: "TECHNICAL",
    impact: "CVSS 9.4 CRITICAL",
    analysis: "Investigating the ForcedLeak vulnerability where malicious instructions hijacked internal AI agents.",
    ref: "ARCHIVE_REF_B03 // STATUS: IMMUTABLE",
    citation: "Noma Security. (2025). ForcedLeak: Prompt injection in Agentforce.",
    dossierBody: [
      "VULNERABILITY: Web-to-Lead logic hijacked via jailbreak commands.", 
      "MECHANISM: Malicious input forced agents to exfiltrate CRM data.", 
      "VERDICT: Requirement for character-level Zero-Trust logic hardening."
    ]
  },
  "echoleak-vulnerability": {
    title: "ECHOLEAK ZERO-CLICK",
    node: "TECHNICAL",
    impact: "CVSS 9.3 RISK",
    analysis: "A 'Zero-Click' exploit where a single email hijacked an enterprise AI agent.",
    ref: "ARCHIVE_REF_B04 // STATUS: IMMUTABLE",
    citation: "Aim Security. (2025). EchoLeak: Zero-click prompt injection in M365 Copilot.",
    dossierBody: [
      "INCIDENT: Copilot hijacked via inbound email summary.", 
      "MECHANISM: Agent queried OneDrive/SharePoint silently via hidden commands.", 
      "VERDICT: Ingestion of untrusted data requires a Logic Air-Gap."
    ]
  },
  "lyft-logic-shear": {
    title: "THE LYFT EARNINGS PHANTOM",
    node: "MANAGERIAL",
    impact: "$2B MARKET VOLATILITY",
    analysis: "A single-digit logic shear triggered a 60% market cap surge and subsequent collapse.",
    ref: "ARCHIVE_REF_B05 // STATUS: IMMUTABLE",
    citation: "Gizmodo. (2024). Lyft stock surges after 'extra zero' typo.",
    dossierBody: [
      "INCIDENT: Automated release projected 500bps expansion instead of 50bps.", 
      "MARKET: Shares surged 67% before live correction caused collapse.", 
      "VERDICT: Failure of the Fiduciary Kill-Switch gate."
    ]
  },
  "mexico-agency-breach": {
    title: "CLAUDE_CODE EXFILTRATION",
    node: "MANAGERIAL",
    impact: "150GB DATA LOSS",
    analysis: "Attacker leveraged autonomous coding agents to breach nine government agencies.",
    ref: "ARCHIVE_REF_B06 // STATUS: IMMUTABLE",
    citation: "Live Science. (2026). Hackers used AI to steal government records.",
    dossierBody: [
      "INCIDENT: Attacker used AI agents to execute 5,300 remote commands.", 
      "FRACTURE: Excessive Agency—agents granted high-privilege without oversight.", 
      "VERDICT: Failure of Agency Segmentation and Managerial Oversight."
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
      if (data) { setActive(data); } else { router.push('/briefings'); }
    }
  }, [mounted, router.isReady, slug, router]);

  if (!mounted || !active) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <Activity className="animate-spin text-red-600" size={48} />
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
              <button onClick={() => setShowDossier(true)} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-red-600 border-b-2 border-red-600 pb-1 hover:text-black hover:border-black transition-all italic underline-offset-4">VIEW_DOSSIER // DEEP_DIVE <ExternalLink size={12} /></button>
            </div>
            
            {/* 🛡️ NEW FOUNDATIONAL METHODOLOGY SECTION */}
            <div className="bg-slate-900/50 border border-slate-800 p-10 md:p-14 shadow-2xl flex flex-col gap-8">
              <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] font-black uppercase tracking-widest italic"><Scale size={18} /> THE_BMR_LOGIC_BASELINE</div>
              <div className="space-y-6">
                <h4 className="text-2xl font-black text-white italic tracking-tight">METHODOLOGY: BEYOND THE BLACK BOX</h4>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium normal-case italic">
                  This autopsy is generated through the lens of the BMR Diagnostic Framework—a methodology forged in high-stakes environments where a 1% logic shear isn't a glitch, it's a catastrophic liability. 
                </p>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium normal-case italic">
                  Traditional cybersecurity identifies bugs; BMR identifies <span className="text-red-600 font-black">Fractures</span>. By mapping the distance between executive fiduciary duty, character-level technical hardening, and autonomous privilege segmentation, we identify failure patterns before they manifest as market volatility.
                </p>
              </div>
            </div>

            <button onClick={() => router.push('/pulse-check')} className="w-full bg-red-600 text-white py-8 font-black uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all shadow-2xl italic text-xl">INITIALIZE RECOVERY PROTOCOL</button>
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
            <button onClick={() => router.push('/pulse-check')} className="w-full bg-white text-black py-6 font-black uppercase text-[12px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl italic">GENERATE INDICTMENT</button>
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
                  <p key={i} className="text-base font-bold leading-relaxed uppercase italic text-slate-800 border-l-2 border-slate-200 pl-6">{paragraph}</p>
                ))}
              </div>
              <div className="mt-12 pt-6 border-t border-slate-100 font-mono text-[9px] text-slate-400 uppercase tracking-widest font-black leading-tight italic">CITED_MATERIAL: {active.citation}</div>
              <button onClick={() => setShowDossier(false)} className="mt-8 w-full bg-slate-950 text-white py-4 font-black uppercase tracking-widest text-[11px] hover:bg-red-600 transition-all shadow-xl italic">CLOSE_DOSSIER</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
