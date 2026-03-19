import React from 'react';
import { useRouter } from "next/router";
// REMOVED: import Link from 'next/link';
import { Mail, ShieldCheck, Target, Fingerprint, ArrowRight } from "lucide-react"; 
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MethodologyPage() {
  const router = useRouter();

  const handleRequestAccess = () => {
    const subject = encodeURIComponent("Access Request: BMR Systems Operations Protocol");
    const body = encodeURIComponent("I am requesting access to the BMR Systems Operations Protocol (Field Guide) for my organization.\n\nName:\nOrganization:\nRole:");
    window.location.href = `mailto:hello@bmrsolutions.co?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-[#14b8a6]/30">
      <Header />
      
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <section className="mb-20 text-center md:text-left">
          <span className="text-[#14b8a6] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            The BMR Protocol
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-8 italic tracking-tight uppercase leading-none text-white">
            Systemic <span className="text-slate-500 text-nowrap">Architecture</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-light italic">
            {"\"Closing the Promise Gap requires a continuous cycle of alignment across three interconnected layers of organizational health.\""}
          </p>
        </section>

        {/* Lenses section remains exactly the same... */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
           {/* ... existing code ... */}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-24" />

        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight text-white leading-tight">
                The Signal Glossary
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8 font-light italic">
                {"The BMR diagnostic engine tracks twelve distinct signals. The following three signals provide a forensic snapshot of the systemic landscape."}
              </p>
              <ul className="space-y-6">
                {[
                  { label: "Expectation Continuity (Trust)", desc: "Measuring the alignment between system outputs and the mental models of the user to prevent trust erosion." },
                  { label: "Operational Resonance (Govern)", desc: "Determining if AI adoption is solving core mission problems or merely creating shadow labor." },
                  { label: "Decision Explainability (Evolve)", desc: "The capacity for leadership to reconstruct and audit why a specific system output was generated." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#14b8a6] mt-2 shrink-0"></div>
                    <p className="text-sm text-slate-300">
                      <span className="text-white font-bold uppercase tracking-tighter block mb-1 italic">{item.label}</span> 
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-10 bg-[#14b8a6]/5 border border-[#14b8a6]/20 rounded-none text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500 ease-in-out"></div>
              <h3 className="text-2xl font-bold mb-4 italic text-white uppercase tracking-tight">The Operational Protocol</h3>
              <p className="text-slate-400 mb-10 font-light text-sm leading-relaxed">
                {"The BMR Field Guide is a proprietary asset reserved for partner engagements. This document outlines the technical specifications for the Safeguard Loop."}
              </p>
              <button 
                onClick={handleRequestAccess}
                className="inline-flex items-center justify-center gap-4 bg-[#14b8a6] text-[#020617] px-10 py-5 rounded-none font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all w-full"
              >
                <Mail size={18} /> Request Protocol Access
              </button>
            </div>
          </div>
        </section>

        <section className="text-center pt-12 border-t border-slate-900">
          <button 
            onClick={() => router.push('/diagnostic')}
            className="group inline-flex items-center gap-3 text-slate-500 hover:text-[#14b8a6] transition-colors font-bold uppercase tracking-[0.3em] text-[10px] italic"
          >
            Initialize Pulse Check <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
