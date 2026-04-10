"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, ShieldAlert, Users, Landmark, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForensics() {
      const { data: auditData, error } = await supabase
        .from('audits')
        .select(`
          id,
          created_at,
          sector,
          rework_tax,
          decay_pct,
          operators (
            full_name,
            email,
            entities ( name )
          )
        `)
        .order('created_at', { ascending: false });

      if (!error) setData(auditData);
      setLoading(false);
    }
    fetchForensics();
  }, []);

  const totalRework = data.reduce((acc, curr) => acc + (Number(curr.rework_tax) || 0), 0);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-red-600 animate-pulse">LOADING_FORENSIC_LEDGER...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 pt-24 font-sans">
      {/* 🛡️ Header: Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 border border-slate-800 p-6">
          <label className="text-[10px] font-mono text-red-600 uppercase tracking-widest block mb-2">Total_Rework_Tax_Identified</label>
          <div className="text-4xl font-black italic">${totalRework.toFixed(1)}M</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Active_Operators</label>
          <div className="text-4xl font-black italic">{data.length}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">System_Status</label>
          <div className="text-xl font-black italic text-green-500 uppercase flex items-center gap-2">
            <Activity size={20} /> Operational
          </div>
        </div>
      </div>

      {/* 📊 The Forensic Ledger */}
      <div className="bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <h2 className="font-black italic uppercase tracking-tighter">Diagnostic_History_Log</h2>
          <span className="text-[10px] font-mono text-slate-500 uppercase">Clearance: Alpha-7</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <th className="p-4">Timestamp</th>
              <th className="p-4">Operator/Entity</th>
              <th className="p-4">Sector</th>
              <th className="p-4 text-right">Decay</th>
              <th className="p-4 text-right">Rework Tax</th>
            </tr>
          </thead>
          <tbody className="font-mono text-xs">
            {data.map((audit) => (
              <tr key={audit.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors group">
                <td className="p-4 text-slate-500">
                  {new Date(audit.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="font-bold text-white uppercase">{audit.operators?.full_name || "Unknown"}</div>
                  <div className="text-[10px] text-slate-500">{audit.operators?.entities?.name || "Independent"}</div>
                </td>
                <td className="p-4 uppercase text-slate-400">{audit.sector}</td>
                <td className="p-4 text-right font-bold text-red-600">{audit.decay_pct}%</td>
                <td className="p-4 text-right font-bold text-white">${audit.rework_tax}M</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
