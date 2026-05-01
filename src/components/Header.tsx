"use client";
import React from 'react';
import { useRouter } from 'next/router';
import { Activity, ShieldAlert, Zap } from 'lucide-react';

export default function Header() {
  const router = useRouter();

  const NAV_ITEMS = [
    { label: "METHODOLOGY", path: "/briefings" },
    { label: "FRAMEWORKS", path: "/briefings" },
    { label: "BRIEFINGS", path: "/briefings" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-[#020617] border-b border-slate-900 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <div onClick={() => router.push('/')} className="flex items-center gap-3 cursor-pointer">
          <div className="bg-red-600 p-2 rounded-sm">
            <Activity size={18} className="text-white animate-pulse" />
          </div>
          <span className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">
            BMR<span className="text-red-600">SOLUTIONS</span>
          </span>
        </div>

        {/* 🟢 FORCED VISIBILITY LINKS (Restored Text) */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.label} 
              onClick={() => router.push(item.path)}
              className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-100 hover:text-red-600 transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* DIAGNOSTIC BUTTON */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.push('/pulse-check')}
            className="bg-red-600 text-white px-6 py-3 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 border border-red-600 hover:bg-white hover:text-red-600 transition-all"
          >
            <Zap size={14} /><span>INITIATE_DIAGNOSTIC</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
