import { jsPDF } from 'jspdf';

// Class name changed to DossierEngine to break cache
export default class DossierEngine {
  static async generate(result: any, lens: string): Promise<void> {
    const doc = new jsPDF('p', 'mm', 'a4');

    // --- PAGE 1: THE SOLUTIONS BRIEF ---
    doc.setFillColor(2, 6, 23); // BMR Slate
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); // BMR Red
    doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`SYSTEMIC FRICTION INDEX: ${result.frictionIndex}/100`, 20, 70);
    doc.text(`REWORK TAX: ${result.reworkTax || '$0.7M/YR'}`, 20, 85);

    // --- PAGE 2: THE TOPOLOGY MAP ---
    doc.addPage();
    doc.setFillColor(2, 6, 23);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("EXHIBIT B // TOPOLOGY MAP", 20, 30);
    
    doc.setDrawColor(220, 38, 38);
    doc.line(105, 60, 50, 150); 
    doc.line(105, 60, 160, 150);
    doc.line(50, 150, 160, 150);

    // Forced unique filename
    doc.save(`BMR_SOLUTIONS_v7_${Date.now()}.pdf`);
  }
}
