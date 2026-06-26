import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { Activity } from 'lucide-react';
import { SectorType } from '../../lib/supabaseAdapter';
import { calculateForensicMetrics } from '../../lib/forensic/calculus';
import ForensicCommandCockpit from '../../components/ForensicCommandCockpit';

interface DecodedPayload {
  org: string;
  sec: SectorType;
  ans: Record<string, any>;
}

export default function DiagnosticSummaryPage() {
  const router = useRouter();
  const [hydratedData, setHydratedData] = useState<DecodedPayload | null>(null);
  const [errorFracture, setErrorFracture] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;

    const token = router.query.matrix as string;
    if (!token) {
      setErrorFracture(true);
      return;
    }

    try {
      const rawString = decompressFromEncodedURIComponent(token);
      if (!rawString) throw new Error("NULL_DECOMPRESSION_OUTPUT");
      
      const payload = JSON.parse(rawString) as DecodedPayload;
      if (!payload.org || !payload.ans) throw new Error("MALFORMED_MATRIX_PAYLOAD");
      
      setHydratedData(payload);
    } catch (err) {
      console.error("Stateless matrix decompression failure:", err);
      setErrorFracture(true);
    }
  }, [router.isReady, router.query.matrix]);

  // Execute out-of-band computations safely once token unpacks from search params
  const parsedDossier = React.useMemo(() => {
    if (!hydratedData) return null;
    
    // Pass precise complete signature parameter map to lock calculation fallbacks
    const calculatedMetrics = calculateForensicMetrics(
      hydratedData.org, 
      hydratedData.ans, 
      hydratedData.sec || 'ENTERPRISE_SAAS'
    );

    return {
      metrics: calculatedMetrics,
      companyName: hydratedData.org,
      sector: hydratedData.sec || 'ENTERPRISE_SAAS',
      responses: hydratedData.ans
    };
  }, [hydratedData]);

  if (errorFracture) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-red-500 uppercase italic font-black font-mono text-xs tracking-widest p-6">
        <span>// INVALID TELEMETRY VECTOR MATCH // MATRIX RECONSTRUCTION ABORTED</span>
      </div>
    );
  }

  if (!parsedDossier) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-green-500 italic font-black">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-slate-400">COMPILING COCKPIT MATRIX FROM INBOUND LINK...</p>
      </div>
    );
  }

  return (
    <ForensicCommandCockpit 
      companyName={parsedDossier.companyName}
      sector={parsedDossier.sector}
      metrics={parsedDossier.metrics}
      responses={parsedDossier.responses}
    />
  );
}Commit
