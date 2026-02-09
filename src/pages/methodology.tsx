import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ShieldCheck, Activity, Zap, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

export default function MethodologyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-[#14b8a6]/30">
      <Header />
      
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <section className="mb-20 text-center md:text-left">
          <span className="text-[#14b8a6] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            The BMR Protocol
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-8 italic tracking-tight uppercase leading-none">
            Systemic <span className="text-slate-500 text-nowrap">Methodology</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-light italic">
            &ldquo;Closing the Promise Gap&trade; requires a continuous cycle of alignment across three interconnected layers of organizational health.&rdquo;
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {/* HAI - TRUST */}
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-lg relative overflow-hidden group transition-all hover:border-[#14b8a6]/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]"></div>
            <ShieldCheck className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white italic">Trust (HAI)</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              <strong className="text-white">The Foundation of Readiness:</strong> Ensuring adoption begins with empathy and transparency. Without trust, systems fail to scale.
            </p>
          </div>

          {/* AVS - GOVERN */}
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-lg relative overflow-hidden group transition-all hover:border-[#14b8a6]/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]"></div>
            <Zap className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white italic">Govern (AVS)</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              <strong className="text-white">The Bridge to Value:</strong> Translating raw adoption metrics into measurable mission impact by linking organizational intent to outcomes.
            </p>
          </div>

          {/* IGF - EVOLVE */}
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-lg relative overflow-hidden group transition-all hover:border-[#14b8a6]/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]"></div>
            <Activity className="text-[#14b8a6] mb-6 h-10 w-10" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest text-white italic">Evolve (IGF)</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              <strong className="text-white">The Safeguard Loop:</strong> Embedding accountability into every decision loop, creating an environment for rapid, responsible evolution.
            </p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-24" />

        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight text-white leading-tight">
                The Signal Glossary
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8 font-light italic">
                Our diagnostic engine tracks twelve distinct signals defined in our Field Guide. These act as a forensic snapshot of organizational health.
              </p>
              <ul className="space-y-6">
                {[
                  { label: "Expectation Continuity (Trust/HAI)", desc: "Aligning system performance with user mental models to prevent trust erosion." },
                  { label: "Operational Resonance (Govern/AVS)", desc: "Determining if AI adoption is solving core mission problems or creating shadow labor." },
                  { label: "Decision Explainability (Evolve/IGF)", desc: "The capacity for leadership to audit and understand why specific outputs were generated." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#14b8a6] mt-2 shrink-0"></div>
                    <p className="text-sm text-slate-300">
                      <span className="text-white font-bold uppercase tracking-tighter block mb-1">{item.label}</span> 
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-10 bg-[#14b8a6]/5 border border-[#14b8a6]/20 rounded-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#14b8a6]/50 to-transparent"></div>
              <h3 className="text-2xl font-bold mb-4 italic text-white uppercase tracking-tight">Access the Protocol</h3>
              <p className="text-slate-400 mb-10 font-light text-sm leading-relaxed">
                Download the official Field Guide to review the full breakdown of all twelve signals and the architecture required to stabilize your AI initiatives.
              </p>
              <a 
                href="/media/Field Guide.pdf" 
                download="BMR_Field_Guide.pdf"
                className="inline-flex items-center justify-center gap-4 bg-[#14b8a6] text-[#020617] px-10 py-5 rounded font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#0d9488] transition-all w-full"
              >
                <Download size={18} /> Download Protocol PDF
              </a>
            </div>
          </div>
        </section>

        <section className="text-center pt-12 border-t border-slate-900">
          <button 
            onClick={() => router.push('/')}
            className="group inline-flex items-center gap-3 text-slate-500 hover:text-[#14b8a6] transition-colors font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            Return to Diagnostic <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
