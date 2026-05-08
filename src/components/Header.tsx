"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldAlert, ArrowRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'METHODOLOGY', path: '/methodology' },
  { name: 'BRIEFINGS', path: '/briefings' },
  { name: 'PULSE_CHECK', path: '/pulse-check' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-24 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-900 z-[1000] flex items-center justify-between px-6 md:px-12">
      
      {/* 🏛️ BRANDING: BMR SOLUTIONS */}
      <Link href="/" className="flex items-center gap-4 no-underline group">
        <ShieldAlert size={28} className="text-red-600 group-hover:scale-110 transition-transform" />
        <div className="flex flex-col leading-[0.9]">
          <span className="text-white font-black text-lg md:text-xl tracking-tighter uppercase italic">
            BMR<span className="text-red-600">SOLUTIONS</span>
          </span>
          <span className="text-red-600 font-black text-[9px] tracking-[0.4em] mt-1 uppercase italic">
            Forensic_Unit_2026
          </span>
        </div>
      </Link>

      {/* NAVIGATION */}
      <nav className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`text-[10px] font-black tracking-[0.3em] transition-colors no-underline uppercase italic ${
                isActive ? 'text-red-600' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* UNIFIED CTA */}
      <button 
        onClick={() => router.push('/pulse-check')}
        className="hidden md:flex items-center gap-3 bg-red-600 text-white px-7 py-3 font-black uppercase tracking-[0.15em] text-[10px] hover:bg-white hover:text-red-600 transition-all rounded-sm italic"
      >
        INITIATE_DIAGNOSTIC <ArrowRight size={14} />
      </button>

      {/* MOBILE */}
      <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-24 left-0 right-0 bg-[#020617] border-b border-slate-900 flex flex-col p-8 gap-8 animate-in slide-in-from-top duration-300 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.path} 
              href={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-black tracking-[0.4em] text-slate-400 hover:text-red-600 uppercase no-underline italic"
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => { router.push('/pulse-check'); setIsMobileMenuOpen(false); }}
            className="w-full bg-red-600 text-white py-5 font-black uppercase tracking-widest text-[10px] italic"
          >
            INITIATE_DIAGNOSTIC
          </button>
        </div>
      )}
    </header>
  );
}
