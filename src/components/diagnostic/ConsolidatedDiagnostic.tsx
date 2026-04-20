"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Stethoscope, Factory, ShoppingCart } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("hero"); 
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [userInputKey, setUserInputKey] = useState("");
  const [serverChallenge, setServerChallenge] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleStartRegistration = async () => {
    if (!email || email !== confirmEmail) return;
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
    } catch (err) { console.error("AUTH_SIGNAL_LOSS:", err); }
    setIsLoading(false);
  };

  if (!mounted) return null;

  const forensicRed = "#D94032"; // The deeper, industrial red from your original screenshots

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-[#D94032]">
      <style jsx global>{`
        .forensic-font {
          font-family: 'Inter', sans-serif;
          font-stretch: 75%;
          letter-spacing: -0.05em;
        }
      `}</style>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: THE LOGIC PULSE HERO */}
        {step === "hero" && (
          <motion.div 
            key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="max-w-[1400px] mx-auto pt-32 px-6 space-y-24"
          >
            <div className="text-center cursor-pointer" onClick={() => setStep("registration")}>
              <h1 className="forensic-font text-[10vw] md:text-[11rem] font-black uppercase italic leading-[0.8] tracking-tighter">
                THE LOGIC <span style={{ color: forensicRed }}>PULSE</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "FINANCE", sub: "COMPLIANCE", icon: <Landmark style={{ color: forensicRed }} size={24} /> },
                { label: "HEALTHCARE", sub: "LIABILITY", icon: <Stethoscope style={{ color: forensicRed }} size={24} /> },
                { label: "INDUSTRIAL", sub: "OPERATIONS", icon: <Factory style={{ color: forensicRed }} size={24} /> },
                { label: "SERVICES", sub: "LABOR", icon: <ShoppingCart style={{ color: forensicRed }} size={24} /> }
              ].map((sector) => (
                <div 
                  key={sector.label} 
                  onClick={() => setStep("registration")}
                  className="bg-transparent border border-slate-900/50 p-12 min-h-[350px] flex flex-col justify-end gap-2 group hover:border-[#D94032]/30 transition-all cursor-pointer"
                >
                  <div className="group-hover:translate-y-[-5px] transition-transform">{sector.icon}</div>
                  <div className="mt-10">
                    <h3 className="forensic-font text-3xl font-black italic uppercase tracking-tighter">{sector.label}</h3>
                    <p className="text-[11px] font-mono tracking-[0.3em] uppercase" style={{ color: forensicRed }}>{sector.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: PROTOCOL REGISTRATION */}
        {step === "registration" && (
          <motion.div 
            key="registration" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="max-w-[1200px] mx-auto pt-40 px-6 space-y-16"
          >
            <div className="text-center">
              <h2 className="forensic-font text-[8vw] md:text-[9rem] font-black uppercase italic leading-none tracking-tighter">
                PROTOCOL <span style={{ color: forensicRed }}>REGISTRATION</span>
              </h2>
            </div>

            <div className="bg-slate-950/30 border border-slate-900/50 p-1 md:p-12 space-y-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {[
                  { p: "OPERATOR_NAME", v: operatorName, s: setOperatorName },
                  { p: "ORGANIZATION", v: entityName, s: setEntityName },
                  { p: "SECURE_EMAIL", v: email, s: setEmail },
                  { p: "CONFIRM_EMAIL", v: confirmEmail, s: setConfirmEmail }
                ].map((input) => (
                  <input 
                    key={input.p}
                    placeholder={input.p} 
                    value={input.v} 
                    onChange={(e) => input.s(e.target.value)} 
                    className="bg-black border border-slate-900 p-10 text-white uppercase font-mono text-sm tracking-widest outline-none focus:border-[#D94032] transition-all placeholder:text-slate-800" 
                  />
                ))}
              </div>

              <button 
                onClick={handleStartRegistration}
                className="w-full py-10 forensic-font text-white font-black uppercase italic text-3xl tracking-widest hover:bg-white hover:text-black transition-all mt-8"
                style={{ backgroundColor: forensicRed }}
              >
                {isLoading ? "SYNCHRONIZING..." : "INITIALIZE DIAGNOSTIC OBSERVATION"}
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: KEY VERIFICATION */}
        {step === "verify" && (
          <motion.div key="verify" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen text-center space-y-12">
            <h2 className="forensic-font text-[10vw] font-black uppercase italic tracking-tighter" style={{ color: forensicRed }}>SECURE_KEY</h2>
            <div className="w-full max-w-md space-y-8 px-6">
              <div className="bg-slate-950 p-2 border-2 border-slate-900">
                <input 
                  maxLength={6} 
                  placeholder="000000" 
                  value={userInputKey} 
                  onChange={(e) => setUserInputKey(e.target.value)} 
                  className="w-full bg-black border-none p-10 text-6xl text-center font-mono tracking-[0.4em] text-white outline-none focus:ring-1 ring-[#D94032]" 
                />
              </div>
              <button 
                onClick={() => { if(userInputKey === serverChallenge) setStep("audit_active"); }} 
                className="w-full py-8 bg-white text-black forensic-font font-black uppercase italic tracking-widest hover:bg-[#D94032] hover:text-white transition-all text-2xl"
              >
                AUTHORIZE_SESSION
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
