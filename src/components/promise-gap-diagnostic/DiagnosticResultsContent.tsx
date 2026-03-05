import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ResponsiveContainer 
} from 'recharts';
import { ShieldAlert, Activity, ArrowRight, Calendar, Lock } from "lucide-react";
import { useRouter } from 'next/router';

// --- FORENSIC DEFINITIONS: Synchronized with Maturity Protocol ---
const lensDefinitions: Record<string, string> = {
  "Executive": "Focus: Internal Governance (IGF). Strategic alignment and long-term ROI stability.",
  "Manager": "Focus: Adoption Value (AVS). Workflow synchronization and operational friction.",
  "Technical": "Focus: Trust Architecture (HAI). Forensic accuracy and system reliability."
};

const zoneFunctionalRoles: Record<string, string> = {
  "HAI": "Detection Layer: Trust Calibration",
  "AVS": "Execution Layer: Value Realization",
  "IGF": "Stabilization Layer: Intent Maintenance"
};

const getVectorAffinity = (vector: string, role: string) => {
  const kws: Record<string, string[]> = {
    Executive: ["roi", "value", "strategic", "kpi", "alignment", "stewardship", "priorities"],
    Technical: ["logging", "telemetry", "security", "forensic", "compliance", "algorithmic", "instrument"],
    Manager: ["adoption", "workflow", "change", "friction", "governance", "readiness"]
  };
  const roleKws = kws[role] || kws.Executive;
  return roleKws.some(kw => vector.toLowerCase().includes(kw)) ? "Priority" : "Standard";
};

// UPDATED: Maturity Stage Status Mapping
const getStatusLabel = (max: number) => {
  if (max >= 5) return { label: "Stage 4: Optimized", color: "#10B981" };
  if (max >= 3) return { label: "Stage 3: Integrated", color: "#00F2FF" };
  if (max >= 2) return { label: "Stage 2: Emerging", color: "#F59E0B" };
  return { label: "Stage 1: Reactive", color: "#EF4444" };
};

