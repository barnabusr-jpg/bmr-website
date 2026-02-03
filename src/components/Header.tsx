import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

export default function Header() {
  const router = useRouter();
  return (
    <header className="fixed top-0 w-full z-40 bg-[#020617]/80 backdrop-blur-md border-b border-slate-900">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl tracking-tighter uppercase text-white">BMR<span className="text-[#14b8a6]">ADVISORY</span></Link>
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About</Link>
          <Link href="/diagnostic" className="text-sm text-[#14b8a6] font-bold hover:text-[#0d9488] transition-colors underline underline-offset-4 decoration-2">Diagnostic</Link>
          <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</Link>
        </nav>
        <Button onClick={() => router.push('/diagnostic')} className="bg-white text-black font-bold hover:bg-[#14b8a6] hover:text-white transition-all text-xs px-6 uppercase tracking-wider">Start Diagnostic</Button>
      </div>
    </header>
  );
}
