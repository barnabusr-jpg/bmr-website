import { useRouter } from "next/router";
import { Download, Activity, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* ... Existing Sections ... */}

      {/* NEW: Reshaped Bottom Section */}
      <section className="py-24 px-6 border-t border-slate-900 bg-[#020617]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 italic tracking-tight uppercase">Ready to Close the Gap?</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you are troubleshooting a current deployment or architecting a new initiative, 
            start with the BMR framework to eliminate shadow labor and value leak.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Download Card */}
            <div className="p-10 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-[#14b8a6]/50 transition-colors group">
              <div>
                <Download className="text-[#14b8a6] mb-6 h-10 w-10" />
                <h3 className="text-2xl font-bold mb-4 italic uppercase">The Field Guide</h3>
                <p className="text-slate-400 mb-8 font-light leading-relaxed">
                  Download our operational reference manual. Explore the twelve signals we use to 
                  stabilize and scale human-AI systems.
                </p>
              </div>
              <a 
                href="/media/Field Guide.pdf" 
                download
                className="inline-flex items-center justify-center gap-3 bg-white text-[#020617] px-8 py-4 rounded font-bold uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all"
              >
                Download Protocol <Download size={16} />
              </a>
            </div>

            {/* Diagnostic Card */}
            <div className="p-10 bg-[#14b8a6]/5 border border-[#14b8a6]/20 rounded-2xl flex flex-col justify-between hover:border-[#14b8a6]/50 transition-colors group">
              <div>
                <Activity className="text-[#14b8a6] mb-6 h-10 w-10" />
                <h3 className="text-2xl font-bold mb-4 italic uppercase">System Diagnostic</h3>
                <p className="text-slate-300 mb-8 font-light leading-relaxed">
                  Ready for a forensic view? Our 12-question pulse check identifies your 
                  primary friction points and identifies your System Archetype.
                </p>
              </div>
              <button 
                onClick={() => router.push('/diagnostic')}
                className="inline-flex items-center justify-center gap-3 bg-[#14b8a6] text-[#020617] px-8 py-4 rounded font-bold uppercase tracking-widest text-[10px] hover:bg-[#0d9488] transition-all"
              >
                Begin Diagnostic <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* ... Footer ... */}
    </div>
  );
}
