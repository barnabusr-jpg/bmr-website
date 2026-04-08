import { jsPDF } from "jspdf";

export const generateBMRVerdict = (analysis: any, companyName: string) => {
  const doc = new jsPDF();
  
  // Clinical Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235); // BMR Blue
  doc.text("BMR_FORENSIC_STRESS_TEST // VERDICT", 20, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`TARGET: ${companyName.toUpperCase()}`, 20, 40);
  doc.text(`SYSTEMIC_FRICTION_INDEX: ${analysis.frictionIndex.toFixed(1)}%`, 20, 45);

  // Section: Logic Reconciliation
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("1. STRUCTURAL CONTRADICTIONS DETECTED", 20, 65);

  analysis.contradictions.forEach((c: any, i: number) => {
    doc.setFontSize(9);
    doc.setTextColor(180, 0, 0); // Warning Red
    doc.text(`[!] ${c.verdict}`, 25, 75 + (i * 15), { maxWidth: 160 });
    doc.setTextColor(100, 100, 100);
    doc.text(`ESTIMATED 24-MONTH DELAY COST: $${c.impact.toLocaleString()}`, 25, 80 + (i * 15));
  });

  // Footer: Chain of Custody
  doc.setFontSize(8);
  doc.text("THIS DATA REPRESENTS A CLINICAL SNAPSHOT OF ORGANIZATIONAL FRICTION.", 20, 280);
  
  doc.save(`${companyName}_Forensic_Verdict.pdf`);
};
