"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogicLeakTicker from "@/components/LogicLeakTicker";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldAlert, Activity, Lock, Unlock, DollarSign, UserCog, Shield, Gavel, EyeOff } from "lucide-react";

// CATEGORIZED BY FORENSIC NODE
const HERO_BRIEFINGS = [
  { slug: "lyft-logic-shear", title: "The Lyft Earnings Phantom", node: "PHOENIX (EXE)", risk: "TERMINAL", impact: "$2.0B Loss", persona: "CFO", hook: "A single unverified data point + high-speed bots = $2B market cap loss." },
  { slug: "clinical-logic-shear", title: "UnitedHealth AI Care Denial", node: "TITAN (MGR)", risk: "TERMINAL", impact: "$2.4B Fallout", persona: "COO", hook: "AI overrode clinical judgment, causing patient harm and $2.4B in operational fallout." },
  { slug: "defense-intelligence-shear", title: "Pentagon 'Shadow' LLM Leak", node: "ATLAS (TEC)", risk: "TERMINAL", impact: "Classified Breach", persona: "CSO", hook: "A 'helpful' AI summarization tool exfiltrated classified data via public LLM endpoints." },
  { slug: "chatbot-liability", title: "The Air Canada Precedent", node: "PHOENIX (EXE)", risk: "CRITICAL", impact: "$812K Liability", persona: "GC", hook: "The bot’s hallucination became a binding legal contract, creating an $812K liability." }
];

const VAULT_BRIEFINGS = [
  { slug: "federal-benefit-shear", title: "IRS Tax-Logic Hallucination", risk: "TERMINAL", sector: "GOVERNMENT", type: "SOVEREIGN_SHEAR" },
  { slug: "infrastructure-logic-shear", title: "Tokyo Logistics Blackout", risk: "TERMINAL", sector: "INFRASTRUCTURE", type: "SYSTEMIC_SHEAR" },
  { slug: "judicial-logic-shear", title: "Oregon Judicial Sanction", risk: "CRITICAL", sector: "LEGAL", type: "FIDUCIARY_SHEAR" },
  { slug: "governance-logic-shear", title: "McDonald's McHire Breach", risk: "CRITICAL", sector: "GOVERNANCE", type: "GOVERNANCE_SHEAR" }
];

const PERSONA_ICONS = {
  CFO: <DollarSign size={20} className="text-red-600" />,
  COO: <UserCog size={20} className="text-red-600" />,
  CSO: <Shield size={20} className="text-red-600" />,
  GC: <Gavel size={20} className="text-red-600" />,
};

