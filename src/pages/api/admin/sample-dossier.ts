import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { generateRedactedSamplePdf } from "@/lib/sampleDossierPdf";

export const config = {
  runtime: "nodejs",
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function isAdminRequest(req: NextApiRequest): Promise<boolean> {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";

  if (!token || !supabaseUrl || !supabaseAnonKey) {
    return false;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return false;
  }

  const allowlistRaw = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "";
  if (allowlistRaw.trim()) {
    const allowedEmails = allowlistRaw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const userEmail = (data.user.email || "").toLowerCase();
    if (!allowedEmails.includes(userEmail)) {
      return false;
    }
  }

  return true;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authorized = await isAdminRequest(req);
  if (!authorized) {
    return res.status(403).json({ error: "Forbidden: Admin clearance required" });
  }

  try {
    const blob = await generateRedactedSamplePdf();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="BMR_Solutions_Sample_Process_Waste_Tax_Dossier.pdf"'
    );
    return res.status(200).send(buffer);
  } catch (err) {
    console.error("Admin sample dossier generation failed:", err);
    return res.status(500).json({ error: "Failed to generate sample dossier PDF" });
  }
}
