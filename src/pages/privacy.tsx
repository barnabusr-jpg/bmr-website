import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-[#14b8a6]/30">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <section className="mb-12">
          <span className="text-[#14b8a6] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Legal Framework</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 italic uppercase tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 text-sm uppercase tracking-widest font-mono">Effective: February 2026 | Fairfax County, VA</p>
        </section>
        
        <div className="space-y-10 text-slate-400 font-light leading-relaxed border-t border-slate-900 pt-12">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide leading-tight">1. Data Controller Notice</h2>
            <p>
              BMR Solutions (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) acts as a Data Controller under the <strong>Virginia Consumer Data Protection Act (VCDPA)</strong>. We collect professional identity data and systemic &ldquo;signals&rdquo; to identify friction across our core lenses: <strong>Trust (HAI)</strong>, <strong>Govern (AVS)</strong>, and <strong>Evolve (IGF)</strong>.
            </p>
          </section>

          <section className="p-8 bg-[#14b8a6]/5 border border-[#14b8a6]/20 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#14b8a6]"></div>
            <h2 className="text-xl font-bold text-[#14b8a6] mb-4 uppercase tracking-wide italic">The Non-Disclosure Commitment</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              BMR Solutions <strong>does not sell, rent, or trade</strong> your personal or organizational signal data to third parties. Forensic data is handled with the same rigor as proprietary technical assets.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">2. Your Rights Under Virginia Law</h2>
            <p className="mb-6">As a resident of the Commonwealth of Virginia, you have the following rights regarding your personal data:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Right to Access', 'Right to Correct', 'Right to Delete', 'Right to Data Portability'].map((right) => (
                <div key={right} className="flex items-center gap-3 p-3 border border-slate-800 rounded bg-slate-900/20">
                  <div className="h-1.5 w-1.5 bg-[#14b8a6] rounded-full"></div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300">{right}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide leading-tight">3. Contact for Forensic Data</h2>
            <p className="mb-6">
              To exercise your rights under the VCDPA or to request an audit of the data we hold, 
              please contact our privacy desk:
            </p>
            <a 
              href="mailto:hello@bmradvisory.co" 
              className="inline-flex items-center gap-2 text-[#14b8a6] font-mono font-bold hover:text-white transition-colors border border-[#14b8a6]/20 bg-[#14b8a6]/5 px-4 py-2 rounded-md"
            >
              hello@bmradvisory.co
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
