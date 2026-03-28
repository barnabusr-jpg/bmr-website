"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Shield, Zap } from 'lucide-react';

const FieldGuidePage = () => {
  return (
    <section className="min-h-screen bg-slate-950 pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        
        <div className="mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-red-600" />
            <p className="text-[10px] font-black tracking-[0.4em] text-red-600 uppercase italic">
              BMR_FIELD_GUIDE_V1.0
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
            Navigating <span className="text-slate-800">The Drift.</span>
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg italic leading-relaxed">
            Our operational manual for identifying, isolating, and rectifying 
            logic decay in high-stakes AI environments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { 
              icon: <Shield className="text-red-600" />, 
              title: "Hardening", 
              desc: "Reinforcing the perimeter of machine intent against probabilistic decay." 
            },
            { 
              icon: <Zap className="text-red-600" />, 
              title: "Triage", 
              desc: "Rapid identification of 'Log Rot' before systemic collapse occurs." 
            },
            { 
              icon: <BookOpen className="text-red-600" />, 
              title: "Protocols", 
              desc: "Standardized forensic procedures for architectural recovery." 
            }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-slate-900 bg-slate-900/20 backdrop-blur-sm group hover:border-red-600/50 transition-all duration-500">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4 italic">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed uppercase tracking-wider">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-900 pt-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter italic">
              Ready to <span className="text-red-600">Secure Your Logic?</span>
            </h2>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed uppercase tracking-widest">
              Standard optimization is no longer enough. You require a forensic audit 
              to ensure your architectural integrity remains intact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center h-14 px-10 text-[10px] font-black uppercase tracking-[0.3em] bg-red-600 text-white transition-all hover:bg-white hover:text-black shadow-[0_0_30px_rgba(220,38,38,0.2)]"
              >
                Start a Conversation <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FieldGuidePage;
