import sgMail from '@sendgrid/mail';
import { generateBMRVerdict } from './generateVerdict';

export async function authorizeVerdictRelease(projectId: string, clientEmail: string) {
  // 1. Fetch data from DB
  const auditResults = await fetchAuditData(projectId);
  
  // 2. 🛡️ HARDENED TRIANGULATION GATE
  const isTriangulated = auditResults.progress.exec && 
                         auditResults.progress.mgr && 
                         auditResults.progress.tech;

  if (!isTriangulated) {
    throw new Error("TRIANGULATION_INCOMPLETE // AUTHORIZATION_FAILED");
  }

  // 3. Generate Verdict PDF
  const doc = generateBMRVerdict(auditResults, auditResults.companyName);
  const pdfBase64 = doc.output('datauristring').split(',')[1];

  // 4. Dispatch with Field Guide V1 Attached
  const msg = {
    to: clientEmail,
    from: 'hello@bmradvisory.co',
    subject: `BMR AUTHORIZATION: Forensic Results Released - ${auditResults.companyName}`,
    html: `
      <div style="font-family: sans-serif; background-color: #020617; color: #ffffff; padding: 40px;">
        <h2 style="font-style: italic; text-transform: uppercase;">Authorization Granted.</h2>
        <p>Triangulation for <strong>${auditResults.companyName}</strong> is verified.</p>
        <p>Attached: Finalized Verdict + BMR Field Guide V1.</p>
      </div>
    `,
    attachments: [
      {
        content: pdfBase64,
        filename: `BMR_Verdict_${auditResults.companyName}.pdf`,
        type: 'application/pdf',
        disposition: 'attachment',
      },
      {
        content: await getFieldGuideBase64(), // Reads public/BMR_Field_Guide_V1.pdf
        filename: `BMR_Field_Guide_V1.pdf`,
        type: 'application/pdf',
        disposition: 'attachment',
      }
    ],
  };

  await sgMail.send(msg);
}
