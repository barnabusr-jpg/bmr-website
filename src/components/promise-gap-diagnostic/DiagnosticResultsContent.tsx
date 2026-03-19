"use client";

import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Radar as ReRadar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Lock } from "lucide-react";

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

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

  if (!mounted || !data) return null;

  // Reverted to original Vector labels for IP protection
  const chartData = [
    { zone: 'VECTOR 01', value: Math.round(data?.HAI?.aggregate || 0) },
    { zone: 'VECTOR 02', value: Math.round(data?.AVS?.aggregate || 0) },
    { zone: 'VECTOR 03', value: Math.round(data?.IGF?.aggregate || 0) },
  ];

  const handleBooking = () => {
    if (typeof window === 'undefined') return;

    const focusKey = data.AVS.aggregate >= data.HAI.aggregate && data.AVS.aggregate >= data.IGF.aggregate ? 'AVS' : (data.IGF.aggregate >= data.HAI.aggregate ? 'IGF' : 'HAI');
    const vectorId = focusKey === 'HAI' ? 'Vector 01' : focusKey === 'AVS' ? 'Vector 02' : 'Vector 03';
    
    const url = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&a1=${vectorId}&utm_campaign=${encodeURIComponent(data.organization)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="py-8 space-y-12 text-white">
      {/* Forensic Header Status */}
      <div className="border-l-2 border-[#14b8a6] bg-slate-900/40 p-8">
        <h3 className="text-[#14b8a6] text-[10px] uppercase tracking-[4px] font-bold mb-3">Signal Intensity Captured</h3>
        <p className="font-bold text-lg italic uppercase">{data.role} Perspective Active</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8 bg-slate-900/20 border-slate-800 rounded-none">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="zone" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                <ReRadar 
                  name="Intensity" 
                  dataKey="value" 
                  stroke="#14b8a6" 
                  fill="#14b8a6" 
                  fillOpacity={0.4} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-4">
          {['Vector 01', 'Vector 02', 'Vector 03'].map((v, i) => (
            <Card key={v} className="p-6 bg-slate-900/40 border-slate-800 rounded-none group hover:border-[#14b8a6]/50 transition-colors">
              <span className="text-[10px] font-bold text-[#14b8a6] uppercase tracking-widest">Observation {v}</span>
              <div className="text-2xl font-bold italic mt-1">{chartData[i].value} PTS</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Forensic Lock Section */}
      <div className="text-center p-16 border border-[#14b8a6]/20 bg-slate-900/40 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]/10 group-hover:bg-[#14b8a6]/30 transition-colors" />
        <Lock className="h-12 w-12 text-[#14b8a6] mx-auto mb-6" />
        <h4 className="font-black uppercase italic text-2xl mb-4 text-white tracking-tighter">Strategic Targets Encrypted</h4>
        <p className="text-slate-400 text-[10px] uppercase tracking-widest max-w-md mx-auto mb-10 leading-relaxed">
          {"The captured signals indicate friction points within your current AI infrastructure. Decrypt findings via your session."}
        </p>
        <button 
          className="bg-[#14b8a6] text-[#020617] px-10 py-5 font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white transition-all duration-300" 
          onClick={handleBooking}
        >
          Unlock Forensic Review <ArrowRight className="inline h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
