import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ShieldCheck, Activity, Zap } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <section className="mb-20">
          <span className="text-[#14b8a6] font-bold uppercase tracking-[0.3em] text-[10px]">The BMR Protocol</span>
          <h1 className="text-5xl font-bold mt-4 mb-6 italic tracking-tight uppercase">Systemic Methodology</h1>
          <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-light italic">
            &ldquo;Closing the Promise Gap&trade; requires a continuous cycle of alignment across three interconnected layers.&rdquo;
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-lg relative overflow-hidden group border-t-2 border-[#14b8a6]">
            <ShieldCheck className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white italic">HAI (Trust)</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              <strong>The Foundation of Readiness:</strong> Ensuring adoption begins with empathy and transparency. Without trust, systems fail to scale.
            </p>
          </div>
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-lg relative overflow-hidden group border-t-2 border-[#14b8a6]">
            <Zap className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white italic">AVS (Evolve)</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              <strong>The Bridge to Value:</strong> Translating raw adoption metrics into operational value by linking intent to actual outcomes.
            </p>
          </div>
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-lg relative overflow-hidden group border-t-2 border-[#14b8a6]">
            <Activity className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white italic">IGF (Govern)</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              <strong>The Safeguard Loop:</strong> Embedding accountability into every decision loop to allow for rapid, responsible evolution.
            </p>
          </div>
        </div>

        <section className="p-12 bg-[#14b8a6]/5 border border-[#14b8a6]/20 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4 italic text-white uppercase">The HAI Field Guide</h2>
          <p className="text-slate-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Download our operational reference manual. Includes the Diagnostic Signal Glossary used during SHP audits.
          </p>
          <a href="/media/Field Guide.pdf" download className="inline-flex items-center gap-4 bg-[#14b8a6] text-[#020617] px-10 py-5 rounded font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#0d9488] transition-all cursor-pointer">
            <Download size={18} /> Download Protocol PDF
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
