import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          BMR<span className="text-[#0D9488]">SOLUTIONS</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {/* Fixed paths to match flat file structure */}
          <Link href="/promise-gap" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            The Problem
          </Link>
          <Link href="/approach" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Our Approach
          </Link>
          <Link href="/strategic-advisory" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Strategic Advisory
          </Link>
          <Link href="/insights" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Field Guide
          </Link>
          
          <Button asChild className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white">
            <Link href="/diagnostic">Start Diagnostic</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