const DiagnosticResultsContent = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('Executive');

  useEffect(() => {
    const vaultData = localStorage.getItem('bmr_results_vault');
    if (vaultData) {
      const parsed = JSON.parse(vaultData);
      setData(parsed);
      if (parsed.email) setUserEmail(parsed.email);
      if (parsed.role) setUserRole(parsed.role);
    } else {
      // Safety: if no data, user shouldn't be here
      router.push('/diagnostic');
    }
  }, [router]);

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
      {/* HEADER: Forensic Validation */}
      <div className="border-l-2 border-[#00F2FF] bg-slate-900/40 p-8 backdrop-blur-sm animate-in fade-in slide-in-from-left duration-700">
        <h3 className="text-[#00F2FF] text-[10px] uppercase tracking-[4px] font-bold mb-3">
          Signal Intensity Captured
        </h3>
        <p className="text-white font-bold text-lg mb-2 italic uppercase tracking-tighter">
          {userRole} Perspective Active
        </p>
        <p className="text-slate-400 text-xs italic mb-4 max-w-xl leading-relaxed">
          {lensDefinitions[userRole]}
        </p>
        <p className="text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-4">
          Your forensic report for the <span className="text-[#00F2FF] font-bold">{userRole} lens</span> has been dispatched to <span className="text-white font-semibold">{userEmail}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RADAR CHART: Organizational Displacement */}
        <Card className="lg:col-span-2 p-8 bg-slate-900/20 border-slate-800 backdrop-blur-xl shadow-2xl">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
            <Activity className="h-3 w-3 text-[#00F2FF]" /> Organizational Displacement (Intensity Points)
          </h3>
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#1e293b" />
                {/* FIXED DOMAIN: Handles Role Multipliers up to 50 */}
                <PolarRadiusAxis angle={30} domain={[0, 50]} tick={false} axisLine={false} />
                <PolarAngleAxis dataKey="zone" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                <Radar name="Pressure" dataKey="value" stroke="#00F2FF" fill="#00F2FF" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* MATURITY BENCHMARKS: Zone Pressure Metrics */}
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
                <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div 
                    className="h-full transition-all duration-1000" 
                    style={{ width: `${(data[zone].aggregate / 48) * 100}%`, backgroundColor: status.color }} 
                   />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* SYSTEMIC NEUTRALIZATION ROADMAP */}
      <div className="pt-12 border-t border-slate-800">
        <div className="mb-10">
          <h3 className="text-xl font-bold italic uppercase flex items-center gap-3 text-white">
            <ShieldAlert className="h-5 w-5 text-[#00F2FF]" /> Systemic Neutralization Roadmap
          </h3>
          <p className="mt-4 text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed max-w-3xl">
            <span className="text-[#00F2FF] font-bold">Forensic Note:</span> Recommended vectors are filtered to remove baseline maintenance and prioritize surgical actions based on your <span className="text-white italic">{userRole} lens</span>. High-priority targets indicate immediate variance neutralization requirements.
          </p>
        </div>

        {/* VECTOR GRID: HAI -> AVS -> IGF */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['HAI', 'AVS', 'IGF'].map((zone) => (
            <div key={zone} className="space-y-4">
              <div className="px-1 border-b border-slate-800 pb-2">
                <h4 className="text-[11px] font-black text-white uppercase tracking-tighter italic">{zone} Strategic Targets</h4>
                <p className="text-[9px] text-slate-600 uppercase tracking-widest font-bold">{zoneFunctionalRoles[zone]}</p>
              </div>
              
              {data[zone].vectors
                .filter((v: string) => v !== "Maintain Baseline")
                .sort((a: string) => getVectorAffinity(a, userRole) === "Priority" ? -1 : 1)
                .map((vector: string, idx: number) => {
                  const isPriority = getVectorAffinity(vector, userRole) === "Priority";
                  return (
                    <div key={`${zone}-${idx}`} className={`group relative p-5 border transition-all cursor-default ${
                      isPriority ? "border-[#00F2FF] bg-[#0A1F33]/40 shadow-[0_0_15px_rgba(0,242,255,0.1)]" : "border-slate-800 bg-slate-900/20"
                    }`}>
                      <div className="absolute top-2 right-2 opacity-20">
                        <span className="text-[7px] border border-slate-700 px-1 text-slate-500 uppercase font-mono">
                          PG-{zone}-{idx + 10}
                        </span>
                      </div>
                      
                      <div className="text-[#00F2FF] text-[9px] font-bold uppercase mb-1 tracking-tighter flex items-center gap-1">
                        {isPriority && <Lock className="h-2 w-2" />}
                        {isPriority ? "Priority Calibration" : "Forensic Target"}
                      </div>
                      <div className="text-slate-200 font-bold uppercase italic text-[11px] leading-tight">
                        {vector}
                      </div>
                      <ArrowRight className={`h-3 w-3 mt-4 transition-transform group-hover:translate-x-1 ${isPriority ? "text-[#00F2FF]" : "text-slate-700"}`} />
                    </div>
                  );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* CALL TO ACTION: Forensic Review */}
      <div className="mt-12 p-10 bg-[#00F2FF] text-[#020617] text-center rounded-sm shadow-[0_0_30px_rgba(0,242,255,0.2)]">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Schedule Forensic Review</h2>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Neutralize systemic drift through role-aware maturity calibration</p>
        <button 
          className="bg-[#020617] text-white px-8 py-4 font-black uppercase text-xs tracking-widest flex items-center gap-3 mx-auto hover:bg-slate-800 transition-all shadow-xl active:scale-95"
          onClick={() => {
            const calendlyBase = 'https://calendly.com/hello-bmradvisory/forensic-review';
            const params = `?email=${encodeURIComponent(userEmail)}&a1=${encodeURIComponent(userRole)}`;
            window.open(`${calendlyBase}${params}`, '_blank');
          }}
        >
          Begin Calibration <Calendar className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
