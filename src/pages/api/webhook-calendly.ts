import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  try {
    // Standard payload mapping extracting email targets out of the inbound Calendly event body
    const eventPayload = req.body;
    const clientEmail = eventPayload?.payload?.invitee?.email?.toLowerCase().trim();

    if (!clientEmail) {
      return res.status(400).json({ error: 'MALFORMED_WEBHOOK_DATA // TARGET_EMAIL_MISSING' });
    }

    // Requests an inventory array of all outbound logs queued inside Resend
    const scheduledLog = await resend.emails.list();
    
    if (scheduledLog.data && scheduledLog.data.length > 0) {
      // Sift specifically for logs tied to this email that haven't entered transit yet
      const activeTargets = scheduledLog.data.filter(
        (mail) => mail.to.includes(clientEmail) && mail.status === 'scheduled'
      );

      // Execute a hard cancellation call to clear them off Resend's delivery pipeline
      for (const pendingEmail of activeTargets) {
        await resend.emails.cancel(pendingEmail.id);
      }
    }

    return res.status(200).json({ success: true, message: 'TRAILING_QUEUE_TERMINATED_SUCCESSFULLY' });

  } catch (err: any) {
    console.error('CALENDLY BREAK WORKFLOW EXCEPTION:', err);
    return res.status(500).json({ error: 'WEBHOOK_FAILURE', message: err.message });
  }
}
