"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Zap, Activity } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function FieldGuideOverviewPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          
          {/* HERO SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 space-y-6"
          >
            <div className="flex justify-center items-center gap-3 mb-2">
              <div className="h-px w-8 bg-red-600" />
              <p className="text-[10px] font-black tracking-[0.4em] text-red-600 uppercase italic">
                BMR_INSIGHT_PROTOCOL
              </p>
              <div className="h-px w-8 bg-red-600" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none">
              Field Guide <span className="text-slate-800">Overview</span>
            </h1>

            <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed italic">
              An executive orientation to how trust, governance, and value erode when AI-enabled
              systems behave differently than expected.
            </p>
          </motion.div>

          {/* WHY THIS GUIDE EXISTS */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-5xl mx-auto mb-14"
          >
            <Card className="p-10 border-2 border-slate-900 bg-slate-900/20 backdrop-blur-md rounded-none relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-700" />
              
              <div className="flex items-center gap-4 mb-6">
                <ShieldCheck className="text-red-600 h-8 w-8" />
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">
                  Why This Guide Exists
                </h2>
              </div>

              <div className="space-y-6 text-slate-400 leading-relaxed font-mono text-sm uppercase tracking-wide">
                <p>Organizations rarely struggle with AI because of tooling.</p>
                <p className="text-red-600 font-bold underline decoration-red-600/30 underline-offset-8">
                  They struggle because:
                </p>
                <ul className="space-y-4 border-l border-slate-800 pl-6">
                  <li>[01] People do not trust decisions they cannot understand</li>
                  <li>[02] Governance loses influence under pressure</li>
                  <li>[03] Value becomes difficult to see before confidence erodes</li>
                </ul>
                <p className="pt-4 text-xs italic text-slate-500">
                  // The Field Guide provides shared language to recognize these patterns early.
                </p>
              </div>
            </Card>
          </motion.section>

          {/* CORE PERSPECTIVES GRID */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">
            {[
              { 
                title: "Human–AI Interaction", 
                icon: <Activity size={20} />,
                desc: "How people experience AI-influenced decisions in real operational contexts." 
              },
              { 
                title: "Adoption Value", 
                icon: <Zap size={20} />,
                desc: "Whether AI efforts translate into sustained organizational value over time." 
              },
              { 
                title: "Trust & Evolution", 
                icon: <BookOpen size={20} />,
                desc: "Recurring patterns observed as AI initiatives mature and drift." 
              }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-slate-900 bg-slate-950 hover:border-red-600/40 transition-colors group">
                <div className="text-red-600 mb-6 group-hover:animate-pulse">{item.icon}</div>
                <h3 className="text-white font-black uppercase tracking-widest text-xs mb-4 italic">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-[11px] leading-relaxed uppercase tracking-wider">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* NEXT STEPS / CTA */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="p-12 border-2 border-red-600/20 bg-red-600/[0.02] rounded-none text-center">
              <h2 className="text-3xl font-black text-white mb-6 uppercase italic tracking-tighter">
                Systemic <span className="text-red-600">Awareness</span>
              </h2>
              <p className="text-slate-400 mb-10 text-sm uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto">
                If misalignment between vision and delivery is suspected, the first step is 
                identifying early signals before architectural collapse.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  href="/promise-gap/diagnostic"
                  className="inline-flex items-center justify-center h-16 px-10 text-[10px] font-black uppercase tracking-[0.3em] bg-red-600 text-white transition-all hover:bg-white hover:text-black shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                >
                  Check for early signals <ArrowRight className="ml-3 h-4 w-4" />
                </Link>

                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center h-16 px-10 text-[10px] font-black uppercase tracking-[0.3em] border border-slate-800 text-slate-500 hover:text-white hover:border-white transition-all"
                >
                  Start a Conversation
                </Link>
              </div>
            </Card>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
