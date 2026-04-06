"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, Zap, Banknote, Stethoscope, Factory, ShoppingCart, ArrowRight } from "lucide-react";

// --- 1. DATA ANCHOR (Self-Contained to prevent import errors) ---
const LOCAL_QUESTIONS = [
  {
    id: "RT_01",
    protocol: "reworkTax",
    text: "AI standard operating procedures (SOPs) are documented and followed.",
    options: [
      { label: "Non-existent", weight: 10, forensicInsight: "TRIBAL_KNOWLEDGE_DEPENDENCY_CREATES_$5.2M/YEAR_IN_REWORK.", internalTag: "LOGIC_FRAGMENTATION" },
      { label: "Ad-hoc/Manual", weight: 6, forensicInsight: "VARIABLE_OUTPUT_QUALITY_INCREASES_COMPLIANCE_RISK_BY_40%.", internalTag: "EXPERTISE_SILOS" },
      { label: "Formalized", weight: 4, forensicInsight: "STANDARDIZED_LOGIC_REDUCES_MARGIN_EROSION_BY_12%.", internalTag: "STRUCTURAL_CLARITY" },
      { label: "Automated/Optimized", weight: 2, forensicInsight: "AUTOMATED_GOVERNANCE_UNLOCKS_30%_FASTER_ITERATIONS.", internalTag: "OPTIMIZED_FLOW" }
    ]
  },
  // ... (Ensure at least one question per protocol exists to prevent math errors)
  {
    id: "DG_01", protocol: "deltaGap", text: "Our AI systems directly contribute to measurable business ROI.",
    options: [{ label: "Not tracked", weight: 10, forensicInsight: "VALUE_LEAKAGE_DETECTED.", internalTag: "DRIFT" }, { label: "Direct impact", weight: 2, forensicInsight: "OPTIMIZED.", internalTag: "STABLE" }]
  },
  {
    id: "SA_01", protocol: "shadowAI", text: "AI vendors are assessed for risk before contract signing.",
    options: [{ label: "No oversight", weight: 10, forensicInsight: "RISK_DETECTED.", internalTag: "SHADOW" }, { label: "Continuous", weight: 2, forensicInsight: "SECURE.", internalTag: "SAFE" }]
  },
  {
    id: "ED_01", protocol: "expertiseDebt", text: "Our data infrastructure can handle real-time AI processing.",
    options: [{ label: "Legacy", weight: 10, forensicInsight: "DEBT_DETECTED.", internalTag: "DEBT" }, { label: "Real-time", weight: 2, forensicInsight: "ELITE.", internalTag: "ELITE" }]
  }
];

const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState("finance"); // 🛡️ Default to prevent NaN
  const [aiSpend, setAiSpend] = useState(1.2);
  const [userRole, setUserRole] = useState("executive");
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hoveredProtocolX, setHoveredProtocolX] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  // --- 🛡️ HELPER FUNCTIONS (Moved inside to prevent ReferenceErrors) ---
  const getForensicDiagnosis = (decay: number, role: string) => {
    const severity = decay > 80 ? 'CRITICAL' : decay > 40 ? 'WARNING' : 'STABLE';
    const perspectives: any = {
      executive: { CRITICAL: "CAPITAL_EROSION_EVENT", WARNING: "STRATEGIC_LIABILITY_DETECTION", STABLE: "MARGIN_PROTECTION_ACTIVE", subtext: "Fiscal Integrity Status" },
      technical: { CRITICAL: "TERMINAL_STACK_DECAY", WARNING: "ARCHITECTURAL_DRIFT_DETECTED", STABLE: "SYSTEMIC_INTEGRITY_VERIFIED", subtext: "Technical Debt Status" },
      managerial: { CRITICAL: "TOTAL_OPERATIONAL_STAGNATION", WARNING: "VELOCITY_LATENCY_DETECTION", STABLE: "OUTPUT_EFFICIENCY_STABLE", subtext: "Throughput Health Status" }
    };
    const p = perspectives[role] || perspectives.executive;
    return { label: p[severity], subtext: p.subtext };
  };

  const calculateSynthesis = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const sectorWeights: any = { finance: 1.12, healthcare: 1.08, manufacturing: 1.15, retail: 1.02 };
    const coeff = sectorWeights[sector] || 1.0;
    const baseHemorrhage = totalSum * 0.04 * coeff;
    const scaledTotal = baseHemorrhage * (aiSpend / 1.2);
    
    // Safety check for 0 division
    const decayRaw = totalSum === 0 ? 0 : Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100);

    return {
      total: scaledTotal || 0,
      decay: Math.min(decayRaw, 98),
      reworkTax: (scaledTotal * 0.35) || 0, // Fallback ratios for Alpha
      deltaGap: (scaledTotal * 0.30) || 0,
      roi: aiSpend > 0 ? -((scaledTotal / aiSpend) * 100).toFixed(0) : 0
    };
  };

  // --- 🛡️ SUB-COMPONENTS (Triage, Intake, Audit, Verdict) ---
  // ... (Paste your Triage, Intake, and Audit renderers here)
  
  // (Verify your Verdict uses calculateSynthesis().total.toFixed(1) to avoid null errors)

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <AnimatePresence mode="wait">
        {step === 'triage' && Triage}
        {step === 'intake' && Intake}
        {step === 'audit' && Audit}
        {step === 'verdict' && Verdict}
      </AnimatePresence>
    </div>
  );
}
