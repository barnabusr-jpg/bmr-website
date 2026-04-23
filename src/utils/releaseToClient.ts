import sgMail from '@sendgrid/mail';
import { generateBMRVerdict } from './generateVerdict';

export async function authorizeVerdictRelease(projectId: string, clientEmail: string) {
  // 1. Fetch finalized data from DB
  const auditResults = await fetchAuditData(projectId);
  
  // 2. Generate PDF
  const doc = generateBMRVerdict(auditResults, auditResults.companyName);
  const pdfBase64 = doc.output('datauristring').split(',')[1];

  const msg = {
    to: clientEmail,
    from: 'hello@bmradvisory.co',
    subject: `BMR Forensic Verdict: ${auditResults.companyName}`,
    html: `
      <div style="font-family: sans-serif; color: #1e293b;">
        <p>Your Forensic Stress Test results for <strong>${auditResults.companyName}</strong> have been authorized for release.</p>
        <p>Attached is your finalized Verdict and Hardening Directives.</p>
        <br />
        <p>Regards,<br />BMR Advisory</p>
      </div>
    `,
    attachments: [
      {
        content: pdfBase64,
        filename: `BMR_Verdict_${auditResults.companyName}.pdf`,
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ],
  };

  await sgMail.send(msg);
}
