"use client";
import React from "react";
import { useRouter } from "next/router";
import { Banknote, Stethoscope, Factory, ShieldCheck, ArrowRight } from "lucide-react";

const sectors = [
  { id: "finance", label: "Financial Services", icon: <Banknote size={32} />, desc: "Regulatory & Fiduciary Calibration" },
  { id: "healthcare", label: "Life Sciences", icon: <Stethoscope size={32} />, desc: "Clinical & Life-Safety Calibration" },
  { id: "manufacturing", label: "Industrial / Logistics", icon: <Factory size={32} />, desc: "Margin & Operational Calibration" }
];

export default function Home() {
  const router = useRouter();

  const selectSector = (id: string) => {
    localStorage.setItem("bmr_selected_sector", id);
    router.push("/vault-alpha");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white py-32 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center mb-16">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4 text-white">
          FORENSIC <span className="text-red-600">TRIAGE</span>
        </h1>
        <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.4em] italic">
          Initialize Sector Calibration to Unlock $1.2M Baseline Audit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {sectors.map((s) => (
          <button
            key={s.id}
            onClick={() => selectSector(s.id)}
            className="group p-10 bg-slate-950 border-2 border-slate-900 hover:border-red-600 transition-all text-left relative overflow-hidden"
          >
            <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
            <h3 className="text-xl font-black uppercase italic mb-2">{s.label}</h3>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-relaxed">
              {s.desc}
            </p>
            <ArrowRight className="absolute bottom-8 right-8 text-slate-800 group-hover:text-red-600 group-hover:translate-x-2 transition-all" size={20} />
          </button>
        ))}
      </div>

      <div className="mt-24 flex items-center gap-4 text-slate-700 font-mono text-[9px] uppercase tracking-[0.3em]">
        <ShieldCheck size={14} />
        <span>BMR Forensic Algorithm 3.4.1 // SECURE SESSION ACTIVE</span>
      </div>
    </div>
  );
}
