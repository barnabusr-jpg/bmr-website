"use client";
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ForensicSliderProps {
  label: string;
  zone: string;
  value: number;
  onChange: (value: number) => void;
  criticalThreshold?: number;
}

export default function ForensicSlider({
  label,
  zone,
  value,
  onChange,
  criticalThreshold = 7
}: ForensicSliderProps) {
  const isCritical = value >= criticalThreshold;
  const fillPercentage = ((value - 1) / 9) * 100;

  // We convert the label to a sanitized string to bypass JSX parser errors
  const labelString = `${zone.toUpperCase()} // ${label.toUpperCase()}`;

  return (
    <div className="mb-12 group">
      <div className="flex justify-between items-end mb-4">
        <div className="flex items-center gap-2">
          <label 
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 group-hover:text-red-600 transition-colors"
            dangerouslySetInnerHTML={{ __html: labelString }}
          />
          {isCritical && <AlertTriangle className="h-3 w-3 text-red-600 animate-pulse" />}
        </div>
        <span className={isCritical ? "text-xl font-black italic text-red-600" : "text-xl font-black italic text-white"}>
          {value}
        </span>
      </div>

      <input
        type="range"
        min="1"
        max="10"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-red-600"
        style={{
          background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${fillPercentage}%, #1e293b ${fillPercentage}%, #1e293b 100%)`
        }}
      />

      <div className="flex justify-between mt-2 text-[8px] font-mono uppercase tracking-widest text-slate-700">
        <span className={value < 4 ? "text-green-500 font-bold" : ""}>OPTIMIZED</span>
        <span className={isCritical ? "text-red-600 font-bold" : ""}>CRITICAL DECAY</span>
      </div>

      {isCritical && (
        <div className="mt-3 text-[9px] text-red-600 font-mono uppercase tracking-widest border-l border-red-600 pl-2">
          <span>WARNING: SYSTEMIC </span>
          <span>{zone.toUpperCase()}</span>
          <span> EXCEEDS SAFE OPERATING PARAMETERS</span>
        </div>
      )}
    </div>
  );
}
