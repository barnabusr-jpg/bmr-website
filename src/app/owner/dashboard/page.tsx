'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Activity, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function OwnerDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/owner/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const releaseAudit = async (projectId: string) => {
    const res = await fetch('/api/owner/release-audit', {
      method: 'POST',
      body: JSON.stringify({ projectId })
    });
    if (res.ok) {
      // Refresh local state
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, auditReleased: true } : p));
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-mono text-xs text-slate-400">
      <Loader2 className="animate-spin mr-2" size={14} /> INITIALIZING_AUDIT_QUEUE...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-12 text-slate-900 font-sans">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.3em] mb-2">BMR_ADVISORY_FORENSICS</h1>
          <h2 className="text-3xl font-bold tracking-tight">Audit Control Terminal</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono text-slate-400 uppercase">Status: Session_Active</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-mono text-[10px] uppercase tracking-widest">
                <th className="p-5">Client_Entity</th>
                <th className="p-5">Intake_Status</th>
                <th className="p-5">Tri-Lens_Progress</th>
                <th className="p-5 text-right">Operational_Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project: any) => (
                <tr key={project.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{project.companyName}</p>
                    <p className="text-[10px] text-slate-400 font-mono uppercase">{project.id}</p>
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100 uppercase">
                      <CheckCircle2 size={10} /> Intake_Complete
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex gap-3 items-center">
                      <ProgressDot active={project.progress.exec} label="EXE" />
                      <ProgressDot active={project.progress.mgr} label="MGR" />
                      <ProgressDot active={project.progress.tech} label="TEC" />
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    {!project.auditReleased ? (
                      <button 
                        onClick={() => releaseAudit(project.id)}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition shadow-sm"
                      >
                        <Mail size={12} /> Release Tri-Lens Scan
                      </button>
                    ) : (
                      <a 
                        href={`/owner/review/${project.id}`}
                        className="inline-flex items-center gap-2 border border-slate-200 hover:bg-slate-100 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition"
                      >
                        <Activity size={12} /> View Radiology Scan
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

const ProgressDot = ({ active, label }: { active: boolean, label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className={`h-1.5 w-6 rounded-full ${active ? 'bg-blue-600' : 'bg-slate-200'}`} />
    <span className="text-[8px] font-mono text-slate-400 font-bold">{label}</span>
  </div>
);
