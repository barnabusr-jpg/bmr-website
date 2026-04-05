"use client";
import React from "react";
import { useRouter } from "next/router";
import { Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";

const sectors = [
  { id: "finance", label: "FINANCIAL SERVICES", icon: <Banknote size={32} />, desc: "Regulatory & Fiduciary Calibration" },
  { id: "healthcare", label: "LIFE SCIENCES", icon: <Stethoscope size={32} />, desc: "Clinical & Safety Calibration" },
  { id: "manufacturing", label: "INDUSTRIAL / LOGISTICS", icon: <Factory size={32} />, desc: "Margin & Operational Calibration" },
  { id: "retail", label: "RETAIL / E-COMMERCE", icon: <ShoppingCart size={32} />, desc: "Customer Trust & Churn Calibration" }
];

export default function Home() {
  const router = useRouter();

  const selectSector = (id: string) => {
    localStorage.setItem("bmr_selected_sector", id);
    router.push("/diagnostic");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white py-32 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center mb-16">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4 text-white">
          FORENSIC <span className="text-red-600">TRIAGE</span>
        </h1>
        <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.4em] italic">
          Select Sector to Unlock $1.2M Baseline Audit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {sectors.map((s) => (
          <button
            key={s.id}
            onClick={() => selectSector(s.id)}
            className="group p-8 bg-slate-950 border-2 border-slate-900 hover:border-red-600 transition-all text-left relative overflow-hidden"
          >
            <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
            <h3 className="text-lg font-black uppercase italic mb-2 tracking-tighter">{s.label}</h3>
            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-relaxed">
              {s.desc}
            </p>
            <ArrowRight className="absolute bottom-6 right-6 text-slate-900 group-hover:text-red-600 group-hover:translate-x-1 transition-all" size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}
