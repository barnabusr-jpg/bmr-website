"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowRight, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🛡️ THE FAIL-SAFE: Direct browser-level navigation
  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation(); // Stops other elements from stealing the click
    window.location.href = path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-24 bg-[#020617]/90 backdrop-blur-xl border-b border-slate-900 z-[9999] flex items-center justify-between px-6 md:px-12">
      
      {/* LOGO */}
      <a href="/" className="flex items-center gap-4 no-underline group cursor-pointer" onClick={(e) => handleNav(e, '/')}>
        <ShieldAlert size={28} className="text-red-600 group-hover:scale-110 transition-transform" />
        <div className="flex flex-col leading-[0.9]">
          <span className="text-white font-black text-lg md:text-xl tracking-tighter">
            BMR<span className="text-red-600">SOLUTIONS</span>
          </span>
          <span className="text-red-600 font-black text-[9px] tracking-[0.4em] mt-1 uppercase">
            Forensic_Environment
          </span>
        </div>
      </a>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex items-center gap-10">
        <a href="/methodology" onClick={(e) => handleNav(e, '/methodology')} className="text-[10px] font-black tracking-[0.3em] text-slate-400 hover:text-white no-underline">METHODOLOGY</a>
        <a href="/vault" onClick={(e) => handleNav(e, '/vault')} className="text-[10px] font-black tracking-[0.3em] text-slate-400 hover:text-white no-underline">BRIEFINGS</a>
      </nav>

      {/* ⚡ THE ACTION BUTTON (HARD-WIRED) */}
      <a 
        href="/pulse-check"
        onClick={(e) => handleNav(e, '/pulse-check')}
        className="hidden md:flex items-center gap-3 bg-red-600 text-white px-7 py-3 font-black uppercase tracking-[0.15em] text-[10px] hover:bg-white hover:text-black transition-all rounded-sm no-underline cursor-pointer border-none"
      >
        INITIATE_DIAGNOSTIC <ArrowRight size={14} />
      </a>

      {/* MOBILE MENU TOGGLE */}
      <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MOBILE DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="fixed top-24 left-0 right-0 bottom-0 bg-[#020617] flex flex-col p-8 gap-10 z-[10000] md:hidden">
          <a href="/methodology" onClick={(e) => handleNav(e, '/methodology')} className="text-xl font-black tracking-widest text-white no-underline uppercase">Methodology</a>
          <a href="/vault" onClick={(e) => handleNav(e, '/vault')} className="text-xl font-black tracking-widest text-white no-underline uppercase">Briefings</a>
          <a 
            href="/pulse-check" 
            onClick={(e) => handleNav(e, '/pulse-check')}
            className="w-full bg-red-600 text-white py-6 font-black uppercase tracking-widest text-center no-underline mt-4"
          >
            INITIATE_DIAGNOSTIC
          </a>
        </div>
      )}
    </header>
  );
}
