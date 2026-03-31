"use client";

import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Radar as ReRadar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Lock, Activity, ShieldAlert, Download } from "lucide-react";

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const vault = localStorage.getItem('bmr_results_vault');
    if (vault) {
      try {
        setData(JSON.parse(vault));
      } catch (e) {
        console.error("Failed to parse vault data", e);
      }
    }
  }, []);

  const handleBooking = () => {
    if (typeof window === 'undefined' || !data) return;
    const focusKey = data.AVS?.aggregate >= data.HAI?.aggregate && data.AVS?.aggregate >= data.IGF?.aggregate ? 'AVS' : (data.IGF?.aggregate >= data.HAI?.aggregate ? 'IGF' : 'HAI');
    const vectorId = focusKey === 'HAI' ? 'Vector 01' : focusKey === 'AVS' ? 'Vector 02' : 'Vector 03';
    const url = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&a1=${vectorId}&utm_campaign=${encodeURIComponent(data.organization)}`;
    window.open(url, '_blank');
  };

  const handleDownloadDossier = async () => {
    if (!data) return;
    setIsDownloading(true);
    try {
      const response = await fetch('/api/forensic/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: data.archetype || "Replacement Trap",
          email: data.email,
          organization: data.organization
        })
      });

      if (!response.ok) throw new Error('DOWNLOAD_FAILED');
      const result = await response.json();
      alert(`FORENSIC_TRANSFER_COMPLETE: Artifact ${result.artifact} is ready.`);
    } catch (err) {
      console.error("Dossier Error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!mounted || !data) return null;

  const chartData = [
    { zone: 'VECTOR 01', value: Math.round(data?.HAI?.aggregate || 0) },
    { zone: 'VECTOR 02', value: Math.round(data?.AVS?.aggregate || 0) },
    { zone: 'VECTOR 03', value: Math.round(data?.IGF?.aggregate || 0) },
  ];

  return (
    <div className="py-12 space-y-16 text-white max-w-6xl mx-auto px-6 font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-l-4 border-[#14b8a6] bg-slate-900/20 p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Activity size={80} className="text-[#14b8a6]" />
        </div>
        <div>
          <h3 className="text-[#14b8a6] text-[10px] uppercase tracking-[0.5em] font-black mb-4 italic">
            Signal Intensity captured // {data.organization}
          </h3>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
            Forensic <span className="text-[#14b8a6]">Outcome</span>
          </h1>
          <button 
            onClick={handleDownloadDossier}
            disabled={isDownloading}
            className="mt-6 flex items-center gap-3 bg-slate-800 hover:bg-[#14b8a6] text-white hover:text-slate-950 px-4 py-2 border border-slate-700 transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
          >
            <Download size={14} /> {isDownloading ? "Generating Packet..." : "Download Forensic Dossier"}
          </button>
        </div>
      </div>

      {/* DATA GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-10 bg-slate-900/10 border-2 border-slate-900 rounded-none relative">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="zone" tick={{ fill: '#475569', fontSize: 10 }} />
                <ReRadar name="Intensity" dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="space-y-4">
          {['Vector 01', 'Vector 02', 'Vector 03'].map((v, i) => (
            <div key={v} className="p-8 bg-slate-900/30 border-2 border-slate-900 flex justify-between items-center">
               <div>
                 <span className="text-[10px] font-black text-[#14b8a6] uppercase">{v} Intensity</span>
                 <div className="text-4xl font-black italic">{chartData[i].value} PTS</div>
               </div>
               <ShieldAlert size={24} className="text-[#14b8a6] opacity-40" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="text-center p-20 border-2 border-slate-900 bg-slate-900/40 group">
        <Lock className="h-16 w-16 text-[#14b8a6] mx-auto mb-8 opacity-50" />
        <h4 className="font-black uppercase italic text-3xl mb-6">Strategic Targets <span className="text-[#14b8a6]">Encrypted</span></h4>
        <button 
          className="bg-[#14b8a6] text-[#020617] px-12 py-6 font-black uppercase text-[12px] tracking-[0.4em] hover:bg-white transition-all flex items-center mx-auto" 
          onClick={handleBooking}
        >
          Unlock Full Protocol <ArrowRight className="ml-3 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
