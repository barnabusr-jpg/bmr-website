import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold tracking-tighter text-white">
            BMR <span className="text-[#14b8a6]">SOLUTIONS</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="/diagnostic" className="hover:text-[#14b8a6] transition-colors">DIAGNOSTIC</Link>
          <Link href="mailto:hello@bmrsolutions.co" className="bg-[#14b8a6] text-black px-4 py-2 rounded-md font-bold hover:bg-[#0f9688] transition-all">
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
}
