"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShieldAlert, Activity, Menu, X } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'THE FRAMEWORK', href: '/methodology' },
    { name: 'BRIEFING VAULT', href: '/briefings' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 md:h-24 bg-white/90 backdrop-blur-md border-b border-slate-200 z-[1000] flex items-center justify-between px-6 md:px-12">
        
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center gap-3 no-underline group shrink-0">
          <ShieldAlert size={24} className="text-red-700 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col leading-tight">
            <span className="text-slate-950 font-black text-base md:text-xl tracking-tight uppercase">
              BMR <span className="text-red-700">SOLUTIONS</span>
            </span>
            <span className="text-slate-500 font-mono font-semibold text-[9px] tracking-widest uppercase">
              FORENSIC UNIT
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 font-mono">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-xs font-bold tracking-wider text-slate-600 hover:text-red-700 transition-colors no-underline uppercase"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => router.push('/pulse-check')}
            className="bg-slate-950 text-white px-5 md:px-8 py-2.5 md:py-3 font-bold uppercase tracking-wider text-xs hover:bg-red-700 transition-all flex items-center gap-2 border border-slate-950 shadow-sm cursor-pointer rounded-sm"
          >
            <span className="hidden sm:inline">EXECUTE STRATEGY</span>
            <span className="sm:hidden">EXECUTE</span>
            <Activity size={14} className="animate-pulse text-red-400" />
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-950 p-1 ml-1 hover:text-red-700 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 bg-slate-950 z-[999] transition-transform duration-500 ease-in-out flex flex-col justify-center items-center gap-10 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl font-black tracking-tight text-white hover:text-red-500 transition-colors no-underline uppercase"
          >
            {link.name}
          </Link>
        ))}
        
        <div className="absolute bottom-12 flex flex-col items-center gap-2">
          <ShieldAlert size={32} className="text-red-500 opacity-40" />
          <div className="text-slate-400 font-mono text-xs font-semibold tracking-widest uppercase">
            SYSTEM ACCESS GRANTED
          </div>
        </div>
      </div>
    </>
  );
}
