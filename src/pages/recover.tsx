"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { ShieldCheck, Activity, ArrowRight, History, Layers } from "lucide-react";

interface AuditOption {
  id: string;
  orgName: string;
  decay: number;
  dateString: string;
}

export default function LeadRecoveryGateway() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "select" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [discoveredRecords, setDiscoveredRecords] = useState<AuditOption[]>([]);

  const handleIdentityRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/verify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "VERIFICATION FAILED");
      }

      if (data.hasMultiple) {
        setDiscoveredRecords(data.records);
        setStatus("select");
      } else {
        setStatus("success");
        setMessage(`IDENTITY CONFIRMED // RETRIEVING ${data.orgName.toUpperCase()}`);
        setTimeout(() => {
          router.push(`/results/${data.targetId}`);
        }, 1200);
      }

    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "COULD NOT VALIDATE IDENTITY COLUMN");
    }
  };

  const executeDirectRoute = (id: string, orgName: string) => {
    setStatus("success");
    setMessage(`CONNECTING SECURE CHANNEL // LOADING ${orgName.toUpperCase()}`);
    setTimeout(() => {
      router.push(`/results/${id}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center px-6 text-white font-sans uppercase italic font-black text-left">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-md border border-slate-900 p-10 shadow-2xl relative transition-all duration-300">
        <div className="absolute top-0 left-0 h-1 w-full bg-green-500" />
        
        <div className="mb-8">
          <div className="text-white text-lg tracking-tighter italic">BMR<span className="text-green-500">SOLUTIONS</span></div>
          <span className="text-[8px] font-mono uppercase tracking-[0.3em] italic block mt-0.5 text-green-500">
            SECURE VERDICT RETRIEVAL INTERFACE
          </span>
        </div>

        {status !== "select" ? (
          <>
            <h2 className="text-2xl font-black tracking-tighter text-white mb-2 leading-none">
              RETRIEVE RECONSTRUCTION RUN
            </h2>
            <p className="text-[10px] font-mono text-slate-400 tracking-wider font-normal normal-case mb-6">
              Input the primary contact address used during your initial 12-question diagnostic phase to restore your active capital erosion timeline.
            </p>

            <form onSubmit={handleIdentityRecovery} className="space-y-4">
              <div>
                <label className="block text-[9px] font-mono text-green-500 tracking-widest mb-1.5">// VERIFIED CONTACT EMAIL</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER LEAD REGISTERED EMAIL"
                  className="w-full bg-slate-950/60 border border-slate-900 px-4 py-3 text-sm font-mono text-white tracking-wide placeholder-slate-700 outline-none focus:border-green-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-12 bg-white text-black hover:bg-green-500 hover:text-black font-black text-xs font-mono tracking-widest flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Activity className="animate-spin text-black" size={14} />
                    SCANNING HISTORICAL RUNS...
                  </>
                ) : (
                  <>
                    RESTORE SESSION PORTAL <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
              <h2 className="text-xl font-black tracking-tighter text-white leading-none flex items-center gap-2">
                <Layers size={18} className="text-green-500" /> MULTIPLE RUNS DETECTED
              </h2>
              <span className="text-[9px] font-mono bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5">
                COUNT: {discoveredRecords.length}
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-wider font-normal normal-case mb-6">
              Our index mapped multiple evaluations under <span className="text-white font-mono">{email}</span>. Select the specific operational trace layer you want to review:
            </p>

            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
              {discoveredRecords.map((rec, index) => (
                <div
                  key={rec.id}
                  onClick={() => executeDirectRoute(rec.id, rec.orgName)}
                  className="w-full bg-slate-950/60 hover:bg-green-950/10 border border-slate-900 hover:border-green-500/40 p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex justify-between items-start font-mono">
                    <div className="text-xs text-white font-black group-hover:text-green-500 transition-colors truncate max-w-[220px]">
                      {rec.orgName}
                    </div>
                    <div className="text-[10px] text-green-500 font-mono font-black shrink-0">
                      INDEX: {rec.decay}%
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3 font-mono text-[9px] text-slate-500">
                    <span className="flex items-center gap-1"><History size={10} /> RUN 0{discoveredRecords.length - index} // {rec.dateString}</span>
                    <span className="text-slate-700 group-hover:text-green-500 transition-colors">SELECT →</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setStatus("idle"); setEmail(""); }}
              className="w-full mt-5 text-center font-mono text-[9px] text-slate-500 hover:text-white tracking-widest transition-colors uppercase"
            >
              ← RETURN TO EMAIL ENTRY
            </button>
          </>
        )}

        {(status === "success" || status === "error" || (status === "loading" && message)) && (
          <div className={`mt-6 border p-4 font-mono text-[10px] tracking-wide flex items-start gap-3 ${
            status === "success" ? "bg-green-950/10 border-green-500/30 text-green-500" :
            status === "error" ? "bg-red-950/10 border-red-500/30 text-red-500" : "bg-slate-950 border-slate-900 text-slate-400"
          }`}>
            {status === "success" && <ShieldCheck className="shrink-0 mt-0.5" size={14} />}
            {status === "loading" && <Activity className="animate-spin shrink-0 mt-0.5" size={14} />}
            <span className="leading-normal">{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
