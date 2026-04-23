import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

/**
 * 🛡️ BMR SOLUTIONS: OPERATOR VALIDATION GATEKEEPER
 * Purpose: Verifies Alpha-7 clearance and identifies the user's specific audit lens 
 * from the secure email link (?email=...).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Extract the identifier from the URL
  const { email } = req.query;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: "! INVALID_IDENTIFIER" });
  }

  try {
    /**
     * 🔎 QUERY SUPABASE:
     * Pulls the operator record and joins the entity name to confirm linkage.
     */
    const { data: record, error } = await supabase
      .from('operators')
      .select(`
        id,
        email,
        is_authorized,
        lens,
        entity_id,
        entities ( name )
      `)
      .eq('email', email.toLowerCase().trim())
      .single();

    // 2. Handle missing records
    if (error || !record) {
      console.error("! ACCESS_DENIED: No record found for identifier:", email);
      return res.status(404).json({ message: "! NO_DIAGNOSTIC_MATCH_FOUND" });
    }

    /**
     * 🛡️ AUTHORIZATION GATE:
     * Even if a record exists, access is denied until the Admin releases the MRI 
     * in the Dashboard.
     */
    if (!record.is_authorized) {
      return res.status(403).json({ message: "! ACCESS_NOT_YET_RELEASED" });
    }

    /**
     * ✅ SUCCESS: 
     * Returns the full forensic record including the Lens (TECHNICAL/MANAGERIAL/EXECUTIVE).
     * This allows the frontend to auto-load the correct question matrix.
     */
    return res.status(200).json(record);

  } catch (error) {
    console.error("! SYSTEM_FRACTURE:", error);
    return res.status(500).json({ error: "! INTERNAL_SYSTEM_FAILURE" });
  }
}
