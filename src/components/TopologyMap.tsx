"use client";

import React, { useState } from 'react';

interface TopologyProps {
  sfiScore: number;
}

export default function TopologyMap({ sfiScore }: TopologyProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Logic descriptors stay generic to protect proprietary math
  const getStatus = (score: number, threshold: number) => {
    if (score > threshold) return "REPORTED STABLE";
    if (score > threshold - 25) return "PERCEIVED DRIFT";
    return "REPORTED FRACTURE";
  };

  const getZoneColor = (score: number, threshold: number) => {
    if (score > threshold) return "text-green-500 border-green-900/30 bg-green-900/10";
    if (score > threshold - 25) return "text-yellow-500 border-yellow-900/30 bg-yellow-900/10";
    return "text-red-500 border-red-900/30 bg-red-900/10";
  };

  const zones = [
    {
      label: "Red Zone",
      color: "bg-red-600",
      text: "REPORTED FRACTURE: Failures in logic based on your inputs. They create systemic risk, including legal exposure, rework tax, and reputational damage. These zones require stabilization to prevent capital leaks."
    },
    {
      label: "Yellow Zone",
      color: "bg-yellow-500",
      text: "PERCEIVED DRIFT: Potential friction points identified in your current operations. Monitor these zones closely. They may degrade into fractures without intervention."
    },
    {
      label: "Green Zone",
      color: "bg-green-500",
      text: "REPORTED STABLE: Matches your strategic intent according to provided data. Maintain current protocols to sustain integrity."
    }
  ];

  return (
    <div className="p-8 border border-slate-800 bg-black space-y-8 font-mono text-left">
      {/* Header with Snapshot ID */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <h3 className="text-xl font-black uppercase italic text-white tracking-tighter">
            FORENSIC TOPOLOGY MAP
          </h3>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Input-Based Snapshot // Logic Flow Assessment</p>
        </div>
        <span className="text-slate-500 text-[10px] tracking-widest font-bold italic">REF: BMR-SNAPSHOT-ALPHA</span>
      </div>

      {/* Visual Map Section */}
      <div className="relative py-6 flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 gap-3 w-full max-w-md">
          {/* Node 01: Human Alignment */}
          <div className={`p-4 border font-bold text-[10px] text-center uppercase tracking-widest transition-all duration-700 ${getZoneColor(sfiScore, 70)}`}>
            NODE 01: HUMAN ALIGNMENT // {getStatus(sfiScore, 70)}
          </div>
          
          {/* Nodes 02 & 03: Business and Evolution */}
          <div className="flex gap-3">
            <div className={`flex-1 p-4 border font-bold text-[10px] text-center uppercase tracking-widest transition-all duration-700 ${getZoneColor(sfiScore, 50)}`}>
              NODE 02: BUSINESS VALUE // {getStatus(sfiScore, 50)}
            </div>
            <div className={`flex-1 p-4 border font-bold text-[10px] text-center uppercase tracking-widest transition-all duration-700 ${getZoneColor(sfiScore, 30)}`}>
              NODE 03: SAFE EVOLUTION // {getStatus(sfiScore, 30)}
            </div>
          </div>
        </div>

        {/* Aggregate Posture Display */}
        <div className="mt-8 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mb-2 font-bold font-mono italic">Reported System Posture</div>
          <div className={`text-5xl font-black italic tracking-tighter transition-all duration-700 ${sfiScore > 70 ? "text-green-500" : sfiScore > 35 ? "text-yellow-500" : "text-red-600"}`}>
            {sfiScore > 70 ? "STABLE" : sfiScore > 35 ? "WARNING" : "CRITICAL"}
          </div>
        </div>
      </div>

      {/* Forensic Condition Legend with Tooltips */}
      <div className="flex flex-wrap justify-start gap-6 border-t border-slate-900 pt-6">
        {zones.map((zone) => (
          <div 
            key={zone.label}
            className="relative group cursor-help"
            onMouseEnter={() => setActiveTooltip(zone.label)}
            onMouseLeave={() => setActiveTooltip(null)}
            onClick={() => setActiveTooltip(activeTooltip === zone.label ? null : zone.label)}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 ${zone.color}`}></div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider underline decoration-slate-800 underline-offset-4 decoration-2">{zone.label}</span>
            </div>
            
            {/* Secure Tooltip Box */}
            {activeTooltip === zone.label && (
              <div className="absolute bottom-full left-0 mb-3 w-64 p-4 bg-slate-900 border border-slate-800 shadow-2xl z-50 animate-in fade-in zoom-in duration-200">
                <p className="text-[10px] text-white leading-relaxed italic">
                  {zone.text}
                </p>
                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-900 border-r border-b border-slate-800 rotate-45"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Forensic Disclaimer */}
      <div className="text-[9px] text-slate-500 italic leading-relaxed border-t border-slate-900 pt-4 font-sans">
        <span className="text-red-600 font-bold uppercase mr-2">Forensic Disclaimer:</span> 
        This map is a point-in-time snapshot based on provided data. It represents a reported condition. 
        It is not an independent technical validation of system performance. Verification requires a primary forensic review.
      </div>
    </div>
  );
}
