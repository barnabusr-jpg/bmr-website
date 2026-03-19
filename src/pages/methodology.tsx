import React from 'react';
import { useRouter } from "next/router";
import { Mail, ShieldCheck, Target, Fingerprint, ArrowRight } from "lucide-react"; 
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MethodologyPage() {
  const router = useRouter();

  const handleRequestAccess = () => {
    const subject = encodeURIComponent("Access Request: BMR Systems Operations Protocol");
    const body = encodeURIComponent("I am requesting access to the BMR Systems Operations Protocol (Field Guide) for my organization.\n\nName:\nOrganization:");
    window.location.href = `mailto:hello@bmrsolutions.co?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-[#14b8a6]/30">
      <Header />
      
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <section className="mb-20">
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

        {/* Triple Lens Grid - USING THE ICONS HERE TO FIX LINT ERRORS */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {/* Trust Lens */}
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-none relative overflow-hidden group transition-all hover:border-[#14b8a6]/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]"></div>
            <Fingerprint className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white italic">The Trust Lens</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              <strong className="text-white">The Foundation of Readiness:</strong> Identifying where human mental models diverge from system outputs.
            </p>
          </div>

          {/* Govern Lens */}
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-none relative overflow-hidden group transition-all hover:border-[#14b8a6]/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]"></div>
            <Target className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white italic">The Govern Lens</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              <strong className="text-white">The Bridge to Value:</strong> Auditing the alignment of AI workflows with strategic intent.
            </p>
          </div>

          {/* Evolve Lens */}
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-none relative overflow-hidden group transition-all hover:border-[#14b8a6]/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]"></div>
            <ShieldCheck className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white italic">The Evolve Lens</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              <strong className="text-white">The Safeguard Loop:</strong> Embedding the architecture required for responsible evolution.
            </p>
          </div>
        </div>

        {/* Rest of page (Glossary, Request Access, etc) stays the same... */}
        
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
