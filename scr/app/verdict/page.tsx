"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useDiagnostic } from "@/context/DiagnosticContext";
import CockpitHeader from "@/components/diagnostic/CockpitHeader";
import HeaderScopeBlock from "@/components/diagnostic/HeaderScopeBlock";
import BoardExecutiveBriefingBlock from "@/components/diagnostic/BoardExecutiveBriefingBlock";
import MetricRelationshipHierarchyLine from "@/components/diagnostic/MetricRelationshipHierarchyLine";
import QuadNodeSummaryMatrixTable from "@/components/diagnostic/QuadNodeSummaryMatrixTable";
import RemediationSowMatrixTable from "@/components/diagnostic/RemediationSowMatrixTable";

function VerdictContent() {
  const searchParams = useSearchParams();
  const { loadFromToken } = useDiagnostic();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [invalidTokenBanner, setInvalidTokenBanner] = useState<boolean>(false);

  useEffect(() => {
    // Reset banner unconditionally on any searchParams navigation shift
    setInvalidTokenBanner(false);

    const raw = searchParams.get("token");
    if (!raw) return;

    const token = raw.trim();
    const MAX_TOKEN_LENGTH = 4096;
    const looksReasonable =
      token.length > 0 &&
      token.length <= MAX_TOKEN_LENGTH &&
      /^[A-Za-z0-9\-_\.]+$/.test(token);

    if (!looksReasonable) {
      setInvalidTokenBanner(true);
      return;
    }

    setIsVerifying(true);

    (async () => {
      try {
        const ok = await loadFromToken(token);
        if (!ok) {
          setInvalidTokenBanner(true);
        }
      } catch {
        setInvalidTokenBanner(true);
      } finally {
        setIsVerifying(false);
      }
    })();
  }, [searchParams, loadFromToken]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 font-mono text-xs text-slate-400">
        <div className="border border-slate-800 bg-slate-950 p-8 rounded-xs space-y-4 max-w-md w-full shadow-2xl">
          <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest animate-pulse">
            <span>// VERIFYING HMAC SIGNATURE...</span>
          </div>
          <p className="text-slate-500 leading-relaxed font-sans">
            Authenticating diagnostic control plane payload against server key store.
          </p>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div className="bg-red-700 h-full w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8 text-slate-900 print:p-0 print:bg-white font-sans">
      
      {/* GLOBAL PRINT ISOLATION & INTERACTION NEUTRALIZATION */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm;
          }
          body {
            background-color: #ffffff !important;
            color: #020617 !important;
          }
          .print-avoid-break {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          .print-break-before {
            break-before: page !important;
            page-break-before: always !important;
          }
          table, thead, tbody, tr, td, th {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          tr {
            display: table-row !important;
          }
          .print-hide {
            display: none !important;
          }
        }
      `}</style>

      {/* COCKPIT CONTAINER */}
      <div className="max-w-7xl mx-auto bg-white border border-slate-200 shadow-sm p-6 md:p-10 space-y-8 rounded-xs print:border-none print:shadow-none print:p-0 print:max-w-none">
        
        {/* INVALID TOKEN BANNER */}
        {invalidTokenBanner && (
          <div className="bg-red-50 border border-red-200 text-red-800 font-mono text-xs p-3 rounded-xs flex items-center justify-between print-hide">
            <span>// WARNING: INVALID OR EXPIRED SHARE LINK TOKEN. DEFAULT SESSION LOADED.</span>
            <button 
              onClick={() => setInvalidTokenBanner(false)}
              className="font-bold underline text-red-900 hover:text-red-700 cursor-pointer ml-4"
            >
              DISMISS
            </button>
          </div>
        )}

        {/* INTERACTIVE CONTROLS & SHARE BAR (HIDDEN IN PRINT) */}
        <div className="print-hide">
          <CockpitHeader />
        </div>

        {/* --- PAGE 1: EXECUTIVE BRIEFING, METRICS & CONSOLIDATED MATRIX --- */}
        <div className="pdf-page-01 space-y-8">
          
          <div className="print-avoid-break">
            <HeaderScopeBlock />
          </div>

          <div className="print-avoid-break">
            <BoardExecutiveBriefingBlock />
          </div>

          <div className="print-avoid-break">
            <MetricRelationshipHierarchyLine />
          </div>

          <div className="print-avoid-break pt-2">
            <QuadNodeSummaryMatrixTable />
          </div>

        </div>

        {/* --- PAGE 2: ACTIVE REMEDIATION SOW & GOVERNANCE --- */}
        <div className="pdf-page-02 print-break-before pt-6 print:pt-0 space-y-8">
          
          <div className="print-avoid-break">
            <RemediationSowMatrixTable />
          </div>

        </div>

      </div>
    </main>
  );
}

export default function DiagnosticVerdictPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center font-mono text-xs text-slate-400">
        // LOADING DIAGNOSTIC CONTROL PLANE...
      </div>
    }>
      <VerdictContent />
    </Suspense>
  );
}
