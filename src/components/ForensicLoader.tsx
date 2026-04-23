"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "ANALYZING_LOGIC_LINEAGE...",
  "CROSS-REFERENCING_SALESFORCE_FAILURE_NODES...",
  "CALCULATING_COMPLEXITY_TAX_EXPONENT...",
  "DETECTING_SHADOW_AI_SHEAR...",
  "SYNTHESIZING_HEMORRHAGE_VECTORS...",
  "SYNTHESIS_COMPLETE."
];

export default function ForensicLoader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < MESSAGES.length - 1) setIndex(index + 1);
      else {
        clearInterval(interval);
        setTimeout(onComplete, 500); 
      }
    }, 600); // Speed of the scan
    return () => clearInterval(interval);
  }, [index, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center"
    >
      <div className="text-center space-y-6">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <motion.p 
          key={index}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="font-mono text-red-600 text-xs uppercase tracking-[0.4em] font-black"
        >
          {MESSAGES[index]}
        </motion.p>
      </div>
    </motion.div>
  );
}
