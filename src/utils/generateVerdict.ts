import { jsPDF } from "jspdf";

export const generateBMRVerdict = (results: any, companyName: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();

  // 1. Clinical Header
  doc.setFillColor(248, 250, 252); // Slate 50 background for header
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59); // Slate 800
  doc.text("BMR_FORENSIC_VERDICT", 20, 25);
  
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139); // Slate 500
  doc.text(`TARGET_ENTITY: ${companyName.toUpperCase()}`, 20, 34);
  doc.text(`SCAN_DATE: ${date}`, 140, 34);

  // 2. The Friction Index (The Diagnostic Verdict)
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text("SYSTEMIC_FRICTION_SUMMARY", 20, 55);
  
  doc.setFontSize(10);
  doc.text(`STRUCTURAL_FRICTION_INDEX: ${results.frictionIndex.toFixed(1)}%`, 20, 65);
  doc.text(`PROJECTED_12MO_LOGIC_DECAY_COST: $${(results.totalProjectedLoss).toLocaleString()}`, 20, 72);

  // 3. Hardening Directives (The Contradictions)
  doc.setFontSize(14);
  doc.text("HARDENING_DIRECTIVES", 20, 90);
  
  let yPos = 100;
  results.contradictions.forEach((c: any) => {
    // Check for page overflow
    if (yPos > 260) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(10);
    doc.setTextColor(220, 38, 38); // Red for the verdict
    doc.text(`[!] ${c.verdict}`, 20, yPos, { maxWidth: 170 });
    
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`ZONE: ${c.zone} | IMPACT: $${c.impact.toLocaleString()} | SEVERITY: ${c.severity}`, 20, yPos + 5);
    
    yPos += 18;
  });

  // 4. Clinical Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("THIS REPORT IS A CLINICAL AUDIT OF ORGANIZATIONAL FRICTION.", 20, pageHeight - 20);
  doc.text("NON-ADHERENCE TO HARDENING DIRECTIVES INCREASES LIABILITY EXPONENTIALLY.", 20, pageHeight - 15);

  doc.save(`${companyName}_BMR_Forensic_Verdict.pdf`);
};
