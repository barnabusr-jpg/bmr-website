import React from 'react';
import { AlertTriangle, ShieldAlert, Activity, ArrowRight, AlertCircle } from 'lucide-react';
import { DiagnosticResult, ProtocolTier } from '../lib/diagnosticEngine';

interface Props {
  result: DiagnosticResult;
  technicalScore?: number;
  onRestart?: () => void;
}

export default function ForensicResultCard({ result, technicalScore, onRestart }: Props) {
  // Hardened protocol details with explicit indexing to ProtocolTier
  const protocolDetails: Record<ProtocolTier, {
    title: string;
    color: string;
    icon: React.ComponentType<{className?: string}>;
    desc: string;
    urgency: string;
    cta: string;
  }> = {
    DRIFT_DIAGNOSTICS: {
      title: 'DRIFT DIAGNOSTICS',
      color: 'text-blue-500',
      icon: ShieldAlert,
      desc: '4-week de-risking engagement to isolate friction points before crystallization.',
      urgency: 'MONITOR',
      cta: 'INITIATE DIAGNOSTICS'
    },
    STRUCTURAL_HARDENING: {
      title: 'STRUCTURAL HARDENING',
      color: 'text-red-600',
      icon: Activity,
      desc: '8-week architectural reinforcement with targeted logic pathway hardening.',
      urgency: 'URGENT',
      cta: 'BEGIN HARDENING'
    },
    LOGIC_RECONSTRUCTION: {
      title: 'LOGIC RECONSTRUCTION',
      color: 'text-purple-500',
      icon: AlertTriangle,
      desc: '12-week comprehensive rebuild of core AI logic chains with forensic documentation.',
      urgency: 'CRITICAL',
      cta: 'START RECONSTRUCTION'
    }
  };

  // Logic: Match engine 'protocol' output to local UI config
  const protocol = protocolDetails[result.protocol];
  const divergence = technicalScore ? Math.abs(result.frictionIndex - technicalScore) : 0;
  const isCritical = result.frictionIndex > 75;

  const getSeverity = (value: number) => {
    if (value > 7) return 'CRITICAL';
    if (value > 4) return 'WARNING';
    return 'NORMAL';
  };

  return (
    <div className="border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Header Section */}
      <div className="p-8 border-b border-slate-900 bg-slate-900/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <protocol.icon className={`h-5 w-5 ${protocol.color}`} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">
              FORENSIC_AUDIT // {result.status}
            </span>
          </div>
          {isCritical && (
            <div className="flex items-center gap-2 text-red-600 animate-pulse">
              <AlertCircle size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest font-black">
                SYSTEM DECAY CRITICAL
              </span>
            </div>
          )}
        </div>

        <div className="flex items-end gap-4 mb-4">
          <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white">
            {result.frictionIndex}
            <span className="text-red-600 text-2xl">/100</span>
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isCritical ? 'bg-red-600' : 'bg-blue-500'}`} />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">
              {protocol.urgency} PRIORITY
            </span>
          </div>
        </div>
        <p className="text-slate-500 text-[10px] uppercase font-mono tracking-widest">
          SYSTEMIC FRICTION INDEX
        </p>
      </div>

      {/* Shear Zone Visualization */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-slate-900">
        {Object.entries(result.shearZones).map(([zone, value]) => (
          <div key={zone} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                {zone.replace(/([A-Z])/g, ' $1')}
              </div>
              <div className={`text-[9px] font-mono uppercase font-black ${
                getSeverity(value) === 'CRITICAL' ? 'text-red-600' :
                getSeverity(value) === 'WARNING' ? 'text-yellow-600' : 'text-green-500'
              }`}>
                {getSeverity(value)}
              </div>
            </div>
            <div className="text-2xl font-black text-white italic">
              {(value * 10).toFixed(0)}%
            </div>
            <div className="h-1 bg-slate-900 w-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  value > 7 ? 'bg-red-600' :
                  value > 4 ? 'bg-yellow-600' : 'bg-green-500'
                }`}
                style={{ width: `${value * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Divergence Alert */}
      {divergence > 20 && (
        <div className="p-6 bg-yellow-600/5 border-b border-yellow-600/20">
          <div className="flex gap-3 items-center text-yellow-600 mb-3">
            <AlertTriangle size={16} />
            <span className="font-bold text-[10px] uppercase tracking-widest font-black">
              STRATEGIC DIVERGENCE ALERT
            </span>
          </div>
          <p className="text-[11px] text-slate-400 italic leading-relaxed max-w-lg mb-4">
            Operational reality diverges by {divergence.toFixed(1)}%. This delta identifies a critical blind spot between leadership perception and deployment stability.
          </p>
          <button className="bg-yellow-600 text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors">
            SCHEDULE TRIAGE IMMEDIATELY
          </button>
        </div>
      )}

      {/* Action Section */}
      <div className="p-8 bg-slate-950">
        <h4 className="text-white font-black uppercase italic mb-2 tracking-tight">
          RECOMMENDED: {protocol.title}
        </h4>
        <p className="text-slate-500 text-xs italic tracking-wide mb-8 leading-relaxed max-w-md">
          {protocol.desc}
        </p>
        
        <button className="w-full bg-red-600 text-white font-black py-5 uppercase text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all border border-red-600 flex items-center justify-center gap-3 group">
          {protocol.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {onRestart && (
          <button 
            onClick={onRestart}
            className="w-full mt-6 text-[9px] font-mono text-slate-700 uppercase tracking-[0.2em] hover:text-red-600 transition-colors"
          >
            RE-INITIALIZE DIAGNOSTIC_NODE
          </button>
        )}
      </div>
    </div>
  );
}
