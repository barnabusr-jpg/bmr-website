"use client";

import React from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] border-t border-slate-900 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* LOGO SECTION */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="bg-slate-800 p-2 rounded-sm group-hover:bg-red-600 transition-colors">
                <Activity size={18} className="text-white" />
              </div>
              <span className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">
                BMR<span className="text-slate-500 group-hover:text-red-600 transition-colors">SOLUTIONS</span>
              </span>
            </Link>
            <p className="text-[10px] font-mono text-slate-600 uppercase leading-relaxed tracking-widest">
              Structural hardening for AI logic systems. Eliminating systemic decay before operational failure.
            </p>
            
            {/* 🛡️ DELETED: [ ADMIN_SESSION_START ] removed to consolidate access point */}
          </div>

          {/* FORENSIC TIERS */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 italic">Forensic Tiers</h4>
            <ul className="space-y-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              <li className="hover:text-red-600 cursor-default transition-colors">Drift Diagnostics</li>
              <li className="hover:text-red-600 cursor-default transition-colors">Structural Hardening</li>
              <li className="hover:text-red-600 cursor-default transition-colors">Logic Reconstruction</li>
            </ul>
          </div>

          {/* SYSTEM STATUS */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 italic">System Status</h4>
            <div className="space-y-2">
               <div className="flex items-center gap-2">
                 <div className="w-1 h-1 bg-red-600 rounded-full animate-pulse" />
                 <span className="text-[9px] font-mono text-red-600 uppercase tracking-widest">Probe Status: Active</span>
               </div>
               <p className="text-[8px] font-mono text-slate-700 uppercase tracking-widest leading-tight">
                 Node Identifier: BMR_V3_NY<br />
                 Fidelity Check: 0.002ms<br />
                 Security Level: ALPHA-7
               </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-900/50 gap-4">
          <p className="text-[8px] font-mono text-slate-700 uppercase tracking-[0.3em]">
            © {currentYear} BMR SOLUTIONS GLOBAL. PRIVACY PROTOCOLS ENABLED.
          </p>
          <div className="flex gap-8 text-[8px] font-mono text-slate-700 uppercase tracking-[0.3em]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span className="text-slate-800 italic">Terminal Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
