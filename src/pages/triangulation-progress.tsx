"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Activity, Lock, ShieldCheck, AlertTriangle, ArrowRight, Clock } from "lucide-react";
import { useRouter } from 'next/router';
import { supabase } from "@/lib/supabaseClient";

export default function TriangulationProgress() {
  const router = useRouter();
  const { id: auditId } = router.query;
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    if (!auditId) return;

    const syncNodes = async () => {
      const { data } = await supabase
        .from('operators')
        .select('role, status, persona_type')
        .eq('audit_id', auditId);
      
      if (data) {
        setNodes(data);
        
        // AUTO-TRIGGER: If all 3 nodes are done, fire the synthesis engine
        const completed = data.filter(n => n.status?.toLowerCase() === 'completed').length;
        if (completed === 3) {
          await fetch('/api/synthesize-fracture', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ auditId })
          });
        }
      }
    };

    syncNodes();
    const interval = setInterval(syncNodes, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [auditId]);

  return (
    <div className="min-h-screen bg-[#020617] text-white py-32 px-6 font-sans">
      <div className="container mx-auto max-w-3xl">
        <div className="flex justify-between items-end mb-12">
           <h1 className="text-4xl font-black uppercase italic tracking-tighter">Forensic Momentum</h1>
           <div className="flex items-center gap-2 text-red-600 font-mono text-[10px]">
             <Clock size={14} /> LIVE_TRIANGULATION_ACTIVE
           </div>
        </div>

        <div className="space-y-6 mb-16">
          {nodes.map((node, i) => (
            <Card key={i} className={`p-8 bg-slate-950 border-slate-900 flex justify-between items-center border-l-4 ${node.status === 'completed' ? 'border-l-green-500' : 'border-l-red-600'}`}>
              <div className="flex items-center gap-4">
                {node.status === 'completed' ? <ShieldCheck className="text-green-500" /> : <Activity className="text-slate-600 animate-pulse" />}
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">{node.persona_type || "Node"}</p>
                  <p className={`text-[10px] font-mono ${node.status === 'completed' ? 'text-green-500' : 'text-red-600'} uppercase`}>
                    {node.status || "AWAITING_SIGNAL"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <button 
          onClick={() => router.push(`/results/${auditId}`)} 
          className="w-full bg-slate-900 border border-slate-800 py-8 text-slate-500 font-black uppercase italic tracking-[0.4em] text-[11px] hover:border-red-600 hover:text-white transition-all flex items-center justify-center gap-4 group"
        >
            Access Verified Results <ArrowRight size={16} className="group-hover:translate-x-2" />
        </button>
      </div>
    </div>
  );
}
