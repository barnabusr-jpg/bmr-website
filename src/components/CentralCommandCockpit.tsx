"use client";

import React, { useState } from "react";
import { Zap, Activity, CheckCircle2, AlertOctagon } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface CockpitProps {
  initialAuditId: string;
  initialGroupId: string;
  initialOrgName: string;
  onSuccess: () => void;
}

export default function CentralCommandCockpit({
  initialAuditId,
  initialOrgName,
  onSuccess
}: CockpitProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const executeManualSynthesis = async () => {
    setIsProcessing(true);
    setErrorText(null);
    setStatusText("// INITIALIZING SYNTHESIS ROOT ENGINE...");

    try {
      // 1. Fire the partial synthesis calculations
      const res = await fetch("/api/synthesize-fracture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId: initialAuditId })
      });

      const serverResponse = await res.json();

      if (!res.ok) {
        throw new Error(serverResponse.error || "UNEXPECTED CONTRADICTION OUTAGE");
      }

      setStatusText("// SYNTHESIS COMPLETE. RE-INDEXING FORENSIC LEDGER...");

      // 2. Mark the base audit record status as COMPLETE inside your ledger
      const { error: patchError } = await supabase
        .from("audits")
        .update({ status: "COMPLETE", updated_at: new Date().toISOString() })
        .eq('id', initialAuditId);

      if (patchError) throw patchError;

      setStatusText("// LEDGER SYNCHRONIZED SUCCESSFULLY.");
      
      // Delay slightly so the user sees the success state before layout update
      setTimeout(() => {
        onSuccess();
      }, 1000);

    } catch (err: any) {
      console.error("COCKPIT_ENGINE_CRASH:", err);
      setErrorText(err.message || "GATEWAY TIMEOUT DETECTED");
      setStatusText(null);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="border border-yellow-600/30 bg-yellow-950/5 p-6 font-mono text-zinc-100 my-4 w-full select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-3 mb-4 gap-2">
        <div>
          <span className="text-[10px] text-yellow-500/60 block">// ADMINISTRATIVE CONSOLE OVERRIDE</span>
          <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-500">
            MATRIX SYNTHESIS OVERRIDE ENGINE
          </h4>
        </div>
        <span className="text-[10px] text-zinc-500 font-mono">
          TARGET ORG // {initialOrgName}
        </span>
      </div>

      <p className="text-xs text-zinc-400 font-sans normal-case mb-4 leading-relaxed">
        If a client's multi-node stakeholder surveys are incomplete or exhibiting structural contradictions, 
        you can use this command module to force structural contradiction synthesis and compile the current baseline ledger results.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mt-2 pt-2 border-t border-zinc-900/50">
        <div className="flex-1">
          {statusText && (
            <div className="text-[11px] text-yellow-500 flex items-center gap-2 animate-pulse">
              <Activity size={12} className="animate-spin" />
              <span>{statusText}</span>
            </div>
          )}
          {errorText && (
            <div className="text-[11px] text-red-500 flex items-center gap-2">
              <AlertOctagon size={12} />
              <span>ERROR: {errorText}</span>
            </div>
          )}
          {!statusText && !errorText && (
            <div className="text-[11px] text-zinc-600">
              // ENGINE STATUS: IDLE // READY FOR COMMAND OVERRIDE
            </div>
          )}
        </div>

        <button
          type="button"
          disabled={isProcessing}
          onClick={executeManualSynthesis}
          className="bg-yellow-600 hover:bg-white text-black font-bold text-[10px] px-5 py-3 tracking-widest transition-all cursor-pointer flex items-center gap-2 border border-yellow-600 shrink-0 uppercase"
        >
          <Zap size={12} fill="currentColor" />
          <span>{isProcessing ? "PROCESSING OVERRIDE..." : "FORCE ROOT SYNTHESIS RUN"}</span>
        </button>
      </div>
    </div>
  );
}
