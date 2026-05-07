"use client";
import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🛡️ UNIVERSAL NAVIGATION: Works on Production and Preview
  const handleNav = (path: string) => {
    if (typeof window !== 'undefined') {
      // Using relative pathing ensures we don't jump domains
      window.location.href = path; 
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-24 bg-[#020617] border-b border-slate-900 z-[99999] flex items-center justify-between px-6 md:px-12">
      
      {/* LOGO */}
      <div onClick={() => handleNav('/')} className="flex items-center gap-4 cursor-pointer">
        <ShieldAlert size={28} className="text-red-600" />
        <div className="flex flex-col leading-[0.9]">
          <span className="text-white font-black text-lg md:text-xl tracking-tighter uppercase">BMR SOLUTIONS</span>
        </div>
      </div>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex items-center gap-10">
        <span onClick={() => handleNav('/methodology')} className="text-[10px] font-black text-slate-400 hover:text-white cursor-pointer uppercase">Methodology</span>
        <span onClick={() => handleNav('/vault')} className="text-[10px] font-black text-slate-400 hover:text-white cursor-pointer uppercase">Briefings</span>
      </nav>

      {/* ⚡ ACTION BUTTON */}
      <button 
        onClick={() => handleNav('/pulse-check')}
        className="hidden md:flex items-center gap-3 bg-red-600 text-white px-7 py-3 font-black uppercase tracking-[0.15em] text-[10px] hover:bg-white hover:text-black transition-all rounded-sm border-none cursor-pointer"
      >
        INITIATE_DIAGNOSTIC <ArrowRight size={14} />
      </button>

      {/* MOBILE TOGGLE */}
      <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-24 bg-[#020617] flex flex-col p-10 gap-8 md:hidden">
          <button onClick={() => { handleNav('/pulse-check'); setIsMobileMenuOpen(false); }} className="w-full bg-red-600 text-white py-6 font-black uppercase border-none">INITIATE_DIAGNOSTIC</button>
        </div>
      )}
    </header>
  );
}
