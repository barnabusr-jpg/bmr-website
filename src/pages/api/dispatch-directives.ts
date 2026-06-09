import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { auditId, emails } = req.body;
  if (!auditId || !emails || !emails.executive || !emails.managerial || !emails.technical) {
    return res.status(400).json({ error: "Missing required tracking parameters or stakeholder vectors." });
  }

  try {
    const executiveKey  = "EXEC-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const managerialKey = "MGR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const technicalKey  = "TECH-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // 🔒 HARD LOCKED AWAIT: Confirms DB update has settled cleanly first
    const { data: updatedRow, error: dbError } = await supabase
      .from("audits")
      .update({
        status: "Triangulating",
        executive_token: executiveKey,
        managerial_token: managerialKey,
        technical_token: technicalKey,
        stakeholder_emails: emails
      })
      .eq("id", auditId)
      .select()
      .single();

    if (dbError || !updatedRow) {
      throw new Error(dbError?.message || "Failed to establish secure validation token row entry.");
    }

    const sendgridTargetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-sendgrid-template`;
    
    const emailDispatchResult = await fetch(sendgridTargetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auditId: auditId,
        tokens: {
          executive: updatedRow.executive_token,
          managerial: updatedRow.managerial_token,
          technical: updatedRow.technical_token
        },
        recipients: emails
      })
    });

    if (!emailDispatchResult.ok) {
      console.warn("⚠️ SENDGRID WARNING: Database updated successfully, but email dispatch relay failed.");
    }

    return res.status(200).json({ 
      success: true, 
      message: "3-Node access keys generated, saved to ledger, and routed cleanly." 
    });

  } catch (error: any) {
    console.error("❌ Token Pipeline Isolation Failure:", error);
    return res.status(500).json({ error: error.message || "Internal token routing failure." });
  }
}
