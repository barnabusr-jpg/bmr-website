"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Building, ChevronRight, Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("intake"); // Steps: intake -> verify -> audit
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
    } catch (err) { console.error("AUTH_FAILURE:", err); }
    setIsLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 min-h-[700px] text-white font-sans">
      <AnimatePresence mode="wait">
        {step === "intake" && (
          <motion.div key="intake" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
                INITIALIZE_<span className="text-red-600">PROTOCOL</span>
              </h2>
              <p className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase">Credentials required for forensic access</p>
            </div>

            <div className="grid gap-4 bg-slate-950 p-10 border border-slate-900 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                <input placeholder="OPERATOR_NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="w-full bg-black border border-slate-800 p-6 pl-14 uppercase font-mono text-sm outline-none focus:border-red-600 transition-all" />
              </div>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                <input placeholder="ORGANIZATION" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="w-full bg-black border border-slate-800 p-6 pl-14 uppercase font-mono text-sm outline-none focus:border-red-600 transition-all" />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                <input placeholder="SECURE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-slate-800 p-6 pl-14 uppercase font-mono text-sm outline-none focus:border-red-600 transition-all" />
              </div>
              <button 
                onClick={handleStartDiagnostic}
                disabled={isLoading || !email}
                className="w-full py-8 bg-red-600 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all flex justify-center items-center gap-4 text-lg"
              >
                {isLoading ? "TRANSMITTING..." : "GENERATE_ACCESS_KEY"} <ChevronRight size={24}/>
              </button>
            </div>
          </motion.div>
        )}

        {step === "verify" && (
          <motion.div key="verify" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-6xl font-black uppercase italic tracking-tighter">SECURE_<span className="text-red-600">VERIFICATION</span></h2>
              <p className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase italic">Check {email} for access signal</p>
            </div>
            <div className="max-w-md mx-auto space-y-8">
              <input 
                maxLength={6} 
                placeholder="000000" 
                value={userInputKey} 
                onChange={(e) => setUserInputKey(e.target.value)} 
                className="w-full bg-black border-2 border-slate-900 p-10 text-5xl text-center font-mono tracking-[0.5em] text-white outline-none focus:border-red-600" 
              />
              <button 
                onClick={() => { if(userInputKey === serverChallenge) setStep("audit_active"); }} 
                className="w-full py-8 bg-white text-black font-black uppercase italic tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all text-xl"
              >
                AUTHORIZE_SESSION
              </button>
            </div>
          </motion.div>
        )}

        {step === "audit_active" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Activity className="text-red-600 mx-auto mb-6 animate-pulse" size={64} />
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">DIAGNOSTIC_PROTOCOL_LIVE</h2>
            <p className="text-slate-500 font-mono mt-4">Node: {operatorName} | Entity: {entityName}</p>
            {/* Insert Question logic here or call a subcomponent */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
