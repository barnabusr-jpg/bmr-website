import React from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-2 border border-red-500/50">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <Link href="/" className="text-white font-black uppercase italic tracking-tighter text-xl block leading-none">
              BMR <span className="text-red-600 font-black">SOLUTIONS</span>
            </Link>
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.3em]">
              AUTHENTICATION LEVEL: ADMIN
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Protocols', 'Briefings', 'Methodology'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-[10px] font-mono text-slate-400 hover:text-red-600 uppercase tracking-widest transition-colors"
            >
              {item}
            </Link>
          ))}
          <button
            onClick={() => window.location.href = '/pulse-check'}
            className="bg-red-600 text-white font-black py-3 px-6 uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2"
          >
            <Activity className="h-3 w-3 animate-pulse" /> INITIATE DIAGNOSTIC
          </button>
        </nav>
      </div>
    </header>
  );
}
