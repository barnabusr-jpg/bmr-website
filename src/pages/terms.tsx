import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-[#14b8a6]/30">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <section className="mb-12">
          <span className="text-[#14b8a6] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Governing Agreement</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 italic uppercase tracking-tight">Terms of Service</h1>
          <p className="text-slate-500 text-sm uppercase tracking-widest font-mono text-nowrap text-ellipsis overflow-hidden">Jurisdiction: Fairfax County, VA</p>
        </section>

        <div className="space-y-12 text-slate-400 font-light leading-relaxed border-t border-slate-900 pt-12">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">1. Intellectual Property & Trade Secrets</h2>
            <p className="font-bold text-[#14b8a6] mb-3 uppercase text-[10px] tracking-[0.2em] italic">Notice under the Virginia Uniform Trade Secrets Act:</p>
            <p className="leading-relaxed">
              THE BMR PROTOCOL, INCLUDING THE 12 DIAGNOSTIC SIGNALS, THE PROMISE GAP&trade; FRAMEWORK, AND THE HAI FIELD GUIDE, ARE THE EXCLUSIVE INTELLECTUAL PROPERTY OF BMR SOLUTIONS. UNAUTHORIZED USE, REVERSE-ENGINEERING, OR REDISTRIBUTION IS STRICTLY PROHIBITED.
            </p>
          </section>

          <section className="p-8 border border-slate-800 bg-slate-900/40 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide italic">2. Advisory Disclaimer</h2>
            <p className="text-sm uppercase font-bold text-slate-400 mb-4">Conspicuous Legal Notice:</p>
            <p className="text-xs leading-relaxed text-slate-500">
              THE SYSTEM DIAGNOSTIC AND FIELD GUIDE ARE PROVIDED &ldquo;AS IS.&rdquo; BMR SOLUTIONS DOES NOT GUARANTEE SPECIFIC FINANCIAL OR MISSION OUTCOMES. ADVISORY SERVICES DO NOT CONSTITUTE LEGAL OR TECHNICAL COMPLIANCE CERTIFICATIONS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">3. Governing Law & Venue (Fairfax County)</h2>
            <p>
              These Terms are governed by the laws of the <strong>Commonwealth of Virginia</strong>. You expressly agree that exclusive jurisdiction for any dispute resides in the <strong>Circuit Court of Fairfax County, Virginia</strong>, or the U.S. District Court for the Eastern District of Virginia (Alexandria Division).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">4. Accuracy of Reporting</h2>
            <p>
              BMR Solutions is not liable for organizational roadmaps generated based on inaccurate self-reporting within the diagnostic tool.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
