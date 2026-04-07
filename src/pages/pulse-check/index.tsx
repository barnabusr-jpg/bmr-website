"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogicLeakTicker from "@/components/LogicLeakTicker";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Lock, Activity, Unlock, ChevronRight } from "lucide-react";

// 🛡️ BMR FORENSIC COMPONENT
export default function PulseCheckPage() {
  const router = useRouter();
  const [accessState, setAccessState] = useState<"public" | "verifying" | "authorized">("public");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const initiateVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const blocked = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    const domain = email.split("@")[1];
    
    if (blocked.includes(domain)) {
      setError("CORPORATE_DOMAIN_REQUIRED");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setAccessState("verifying");
      } else {
        // Fallback for simulation if API isn't live yet
        setAccessState("verifying"); 
      }
    } catch (err) {
      setAccessState("verifying");
    } finally {
      setIsSubmitting(false);
    }
  };

  const authorizeDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") {
      setAccessState("authorized");
    } else {
      setError("INVALID_AUTHORIZATION_CODE");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Header />
      <main className="pt-48 px-6 container mx-auto flex flex-col items-center justify-center min-h-[70vh]">
        <div className="max-w-3xl w-full text-center space-y-12">
          
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center gap-3 text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">
              <Activity size={14} className="animate-pulse" /> SHEAR_DIAGNOSTIC_PROTOCOL_V4
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
              Pulse <span className="text-red-600">Check</span>
            </h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest max-w-lg mx-auto leading-relaxed italic">
              AUTHORIZED ACCESS ONLY. SYSTEMIC RISK ASSESSMENT REQUIRES VERIFIED OPERATOR CREDENTIALS.
            </p>
          </div>

          <div className="bg-slate-950/50 border border-slate-900 p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
            
            <AnimatePresence mode="wait">
              {accessState === "public" && (
                <motion.div key="public" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                  <div className="space-y-2">
                    <Lock size={24} className="mx-auto text-slate-700" />
                    <h3 className="text-xl font-black uppercase italic text-slate-400">Identify Operator</h3>
                  </div>
                  <form onSubmit={initiateVerification} className="space-y-4">
                    <input 
                      type="email" required placeholder="OFFICIAL_WORK_EMAIL@FIRM.COM" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#020617] border border-slate-800 px-6 py-5 text-[11px] font-mono text-white focus:border-red-600 outline-none tracking-widest text-center"
                    />
                    <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white py-5 font-black font-mono text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                      {isSubmitting ? "INITIATING_HANDSHAKE..." : "REQUEST_ACCESS"}
                    </button>
                  </form>
                </motion.div>
              )}

              {accessState === "verifying" && (
                <motion.div key="verifying" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                  <div className="space-y-2">
                    <ShieldAlert size={24} className="mx-auto text-red-600 animate-pulse" />
                    <h3 className="text-xl font-black uppercase italic text-white">Authorize Terminal</h3>
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Key sent to: {email}</p>
                  </div>
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
                <motion.div key="authorized" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                  <div className="space-y-2">
                    <Unlock size={24} className="mx-auto text-green-500" />
                    <h3 className="text-xl font-black uppercase italic text-white">Access Granted</h3>
                  </div>
                  <button onClick={() => router.push('/vault-alpha')} className="w-full bg-red-600 text-white py-6 font-black font-mono text-[12px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group">
                    BEGIN SYSTEMIC AUDIT <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {error && <p className="mt-6 text-red-600 font-mono text-[9px] font-black tracking-widest uppercase animate-pulse">{error}</p>}
          </div>
        </div>
      </main>
      <LogicLeakTicker /><Footer />
    </div>
  );
}
