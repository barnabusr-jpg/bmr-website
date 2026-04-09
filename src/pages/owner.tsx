"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Activity, CheckCircle2, ShieldAlert } from "lucide-react";

export default function OwnerDashboard() {
  const [projects, setProjects] = useState([]);

  // Mock data showing triangulation logic
  useEffect(() => {
    setProjects([
      { id: "PROJ-772", companyName: "Nexus Financial", progress: { exec: true, mgr: false, tech: true }, auditReleased: false, email: "ceo@nexus.com" }
    ]);
  }, []);

  const releaseAudit = async (id: string) => {
    // This calls the Lib function below
    alert("TRIANGULATION_INCOMPLETE // ACCESS_DENIED");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      <main className="pt-32 px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-black italic uppercase text-red-600 mb-12">Audit_Control_Terminal</h1>
        <div className="bg-slate-950 border border-slate-900 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 font-mono text-[10px] uppercase text-slate-500 italic">
              <tr>
                <th className="p-6">Client_Entity</th>
                <th className="p-6">Tri_Lens_Signal</th>
                <th className="p-6 text-right">Operational_Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-6">
                    <p className="font-black text-white italic">{p.companyName}</p>
                    <p className="text-[10px] font-mono text-slate-600 uppercase">{p.id}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-4">
                      <div className={`h-1 w-8 ${p.progress.exec ? 'bg-red-600' : 'bg-slate-800'}`} />
                      <div className={`h-1 w-8 ${p.progress.mgr ? 'bg-red-600' : 'bg-slate-800'}`} />
                      <div className={`h-1 w-8 ${p.progress.tech ? 'bg-red-600' : 'bg-slate-800'}`} />
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      disabled={!(p.progress.exec && p.progress.mgr && p.progress.tech)}
                      onClick={() => releaseAudit(p.id)}
                      className="bg-red-600 disabled:bg-slate-800 px-4 py-2 text-[10px] font-black uppercase italic tracking-widest text-white"
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
