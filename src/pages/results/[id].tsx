"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Lock, ShieldCheck, Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Footer from "@/components/layout/Footer";

export default function ResultsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audit, setAudit] = useState<any>(null);
  
  const [clientHasAccess, setClientHasAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("admin") === "true") {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!id || !mounted) return;

    const fetchInitialAuditState = async () => {
      try {
        const { data, error } = await supabase
          .from("audits")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setAudit(data);
          setClientHasAccess(!!data.is_released);
        }
      } catch (err) {
        console.error("LEDGER_FETCH_ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialAuditState();

    const auditSubscription = supabase
      .channel(`audit-realtime-${id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "audits", filter: `id=eq.${id}` },
        (payload) => {
          if (payload.new) {
            setAudit(payload.new);
            setClientHasAccess(!!payload.new.is_released);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(auditSubscription);
    };
  }, [id, mounted]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-red-600 italic">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="font-mono text-xs uppercase tracking-[0.4em] font-black">DECRYPTING_SECURE_VAULT_NODE...</p>
      </div>
    );
  }

  const dbDecay = audit?.decay_pct || 50;
  const spend = parseFloat(audit?.ai_spend) || 1.2;
  const laborTax = (dbDecay / 100) * 0.4 * (5 * 160000 * 1.3);
  const exposure = ((dbDecay > 60 ? 0.30 : 0.18) * (spend * 1000000)) * 1.15;

  return (
    <div className="min-h-screen bg-[#020617] text-white relative font-sans overflow-x-hidden">
      
      <div className={`transition-all duration-700 ease-in-out ${!clientHasAccess && !isAdmin ? "blur-xl saturate-[0.15] pointer-events-none select-none" : "blur-none"}`}>
        <main className="max-w-7xl mx-auto py-32 px-8 space-y-16 text-left italic">
          
          <div className="border-b border-slate-900 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-[10px] font-mono text-red-600 uppercase font-black tracking-[0.3em]">FORENSIC_SIGNAL_VERDICT_LOG</span>
              <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mt-2 text-white">
                EXPOSURE <span className="text-slate-500">DOSSIER</span>
              </h1>
            </div>
            <div className="font-mono text-xs text-slate-500 font-black uppercase tracking-widest bg-slate-950 p-4 border border-slate-900 break-all">
              NODE_UUID // {id}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950 border border-slate-900 p-10 relative overflow-hidden group">
              <span className="text-[9px] font-mono text-slate-500 tracking-widest block uppercase font-black">AI_CAPACITY_DECAY</span>
              <div className="text-6xl font-black text-red-600 mt-6 md:text-7xl">{(dbDecay * 0.4).toFixed(0)}%</div>
              <p className="text-xs text-slate-400 mt-4 font-black uppercase leading-relaxed font-mono">Structural efficiency lost through unmitigated technical drift parameters.</p>
            </div>

            <div className="bg-slate-950 border border-slate-900 p-10 relative overflow-hidden group">
              <span className="text-[9px] font-mono text-slate-500 tracking-widest block uppercase font-black">ANNUAL_REWORK_TAX</span>
              <div className="text-6xl font-black text-white mt-6 md:text-7xl">${laborTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <p className="text-xs text-slate-400 mt-4 font-black uppercase leading-relaxed font-mono">Compounded operational budget overhead dedicated purely to recovery logic fixing.</p>
            </div>

            <div className="bg-slate-950 border border-slate-900 p-10 relative overflow-hidden group">
              <span className="text-[9px] font-mono text-slate-500 tracking-widest block uppercase font-black">FIDUCIARY_EXPOSURE_PENALTY</span>
              <div className="text-6xl font-black text-white mt-6 md:text-7xl">${exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <p className="text-xs text-slate-400 mt-4 font-black uppercase leading-relaxed font-mono">Calculated regulatory liability and structural displacement value threshold.</p>
            </div>
          </div>

          <div className="p-12 border-2 border-slate-900 bg-slate-950/20 text-left space-y-4">
            <h3 className="text-2xl font-black uppercase text-white tracking-tight">FORENSIC_SUMMARY_STATEMENT</h3>
            <p className="text-sm text-slate-400 font-medium font-mono leading-relaxed max-w-4xl normal-case">
              System analysis patterns indicate structural vulnerability clusters within your active engineering framework paths. High-frequency friction variables identified across internal validation dependencies require corrective blueprint mapping to insulate key operations layers from mounting operational decay taxes.
            </p>
          </div>

        </main>
      </div>

      {!clientHasAccess && !isAdmin && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#020617]/40 backdrop-blur-[2px]">
          <div className="text-center p-12 md:p-16 bg-slate-950 border-2 border-red-600 max-w-xl w-full shadow-[0_0_100px_rgba(0,0,0,0.95)] italic space-y-10">
            <div className="space-y-4">
              <Lock className="text-red-600 mx-auto mb-2 animate-pulse" size={48} />
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none">DIAGNOSTIC_LOCKED</h2>
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest leading-relaxed font-black max-w-sm mx-auto">
                Your forensic report compiled successfully.
              </p>
              <p className="text-[11px] font-mono text-red-500 uppercase tracking-widest leading-relaxed font-black max-w-sm mx-auto">
                Access is held awaiting your live administrative briefing session.
              </p>
            </div>

            <div 
              className="bg-white p-8 border-l-[12px] border-red-600 shadow-2xl cursor-pointer transition-all duration-300 hover:bg-slate-100 text-center flex flex-col items-center justify-center space-y-3"
              onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-briefing', '_blank')}
            >
              <h4 className="text-black text-xl md:text-2xl font-black tracking-tighter leading-none uppercase">
                EXECUTE_RECONSTRUCTION_PLAN
              </h4>
              <p className="text-slate-500 text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase leading-none">
                [ CLICK_TO_CONFIRM_BRIEFING_RESERVATION ]
              </p>
            </div>

            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-black pt-2 normal-case">
              Your access key has been emailed to the email address provided.
            </p>
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="fixed bottom-8 left-8 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-full font-mono text-[10px] uppercase font-black flex items-center gap-3 shadow-2xl border border-blue-400 no-print">
          <ShieldCheck size={16} /> DECRYPTION_PROTOCOL_ACTIVE_VIA_OVERRIDE
        </div>
      )}

      <div className="no-print mt-20"><Footer /></div>
    </div>
  );
}
