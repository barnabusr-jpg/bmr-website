"use client";

import React from 'react';

interface TopologyProps {
  sfiScore: number;
}

export default function TopologyMap({ sfiScore }: TopologyProps) {
  // Logic: High score (friction) = smaller inner triangle. 
  const stabilityFactor = Math.max(0.1, (100 - sfiScore) / 100);
  
  const cx = 200;
  const cy = 200;
  const r = 140; // Base radius for the outer frame

  // Calculate dynamic vertices for the Red Risk Polygon
  const p1 = { x: cx, y: cy - (r * stabilityFactor) };
  const p2 = { x: cx - (r * 0.866 * (stabilityFactor * 0.95)), y: cy + (r * 0.5 * (stabilityFactor * 0.95)) };
  const p3 = { x: cx + (r * 0.866 * (stabilityFactor * 1.05)), y: cy + (r * 0.5 * (stabilityFactor * 1.05)) };

  return (
    <div className="p-8 border border-slate-800 bg-black space-y-8 font-mono text-left">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <h3 className="text-xl font-black uppercase italic text-white tracking-tighter">FORENSIC TOPOLOGY MAP</h3>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Input-Based Snapshot // Logic Flow Assessment</p>
        </div>
      </div>

      <div className="relative h-[400px] w-full flex items-center justify-center bg-black/50 overflow-hidden">
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-[400px] overflow-visible">
          {/* Ideal State Reference Frame (The dashed boundary) */}
          <polygon 
            points={`${cx},${cy-r} ${cx-(r*0.866)},${cy+(r*0.5)} ${cx+(r*0.866)},${cy+(r*0.5)}`}
            className="fill-none stroke-slate-800 stroke-[1]"
            strokeDasharray="4 4"
          />

          {/* Dynamic Risk Polygon (The user's actual posture) */}
          <polygon 
            points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
            className="fill-red-600/10 stroke-red-600 stroke-[2] transition-all duration-1000 ease-in-out"
          />

          {/* Node Markers */}
          <circle cx={p1.x} cy={p1.y} r="3" className="fill-red-600 animate-pulse" />
          <circle cx={p2.x} cy={p2.y} r="3" className="fill-red-600 animate-pulse" />
          <circle cx={p3.x} cy={p3.y} r="3" className="fill-red-600 animate-pulse" />

          {/* Labels */}
          <text x={cx} y={cy-r-15} textAnchor="middle" className="fill-slate-600 text-[9px] uppercase tracking-widest font-bold font-mono">Node_01: Human</text>
          <text x={cx-(r*0.866)-10} y={cy+(r*0.5)+20} textAnchor="middle" className="fill-slate-600 text-[9px] uppercase tracking-widest font-bold font-mono">Node_02: Value</text>
          <text x={cx+(r*0.866)+10} y={cy+(r*0.5)+20} textAnchor="middle" className="fill-slate-600 text-[9px] uppercase tracking-widest font-bold font-mono">Node_03: Safety</text>
        </svg>
      </div>

      <div className="text-[9px] text-slate-500 italic leading-relaxed border-t border-slate-900 pt-4 font-mono">
        <span className="text-red-600 font-bold uppercase mr-2 font-mono">Forensic Note:</span> 
        The red interior polygon represents your current logic footprint. Contraction toward the center signifies systemic friction and capital leakage.
      </div>
    </div>
  );
}
