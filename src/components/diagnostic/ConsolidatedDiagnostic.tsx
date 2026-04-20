"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Building, ChevronRight, Activity, Zap } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("intake"); 
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [userInputKey, setUserInputKey] = useState("");
  const [serverChallenge, setServerChallenge] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleStartDiagnostic = async () => {
    if (!email || !operatorName || !entityName) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/generate-key', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email: email.trim().toLowerCase() }) 
      });
      const data = await res.json();
      if (res.ok) { 
        setServerChallenge(data.challenge); 
        setStep("verify"); 
      }
    } catch (err) { console.error("SYNC_ERROR:", err); }
    setIsLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 relative min-h-[850px] font-sans">
      <AnimatePresence mode="wait">
        {step === "intake" && (
          <motion.div key="intake" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-16 text-center">
            <h1 className="text-7xl md:text-8xl font-black uppercase italic text-white tracking-tighter leading-none">
              THE LOGIC <span className="text-red-600">PULSE</span>
            </h1>

            <div className="bg-slate-950 border-2 border-slate-900 p-12 max-w-4xl mx-auto space-y-8 relative shadow-[0_0_100px_rgba(220,38,38,0.05)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-red-600" size={20} />
                  <input placeholder="OPERATOR_NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="w-full bg-black border border-slate-800 p-8 pl-16 text-white uppercase font-mono tracking-widest outline-none focus:border-red-600" />
                </div>
                <div className="relative group">
                  <Building className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-red-600" size={20} />
                  <input placeholder="ORGANIZATION" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="w-full bg-black border border-slate-800 p-8 pl-16 text-white uppercase font-mono tracking-widest outline-none focus:border-red-600" />
                </div>
                <div className="md:col-span-2 relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-red-600" size={20} />
                  <input placeholder="SECURE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-slate-800 p-8 pl-16 text-white uppercase font-mono tracking-widest outline-none focus:border-red-600" />
                </div>
              </div>

              <button onClick={handleStartDiagnostic} className="w-full py-10 bg-red-600 text-white font-black uppercase italic text-2xl tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all flex justify-center items-center gap-4 group">
                {isLoading ? "INITIATING..." : "GENERATE_ACCESS_KEY"}
                <ChevronRight className="group-hover:translate-x-2 transition-transform" size={32} />
              </button>
            </div>
          </motion.div>
        )}

        {step === "verify" && (
          <motion.div key="verify" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-12">
            <h2 className="text-6xl md:text-7xl font-black uppercase italic text-white tracking-tighter text-white">SECURE_<span className="text-red-600">VERIFICATION</span></h2>
            <div className="max-w-md mx-auto space-y-8">
              <input maxLength={6} placeholder="000000" value={userInputKey} onChange={(e) => setUserInputKey(e.target.value)} className="w-full bg-black border-2 border-slate-900 p-10 text-6xl text-center font-mono tracking-[0.4em] text-white outline-none focus:ring-2 ring-red-600" />
              <button onClick={() => { if(userInputKey === serverChallenge) setStep("audit_active"); }} className="w-full py-8 bg-white text-black font-black uppercase italic hover:bg-red-600 hover:text-white transition-all text-xl">AUTHORIZE_SESSION</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
