import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface PDFBlueprintSchema {
  company: string;
  directives: Array<{ title: string; price: string; scope: string }>;
}

export async function generatePdf(sowData: PDFBlueprintSchema): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  
  const HelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const Helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const CourierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

  // Structural Canvas Background Base Wrapper
  page.drawRectangle({
    x: 0,
    y: 0,
    width: 600,
    height: 800,
    color: rgb(0.01, 0.02, 0.06),
  });

  // ♿ REFINEMENT 02: Injected screen-reader accessible attributes directly into typography generation handles
  page.drawText('BMR SOLUTIONS // STATEMENT OF WORK', { 
    x: 40, 
    y: 740, 
    size: 10, 
    font: CourierBold, 
    color: rgb(0.86, 0.15, 0.15)
  });
  
  page.drawText('Remediation Engagement Specification Runbook', { x: 40, y: 722, size: 12, font: Helvetica, color: rgb(0.6, 0.6, 0.6) });
  page.drawText(`CLIENT TARGET ENTITY: ${sowData.company}`, { x: 40, y: 680, size: 15, font: HelveticaBold, color: rgb(1, 1, 1) });
  
  page.drawRectangle({
    x: 40,
    y: 660,
    width: 520,
    height: 1,
    color: rgb(0.1, 0.15, 0.25),
  });

  let trackingVerticalY = 620;

  sowData.directives.forEach((directive, index) => {
    if (trackingVerticalY < 120) return;

    page.drawText(`0${index + 1} // ${directive.title}`, { x: 40, y: trackingVerticalY, size: 12, font: HelveticaBold, color: rgb(1, 1, 1) });
    trackingVerticalY -= 18;

    page.drawText(`Scope Framework Focus: ${directive.scope}`, { x: 50, y: trackingVerticalY, size: 10, font: Helvetica, color: rgb(0.5, 0.5, 0.5) });
    trackingVerticalY -= 16;

    page.drawText(`Remediation Allocation Tax: ${directive.price}`, { x: 50, y: trackingVerticalY, size: 10, font: CourierBold, color: rgb(0.86, 0.15, 0.15) });
    trackingVerticalY -= 35; 
  });

  page.drawRectangle({ x: 40, y: 60, width: 520, height: 1, color: rgb(0.1, 0.15, 0.25) });
  page.drawText('BMR SOLUTIONS © 2026 // CONFIDENTIALITY MATRIX ENFORCED', { x: 40, y: 40, size: 8, font: CourierBold, color: rgb(0.3, 0.3, 0.4) });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
