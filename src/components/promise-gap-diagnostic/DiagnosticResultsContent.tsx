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
import { ShieldAlert, Activity, Calendar, Lock, ShieldCheck } from "lucide-react";
import { useRouter } from 'next/router';

// --- TYPES & INTERFACES ---
interface ZoneData {
  max: number;
  aggregate: number;
  vectors: string[];
}

interface VaultData {
  HAI: ZoneData;
  AVS: ZoneData;
  IGF: ZoneData;
  email?: string;
  role?: string;
}

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

const getStatusLabel = (max: number) => {
  if (max >= 5) return { label: "Stage 4: Optimized", color: "#10B981" };
  if (max >= 3) return { label: "Stage 3: Integrated", color: "#00F2FF" };
  if (max >= 2) return { label: "Stage 2: Emerging", color: "#F59E0B" };
  return { label: "Stage 1: Not in Scope", color: "#EF4444" };
};

const DiagnosticResultsContent = () => {
  const router = useRouter();
  const [data, setData] = useState<VaultData | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('Executive');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const vaultData = localStorage.getItem('bmr_results_vault');
      if (vaultData && vaultData !== "undefined") {
        const parsed: VaultData = JSON.parse(vaultData);
        if (parsed.HAI && parsed.AVS && parsed.IGF) {
          setData(parsed);
          setUserEmail(parsed.email || 'Client');
          setUserRole(parsed.role || 'Executive');
          setIsReady(true);
        } else {
          router.push('/diagnostic');
        }
      } else {
        router.push('/diagnostic');
      }
    } catch (err) {
      console.error("Forensic Vault initialization failed:", err);
      router.push('/diagnostic');
    }
  }, [router]);

  if (!isReady || !data) {
    return (
      <div className="py-20 text-center">
        <div className="text-slate-500 uppercase tracking-widest text-[10px] animate-pulse font-bold">
          Initialising Forensic Topology...
        </div>
      </div>
    );
  }

  const chartData = [
    { zone: 'HAI (Human)', value: data.HAI.aggregate },
    { zone: 'AVS (Adoption)', value: data.AVS.aggregate },
    { zone: 'IGF (Governance)', value: data.IGF.aggregate },
  ];

  const handleCalendlyOpen = () => {
    const calendlyBase = 'https://calendly.com/hello-bmradvisory/forensic-review';
    const scoreSummary = `HAI:${data.HAI.aggregate}|AVS:${data.AVS.aggregate}|IGF:${data.IGF.aggregate}`;
    const params = `?email=${encodeURIComponent(userEmail)}&a1=${encodeURIComponent(userRole)}&a2=${encodeURIComponent(scoreSummary)}`;
    window.open(`${calendlyBase}${params}`, '_blank');
  };

  return (
    <div className="py-8 space-y-12">
      {/* HEADER: Forensic Validation */}
      <div className="border-l-2 border-[#00F2FF] bg-slate-900/40 p-8 backdrop-blur-sm animate-in fade-in slide-in-from-left duration-700">
        <h3 className="text-[#00F2FF] text-[10px] uppercase tracking-[4px] font-bold mb-3 flex items-center gap-2">
           <ShieldCheck className="h-3 w-3" /> Signal Intensity Captured
        </h3>
        <p className="text-white font-bold text-lg mb-2 italic uppercase tracking-tighter">{userRole} Perspective Active</p>
        <p className="text-slate-400 text-xs italic mb-4 max-w-xl leading-relaxed">{lensDefinitions[userRole]}</p>
        <p className="text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-4 font-medium">
          Report dispatched to <span className="text-white font-semibold underline decoration-[#00F2FF] underline-offset-4">{userEmail}</span>.
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
                <PolarRadiusAxis angle={30} domain={[0, 50]} tick={false} axisLine={false} />
                <PolarAngleAxis dataKey="zone" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                <Radar name="Pressure" dataKey="value" stroke="#00F2FF" fill="#00F2FF" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* MATURITY BENCHMARKS */}
        <div className="space-y-4">
          {(['HAI', 'AVS', 'IGF'] as const).map((zone) => {
            const status = getStatusLabel(data[zone].max);
            return (
              <Card key={zone} className="p-6 bg-slate-900/40 border-slate-800 transition-all hover:bg-slate-900/60">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest">{zone} ZONE</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase" style={{ backgroundColor: `${status.color}20`, color: status.color }}>
                    {status.label}
                  </span>
                </div>
                <div className="text-2xl font-bold italic uppercase text-white tracking-tighter">
                  {data[zone].aggregate} <span className="text-[10px] font-normal text-slate-600">Points</span>
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

      {/* SYSTEMIC NEUTRALIZATION ROADMAP - LOCKED TEASER */}
      <div className="pt-12 border-t border-slate-800 relative">
        <div className="mb-10">
          <h3 className="text-xl font-bold italic uppercase flex items-center gap-3 text-white tracking-tighter">
            <ShieldAlert className="h-5 w-5 text-[#00F2FF]" /> Systemic Neutralization Roadmap
          </h3>
          <p className="mt-4 text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed max-w-3xl font-bold">
            <span className="text-[#00F2FF]">Forensic Note:</span> Recommended vectors are filtered. Calibration is required to unlock full implementation.
          </p>
        </div>

        {/* TEASER OVERLAY */}
        <div className="absolute inset-x-0 bottom-0 top-[100px] z-20 bg-slate-950/70 backdrop-blur-md flex flex-col items-center justify-center border border-slate-800/50 rounded-sm p-12 text-center transition-all">
          <Lock className="h-8 w-8 text-[#00F2FF] mb-4 animate-pulse" />
          <h4 className="text-white font-black italic uppercase text-lg tracking-tighter underline decoration-[#00F2FF] underline-offset-8">Review Required</h4>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mt-6 max-w-sm leading-relaxed font-bold">
            Neutralization vectors for the <span className="text-[#00F2FF]">{userRole} lens</span> are restricted. Schedule a 1-on-1 review to finalize your deployment roadmap.
          </p>
          <button 
            className="mt-8 bg-[#00F2FF] text-[#020617] px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-2xl active:scale-95"
            onClick={handleCalendlyOpen}
          >
            Unlock Full Roadmap
          </button>
        </div>

        {/* VECTOR GRID: Remains in background for visual depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-10 pointer-events-none grayscale">
          {(['HAI', 'AVS', 'IGF'] as const).map((zone) => (
            <div key={zone} className="space-y-4">
              <div className="px-1 border-b border-slate-800 pb-2">
                <h4 className="text-[11px] font-black text-white uppercase tracking-tighter italic">{zone} Strategic Targets</h4>
                <p className="text-[9px] text-slate-600 uppercase tracking-widest font-bold">{zoneFunctionalRoles[zone]}</p>
              </div>
              <div className="p-5 border border-slate-800 bg-slate-900/20 h-24" />
              <div className="p-5 border border-slate-800 bg-slate-900/20 h-24" />
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="mt-12 p-12 bg-[#00F2FF] text-[#020617] text-center rounded-sm shadow-[0_0_50px_rgba(0,242,255,0.15)]">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Begin Forensic Calibration</h2>
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Neutralize maturity gaps through role-aware strategy</p>
        <button 
          className="bg-[#020617] text-white px-10 py-5 font-black uppercase text-xs tracking-[0.2em] flex items-center gap-3 mx-auto hover:bg-slate-800 transition-all shadow-xl active:scale-95"
          onClick={handleCalendlyOpen}
        >
          Begin Calibration <Calendar className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
