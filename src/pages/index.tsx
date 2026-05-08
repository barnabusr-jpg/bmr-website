"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroHome from "@/components/home/HeroHome";
import InsightsHome from "@/components/home/InsightsHome";
import OutcomesHome from "@/components/home/OutcomesHome";
import ComparisonGrid from "@/components/home/ComparisonGrid";
import ServicesPreviewHome from "@/components/home/ServicesPreviewHome";
import { Shield, TrendingUp, Activity, ShieldCheck } from "lucide-react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col selection:bg-red-600/30 w-full font-sans overflow-x-hidden">
      {/* 🏛️ GLOBAL HEADER (Handles the Diagnostic Modal Launch) */}
      <Header />
      
      <main className="flex-grow w-full">
        {/* 🚀 HERO SECTION */}
        <HeroHome />
        
        {/* 🛡️ EXECUTIVE SUMMARY: 2.0 ACCESSIBILITY ISLANDS */}
        <section className="py-24 px-6 bg-slate-950/50 border-y border-slate-900">
          <div className="container mx-auto max-w-[1280px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <Activity className="text-red-600" size={40} />, 
                  title: "Systemic Decay", 
                  desc: "Unmonitored AI drift creates a 'Hidden Rework Tax'—the manual effort hidden inside automated systems." 
                },
                { 
                  icon: <TrendingUp className="text-red-600" size={40} />, 
                  title: "Capital Leakage", 
                  desc: "Operational decoupling drains up to 40% of AI budgets into invisible manual validation loops." 
                },
                { 
                  icon: <ShieldCheck className="text-red-600" size={40} />, 
                  title: "Fiduciary Shield", 
                  desc: "Our forensic triangulation hardens your logic roadmap and secures board-level accountability." 
                }
              ].map((card, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] border-l-[12px] border-red-600 group hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500">
                    {card.icon}
                  </div>
                  <h3 className="text-black text-2xl font-black uppercase italic mb-4 tracking-tighter leading-none italic">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 font-bold uppercase text-[10px] leading-relaxed italic tracking-tight italic">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🔍 SECONDARY SECTIONS */}
        <InsightsHome />
        <OutcomesHome />
        <ComparisonGrid />
        <ServicesPreviewHome />
      </main>

      {/* 🏛️ GLOBAL FOOTER */}
      <Footer />

      {/* 🛠️ ADMIN SHORTCUT */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => router.push('/admin/dashboard')} 
        className="fixed bottom-10 right-10 z-[10000] cursor-crosshair w-12 h-12 flex items-center justify-center rounded-full border-2 border-slate-800 bg-slate-950 hover:border-red-600 transition-all group"
      >
        <Shield size={16} className="text-slate-600 group-hover:text-red-600" />
        <span className="absolute right-14 bg-slate-900 text-white text-[8px] font-mono py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap italic">
          [ AUTH_REQUIRED ]
        </span>
      </motion.div>
    </div>
  );
}
