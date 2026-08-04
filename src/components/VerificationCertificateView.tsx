"use client";
import React, { useMemo, useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowDownRight, Award, Lock } from 'lucide-react';

interface CertificateProps {
  companyName?: string;
  initialMetrics?: {
    complianceScore: number;
    annualSalaryLeakage: number;
    unhedgedLegalExposure: number;
  };
  verifiedMetrics?: {
    complianceScore: number;
    annualSalaryLeakage: number;
    unhedgedLegalExposure: number;
  };
  clearedPillars?: string[];
}

export function VerificationCertificateView({
  companyName = "Target Organization",
  initialMetrics = {
    complianceScore: 62,
    annualSalaryLeakage: 114750,
    unhedgedLegalExposure: 607500
  },
  verifiedMetrics = {
    complianceScore: 92,
    annualSalaryLeakage: 18200,
    unhedgedLegalExposure: 45000
  }
}: CertificateProps) {
  const [formattedDate, setFormattedDate] = useState<string>("Aug 4, 2026");

  useEffect(() => {
    setFormattedDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  }, []);

  const calculations = useMemo(() => {
    const taxSaved = Math.max(0, initialMetrics.annualSalaryLeakage - verifiedMetrics.annualSalaryLeakage);
    const exposureReduced = Math.max(0, initialMetrics.unhedgedLegalExposure - verifiedMetrics.unhedgedLegalExposure);
    const readinessGain = verifiedMetrics.complianceScore - initialMetrics.complianceScore;

    return {
      taxSaved,
      exposureReduced,
      readinessGain,
      certificateHash: `CERT-${Math.abs(initialMetrics.annualSalaryLeakage ^ verifiedMetrics.annualSalaryLeakage).toString(16).toUpperCase()}-VERIFIED`
    };
  }, [initialMetrics, verifiedMetrics]);

  return (
    <div className="bg-white text-slate-900 border-2 border-slate-900 p-8 md:p-12 rounded-lg shadow-md space-y-8 font-sans max-w-[1200px] mx-auto text-left">
      
      {/* HEADER */}
      <div className="border-b-2 border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Award size={16} /> Pre-Automation Control Plane Verification Certificate
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Control Plane Attestation: {companyName}
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Issued: {formattedDate} // Certificate Ref: {calculations.certificateHash}
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-2 font-mono text-xs font-bold rounded-md flex items-center gap-2 uppercase shrink-0">
          <ShieldCheck size={18} className="text-emerald-600" /> Tier 01 Certified
        </div>
      </div>

      {/* DELTA METRICS */}
      <div>
        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block mb-3">
          // Section 01 // Verified Value Realization Delta (T0 Baseline vs T1 Post-Audit)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
          
          <div className="border border-slate-200 bg-slate-50 p-5 rounded-md space-y-2">
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">Process Waste Tax Reduction</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">
                ${verifiedMetrics.annualSalaryLeakage.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ${initialMetrics.annualSalaryLeakage.toLocaleString()}
              </span>
            </div>
            <div className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1">
              <ArrowDownRight size={14} /> ${calculations.taxSaved.toLocaleString()} Annual Waste Eliminated
            </div>
          </div>

          <div className="border border-slate-200 bg-slate-50 p-5 rounded-md space-y-2">
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">Promise Gap™ Risk Mitigated</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">
                ${verifiedMetrics.unhedgedLegalExposure.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ${initialMetrics.unhedgedLegalExposure.toLocaleString()}
              </span>
            </div>
            <div className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1">
              <ArrowDownRight size={14} /> ${calculations.exposureReduced.toLocaleString()} Risk Exposure Sealed
            </div>
          </div>

          <div className="border border-slate-200 bg-slate-50 p-5 rounded-md space-y-2">
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">AI Readiness Score Improvement</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">
                {verifiedMetrics.complianceScore.toFixed(0)}/100
              </span>
              <span className="text-xs text-slate-400 line-through">
                {initialMetrics.complianceScore.toFixed(0)}/100
              </span>
            </div>
            <div className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1">
              +{calculations.readinessGain} Points Gained
            </div>
          </div>

        </div>
      </div>

      {/* VERIFIED GATES */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
          // Section 02 // Verified Architectural Gates Audit
        </span>
        <div className="border border-slate-200 bg-slate-50 p-6 rounded-md font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
            <span className="text-slate-900 font-bold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" /> Ingestion Contract Gate (DLP Sensitivity Filters)
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded text-[10px]">VERIFIED PASS</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
            <span className="text-slate-900 font-bold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" /> Schema Drift Circuit Breaker Protocol
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded text-[10px]">VERIFIED PASS</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-900 font-bold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" /> Microservice Adapter Decoupling Layer
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded text-[10px]">VERIFIED PASS</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
        <div className="space-y-1">
          <p className="font-bold text-slate-900 font-mono text-[11px]">INDEPENDENT CONTROL PLANE AUDIT ATTESTATION</p>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            This certificate verifies that the target organization has remediated identified pipeline fractures and meets Tier 01 Pre-Automation deployment standards.
          </p>
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px] shrink-0">
          <Lock size={12} /> Immutable State Matrix Signed
        </div>
      </div>

    </div>
  );
}
