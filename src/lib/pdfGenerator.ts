import { jsPDF } from 'jspdf';

// Define a local interface for the DiagnosticResult to prevent "not defined" errors 
// if the engine file isn't indexed yet.
interface DiagnosticResult {
  protocol: string;
  frictionIndex: number;
}

export default class ForensicPDFGenerator {
  static async generate(result: DiagnosticResult, email: string): Promise<string> {
    // 1. Initialize with standard A4 settings
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });
    
    const ts = new Date().toISOString();

    // 2. Background (Dark Mode Aesthetics)
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, 210, 297, 'F');

    // 3. Header - Use Standard Helvetica if Courier acts up in the build
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38);
    doc.setFontSize(22);
    doc.text("CLASSIFIED FORENSIC BRIEFING", 20, 30);

    // 4. Intelligence Metadata
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text(`ORIGIN: BMR SOLUTIONS // NODE_VERIFIED: ${email.toUpperCase()}`, 20, 40);
    doc.text(`PROTOCOL: ${result.protocol || 'UNKNOWN'}`, 20, 45);

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
    // Use the native 'blob' output method and wrap in a proper Blob constructor 
    // to satisfy the most restrictive TypeScript environments.
    const pdfOutput = doc.output('blob');
    const pdfBlob = new Blob([pdfOutput], { type: 'application/pdf' });
    
    return URL.createObjectURL(pdfBlob);
  }
}
