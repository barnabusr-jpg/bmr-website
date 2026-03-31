"use client";
import React, { useEffect, useState } from 'react';
import ForensicTriageGrid from '../forensic/ForensicTriageGrid';
import { Download, ArrowRight, Activity, Lock, ShieldAlert } from 'lucide-react';

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);
  const [hemorrhageTotal, setHemorrhageTotal] = useState(0); // Default to 0
  const [hasValidated, setHasValidated] = useState(false); // New Gatekeeper State
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const vault = localStorage.getItem('bmr_results_vault');
    if (vault) setData(JSON.parse(vault));
  }, []);

  const handleLock = (val: number) => {
    setHemorrhageTotal(val);
    setHasValidated(true);
  };

  const handleBooking = () => {
    if (!data || !hasValidated) return;
    const vault = JSON.parse(localStorage.getItem('bmr_results_vault') || '{}');
    const finalVal = vault.validated_hemorrhage || hemorrhageTotal;
    const nodes = vault.calibration?.nodes || 500;

    const url = `https://calendly.com/hello-bmradvisory/forensic-review?` + 
      `name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&` + 
      `a1=Vector_02&a2=Hemorrhage_$${finalVal.toLocaleString()}&a3=Nodes_${nodes}`;

    window.open(url, '_blank');
  };

  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 text-white font-sans">
      {/* 1. Header Section */}
      <div className="border-l-4 border-[#14b8a6] bg-slate-900/20 p-10 mb-12 relative">
        <Lock className="absolute top-4 right-4 text-[#14b8a6] opacity-20" size={40} />
        <h1 className="text-4xl font-black italic uppercase">Forensic <span className="text-[#14b8a6]">Outcome</span></h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-2 font-mono">
          Protocol: {data.archetype || "REPLACEMENT TRAP"} // {data.organization}
        </p>
      </div>

      {/* 2. Mandatory Calibration Grid */}
      <div className="mb-12">
        <ForensicTriageGrid onLock={handleLock} />
      </div>

      {/* 3. Conditional Results Display */}
      <div className={`transition-all duration-700 ${hasValidated ? 'opacity-100 translate-y-0' : 'opacity-30 blur-sm pointer-events-none'}`}>
        <div className="p-12 border-2 border-slate-900 bg-slate-900/40 text-center relative overflow-hidden">
          {!hasValidated && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
               <div className="flex items-center gap-3 text-[#14b8a6] font-black uppercase text-[10px] tracking-[0.4em]">
                 <ShieldAlert size={18} /> Calibration Required to Unlock Verdict
               </div>
            </div>
          )}
          
          <Activity className="mx-auto mb-6 text-[#14b8a6] opacity-50" size={48} />
          <span className="text-[10px] text-slate-500 uppercase font-black italic tracking-[0.3em]">
            Validated Annual Hemorrhage
          </span>
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-8">
            ${hemorrhageTotal.toLocaleString()}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleBooking} 
              className="bg-[#14b8a6] text-slate-950 px-12 py-6 font-black uppercase text-[12px] tracking-[0.4em] hover:bg-white transition-all flex items-center"
            >
              Unlock Full Protocol <ArrowRight className="ml-3 h-4 w-4" />
            </button>
            
            <button 
              onClick={async () => {
                setIsDownloading(true);
                // logic for download...
                setIsDownloading(false);
              }} 
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              {isDownloading ? "Generating Dossier..." : "Download Forensic Summary"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
