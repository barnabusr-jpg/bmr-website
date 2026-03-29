"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Activity, ShieldAlert, Zap } from 'lucide-react';

const NAV_ITEMS = [
  { label: "PROTOCOLS", path: "/protocols" },
  { label: "BRIEFINGS", path: "/briefings" },
  { label: "METHODOLOGY", path: "/methodology" }
];

export default function Header() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-slate-900 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO NODE */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-red-600 p-2 rounded-sm group-hover:bg-white transition-colors">
            <Activity size={18} className="text-white group-hover:text-red-600 animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-black italic tracking-tighter text-white uppercase italic leading-none">
              BMR<span className="text-red-600">SOLUTIONS</span>
            </span>
            <span className="text-[8px] font-mono text-red-600 font-bold tracking-widest uppercase mt-1">ADMIN ACCESS</span>
          </div>
        </Link>

        {/* NAVIGATION NODE - This is what separates the pages */}
        <div className="hidden lg:flex items-center gap-12">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all hover:text-red-600 ${
                router.pathname === item.path ? 'text-red-600' : 'text-slate-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* STATUS & ACTION NODE */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end pr-6 border-r border-slate-800 text-right">
             <div className="flex items-center gap-2">
                <ShieldAlert size={10} className="text-red-600" />
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">STATUS</span>
             </div>
             <span className="text-[9px] font-mono text-green-500 font-bold uppercase tracking-widest">STABLE NODE-SEC-04</span>
          </div>
          <button 
            onClick={() => router.push('/pulse-check/assessment')}
            className="bg-red-600 text-white px-6 py-3 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:bg-white hover:text-red-600 transition-all shadow-lg shadow-red-900/10"
          >
            <Zap size={14} /> DIAGNOSTIC
          </button>
        </div>

      </div>
    </nav>
  );
}
