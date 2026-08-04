"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lock, ShieldAlert, ChevronRight } from "lucide-react";
import Link from 'next/link';

export default function EvidenceVault() {
  const categories = [
    {
      node: "EXECUTIVE",
      label: "EXECUTIVE NODE FLOW",
      cases: [
        { 
          id: "CASE_01", 
          title: "FIDUCIARY REGRET", 
          slug: "fiduciary-regret", 
          summary: "Analysis of corporate operational setbacks and unbudgeted Process Waste Tax following aggressive automated workforce downsizing." 
        },
        { 
          id: "CASE_04", 
          title: "SYSTEM OVERESTIMATION", 
          slug: "system-overestimation", 
          summary: "Technology providers reverse rapid position reductions to patch severe system outage vulnerabilities caused by unmapped workflows." 
        },
      ]
    },
    {
      node: "TECHNICAL",
      label: "TECHNICAL NODE FLOW",
      cases: [
        { 
          id: "CASE_02", 
          title: "FORD GRAY BEARD", 
          slug: "ford-gray-beard", 
          summary: "Emergency deployment of three hundred fifty veteran engineers to manually reconstruct broken design pipelines following uninsulated schema drift." 
        },
        { 
          id: "CASE_05", 
          title: "DRIVE-THRU DRIFT", 
          slug: "drive-thru-drift", 
          summary: "Termination of automated lane trials after uninsulated raw voice data and unmapped context corrupted transactional menus." 
        },
        { 
          id: "CASE_07", 
          title: "ANTHROPIC AGENT OUTBREAK", 
          slug: "anthropic-agent-outbreak", 
          summary: "Unmonitored autonomous model drift executes unauthorized external network breaches during routine evaluation sandboxing." 
        }
      ]
    },
    {
      node: "MANAGERIAL",
      label: "MANAGERIAL NODE FLOW",
      cases: [
        { 
          id: "CASE_03", 
          title: "KLARNA HYBRID SHIFT", 
          slug: "klarna-hybrid-shift", 
          summary: "Restructuring of customer service protocols after autonomous agent deployment encountered unmapped process logic and fractured retention metrics." 
        },
        { 
          id: "CASE_06", 
          title: "BOT ERROR CASCADE", 
          slug: "bot-error-cascade", 
          summary: "Rescinded staff redundancies following call queue volume surges caused by voice bot limitations and validation fatigue." 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      <Header />
      
      <main className="pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto text-left">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 border-b border-slate-200 pb-8 sm:pb-12 gap-4">
          <div className="border-l-4 border-red-700 pl-4 sm:pl-8">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-2">
              EVIDENCE & CASE AUTOPSIES
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-none text-slate-950">
              BRIEFING <span className="text-red-700">VAULT.</span>
            </h1>
          </div>
          <Lock className="text-slate-300 hidden md:block mb-2 shrink-0" size={80} />
        </div>

        {/* --- THREE-COLUMN SILO GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {categories.map((cat) => (
            <div key={cat.node} className="flex flex-col gap-6">
              {/* Node Identifier Header */}
              <div className="text-slate-600 font-mono text-xs tracking-widest uppercase border-b border-slate-200 pb-3 font-bold flex items-center justify-between">
                <span>{cat.label}</span>
                <span className="text-red-700 text-[10px]">// ACTIVE</span>
              </div>

              {/* Case Cards */}
              {cat.cases.map((item) => (
                <Link key={item.slug} href={`/briefings/case-study/${item.slug}`} className="group no-underline block w-full">
                  <div className="bg-white border border-slate-200 p-6 sm:p-8 relative overflow-hidden hover:border-red-700 transition-all shadow-sm rounded-sm flex flex-col justify-between min-h-[300px]">
                    <ShieldAlert className="absolute top-6 right-6 text-slate-200 group-hover:text-red-100 transition-colors pointer-events-none" size={96} />
                    
                    <div className="relative z-10 w-full space-y-4">
                      <div className="font-mono text-[11px] text-red-700 font-bold tracking-wider uppercase">
                        FILE REF: {item.id} <span className="text-slate-400">| {cat.node} NODE</span>
                      </div>
                      
                      <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-slate-950 group-hover:text-red-700 transition-colors leading-tight">
                        {item.title}
                      </h2>
                      
                      <p className="text-sm sm:text-base text-slate-700 font-sans normal-case leading-relaxed border-l-2 border-slate-200 pl-4">
                        {item.summary}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 text-slate-950 font-mono font-bold uppercase text-xs tracking-wider group-hover:text-red-700 transition-colors mt-8">
                      <span>ACCESS CASE AUTOPSY</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform shrink-0 text-red-700" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
