"use client";

import React from 'react';
import Link from "next/link";
import { ShieldAlert, Activity } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 text-white font-medium">
      <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-red-600 p-1.5 group-hover:bg-white transition-colors">
            <ShieldAlert className="h-5 w-5 text-white group-hover:text-red-600" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white italic uppercase transition-all">
            BMR <span className="text-slate-500 group-hover:text-red-600 transition-colors tracking-widest">Forensics</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10 text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">
          <Link href="/services" className="hover:text-red-600 hover:italic transition-all">Protocols</Link>
          <Link href="/insights" className="hover:text-red-600 hover:italic transition-all">Briefings</Link>
          <Link href="/about" className="hover:text-red-600 hover:italic transition-all">Methodology</Link>
          
          <Link 
            href="/pulse-check" 
            className="flex items-center gap-3 bg-red-600 hover:bg-white text-white hover:text-red-600 px-8 h-12 text-[10px] font-black italic tracking-[0.2em] transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.15)] uppercase group"
          >
            <Activity className="h-4 w-4 group-hover:animate-pulse" />
            Initialize Pulse Check
          </Link>
        </nav>

        {/* Mobile Indicator */}
        <div className="md:hidden">
           <Link href="/pulse-check" className="text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-600/30 px-4 py-2 italic bg-red-600/5">
             Pulse Check
           </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
