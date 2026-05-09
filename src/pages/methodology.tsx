"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Microscope, Activity, Award, Briefcase, Zap, Scale, Target, ChevronRight, AlertCircle } from "lucide-react";

export default function Methodology() {
  const nodes = [
    {
      id: "NODE_01",
      title: "EXECUTIVE NODE",
      focus: "FIDUCIARY LIABILITY",
      lens: "PH.D. ORGANIZATIONAL LEADERSHIP",
      description: "We audit the 'Logic Shear' between board-level fiduciary duty and autonomous agent representation. When an AI misrepresents a policy (like Air Canada), the legal exposure isn't a bug—it's a systemic failure of governance.",
      metrics: ["NIST AI RMF Alignment", "Fiduciary Kill-Switches", "Brand Equity Protection"]
    },
    {
      id: "NODE_02",
      title: "TECHNICAL NODE",
      focus: "LOGIC HARDENING",
      lens: "FEDERAL ENGINEERING LEADERSHIP",
      description: "AI logic is a black box—until it isn't. Applying the 'Air Gapped' security mindset to AI means hardening the system at the character level, not just the model level, to prevent adversarial drift.",
      metrics: ["Ingestion Fracture Analysis", "Character-Level Hardening", "Logic Air-Gapping"]
    },
    {
      id: "NODE_03",
      title: "MANAGERIAL NODE",
      focus: "PRIVILEGE DECAY",
      lens: "PORTFOLIO & P&L OVERSIGHT",
      description: "Managing $300M+ portfolios and 600+ critical incidents taught us this: Agency must be segmented. When an AI agent has unchecked authority, a single failure becomes a portfolio collapse.",
      metrics: ["Agency Segmentation", "Workforce Readiness", "Escalation Recovery"]
    }
  ];

  const phases = [
    { step: "01", title: "FORENSIC INTAKE", detail: "Deployment of the 30-question diagnostic to identify immediate CVSS-style logic fractures." },
    { step: "02", title: "FRACTURE MAPPING", detail: "User responses are mapped against the Evidence Vault and 100+ historic forensic audits." },
    { step: "03", title: "THE INDICTMENT", detail: "A clinical, data-driven report identifying exactly where the organization's logic is most likely to shear." },
    { step: "04", title: "RECOVERY PROTOCOL", detail: "Strategic CXO-level advisory to close gaps, harden nodes, and stabilize the innovation portfolio." }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 overflow-x-hidden uppercase">
      <Header />
      
      <main className="pt-44 pb-24 px-6 max-w-7xl mx-auto italic">
        {/* --- SECTION I: THE INTELLECTUAL ORIGIN --- */}
        <section className="mb-32">
          <div className="border-l-8 border-red-600 pl-10 mb-16">
            <span className="text-red-600 font-mono text-[11px] font-black tracking-[0.4em] italic">ARCHITECTURAL_GAP // ORIGIN_REPORT</span>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mt-6 mb-10 italic italic">
              FORENSIC <br /> <span className="text-red-600">PHILOSOPHY.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-4xl leading-tight font-black italic">
              "AI risk isn’t a software bug—it’s a systemic fracture in organizational logic. This isn’t a problem of code—it’s a problem of architecture."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-slate-900/30 border border-slate-800 p-10 shadow-2xl italic">
              <h4 className="text-red-600 font-mono text-[10px] font-black mb-6 tracking-widest italic">THE_THESIS</h4>
              <p className="text-slate-400 text-lg leading-relaxed normal-case font-medium italic">
                As a Senior Director at Microsoft Federal, I oversaw <span className="text-white font-black">Azure Air Gapped and Stack Hub for the U.S. Government</span>—where a single logic failure could mean national security risks. Combined with a Ph.D. in Organizational Leadership, the BMR framework was born from this dual expertise: <span className="text-white font-black">forensic engineering meets executive liability.</span>
              </p>
            </div>
            <div className="space-y-6 italic">
              <div className="flex gap-6 items-center border-b border-slate-900 pb-6">
                <Shield className="text-red-600 shrink-0" size={32} />
                <div>
                  <div className="text-white font-black text-lg italic">HIGH-CONSEQUENCE AUTHORITY</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic">AZURE AIR GAPPED // US GOV SECURE CLOUD</p>
                </div>
              </div>
              <div className="flex gap-6 items-center border-b border-slate-900 pb-6 italic">
                <Briefcase className="text-red-600 shrink-0" size={32} />
                <div>
                  <div className="text-white font-black text-lg italic">$300M+ PORTFOLIO OVERSIGHT</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic">600+ CRITICAL INCIDENT RECOVERIES</p>
                </div>
              </div>
              <div className="flex gap-6 items-center border-b border-slate-900 pb-6 italic">
                <Scale className="text-red-600 shrink-0" size={32} />
                <div>
                  <div className="text-white font-black text-lg italic EXECUTIVE LIABILITY LENS">PH.D. ORGANIZATIONAL LEADERSHIP</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic">FIDUCIARY DUTY & GOVERNANCE SPECIALIST</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION II: THE TRI-NODE ARCHITECTURE --- */}
        <section className="mb-40">
          <div className="text-center mb-20 italic">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic">THE TRI-NODE <span className="text-red-600">CHAIN OF FAILURE</span></h2>
            <p className="text-slate-500 font-mono text-[10px] mt-4 tracking-[0.4em] italic font-black uppercase italic">MAPPING THE DISTANCE BETWEEN BOARD LIABILITY AND PORTFOLIO COLLAPSE</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {nodes.map((node) => (
              <div key={node.id} className="bg-slate-950 border-2 border-slate-900 p-12 shadow-2xl relative group hover:border-red-600 transition-all italic italic">
                <div className="text-red-600 font-mono text-[9px] font-black tracking-[0.3em] mb-6 italic">{node.id} // {node.lens}</div>
                <h3 className="text-3xl font-black mb-1 italic tracking-tighter italic text-white">{node.title}</h3>
                <p className="text-red-600 text-[11px] font-black tracking-[0.2em] mb-8 italic">{node.focus}</p>
                
                <p className="text-slate-400 text-sm normal-case mb-12 leading-relaxed font-medium italic italic">
                  {node.description}
                </p>
                
                <div className="space-y-4 border-t border-slate-900 pt-8 italic">
                  {node.metrics.map((m, j) => (
                    <div key={j} className="flex items-center gap-3 text-[10px] font-black tracking-widest text-white italic italic">
                      <Zap size={14} className="text-red-600 italic" /> {m}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION III: THE DIAGNOSTIC PHASES --- */}
        <section className="mb-40 bg-white text-slate-950 p-10 md:p-24 italic">
          <div className="max-w-4xl italic">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-10 italic">WHAT HAPPENS WHEN YOU CLICK <span className="text-red-600 italic">"INITIALIZE PULSE-CHECK"</span></h2>
            <p className="text-lg md:text-xl font-bold text-slate-600 mb-20 normal-case italic">
              "This isn’t a survey—it’s a forensic trial. Your responses are mapped against historic audits to identify high-probability fractures. The result is a clinical indictment of vulnerability."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {phases.map((p) => (
              <div key={p.step} className="border-l-4 border-slate-200 pl-8 space-y-4 italic">
                <div className="text-red-600 font-black text-4xl italic">PHASE_{p.step}</div>
                <div className="text-xl font-black italic tracking-tight italic">{p.title}</div>
                <p className="text-slate-500 text-sm normal-case font-medium leading-relaxed italic">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION IV: THE COST OF INACTION --- */}
        <section className="max-w-5xl mx-auto text-center border border-slate-800 p-16 md:p-24 bg-slate-950/40 italic">
          <AlertCircle className="text-red-600 mx-auto mb-8" size={48} />
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 italic text-white leading-none">THE COST OF INACTION</h2>
          <p className="text-xl md:text-2xl text-slate-400 leading-snug mb-12 normal-case italic font-medium italic">
            For every $1M in AI spend, enterprises lose $400K/yr to unaddressed fractures. The average 360° Triangulation closes $1.2M/yr in risk—with a 10–30x ROI.
          </p>
          <div className="text-red-600 font-black text-xl md:text-2xl tracking-[0.2em] mb-16 italic italic">
            THIS ISN’T OPTIONAL—IT’S FIDUCIARY DUTY.
          </div>
          
          <button 
            onClick={() => window.location.href='/pulse-check'} 
            className="group relative bg-red-600 text-white px-12 md:px-24 py-8 text-2xl font-black italic tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all shadow-2xl italic italic"
          >
            INITIALIZE_PULSE_CHECK
            <Target className="absolute -top-4 -right-4 text-white group-hover:text-red-600 transition-all" size={32} />
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
