import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tighter text-white">
            BMR <span className="text-[#14b8a6]">SOLUTIONS</span>
          </span>
        </Link>
        <div className="flex items-center space-x-8 text-sm font-medium">
          <Link href="/diagnostic" className="text-slate-300 hover:text-[#14b8a6] transition-colors">DIAGNOSTIC</Link>
          <Link href="/contact" className="bg-[#14b8a6] text-black px-5 py-2 rounded-full font-bold hover:bg-[#0f9688] transition-all">
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
}
