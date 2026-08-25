"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { forensicQuestions } from '../data/forensicQuestions';

interface ForensicDiagnosticWizardProps {
  companyName: string;
  activePillar: 'IGF' | 'AVS' | 'HAI';
  role?: string;
  persona?: string;
  onComplete: (answers: Record<string, string>) => void;
}

export default function ForensicDiagnosticWizard({
  companyName,
  activePillar,
  role,
  persona,
  onComplete,
}: ForensicDiagnosticWizardProps) {
  const [activeRole, setActiveRole] = useState<string>(persona || role || 'EXECUTIVE');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);

  // 📥 GLOBAL MOUNT HYDRATION & SECURE PAIRING
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get('email');
      const roleParam = params.get('role') || persona || role;

      if (emailParam) {
        window.sessionStorage.setItem('stakeholder_runtime_email', emailParam);
      }
      if (roleParam) {
        window.sessionStorage.setItem('stakeholder_runtime_role', roleParam);
        setActiveRole(roleParam);
      } else {
        const cachedRole = window.sessionStorage.getItem('stakeholder_runtime_role');
        if (cachedRole) setActiveRole(cachedRole);
      }

      const savedAnswers: Record<string, string> = {};
      ['IGF', 'AVS', 'HAI'].forEach(pillar => {
        const cached = window.sessionStorage.getItem(`quad_cache_${pillar.toUpperCase()}`);
        if (cached) {
          try {
            Object.assign(savedAnswers, JSON.parse(cached));
          } catch (e) {
            console.error(`Failed to combine track cache for ${pillar}:`, e);
          }
        }
      });
      setAnswers(savedAnswers);
    }
  }, [activePillar, persona, role]);

  // 📡 ROLE-BASED VECTOR ROUTER FILTER (BASELINE LOGIC)
  const activeQuestions = useMemo(() => {
    const rawList = Object.values(forensicQuestions);
    const normalizedRole = activeRole?.toUpperCase() || '';

    let filtered: typeof rawList = [];

    if (normalizedRole.includes('TECH') || normalizedRole.includes('MGMT')) {
      filtered = rawList.filter(q => 
        q.pillar?.toUpperCase() === 'AVS' && 
        (q.target_node?.toUpperCase().includes('MGMT') || q.target_node?.toUpperCase().includes('MANAGE') || q.target_node?.toUpperCase().includes('TECH'))
      );
    } else if (normalizedRole.includes('USER') || normalizedRole.includes('SYS')) {
      filtered = rawList.filter(q => 
        q.pillar?.toUpperCase() === 'AVS' && 
        (q.target_node?.toUpperCase().includes('USER') || q.target_node?.toUpperCase().includes('SYS') || q.target_node?.toUpperCase().includes('TECH'))
      );
    } else if (normalizedRole.includes('OPS')) {
      filtered = rawList.filter(q => 
        q.pillar?.toUpperCase() === 'HAI' && 
        (q.target_node?.toUpperCase().includes('MGMT') || q.target_node?.toUpperCase().includes('OPS'))
      );
    } else if (normalizedRole.includes('EXEC')) {
      filtered = rawList.filter(q => 
        q.pillar?.toUpperCase() === 'IGF' && 
        (q.target_node?.toUpperCase().includes('EXEC') || q.target_node?.toUpperCase().includes('STRATEGIC'))
      );
    }

    // BASELINE SAFEGUARD: ALWAYS FALLBACK TO ACTIVE PILLAR (GUARANTEES NON-EMPTY)
    if (filtered.length === 0) {
      filtered = rawList.filter(q => q.pillar?.toUpperCase() === activePillar.toUpperCase());
    }

    return filtered.length > 0 ? filtered : rawList;
  }, [activePillar, activeRole]);

  const currentQuestion = activeQuestions[currentStep];
  const isLastQuestion = currentStep === activeQuestions.length - 1;

  const handleSelectOption = (choiceKey: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQuestion) return;

    const targetPillar = currentQuestion.pillar || activePillar;
    const questionId = currentQuestion.id;

    const prefixedKey = `quad_${questionId}`;
    const updatedAnswers: Record<string, string> = { ...answers, [prefixedKey]: choiceKey };
    setAnswers(updatedAnswers);

    if (typeof window !== 'undefined') {
      const targetPillarAnswers: Record<string, string> = {};
      Object.keys(updatedAnswers).forEach(key => {
        const cleanId = key.replace(/^quad_/, '');
        const qObj = Object.values(forensicQuestions).find(q => q.id === cleanId);

        if (qObj?.pillar?.toUpperCase() === targetPillar.toUpperCase()) {
          targetPillarAnswers[key] = updatedAnswers[key];
        }
      });

      window.sessionStorage.setItem(`quad_cache_${targetPillar.toUpperCase()}`, JSON.stringify(targetPillarAnswers));
    }

    if (isLastQuestion) {
      onComplete(updatedAnswers);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="w-full max-w-lg border border-slate-200 bg-white p-8 text-center rounded-lg shadow-sm">
        <ShieldAlert size={36} className="text-amber-600 mx-auto mb-4" />
        <h3 className="text-lg font-extrabold text-slate-900 uppercase">Diagnostic Initializing</h3>
        <p className="text-xs text-slate-500 font-mono mt-2">
          Loading matrix questions for track: {activeRole}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl border border-slate-200 bg-white p-8 md:p-10 text-left rounded-lg shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-8 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
            QUAD NODE DIAGNOSTIC // {activeRole.replace('_', ' ')} TRACK
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{companyName}</h2>
        </div>
        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded">
          {currentStep + 1} / {activeQuestions.length}
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-2">
            NODE: {currentQuestion.subarea || currentQuestion.pillar}
          </span>
          <p className="text-base font-medium text-slate-900 leading-relaxed">
            {currentQuestion.symptomatic_scenario}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {Object.entries(currentQuestion.choices || {}).map(([key, choice]: [string, any]) => {
            const choiceTyped = key as 'A' | 'B' | 'C' | 'D';
            const selected = answers[`quad_${currentQuestion.id}`] === choiceTyped;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectOption(choiceTyped)}
                className={`w-full p-4 rounded-md border text-left text-xs font-medium transition-colors flex items-start gap-3 cursor-pointer ${
                  selected 
                    ? 'border-slate-900 bg-slate-900 text-white' 
                    : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-400 hover:bg-slate-100'
                }`}
              >
                <span className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                  selected ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {key}
                </span>
                <span className="flex-1 leading-normal">{choice.text}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
