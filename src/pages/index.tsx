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
    <div className="min-h-screen bg-[#020617] flex flex-col selection:bg-red-600/30 w-full font-sans">
      <Header />
      <main className="flex-grow w-full pt-24 md:pt-0">
        <HeroHome />
        
        {/* 🛡️ EXECUTIVE SUMMARY: HIGH-CONTRAST ACCESSIBILITY ISLAND */}
        <section className="py-24 px-6 bg-slate-950/50 border-y border-slate-900">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <Activity className="text-red-600" size={40} />, 
                  title: "The Problem", 
                  desc: "Unmonitored AI drift creates a 'Hidden Rework Tax' that drains engineering capacity and ROI." 
                },
                { 
                  icon: <TrendingUp className="text-red-600" size={40} />, 
                  title: "The Leak", 
                  desc: "For every $1M spent, up to $400K is lost to manual intervention and validation loops." 
                },
                { 
                  icon: <ShieldCheck className="text-red-600" size={40} />, 
                  title: "The Shield", 
                  desc: "Our 360° Triangulation hardens your roadmap and secures your fiduciary standing." 
                }
              ].map((card, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white p-12 shadow-2xl border-l-[12px] border-red-600"
                >
                  <div className="mb-8">{card.icon}</div>
                  <h3 className="text-black text-2xl font-black uppercase italic mb-4 tracking-tighter leading-none">{card.title}</h3>
                  <p className="text-slate-600 font-bold uppercase text-[10px] leading-relaxed italic tracking-tight">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <InsightsHome />
        <OutcomesHome />
        <ComparisonGrid />
        <ServicesPreviewHome />
      </main>
      <Footer />

      {/* ADMIN SHORTCUT */}
      <div 
        onClick={() => router.push('/admin/dashboard')} 
        className="fixed bottom-10 right-10 z-[10000] cursor-crosshair w-12 h-12 flex items-center justify-center rounded-full border-2 border-slate-800 bg-slate-950 hover:border-red-600 transition-all group"
      >
        <Shield size={16} className="text-slate-600 group-hover:text-red-600" />
      </div>
    </div>
  );
}
