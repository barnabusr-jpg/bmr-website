 "use client";
import React from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, ShieldAlert } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
      <Header />
      <main className="flex-grow pt-48 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] font-black italic border-l-2 border-red-600 pl-4">
                BMR Forensics | Structural Audit
              </p>
              <h1 className="text-[110px] font-black uppercase italic tracking-tighter leading-[0.8] text-white">
                Strategy <br /> Is <br /> 
                <span className="text-slate-800">Luxury.</span> <br />
                <span className="text-red-600">Recovery</span> <br /> Is Duty.
              </h1>
            </div>

            <p className="text-slate-400 text-lg max-w-lg italic leading-relaxed font-medium">
              We identify the &ldquo;Log Rot&rdquo; and systemic drift in AI deployments. 
              BMR provides the forensic tools to harden logic chains before architectural collapse becomes inevitable.
            </p>

            <button 
              onClick={() => router.push('/diagnostic')}
              className="bg-red-600 text-white px-12 py-6 font-black uppercase italic tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all flex items-center gap-6 shadow-[0_20px_50px_rgba(220,38,38,0.2)]"
            >
              Initialize Diagnostic <ArrowRight size={20} />
            </button>
          </div>

          <div className="bg-slate-900/10 border border-slate-900 p-12 space-y-8 relative overflow-hidden group">
             <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white leading-none">
               Why Systems <span className="text-red-600">Quietly Drift</span>
             </h2>
             <p className="text-slate-400 font-bold italic text-lg leading-tight">
               AI failure is rarely a binary event.
             </p>
             <div className="pl-6 border-l border-slate-800 space-y-6">
               <p className="text-sm text-slate-500 italic leading-relaxed">
                 It is a slow, structural divergence where AI-enabled logic decays under operating conditions leaders cannot see.
               </p>
               <p className="text-sm text-slate-400 leading-relaxed italic">
                 When human intent and machine execution decouple, you do not have an &quot;optimization&quot; problem. You have <span className="text-red-600 font-black">SYSTEMIC ROT.</span>
               </p>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