export default function BriefingsIndex() {
  const [mounted, setMounted] = useState(false);
  const [accessState, setAccessState] = useState<"public" | "verifying" | "granted">("public");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [serverChallenge, setServerChallenge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const initiateVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const blockedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    const domain = email.split("@")[1];
    if (blockedDomains.includes(domain)) { setError("CORPORATE_IDENTITY_REQUIRED"); return; }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (res.ok) { setServerChallenge(data.challenge); setAccessState("verifying"); }
      else { setError("TRANSMISSION_REJECTED"); }
    } catch (err) { setError("LOGIC_SHEAR_DETECTION"); }
    finally { setIsSubmitting(false); }
  };

  const finalizeAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === serverChallenge) { setAccessState("granted"); setError(""); }
    else { setError("INVALID_OPERATOR_KEY"); }
  };

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans tracking-tighter">
      <Header />
      <main className="pt-48 px-6 container mx-auto pb-32 max-w-6xl">
        
        {/* WEAPONIZED HEADER */}
        <div className="max-w-5xl mb-20 space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">
            <ShieldAlert size={14} className="animate-pulse" /> BMR_FORENSIC_VAULT // EYES_ONLY
          </motion.div>
          <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">Forensic <span className="text-red-600">Briefings</span></h1>
          <p className="text-slate-500 font-mono text-[11px] uppercase tracking-widest italic max-w-2xl leading-relaxed">
            Case studies of systemic AI failure. Each briefing maps a real-world algorithmic shear to the specific Fiduciary Node that failed to contain it.
          </p>
        </div>

        {/* HERO BRIEFINGS GRID */}
        <div className="grid gap-6 mb-24">
          {HERO_BRIEFINGS.map((a) => (
            <Link key={a.slug} href={`/briefings/${a.slug}`} className="group relative p-12 border border-slate-900 bg-slate-950/20 hover:border-red-600/50 transition-all flex flex-col md:flex-row md:justify-between items-start md:items-center">
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-600/10 border border-red-600/30">{PERSONA_ICONS[a.persona as keyof typeof PERSONA_ICONS]}</div>
                  <div className="flex flex-col">
                    <span className="text-red-600 font-mono text-[9px] font-black uppercase tracking-widest leading-none mb-1">Impacted: {a.node}</span>
                    <span className="text-slate-600 font-mono text-[8px] uppercase tracking-widest">{a.impact} // {a.risk}</span>
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic text-slate-400 group-hover:text-white transition-colors tracking-tighter leading-none">{a.title}</h2>
                <p className="text-slate-500 font-bold uppercase text-[11px] italic tracking-tight group-hover:text-slate-200 transition-colors">{a.hook}</p>
              </div>
              <div className="mt-8 md:mt-0 flex flex-col items-end gap-4">
                <div className="text-[10px] font-mono text-slate-800 uppercase tracking-widest font-black italic group-hover:text-red-600 transition-colors">Open_Dossier</div>
                <ArrowRight size={40} className="text-slate-900 group-hover:text-red-600 transition-all translate-x-0 group-hover:translate-x-2" />
              </div>
            </Link>
          ))}
        </div>

        {/* ACCESS CONTROL: THE CLEARANCE WALL */}
        <div className="max-w-6xl border-t border-slate-900 pt-24 pb-12">
          {accessState === "public" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center space-y-12 bg-slate-950/40 p-20 border border-slate-900 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 bg-red-600/10 border-l border-b border-red-600/20 text-red-600 text-[8px] font-mono uppercase font-black">Clearance_Level_01</div>
              <div className="space-y-4">
                <EyeOff size={40} className="mx-auto text-slate-800 mb-6" />
                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white font-mono leading-none">REQUEST_CLEARANCE</h3>
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] max-w-lg mx-auto italic leading-relaxed font-bold">
                  Enter corporate credentials to unlock the Full Forensic Archive. Access restricted to verified Fiduciary and Technical operators.
                </p>
              </div>
              <form onSubmit={initiateVerification} className="flex flex-col md:flex-row gap-2 w-full max-w-xl">
                <input type="email" required placeholder="CORPORATE_EMAIL@FIRM.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black border border-slate-800 px-8 py-5 text-[10px] font-mono focus:border-red-600 outline-none flex-grow tracking-widest text-white" />
                <button type="submit" disabled={isSubmitting} className="bg-red-600 text-white px-12 py-5 font-black font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                  {isSubmitting ? "TRANSMITTING..." : "INITIALIZE_AUTH"}
                </button>
              </form>
              {error && <p className="text-red-600 font-mono text-[10px] font-black tracking-widest uppercase animate-pulse">{error}</p>}
            </motion.div>
          )}

          {accessState === "verifying" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center space-y-12 bg-slate-950/40 p-20 border border-red-600/30">
              <ShieldAlert size={40} className="mx-auto text-red-600 mb-4 animate-pulse" />
              <div className="space-y-4">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white font-mono">NODE_AUTHORIZATION</h3>
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic leading-relaxed font-bold">
                  Access Key transmitted to <span className="text-red-500 underline">{email}</span>.<br />Verify corporate identity to proceed.
                </p>
              </div>
              <form onSubmit={finalizeAccess} className="flex flex-col md:flex-row gap-2 w-full max-w-md">
                <input type="text" required placeholder="000000" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} className="bg-black border border-red-600 px-8 py-5 text-center text-3xl font-mono focus:border-red-600 outline-none flex-grow tracking-[0.5em] text-white" />
                <button type="submit" className="bg-white text-black px-12 py-5 font-black font-mono text-[11px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">AUTHORIZE</button>
              </form>
            </motion.div>
          )}

          {accessState === "granted" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 w-full">
              <div className="flex items-center gap-3 text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase mb-12"><Unlock size={14} /> SESSION_ACTIVE // FULL_ARCHIVE_UNLOCKED</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VAULT_BRIEFINGS.map((a) => (
                  <Link key={a.slug} href={`/briefings/${a.slug}`} className="flex justify-between items-center p-10 border border-slate-900 bg-slate-950/30 hover:border-red-600/30 transition-all group">
                    <div className="space-y-2">
                      <div className="flex gap-4 items-center font-mono text-[9px] uppercase font-bold text-slate-600">
                        <span className="text-red-600">{a.risk}</span><span>{a.sector}</span>
                      </div>
                      <h3 className="text-2xl font-black uppercase italic group-hover:text-white text-slate-500 transition-colors">{a.title}</h3>
                    </div>
                    <ArrowRight size={24} className="text-slate-900 group-hover:text-red-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <LogicLeakTicker />
      <Footer />
    </div>
  );
}
