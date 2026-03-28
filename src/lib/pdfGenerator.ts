import { jsPDF } from 'jspdf';
import { DiagnosticResult } from './diagnosticEngine';

export default class ForensicPDFGenerator {
  static async generate(result: DiagnosticResult, email: string): Promise<string> {
    const doc = new jsPDF();
    const ts = new Date().toISOString();

    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFont("courier", "bold");
    doc.setTextColor(220, 38, 38);
    doc.setFontSize(22);
    doc.text("CLASSIFIED FORENSIC BRIEFING", 20, 30);

    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text(`ORIGIN: BMR SOLUTIONS // NODE_VERIFIED: ${email.toUpperCase()}`, 20, 40);
    doc.text(`PROTOCOL: ${result.protocol}`, 20, 45);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(`SYSTEMIC FRICTION INDEX: ${result.frictionIndex}/100`, 20, 70);

    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    doc.text(`TIMESTAMP: ${ts}`, 20, 280);
    doc.text("INTERNAL USE ONLY // SUBJECT TO AES-256 COMPLIANCE", 20, 285);

    return URL.createObjectURL(doc.output('blob'));
  }
}
