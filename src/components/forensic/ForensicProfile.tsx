"use client";
import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, Lock, Users, Activity } from 'lucide-react';

interface TriageData {
  name: string;
  email: string;
  organization: string;
  role: string;
  nodes: number;
  integrity: string;
}

interface ForensicProfileProps {
  onComplete: (data: TriageData) => void;
}

export const ForensicProfile = ({ onComplete }: ForensicProfileProps) => {
  const [formData, setFormData] = useState<TriageData>({
    name: '',
    email: '',
    organization: '',
    role: 'managerial',
    nodes: 500,
    integrity: 'hybrid'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate corporate email to maintain Institutional Authority
    if (!formData.email.includes('@')) return alert("Corporate Email Required");
    
    // Store in local storage to persist through the 12 questions
    localStorage.setItem('bmr_triage_baseline', JSON.stringify(formData));
    onComplete(formData);
  };

  return (
    <div className="bg-[#0a0a0a] p-10 border border-red-600/20 text-slate-100 font-sans min-h-[11in] w-full max-w-[8.5in] mx-auto relative overflow-hidden shadow-2xl">
      {/* Background Radar Detail for Brand Consistency */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <Activity size={400} className="text-red-600" />
      </div>

      <div className="relative z-10">
        <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <ShieldAlert size={14} className="text-red-600" />
          {"BMR-CF-2026-PROTOCOL-P-01 // INITIAL_TRIAGE"}
        </div>
        
        <h1 className="text-4xl font-bold tracking-tighter uppercase leading-none mb-2 italic">
          Forensic <span className="text-red-600">Pre-Flight</span> Triage
        </h1>
        <p className="text-slate-400 text-xs uppercase tracking-[0.3em] mb-12">
          Baseline Calibration Required
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
          {/* Identity Capture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
              <input 
                required 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                className="w-full bg-slate-900 border border-slate-800 p-3 text-white font-mono text-sm focus:border-red-600 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Corporate Email</label>
              <input 
                required 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                className="w-full bg-slate-900 border border-slate-800 p-3 text-white font-mono text-sm focus:border-red-600 outline-none" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Organization Name</label>
            <input 
              required 
              type="text" 
              value={formData.organization} 
              onChange={e => setFormData({...formData, organization: e.target.value})} 
              className="w-full bg-slate-900 border border-slate-800 p-3 text-white font-mono text-sm focus:border-red-600 outline-none" 
            />
          </div>

          {/* Structural Calibration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-900">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Users size={12} /> Authority
              </label>
              <select 
                value={formData.role} 
                onChange={e => setFormData({...formData, role: e.target.value})} 
                className="w-full bg-slate-900 border border-slate-800 p-3 text-white font-mono text-sm outline-none appearance-none"
              >
                <option value="executive">EXECUTIVE</option>
                <option value="managerial">MANAGERIAL</option>
                <option value="technical">TECHNICAL</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Node Density (FTE)</label>
              <input 
                required 
                type="number" 
                value={formData.nodes} 
                onChange={e => setFormData({...formData, nodes: parseInt(e.target.value) || 0})} 
                className="w-full bg-slate-900 border border-slate-800 p-3 text-red-600 font-bold font-mono text-sm outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Integrity</label>
              <select 
                value={formData.integrity} 
                onChange={e => setFormData({...formData, integrity: e.target.value})} 
                className="w-full bg-slate-900 border border-slate-800 p-3 text-white font-mono text-sm outline-none appearance-none"
              >
                <option value="legacy">LEGACY</option>
                <option value="hybrid">HYBRID</option>
                <option value="modern">MODERN</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-red-600 text-white py-5 font-black uppercase text-[12px] tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)] mt-8"
          >
            <Lock size={16} /> Initialize Diagnostic Protocol <ArrowRight size={16} />
          </button>
        </form>
      </div>

      <div className="absolute bottom-10 left-10 right-10 border-t border-red-600/10 pt-4 flex justify-between items-center font-mono text-[8px] text-slate-600 tracking-[0.3em]">
        <div>UNAUTHORIZED DISTRIBUTION PROHIBITED</div>
        <div>BASELINE VERIFICATION MANDATORY</div>
      </div>
    </div>
  );
};
