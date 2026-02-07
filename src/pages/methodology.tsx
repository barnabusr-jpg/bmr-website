import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ShieldCheck, Activity, Zap } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 italic tracking-tight uppercase">The BMR Framework</h1>
        <p className="text-slate-400 text-lg mb-12 leading-relaxed font-light">
          Closing the Promise Gap™ requires more than technical deployment; it requires a continuous cycle of alignment across three interconnected layers of organizational health.
        </p>

        {/* The Three Layers of Organizational Health */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]"></div>
            <ShieldCheck className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white">HAI (Trust)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              <strong>The Foundation of Readiness:</strong> Anchoring systems by ensuring adoption begins with empathy and transparency. Without a human-centric foundation, systems fail to scale.
            </p>
          </div>

          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]"></div>
            <Zap className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white">AVS (Evolve)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              <strong>The Bridge to Value:</strong> Translating raw adoption metrics into operational value and mission impact by linking organizational intent to actual outcomes.
            </p>
          </div>

          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]"></div>
            <Activity className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white">IGF (Govern)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              <strong>The Safeguard Loop:</strong> Embedding accountability into every decision loop to allow for rapid, responsible evolution while safeguarding value.
            </p>
          </div>
        </div>

        {/* The Field Guide Download Section */}
        <section className="p-12 bg-[#14b8a6]/5 border border-[#14b8a6]/20 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4 italic text-white">The HAI Field Guide</h2>
          <p className="text-slate-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            This document provides the high-level framework for stabilizing and scaling your AI initiatives by moving from initial diagnosis to strategic action.
          </p>
          <a 
            href="/media/Field Guide.pdf" 
            download
            className="inline-flex items-center gap-4 bg-[#14b8a6] text-[#020617] px-10 py-5 rounded-md font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#0d9488] transition-all"
          >
            <Download size={18} /> Download the Protocol
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
