import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-slate-900 py-20 px-6">
      <div className="container mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <span className="font-bold text-xl tracking-tighter">BMR<span className="text-[#14b8a6]">ADVISORY</span></span>
          <p className="text-slate-500 mt-4 max-w-sm text-sm">
            Closing the &quot;Promise Gap&trade;&quot; between technical AI implementation and realized operational value.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4">Diagnostic</h4>
          <Link href="/diagnostic" className="text-slate-500 hover:text-[#14b8a6] block text-sm mb-2">ROI Recovery Audit</Link>
          <Link href="/methodology" className="text-slate-500 hover:text-[#14b8a6] block text-sm mb-2">The 12 Signals</Link>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4">Connect</h4>
          <Link href="/contact" className="text-slate-500 hover:text-[#14b8a6] block text-sm mb-2">Book a Review</Link>
          <p className="text-slate-500 text-sm mt-4">hello@bmradvisory.co</p>
        </div>
      </div>
      <div className="container mx-auto mt-20 pt-8 border-t border-slate-900 text-slate-600 text-xs text-center">
        &copy; 2026 BMR Advisory. All rights reserved. Strategic Synthesis benchmarks based on longitudinal industry data.
      </div>
    </footer>
  );
}
