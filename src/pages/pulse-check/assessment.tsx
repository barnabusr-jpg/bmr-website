"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
// Ensure these icons are added to your Lucide imports
import { 
  Terminal, 
  AlertTriangle, 
  DollarSign, 
  HeartPulse, 
  Cpu, 
  Users 
} from "lucide-react";

type Sector = "finance" | "healthcare" | "tech" | "services";

// Move config outside to keep the component clean
const SECTORS = [
  { id: "finance" as Sector, label: "FINANCE", risk: "COMPLIANCE", icon: DollarSign, color: "bg-red-600/10" },
  { id: "healthcare" as Sector, label: "HEALTHCARE", risk: "LIABILITY", icon: HeartPulse, color: "bg-red-700/10" },
  { id: "tech" as Sector, label: "TECHNOLOGY", risk: "TECHNICAL DEBT", icon: Cpu, color: "bg-yellow-600/10" },
  { id: "services" as Sector, label: "SERVICES", risk: "LABOR", icon: Users, color: "bg-blue-600/10" }
];

export default function SectorSelection({ sector, setSector }: { sector: Sector, setSector: (s: Sector) => void }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-4 w-4 text-red-600 animate-pulse" />
        <p className="text-[11px] font-mono text-red-600 uppercase tracking-[0.4em] font-black italic">
          SECTOR CALIBRATION REQUIRED
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SECTORS.map((s) => {
          const Icon = s.icon;
          const isActive = sector === s.id;
          
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setSector(s.id);
                setHasInteracted(true);
              }}
              className={`p-6 border-2 text-left transition-all duration-300 flex flex-col justify-center min-h-[120px] relative overflow-hidden group
                ${isActive
                  ? `${s.color} border-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] scale-[1.05] z-10`
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800/60'}`}
            >
              {/* Sector Indicator Tag */}
              <div className={`absolute top-2 right-2 text-[7px] font-mono px-2 py-0.5 rounded-full tracking-tighter
                ${isActive ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                {s.id.toUpperCase()}
              </div>

              {/* Main Label */}
              <div className={`text-lg font-black uppercase italic tracking-tighter leading-none mb-1 transition-colors
                ${isActive ? 'text-white' : 'text-slate-200'}`}>
                {s.label}
              </div>

              {/* Risk Profile */}
              <div className={`text-[10px] font-mono font-bold tracking-[0.1em] transition-colors
                ${isActive ? 'text-white/70' : 'text-red-600'}`}>
                {s.risk}
              </div>

              {/* Sector-Specific Icon Background */}
              <div className={`absolute bottom-3 right-3 transition-all duration-500 
                ${isActive ? 'opacity-40 scale-110 text-white' : 'opacity-10 group-hover:opacity-25 text-slate-400'}`}>
                <Icon size={20} strokeWidth={2.5} />
              </div>

              {/* Selection Pulse Glow */}
              {isActive && (
                <motion.div 
                  layoutId="pulse"
                  className="absolute inset-0 bg-red-600/5"
                  initial={false}
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Forensic Validation message */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[9px] text-red-600/60 font-mono uppercase tracking-[0.3em] text-center italic"
          >
            Awaiting system calibration... Select sector to proceed
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
