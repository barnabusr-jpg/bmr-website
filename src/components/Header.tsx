"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 h-24 bg-[#020617]/90 backdrop-blur-xl border-b border-slate-900 z-[1000] flex items-center justify-between px-6 md:px-12">
      <Link href="/" className="flex items-center gap-4 no-underline group">
        <ShieldAlert size={28} className="text-red-600 group-hover:scale-110 transition-transform" />
        <div className="flex flex-col leading-[0.9]">
          <span className="text-white font-black text-lg md:text-xl tracking-tighter uppercase italic">
            BMR<span className="text-red-600 italic">SOLUTIONS</span>
          </span>
          <span className="text-red-600 font-black text-[8px] tracking-[0.4em] mt-1 uppercase italic">
            Forensic_Unit_2026
          </span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-10">
        <Link href="/methodology" className="text-[10px] font-black tracking-[0.3em] text-slate-500 hover:text-white transition-colors no-underline uppercase italic">METHODOLOGY</Link>
        <Link href="/briefings" className="text-[10px] font-black tracking-[0.3em] text-slate-500 hover:text-white transition-colors no-underline uppercase italic">BRIEFINGS</Link>
      </nav>

      <button 
        onClick={() => router.push('/pulse-check')}
        className="bg-red-600 text-white px-8 py-3 font-black uppercase tracking-[0.1em] text-[10px] hover:bg-white hover:text-red-600 transition-all italic flex items-center gap-3"
      >
        INITIATE_DIAGNOSTIC <ArrowRight size={14} />
      </button>
    </header>
  );
}
