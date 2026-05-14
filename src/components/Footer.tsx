"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] border-t border-slate-900 pt-24 pb-12 px-6 md:px-12 text-left">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 mb-24">
        
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-red-600" />
            <span className="text-white font-black text-xl tracking-tighter italic uppercase">
              BMR<span className="text-red-600">SOLUTIONS</span>
            </span>
          </div>
          <p className="text-slate-500 font-mono text-[11px] uppercase tracking-[0.2em] leading-relaxed italic font-black">
            Structural hardening for autonomous logic systems. Verifying alignment between technical architecture and operational reality.
          </p>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-black text-[10px] tracking-[0.5em] uppercase italic">FORENSIC_VERTICLES</h4>
          <ul className="space-y-4 font-mono text-[11px] text-slate-500 uppercase tracking-widest italic font-black">
            <li className="hover:text-red-600 cursor-default transition-colors">DRIFT_DIAGNOSTICS</li>
            <li className="hover:text-red-600 cursor-default transition-colors">STRUCTURAL_HARDENING</li>
            <li className="hover:text-red-600 cursor-default transition-colors">LOGIC_RECONSTRUCTION</li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-black text-[10px] tracking-[0.5em] uppercase italic">SYSTEM_STATUS</h4>
          <div className="space-y-4 font-mono text-[11px] uppercase tracking-widest italic leading-loose font-black">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-red-600 font-black">AUDIT_MODE: LIVE_COLLECTION</span>
            </div>
            <p className="text-slate-700">
              NODE_ID: BMR_V3_NY<br />
              LATENCY_CHECK: 0.002ns<br />
              SECURITY_CLEARANCE: ALPHA-7
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center border-t border-slate-900 pt-12 gap-8">
        <p className="text-slate-700 font-mono text-[9px] uppercase tracking-[0.4em] italic font-black">
          © {currentYear} BMR SOLUTIONS GLOBAL. PRIVACY_PROTOCOLS_ENABLED.
        </p>
        <div className="flex gap-10 font-mono text-[9px] text-slate-700 uppercase tracking-[0.4em] italic font-black">
          <Link href="/privacy" className="hover:text-white transition-colors no-underline">PRIVACY</Link>
          <Link href="/terms" className="hover:text-white transition-colors no-underline">TERMS</Link>
          <span className="text-slate-900 select-none">// TERMINAL_STATUS: OPERATIONAL</span>
        </div>
      </div>
    </footer>
  );
}
