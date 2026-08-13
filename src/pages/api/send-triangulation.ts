import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// SAFE ENVIRONMENT GUARD
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// STRICT QUAD NODE DISPLAY LABELS
const PERSONA_DISPLAY_NAMES: Record<string, string> = {
  EXECUTIVE: 'Executive Track',
  TECH_MGMT: 'Technical Management Track',
  OPS_MGMT: 'Operations & Process Track',
  SYSTEM_USER: 'System User & Operator Track',
};

// ENFORCE CANONICAL QUAD KEYS (PREVENTS 360 FALLBACK)
function getCanonicalPersonaKey(k: string): string {
  const up = String(k || '').toUpperCase().trim();
  if (up === 'TECHNICAL' || up === 'TECH') return 'TECH_MGMT';
  if (up === 'MANAGERIAL' || up === 'OPS') return 'OPS_MGMT';
  if (up === 'EXEC' || up === 'IGF') return 'EXECUTIVE';
  if (up === 'SYS' || up === 'USER') return 'SYSTEM_USER';
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
    const { companyName, endpoints, isNudge, originUrl } = req.body || {};

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

      const canonicalPersona = getCanonicalPersonaKey(rawPersona);
      const displayLabel = PERSONA_DISPLAY_NAMES[canonicalPersona] || canonicalPersona;

      const subject = isNudge
        ? `[Nudge] Action Required: ${safeCompanyName || 'Target System'} ${displayLabel} Quad Node Assessment`
        : `ACTION REQUIRED: ${displayLabel} Assessment Authorized // ${safeCompanyName}`;

      // EXACT QUAD NODE PARAMETER BINDING LINK
      const targetUrl = `${baseOrigin}/forensic?org=${encodeURIComponent(safeCompanyName)}&role=${canonicalPersona}&flow=quad_node`;

      // BRANDED BMR QUAD NODE HTML EMAIL TEMPLATE
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 40px 20px; }
            .container { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            .header { border-bottom: 4px solid #0f172a; padding: 32px 32px 24px 32px; }
            .title { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; margin: 0; color: #0f172a; }
            .subtitle { font-family: monospace; font-size: 11px; color: #64748b; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
            .content { padding: 32px; }
            .track-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 16px 20px; border-radius: 4px; margin-bottom: 24px; }
            .track-label { font-family: monospace; font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold; }
            .track-name { font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 4px; }
            .body-text { font-size: 13px; color: #334155; line-height: 1.6; margin-bottom: 24px; }
            
            /* EXECUTION INSTRUCTIONS SECTION */
            .instructions-card { background: #fafafa; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin-bottom: 28px; }
            .instructions-header { font-family: monospace; font-size: 10px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
            .instructions-list { margin: 0; padding: 0; list-style: none; font-size: 12px; color: #475569; }
            .instructions-list li { margin-bottom: 8px; line-height: 1.5; padding-left: 14px; position: relative; }
            .instructions-list li::before { content: "•"; position: absolute; left: 0; color: #0f172a; font-weight: bold; }
            
            .cta-container { text-align: center; padding-top: 8px; padding-bottom: 8px; }
            .cta-button { background-color: #0f172a; color: #ffffff !important; font-family: monospace; font-size: 11px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 4px; display: inline-block; text-transform: uppercase; letter-spacing: 0.05em; width: 80%; text-align: center; }

            .footer { border-top: 1px solid #f1f5f9; padding: 20px 32px; background: #fafafa; font-family: monospace; font-size: 10px; color: #94a3b8; letter-spacing: 0.05em; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="title">Diagnostic Track Authorized</h1>
              <div class="subtitle">Organization: ${safeCompanyName} // Quad Node Stream</div>
            </div>
            
            <div class="content">
              <div class="track-box">
                <div class="track-label">// Assigned Stakeholder Track</div>
                <div class="track-name">${displayLabel}</div>
              </div>
              
              <p class="body-text">
                Leadership at <strong>${safeCompanyName}</strong> has authorized a Quad Node operational diagnostic stream. Your direct technical and operational input is required to evaluate workflow friction and schema stability.
              </p>

              <!-- INSTRUCTIONS BLOCK -->
              <div class="instructions-card">
                <div class="instructions-header">// Execution Instructions</div>
                <ul class="instructions-list">
                  <li><strong>Estimated Duration:</strong> ~5 to 7 minutes.</li>
                  <li><strong>Format:</strong> Diagnostic wizard evaluating pipeline hygiene and operational bottlenecks.</li>
                  <li><strong>Access Control:</strong> Secure single-participant link generated strictly for your role.</li>
                </ul>
              </div>
              
              <!-- PRIMARY CTA TERMINAL -->
              <div class="cta-container">
                <a href="${targetUrl}" class="cta-button">BEGIN QUAD NODE ASSESSMENT TRACK →</a>
              </div>
            </div>

            <div class="footer">
              Confidential // BMR Solutions Independent Governance
            </div>
          </div>
        </body>
        </html>
      `;

      await resend.emails.send({
        from: 'BMR Solutions <notifications@bmrsolutions.io>',
        to: [email],
        subject,
        html: htmlContent
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
