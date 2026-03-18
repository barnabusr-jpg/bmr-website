import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Radar as RechartsRadar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Lock } from "lucide-react";
import { useRouter } from 'next/router';

const DiagnosticResultsContent = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const vault = localStorage.getItem('bmr_results_vault');
    if (vault) setData(JSON.parse(vault));
    else router.push('/diagnostic');
  }, [router]);

  if (!data) return <div className="py-20 text-center text-slate-500 text-xs uppercase tracking-widest animate-pulse">Initializing Topology...</div>;

  // IP PROTECTION: Mapping internal data keys to abstracted Chart labels
  const chartData = [
    { zone: 'VECTOR 01', value: Math.round(data.HAI.aggregate) },
    { zone: 'VECTOR 02', value: Math.round(data.AVS.aggregate) },
    { zone: 'VECTOR 03', value: Math.round(data.IGF.aggregate) },
  ];

  return (
    <div className="py-8 space-y-12 font-sans text-white">
      <div className="border-l-2 border-[#00F2FF] bg-slate-900/40 p-8">
        <h3 className="text-[#00F2FF] text-[10px] uppercase tracking-[4px] font-bold mb-3">Signal Intensity Captured</h3>
        <p className="text-white font-bold text-lg italic uppercase">{data.role} Perspective Active</p>
        <p className="text-slate-400 text-xs mt-2 italic uppercase tracking-wider">Analysis dispatched to {data.email}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8 bg-slate-900/20 border-slate-800">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#1e293b" />
                <PolarRadiusAxis angle={30} domain={[0, 96]} tick={false} axisLine={false} />
                {/* Labels now show VECTOR 01, 02, 03 instead of HAI, AVS, IGF */}
                <PolarAngleAxis dataKey="zone" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                <RechartsRadar name="Intensity" dataKey="value" stroke="#00F2FF" fill="#00F2FF" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-4">
          {['HAI', 'AVS', 'IGF'].map((z, index) => (
            <Card key={z} className="p-6 bg-slate-900/40 border-slate-800">
              {/* FIXED: Replaced acronyms and "ZONE" with Vector nomenclature */}
              <span className="text-[10px] font-bold text-[#00F2FF] uppercase tracking-widest">
                Observation Vector 0{index + 1}
              </span>
              <div className="text-2xl font-bold italic text-white uppercase mt-1">
                {Math.round(data[z].aggregate)} <span className="text-[10px] font-normal text-slate-600">Pts</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-12 border-t border-slate-800">
        <div className="relative p-16 border border-[#00F2FF]/20 bg-slate-900/40 rounded-sm text-center">
          <Lock className="h-12 w-12 text-[#00F2FF] mx-auto mb-6 animate-pulse" />
          <h4 className="text-white font-black uppercase italic tracking-tighter text-2xl mb-4">Strategic Targets Encrypted</h4>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest leading-relaxed max-w-md mx-auto mb-10 text-balance">
            Neutralization vectors for the {data.role} lens are accessible via your diagnostic review session.
          </p>
          <button 
            className="bg-[#00F2FF] text-[#020617] px-10 py-5 font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white transition-all shadow-2xl"
            onClick={() => window.open(`https://calendly.com/hello-bmradvisory/forensic-review?email=${encodeURIComponent(data.email)}&name=${encodeURIComponent(data.name)}`, '_blank')}
          >
            Unlock Forensic Review <ArrowRight className="inline h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
