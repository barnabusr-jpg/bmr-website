"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12 px-6 md:px-12 text-left text-slate-700 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
        
        {/* BRAND SUMMARY */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-[2px] bg-red-600" />
            <span className="text-slate-900 font-extrabold text-xl tracking-tight">
              BMR <span className="text-red-600">SOLUTIONS</span>
            </span>
          </div>
          <p className="text-slate-600 font-sans text-xs leading-relaxed max-w-sm">
            Independent operational audit firm establishing pre-automation control planes and continuous governance guardrails for enterprise systems.
          </p>
        </div>

        {/* VERTICALS */}
        <div className="space-y-4">
          <h4 className="text-slate-900 font-mono font-bold text-xs tracking-wider uppercase">// FORENSIC VERTICALS</h4>
          <ul className="space-y-2 font-mono text-xs text-slate-600 uppercase tracking-wider font-medium">
            <li className="hover:text-slate-900 cursor-default transition-colors">PRE-AUTOMATION CONTROL PLANES</li>
            <li className="hover:text-slate-900 cursor-default transition-colors">PIPELINE HARDENING</li>
            <li className="hover:text-slate-900 cursor-default transition-colors">TELEMETRY DECOUPLING</li>
          </ul>
        </div>

        {/* SYSTEM STATUS */}
        <div className="space-y-4">
          <h4 className="text-slate-900 font-mono font-bold text-xs tracking-wider uppercase">// SYSTEM STATUS</h4>
          <div className="space-y-2 font-mono text-xs uppercase tracking-wider leading-relaxed">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
              <span className="text-slate-900 font-bold">AUDIT MODE: CONTINUOUS VERIFICATION</span>
            </div>
            <p className="text-slate-500 text-[11px] font-medium">
              REGION: NORTH AMERICA DIRECTORY<br />
              VERIFICATION ENGINE: ACTIVE<br />
              GOVERNANCE CADENCE: QUARTERLY T1
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center border-t border-slate-200 pt-8 gap-4 font-mono text-[11px]">
        <p className="text-slate-500 uppercase tracking-wider font-medium">
          © {currentYear} BMR SOLUTIONS GLOBAL. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center gap-6 text-slate-600 uppercase tracking-wider font-semibold">
          <Link href="/privacy" className="hover:text-slate-900 transition-colors no-underline">PRIVACY POLICY</Link>
          <Link href="/terms" className="hover:text-slate-900 transition-colors no-underline">TERMS OF SERVICE</Link>
          <span className="text-slate-400 select-none">// STATUS: OPERATIONAL</span>
        </div>
      </div>
    </footer>
  );
}
