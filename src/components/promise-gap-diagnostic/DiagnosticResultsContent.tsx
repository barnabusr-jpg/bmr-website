import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ShieldAlert, Activity, Calendar, Lock, ShieldCheck } from "lucide-react";

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const vault = localStorage.getItem('bmr_results_vault');
    if (vault) setData(JSON.parse(vault));
  }, []);

  if (!data) return <div className="py-20 text-center animate-pulse">Initialising Forensic Topology...</div>;

  // AGGREGATE METRIC (Hides the individual Zone scores from UI but uses them for total)
  const totalDisplacement = data.HAI.aggregate + data.AVS.aggregate + data.IGF.aggregate;
  
  const getSeverity = (score: number) => {
    if (score >= 120) return { label: "OPTIMIZED STEWARDSHIP", color: "#10B981", desc: "Minimal systemic variance detected." };
    if (score >= 80) return { label: "PROTOCOLIZED DRIFT", color: "#00F2FF", desc: "Strategic intent and operational output are misaligned." };
    return { label: "CRITICAL BASELINE GAPS", color: "#EF4444", desc: "High vulnerability detected. Systems are operating without forensic guardrails." };
  };

  const status = getSeverity(totalDisplacement);

  const chartData = [
    { zone: 'Pillar 1', value: data.HAI.aggregate, full: 45 },
    { zone: 'Pillar 2', value: data.AVS.aggregate, full: 45 },
    { zone: 'Pillar 3', value: data.IGF.aggregate, full: 45 },
  ];

  return (
    <div className="py-8 space-y-12">
      <div className="border-l-2 border-[#00F2FF] bg-[#0A1F33]/40 p-8 backdrop-blur-sm">
        <h3 className="text-[#00F2FF] text-[10px] uppercase tracking-[4px] font-bold mb-3 flex items-center gap-2">
           <ShieldCheck className="h-3 w-3" /> Forensic Signal Captured
        </h3>
        <p className="text-white font-black text-2xl mb-2 italic uppercase tracking-tighter">{data.role} Perspective Active</p>
        <p className="text-slate-400 text-xs italic leading-relaxed max-w-xl">
          Telemetry indicates systemic maturity signature. Internal variance mapped for forensic neutralization.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8 bg-slate-900/20 border-slate-800">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-8 text-center">Organizational Alignment Map</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#1e293b" />
                <PolarRadiusAxis angle={30} domain={[0, 50]} tick={false} axisLine={false} />
                <PolarAngleAxis dataKey="zone" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                <Radar name="Benchmark" dataKey="full" stroke="#1e293b" fill="#1e293b" fillOpacity={0.2} />
                <Radar name="Pressure" dataKey="value" stroke="#00F2FF" fill="#00F2FF" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-10 bg-slate-900/40 border-slate-800 border-t-4 text-center" style={{ borderTopColor: status.color }}>
            <span className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase block mb-4">Total Displacement Score</span>
            <div className="text-7xl font-black italic uppercase text-white tracking-tighter mb-4">{totalDisplacement}</div>
            <div className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: status.color }}>Status: {status.label}</div>
            <p className="text-[11px] text-slate-400 italic leading-relaxed">{status.desc}</p>
          </Card>
        </div>
      </div>

      <div className="pt-12 border-t border-slate-800 relative">
        <h3 className="text-xl font-bold italic uppercase flex items-center gap-3 text-white tracking-tighter mb-8">
          <ShieldAlert className="h-5 w-5 text-[#00F2FF]" /> Surgical Neutralization Roadmap
        </h3>
        
        <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center border border-slate-800 rounded">
          <Lock className="h-8 w-8 text-[#00F2FF] mb-4" />
          <h4 className="text-white font-black italic uppercase text-lg tracking-tighter underline decoration-[#00F2FF] underline-offset-8">Review Required</h4>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mt-6 max-w-sm leading-relaxed font-bold">
            Detailed neutralization vectors are restricted to prevent uncalibrated implementation. Schedule a 1-on-1 review to unlock your roadmap.
          </p>
          <button className="mt-8 bg-[#00F2FF] text-[#020617] px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-2xl">
            Unlock Full Roadmap
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-10 pointer-events-none grayscale blur-sm">
           <div className="p-8 border border-slate-800 bg-slate-900/20 h-40" />
           <div className="p-8 border border-slate-800 bg-slate-900/20 h-40" />
           <div className="p-8 border border-slate-800 bg-slate-900/20 h-40" />
        </div>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
