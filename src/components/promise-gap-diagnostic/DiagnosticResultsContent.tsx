import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ShieldAlert, Activity, ArrowRight, Calendar } from "lucide-react";

// --- (Keep your existing getStatusLabel function here) ---

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userRole, setUserRole] = useState<string>(''); // NEW: Role state

  useEffect(() => {
    const vaultData = localStorage.getItem('bmr_results_vault');
    if (vaultData) {
      const parsed = JSON.parse(vaultData);
      setData(parsed);
      if (parsed.email) setUserEmail(parsed.email);
      if (parsed.role) setUserRole(parsed.role); // Capture Role
    }
  }, []);

  if (!data) return <div className="py-20 text-center uppercase tracking-widest text-xs animate-pulse">Initialising Forensic Topology...</div>;

  const chartData = [
    { zone: 'HAI (Human)', value: data.HAI.aggregate, fullMark: 32 },
    { zone: 'AVS (Adoption)', value: data.AVS.aggregate, fullMark: 32 },
    { zone: 'IGF (Governance)', value: data.IGF.aggregate, fullMark: 32 },
  ];

  return (
    <div className="py-8 space-y-12">
      <div className="border-l-2 border-[#00F2FF] bg-slate-900/40 p-8 backdrop-blur-sm">
        <h3 className="text-[#00F2FF] text-[10px] uppercase tracking-[4px] font-bold mb-3">Signal Intensity Captured</h3>
        <p className="text-slate-300 text-sm leading-relaxed italic">
          Your clinical implication report for the <span className="text-white font-semibold">{userRole || 'Executive'}</span> perspective 
          has been dispatched to <span className="text-white font-semibold">{userEmail}</span>.
        </p>
      </div>
      {/* ... (Keep your existing Radar Chart and Vector UI code here) ... */}
    </div>
  );
};

export default DiagnosticResultsContent;
