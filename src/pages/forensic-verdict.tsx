"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp, ArrowRight, Skull, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ForensicVerdict() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchVerdict = async () => {
      const res = await fetch("/api/forensic-synthesis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alpha: JSON.parse(localStorage.getItem("bmr_vault_alpha_results") || "{}"),
          beta: JSON.parse(localStorage.getItem("bmr_vault_beta_results") || "{}"),
          gamma: JSON.parse(localStorage.getItem("bmr_vault_gamma_results") || "{}"),
          sector: localStorage.getItem("bmr_selected_sector") || "finance"
        })
      });
      const result = await res.json();
      setData(result);
    };
    fetchVerdict();
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-24 px-6 font-sans">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-start border-b border-slate-900 pb-8 mb-16">
          <section>
            <h1 className="text-red-600 text-4xl font-black uppercase italic tracking-tighter">
              FORENSIC TRIAGE ALERT
            </h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-2">
              AUDIT: {data.sectorLabel} // STATUS: VALIDATED SIGNAL
            </p>
          </section>
          <Lock className="text-slate-700" size={24} />
        </header>

        <main className="text-center mb-24 relative py-12">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Skull size={300} />
          </div>
          <span className="text-[10rem] font-black italic tracking-tighter text-white relative z-10 leading-none">
            ${data.total}M
          </span>
          <p className="text-red-600 font-mono text-sm uppercase font-black tracking-[0.6em] mt-6">
            VALIDATED ANNUAL HEMORRHAGE SIGNAL
          </p>
        </main>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pt-12 border-t border-red-600/30">
          <article>
            <h3 className="text-white text-xl font-black uppercase italic mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-red-600" /> THE COMPOUND FAILURE
            </h3>
            <p className="text-slate-400 text-sm italic leading-relaxed">
              &ldquo;Your ${data.total}M hemorrhage is a compounding liability scaling against your initial $1.2M {data.sectorLabel} investment.&rdquo;
            </p>
          </article>
          <Card className="bg-slate-950 p-8 border-l-4 border-red-600">
            <div className="flex justify-between mb-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
              <span>VISIBLE TIP (AUTHORIZED)</span>
              <span>$1.2M</span>
            </div>
            <div className="h-[1px] bg-slate-900 mb-4"></div>
            <div className="flex justify-between font-mono text-xs text-red-600 font-black tracking-widest">
              <span>TOTAL SYSTEMIC LIABILITY</span>
              <span>${(data.total * 2.5).toFixed(1)}M</span>
            </div>
          </Card>
        </section>

        <footer className="bg-red-600 p-12 text-center shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <h2 className="text-white text-3xl font-black uppercase italic mb-8 tracking-tighter">PREVENT THE TRAP</h2>
          <button className="bg-black text-white px-12 py-6 font-black uppercase italic tracking-[0.3em] text-[11px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 mx-auto border border-black hover:border-white">
            SCHEDULE DEEP DIVE AUDIT <ArrowRight size={18} />
          </button>
        </footer>
      </div>
    </div>
  );
}
