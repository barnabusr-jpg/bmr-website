"use client";

import React from 'react';
import Link from 'next/link';
import { Activity, Shield, Terminal, Lock } from 'lucide-react';

export default function Footer() {
  const forensicTiers = [
    { name: "DRIFT DIAGNOSTICS", href: "/protocols/rapid-de-risk" },
    { name: "STRUCTURAL HARDENING", href: "/protocols/structural-hardening" },
    { name: "LOGIC RECONSTRUCTION", href: "/protocols/expertise-recovery" }
  ];

  return (
    <footer className="bg-[#020617] border-t border-slate-900 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          
          {/* IDENTIFIER NODE */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="bg-slate-900 p-2 border border-slate-800 group-hover:border-red-600 transition-colors">
                <Activity size={18} className="text-red-600" />
              </div>
              <span className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">
                BMR<span className="text-red-600">SOLUTIONS</span>
              </span>
            </div>
            <p className="text-slate-500 text-[11px] font-bold leading-relaxed max-w-sm italic uppercase tracking-tight">
              We do not provide optimization services. We provide structural hardening. 
              We eliminate systemic decay before it results in operational failure.
            </p>
            <div className="flex items-center gap-4 text-[9px] font-mono text-red-900 font-bold uppercase tracking-[0.4em]">
              <Lock size={12} className="animate-pulse" /> END-TO-END ENCRYPTION ACTIVE
            </div>
          </div>

          {/* NAVIGATION NODES */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.4em] text-slate-700 uppercase italic">FORENSIC TIERS</h4>
            <nav className="flex flex-col gap-4">
              {forensicTiers.map((tier) => (
                <Link 
                  key={tier.name} 
                  href={tier.href}
                  className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-red-600 transition-all hover:translate-x-1"
                >
                  {tier.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* SYSTEM STATUS NODE */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.4em] text-slate-700 uppercase italic">SYSTEM STATUS</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                <span className="text-[10px] font-mono text-red-600 font-black uppercase tracking-widest">
                  PROBE STATUS: ACTIVE
                </span>
              </div>
              <div className="text-[9px] font-mono text-slate-700 leading-loose uppercase tracking-tighter font-bold">
                NODE IDENTIFIER: BMR_V3_NY<br />
                FIDELITY CHECK: 0.002ms<br />
                SECURITY LEVEL: ALPHA-7
              </div>
            </div>
          </div>
        </div>

        {/* TERMINAL FOOTER */}
        <div className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 text-[9px] font-mono text-slate-800 font-bold uppercase tracking-[0.2em]">
            <span>© 2026 BMR SOLUTIONS GLOBAL</span>
            <Link href="/privacy" className="hover:text-red-900 transition-colors">PRIVACY PROTOCOLS</Link>
            <Link href="/terms" className="hover:text-red-900 transition-colors">ENGAGEMENT TERMS</Link>
          </div>
          
          <div className="flex items-center gap-3 font-mono text-[9px] text-slate-800 font-bold uppercase">
            <Terminal size={12} className="text-green-900" />
            <span className="tracking-[0.3em]">TERMINAL STATUS: <span className="text-green-700">OPERATIONAL</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
