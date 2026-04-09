"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogicLeakTicker from "@/components/LogicLeakTicker";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldAlert, Activity, Lock, Unlock, DollarSign, UserCog, Shield, Gavel } from "lucide-react";

const HERO_BRIEFINGS = [
  { slug: "lyft-logic-shear", title: "The Lyft Earnings Phantom", date: "Feb 13, 2024", risk: "TERMINAL", sector: "FINANCE", type: "ALGORITHMIC_SHEAR", persona: "CFO", hook: "A single unverified data point + high-speed bots = $2B market cap loss." },
  { slug: "clinical-logic-shear", title: "UnitedHealth AI Care Denial", date: "Apr 02, 2026", risk: "TERMINAL", sector: "HEALTHCARE", type: "EXPERTISE_SHEAR", persona: "COO", hook: "AI overrode clinical judgment, causing patient harm and $2.4B in operational fallout." },
  { slug: "defense-intelligence-shear", title: "Pentagon 'Shadow' LLM Leak", date: "Aug 09, 2024", risk: "TERMINAL", sector: "DEFENSE", type: "CLASSIFIED_EXFILTRATION", persona: "CSO", hook: "A 'helpful' AI summarization tool exfiltrated classified data via public-facing LLM endpoints." },
  { slug: "chatbot-liability", title: "The Air Canada Precedent", date: "Feb 20, 2024", risk: "CRITICAL", sector: "TRAVEL", type: "HALLUCINATION_SHEAR", persona: "GC", hook: "The bot’s hallucination became a binding legal contract, creating an $812K liability for the carrier." }
];

