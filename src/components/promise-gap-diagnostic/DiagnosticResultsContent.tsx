import React, { useEffect, useState } from 'react';
import { Calendar, ShieldAlert, ArrowRight } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
// IMPORTING THE BRAIN: Ensuring keywords match the diagnostic weighting
import { getVectorAffinity } from "@/lib/forensic-logic";

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const vaultData = localStorage.getItem('bmr_results_vault');
    if (vaultData) {
      const parsed = JSON.parse(vaultData);
      setData(parsed);
      if (parsed.email) setUserEmail(parsed.email);
      if (parsed.role) setUserRole(parsed.role);
    }
  }, []);

  if (!data) return <div className="py-20 text-center uppercase tracking-widest text-xs animate-pulse text-slate-500 font-bold">Initialising Forensic Topology...</div>;

  // Format Chart Data for Strategy 2: Pressure Map
  const chartData = [
    { zone: 'HAI (Trust)', value: data.HAI.aggregate },
    { zone: 'AVS (Adoption)', value: data.AVS.aggregate },
    { zone: 'IGF (Governance)', value: data.IGF.aggregate },
  ];

  return (
    <div className="py-8 space-y-12">
      {/* 1. IDENTITY HEADER */}
      <div className="border-l-2 border-[#00F2FF] bg-slate-900/40 p-8 backdrop-blur-sm">
        <h3 className="text-[#00F2FF] text-[10px] uppercase tracking-[4px] font-bold mb-3">Signal Intensity Captured</h3>
        <p className="text-slate-300 text-sm italic leading-relaxed">
          Your forensic report for the <span className="text-white font-bold">{userRole || 'Executive'} perspective</span> has been dispatched to <span className="text-white font-bold">{userEmail}</span>.
        </p>
      </div>

      {/* 2. STRATEGY 2: ROLE-SPECIFIC PRESSURE MAP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-950/20 p-6 rounded-sm border border-slate-800">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="zone" tick={{ fill: '#64748b', fontSize: 10 }} />
              <Radar
                name="Pressure"
                dataKey="value"
                stroke="#00F2FF"
                fill="#00F2FF"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase text-xs tracking-widest italic underline decoration-[#00F2FF]">Systemic Signal Analysis</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            The Pressure Map identifies specific friction points in your <span className="text-white">{userRole} context</span>. 
            Elevated intensity suggests systemic misalignment in your primary focus zone.
          </p>
        </div>
      </div>

      {/* 3. STRATEGY 3: FILTERED NEUTRALIZATION ROADMAP */}
      <div>
        <h3 className="text-xl font-bold mb-8 italic uppercase flex items-center gap-3 text-white">
          <ShieldAlert className="h-5 w-5 text-[#00F2FF]" /> Priority Neutralization Roadmap
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['HAI', 'AVS', 'IGF'].map((zone) => (
            data[zone].vectors
              .filter((v: string) => v !== "Maintain Baseline")
              // Sort to prioritize vectors matching the user's role keywords
              .sort((a: string) => getVectorAffinity(a, userRole) === "Priority" ? -1 : 1)
              .map((vector: string, idx: number) => {
                const affinity = getVectorAffinity(vector, userRole);
                return (
                  <div key={`${zone}-${idx}`} className={`group p-5 bg-slate-900/20 border transition-all ${
                    affinity === "Priority" ? "border-[#00F2FF]/60 bg-[#0A1F33]/30 shadow-[0_0_15px_rgba(0,242,255,0.1)]" : "border-slate-800"
                  }`}>
                    <div className="text-[#00F2FF] text-[9px] font-bold uppercase mb-1">
                      {affinity === "Priority" ? "Priority Pillar Target" : `${zone} Signal`}
                    </div>
                    <div className="text-slate-200 font-bold uppercase italic text-xs leading-tight group-hover:text-white">{vector}</div>
                    <ArrowRight className={`h-3 w-3 mt-4 transition-transform group-hover:translate-x-2 ${affinity === "Priority" ? "text-[#00F2FF]" : "text-slate-700"}`} />
                  </div>
                );
              })
          ))}
        </div>
      </div>

      {/* 4. CALL TO ACTION */}
      <div className="mt-12 p-10 bg-[#00F2FF] text-[#020617] text-center rounded-sm shadow-xl">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Forensic Review Recommended</h2>
        <button 
          className="bg-[#020617] text-white px-8 py-4 font-black uppercase text-xs tracking-widest flex items-center gap-3 mx-auto mt-6 hover:bg-slate-900 transition-all shadow-lg"
          onClick={() => {
            const link = `https://calendly.com/hello-bmradvisory/forensic-review?email=${encodeURIComponent(userEmail)}&a1=${encodeURIComponent(userRole)}`;
            window.open(link, '_blank');
          }}
        >
          Schedule Forensic Review <Calendar size={16} />
        </button>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
