import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#020617] py-16 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo / Brand Signal */}
          <div className="text-white font-bold tracking-tighter text-2xl">
            BMR<span className="text-[#14b8a6]">SOLUTIONS</span>
          </div>
          
          {/* Secondary Navigation */}
          <nav className="flex gap-8 text-slate-500 text-xs font-semibold uppercase tracking-[0.2em]">
            <Link href="/field-guide" className="hover:text-white transition-colors">
              Field Guide
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </nav>
          
          {/* System Metadata */}
          <div className="text-slate-600 text-[10px] uppercase tracking-[0.3em] font-mono">
            © 2026 BMR Advisory // All Systems Verified
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
