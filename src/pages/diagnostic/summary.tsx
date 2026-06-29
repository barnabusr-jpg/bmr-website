"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { Activity } from 'lucide-react';
import { SectorType } from '@/lib/supabaseAdapter';
import ForensicCommandCockpit from '@/components/ForensicCommandCockpit';

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

  // Execute out-of-band computations dynamically based on the link's state token payload
  const parsedDossier = React.useMemo(() => {
    if (!hydratedData) return null;
    
    // 📊 100% DYNAMIC STATE PARSER: Pulls raw user data right out of the compressed token answers object
    const dbDecay = parseFloat(hydratedData.ans.decay_pct) || 24; 
    const spend = parseFloat(hydratedData.ans.ai_spend) || 1.2;
    const fteCount = parseInt(hydratedData.ans.roi_pct) || 6;
    const complianceIndex = parseFloat(hydratedData.ans.sfi_score) || 78;
    
    const laborMultiplier = 0.5;
    const totalLaborTaxPool = (dbDecay / 100) * laborMultiplier * (fteCount * 160000 * 1.3);
    
    const sector = (hydratedData.sec || 'SERVICES_RETAIL').toLowerCase().trim();
    let sectorInflationMultiplier = 1.2;

    if (sector.includes('finance') || sector.includes('healthcare')) {
      sectorInflationMultiplier = 1.5;
    } else if (sector.includes('industrial') || sector.includes('logistics')) {
      sectorInflationMultiplier = 1.5; 
    } else if (sector.includes('saas') || sector.includes('enterprise')) {
      sectorInflationMultiplier = 1.2;
    }

    const exposure = (0.22 * (dbDecay / 25) * (spend * 1000000)) * sectorInflationMultiplier;

    return {
      companyName: hydratedData.org,
      sector: hydratedData.sec || 'ENTERPRISE_SAAS',
      responses: hydratedData.ans,
      metrics: {
        multiplier: sectorInflationMultiplier,
        complianceScore: complianceIndex, 
        annualSalaryLeakage: totalLaborTaxPool,
        unhedgedLegalExposure: exposure,
        isTierThreeExposure: dbDecay >= 45,
        regulatoryAlertActive: sectorInflationMultiplier >= 1.3
      }
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
}
