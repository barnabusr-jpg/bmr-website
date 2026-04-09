"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OwnerDashboard() {
  const [projects, setProjects] = useState([
    { id: "PROJ-772", companyName: "Nexus Financial", progress: { exec: true, mgr: false, tech: true }, auditReleased: false }
  ]);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      <main className="pt-40 pb-20 px-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h1 className="text-6xl font-black italic uppercase text-red-600 leading-none">Audit_Control_Terminal</h1>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.4em]">Node_Status: Secure</p>
        </div>
        
        <div className="bg-slate-950 border border-slate-900 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 font-mono text-[10px] uppercase text-slate-500 italic">
              <tr>
                <th className="p-8">Client_Entity</th>
                <th className="p-8">Tri_Lens_Signal_Status</th>
                <th className="p-8 text-right">Operational_Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/40 transition-colors group">
                  <td className="p-8">
                    <p className="font-black text-xl text-white italic group-hover:text-red-600 transition-colors uppercase">{p.companyName}</p>
                    <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mt-1">{p.id}</p>
                  </td>
                  <td className="p-8">
                    <div className="flex gap-4">
                      {['EXEC', 'MGR', 'TECH'].map((label, i) => {
                        const active = Object.values(p.progress)[i];
                        return (
                          <div key={label} className="space-y-2 text-center">
                            <div className={`h-1.5 w-12 ${active ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-slate-800'}`} />
                            <span className={`text-[8px] font-mono font-bold ${active ? 'text-red-600' : 'text-slate-700'}`}>{label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="p-8 text-right">
                    <button 
                      disabled={!(p.progress.exec && p.progress.mgr && p.progress.tech)}
                      className="bg-red-600 disabled:bg-slate-800 px-8 py-4 text-[10px] font-black uppercase italic tracking-widest text-white transition-all hover:bg-white hover:text-black"
                    >
                      Release Tri-Lens Scan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
