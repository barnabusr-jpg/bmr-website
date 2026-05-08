"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight, Activity, FileText, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const VAULT_NODES = [
  { 
    id: "BMR-2026-EXE-01",
    tag: "FIDUCIARY_PROTECTION",
    title: "EXECUTIVE VARIANCE",
    quote: "70% of AI governance failures stem from unmonitored logic drift.",
    insight: "We implement atomic logging to secure fiduciary defensibility.",
    path: "chatbot-liability",
    label: "EXECUTIVE NODE"
  },
  { 
    id: "BMR-2026-MGR-02",
    tag: "CAPITAL_RECOVERY",
    title: "LABOR WASTE AUDIT",
    quote: "Hidden rework tax consumes 30% of engineering budgets.",
    insight: "Forensic validation loops recover lost developer capacity.",
    path: "lyft-logic-shear",
    label: "MANAGERIAL NODE"
  },
  { 
    id: "BMR-2026-TEC-03",
    tag: "STRUCTURAL_HARDENING",
    title: "OPERATIONAL DRIFT",
    quote: "The point where machine execution decouples from strategic intent.",
    insight: "BMR circuits enforce alignment between code and consequence.",
    path: "salesforce-failure",
    label: "TECHNICAL NODE"
  }
];

export default function BriefingsVault() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30 text-left">
      <Header />
      <main className="flex-grow pt-48 pb-20 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          
          <header className="space-y-6 border-l-8 border-red-600 pl-10">
            <div className="text-[9px] font-mono text-red-600 font-black tracking-[0.5em] mb-2 uppercase italic">
              BMR_VAULT_VER_2.0 // CLINICAL_UPGRADE
            </div>
            <h1 className="text-[90px] md:text-[120px] font-black uppercase italic tracking-tighter leading-[0.8] text-white">
              EVIDENCE <br /> <span className="text-slate-800 italic">VAULT.</span>
            </h1>
            <p className="text-slate-500 font-mono text-[11px] mt-6 uppercase tracking-[0.4em] font-black italic">
               Status: Protected_Access // Case_Archive_2026
            </p>
          </header>

          <div className="space-y-8">
            {VAULT_NODES.map((node) => (
              <motion.div 
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-950/40 border border-slate-900 p-12 md:p-20 relative overflow-hidden group hover:border-red-600 transition-all duration-500"
              >
                <div className="flex items-center gap-4 text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-10 leading-none">
                  {node.tag} // {node.label}
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                  <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">
                      {node.title}
                    </h2>
                    <p className="text-2xl text-slate-400 italic font-medium leading-relaxed">
                      "{node.quote}"
                    </p>
                    <button 
                      onClick={() => router.push(`/briefings/case-study/${node.path}`)}
                      className="flex items-center gap-4 text-red-600 font-black uppercase italic text-xs tracking-widest hover:text-white transition-colors"
                    >
                      ACCESS CASE AUTOPSY <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* 💡 ACCESSIBILITY ISLAND (WHITE CARD) */}
                  <div className="bg-white p-12 border-l-[12px] border-red-600 shadow-2xl">
                     <h4 className="text-[10px] font-mono font-black text-red-600 uppercase mb-4 italic tracking-widest flex items-center gap-2">
                        <FileText size={14}/> Forensic_Insight
                     </h4>
                     <p className="text-slate-800 text-xl font-black italic uppercase leading-tight">
                        "{node.insight}"
                     </p>
                  </div>
                </div>

                <ShieldAlert size={200} className="absolute -right-20 -bottom-20 text-red-600 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
