import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import {
  Activity,
  ShieldAlert,
  Terminal,
  Fingerprint,
  ArrowRight,
  Database,
  AlertTriangle
} from "lucide-react";

export default function PulseCheckEntry() {
  const router = useRouter();

  const systemMetadata = [
    {
      icon: Terminal,
      label: "LOGIC TRACE STATUS",
      value: "ACTIVE",
      color: "text-red-600"
    },
    {
      icon: Fingerprint,
      label: "SESSION IDENTITY",
      value: "ANONYMIZED",
      color: "text-slate-400"
    },
    {
      icon: Database,
      label: "DATA PROTECTION",
      value: "AES-256 ENCRYPTION",
      color: "text-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600">
      <Head>
        <title>BMR | SYSTEM DIAGNOSTIC V3.2</title>
      </Head>
      <Header />

      <main className="pt-48 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-slate-900 bg-slate-900/10 p-12 md:p-20 relative overflow-hidden"
          >
            {/* TERMINAL SCANNING BAR */}
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-900">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-full bg-red-600/50 blur-sm"
              />
            </div>

            <div className="flex flex-col items-center text-center space-y-10">
              <div className="relative">
                <Activity className="h-16 w-16 text-red-600 animate-pulse" />
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2"
                >
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </motion.div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                  SYSTEM <br /> DIAGNOSTIC
                </h1>
                <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
                  PULSE CHECK V3.2 // FORENSIC INTAKE
                </p>
              </div>

              <p className="text-slate-400 text-lg font-light italic max-w-xl leading-relaxed">
                This 12-QUESTION DIAGNOSTIC SEQUENCE identifies the primary friction points in your AI logic chain. 
                Do not exit the terminal before completion.
              </p>

              {/* SYSTEM METADATA GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 w-full border-y border-slate-900">
                {systemMetadata.map((item, i) => (
                  <div key={i} className="space-y-3">
                    <item.icon className={`h-5 w-5 mx-auto ${item.color}`} />
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-none">
                      {item.label}
                    </div>
                    <div className="text-xs font-black text-white tracking-tight">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 w-full space-y-8">
                <button 
                  onClick={() => router.push('/pulse-check/assessment')}
                  className="w-full bg-red-600 text-white font-black py-7 uppercase text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group shadow-2xl shadow-red-900/20"
                >
                  INITIATE FORENSIC TRACE <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex items-center justify-center gap-4 py-4 px-6 border border-slate-900 bg-slate-950/50">
                  <ShieldAlert className="h-4 w-4 text-slate-700" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
                    WARNING: SHADOW AI DETECTION REQUIRES ACCURATE INPUT PARAMETERS
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-12 flex justify-between items-center px-4">
             <div className="text-[9px] font-mono text-slate-800 uppercase tracking-widest">
               BMR // SECURE_INTAKE_MODULE
             </div>
             <div className="text-[9px] font-mono text-slate-800 uppercase tracking-widest">
               NO PROPRIETARY DATA COLLECTED
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
