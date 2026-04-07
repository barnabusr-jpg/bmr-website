// ... [Imports and CONTENT remain the same as previous prompt] ...

export default function BriefingDocument() {
  const router = useRouter();
  const { slug } = router.query;
  if (!router.isReady) return <div className="min-h-screen bg-[#020617]" />;
  const data = (CONTENT as any)[slug as string];

  if (!data) return <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-red-600">DOSSIER_NOT_FOUND</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans">
      <Header />
      <main className="pt-44 pb-24 px-6 max-w-5xl mx-auto space-y-12">
        <button onClick={() => router.push('/briefings')} className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-mono text-[10px] uppercase tracking-[0.4em] font-black">
          <ArrowLeft size={14} /> BACK TO VAULT
        </button>
        
        <header className="space-y-4 border-l-4 border-red-600 pl-8">
          <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-widest font-black italic">
            <span className="text-red-600 bg-red-600/10 px-2 py-1">{data.failureType.replace(/_/g, " ")}</span>
            <span className="text-slate-500">PRIMARY_PROTOCOL: {data.protocolFocus}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">{data.title}</h1>
        </header>

        <div className="grid md:grid-cols-3 gap-12 pt-12 border-t border-slate-900">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-slate-900/40 p-10 border border-slate-800 rounded-sm">
              <h3 className="font-mono text-[10px] font-black uppercase text-red-600 tracking-widest mb-6">FORENSIC ANALYSIS</h3>
              <p className="text-slate-200 leading-relaxed font-bold uppercase text-lg italic">{data.analysis}</p>
            </div>

            <div className="bg-red-600/5 border border-red-600/20 p-10 space-y-6">
              <h4 className="text-white font-black italic text-2xl uppercase tracking-tighter">Request Board-Level Indictment</h4>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                Download the full technical autopsy, rework tax breakdown, and the recovery protocol for this specific failure archetype.
              </p>
              <button onClick={() => router.push('/pulse-check')} className="bg-red-600 text-white px-8 py-4 font-black font-mono text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                DOWNLOAD_AUTOPSY_PDF
              </button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 p-8 sticky top-44 space-y-6">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic leading-relaxed">
                ESTIMATED REWORK TAX:<br />
                <span className="text-red-600 font-black not-italic text-sm tracking-normal">{data.reworkTax}</span>
              </div>
              <div className="h-px bg-slate-900" />
              <button onClick={() => router.push('/pulse-check')} className="w-full bg-white text-black py-5 font-black uppercase text-[9px] tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all">
                RUN SHEAR-DIAGNOSTIC
              </button>
              <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer" className="block text-center text-[9px] font-mono text-slate-600 underline uppercase tracking-widest hover:text-red-600 transition-colors">
                VERIFY_EXTERNAL_SOURCE
              </a>
            </div>
          </aside>
        </div>
      </main>
      <LogicLeakTicker /><Footer />
    </div>
  );
}
