"use client";
import React from 'react';
import { Activity, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

const signalEntries = [
  { category: "HAI", title: "THE HUMAN TRUST GAP", excerpt: "Trust is a quantifiable mismatch between human mental models and system output.", slug: "real-trust-gap" },
  { category: "AVS", title: "VALUE STREAM LEAKAGE", excerpt: "Activity is not achievement. Aligning technical tools with operational reality stops margin erosion.", slug: "adoption-value-system" },
  { category: "IGF", title: "INSTITUTIONAL FIDELITY", excerpt: "Governance is not a checkbox. It is a reconstructible logic chain.", slug: "executive-readiness" }
];

export default function InsightsHome() {
  return (
    <section className="py-24 md:py-[140px] bg-[#020617] border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="border-l-4 md:border-l-6 border-red-600 pl-6 md:pl-10 mb-12 md:mb-20 text-left">
          <div className="flex items-center gap-3 mb-5">
            <ShieldAlert size={20} className="text-red-600" />
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[9px] md:text-[10px] italic">FORENSIC_INTELLIGENCE_DISTRIBUTION</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter text-left leading-none">
            FORENSIC <br />ANALYSIS
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {signalEntries.map((insight) => (
            <Link key={insight.title} href={`/briefings#${insight.slug}`} className="no-underline group">
              <div className="p-8 md:p-12 border-2 border-slate-900 bg-slate-950/20 h-full flex flex-col justify-between hover:border-red-600/40 transition-all text-left shadow-2xl">
                <div>
                  <div className="flex items-center gap-3 text-red-600 mb-6 md:mb-8">
                    <Activity size={18} />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 italic">PROTOCOL: {insight.category}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase mb-6 md:mb-8 leading-tight tracking-tighter">{insight.title}</h3>
                  <p className="text-base md:text-lg text-slate-500 italic leading-relaxed border-l-2 border-slate-900 pl-6">{insight.excerpt}</p>
                </div>
                <div className="mt-10 md:mt-12 text-red-600 font-black text-[9px] md:text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 group-hover:gap-5 transition-all italic">
                  ACCESS FORENSIC VAULT <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
