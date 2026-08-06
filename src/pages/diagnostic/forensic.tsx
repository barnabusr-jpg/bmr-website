"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import ForensicDiagnosticWizard from '../../src/components/ForensicDiagnosticWizard';

export default function ForensicPage() {
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState(false);
  const [companyName, setCompanyName] = useState('Target Organization');
  const [activeRole, setActiveRole] = useState('TECHNICAL');
  const [pillar, setPillar] = useState<'IGF' | 'AVS' | 'HAI'>('IGF');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const codeParam = params.get('code');
      const orgParam = params.get('org') || params.get('entity');
      const roleParam = params.get('role');
      const pillarParam = params.get('pillar') as 'IGF' | 'AVS' | 'HAI';

      if (orgParam) setCompanyName(decodeURIComponent(orgParam));
      else if (codeParam) setCompanyName(`ORGANIZATION [${codeParam}]`);

      if (roleParam) setActiveRole(roleParam.toUpperCase());
      if (pillarParam && ['IGF', 'AVS', 'HAI'].includes(pillarParam)) {
        setPillar(pillarParam);
      }
    }
  }, []);

  // 1. SPLASH LANDING GATE (Clean Executive Theme)
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-xl border border-slate-200 bg-white p-8 md:p-10 rounded-lg shadow-sm space-y-6 text-left">
          
          <div className="border-b border-slate-100 pb-4 font-mono text-xs flex justify-between items-center">
            <span className="text-red-600 font-bold uppercase tracking-wider flex items-center gap-2">
              <Activity size={14} className="animate-pulse" /> NODE AUTHORIZED: {activeRole}
            </span>
            <span className="text-slate-400 font-semibold uppercase">
              TARGET: {companyName}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Protocol Initialized
            </h1>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Authenticating forensics for <strong className="text-slate-900 font-bold">{companyName}</strong>. Entry is isolated to your specific stakeholder node link.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-md flex items-center gap-3 text-xs text-slate-700 font-mono">
            <ShieldCheck size={18} className="text-slate-900 shrink-0" />
            <span>Pre-automation diagnostic session active and ready for ingestion.</span>
          </div>

          <button
            type="button"
            onClick={() => setHasStarted(true)}
            className="w-full bg-slate-900 text-white font-mono font-bold text-xs py-4 uppercase tracking-wider rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            Start Diagnostic Audit <ArrowRight size={14} />
          </button>

        </div>
      </div>
    );
  }

  // 2. ACTIVE QUESTIONNAIRE WIZARD
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <ForensicDiagnosticWizard 
        companyName={companyName}
        activePillar={pillar}
        onCalculated={() => {
          if (typeof window !== 'undefined') {
            router.push('/forensic?auth=true');
          }
        }}
      />
    </div>
  );
}
