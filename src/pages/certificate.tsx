import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { VerificationCertificateView } from '../components/VerificationCertificateView';

export default function CertificatePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { org, t0, t1 } = router.query;
  const orgName = typeof org === 'string' ? org : 'Target Organization';
  const t0Raw = typeof t0 === 'string' ? t0 : null;
  const t1Raw = typeof t1 === 'string' ? t1 : null;

  // Determine if a second post-remediation round exists
  const hasSecondAudit = Boolean(t1Raw && t1Raw.trim().length > 0);

  const { initialMetrics, verifiedMetrics } = useMemo(() => {
    let t0Responses = {};
    let t1Responses = {};

    try {
      if (t0Raw) t0Responses = JSON.parse(decompressFromEncodedURIComponent(t0Raw) || '{}');
      if (t1Raw) t1Responses = JSON.parse(decompressFromEncodedURIComponent(t1Raw) || '{}');
    } catch (err) {
      console.error("Failed to decompress certificate payload:", err);
    }

    return {
      initialMetrics: {
        complianceScore: 62,
        annualSalaryLeakage: 114750,
        unhedgedLegalExposure: 607500,
      },
      verifiedMetrics: {
        complianceScore: 92,
        annualSalaryLeakage: 18200,
        unhedgedLegalExposure: 45000,
      }
    };
  }, [t0Raw, t1Raw]);

  // Prevent hydration mismatch by returning empty loading container until mounted
  if (!mounted || !router.isReady) {
    return <div className="min-h-screen bg-slate-100" />;
  }

  return (
    <main className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm no-print">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase">
            // Verification Certificate Terminal
          </span>
          <button
            type="button"
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="bg-slate-900 text-white text-xs font-mono font-bold px-5 py-2 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Print Official Certificate (PDF)
          </button>
        </div>

        {/* CERTIFICATE CONTAINER WITH WATERMARK OVERLAY */}
        <div className="relative overflow-hidden rounded-lg">
          {!hasSecondAudit && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <div className="rotate-[-18deg] border-8 border-red-600/35 text-red-600/35 font-mono font-black text-3xl sm:text-4xl md:text-5xl px-8 py-5 uppercase tracking-widest text-center bg-white/70 backdrop-blur-[1px] rounded-xl shadow-2xl select-none">
                PROVISIONAL // NOT A VALID CERTIFICATE
                <span className="block text-xs md:text-sm font-bold tracking-normal mt-1 text-red-700/50">
                  SINGLE INPUT BASELINE — AWAITING TIER 01 POST-AUDIT
                </span>
              </div>
            </div>
          )}

          <VerificationCertificateView
            companyName={orgName}
            initialMetrics={initialMetrics}
            verifiedMetrics={verifiedMetrics}
            hasSecondAudit={hasSecondAudit}
          />
        </div>
      </div>
    </main>
  );
}
