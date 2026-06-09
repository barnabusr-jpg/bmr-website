import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

interface SynthesisPayload {
  auditId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "METHOD_NOT_ALLOWED // USE_POST" });
  }

  try {
    const { auditId } = req.body as SynthesisPayload;

    if (!auditId) {
      return res.status(400).json({ error: "INVALID_PAYLOAD // MISSING_AUDIT_ID" });
    }

    console.log(`SYNTHESIS_ENGINE: Consolidating telemetry for [${auditId}]...`);

    const { data: operators, error: opError } = await supabase
      .from("operators")
      .select("raw_responses, persona_type")
      .eq("audit_id", auditId);

    if (opError || !operators || operators.length === 0) {
      return res.status(404).json({ error: "DATA_NOT_FOUND // NO_OPERATOR_VECTORS_RESOLVED" });
    }

    let unifiedEarnedWeight = 0;
    let unifiedTotalPossibleWeight = 0;
    const compiledFractures: any[] = [];

    operators.forEach((op: any) => {
      const responses = op.raw_responses;
      if (!responses) return;

      Object.keys(responses).forEach((qId) => {
        const item = responses[qId];
        const numericalWeight = item.answer === "Yes" ? 8 : 2;
        
        unifiedEarnedWeight += numericalWeight;
        unifiedTotalPossibleWeight += 10;

        if (numericalWeight >= 8) {
          let idString = "LOGIC_FRAGMENTATION";
          let descriptionText = "System architectures exhibit critical logic divergence, introducing major administrative rework lags.";
          let directiveText = "Initialize full-scale pipeline compartmentalization and audit core compliance run times.";

          const category = qId.toLowerCase();
          if (category.includes("gov") || category.includes("policy")) {
            idString = "GOVERNANCE_VOID";
            descriptionText = "Absence of structured policy frameworks allows un-vetted system assets to process sensitive operations untracked.";
            directiveText = "Deploy structural gateway constraints and instantiate programmatic enterprise ledger guards.";
          } else if (category.includes("shadow") || category.includes("sec") || category.includes("api")) {
            idString = "SHADOW_INFRASTRUCTURE";
            descriptionText = "Data pipelines interface with unmapped API endpoints, leaking structural intellectual asset equity over unsecured servers.";
            directiveText = "Execute network packet discovery loops and systematically terminate un-anchored external access tokens.";
          } else if (category.includes("work") || category.includes("human") || category.includes("node")) {
            idString = "EXPERTISE_DEBT";
            descriptionText = "Critical workflow dependencies sit locked behind individual human capital nodes, elevating single-point failure vectors.";
            directiveText = "Deconstruct operational execution files into programmatic playbooks to break human friction loops.";
          }

          compiledFractures.push({
            id: idString,
            severity: "HIGH",
            description: descriptionText,
            directive: directiveText
          });
        }
      });
    });

    const finalTotalPossible = unifiedTotalPossibleWeight || 100;
    const decayPct = Math.min(Math.round((unifiedEarnedWeight / finalTotalPossible) * 100), 100);
    const sfiScore = Math.max(15, 100 - Math.round(decayPct * 0.85));
    const curatedFractures = compiledFractures.slice(0, 4);

    const { error: dbError } = await supabase
      .from("audits")
      .update({
        status: "BRIDGE_ACTIVE",
        decay_pct: decayPct,
        sfi_score: sfiScore,
        fractures: curatedFractures
      })
      .eq("id", auditId);

    if (dbError) throw dbError;

    return res.status(200).json({ success: true, auditId });

  } catch (err: any) {
    console.error("CRITICAL_BACKEND_SYNTHESIS_FAILURE:", err);
    return res.status(500).json({ error: "INTERNAL_ENGINE_CRASH", details: err?.message || err });
  }
}
