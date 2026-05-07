"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Fingerprint, Activity, Clock, Sliders, ArrowRight, Info } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query;
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveSpend, setLiveSpend] = useState<number>(1.2);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchAuditData = async () => {
      const [auditRes, nodesRes] = await Promise.all([
        supabase.from('audits').select('*').eq('id', id).single(),
        supabase.from('operators').select('*').eq('audit_id', id)
      ]);

      if (auditRes.data) {
        const audit = auditRes.data;
        const resultsMap: any = {};
        const sourceNodes = nodesRes.data?.length ? nodesRes.data : [audit];

        sourceNodes.forEach((n: any) => {
          const persona = (n.persona_type || "EXE").toUpperCase();
          let prefix = persona.includes("MGR") ? "MGR" : persona.includes("TEC") ? "TEC" : "EXE";
          const raw = n.raw_responses || audit.raw_responses;
          
          if (raw) {
            Object.entries(raw).forEach(([qId, val]: any) => {
              const qNum = qId.replace(/[^0-9]/g, '');
              resultsMap[`${prefix}_${qNum}`] = {
                answer: parseInt(typeof val === 'object' ? val.answer : val) || 0
              };
            });
          }
        });

        setLiveSpend(audit.ai_spend || 1.2);
        setReportData({ audit, resultsMap });
      }
      setLoading(false);
    };
    fetchAuditData();
  }, [id]);

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    const results = reportData.resultsMap;
    const rawAnswers = Object.values(results);
    const totalWeight = rawAnswers.reduce((acc: number, curr: any) => acc + (curr.answer || 0), 0);
    
    // Dynamic SFI Calculation (No hardcoded 74%)
    const maxPossible = rawAnswers.length > 0 ? rawAnswers.length * 10 : 120;
    const calculatedSFI = Math.min(Math.round((totalWeight / maxPossible) * 100), 100);

    const systemicLeak = (liveSpend * 1000000) * (calculatedSFI / 100) * 0.15;

    return {
      totalTax: systemicLeak,
      inactionPenalty: systemicLeak * 1.2,
      currentSessionBleed: ((systemicLeak / 365) / 86400) * secondsElapsed,
      isSystemic: calculatedSFI > 65
    };
  }, [reportData, liveSpend, secondsElapsed]);

  // ... [Render Logic remains identical to your previous high-fidelity version] ...
}
