import React, { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Radar as RechartsRadar } from 'recharts';
import { ShieldAlert, Lock, ShieldCheck } from "lucide-react";

interface ResultsProps {
  answers: any[];
  userDetails: { name: string, email: string, org: string, role: string };
}

const DiagnosticResultsContent = ({ answers, userDetails }: ResultsProps) => {
  const totalScore = answers.reduce((acc, curr) => acc + (curr.weight || 0), 0);

  const getPillarScore = (lens: string) => {
    return answers
      .filter(a => a.lens === lens)
      .reduce((acc, curr) => acc + (curr.weight || 0), 0);
  };

  const chartData = [
    { zone: 'HAI', value: getPillarScore('HAI') },
    { zone: 'AVS', value: getPillarScore('AVS') },
    { zone: 'IGF', value: getPillarScore('IGF') },
  ];

  const status = totalScore > 60 ? { label: "CRITICAL BASELINE GAPS", color: "#EF4444" } : 
                 totalScore > 30 ? { label: "PROTOCOLIZED DRIFT", color: "#00F2FF" } : 
                 { label: "OPTIMIZED STEWARDSHIP", color: "#10B981" };

  useEffect(() => {
    // Dispatches result to API route for email automation
    fetch('/api/send-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userDetails,
        totalScore,
        zoneData: { HAI: getPillarScore('HAI'), AVS: getPillarScore('AVS'), IGF: getPillarScore('IGF') }
      })
    });
  }, []);

  const handleUnlock = () => {
    window.location.href = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(userDetails.name)}&email=${encodeURIComponent(userDetails.email)}`;
  };

  return (
    <div className="py-8 space-y-12 max-w-6xl mx-auto">
      <div className="border-l-2 border-[#00F2FF] bg-[#0A1F33]/40 p-8 backdrop-blur-sm">
        <h3 className="text-[#00F2FF] text-[10px] uppercase tracking-[4px] font-bold mb-3 flex items-center gap-2">
           <ShieldCheck className="h-3 w-3" /> Forensic Signal Captured
        </h3>
        <p className="text-white font-black text-2xl mb-2 italic uppercase tracking-tighter">{userDetails.role} Perspective Active</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8 bg-slate-900/20 border-slate-800">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="zone" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                <PolarRadiusAxis domain={[0, 28]} tick={false} axisLine={false} />
                <RechartsRadar name="Pressure" dataKey="value" stroke={status.color} fill={status.color} fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-10 bg-slate-900/40 border-slate-800 border-t-4 text-center" style={{ borderTopColor: status.color }}>
          <span className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase block mb-4">Total Displacement Score</span>
          <div className="text-7xl font-black italic uppercase text-white tracking-tighter mb-4">{totalScore}</div>
          <div className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: status.color }}>Status: {status.label}</div>
        </Card>
      </div>

      <div className="pt-12 border-t border-slate-800 relative">
        <h3 className="text-xl font-bold italic uppercase flex items-center gap-3 text-white tracking-tighter mb-8">
          <ShieldAlert className="h-5 w-5 text-[#00F2FF]" /> Surgical Neutralization Roadmap
        </h3>
        <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center border border-slate-800 rounded">
          <Lock className="h-8 w-8 text-[#00F2FF] mb-4" />
          <h4 className="text-white font-black italic uppercase text-lg tracking-tighter underline decoration-[#00F2FF] underline-offset-8">Review Required</h4>
          <button onClick={handleUnlock} className="mt-8 bg-[#00F2FF] text-[#020617] px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-2xl">
            Unlock Full Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
