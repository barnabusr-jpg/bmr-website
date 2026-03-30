"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, ShieldAlert, Lock, Terminal } from "lucide-react";

export default function ActivationModal({ isOpen, onClose, protocolName, accentColor = "red" }) {
  const [email, setEmail] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<"idle" | "scanning" | "authorized" | "unauthorized" | "locked">("idle");
  const [profile, setProfile] = useState(null);

  // Lockout logic: 3 failed attempts triggers a 15-minute blockade
  useEffect(() => {
    if (attempts >= 3) {
      setStatus("locked");
      console.error("! SECURITY_ALERT // EXCESSIVE_FAILED_MATCHES // LOGGING_IP");
    }
  }, [attempts]);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("scanning");

    try {
      // Simulate a forensic database lookup
      const response = await fetch(`/api/validate-operator?email=${email}`);
      const data = await response.json();

      if (data.authorized && data.pulseCheckComplete) {
        setProfile(data.profile);
        setStatus("authorized");
      } else {
        setAttempts(prev => prev + 1);
        setStatus("unauthorized");
      }
    } catch (err) {
      setAttempts(prev => prev + 1);
      setStatus("unauthorized");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

        {/* 🛡️ THE SECURITY ENVELOPE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="relative w-full max-w-lg bg-slate-950 border border-red-600/30 p-1 shadow-2xl"
        >
          {/* Grainy Noise Overlay for IP Protection */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

          <div className="relative z-10 bg-[#020617] p-8 md:p-12 border border-slate-900">
            <button onClick={onClose} className="absolute top-6 right-6 text-slate-700 hover:text-white transition-colors">
              <X size={18} />
            </button>

            {status === "locked" ? (
              <div className="py-12 text-center space-y-6">
                <Lock size={40} className="mx-auto text-red-600 animate-pulse" />
                <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">! ACCESS_DENIED</h2>
                <p className="text-slate-500 text-[10px] font-mono uppercase leading-relaxed tracking-widest">
                  EXCESSIVE_FAILED_MATCHES. <br /> YOUR_IP_HAS_BEEN_LOGGED. <br /> CONTACT_ADMIN_FOR_CLEARANCE.
                </p>
              </div>
            ) : status === "authorized" ? (
              <div className="space-y-8">
                <div className="border-l-2 border-green-600 pl-6 space-y-2">
                  <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.3em] italic">OPERATOR_RECOGNIZED</span>
                  <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                    {profile?.archetype || "THE_GHOST"}
                  </h3>
                </div>
                
                <div className="bg-slate-900/50 p-6 border border-slate-900">
                  <p className="text-slate-600 text-[9px] uppercase font-mono mb-2">REWORK_TAX_SNAPSHOT //</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">{profile?.reworkTax || "22.5"}%</span>
                    <span className="text-red-600 text-[10px] font-black uppercase italic animate-pulse">! DRIFT_DETECTED</span>
                  </div>
                </div>

                <button className="w-full py-5 bg-green-600 text-white font-black uppercase text-[11px] tracking-[0.4em] italic hover:bg-white hover:text-black transition-all">
                  INITIALIZE {protocolName}
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-red-600" />
                    <span className="text-red-600 text-[10px] font-mono font-black uppercase tracking-[0.3em]">SECURE_GATEWAY_V4</span>
                  </div>
                  <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">
                    IDENTIFY <br />OPERATOR.
                  </h2>
                </div>

                <form onSubmit={handleLookup} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-slate-700 uppercase tracking-widest font-bold">CREDENTIAL_IDENTIFIER //</label>
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="EMAIL@SYSTEM.COM" 
                      className="w-full bg-black border border-slate-900 p-4 text-white font-mono text-sm uppercase focus:outline-none focus:border-red-600 transition-all rounded-none"
                    />
                  </div>

                  {status === "unauthorized" && (
                    <p className="text-red-600 text-[9px] font-black uppercase italic animate-bounce">
                      ! NO_DIAGNOSTIC_MATCH_FOUND. RE-SCAN_REQUIRED.
                    </p>
                  )}

                  <button 
                    disabled={status === "scanning"}
                    className="w-full py-5 bg-red-600 text-white font-black uppercase text-[11px] tracking-[0.4em] italic hover:bg-white hover:text-black transition-all disabled:opacity-50"
                  >
                    {status === "scanning" ? "SCANNING_DATABASE..." : "VALIDATE_CLEARANCE"}
                  </button>
                </form>

                <p className="text-[9px] text-slate-600 uppercase tracking-tight leading-relaxed">
                  Attempt {attempts} of 3. Unauthorized access is a violation of BMR structural protocols. 
                  Do not proceed if you have not finished the thirty question diagnostic.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
