import React from 'react';
import { useRouter } from "next/router";
import { Mail, ShieldCheck, Target, Fingerprint, ArrowRight } from "lucide-react"; 
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MethodologyPage() {
  const router = useRouter();

  // FIX: This function was "assigned but never used" according to the linter
  const handleRequestAccess = () => {
    const subject = encodeURIComponent("Access Request: BMR Systems Operations Protocol");
    const body = encodeURIComponent("I am requesting access to the BMR Systems Operations Protocol (Field Guide) for my organization.\n\nName:\nOrganization:");
    window.location.href = `mailto:hello@bmrsolutions.co?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Header />
      
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <section className="mb-20">
          <span className="text-[#14b8a6] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            The BMR Protocol
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-8 italic tracking-tight uppercase leading-none">
            Systemic <span className="text-slate-500 text-nowrap">Architecture</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-light italic">
            {"\"Closing the Promise Gap requires a continuous cycle of alignment across three interconnected layers of organizational health.\""}
          </p>
        </section>

        {/* Triple Lens Grid - USING ShieldCheck, Target, Fingerprint */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-none relative">
            <Fingerprint className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest italic">The Trust Lens</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">Identifying where human mental models diverge from system outputs.</p>
          </div>

          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-none relative">
            <Target className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest italic">The Govern Lens</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">Auditing the alignment of AI workflows with strategic intent.</p>
          </div>

          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-none relative">
            <ShieldCheck className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest italic">The Evolve Lens</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">Embedding the architecture required for responsible evolution.</p>
          </div>
        </div>

        {/* THE FIX: The Operational Protocol Section */}
        <section className="mb-24">
          <div className="p-10 bg-[#14b8a6]/5 border border-[#14b8a6]/20 rounded-none text-center">
            <h3 className="text-2xl font-bold mb-4 italic text-white uppercase tracking-tight">The Operational Protocol</h3>
            <p className="text-slate-400 mb-10 font-light text-sm leading-relaxed">
              {"Access the proprietary architecture required to identify systemic drift."}
            </p>
            
            {/* FIX: Explicitly calling handleRequestAccess and rendering Mail icon */}
            <button 
              onClick={handleRequestAccess}
              className="inline-flex items-center justify-center gap-4 bg-[#14b8a6] text-[#020617] px-10 py-5 rounded-none font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all w-full"
            >
              <Mail size={18} /> Request Protocol Access
            </button>
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
