"use client";

import React from 'react';
import { motion } from 'framer-motion';

const RADIOLOGY_ALERTS = [
  "FISCAL_DRAIN_DETECTED: $1.2M REWORK TAX IDENTIFIED",
  "STRUCTURAL_DRIFT_ANALYSIS: LOGIC_DECAY > 60%",
  "INACTION_PENALTY_CALCULATION: +$110K/MONTH",
  "GOVERNANCE_SHEAR_DETECTION: PROMPT_ROT_ACTIVE",
  "CAPITAL_EXPOSURE_ALERT: ASYMMETRIC_FRICTION_CONFIRMED",
  "REMEDIATION_ROI: REAL-TIME LOGGING SAVES $900K/YR",
  "AUDIT_SIGNAL: SYSTEMIC_FRICTION_INDEX EXCEEDS THRESHOLD",
  "RECOVERY_PROTOCOL: HARDENING_MODULES_PENDING"
];

export default function LogicLeakTicker() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#020617] border-t border-red-900/20 py-1.5 overflow-hidden z-[60]">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 35, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="whitespace-nowrap flex gap-16 items-center"
      >
        {/* Doubling the array to create a seamless infinite loop */}
        {[...RADIOLOGY_ALERTS, ...RADIOLOGY_ALERTS].map((alert, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[9px] font-mono font-black tracking-[0.4em] text-slate-600 uppercase italic">
              {alert}
            </span>
            <div className="w-1 h-1 bg-red-600 rounded-full animate-pulse" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
