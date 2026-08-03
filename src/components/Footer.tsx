"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 border-t border-slate-200 pt-20 pb-12 px-6 md:px-12 text-left text-slate-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
        
        {/* BRAND SUMMARY */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-[2px] bg-red-700" />
            <span className="text-slate-950 font-black text-xl tracking-tight uppercase">
              BMR <span className="text-red-700">SOLUTIONS</span>
            </span>
          </div>
          <p className="text-slate-600 font-sans text-xs leading-relaxed max-w-sm">
            Structural hardening for autonomous logic systems. Verifying alignment between technical architecture and operational reality.
          </p>
        </div>

        {/* VERTICALS */}
        <div className="space-y-4">
          <h4 className="text-slate-950 font-mono font-bold text-xs tracking-wider uppercase">// FORENSIC VERTICALS</h4>
          <ul className="space-y-2 font-mono text-xs text-slate-600 uppercase tracking-wider">
            <li className="hover:text-red-700 cursor-default transition-colors">DRIFT DIAGNOSTICS</li>
            <li className="hover:text-red-700 cursor-default transition-colors">STRUCTURAL HARDENING</li>
            <li className="hover:text-red-700 cursor-default transition-colors">LOGIC RECONSTRUCTION</li>
          </ul>
        </div>

        {/* SYSTEM STATUS */}
        <div className="space-y-4">
          <h4 className="text-slate-950 font-mono font-bold text-xs tracking-wider uppercase">// SYSTEM STATUS</h4>
          <div className="space-y-2 font-mono text-xs uppercase tracking-wider leading-relaxed">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-700 animate-pulse" />
              <span className="text-red-700 font-bold">AUDIT MODE: LIVE COLLECTION</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              NODE ID: BMR_V3_NY<br />
              LATENCY CHECK: 0.002ns<br />
              SECURITY CLEARANCE: ALPHA-7
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center border-t border-slate-200 pt-8 gap-4 font-mono text-[11px]">
        <p className="text-slate-500 uppercase tracking-wider">
          © {currentYear} BMR SOLUTIONS GLOBAL. PRIVACY PROTOCOLS ENABLED.
        </p>
        <div className="flex items-center gap-6 text-slate-600 uppercase tracking-wider font-semibold">
          <Link href="/privacy" className="hover:text-red-700 transition-colors no-underline">PRIVACY</Link>
          <Link href="/terms" className="hover:text-red-700 transition-colors no-underline">TERMS</Link>
          <span className="text-slate-400 select-none">// STATUS: OPERATIONAL</span>
        </div>
      </div>
    </footer>
  );
}
