import React, { useState } from 'react';
import { ShieldCheck, Lock, RefreshCcw, Activity } from 'lucide-react';

interface TriageParams {
  nodes: number;
  integrity: string;
  automation: number;
}

const ForensicTriageGrid = ({ onLock }: { onLock: (finalValue: number) => void }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [params, setParams] = useState<TriageParams>({
    nodes: 500,
    integrity: 'hybrid',
    automation: 60
  });

  const calculateValidatedHemorrhage = () => {
    const weights: Record<string, number> = { legacy: 1.45, hybrid: 1.0, modern: 0.85 };
    const baseNodeValue = params.nodes * 120000;
    const integrityFactor = weights[params.integrity] || 1.0;
    const result = baseNodeValue * integrityFactor * (Math.log10(params.automation + 20) / 2);
    return Math.round(result);
  };

  const handleLock = () => {
    const finalAuditValue = calculateValidatedHemorrhage();
    const existingVault = JSON.parse(localStorage.getItem('bmr_results_vault') || '{}');
    localStorage.setItem('bmr_results_vault', JSON.stringify({
      ...existingVault,
      validated_hemorrhage: finalAuditValue,
      calibration: params
    }));
    setIsLocked(true);
    onLock(finalAuditValue);
  };

  return (
    <div className="bg-slate-950 border-2 border-slate-900 p-8 my-8 relative overflow-hidden">
      <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
        <Activity size={120} />
      </div>
      <div className="flex items-center justify-between mb-8 border-b border-slate-900 pb-4">
        <h3 className="text-[#14b8a6] text-[10px] font-black uppercase tracking-[0.4em] italic flex items-center gap-2">
          <ShieldCheck size={14} /> Forensic Calibration Node
        </h3>
        <div className="text-[10px] font-mono text-slate-700">Ref: BMR_V3_CAL</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="space-y-3">
          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Node Density (FTE)</label>
          <input 
            type="number" 
            disabled={isLocked}
            value={params.nodes}
            onChange={(e) => setParams({...params, nodes: parseInt(e.target.value) || 0})}
            className="w-full bg-slate-900 border border-slate-800 p-4 text-white font-mono text-sm focus:border-[#14b8a6] outline-none disabled:opacity-30"
          />
        </div>
        <div className="space-y-3">
          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Integrity Baseline</label>
          <select 
            disabled={isLocked}
            value={params.integrity}
            onChange={(e) => setParams({...params, integrity: e.target.value})}
            className="w-full bg-slate-900 border border-slate-800 p-4 text-white font-mono text-sm focus:border-[#14b8a6] outline-none appearance-none disabled:opacity-30"
          >
            <option value="legacy">LEGACY (5+ YRS)</option>
            <option value="hybrid">HYBRID (2-5 YRS)</option>
            <option value="modern">MODERN (NEW)</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Signal Depth (%)</label>
          <input 
            type="number" 
            disabled={isLocked}
            value={params.automation}
            onChange={(e) => setParams({...params, automation: parseInt(e.target.value) || 0})}
            className="w-full bg-slate-900 border border-slate-800 p-4 text-white font-mono text-sm focus:border-[#14b8a6] outline-none disabled:opacity-30"
          />
        </div>
      </div>
      <div className="flex justify-between items-center relative z-10">
        <p className="text-[10px] text-slate-600 italic uppercase font-mono max-w-xs leading-tight">
          *Calibration verifies the Rework Tax against confirmed node density.
        </p>
        <button 
          onClick={isLocked ? () => setIsLocked(false) : handleLock}
          className={`${isLocked ? 'text-slate-500' : 'bg-[#14b8a6] text-slate-950'} px-6 py-3 font-black uppercase text-[10px] tracking-widest flex items-center gap-2`}
        >
          {isLocked ? <><RefreshCcw size={14} /> Re-Calibrate</> : <><Lock size={14} /> Lock Audit</>}
        </button>
      </div>
    </div>
  );
};

export default ForensicTriageGrid;