const VAULT_BRIEFINGS = [
  { slug: "federal-benefit-shear", title: "IRS Tax-Logic Hallucination", date: "Feb 14, 2025", risk: "TERMINAL", sector: "GOVERNMENT", type: "SOVEREIGN_SHEAR" },
  { slug: "infrastructure-logic-shear", title: "Tokyo Logistics Blackout", date: "Dec 12, 2025", risk: "TERMINAL", sector: "INFRASTRUCTURE", type: "SYSTEMIC_SHEAR" },
  { slug: "judicial-logic-shear", title: "Oregon Judicial Sanction", date: "Mar 25, 2026", risk: "CRITICAL", sector: "LEGAL", type: "FIDUCIARY_SHEAR" },
  { slug: "governance-logic-shear", title: "McDonald's McHire Breach", date: "Jul 10, 2025", risk: "CRITICAL", sector: "GOVERNANCE", type: "GOVERNANCE_SHEAR" },
  { slug: "utility-grid-hallucination", title: "ERCOT Load-Balancing Drift", date: "May 19, 2024", risk: "TERMINAL", sector: "UTILITIES", type: "PREDICTIVE_DRIFT" },
  { slug: "salesforce-failure", title: "Salesforce Data Exfiltration", date: "Mar 15, 2024", risk: "CRITICAL", sector: "TECH/SAAS", type: "SHADOW_AI_SHEAR" }
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
  const [serverChallenge, setServerChallenge] = useState(""); // 🛡️ Restored for handshake
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const initiateVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // 🛡️ B2B Whitelisting Logic
    const blockedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    const domain = email.split("@")[1];
    
    if (blockedDomains.includes(domain)) {
      setError("CORPORATE_IDENTITY_REQUIRED");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 📡 ACTIVE TRANSMISSION TO SENDGRID API
      const res = await fetch('/api/auth/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (res.ok) {
        setServerChallenge(data.challenge);
        setAccessState("verifying");
      } else {
        setError("TRANSMISSION_REJECTED");
      }
    } catch (err) {
      setError("LOGIC_SHEAR_DETECTION");
    } finally {
      setIsSubmitting(false);
    }
  };

  const finalizeAccess = (e: React.FormEvent) => {
    e.preventDefault();
    // Compare real server-generated key
    if (otp === serverChallenge) { 
      setAccessState("granted");
      setError("");
    } else {
      setError("INVALID_OPERATOR_KEY");
    }
  };

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans">
      <Header />
      <main className="pt-48 px-6 container mx-auto pb-32">
        <div className="max-w-5xl mb-20 space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">
            <ShieldAlert size={14} /> BMR_FORENSIC_VAULT
          </motion.div>
          <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">Forensic <span className="text-red-600">Briefings</span></h1>
        </div>

        {/* HERO DOSSIERS */}
        <div className="grid gap-6 max-w-5xl mb-24">
          {HERO_BRIEFINGS.map((a) => (
            <Link key={a.slug} href={`/briefings/${a.slug}`} className="group relative p-10 border border-slate-900 bg-slate-950/50 hover:border-red-600 transition-all flex flex-col md:flex-row md:justify-between items-start md:items-center">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-600/10 border border-red-600/30">{PERSONA_ICONS[a.persona as keyof typeof PERSONA_ICONS]}</div>
                  <span className="text-red-600 font-mono text-[9px] font-black uppercase tracking-widest">{a.date}</span>
                  <span className="bg-red-600 text-white text-[8px] font-mono px-2 py-0.5 font-black uppercase tracking-widest">{a.risk}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase italic text-slate-500 group-hover:text-white transition-colors tracking-tighter leading-none">{a.title}</h2>
                <p className="text-slate-400 font-bold uppercase text-xs italic tracking-tight group-hover:text-slate-200">{a.hook}</p>
              </div>
              <ArrowRight size={32} className="text-slate-800 group-hover:text-red-600 mt-6 md:mt-0" />
            </Link>
          ))}
        </div>

        {/* ACCESS CONTROL INTERFACE */}
        <div className="max-w-5xl border-t border-slate-900 pt-24 pb-12">
          {accessState === "public" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-2">
                <Lock size={32} className="mx-auto text-slate-700 mb-4" />
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-400 font-mono">REQUEST_ACCESS_KEY</h3>
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest max-w-md mx-auto italic">Verification required for full sector autopsies (Infrastructure, Utilities, Federal).</p>
              </div>
              <form onSubmit={initiateVerification} className="flex flex-col md:flex-row gap-2 w-full max-w-md">
                <input type="email" required placeholder="CORPORATE_EMAIL@FIRM.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-950 border border-slate-800 px-6 py-4 text-[10px] font-mono focus:border-red-600 outline-none flex-grow tracking-widest" />
                <button type="submit" disabled={isSubmitting} className="bg-red-600 text-white px-8 py-4 font-black font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  {isSubmitting ? "TRANSMITTING..." : "GENERATE_KEY"}
                </button>
              </form>
              {error && <p className="text-red-600 font-mono text-[10px] font-black tracking-widest uppercase animate-pulse">{error}</p>}
            </motion.div>
          )}

          {accessState === "verifying" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center space-y-8">
              <ShieldAlert size={32} className="mx-auto text-red-600 mb-4 animate-pulse" />
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white font-mono">VERIFICATION_REQUIRED</h3>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic leading-relaxed">Key transmitted to <span className="text-white underline">{email}</span>.<br />Enter 6-digit code for node authorization.</p>
              <form onSubmit={finalizeAccess} className="flex flex-col md:flex-row gap-2 w-full max-w-md">
                <input type="text" required placeholder="000000" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} className="bg-slate-950 border border-red-600/50 px-6 py-4 text-center text-xl font-mono focus:border-red-600 outline-none flex-grow tracking-[0.5em]" />
                <button type="submit" className="bg-white text-black px-8 py-4 font-black font-mono text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">AUTHORIZE</button>
              </form>
              <button onClick={() => setAccessState("public")} className="text-[9px] font-mono text-slate-700 uppercase tracking-widest hover:text-red-600">Back to request</button>
            </motion.div>
          )}

          {accessState === "granted" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 w-full">
              <div className="flex items-center gap-3 text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase mb-12"><Unlock size={14} /> VAULT_SESSION_ACTIVE // NODES_UNLOCKED</div>
              {VAULT_BRIEFINGS.map((a) => (
                <Link key={a.slug} href={`/briefings/${a.slug}`} className="flex justify-between items-center p-6 border border-slate-900 bg-slate-950/30 hover:border-red-600/30 transition-all group">
                  <div className="space-y-1">
                    <div className="flex gap-4 items-center font-mono text-[9px] uppercase font-bold text-slate-600">
                      <span>{a.date}</span><span className="text-red-600">{a.risk}</span><span>{a.sector}</span>
                    </div>
                    <h3 className="text-xl font-black uppercase italic group-hover:text-white text-slate-500">{a.title}</h3>
                  </div>
                  <ArrowRight size={16} className="text-slate-800 group-hover:text-red-600 transition-colors" />
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      <LogicLeakTicker />
      <Footer />
    </div>
  );
}
