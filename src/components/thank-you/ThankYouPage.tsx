"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ArrowRight, ShieldAlert, Fingerprint } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-red-600/30">
      <Header />

      <main className="py-24 px-6 relative overflow-hidden">
        {/* Background Grid: Forensic Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Operational Icon */}
            <div className="mx-auto w-fit p-4 rounded-none bg-red-600/10 mb-8 border border-red-600/20 shadow-[0_0_25px_rgba(220,38,38,0.15)]">
              <ShieldAlert className="h-8 w-8 text-red-600" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic text-white leading-none">
              Transmission <span className="text-slate-800">Received</span>
            </h1>

            <div className="space-y-6 text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto italic uppercase tracking-[0.2em]">
              <p>
                Your diagnostic data has been isolated for forensic audit. 
                We are currently mapping the variance between vision and execution.
              </p>
              <div className="flex items-center justify-center gap-4 pt-6 border-t border-slate-900">
                <Fingerprint size={16} className="text-red-600 opacity-40" />
                <p className="text-[10px] font-black text-red-600 tracking-[0.6em] not-italic">
                  STATUS_LOGGED // BMR_FORENSIC_V1.0
                </p>
              </div>
            </div>

            <div className="mt-14">
              <Card className="p-10 border-2 border-slate-900 bg-slate-900/10 rounded-none text-left backdrop-blur-md relative">
                {/* Visual Hardening: Corner Bracket */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-red-600/10 pointer-events-none"></div>
                
                <h2 className="text-2xl font-black mb-4 text-white uppercase italic tracking-tighter">Strategic Triage</h2>
                <p className="mb-8 text-slate-400 leading-relaxed uppercase text-[11px] tracking-[0.25em]">
                  Our analysts are reviewing the captured logic-drift. A technical summary 
                  is being prepared for your environment, covering:
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <ul className="space-y-4 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                    <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 bg-red-600" /> System Friction Points</li>
                    <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 bg-red-600" /> Probabilistic Decay</li>
                  </ul>
                  <ul className="space-y-4 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                    <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 bg-red-600" /> Trust Integrity Scan</li>
                    <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 bg-red-600" /> Drift-Zone Isolation</li>
                  </ul>
                </div>
                
                <div className="pt-10 border-t border-slate-900">
                   <div className="flex flex-col sm:flex-row gap-6">
                    {/* The Surgical Link Bypass: Vercel Safety */}
                    <Link 
                      href="/contact"
                      className="group inline-flex items-center justify-center h-16 px-12 text-[10px] font-black uppercase tracking-[0.4em] bg-red-600 text-white transition-all hover:bg-white hover:text-black shadow-[0_0_40px_rgba(220,38,38,0.25)]"
                    >
                      Initialize Conversation <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </Link>

                    <Link 
                      href="/"
                      className="inline-flex items-center justify-center h-16 px-10 text-[10px] font-black uppercase tracking-[0.4em] border border-slate-800 text-slate-500 hover:text-white hover:border-white transition-all"
                    >
                      Return to Command
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
