export const VerdictSummary = ({ verdict }: { verdict: any }) => {
  return (
    <div className="max-w-4xl mx-auto p-12 bg-slate-900 text-white min-h-screen">
      <header className="border-b border-slate-800 pb-8 mb-12">
        <h1 className="text-4xl font-black italic tracking-tighter text-red-600 mb-2">FORENSIC_VERDICT</h1>
        <p className="text-slate-400 font-mono text-sm uppercase">Friction Index: {verdict.frictionIndex.toFixed(1)}%</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-xs font-mono text-blue-400 uppercase mb-4 tracking-widest">Systemic_Loss_Projection</h3>
          <p className="text-6xl font-bold tracking-tighter">${(verdict.totalProjectedLoss / 1000).toFixed(0)}K</p>
          <p className="text-slate-500 mt-2 italic">Estimated 12-month Logic Decay Cost</p>
        </div>
        
        <div className="bg-slate-800/50 p-6 rounded border border-slate-700">
          <h3 className="text-xs font-mono text-slate-400 uppercase mb-4">Structural_Contradictions</h3>
          <div className="space-y-3">
            {verdict.contradictions.map((c: any, i: number) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-red-600 font-bold">[!]</span>
                <span className="text-slate-300">{c.verdict}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={() => generateBMRVerdict(verdict, "NEXA_CORP")}
        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold uppercase tracking-widest transition"
      >
        <Download size={20} />
        Download Hardening Directives
      </button>
    </div>
  );
};
