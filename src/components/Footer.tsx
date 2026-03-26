import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const forensicTiers = [
    { name: "DRIFT DIAGNOSTICS", href: "/protocols/rapid-de-risk" },
    { name: "STRUCTURAL HARDENING", href: "/protocols/structural-hardening" },
    { name: "LOGIC RECONSTRUCTION", href: "/protocols/expertise-recovery" }
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2 space-y-6">
          <div className="text-white font-black uppercase italic tracking-tighter text-2xl">
            BMR <span className="text-red-600">SOLUTIONS</span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed max-w-sm font-light italic">
            We do not provide optimization services. We provide structural hardening. 
            We eliminate systemic decay before it results in operational failure.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.3em] mb-6">
            FORENSIC TIERS
          </h4>
          <ul className="space-y-3">
            {forensicTiers.map((tier) => (
              <li key={tier.name}>
                <Link
                  href={tier.href}
                  className="text-[10px] text-slate-500 hover:text-red-600 transition-colors uppercase tracking-widest leading-none"
                >
                  {tier.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.3em] mb-6">
            SYSTEM STATUS
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] font-mono text-red-600 uppercase tracking-widest">
                PROBE STATUS: ACTIVE
              </span>
            </div>
            <div className="text-[9px] font-mono text-slate-700 leading-tight uppercase">
              NODE IDENTIFIER: BMR_V3_NY<br />
              FIDELITY CHECK: 0.002ms<br />
              COPYRIGHT 2026 BMR SOLUTIONS GLOBAL
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-slate-900/50 flex justify-between items-center text-[9px] font-mono text-slate-800 uppercase tracking-widest">
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-red-600 uppercase">
            PRIVACY PROTOCOLS
          </Link>
          <Link href="/terms" className="hover:text-red-600 uppercase">
            ENGAGEMENT TERMS
          </Link>
        </div>
        <div>TERMINAL STATUS: OPERATIONAL</div>
      </div>
    </footer>
  );
}
