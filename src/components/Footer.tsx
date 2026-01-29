import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#020617] border-t border-slate-800 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-xl font-bold text-white tracking-tight mb-4 inline-block">
            BMR<span className="text-[#0D9488]">SOLUTIONS</span>
          </Link>
          <p className="text-slate-400 max-w-sm">
            Closing the distance between strategy and reality through fractional leadership and systemic alignment.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/promise-gap" className="text-slate-400 hover:text-[#0D9488] transition-colors">
                The Problem
              </Link>
            </li>
            <li>
              <Link href="/approach" className="text-slate-400 hover:text-[#0D9488] transition-colors">
                Our Approach
              </Link>
            </li>
            <li>
              <Link href="/diagnostic" className="text-slate-400 hover:text-[#0D9488] transition-colors">
                Diagnostic
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              {/* Pointing to your pending insights placeholder */}
              <Link href="/insights" className="text-slate-400 hover:text-[#0D9488] transition-colors">
                Field Guide
              </Link>
            </li>
            <li>
              {/* Updated to Advisory to match the new structure */}
              <Link href="/strategic-advisory" className="text-slate-400 hover:text-[#0D9488] transition-colors">
                Strategic Advisory
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-400 hover:text-[#0D9488] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} BMR Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
