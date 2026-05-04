"use client";
import React from 'react';
import { Activity, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

const signalEntries = [
  { category: "HAI", title: "THE HUMAN TRUST GAP", excerpt: "Trust is a quantifiable mismatch between human mental models and system output.", slug: "NODE_03" },
  { category: "AVS", title: "VALUE STREAM LEAKAGE", excerpt: "Activity is not achievement. Aligning technical tools with operational reality stops margin erosion.", slug: "NODE_02" },
  { category: "IGF", title: "INSTITUTIONAL FIDELITY", excerpt: "Governance is not a checkbox. It is a reconstructible logic chain.", slug: "NODE_01" }
];

export default function InsightsHome() {
  return (
    <section className="py-[140px] bg-[#020617] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-10">
        <div className="border-l-6 border-red-600 pl-10 mb-20 text-left">
          <div className="flex items-center gap-3 mb-5">
            <ShieldAlert size={20} className="text-red-600" />
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px]">FORENSIC_INTELLIGENCE_DISTRIBUTION</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter text-left">FORENSIC <br />ANALYSIS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {signalEntries.map((insight) => (
            <Link 
              key={insight.title} 
              href={`/vault#${insight.slug}`} 
              className="no-underline group"
            >
              <div className="p-12 border-2 border-slate-900 bg-slate-950/20 h-full flex flex-col justify-between hover:border-red-600/40 transition-all text-left">
                <div>
                  <div className="flex items-center gap-3 text-red-600 mb-8">
                    <Activity size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">PROTOCOL: {insight.category}</span>
                  </div>
                  <h3 className="text-4xl font-black text-white italic uppercase mb-8 leading-tight">{insight.title}</h3>
                  <p className="text-lg text-slate-500 italic leading-relaxed border-l-2 border-slate-900 pl-6">{insight.excerpt}</p>
                </div>
                <div className="mt-12 text-red-600 font-black text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 group-hover:gap-5 transition-all">
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
