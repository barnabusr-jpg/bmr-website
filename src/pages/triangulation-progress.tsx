"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Clock, Activity, Lock, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";
import { useRouter } from 'next/router';

export default function TriangulationProgress() {
  const router = useRouter();
  const nodes = [
    { role: "Strategic Node (Executive)", status: "COMPLETED", color: "text-green-500", delay: 0, icon: <ShieldCheck className="text-green-500" /> },
    { role: "Operational Node (Managerial)", status: "AWAITING_SIGNAL", color: "text-red-600", delay: 12, icon: <Activity className="text-slate-600" /> },
    { role: "Technical Node (Implementation)", status: "AWAITING_SIGNAL", color: "text-red-600", delay: 18, icon: <Lock className="text-slate-600" /> }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white py-32 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="flex justify-between items-end mb-12">
           <div>
              <h1 className="text-4xl font-black uppercase italic tracking-tighter">Forensic Momentum</h1>
              <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.3em] mt-2">Verification Progress: 33%</p>
           </div>
        </div>

        <div className="space-y-6 mb-16">
          {nodes.map((node, i) => (
            <Card key={i} className={`p-8 bg-slate-950 border-slate-900 flex justify-between items-center relative overflow-hidden ${i === 0 ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-600'}`}>
              <div className="flex items-center gap-4">
                {node.icon}
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">{node.role}</p>
                  <p className={`text-[10px] font-mono ${node.color} uppercase`}>{node.status}</p>
                </div>
              </div>
              {node.delay > 0 && (
                <div className="text-right">
                  <p className="text-red-600 text-xs font-black uppercase tracking-tighter italic">
                    <AlertTriangle size={10} className="inline mr-1" />
                    +${node.delay}K / WK
                  </p>
                  <p className="text-[8px] text-slate-600 uppercase font-mono tracking-widest">Inherent Delay Liability</p>
                </div>
              )}
            </Card>
          ))}
        </div>

        <button 
           onClick={() => router.push('/forensic-verdict')}
           className="w-full bg-slate-900 border border-slate-800 py-8 text-slate-500 font-black uppercase italic tracking-[0.4em] text-[11px] hover:border-red-600 hover:text-white transition-all flex items-center justify-center gap-4 group"
        >
           Bypass Verification (View Partial Verdict) <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
}
