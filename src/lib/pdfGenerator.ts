import { jsPDF } from 'jspdf';
import { DiagnosticResult } from './diagnosticEngine';

export default class ForensicPDFGenerator {
  static async generate(result: DiagnosticResult, email: string): Promise<string> {
    // 1. Explicitly initialize with orientation and unit
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });
    
    const ts = new Date().toISOString();

    // 2. Background (Dark Mode)
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, 210, 297, 'F');

    // 3. Header
    doc.setFont("courier", "bold");
    doc.setTextColor(220, 38, 38);
    doc.setFontSize(22);
    doc.text("CLASSIFIED FORENSIC BRIEFING", 20, 30);

    // 4. Intelligence Metadata
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text(`ORIGIN: BMR SOLUTIONS // NODE_VERIFIED: ${email.toUpperCase()}`, 20, 40);
    doc.text(`PROTOCOL: ${result.protocol}`, 20, 45);

    // 5. Scoring Index
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(`SYSTEMIC FRICTION INDEX: ${result.frictionIndex}/100`, 20, 70);

    // 6. Forensic Footer
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    doc.text(`TIMESTAMP: ${ts}`, 20, 280);
    doc.text("INTERNAL USE ONLY // SUBJECT TO AES-256 COMPLIANCE", 20, 285);

    // 7. Hardened Blob Output
    // This casting specifically satisfies the TypeScript compiler's ambiguity
    const pdfBlob = doc.output('blob') as unknown as Blob;
    return URL.createObjectURL(pdfBlob);
  }
}
