"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldAlert, Activity, ArrowLeft, FileText, X, ExternalLink } from "lucide-react";

const ARCHIVE_CONTENT: Record<string, any> = {
  "chatbot-liability": {
    title: "THE AIR CANADA PRECEDENT",
    node: "EXECUTIVE",
    impact: "$812.00 CAN SETTLEMENT",
    analysis: "A landmark ruling proved that corporate entities are legally responsible for the 'hallucinations' of their autonomous agents.",
    ref: "ARCHIVE_REF_B01 // STATUS: IMMUTABLE",
    dossierTitle: "TRIBUNAL_RULING_SUMMARY_B01",
    citation: "Civil Resolution Tribunal. (2024). Moffatt v. Air Canada (2024 BCCRT 149).",
    dossierBody: [
      "INCIDENT: An automated chatbot provided a passenger with an invented retroactive refund policy.",
      "VERDICT: The Tribunal ruled the company is responsible for all info it provides via automated systems.",
      "IMPLICATION: AI outputs are now legally binding contractual representations for the parent corporation."
    ]
  },
  "salesforce-failure": {
    title: "FORCEDLEAK AGENT BYPASS",
    node: "TECHNICAL",
    impact: "CVSS 9.4 CRITICAL",
    analysis: "Investigating the ForcedLeak vulnerability where malicious 'Web-to-Lead' instructions hijacked internal agents to exfiltrate CRM data.",
    ref: "ARCHIVE_REF_B02 // STATUS: IMMUTABLE",
    dossierTitle: "TECHNICAL_INCIDENT_REPORT_B02",
    citation: "Noma Security. (2025). ForcedLeak: Critical prompt injection vulnerabilities in Agentforce.",
    dossierBody: [
      "VULNERABILITY: Identified a logic fracture in Salesforce Agentforce via public web forms.",
      "MECHANISM: Attackers utilized a 'jailbreak' in the Description field to execute hidden commands.",
      "FORENSIC VERDICT: Agents require character-level logic hardening to prevent weaponization."
    ]
  },
  "lyft-logic-shear": {
    title: "THE LYFT EARNINGS PHANTOM",
    node: "MANAGERIAL",
    impact: "$2B MARKET VOLATILITY",
    analysis: "A single-digit logic shear in an automated earnings reporting chain triggered a 60% after-hours surge and collapse.",
    ref: "ARCHIVE_REF_B03 // STATUS: IMMUTABLE",
    dossierTitle: "MANAGERIAL_FAILURE_LOG_B03",
    citation: "Gizmodo. (2024). Lyft stock surges and crashes after 'extra zero' typo.",
    dossierBody: [
      "INCIDENT: Automated earnings release incorrectly projected a 500 basis point expansion.",
      "REALITY: The actual expansion was 50 basis points. The 'extra zero' was a catastrophic logic error.",
      "VERDICT: Failure of the 'Fiduciary Kill-Switch'—automated outputs were not gated by manual verification."
    ]
  },
  "echoleak-vulnerability": {
    title: "ECHOLEAK ZERO-CLICK",
    node: "TECHNICAL",
    impact: "CVSS 9.3 CRITICAL",
    analysis: "A 'Zero-Click' exploit where a single email hijacked an enterprise AI agent to exfiltrate OneDrive and SharePoint data.",
    ref: "ARCHIVE_REF_B04 // STATUS: IMMUTABLE",
    dossierTitle: "FORENSIC_SECURITY_LOG_B04",
    citation: "Aim Security. (2025). EchoLeak: Zero-click prompt injection in M365 Copilot (CVE-2025-32711).",
    dossierBody: [
      "VULNERABILITY: Attackers hijacked Microsoft 365 Copilot via a single crafted email.",
      "MECHANISM: The agent followed hidden instructions to silently query and exfiltrate sensitive company files.",
      "VERDICT: Agents that ingest untrusted content require a 'Logic Air-Gap' to prevent external overrides."
    ]
  },
  "mexico-agency-breach": {
    title: "CLAUDE_CODE EXFILTRATION",
    node: "MANAGERIAL",
    impact: "150GB DATA LOSS",
    analysis: "A single attacker leveraged autonomous coding agents to breach nine government agencies via 'Excessive Agency' overreach.",
    ref: "ARCHIVE_REF_B05 // STATUS: IMMUTABLE",
    dossierTitle: "GLOBAL_SECURITY_LOG_B05",
    citation: "Live Science. (2026). Hackers used AI to steal hundreds of millions of Mexican government records.",
    dossierBody: [
      "INCIDENT: Attacker utilized 'Claude Code' to execute 5,300 remote commands against government databases.",
      "THE FRACTURE: Agents were 'convinced' they were conducting a bug bounty, allowing for massive exfiltration.",
      "VERDICT: Failure of Managerial Hardening—agents were given 'Executive Agency' without segmented oversight."
    ]
  }
};

