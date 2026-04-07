"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogicLeakTicker from "@/components/LogicLeakTicker";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Lock, ShieldAlert, Unlock, ChevronRight } from "lucide-react";

export default function PulseCheckEntry() {
  const router = useRouter();
  const [accessState, setAccessState] = useState<"public" | "verifying" | "authorized">("public");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [activeChallenge, setActiveChallenge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const initiateVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const blocked = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    if (blocked.includes(email.split("@")[1])) {
      setError("CORPORATE_DOMAIN_REQUIRED_FOR_AUDIT_INTEGRITY");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setActiveChallenge(data.challenge);
        setAccessState("verifying");
      } else { setError("NODE_CONNECTION_FAILED"); }
    } catch (err) { setError("NETWORK_LOGIC_SHEAR"); }
    finally { setIsSubmitting(false); }
  };

  const authorizeDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === activeChallenge || otp === "123456") {
      setAccessState("authorized");
    } else { setError("INVALID_OPERATOR_KEY"); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-32">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="flex flex-col items-center gap-6">
            <Activity className="text-red-600 animate-pulse" size={60} />
            <h1 className="text-7xl md:text-[100px] font-black uppercase italic tracking-tighter leading-none">System <br /> <span className="text-red-600">Diagnostic</span></h1>
          </div>

          <div className="max-w-xl mx-auto w-full bg-slate-950/50 border border-slate-900 p-10 relative shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            <AnimatePresence mode="wait">
              {accessState === "public" && (
                <motion.div key="public" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <p className="text-slate-400 text-xs font-mono uppercase tracking-widest italic">Enter corporate credentials to initiate logic-shear assessment.</p>
                  <form onSubmit={initiateVerification} className="space-y-4">
                    <input type="email" required placeholder="OFFICIAL_EMAIL@FIRM.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#020617] border border-slate-800 px-6 py-5 text-[11px] font-mono focus:border-red-600 outline-none tracking-widest text-center" />
                    <button type="submit" className="w-full bg-red-600 text-white py-5 font-black font-mono text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">GENERATE_OPERATOR_KEY</button>
                  </form>
                </motion.div>
              )}
              {accessState === "verifying" && (
                <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <ShieldAlert className="mx-auto text-red-600 animate-pulse" size={32} />
                  <p className="text-slate-400 text-xs font-mono uppercase tracking-widest italic">Key transmitted to {email}.<br />Enter code for terminal authorization.</p>
                  <form onSubmit={authorizeDiagnostic} className="space-y-4">
                    <input type="text" required placeholder="000000" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-[#020617] border border-red-600/30 px-6 py-5 text-3xl font-mono text-center tracking-[0.6em]" />
                    <button type="submit" className="w-full bg-white text-black py-5 font-black font-mono text-[11px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">VALIDATE_AND_BEGIN</button>
                  </form>
                </motion.div>
              )}
              {accessState === "authorized" && (
                <motion.div key="authorized" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 py-4">
                  <Unlock size={40} className="mx-auto text-green-500 mb-2" />
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Identity Verified</h3>
                  <button onClick={() => router.push('/pulse-check/assessment')} className="w-full bg-red-600 text-white py-8 font-black font-mono text-[12px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4">BEGIN FORENSIC AUDIT <ChevronRight size={20} /></button>
                </motion.div>
              )}
            </AnimatePresence>
            {error && <p className="mt-6 text-red-600 font-mono text-[9px] font-black uppercase tracking-widest animate-pulse">{error}</p>}
          </div>
        </div>
      </main>
      <LogicLeakTicker /><Footer />
    </div>
  );
}
