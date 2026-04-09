import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldAlert, ArrowLeft } from "lucide-react";

export default function AdminPortal() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [serverChallenge, setServerChallenge] = useState("");
  const [step, setStep] = useState("identify");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const requestAccess = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch('/api/auth/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (res.ok) {
        setServerChallenge(data.challenge);
        setStep("verify");
      } else {
        setError("NODE_ACCESS_DENIED");
      }
    } catch (err) { setError("COMMUNICATION_SHEAR"); }
    finally { setIsLoading(false); }
  };

  const authorizeAdmin = (e) => {
    e.preventDefault();
    if (otp === serverChallenge) {
      router.push("/admin/dashboard");
    } else { setError("INVALID_OPERATOR_KEY"); }
  };

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-md space-y-8 bg-slate-950 border border-slate-900 p-12 shadow-2xl relative">
        <div className="text-center space-y-4">
          <Lock size={32} className="mx-auto text-red-600" />
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Admin <span className="text-red-600">Terminal</span></h1>
          <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.3em]">Alpha-7 Clearance Required</p>
        </div>

        <AnimatePresence mode="wait">
          {step === "identify" ? (
            <motion.form key="id" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={requestAccess} className="space-y-6">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ADMIN_EMAIL" className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600 font-mono" />
              <button disabled={isLoading} className="w-full py-6 bg-red-600 text-white font-black uppercase italic text-xs tracking-widest hover:bg-white hover:text-black transition-all">
                {isLoading ? "TRANSMITTING..." : "GENERATE_KEY"}
              </button>
            </motion.form>
          ) : (
            <motion.form key="ver" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={authorizeAdmin} className="space-y-6">
              <input type="text" required maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="000000" className="bg-slate-950 border border-red-600/50 p-6 text-4xl text-center font-black text-white w-full outline-none focus:border-red-600 font-mono tracking-[0.4em]" />
              <button className="w-full py-6 bg-white text-black font-black uppercase italic text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all">AUTHORIZE</button>
            </motion.form>
          )}
        </AnimatePresence>
        {error && <p className="text-red-600 font-mono text-[9px] font-black text-center uppercase mt-4">{error}</p>}
      </div>
    </div>
  );
}
