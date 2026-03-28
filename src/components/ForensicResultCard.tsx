import React from 'react';
import { AlertTriangle, ShieldAlert, Activity, ArrowRight } from 'lucide-react';
import { DiagnosticResult, ProtocolTier } from '../lib/diagnosticEngine';

interface Props {
  result: DiagnosticResult;
  technicalScore?: number;
}

export default function ForensicResultCard({ result, technicalScore }: Props) {
  // Explicitly typing this object fixes the "Red" indexing error
  const protocolDetails: Record<ProtocolTier, { title: string; color: string; icon: any; desc: string }> = {
    DRIFT_DIAGNOSTICS: { 
      title: 'DRIFT DIAGNOSTICS', 
      color: 'text-blue-500', 
      icon: ShieldAlert, 
      desc: '4-week de-risking engagement.' 
    },
    STRUCTURAL_HARDENING: { 
      title: 'STRUCTURAL HARDENING', 
      color: 'text-red-600', 
      icon: Activity, 
      desc: '8-week architectural reinforcement.' 
    },
    LOGIC_RECONSTRUCTION: { 
      title: 'LOGIC RECONSTRUCTION', 
      color: 'text-purple-500', 
      icon: AlertTriangle, 
      desc: '12-week core rebuild.' 
    }
  };

  const protocol = protocolDetails[result.protocol];
  const divergence = technicalScore ? Math.abs(result.frictionIndex - technicalScore) : 0;

  return (
    <div className="border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      <div className="p-8 border-b border-slate-900 bg-slate-900/20">
        <div className="flex items-center gap-3 mb-6">
          {/* Using a component variable for the icon */}
          <protocol.icon className={`h-5 w-5 ${protocol.color}`} />
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">
            AUDIT_REPORT // {result.status}
          </span>
        </div>
        
        <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white mb-2">
          {result.frictionIndex}<span className="text-red-600 text-2xl">/100</span>
        </h2>
        <p className="text-slate-500 text-[10px] uppercase font-mono tracking-widest">Systemic Friction Index</p>
      </div>

      <div className="p-8 grid grid-cols-2 gap-8 border-b border-slate-900">
        {Object.entries(result.shearZones).map(([zone, value]) => (
          <div key={zone}>
            <div className="text-[9px] font-mono text-slate-500 uppercase mb-2">
              {zone.replace(/([A-Z])/g, ' $1')}
            </div>
            <div className="text-2xl font-black text-white italic">{(value * 10).toFixed(0)}%</div>
            <div className="h-1 bg-slate-900 mt-2 w-full">
              <div 
                className={`h-full transition-all duration-1000 ${value > 7 ? 'bg-red-600' : 'bg-slate-500'}`} 
                style={{ width: `${value * 10}%` }} 
              />
            </div>
          </div>
        ))}
      </div>

      {divergence > 20 && (
        <div className="p-6 bg-yellow-600/5 border-b border-yellow-600/20">
          <div className="flex gap-3 items-center text-yellow-600 mb-2">
            <AlertTriangle size={14} />
            <span className="font-bold text-[10px] uppercase tracking-widest">Strategic Divergence Detected</span>
          </div>
          <p className="text-[11px] text-slate-400 italic">Operational reality diverges by {divergence.toFixed(1)}%. Immediate triage required.</p>
        </div>
      )}

      <div className="p-8 bg-slate-900/40">
        <h4 className="text-white font-black uppercase italic mb-2 tracking-tight">Recommended: {protocol.title}</h4>
        <p className="text-slate-500 text-xs mb-8 italic">{protocol.desc}</p>
        <button className="w-full bg-red-600 text-white font-black py-5 uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all border border-red-600 flex items-center justify-center gap-3 group">
          Activate Protocol <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
