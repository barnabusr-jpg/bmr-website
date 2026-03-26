import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Terminal } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-slate-800 p-1">
                <ShieldAlert className="h-4 w-4 text-red-600" />
              </div>
              <span className="font-black italic uppercase tracking-tighter text-lg text-white">
                BMR <span className="text-slate-500">Forensics</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed italic font-medium">
              We do not offer &quot;optimization.&quot; We offer structural hardening. 
              Stopping systemic drift before it hardens into failure.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6">Forensic Tiers</h4>
            <ul className="space-y-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <li><Link href="/services" className="hover:text-red-600 transition-colors underline-offset-4">Drift Diagnostics</Link></li>
              <li><Link href="/services" className="hover:text-red-600 transition-colors underline-offset-4">Structural Hardening</Link></li>
              <li><Link href="/services" className="hover:text-red-600 transition-colors underline-offset-4">Logic Reconstruction</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6">System Terminal</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-red-600 uppercase font-black">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                Probe Status: Monitoring
              </div>
              <p className="text-slate-700 text-[9px] font-mono uppercase leading-tight">
                Node ID: BMR_V3_NY <br />
                Last Fidelity Check: 0.002ms <br />
                © 2026 BMR Global
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-800">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Protocols</Link>
            <Link href="/terms" className="hover:text-slate-400">Engagement Terms</Link>
          </div>
          <div className="flex items-center gap-2 text-slate-900">
            <Terminal className="h-3 w-3" />
            <span className="text-[9px] font-mono uppercase tracking-tighter">Terminal Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
