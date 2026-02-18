import React, { useEffect, useState } from 'react';
import { Calendar } from "lucide-react";

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

  if (!data) return <div className="py-20 text-center uppercase tracking-widest text-xs animate-pulse text-slate-500">Initialising...</div>;

  return (
    <div className="py-8 space-y-12">
      <div className="border-l-2 border-cyan-400 bg-slate-900/40 p-8 backdrop-blur-sm">
        <h3 className="text-cyan-400 text-[10px] uppercase tracking-[4px] font-bold mb-3">Signal Intensity Captured</h3>
        <p className="text-slate-300 text-sm italic">
          Your report for the <span className="text-white font-semibold">{userRole || 'Executive'} perspective</span> has been dispatched to <span className="text-white font-semibold">{userEmail}</span>.
        </p>
      </div>

      <div className="mt-12 p-10 bg-cyan-400 text-black text-center rounded-sm">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Forensic Review Recommended</h2>
        <button 
          className="bg-black text-white px-8 py-4 font-black uppercase text-xs tracking-widest flex items-center gap-3 mx-auto mt-6"
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
