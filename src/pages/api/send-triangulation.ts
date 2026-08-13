import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// SAFE ENVIRONMENT GUARD
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const PERSONA_LABELS: Record<string, string> = {
  EXECUTIVE: 'Executive Track',
  TECH_MGMT: 'Technical Management Track',
  OPS_MGMT: 'Operations Management Track',
  SYSTEM_USER: 'System User Track',
  TECHNICAL: 'Technical Management Track', // Legacy fallback
  MANAGERIAL: 'Operations Management Track', // Legacy fallback
};

function normalizePersonaKey(k: string): string {
  const up = String(k || '').toUpperCase().trim();
  if (up === 'TECHNICAL') return 'TECH_MGMT';
  if (up === 'MANAGERIAL') return 'OPS_MGMT';
  return up;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // NON-BLOCKING ENV MISSING GUARD
  if (!resend) {
    console.warn('[send-triangulation] RESEND_API_KEY is missing. Skipping email dispatch.');
    return res.status(200).json({ 
      success: true, 
      warning: 'Email provider unconfigured. Database updated successfully without email dispatch.' 
    });
  }

  try {
    const { companyName, activePillar, endpoints, isNudge, originUrl } = req.body || {};

    // STRICT ENDPOINTS GUARD
    if (!endpoints || typeof endpoints !== 'object' || Array.isArray(endpoints)) {
      return res.status(400).json({ error: 'Invalid endpoints payload.' });
    }

    const safeCompanyName = String(companyName || '').trim();
    const baseOrigin = originUrl || 'https://bmr-website.vercel.app';
    const dispatched: string[] = [];

    for (const [rawPersona, emailVal] of Object.entries(endpoints)) {
      const email = String(emailVal || '').trim();
      
      // Skip empty or invalid emails safely
      if (!email || !email.includes('@')) {
        console.warn(`[send-triangulation] Invalid email provided for ${rawPersona}:`, emailVal);
        continue;
      }

      const canonicalPersona = normalizePersonaKey(rawPersona);
      const label = PERSONA_LABELS[canonicalPersona] || canonicalPersona;

      const subject = isNudge
        ? `[Reminder] Action Required: ${safeCompanyName || 'Target System'} ${label} Assessment`
        : `Action Required: ${safeCompanyName || 'Target System'} ${label} Assessment Invited`;

      const targetUrl = `${baseOrigin}/forensic?org=${encodeURIComponent(safeCompanyName)}&role=${canonicalPersona}&flow=quad_node`;

      await resend.emails.send({
        from: 'BMR Solutions <notifications@bmrsolutions.io>',
        to: [email],
        subject,
        html: `
          <div style="font-family: monospace, sans-serif; padding: 24px; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="font-weight: 800; font-size: 18px; margin-bottom: 8px;">BMR OPERATIONAL GOVERNANCE</h2>
            <p style="font-size: 14px; color: #475569; margin-bottom: 20px;">
              You have been dispatched an assessment track for <strong>${safeCompanyName || 'your organization'}</strong> under the <strong>${label}</strong> channel.
            </p>
            <a href="${targetUrl}" style="background-color: #0f172a; color: #ffffff; padding: 12px 20px; font-weight: bold; font-size: 12px; text-decoration: none; border-radius: 4px; display: inline-block;">
              OPEN ASSESSMENT TRACK →
            </a>
          </div>
        `
      });

      dispatched.push(canonicalPersona);
    }

    return res.status(200).json({ success: true, dispatchedCount: dispatched.length });

  } catch (err: any) {
    console.error('[send-triangulation] Dispatch exception caught:', err);
    return res.status(200).json({ 
      success: false, 
      warning: 'Email dispatch failed on provider layer', 
      details: err?.message || String(err) 
    });
  }
}
