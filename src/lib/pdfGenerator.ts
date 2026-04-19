import { jsPDF } from 'jspdf';
// @ts-ignore
import html2canvas from 'html2canvas';

export default class ForensicPDFGenerator {
  /**
   * Generates a multi-page PDF by capturing the 'forensic-report-container' DOM element.
   */
  static async generate(companyName: string = "PROSPECT"): Promise<void> {
    // Ensure we are in a browser environment
    if (typeof window === 'undefined') return;

    const element = document.getElementById('forensic-report-container');

    if (!element) {
      console.error("BMR_ERROR: Target container 'forensic-report-container' not found in DOM.");
      return;
    }

    try {
      // Temporarily force height to auto to ensure full capture of Page 2
      const originalHeight = element.style.height;
      element.style.height = 'auto';

      // Capture the UI
      // @ts-ignore
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#020617',
        logging: false,
        windowWidth: 1200
      });

      // Restore original height
      element.style.height = originalHeight;

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // PAGE 1
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // PAGE 2: Shift and add if height exists
      if (heightLeft > 0) {
        position = heightLeft - imgHeight; 
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      }

      const fileName = `${companyName.toUpperCase().replace(/\s+/g, '_')}_BMR_FORENSIC_AUDIT.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error("BMR_ERROR: PDF Generation failed.", error);
    }
  }
}
