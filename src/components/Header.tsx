"use client";

import React from 'react';
import Link from "next/link";
import { ShieldAlert, Activity } from "lucide-react";
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-900 text-white">
      <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group h-full">
          <div className="bg-red-600 p-2 group-hover:bg-white transition-all duration-300">
            <ShieldAlert className="h-5 w-5 text-white group-hover:text-red-600" />
          </div>
          <div className="flex flex-col border-l border-slate-800 pl-4">
            <span className="text-lg font-black tracking-tighter italic uppercase leading-none">
              BMR <span className="text-red-600">Forensics</span>
            </span>
            <span className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.2em] mt-1">
              Auth_Level: Admin
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 h-full">
          {[
            { name: "Protocols", href: "/services" },
            { name: "Briefings", href: "/insights" },
            { name: "Methodology", href: "/about" },
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`text-[10px] font-black tracking-[0.3em] uppercase transition-all hover:text-red-600 ${
                pathname === item.href ? "text-red-600 italic underline underline-offset-8" : "text-slate-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="h-8 w-px bg-slate-900 mx-2" />
          
          <Link 
            href="/pulse-check" 
            className="flex items-center gap-3 bg-red-600 hover:bg-white text-white hover:text-red-600 px-6 h-12 text-[10px] font-black italic tracking-[0.2em] transition-all duration-500 shadow-[0_0_30px_rgba(220,38,38,0.2)] uppercase group"
          >
            <Activity className="h-4 w-4 group-hover:animate-spin" />
            Initialize Diagnostic
          </Link>
        </nav>

        {/* Mobile Indicator */}
        <div className="md:hidden">
           <Link href="/pulse-check" className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em] border border-red-600/30 px-4 py-2 italic bg-red-600/5">
             Pulse Check
           </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
