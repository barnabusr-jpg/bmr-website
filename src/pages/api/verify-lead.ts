import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "METHOD NOT ALLOWED // USE POST" });
  }

  const { email } = req.body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "INVALID PARAMETERS // EMAIL REQUIRED" });
  }

  try {
    // Queries every diagnostic entry under this email account, sorting newest first
    const { data: audits, error } = await supabase
      .from("audits")
      .select("id, org_name, created_at, decay_pct")
      .eq("lead_email", email.trim().toLowerCase())
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!audits || audits.length === 0) {
      return res.status(404).json({ error: "NO RETRIEVAL TARGET // RECORD NOT FOUND" });
    }

    // If there is only 1 entry, signal an immediate single-target bypass route
    if (audits.length === 1) {
      return res.status(200).json({
        hasMultiple: false,
        targetId: audits[0].id,
        orgName: audits[0].org_name
      });
    }

    // If there are multiple entries, return the full list for user selection
    return res.status(200).json({
      hasMultiple: true,
      records: audits.map(audit => ({
        id: audit.id,
        orgName: audit.org_name || "EVALUATION CLIENT SYSTEM",
        decay: audit.decay_pct || 24,
        dateString: new Date(audit.created_at).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      }))
    });

  } catch (err: any) {
    console.error("LEAD VERIFICATION EXCEPTION:", err);
    return res.status(500).json({ error: "SERVER VERIFICATION EXCEPTION", details: err?.message });
  }
}
