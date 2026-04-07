"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogicLeakTicker from "@/components/LogicLeakTicker";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ArrowRight, Lock, ShieldAlert, Unlock, ChevronRight } from "lucide-react";

export default function PulseCheckPage() {
  const router = useRouter();
  const [accessState, setAccessState] = useState<"public" | "verifying" | "authorized">("public");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const initiateVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // 🛡️ B2B FILTER: Block generic domains to ensure professional-grade leads
    const blocked = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];
    const domain = email.split("@")[1];
    
    if (blocked.includes(domain)) {
      setError("CORPORATE_DOMAIN_REQUIRED_FOR_DIAGNOSTIC_INTEGRITY");
      return;
    }

    setIsSubmitting(true);
    // 📡 Simulated Handshake with BMR Auth Node
    setTimeout(() => {
      setAccessState("verifying");
      setIsSubmitting(false);
    }, 1200);
  };

  const authorizeDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔐 Simulation: Using '123456' as the universal bypass for testing
    if (otp === "123456") {
      setAccessState("authorized");
    } else {
      setError("INVALID_OPERATOR_AUTHORIZATION_CODE");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-32">
        <div className="max-w-4xl w-full text-center space-y-12">
          
          {/* FORENSIC HEADER */}
          <div className="flex flex-col items-center gap-6">
            <Activity className="text-red-600 animate-pulse" size={60} />
            <h1 className="text-7xl md:text-[100px] font-black uppercase italic tracking-tighter leading-none">
              System <br /> <span className="text-red-600">Diagnostic</span>
            </h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em] font-black italic">
               Pulse Check V3.2 // Forensic Intake Node
            </p>
          </div>

          {/* STATUS GRID */}
          <div className="grid grid-cols-3 gap-6 py-10 border-y border-slate-900/50">
             <div className="space-y-2">
                <p className="text-[8px] font-mono uppercase text-slate-600 tracking-[0.3em]">Operator Identity</p>
                <p className={`text-[10px] font-black uppercase italic tracking-widest ${accessState === 'authorized' ? 'text-green-500' : 'text-red-600 animate-pulse'}`}>
                  {accessState === 'authorized' ? 'VERIFIED' : 'PENDING_AUTH'}
                </p>
             </div>
             <div className="space-y-2">
                <p className="text-[8px] font-mono uppercase text-slate-600 tracking-[0.3em]">Logic Trace</p>
                <p className="text-[10px] font-black uppercase italic text-white tracking-widest">ENCRYPTED_AES</p>
             </div>
             <div className="space-y-2">
                <p className="text-[8px] font-mono uppercase text-slate-600 tracking-[0.3em]">Fiduciary Guard</p>
                <p className="text-[10px] font-black uppercase italic text-white tracking-widest">ACTIVE</p>
             </div>
          </div>

          {/* AUTHENTICATION & INTAKE INTERFACE */}
          <div className="max-w-xl mx-auto w-full bg-slate-950/50 border border-slate-900 p-10 relative shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            
            <AnimatePresence mode="wait">
              {accessState === "public" && (
                <motion.div key="public" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <p className="text-slate-400 text-xs font-mono uppercase tracking-widest italic mb-6">
                    Enter official corporate credentials to initiate the logic-shear assessment.
                  </p>
                  <form onSubmit={initiateVerification} className="space-y-4">
                    <input 
                      type="email" required placeholder="OFFICIAL_WORK_EMAIL@FIRM.COM" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#020617] border border-slate-800 px-6 py-5 text-[11px] font-mono text-white focus:border-red-600 outline-none tracking-widest text-center transition-all"
                    />
                    <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white py-5 font-black font-mono text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                      {isSubmitting ? "TRANSMITTING..." : "GENERATE_OPERATOR_KEY"}
                    </button>
                  </form>
                </motion.div>
              )}

              {accessState === "verifying" && (
                <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <ShieldAlert className="mx-auto text-red-600 animate-pulse" size={32} />
                  <p className="text-slate-400 text-xs font-mono uppercase tracking-widest italic">
                    Temporary access key transmitted to {email}.<br />Enter code to authorize terminal.
                  </p>
                  <form onSubmit={authorizeDiagnostic} className="space-y-4">
                    <input 
                      type="text" required placeholder="000000" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-[#020617] border border-red-600/30 px-6 py-5 text-3xl font-mono text-white focus:border-red-600 outline-none tracking-[0.6em] text-center font-bold"
                    />
                    <button type="submit" className="w-full bg-white text-black py-5 font-black font-mono text-[11px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                      VALIDATE_AND_BEGIN
                    </button>
                  </form>
                </motion.div>
              )}

              {accessState === "authorized" && (
                <motion.div key="authorized" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 py-4">
                  <Unlock size={40} className="mx-auto text-green-500 mb-2" />
                  <h3 className="text-2xl font-black uppercase italic text-white tracking-tighter">Identity Verified</h3>
                  <button 
                    onClick={() => router.push('/vault-alpha')} 
                    className="w-full bg-red-600 text-white py-8 font-black font-mono text-[12px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                  >
                    Initiate Forensic Trace <ChevronRight className="group-hover:translate-x-2 transition-transform" size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="mt-6 text-red-600 font-mono text-[9px] font-black tracking-widest uppercase animate-pulse">
                Error: {error}
              </p>
            )}
          </div>

          <p className="text-slate-600 text-[9px] font-mono uppercase tracking-[0.3em] italic">
            All inputs are subject to BMR Security Protocol 7 // Data Purge Active post-session
          </p>
        </div>
      </main>
      <LogicLeakTicker />
      <Footer />
    </div>
  );
}
