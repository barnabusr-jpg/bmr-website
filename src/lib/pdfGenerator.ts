import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default class ForensicPDFGenerator {
  /**
   * Generates a multi-page PDF by capturing the 'forensic-report-container' DOM element.
   * This method ensures the Topology Map and styling are preserved perfectly.
   */
  static async generate(companyName: string = "PROSPECT"): Promise<void> {
    // 1. Target the master container in ForensicResultCard.tsx
    const element = document.getElementById('forensic-report-container');

    if (!element) {
      console.error("BMR_ERROR: Target container 'forensic-report-container' not found in DOM.");
      return;
    }

    try {
      // 2. Capture the UI as a high-resolution canvas
      // We use scale 2 for boardroom-quality sharpness
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#020617', // Match BMR dark slate theme
        logging: false,
        windowWidth: 1200 // Ensures the layout does not "squish" during capture
      });

      // 3. Convert the capture to Image Data
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // 4. Initialize the PDF Document (A4 Portrait)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // 5. Calculate Image scaling to maintain aspect ratio
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // 6. PAGE 1: Executive Summary
      // Adds the top portion of the "photograph" to the first page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // 7. PAGE 2: Forensic Topology Exhibit
      // If the content is longer than one page, create Page 2 and shift the image up
      if (heightLeft > 0) {
        position = heightLeft - imgHeight; 
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      }

      // 8. Final Export
      const fileName = `${companyName.toUpperCase().replace(/\s+/g, '_')}_BMR_FORENSIC_AUDIT.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error("BMR_ERROR: PDF Generation failed.", error);
    }
  }
}
