import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type PersonaKey = 'EXECUTIVE' | 'TECH_MGMT' | 'OPS_MGMT' | 'SYSTEM_USER';

const PERSONA_LABELS: Record<PersonaKey, string> = {
  EXECUTIVE: 'Executive Alignment',
  TECH_MGMT: 'Technical Pipeline',
  OPS_MGMT: 'Managerial Oversight',
  SYSTEM_USER: 'System User & Operator',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, activePillar, endpoints, isNudge, originUrl } = body;

    if (!companyName || !endpoints) {
      return NextResponse.json(
        { error: 'Missing required payload parameters: companyName or endpoints' },
        { status: 400 }
      );
    }

    const baseUrl = originUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://bmradvisory.co';
    const entries = Object.entries(endpoints) as [PersonaKey, string][];
    const dispatchResults = [];

    // SAFE DISPATCH FIX: Sequential processing with 250ms delay stagger to prevent ESP rate-limits
    for (const [persona, email] of entries) {
      const sanitizedEmail = email?.trim();
      if (!sanitizedEmail) continue;

      const trackLabel = PERSONA_LABELS[persona] || persona.replace('_', ' ');
      
      // DISPATCH FIX: Unique subject line per persona track avoids ESP spam/deduplication filters
      const subject = isNudge
        ? `[Reminder] ${companyName} - ${trackLabel} Track Action Required`
        : `[Assessment Invite] ${companyName} - ${trackLabel} Track Access`;

      // Construct track-bound URL
      const accessUrl = new URL('/forensic', baseUrl);
      accessUrl.searchParams.set('org', companyName);
      accessUrl.searchParams.set('flow', 'quad_node');
      accessUrl.searchParams.set('role', persona);
      accessUrl.searchParams.set('track', persona);
      accessUrl.searchParams.set('pillar', activePillar || 'IGF');
      accessUrl.searchParams.set('auth', 'admin_verified_secure');

      try {
        const data = await resend.emails.send({
          from: 'BMR Diagnostic Engine <notifications@bmradvisory.co>',
          to: [sanitizedEmail],
          subject: subject,
          html: `
            <div style="font-family: monospace, sans-serif; background-color: #f8fafc; padding: 32px; color: #0f172a;">
              <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 32px;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: bold; margin-bottom: 8px;">
                  // ${isNudge ? 'QUAD NODE REMINDER' : 'QUAD NODE INVITATION'}
                </p>
                <h2 style="font-size: 20px; font-weight: 800; margin-top: 0; color: #0f172a;">
                  ${companyName} // ${trackLabel}
                </h2>
                <p style="font-size: 13px; line-height: 1.6; color: #334155;">
                  You have been designated to complete the <strong>${trackLabel} Track</strong> assessment for ${companyName}.
                </p>
                <div style="margin: 28px 0;">
                  <a href="${accessUrl.toString()}" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 4px; display: inline-block;">
                    Launch ${trackLabel} Track &rarr;
                  </a>
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin-top: 24px;">
                  Direct link: <a href="${accessUrl.toString()}" style="color: #0f172a;">${accessUrl.toString()}</a>
                </p>
              </div>
            </div>
          `,
        });

        dispatchResults.push({ persona, email: sanitizedEmail, status: 'sent', id: data.data?.id });
      } catch (sendErr: any) {
        console.error(`[API Dispatch Exception] Failed to send email to ${sanitizedEmail} (${persona}):`, sendErr);
        dispatchResults.push({ persona, email: sanitizedEmail, status: 'error', error: sendErr.message });
      }

      // STAGGER BUFFER: Pause 250ms between sends to protect against rate-limit drops
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    return NextResponse.json({ success: true, dispatches: dispatchResults });
  } catch (error: any) {
    console.error('[API Send-Triangulation Fatal Error]:', error);
    return NextResponse.json({ error: error.message || 'Server error during dispatch' }, { status: 500 });
  }
}
