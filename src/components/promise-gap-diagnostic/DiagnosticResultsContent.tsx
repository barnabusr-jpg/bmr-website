"use client";
import React, { useEffect, useState } from 'react';
import ForensicTriageGrid from '../forensic/ForensicTriageGrid';
import { Download, ArrowRight, Activity, Lock } from 'lucide-react';

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);
  const [hemorrhageTotal, setHemorrhageTotal] = useState(17800000);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const vault = localStorage.getItem('bmr_results_vault');
    if (vault) setData(JSON.parse(vault));
  }, []);

  const handleBooking = () => {
    if (!data) return;
    const vault = JSON.parse(localStorage.getItem('bmr_results_vault') || '{}');
    const finalVal = vault.validated_hemorrhage || hemorrhageTotal;
    const nodes = vault.calibration?.nodes || 500;

    const url = `https://calendly.com/hello-bmradvisory/forensic-review?` + 
      `name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&` + 
      `a1=Vector_02&a2=Hemorrhage_$${finalVal.toLocaleString()}&a3=Nodes_${nodes}&` + 
      `utm_campaign=${encodeURIComponent(data.organization)}`;

    window.open(url, '_blank');
  };

  const handleDownloadDossier = async () => {
    if (!data) return;
    setIsDownloading(true);
    const vault = JSON.parse(localStorage.getItem('bmr_results_vault') || '{}');

    try {
      const response = await fetch('/api/forensic/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: data.archetype,
          organization: data.organization,
          email: data.email,
          validated_hemorrhage: vault.validated_hemorrhage,
          calibration: vault.calibration
        })
      });
      if (response.ok) alert("FORENSIC_TRANSFER_COMPLETE.");
    } catch (err) {
      console.error("Dossier_Transfer_Error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 text-white font-sans">
      <div className="border-l-4 border-[#14b8a6] bg-slate-900/20 p-10 mb-12 relative">
        <Lock className="absolute top-4 right-4 text-[#14b8a6] opacity-20" size={40} />
        <h1 className="text-4xl font-black italic uppercase">Forensic <span className="text-[#14b8a6]">Outcome</span></h1>
        <button onClick={handleDownloadDossier} className="mt-6 flex items-center gap-2 bg-slate-800 px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-slate-700">
          <Download size={14} /> {isDownloading ? "Generating..." : "Download Forensic Dossier"}
        </button>
      </div>

      <ForensicTriageGrid onLock={(val) => setHemorrhageTotal(val)} />

      <div className="p-12 border-2 border-slate-900 bg-slate-900/40 text-center">
        <Activity className="mx-auto mb-6 text-[#14b8a6] opacity-50" size={48} />
        <span className="text-[10px] text-slate-500 uppercase font-black italic tracking-[0.3em]">Validated Annual Hemorrhage</span>
        <h2 className="text-6xl font-black italic tracking-tighter mb-8">${hemorrhageTotal.toLocaleString()}</h2>
        
        <button onClick={handleBooking} className="bg-[#14b8a6] text-slate-950 px-12 py-6 font-black uppercase text-[12px] tracking-[0.4em] hover:bg-white transition-all flex items-center mx-auto">
          Unlock Full Protocol <ArrowRight className="ml-3 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
