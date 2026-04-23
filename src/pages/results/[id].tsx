"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Lock, Fingerprint, ArrowRight, Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query;
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const calculateForensics = async () => {
      // 1. Fetch both the Audit and the Operator Nodes
      const [auditRes, nodesRes] = await Promise.all([
        supabase.from('audits').select('*').eq('id', id).single(),
        supabase.from('operators').select('*').eq('audit_id', id)
      ]);

      if (auditRes.data && nodesRes.data) {
        const audit = auditRes.data;
        const nodes = nodesRes.data;

        // 2. Client-Side "Brain" Logic
        const results: any = {};
        nodes.forEach(n => {
          const persona = (n.persona_type || "").toUpperCase();
          const prefix = persona.includes("EXEC") ? "EXE" : persona.includes("MAN") ? "MGR" : "TEC";
          
          Object.entries(n.raw_responses || {}).forEach(([qId, val]: any) => {
            const answer = typeof val === 'object' ? val.answer : val;
            results[`${prefix}_${qId.replace(`${prefix}_`, '').padStart(2, '0')}`] = answer;
          });
        });

        let frictionScore = 0;
        const fractures = [];
        const tax = parseFloat(audit.rework_tax || "0");

        // --- Example Fracture Detection ---
        if (results.EXE_01 === "Yes" && results.TEC_01 === "No") {
          fractures.push({ id: "INDEMNITY", severity: "CRITICAL", desc: "Audit rights vs Logging gap." });
          frictionScore += 15;
        }
        if (results.MGR_02 === "Yes" && results.TEC_02 === "No") {
          fractures.push({ id: "REWORK", severity: "HIGH", desc: `Est. $${(tax * 0.4).toFixed(1)}M Leakage.` });
          frictionScore += 15;
        }

        setReport({
          org: audit.org_name,
          sfi: Math.min(frictionScore, 100),
          rework: tax,
          fractures: fractures
        });
      }
      setLoading(false);
    };

    calculateForensics();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-600 font-mono italic animate-pulse tracking-widest text-xs">SYNTHESIZING_NODES...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-24 px-6 font-sans">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center border-b border-slate-900 pb-8 mb-12">
          <h1 className="text-red-600 text-2xl font-black uppercase italic italic tracking-tighter">Forensic_Dossier // {report?.org}</h1>
          <Lock className="text-slate-700" size={20} />
        </header>

        {/* THE SHEAR ZONE GAUGE */}
        <div className="bg-black border border-slate-900 p-12 mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="flex-1">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4">THE <span className="text-red-600">SHEAR</span> ZONE</h2>
              <p className="text-slate-400 italic text-sm">Logic fractures detected: {report?.fractures.length}</p>
              
              <div className="mt-8 h-1 w-full bg-slate-900 overflow-hidden">
                <div 
                  className="h-full bg-red-600 transition-all duration-1000" 
                  style={{ width: `${report?.sfi}%` }}
                />
              </div>
            </div>

            <div className="bg-red-600/10 border border-red-600/30 p-10 text-center min-w-[200px]">
              <div className="text-7xl font-black italic">{report?.sfi}%</div>
              <p className="text-[10px] font-mono text-red-600 uppercase mt-2">SFI_DECAY_INDEX</p>
            </div>
          </div>
        </div>

        {/* FINANCIAL IMPACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
           <div className="bg-slate-950 border border-slate-900 p-8">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Annual_Rework_Tax</p>
              <div className="text-5xl font-black text-white italic">${report?.rework}M</div>
           </div>
           <div className="bg-slate-950 border border-slate-900 p-8 flex items-center justify-between group cursor-pointer hover:border-red-600 transition-all" onClick={() => router.push(`/deep-dive?id=${id}`)}>
              <div>
                <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-4">Action_Required</p>
                <div className="text-xl font-black uppercase italic">Initialize Protocol</div>
              </div>
              <ArrowRight className="text-red-600 group-hover:translate-x-2 transition-transform" />
           </div>
        </div>
      </div>
    </div>
  );
}
