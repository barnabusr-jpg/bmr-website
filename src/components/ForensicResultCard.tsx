import React from 'react';
import { AlertTriangle, ShieldAlert, Activity, Zap } from 'lucide-react';
import { DiagnosticResult } from '../lib/diagnosticEngine';

interface Props {
  result: DiagnosticResult;
  technicalScore?: number;
}

export default function ForensicResultCard({ result, technicalScore }: Props) {
  const protocolDetails = {
    DRIFT_DIAGNOSTICS: { title: 'DRIFT DIAGNOSTICS', color: 'text-blue-500', icon: ShieldAlert, desc: '4-week de-risking engagement.' },
    STRUCTURAL_HARDENING: { title: 'STRUCTURAL HARDENING', color: 'text-red-600', icon: Activity, desc: '8-week architectural reinforcement.' },
    LOGIC_RECONSTRUCTION: { title: 'LOGIC RECONSTRUCTION', color: 'text-purple-500', icon: AlertTriangle, desc: '12-week core rebuild.' }
  };

  const protocol = protocolDetails[result.protocol];
  const divergence = technicalScore ? Math.abs(result.frictionIndex - technicalScore) : 0;

  return (
    <div className="border border-slate-800 bg-slate-900/50 overflow-hidden">
      <div className="p-8 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <protocol.icon className={`h-5 w-5 ${protocol.color}`} />
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">
            AUDIT_REPORT // {result.status}
          </span>
        </div>
        
        <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white mb-2">
          {result.frictionIndex}<span className="text-red-600">/100</span>
        </h2>
        <p className="text-slate-400 text-sm uppercase font-mono tracking-widest">Systemic Friction Index</p>
      </div>

      <div className="p-8 grid grid-cols-2 gap-8 border-b border-slate-800">
        {Object.entries(result.shearZones).map(([zone, value]) => (
          <div key={zone}>
            <div className="text-[9px] font-mono text-slate-500 uppercase mb-2">{zone}</div>
            <div className="text-2xl font-black text-white italic">{value * 10}%</div>
            <div className={`h-1 mt-2 ${value > 7 ? 'bg-red-600' : 'bg-slate-700'}`} style={{ width: `${value * 10}%` }} />
          </div>
        ))}
      </div>

      {divergence > 20 && (
        <div className="p-6 bg-yellow-600/10 border-b border-yellow-600/30">
          <div className="flex gap-3 items-center text-yellow-600 mb-2">
            <AlertTriangle size={16} />
            <span className="font-bold text-[10px] uppercase tracking-widest">Strategic Divergence Detected</span>
          </div>
          <p className="text-xs text-slate-300 italic">Operational reality diverges by {divergence.toFixed(1)}%. Immediate triage required.</p>
        </div>
      )}

      <div className="p-8 bg-slate-950">
        <h4 className="text-white font-black uppercase italic mb-4">Recommended: {protocol.title}</h4>
        <p className="text-slate-400 text-sm mb-8 italic">{protocol.desc}</p>
        <button className="w-full bg-red-600 text-white font-black py-5 uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all border border-red-600">
          Initialize Protocol Activation
        </button>
      </div>
    </div>
  );
}
