"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, ShieldAlert, Zap, Lock } from 'lucide-react';

const NAV_ITEMS = [
  { label: "PROTOCOLS", path: "/protocols" },
  { label: "BRIEFINGS", path: "/briefings" },
  { label: "METHODOLOGY", path: "/methodology" }
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);
  const currentPath = mounted ? pathname : "";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-slate-900 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-red-600 p-2 rounded-sm group-hover:bg-white transition-colors">
            <Activity size={18} className="text-white group-hover:text-red-600 animate-pulse" />
          </div>
          <span className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">
            BMR<span className="text-red-600">SOLUTIONS</span>
          </span>
        </Link>

        {/* --- CENTRAL PROTOCOL NAV --- */}
        <div className="hidden lg:flex items-center gap-12">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all hover:text-red-600 ${
                currentPath === item.path ? 'text-red-600' : 'text-slate-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {/* --- FORENSIC METADATA STAMPS (ALPHA_7) --- */}
          <div className="hidden md:flex flex-col items-end pr-6 border-r border-slate-800">
             <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">PROTOCOL</span>
                <span className="text-[8px] font-mono text-red-600 font-black uppercase tracking-widest bg-red-600/10 px-1">ALPHA_7</span>
             </div>
             <span className="text-[9px] font-mono text-yellow-500 font-bold uppercase tracking-widest mt-1 italic flex items-center gap-1">
                <ShieldAlert size={10} /> INDEMNITY_UNVERIFIED
             </span>
          </div>
          
          <Link 
            href="/pulse-check"
            className="bg-red-600 text-white px-6 py-3 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:bg-white hover:text-red-600 transition-all shadow-lg shadow-red-900/10 border border-red-600"
          >
            <Zap size={14} /><span>INITIATE_DIAGNOSTIC</span>
          </Link>
        </div>
      </div>
      
      {/* --- SUB-NAV STATUS BAR (Optional Visual Polish) --- */}
      <div className="max-w-7xl mx-auto flex justify-between pt-2">
        <div className="text-[7px] font-mono text-slate-700 uppercase tracking-[0.5em]">
          BMR_SEC_SYS_ACTIVE // SESSION_ENCRYPTED_256BIT
        </div>
        <div className="text-[7px] font-mono text-slate-700 uppercase tracking-[0.5em]">
          U.S._DISTRICT_COMPLIANCE_ENFORCED
        </div>
      </div>
    </nav>
  );
}
