import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Activity, ArrowRight, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DiagnosticResultsContent() {
  const [results, setResults] = useState({ hai: false, avs: false, igf: false });

  useEffect(() => {
    // Syncing with the 'bmr_results_vault' saved in PromiseGapDiagnosticPage.tsx
    const vault = JSON.parse(localStorage.getItem('bmr_results_vault') || '{"hai":false,"avs":false,"igf":false}');
    setResults(vault);
  }, []);

  const lensData = [
    {
      id: "hai",
      acronym: "HAI",
      label: "Trust Architecture",
      icon: ShieldCheck,
      isHighFriction: results.hai,
      description: "Addressing manual verification and trust erosion between human operators and AI systems."
    },
    {
      id: "avs",
      acronym: "AVS",
      label: "Governance & Value",
      icon: Zap,
      isHighFriction: results.avs,
      description: "Bridging the gap between AI activity and measurable organizational mission value."
    },
    {
      id: "igf",
      acronym: "IGF",
      label: "Evolutionary Safeguards",
      icon: Activity,
      isHighFriction: results.igf,
      description: "Ensuring accountability loops are embedded to prevent system drift as you scale."
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-16">
      {lensData.map((lens) => (
        <Card 
          key={lens.id}
          className={`p-8 bg-slate-900/40 border-2 transition-all duration-700 relative overflow-hidden ${
            lens.isHighFriction 
              ? "border-[#14b8a6] shadow-[0_0_20px_rgba(20,184,166,0.1)]" 
              : "border-slate-800 opacity-60"
          }`}
        >
          {lens.isHighFriction && (
            <div className="absolute top-0 right-0 bg-[#14b8a6] text-[#020617] text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">
              Priority Area
            </div>
          )}
          
          <lens.icon className={`h-10 w-10 mb-6 ${lens.isHighFriction ? "text-[#14b8a6]" : "text-slate-600"}`} />
          
          <div className="mb-2">
            <span className={`text-[10px] font-bold tracking-[0.2em] ${lens.isHighFriction ? "text-[#14b8a6]" : "text-slate-500"}`}>
              {lens.acronym}
            </span>
            <h3 className="text-xl font-bold text-white italic uppercase tracking-tight">
              {lens.label}
            </h3>
          </div>
          
          <p className="text-slate-400 text-sm font-light leading-relaxed italic">
            {lens.description}
          </p>
        </Card>
      ))}
    </div>
  );
}
