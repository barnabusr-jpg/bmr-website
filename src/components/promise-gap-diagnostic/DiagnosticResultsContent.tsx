import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { ShieldAlert, Activity, ArrowRight, Calendar } from "lucide-react";

// --- INTERNAL LOGIC: ROLE-BASED AFFINITY ---
const getVectorAffinity = (vector: string, role: string) => {
  const kws: Record<string, string[]> = {
    Executive: ["roi", "value", "strategic", "kpi", "alignment", "stewardship", "priorities"],
    Technical: ["logging", "telemetry", "security", "forensic", "compliance", "algorithmic", "instrument"],
    Manager: ["adoption", "workflow", "change", "friction", "governance", "readiness"]
  };
  const roleKws = kws[role] || kws.Executive;
  return roleKws.some(kw => vector.toLowerCase().includes(kw)) ? "Priority" : "Standard";
};

const getStatusLabel = (max: number) => {
  if (max === 5) return { label: "High Pressure Signal", color: "#EF4444" };
  if (max === 4) return { label: "Operational Variance", color: "#F59E0B" };
  if (max === 3) return { label: "Structural Drift", color: "#00F2FF" };
  return { label: "Baseline Stability", color: "#10B981" };
};

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('Executive');

  useEffect(() => {
    const vaultData = localStorage.getItem('bmr_results_vault');
    if (vaultData) {
      const parsed = JSON.parse(vaultData);
      setData(parsed);
      if (parsed.email) setUserEmail(parsed.email);
      if (parsed.role) setUserRole(parsed.role); // Capture role for affinity sorting
    }
  }, []);

  if (!data) return (
    <div className="py-20 text-center text-slate-500 uppercase tracking-widest text-xs animate-pulse font-bold">
      Initialising Forensic Topology...
    </div>
  );

  const chartData = [
    { zone: 'HAI (Human)', value: data.HAI.aggregate },
    { zone: 'AVS (Adoption)', value: data.AVS.aggregate },
    { zone: 'IGF (Governance)', value: data.IGF.aggregate },
  ];

  return (
    <div className="py-8 space-y-12">
      {/* SIGNAL HEADER */}
      <div className="border-l-2 border-[#00F2FF] bg-slate-900/40 p-8 backdrop-blur-sm animate-in fade-in slide-in-from-left duration-700">
        <h3 className="text-[#00F2FF] text-[10px] uppercase tracking-[4px] font-bold mb-3">
          Signal Intensity Captured
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed italic">
          Your forensic report for the <span className="text-white font-bold">{userRole} perspective</span> has been dispatched to <span className="text-white font-semibold">{userEmail}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RADAR CHART: Highlights Role-Weighted Pressure */}
        <Card className="lg:col-span-2 p-8 bg-slate-900/20 border-slate-800 backdrop-blur-xl shadow-2xl">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
            <Activity className="h-3 w-3 text-[#00F2FF]" /> Organizational Displacement
          </h3>
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="zone" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
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
        </Card>

        {/* INTENSITY PEAKS */}
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
                  {data[zone].aggregate} <span className="text-[10px] font-normal text-slate-600">Intensity Points</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ROADMAP: Sorted by Role Affinity */}
      <div>
        <h3 className="text-xl font-bold mb-8 italic uppercase flex items-center gap-3 text-white">
          <ShieldAlert className="h-5 w-5 text-[#00F2FF]" /> Priority {userRole} Neutralization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['HAI', 'AVS', 'IGF'].map((zone) => (
            data[zone].vectors
              .filter((v: string) => v !== "Maintain Baseline")
              .sort((a: string) => getVectorAffinity(a, userRole) === "Priority" ? -1 : 1)
              .map((vector: string, idx: number) => {
                const isPriority = getVectorAffinity(vector, userRole) === "Priority";
                return (
                  <div key={`${zone}-${idx}`} className={`group p-5 border transition-all ${
                    isPriority ? "border-[#00F2FF] bg-[#0A1F33]/40 shadow-[0_0_15px_rgba(0,242,255,0.1)]" : "border-slate-800 bg-slate-900/20"
                  }`}>
                    <div className="text-[#00F2FF] text-[9px] font-bold uppercase mb-1 tracking-tighter">
                      {isPriority ? "Priority Pillar Target" : `${zone} Strategic Target`}
                    </div>
                    <div className="text-slate-200 font-bold uppercase italic text-xs group-hover:text-white transition-colors leading-tight">
                      {vector}
                    </div>
                    <ArrowRight className={`h-3 w-3 mt-4 transition-transform group-hover:translate-x-2 ${isPriority ? "text-[#00F2FF]" : "text-slate-700"}`} />
                  </div>
                );
              })
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 p-10 bg-[#00F2FF] text-[#020617] text-center rounded-sm">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Forensic Review Recommended</h2>
        <button 
          className="bg-[#020617] text-white px-8 py-4 font-black uppercase text-xs tracking-widest flex items-center gap-3 mx-auto mt-6 hover:bg-slate-800 transition-all shadow-xl"
          onClick={() => {
            const calendlyBase = 'https://calendly.com/hello-bmradvisory/forensic-review';
            const params = `?email=${encodeURIComponent(userEmail)}&a1=${encodeURIComponent(userRole)}`;
            window.open(`${calendlyBase}${params}`, '_blank');
          }}
        >
          Schedule Forensic Review <Calendar className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
