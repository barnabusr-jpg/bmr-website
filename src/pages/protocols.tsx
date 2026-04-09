"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Zap } from "lucide-react";

export default function ProtocolsPage() {
  const protocols = [
    { id: "01", title: "Shadow AI Containment", desc: "Neutralize unsanctioned tool usage and secure data sovereignty.", duration: "7-14 Days", counter: "Shadow AI Shear" },
    { id: "02", title: "Rework Tax Elimination", desc: "Re-engineering prompt logic and output verification.", duration: "4-8 Weeks", counter: "Rework Tax" },
    { id: "03", title: "Expertise Recovery", desc: "Restoring human-in-the-loop logic for high-stakes decisions.", duration: "Ongoing", counter: "Logic Decay" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Header />
      <main className="pt-48 pb-32 px-6 container mx-auto max-w-6xl">
        <h1 className="text-[100px] font-black uppercase italic tracking-tighter leading-none mb-24">Hardening <br /> Protocols</h1>
        <div className="space-y-6">
          {protocols.map((p) => (
            <div key={p.id} className="bg-slate-950 border border-slate-900 p-12 flex flex-col md:flex-row justify-between items-center gap-12 group hover:border-red-600 transition-all">
              <div className="space-y-6 flex-grow">
                <h2 className="text-5xl font-black uppercase italic tracking-tighter">{p.title}</h2>
                <p className="text-slate-400 italic">{p.desc}</p>
              </div>
              <Link 
                href="/pulse-check" 
                className="bg-white text-black px-12 py-6 font-black uppercase italic text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-4 whitespace-nowrap"
              >
                Activate Protocol <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
