import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

interface PhaseOnePayload {
  orgName: string;
  sector: string;
  answers: { questionId: number; selectedOptionWeight: number; category: string }[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "METHOD_NOT_ALLOWED // USE_POST" });
  }

  try {
    const { orgName, sector, answers } = req.body as PhaseOnePayload;

    if (!orgName || !sector || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "INVALID_PAYLOAD // MISSING_REQUIRED_FIELDS" });
    }

    const totalPossibleWeight = answers.length * 10;
    const earnedWeight = answers.reduce((acc, curr) => acc + (curr.selectedOptionWeight || 0), 0);
    const decayPct = Math.min(Math.round((earnedWeight / totalPossibleWeight) * 100), 100);

    const generatedFractures = answers
      .filter((ans) => ans.selectedOptionWeight >= 6)
      .map((ans) => {
        let idString = "LOGIC_FRAGMENTATION";
        let descriptionText = "System architectures exhibit critical logic divergence, introducing major administrative rework lags.";
        let directiveText = "Initialize full-scale pipeline compartmentalization and audit core compliance run times.";

        if (ans.category === "governance") {
          idString = "GOVERNANCE_VOID";
          descriptionText = "Absence of structured policy frameworks allows un-vetted system assets to process sensitive operations untracked.";
          directiveText = "Deploy structural gateway constraints and instantiate programmatic enterprise ledger guards.";
        } else if (ans.category === "shadow_ai" || ans.category === "security") {
          idString = "SHADOW_INFRASTRUCTURE";
          descriptionText = "Data pipelines interface with unmapped API endpoints, leaking structural intellectual asset equity over unsecured servers.";
          directiveText = "Execute network packet discovery loops and systematically terminate un-anchored external access tokens.";
        } else if (ans.category === "workforce" || ans.category === "tribal") {
          idString = "EXPERTISE_DEBT";
          descriptionText = "Critical workflow dependencies sit locked behind individual human capital nodes, elevating single-point failure vectors.";
          directiveText = "Deconstruct operational execution files into programmatic playbooks to break human friction loops.";
        }

        return {
          id: idString,
          severity: ans.selectedOptionWeight >= 8 ? "CRITICAL" : "HIGH",
          description: descriptionText,
          directive: directiveText
        };
      });

    const curatedFractures = generatedFractures.slice(0, 4);

    const { data: newAudit, error: dbError } = await supabase
      .from("audits")
      .insert([
        {
          org_name: orgName.toUpperCase().trim(),
          sector: sector.toLowerCase().trim(),
          decay_pct: decayPct,
          fractures: curatedFractures,
          is_released: false,
          ai_spend: 1.2,
          roi_pct: null 
        }
      ])
      .select()
      .single();

    if (dbError) throw dbError;

    return res.status(200).json({
      success: true,
      message: "DIAGNOSTIC_CORE_SYNTHESIZED_SUCCESSFULLY",
      auditId: newAudit.id
    });

  } catch (err: any) {
    console.error("CRITICAL_BACKEND_SYNTHESIS_FAILURE:", err);
    return res.status(500).json({ error: "INTERNAL_ENGINE_CRASH", details: err?.message || err });
  }
}
