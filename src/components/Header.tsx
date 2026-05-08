"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import DiagnosticModal from './DiagnosticModal';

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Launches modal if ?intake=active exists in the URL
    setIsOpen(router.query.intake === 'active');
  }, [router.query.intake]);

  const toggleDiagnostic = (open: boolean) => {
    if (open) {
      router.push({ query: { ...router.query, intake: 'active' } }, undefined, { shallow: true });
    } else {
      const { intake, ...restQuery } = router.query;
      router.push({ pathname: router.pathname, query: restQuery }, undefined, { shallow: true });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-24 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-900 z-[1000] flex items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-4 no-underline group">
          <ShieldAlert size={28} className="text-red-600 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col leading-[0.9]">
            <span className="text-white font-black text-lg md:text-xl tracking-tighter uppercase italic">
              BMR<span className="text-red-600">SOLUTIONS</span>
            </span>
            <span className="text-red-600 font-black text-[9px] tracking-[0.4em] mt-1 uppercase italic">Forensic_Unit_2026</span>
          </div>
        </Link>

        <button 
          onClick={() => toggleDiagnostic(true)}
          className="md:flex items-center gap-3 bg-red-600 text-white px-7 py-3 font-black uppercase tracking-[0.15em] text-[10px] hover:bg-white hover:text-red-600 transition-all rounded-sm italic"
        >
          INITIATE_DIAGNOSTIC <ArrowRight size={14} />
        </button>
      </header>

      <DiagnosticModal isOpen={isOpen} onClose={() => toggleDiagnostic(false)} />
    </>
  );
}
