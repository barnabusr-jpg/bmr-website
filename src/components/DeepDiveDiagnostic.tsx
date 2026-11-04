import React, { useState, useEffect } from 'react';
import { BookOpen, Activity, ChevronRight } from 'lucide-react';
import { DEEP_DIVE_QUESTIONS } from '@/data/deepDiveQuestions';

interface DeepDiveDiagnosticProps {
  operatorId: string;
  userLens?: string;
}

export default function DeepDiveDiagnostic({ operatorId, userLens }: DeepDiveDiagnosticProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const LENS_SIGNAL = (userLens || "EXECUTIVE").toUpperCase();
  const lensQuestions = DEEP_DIVE_QUESTIONS.filter((q) => q.lens === LENS_SIGNAL);

  useEffect(() => {
    async function validate() {
      if (!operatorId) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch('/api/validate-operator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operatorId }),
        });

        if (res.ok) {
          const result = await res.json();
          setIsAuthorized(Boolean(result.is_authorized));
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error('Failed to validate operator:', err);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    }

    validate();
  }, [operatorId]);

  const handleNext = async (answer: string) => {
    if (!lensQuestions[currentIdx] || isSubmitting) return;

    if (!isAuthorized) {
      alert("Unauthorized session. Please refresh or verify your access code.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Record response into operator's raw_responses JSONB via server route
      const recordRes = await fetch('/api/record-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operatorId,
          questionId: lensQuestions[currentIdx].id,
          value: answer,
          lens: LENS_SIGNAL,
        }),
      });

      if (!recordRes.ok) {
        const errorData = await recordRes.json().catch(() => ({}));
        alert(`Failed to save response: ${errorData.error || 'Server error'}`);
        return;
      }

      // 2. Advance index or execute final completion handshake
      if (currentIdx < lensQuestions.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        const finalReworkTax = 1.3;

        const completeRes = await fetch('/api/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            operatorId,
            lens: LENS_SIGNAL,
            reworkTax: finalReworkTax,
          }),
        });

        if (!completeRes.ok) {
          const errorData = await completeRes.json().catch(() => ({}));
          alert(`DATABASE_REJECTION: ${errorData.error || 'Completion handshake failed'}`);
          return;
        }

        const data = await completeRes.json();

        // Redirect directly to the results dynamic page
        if (data.auditId) {
          window.location.href = `/results/${data.auditId}`;
        } else {
          window.location.href = '/results';
        }
      }
    } catch (err: any) {
      console.error('Submission pipeline error:', err);
      alert(`NETWORK_ERROR: ${err.message || 'Request failed'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-mono text-xs text-slate-600 animate-pulse font-bold uppercase tracking-wider">
        Authorizing Node...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col md:flex-row">
      <aside className="w-full md:w-80 border-b md:border-r border-slate-200 p-8 md:p-10 space-y-8 shadow-sm">
        <div className="flex items-center gap-2.5 text-slate-900 font-mono font-bold uppercase text-xs tracking-wider">
          <BookOpen size={18} className="text-slate-900" /> BMR Field Guide V3
        </div>

        <div className="p-5 border border-slate-200 bg-slate-50/70 rounded-md space-y-1">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold block">
            Active Chapter
          </label>
          <h4 className="text-slate-900 font-bold text-xs uppercase leading-snug">
            {lensQuestions[currentIdx]?.chapter || 'Overview'}
          </h4>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <div className="max-w-3xl space-y-8">
          <div className="flex items-center gap-2 text-slate-500 font-mono text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-4">
            <Activity size={16} className="text-slate-900 animate-pulse" /> Zone {lensQuestions[currentIdx]?.zone} // Lens: {LENS_SIGNAL}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {lensQuestions[currentIdx]?.text}
          </h1>

          <div className="grid grid-cols-1 gap-3 pt-2">
            {["High Confidence", "Moderate Confidence", "Theoretical"].map((opt) => (
              <button
                key={opt}
                type="button"
                disabled={isSubmitting}
                onClick={() => handleNext(opt)}
                className="w-full p-5 bg-white border border-slate-200 text-slate-800 text-left hover:border-slate-900 hover:bg-slate-50 transition-all flex justify-between items-center group font-sans font-semibold text-xs md:text-sm rounded-md shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{opt}</span>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
