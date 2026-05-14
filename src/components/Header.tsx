"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShieldAlert, Activity, Menu, X } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'METHODOLOGY', href: '/methodology' },
    { name: 'DOSSIERS', href: '/briefings' }, // NAMING UPDATE ONLY
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 md:h-24 bg-[#020617]/95 backdrop-blur-xl border-b border-slate-900 z-[1000] flex items-center justify-between px-6 md:px-12">
        
        <Link href="/" className="flex items-center gap-3 no-underline group shrink-0">
          <ShieldAlert size={24} className="text-red-600 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col leading-[0.9]">
            <span className="text-white font-black text-base md:text-xl tracking-tighter uppercase italic">
              BMR<span className="text-red-600 italic">SOLUTIONS</span>
            </span>
            <span className="text-red-600 font-black text-[7px] tracking-[0.4em] mt-1 uppercase italic">
              Forensic_Unit_2026
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10 font-black italic">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-black tracking-[0.3em] text-slate-500 hover:text-white transition-colors no-underline uppercase"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => router.push('/pulse-check')} // NO ROUTE DRIFT
            className="bg-red-600 text-white px-4 md:px-10 py-2.5 md:py-3 font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] hover:bg-white hover:text-red-600 transition-all italic flex items-center gap-2 border-2 border-red-600 shadow-lg"
          >
            {/* NAMING UPDATES ONLY */}
            <span className="hidden sm:inline">INITIALIZE_AUDIT</span>
            <span className="sm:hidden">START_AUDIT</span>
            <Activity size={14} className="animate-pulse" /> 
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-1 ml-1 hover:text-red-600 transition-colors focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <div 
        className={`fixed inset-0 bg-[#020617] z-[999] transition-transform duration-500 ease-in-out flex flex-col justify-center items-center gap-12 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            onClick={() => setIsMenuOpen(false)}
            className="text-4xl font-black italic tracking-tighter text-white hover:text-red-600 transition-colors no-underline uppercase"
          >
            {link.name}
          </Link>
        ))}
        
        <div className="absolute bottom-12 flex flex-col items-center gap-2">
          <ShieldAlert size={32} className="text-red-600 opacity-20" />
          <div className="text-red-600 font-mono text-[10px] font-black tracking-[0.5em] italic">
            SIGNAL_ID_AUTHENTICATED // 2026
          </div>
        </div>
      </div>
    </>
  );
}