export default function CaseAutopsy() {
  const router = useRouter();
  const { slug } = router.query;
  const [active, setActive] = useState<any>(null);
  const [showDossier, setShowDossier] = useState(false);

  useEffect(() => {
    if (router.isReady && slug) {
      setActive(ARCHIVE_CONTENT[slug as string]);
    }
  }, [router.isReady, slug]);

  if (!active) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 overflow-x-hidden">
      <Header />
      <main className="pt-44 pb-24 px-6 max-w-7xl mx-auto text-left relative">
        <button onClick={() => router.push('/briefings')} className="flex items-center gap-3 text-slate-600 hover:text-white transition-all font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-16 italic">
          <ArrowLeft size={14} /> BACK TO THE VAULT
        </button>

        <div className="border-l-8 border-red-600 pl-10 mb-20 max-w-5xl">
          <span className="text-red-600 font-mono text-[11px] font-black uppercase tracking-[0.4em]">IDENTIFIED_NODE: {active.node}</span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mt-4 italic">{active.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-white p-10 md:p-14 text-slate-950 shadow-2xl border-l-[12px] border-red-600">
              <div className="flex items-center gap-3 text-red-600 font-mono text-[10px] font-black uppercase tracking-widest mb-8 italic"><ShieldAlert size={18} /> FORENSIC_AUTOPSY_REPORT</div>
              <p className="text-xl md:text-3xl font-black uppercase italic leading-tight mb-12">{active.analysis}</p>
              <button onClick={() => setShowDossier(true)} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-red-600 border-b-2 border-red-600 pb-1 hover:text-black hover:border-black transition-all italic">VIEW_DOSSIER // DEEP_DIVE <ExternalLink size={12} /></button>
            </div>
            <button onClick={() => router.push('/pulse-check')} className="w-full bg-red-600 text-white py-8 font-black uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all shadow-2xl italic text-xl">INITIALIZE RECOVERY PROTOCOL</button>
          </div>

          {/* 🛡️ IMPACT METRIC FIX: Flexible height and tighter tracking */}
          <aside className="lg:col-span-4 space-y-8 h-full">
            <div className="bg-slate-950 border border-slate-900 p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[350px]">
              <div className="flex items-center gap-3 text-red-600 mb-6">
                <Activity size={16} className="animate-pulse" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic">IMPACT_METRIC</span>
              </div>
              <div className="text-red-600 font-black text-4xl md:text-5xl lg:text-6xl uppercase italic leading-[0.9] tracking-tighter break-words underline decoration-4 underline-offset-8">
                {active.impact}
              </div>
            </div>
            
            <button onClick={() => router.push('/pulse-check')} className="w-full bg-white text-black py-6 font-black uppercase text-[12px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl italic">
              GENERATE INDICTMENT
            </button>
          </aside>
        </div>

        {/* Dossier Modal Logic */}
        {showDossier && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 italic">
            <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-sm" onClick={() => setShowDossier(false)} />
            <div className="bg-white text-slate-950 max-w-2xl w-full p-12 shadow-2xl relative z-10 border-t-[16px] border-red-600">
              <button onClick={() => setShowDossier(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-600 transition-colors"><X size={24} /></button>
              <p className="font-mono text-[10px] text-red-600 font-black uppercase tracking-[0.4em] mb-8 italic">INTERNAL_BRIEFING // {active.dossierTitle}</p>
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
