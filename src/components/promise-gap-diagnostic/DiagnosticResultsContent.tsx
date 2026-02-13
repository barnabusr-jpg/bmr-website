import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, PolarRadiusAxis 
} from 'recharts';
import { ShieldAlert, Activity, ArrowRight, Download } from "lucide-react";

// --- CLINICAL TERMINOLOGY ENGINE ---
const getStatusLabel = (max: number) => {
  if (max === 5) return { label: "Systemic Emergency", color: "#EF4444" };
  if (max === 4) return { label: "Operational Drift", color: "#F59E0B" };
  if (max === 3) return { label: "Structural Asymmetry", color: "#00F2FF" };
  return { label: "Optimized Posture", color: "#10B981" };
};

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Retrieve the forensic data from the triage engine
    const vault = localStorage.getItem('bmr_results_vault');
    if (vault) setData(JSON.parse(vault));
  }, []);

  if (!data) return (
    <div className="py-20 text-center text-slate-500 uppercase tracking-widest text-xs animate-pulse">
      Initialising Forensic Topology...
    </div>
  );

  // Map aggregate weights to the Radar Topology
  const chartData = [
    { zone: 'HAI (Human)', value: data.HAI.aggregate, fullMark: 32 },
    { zone: 'AVS (Adoption)', value: data.AVS.aggregate, fullMark: 32 },
    { zone: 'IGF (Governance)', value: data.IGF.aggregate, fullMark: 32 },
  ];

  return (
    <div className="py-8 space-y-12">
      {/* HEADER: NON-DECLARATIVE POSTURE */}
      <div className="border-b border-slate-800 pb-8">
        <span className="text-[#00F2FF] font-bold uppercase tracking-[0.4em] text-[10px] glow-sm">
          Forensic Triage Output
        </span>
        <h2 className="text-4xl md:text-5xl font-black mt-2 italic uppercase tracking-tighter text-white">
          Systemic Pressure Map
        </h2>
        <p className="text-slate-500 mt-4 max-w-2xl text-[10px] uppercase tracking-widest leading-relaxed">
          The following signals represent indicated pressures within the organizational AI lifecycle. 
          This is a preliminary triage and not a final technical or legal verdict.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* VISUAL: RADAR TOPOLOGY */}
        <Card className="lg:col-span-2 p-8 bg-slate-900/20 border-slate-800 backdrop-blur-xl shadow-2xl">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
            <Activity className="h-3 w-3 text-[#00F2FF]" /> Organizational Displacement
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="zone" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                <Radar
                  name="Pressure"
                  dataKey="value"
                  stroke="#00F2FF"
                  fill="#00F2FF"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* ZONE SUMMARY */}
        <div className="space-y-4">
          {['HAI', 'AVS', 'IGF'].map((zone) => {
            const status = getStatusLabel(data[zone].max);
            return (
              <Card key={zone} className="p-6 bg-slate-900/40 border-slate-800 transition-all hover:bg-slate-900/60">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest">{zone} ZONE</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase" style={{ backgroundColor: `${status.color}20`, color: status.color }}>
                    {status.label}
                  </span>
                </div>
                <div className="text-2xl font-bold italic uppercase text-white">
                  {data[zone].aggregate} <span className="text-[10px] font-normal text-slate-600">Points</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* INTERVENTION ROADMAP */}
      <div>
        <h3 className="text-xl font-bold mb-8 italic uppercase flex items-center gap-3 text-white">
          <ShieldAlert className="h-5 w-5 text-[#00F2FF]" /> Neutralization Vectors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(data).map((zone) => (
            data[zone].vectors.filter((v: string) => v !== "Maintain Baseline").map((vector: string, idx: number) => (
              <div key={`${zone}-${idx}`} className="group p-5 bg-slate-900/20 border border-slate-800 hover:border-[#00F2FF]/40 transition-all">
                <div className="text-[#00F2FF] text-[9px] font-bold uppercase mb-1 tracking-tighter">{zone} Objective</div>
                <div className="text-slate-200 font-bold uppercase italic text-xs group-hover:text-white transition-colors leading-tight">
                  {vector}
                </div>
                <ArrowRight className="h-3 w-3 text-slate-700 mt-4 group-hover:translate-x-2 transition-transform group-hover:text-[#00F2FF]" />
              </div>
            ))
          ))}
        </div>
      </div>

      {/* FINAL CALL TO ACTION: THE "MOAT" */}
      <div className="mt-12 p-10 bg-[#00F2FF] text-[#020617] text-center rounded-sm">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Forensic Deep-Dive Required</h2>
        <p className="max-w-xl mx-auto font-bold uppercase text-[10px] leading-relaxed mb-6 opacity-80">
          Indicated signals exceed standard variance thresholds. Professional verification of root causes via the 60-Point Forensic Module is recommended.
        </p>
        <button className="bg-[#020617] text-white px-8 py-4 font-black uppercase text-xs tracking-widest flex items-center gap-3 mx-auto hover:bg-slate-800 transition-all">
          Schedule Forensic Review <Download className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
