"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Activity, ShieldAlert, Zap } from 'lucide-react';

const NAV_ITEMS = [
  { label: "PROTOCOLS", path: "/protocols" },
  { label: "BRIEFINGS", path: "/briefings" },
  { label: "METHODOLOGY", path: "/methodology" }
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // HYDRATION GUARD: Prevents the White Screen crash
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentPath = mounted ? pathname : "";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-slate-900 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-red-600 p-2 rounded-sm group-hover:bg-white transition-colors">
            <Activity size={18} className="text-white group-hover:text-red-600 animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">
              <span>BMR</span><span className="text-red-600">SOLUTIONS</span>
            </span>
            <span className="text-[8px] font-mono text-red-600 font-bold tracking-widest uppercase mt-1"><span>ADMIN ACCESS</span></span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-12">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all hover:text-red-600 ${
                currentPath === item.path ? 'text-red-600' : 'text-slate-400'
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end pr-6 border-r border-slate-800 text-right">
             <div className="flex items-center gap-2">
                <ShieldAlert size={10} className="text-red-600" />
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none"><span>STATUS</span></span>
             </div>
             <span className="text-[9px] font-mono text-green-500 font-bold uppercase tracking-widest leading-none mt-1"><span>STABLE NODE-SEC-04</span></span>
          </div>
          
          <button 
            type="button"
            onClick={() => { if(mounted) router.push('/pulse-check'); }}
            className="bg-red-600 text-white px-6 py-3 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:bg-white hover:text-red-600 transition-all shadow-lg shadow-red-900/10"
          >
            <Zap size={14} /><span>DIAGNOSTIC</span>
          </button>
        </div>

      </div>
    </nav>
  );
}
