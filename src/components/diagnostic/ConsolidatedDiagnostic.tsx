"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Landmark, Stethoscope, Factory, ShoppingCart } from "lucide-react";
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

  // THE DATA HANDSHAKE: Forces the data into the table by satisfying constraints
  const logToDatabase = async (finalMetrics: any) => {
    try {
      const { data: entityData } = await supabase
        .from('entities')
        .upsert({ name: entityName.trim().toUpperCase() }, { onConflict: 'name' })
        .select()
        .single();

      const { data: auditData, error: auditErr } = await supabase
        .from('audit_responses')
        .insert([{ 
          org_name: entityName.trim().toUpperCase(), 
          lead_email: email.trim().toLowerCase(),
          rework_tax: parseFloat(finalMetrics?.rework || "0"), 
          raw_responses: {}, // Placeholder for the actual audit data
          status: 'LEAD',
          entity_id: entityData?.id,
          lens: 'EXECUTIVE_FORENSIC' // This satisfies the 'REQUIRED' constraint in your API docs
        }])
        .select()
        .single();

      if (auditErr) throw auditErr;

    } catch (e: any) { 
        console.error("DATABASE_SYNC_ERROR:", e.message);
    }
  };

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

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: THE HERO (Screenshot 4:03:40) */}
        {step === "hero" && (
          <motion.div 
            key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto pt-32 px-6 space-y-24"
          >
            <div className="text-center cursor-pointer" onClick={() => setStep("registration")}>
              <h1 className="text-[12vw] md:text-[10rem] font-black uppercase italic tracking-tighter leading-[0.8] inline-block hover:text-red-600 transition-colors">
                THE LOGIC <span className="text-red-600">PULSE</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "FINANCE", sub: "COMPLIANCE", icon: <Landmark className="text-red-600" size={24} /> },
                { label: "HEALTHCARE", sub: "LIABILITY", icon: <Stethoscope className="text-red-600" size={24} /> },
                { label: "INDUSTRIAL", sub: "OPERATIONS", icon: <Factory className="text-red-600" size={24} /> },
                { label: "SERVICES", sub: "LABOR", icon: <ShoppingCart className="text-red-600" size={24} /> }
              ].map((sector) => (
                <div 
                  key={sector.label} 
                  onClick={() => setStep("registration")}
                  className="bg-transparent border border-slate-900 p-10 min-h-[300px] flex flex-col justify-end gap-2 group hover:border-red-600/40 transition-all cursor-pointer"
                >
                  <div className="group-hover:scale-110 transition-transform origin-left">{sector.icon}</div>
                  <div className="mt-8 text-left">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">{sector.label}</h3>
                    <p className="text-[10px] font-mono text-red-600 tracking-[0.2em] uppercase">{sector.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: REGISTRATION GRID (Screenshot 4:05:09) */}
        {step === "registration" && (
          <motion.div 
            key="registration" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto pt-40 px-6 space-y-16"
          >
            <div className="text-center">
              <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                PROTOCOL <span className="text-red-600">REGISTRATION</span>
              </h2>
            </div>

            <div className="bg-slate-950/50 border border-slate-900 p-1 md:p-12">
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
                    className="bg-black border border-slate-900 p-8 text-white uppercase font-mono tracking-widest outline-none focus:border-red-600 transition-all" 
                  />
                ))}
              </div>

              <button 
                onClick={handleStartRegistration}
                className="w-full py-10 bg-red-600 text-white font-black uppercase italic text-2xl tracking-[0.2em] hover:bg-white hover:text-red-600 transition-all mt-8"
              >
                {isLoading ? "PROCESSING..." : "INITIALIZE DIAGNOSTIC OBSERVATION"}
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: KEY VERIFICATION */}
        {step === "verify" && (
          <motion.div key="verify" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen text-center space-y-12">
            <h2 className="text-7xl font-black uppercase italic text-white tracking-tighter leading-none">SECURE_<span className="text-red-600">KEY</span></h2>
            <div className="w-full max-w-md space-y-8 px-6">
              <div className="bg-slate-950 p-2 border-2 border-slate-900 shadow-2xl">
                <input 
                  maxLength={6} 
                  placeholder="000000" 
                  value={userInputKey} 
                  onChange={(e) => setUserInputKey(e.target.value)} 
                  className="w-full bg-black border-none p-10 text-6xl text-center font-mono tracking-[0.4em] text-white outline-none focus:ring-1 ring-red-600" 
                />
              </div>
              <button 
                onClick={() => { if(userInputKey === serverChallenge) setStep("audit_active"); }} 
                className="w-full py-8 bg-white text-black font-black uppercase italic tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all text-xl"
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
