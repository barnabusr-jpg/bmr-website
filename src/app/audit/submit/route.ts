import { STRESS_TEST_MANIFEST } from "@/data/stressTestManifest";
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  const { projectId, lens, responses, companyName } = await req.json();

  // 1. Save lens-specific data to MongoDB
  // db.collection('forensic_audits').updateOne({ projectId }, { $set: { [`lenses.${lens}`]: responses, [`status.${lens}`]: 'COMPLETE' } });

  // 2. Check if all three lenses are finished
  // const audit = await db.collection('forensic_audits').findOne({ projectId });
  const allFinished = audit.status.EXECUTIVE && audit.status.MANAGERIAL && audit.status.TECHNICAL;

  if (allFinished) {
    await sgMail.send({
      to: 'hello@bmradvisory.co',
      from: 'system@bmradvisory.co',
      subject: `AUDIT_READY_FOR_REVIEW: ${companyName}`,
      html: `
        <div style="font-family: sans-serif; border-left: 4px solid #2563eb; padding-left: 20px;">
          <h2 style="color: #0f172a;">Forensic Scan Complete</h2>
          <p>All three representatives for <strong>${companyName}</strong> have completed their stressors.</p>
          <p>The Logic Reconciliation Map is pending your clinical review.</p>
          <a href="https://lab.bmradvisory.co/owner/review/${projectId}" 
             style="background: #2563eb; color: white; padding: 12px 20px; text-decoration: none; display: inline-block; border-radius: 4px;">
             OPEN_REVIEW_DASHBOARD
          </a>
        </div>
      `
    });
  }

  return Response.json({ success: true });
}
