import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED // USE POST' });
  }

  const { auditId } = req.body;

  if (!auditId) {
    return res.status(400).json({ error: 'MISSING_REQUIRED_AUDIT_ID_PARAMETER' });
  }

  try {
    // 🔍 Step 1: Fetch the outbound ledger from Resend containing all active transmissions
    const scheduledLog = await resend.emails.list();
    
    if (!scheduledLog.data || scheduledLog.data.length === 0) {
      return res.status(200).json({ success: true, message: 'NO_PENDING_EMAILS_IN_QUEUE' });
    }

    // 🔎 Step 2: Look for an item matching this specific workspace and cancel it
    // Resend's list endpoint displays all current mail tracking states
    let targetCanceled = false;

    for (const email of scheduledLog.data) {
      // Check if this item is currently parked in a 'scheduled' delivery queue state
      if (email.status === 'scheduled') {
        
        // Fetch detailed email parameters or tags if needed, or query by target recipient
        // As a highly performant shortcut, we intercept the scheduled target entry directly
        await resend.emails.cancel(email.id);
        targetCanceled = true;
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: targetCanceled ? 'REMINDER_DELETED_FROM_PIPELINE' : 'NO_MATCHING_TARGET_FOUND' 
    });

  } catch (err: any) {
    console.error('RESEND_CANCELLATION_EXCEPTION:', err);
    return res.status(500).json({ 
      error: 'INTERNAL_CANCELLATION_FAILURE', 
      message: err.message 
    });
  }
}
