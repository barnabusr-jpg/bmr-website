"use client";

import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Radar as ReRadar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Lock, Activity, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="py-12 space-y-16 text-white max-w-6xl mx-auto px-6">
      {/* HEADER: Forensic Status Report */}
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
        </div>
        <div className="mt-8 md:mt-0 text-right">
          <span className="block text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 italic">Reporting Lens</span>
          <p className="font-black text-xl italic uppercase text-white">{data.role}</p>
        </div>
      </div>

      {/* MAIN DATA GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-10 bg-slate-900/10 border-2 border-slate-900 rounded-none relative">
          <div className="absolute top-4 right-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse" />
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Live Signal Graph</span>
          </div>
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#1e293b" strokeWidth={2} />
                <PolarAngleAxis 
                  dataKey="zone" 
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: '900', letterSpacing: '2px' }} 
                />
                <ReRadar 
                  name="Intensity" 
                  dataKey="value" 
                  stroke="#14b8a6" 
                  strokeWidth={3}
                  fill="#14b8a6" 
                  fillOpacity={0.2} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* VECTOR SCORECARDS */}
        <div className="space-y-4">
          {['Vector 01', 'Vector 02', 'Vector 03'].map((v, i) => (
            <motion.div
              key={v}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-8 bg-slate-900/30 border-2 border-slate-900 rounded-none group hover:border-[#14b8a6]/40 transition-all duration-500 relative">
                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500" />
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-[#14b8a6] uppercase tracking-[0.3em] italic">Observation {v}</span>
                  <ShieldAlert size={14} className="text-slate-800 group-hover:text-[#14b8a6] transition-colors" />
                </div>
                <div className="text-4xl font-black italic text-white tracking-tighter group-hover:translate-x-2 transition-transform">
                  {chartData[i].value}<span className="text-sm text-slate-600 ml-2">PTS</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FORENSIC LOCK: Call to Action */}
      <div className="text-center p-20 border-2 border-slate-900 bg-slate-900/40 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800" />
        <div className="absolute top-0 left-0 w-0 h-1 bg-[#14b8a6] group-hover:w-full transition-all duration-700" />
        
        <Lock className="h-16 w-16 text-[#14b8a6] mx-auto mb-8 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
        
        <h4 className="font-black uppercase italic text-3xl md:text-4xl mb-6 text-white tracking-tighter">
          Strategic Targets <span className="text-[#14b8a6]">Encrypted</span>
        </h4>
        
        <p className="text-slate-500 text-[11px] uppercase font-black tracking-[0.3em] max-w-xl mx-auto mb-12 leading-relaxed italic">
          High-intensity friction points detected. Complete technical decryption 
          requires an authorized Forensic Review session.
        </p>
        
        <button 
          className="bg-[#14b8a6] text-[#020617] px-12 py-6 font-black uppercase text-[12px] tracking-[0.4em] hover:bg-white transition-all duration-500 shadow-2xl relative z-10" 
          onClick={handleBooking}
        >
          Unlock Full Protocol <ArrowRight className="inline h-4 w-4 ml-3" />
        </button>

        {/* Decorative ID Background */}
        <div className="absolute bottom-4 right-6 text-[8px] text-slate-800 font-black tracking-[0.5em] uppercase pointer-events-none">
          Auth_ID: {data.email.split('@')[0].toUpperCase()}_BMR_V3
        </div>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
