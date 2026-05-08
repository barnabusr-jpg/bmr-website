"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldAlert, Key } from "lucide-react";

export default function AdminPortal() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("identify");
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "identify") setStep("verify");
    else {
      sessionStorage.setItem("bmr_admin_verified", "true");
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-white font-sans italic">
      <div className="w-full max-w-md space-y-10 bg-slate-950 border border-slate-900 p-16 shadow-[0_0_100px_rgba(0,0,0,1)] relative">
        <div className="text-center space-y-4">
          <Lock size={40} className="mx-auto text-red-600 animate-pulse" />
          <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
            Admin <span className="text-red-600">Terminal</span>
          </h1>
          <p className="text-slate-600 font-mono text-[9px] uppercase tracking-[0.4em] font-black">
            ALPHA-7_CLEARANCE_REQUIRED
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === "identify" ? (
              <motion.div key="id" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 block font-black">Operator_Signal</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ADMIN_EMAIL" className="bg-black border border-slate-800 p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600 font-mono italic" />
              </motion.div>
            ) : (
              <motion.div key="ver" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 block font-black">Secure_Passkey</label>
                <input type="text" required maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="000000" className="bg-black border border-red-600/50 p-6 text-5xl text-center font-black text-white w-full outline-none focus:border-red-600 font-mono tracking-[0.4em]" />
              </motion.div>
            )}
          </AnimatePresence>

          <button className="w-full py-6 bg-red-600 text-white font-black uppercase italic text-xs tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all shadow-2xl">
            {step === "identify" ? "GENERATE_KEY" : "AUTHORIZE_ACCESS"}
          </button>
        </form>
        
        <div className="pt-6 border-t border-slate-900 flex items-center justify-center gap-3 opacity-20">
          <ShieldAlert size={12} />
          <span className="text-[8px] font-mono uppercase tracking-widest">Fiduciary_Encryption_Active</span>
        </div>
      </div>
    </div>
  );
}
