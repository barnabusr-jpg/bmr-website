"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Microscope, Activity, Award, Briefcase, Zap, Scale, Target, AlertCircle } from "lucide-react";

export default function Methodology() {
  const nodes = [
    {
      id: "NODE_01",
      title: "EXECUTIVE NODE",
      focus: "LEGAL LIABILITY",
      lens: "PH.D. LEADERSHIP",
      description: "We find the fault lines where AI logic breaks company policy. We map legal risks like the Air Canada case before they hit your balance sheet. If your board cannot control its AI, BMR gives them the kill switch.",
      metrics: ["Board Risk Audit", "Policy Hardening", "Brand Protection"]
    },
    {
      id: "NODE_02",
      title: "TECHNICAL NODE",
      focus: "LOGIC HARDENING",
      lens: "FEDERAL ENGINEERING",
      description: "We apply a government grade security mindset to your AI. We stop outside data from tricking the system into giving away company secrets. We do not just secure the server; we secure the decision making.",
      metrics: ["Input Fracture Check", "Logic Air Gapping", "System Hardening"]
    },
    {
      id: "NODE_03",
      title: "MANAGERIAL NODE",
      focus: "OVERSIGHT DECAY",
      lens: "P&L PORTFOLIO OVERSIGHT",
      description: "We prevent your AI from having unchecked power. If your AI has too much agency, a small error becomes a total portfolio collapse. We build human gates back into your automated systems.",
      metrics: ["Agency Limits", "Staff Readiness", "Recovery Strategy"]
    }
  ];

  const phases = [
    { step: "01", title: "INTAKE", detail: "A twelve question diagnostic. Takes three minutes. We find your most obvious logic gaps." },
    { step: "02", title: "TRIAGE", detail: "We map your gaps against historic audits and current legal reality to prioritize threats." },
    { step: "03", title: "INDICTMENT", detail: "A clinical, no fluff report showing exactly where your organization is most at risk." },
    { step: "04", title: "RECOVERY", detail: "Strategic advisory to build the armor, close the gaps, and stabilize your innovation." }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 overflow-x-hidden uppercase font-black">
      <Header />
      
      <main className="pt-44 pb-24 px-6 max-w-7xl mx-auto italic">
        {/* --- SECTION I: THE WHY (10th Grade Readability) --- */}
        <section className="mb-32">
          <div className="border-l-8 border-red-600 pl-10 mb-16 italic">
            <span className="text-red-600 font-mono text-[11px] font-black tracking-[0.4em] italic">THE_BLUEPRINT // BMR_2.0</span>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mt-6 mb-10 italic">
              FORENSIC <br /> <span className="text-red-600">METHODOLOGY.</span>
            </h1>
            <p className="text-xl md:text-3xl text-white max-w-4xl leading-tight font-black italic">
              AI risk is not a software bug. It is a failure of leadership and structure. We find the cracks in your business logic before they become legal disasters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start italic">
            <div className="bg-slate-900/30 border border-slate-800 p-10 shadow-2xl italic">
              <h4 className="text-red-600 font-mono text-[10px] font-black mb-6 tracking-widest italic">THE_ORIGIN</h4>
              <p className="text-slate-400 text-lg leading-relaxed normal-case font-medium italic">
                BMR was built from two decades of high stakes leadership at Microsoft. I protected <span className="text-white font-black">United States Government Intelligence</span> in air gapped networks. After managing hundreds of system failures, I built this framework to find the weak points before they collapse your business.
              </p>
            </div>
            <div className="space-y-6 italic">
              <div className="flex gap-6 items-center border-b border-slate-900 pb-6 italic">
                <Shield className="text-red-600 shrink-0 italic" size={32} />
                <div>
                  <div className="text-white font-black text-lg italic">GOVERNMENT GRADE SECURITY</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic">SECURE CLOUD // AIR GAPPED SYSTEMS</p>
                </div>
              </div>
              <div className="flex gap-6 items-center border-b border-slate-900 pb-6 italic">
                <Briefcase className="text-red-600 shrink-0 italic" size={32} />
                <div>
                  <div className="text-white font-black text-lg italic uppercase">300 MILLION DOLLAR PORTFOLIO</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic">600+ SYSTEM RECOVERIES</p>
                </div>
              </div>
              <div className="flex gap-6 items-center border-b border-slate-900 pb-6 italic">
                <Scale className="text-red-600 shrink-0 italic" size={32} />
                <div>
                  <div className="text-white font-black text-lg italic">PH.D. LEADERSHIP</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic">FIDUCIARY & GOVERNANCE EXPERT</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION II: THE NODES (Visual Legibility Fix) --- */}
        <section className="mb-40 italic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 italic">
            {nodes.map((node) => (
              <div key={node.id} className="bg-slate-950 border-2 border-slate-900 p-10 shadow-2xl relative group hover:border-red-600 transition-all italic">
                <div className="text-red-600 font-mono text-[9px] font-black tracking-[0.3em] mb-6 italic">{node.id} // {node.lens}</div>
                {/* 🛡️ CLAMPED TEXT: Ensures titles are bold and readable */}
                <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-black mb-1 italic tracking-tighter text-white">{node.title}</h3>
                <p className="text-red-600 text-[10px] font-black tracking-[0.2em] mb-8 italic">{node.focus}</p>
                
                {/* 🛡️ SIMPLIFIED DESCRIPTION: Short and punchy */}
                <p className="text-slate-400 text-sm normal-case mb-12 leading-relaxed font-medium italic min-h-[100px]">
                  {node.description}
                </p>
                
                <div className="space-y-4 border-t border-slate-900 pt-8 italic">
                  {node.metrics.map((m, j) => (
                    <div key={j} className="flex items-center gap-3 text-[10px] font-black tracking-widest text-white italic">
                      <Zap size={14} className="text-red-600 italic" /> {m}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION III: THE PROCESS (12 Qs / 3 Mins) --- */}
        <section className="mb-40 bg-white text-slate-950 p-10 md:p-24 italic">
          <div className="max-w-4xl italic">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-10">THE 3 MINUTE <span className="text-red-600 italic">PULSE CHECK</span></h2>
            <p className="text-lg md:text-xl font-bold text-slate-600 mb-20 normal-case italic">
              This is not a survey. It is a forensic test. We ask twelve targeted questions to find your high probability fractures. We deliver a clinical report of your vulnerability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 italic">
            {phases.map((p) => (
              <div key={p.step} className="border-l-4 border-slate-200 pl-8 space-y-4 italic">
                <div className="text-red-600 font-black text-4xl italic">PHASE_{p.step}</div>
                <div className="text-xl font-black italic tracking-tight italic">{p.title}</div>
                <p className="text-slate-500 text-sm normal-case font-medium leading-relaxed italic">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION IV: CTA --- */}
        <section className="max-w-5xl mx-auto text-center border border-slate-800 p-16 md:p-24 bg-slate-950/40 italic">
          <AlertCircle className="text-red-600 mx-auto mb-8 italic" size={48} />
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 text-white leading-none italic">THE COST OF INACTION</h2>
          <p className="text-xl md:text-2xl text-slate-400 leading-snug mb-12 normal-case italic font-medium italic">
            For every one million dollars in AI spend, businesses lose four hundred thousand dollars per year to unaddressed errors. This is not optional. It is a fiduciary duty.
          </p>
          
          <button 
            onClick={() => window.location.href='/pulse-check'} 
            className="group relative bg-red-600 text-white px-12 md:px-24 py-8 text-2xl font-black italic tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all shadow-2xl"
          >
            START PULSE CHECK
            <Target className="absolute -top-4 -right-4 text-white group-hover:text-red-600 transition-all italic" size={32} />
          </button>
          <p className="text-slate-500 font-mono text-[9px] mt-8 tracking-widest font-black italic uppercase">12 QUESTIONS // 3 MINUTE COMPLETION TIME</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
