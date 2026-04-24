"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogicLeakTicker from "@/components/LogicLeakTicker";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldAlert, DollarSign, UserCog, Shield, Gavel, Lock, Unlock } from "lucide-react";

const HERO_BRIEFINGS = [
  { slug: "lyft-logic-shear", title: "The Lyft Earnings Phantom", node: "PHOENIX (EXE)", risk: "TERMINAL", impact: "$2.0B Market Cap Loss", persona: "CFO", hook: "A single unverified data point + high-speed bots = $2B market cap loss." },
  { slug: "clinical-logic-shear", title: "UnitedHealth AI Care Denial", node: "TITAN (MGR)", risk: "TERMINAL", impact: "Regulatory Sanction", persona: "COO", hook: "AI overrode clinical judgment, causing patient harm and $2.4B in operational fallout." },
  { slug: "defense-intelligence-shear", title: "Pentagon 'Shadow' LLM Leak", node: "ATLAS (TEC)", risk: "TERMINAL", impact: "Data Exfiltration", persona: "CSO", hook: "A 'helpful' AI summarization tool exfiltrated data via public LLM endpoints." },
  { slug: "chatbot-liability", title: "The Air Canada Precedent", node: "PHOENIX (EXE)", risk: "CRITICAL", impact: "Binding Legal Liability", persona: "GC", hook: "The bot’s hallucination became a binding legal contract, creating an $812K liability." }
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
    const blockedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
    if (blockedDomains.includes(email.split("@")[1])) { setError("CORPORATE_EMAIL_REQUIRED"); return; }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/generate-key', { method: 'POST', body: JSON.stringify({ email: email.trim() }) });
      const data = await res.json();
      if (res.ok) { setServerChallenge(data.challenge); setAccessState("verifying"); }
    } catch (err) { setError("CONNECTION_ERROR"); }
    setIsSubmitting(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans tracking-tighter">
      <Header />
      <main className="pt-48 px-6 container mx-auto pb-32 max-w-6xl">
        <div className="mb-20 space-y-6">
          <div className="text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">BMR // CASE_STUDY_ARCHIVE</div>
          <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">Forensic <span className="text-red-600">Briefings</span></h1>
          <p className="text-slate-500 font-mono text-[11px] uppercase tracking-widest max-w-2xl leading-relaxed">
            Case studies of systemic AI failure. These dossiers map algorithmic drift to the specific operational nodes responsible for governance.
          </p>
        </div>

        <div className="grid gap-4 mb-24">
          {HERO_BRIEFINGS.map((a) => (
            <Link key={a.slug} href={`/briefings/${a.slug}`} className="group p-10 border border-slate-900 bg-slate-950/20 hover:border-red-600/50 transition-all flex justify-between items-center">
              <div className="space-y-4 max-w-2xl text-left">
                <div className="flex items-center gap-4">
                  {PERSONA_ICONS[a.persona as keyof typeof PERSONA_ICONS]}
                  <span className="text-red-600 font-mono text-[9px] font-black uppercase tracking-widest">Implicated: {a.node}</span>
                  <span className="text-slate-600 font-mono text-[8px] uppercase tracking-widest">{a.impact}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase italic text-slate-400 group-hover:text-white transition-colors">{a.title}</h2>
                <p className="text-slate-500 font-bold uppercase text-[11px] italic group-hover:text-slate-200">{a.hook}</p>
              </div>
              <ArrowRight size={32} className="text-slate-900 group-hover:text-red-600" />
            </Link>
          ))}
        </div>

        {/* PROFESSIONAL ACCESS CONTROL */}
        <div className="max-w-6xl border-t border-slate-900 pt-20">
          {accessState === "public" && (
            <div className="flex flex-col items-center text-center space-y-8 bg-slate-950/40 p-16 border border-slate-900">
              <Lock size={32} className="text-slate-800" />
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Full Archive Access</h3>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest max-w-md mx-auto italic">
                Corporate identity verification required for full sector analysis.
              </p>
              <form onSubmit={initiateVerification} className="flex flex-col md:flex-row gap-2 w-full max-w-lg">
                <input type="email" required placeholder="CORPORATE_EMAIL@FIRM.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black border border-slate-800 px-6 py-4 text-[10px] font-mono focus:border-red-600 outline-none flex-grow text-white" />
                <button type="submit" className="bg-red-600 text-white px-10 py-4 font-black font-mono text-[10px] uppercase tracking-widest">Verify Identity</button>
              </form>
            </div>
          )}
        </div>
      </main>
      <LogicLeakTicker />
      <Footer />
    </div>
  );
}
