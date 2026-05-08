"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lock, ShieldAlert, ChevronRight } from "lucide-react";
import Link from 'next/link';

export default function EvidenceVault() {
  const caseStudies = [
    { id: "CASE_01", title: "EXECUTIVE VARIANCE", slug: "chatbot-liability" },
    { id: "CASE_02", title: "FORENSIC INSIGHTS", slug: "salesforce-failure" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic">
      <Header />
      <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-24 border-b-2 border-slate-900 pb-12 text-left">
          <div className="border-l-4 border-red-600 pl-8">
            <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
              EVIDENCE <br /><span className="text-red-600">VAULT.</span>
            </h1>
          </div>
          <Lock className="text-slate-800 hidden md:block" size={80} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {caseStudies.map((item) => (
            <div key={item.id} className="bg-slate-950 border-2 border-slate-900 p-16 relative group hover:border-red-600 transition-all min-h-[500px] flex flex-col justify-between">
              <div className="relative z-10">
                <span className="font-mono text-[11px] text-red-600 font-black tracking-[0.4em] uppercase italic">FILE_REF: {item.id}</span>
                <h2 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter text-white mt-10 mb-8 leading-none">{item.title}</h2>
                <Link href={`/briefings/case-study/${item.slug}`} className="flex items-center gap-4 text-red-600 font-black uppercase italic text-[13px] tracking-[0.3em] hover:text-white transition-all group/link">
                  ACCESS CASE AUTOPSY <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
