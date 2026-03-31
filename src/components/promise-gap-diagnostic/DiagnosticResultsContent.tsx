"use client";
import React, { useEffect, useState } from 'react';
import ForensicTriageGrid from '../forensic/ForensicTriageGrid';
import { Download, ArrowRight, Activity, Lock, ShieldAlert } from 'lucide-react';

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);
  const [hemorrhageTotal, setHemorrhageTotal] = useState(0);
  const [hasValidated, setHasValidated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const vault = localStorage.getItem('bmr_results_vault');
    if (vault) {
      try {
        const parsed = JSON.parse(vault);
        setData(parsed);
        
        // FORCED RESET: Even if data exists, we reset the validation 
        // to force the user to interact with the Triage Grid on this view.
        setHasValidated(false);
        setHemorrhageTotal(0);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleLock = (val: number) => {
    // This is the ONLY function that can flip the gatekeeper
    setHemorrhageTotal(val);
    setHasValidated(true);
  };

  const handleBooking = () => {
    if (!data || !hasValidated) return;
    const vault = JSON.parse(localStorage.getItem('bmr_results_vault') || '{}');
    const finalVal = vault.validated_hemorrhage || hemorrhageTotal;
    const nodes = vault.calibration?.nodes || 500;

    const url = `https://calendly.com/hello-bmradvisory/forensic-review?` + 
      `name=${encodeURIComponent(data.name)}&` +
      `email=${encodeURIComponent(data.email)}&` + 
      `a1=Vector_02&` +
      `a2=Hemorrhage_$${finalVal.toLocaleString()}&` +
      `a3=Nodes_${nodes}`;

    window.open(url, '_blank');
  };

  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 text-white font-sans">
      <div className="border-l-4 border-[#14b8a6] bg-slate-900/20 p-10 mb-12 relative">
        <Lock className="absolute top-4 right-4 text-[#14b8a6] opacity-20" size={40} />
        <h1 className="text-4xl font-black italic uppercase">
          Forensic <span className="text-[#14b8a6]">Outcome</span>
        </h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-2 font-mono">
          Protocol: {data.archetype || "REPLACEMENT TRAP"} {'|'} {data.organization}
        </p>
      </div>

      <div className="mb-12">
        <ForensicTriageGrid onLock={handleLock} />
      </div>

      {/* VERDICT SECTION: Strictly controlled by hasValidated */}
      <div className={hasValidated ? "opacity-100 translate-y-0 transition-all duration-1000" : "opacity-5 blur-xl pointer-events-none h-0 overflow-hidden"}>
        <div className="p-12 border-2 border-slate-900 bg-slate-900/40 text-center relative overflow-hidden">
          <Activity className="mx-auto mb-6 text-[#14b8a6] opacity-50" size={48} />
          
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[10px] text-slate-500 uppercase font-black italic tracking-[0.3em]">
              Validated Annual Hemorrhage
            </span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-8">
            ${hemorrhageTotal.toLocaleString()}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button 
              onClick={handleBooking} 
              className="bg-[#14b8a6] text-slate-950 px-12 py-6 font-black uppercase text-[12px] tracking-[0.4em] hover:bg-white transition-all flex items-center shadow-2xl"
            >
              Unlock Full Protocol <ArrowRight className="ml-3 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {!hasValidated && (
        <div className="py-20 text-center border-2 border-dashed border-slate-800 bg-slate-950/50">
          <div className="flex flex-col items-center gap-4">
            <ShieldAlert size={32} className="text-[#14b8a6] animate-pulse" />
            <span className="text-[#14b8a6] font-black uppercase text-[12px] tracking-[0.5em]">
              Awaiting Forensic Calibration
            </span>
            <p className="text-slate-600 text-[10px] uppercase font-mono">
              Adjust node density and baseline integrity above to decrypt verdict
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticResultsContent;
