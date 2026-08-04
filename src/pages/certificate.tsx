import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { VerificationCertificateView } from '../components/VerificationCertificateView';

export default function CertificatePage() {
  const router = useRouter();
  const { org, t0, t1 } = router.query;

  const orgName = typeof org === 'string' ? org : 'Target Organization';
  const t0Raw = typeof t0 === 'string' ? t0 : null;
  const t1Raw = typeof t1 === 'string' ? t1 : null;

  const { initialMetrics, verifiedMetrics } = useMemo(() => {
    let t0Responses = {};
    let t1Responses = {};

    try {
      if (t0Raw) t0Responses = JSON.parse(decompressFromEncodedURIComponent(t0Raw) || '{}');
      if (t1Raw) t1Responses = JSON.parse(decompressFromEncodedURIComponent(t1Raw) || '{}');
    } catch (err) {
      console.error("Failed to decompress certificate payload:", err);
    }

    // Replace with your actual scoring calculation logic if imported
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

  return (
    <main className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Action Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm no-print">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase">
            // Verification Certificate Terminal
          </span>
          <button
            type="button"
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="bg-slate-900 text-white text-xs font-mono font-bold px-5 py-2 rounded-md hover:bg-slate-800 transition-colors"
          >
            Print Official Certificate (PDF)
          </button>
        </div>

        {/* Certificate View */}
        <VerificationCertificateView
          companyName={orgName}
          initialMetrics={initialMetrics}
          verifiedMetrics={verifiedMetrics}
        />

      </div>
    </main>
  );
}
