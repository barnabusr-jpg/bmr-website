"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Activity, Menu, X } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'THE FRAMEWORK', href: '/methodology' },
    { name: 'EVIDENCE VAULT', href: '/briefings' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 md:h-24 bg-white/95 backdrop-blur-md border-b border-slate-200 z-[1000] flex items-center justify-between px-6 md:px-12">
        {/* BRAND IDENTITY: DIRECT CARD ALIGNMENT */}
        <Link href="/" className="flex items-center gap-3.5 no-underline group shrink-0">
          {/* Node Gauge / Building Inspector Mark */}
          <div className="h-9 w-9 md:h-10 md:w-10 rounded-xs border border-slate-300 bg-slate-50 flex items-center justify-center p-1.5 md:p-2 shadow-xs group-hover:border-slate-950 transition-colors">
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1">
              <span className="bg-slate-900 rounded-[1px]" />
              <span className="bg-red-700 rounded-[1px]" />
              <span className="bg-slate-400 rounded-[1px]" />
              <span className="bg-slate-900 rounded-[1px]" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            {/* TOP KICKER */}
            <span className="text-red-700 font-mono font-bold text-[8px] md:text-[9px] tracking-widest uppercase leading-none mb-1">
              // PRE-AUTOMATION CONTROL PLANE
            </span>
            
            {/* CORE BRAND */}
            <span className="text-slate-950 font-black text-base md:text-xl tracking-tight uppercase leading-none">
              BMR <span className="text-red-700">SOLUTIONS</span>
            </span>

            {/* INSTITUTIONAL AUTHORITY */}
            <span className="text-slate-500 font-mono font-semibold text-[7px] md:text-[8px] tracking-wider uppercase leading-none mt-1">
              ENTERPRISE CONTROL PLANE INSPECTORATE
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 font-mono">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-xs font-bold tracking-wider transition-colors no-underline uppercase ${
                  isActive ? 'text-red-700 border-b-2 border-red-700 pb-1' : 'text-slate-600 hover:text-red-700'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => router.push('/pulse-check')}
            className="bg-slate-950 text-white px-5 md:px-8 py-2.5 md:py-3 font-bold uppercase tracking-wider text-xs hover:bg-red-700 transition-all flex items-center gap-2 border border-slate-950 shadow-xs cursor-pointer rounded-xs"
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
        
        <Link 
          href="/pulse-check" 
          onClick={() => setIsMenuOpen(false)}
          className="text-xl font-mono font-bold tracking-wider text-red-500 hover:text-white transition-colors no-underline uppercase border border-red-500/40 px-6 py-3 rounded-xs"
        >
          EXECUTE STRATEGY
        </Link>
        
        <div className="absolute bottom-12 flex flex-col items-center gap-2 text-center">
          <div className="h-6 w-6 grid grid-cols-2 grid-rows-2 gap-1 opacity-60 mb-1">
            <span className="bg-red-500 rounded-[1px]" />
            <span className="bg-slate-500 rounded-[1px]" />
            <span className="bg-slate-700 rounded-[1px]" />
            <span className="bg-red-500 rounded-[1px]" />
          </div>
          <span className="text-red-500 font-mono text-[9px] tracking-widest uppercase">
            // PRE-AUTOMATION CONTROL PLANE
          </span>
          <span className="text-slate-400 font-mono text-[10px] font-semibold tracking-widest uppercase">
            ENTERPRISE CONTROL PLANE INSPECTORATE
          </span>
        </div>
      </div>
    </>
  );
}
