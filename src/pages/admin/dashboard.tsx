const generateForensicPDF = async (audit: any) => {
    const laborTax = "$83,200";
    const exposure = "$248,400";
    const capacityLoss = "8%";

    const printArea = document.createElement('div');
    printArea.style.position = 'absolute';
    printArea.style.left = '-9999px';
    printArea.style.top = '0';
    
    // 🛡️ CALIBRATED HEIGHT: 1600px ensures the bottom boxes aren't cutoff
    printArea.innerHTML = `
      <div style="width: 850px; min-height: 1600px; background: #020617; padding: 0; margin: 0; font-family: 'Arial', sans-serif; color: white; display: flex; flex-direction: column; box-sizing: border-box;">
        
        <div style="background: #01040a; width: 100%; padding: 40px 60px; display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #dc2626; box-sizing: border-box;">
            <div style="flex: 1;">
                <h1 style="font-size: 28px; font-weight: 900; margin: 0; letter-spacing: 2px; font-style: italic; text-transform: uppercase;">BMR // FORENSIC_VERDICT</h1>
                <p style="color: #666; font-family: monospace; font-size: 9px; margin-top: 10px; font-weight: 900; letter-spacing: 1px;">SIGNAL_ID: ${audit.id.toUpperCase()}</p>
            </div>
            <div style="text-align: right; border-left: 1px solid #1e293b; padding-left: 20px;">
                <p style="font-size: 8px; font-weight: 900; color: #dc2626; margin: 0; letter-spacing: 2px;">AUTHORIZED_BY</p>
                <p style="font-size: 10px; font-weight: 400; color: #fff; margin-top: 4px; font-family: monospace;">${email.toUpperCase()}</p>
                <p style="font-size: 7px; color: #444; margin-top: 3px; font-family: monospace;">VERIFIED: ${new Date().toLocaleDateString()}</p>
            </div>
        </div>

        <div style="padding: 60px; flex-grow: 1; box-sizing: border-box;">
            <div style="margin-bottom: 50px;">
                <h2 style="font-size: 72px; font-weight: 900; font-style: italic; margin: 0; text-transform: uppercase; letter-spacing: -4px; line-height: 1;">
                  AI <span style="color: #dc2626;">EFFICIENCY</span> VERDICT
                </h2>
                <p style="font-size: 10px; font-weight: 900; color: #475569; letter-spacing: 4px; margin-top: 15px; font-family: monospace;">CASE_FILE: BMR-2026-${audit.id.slice(0,4).toUpperCase()} // STATUS: STABLE</p>
            </div>

            <div style="border-left: 4px solid #dc2626; padding: 30px 40px; background: rgba(220, 38, 38, 0.05); margin-bottom: 50px;">
                <p style="font-size: 9px; font-weight: 900; color: #666; letter-spacing: 3px; margin-bottom: 15px; font-family: monospace;">DIAGNOSTIC_OBSERVATION // ALPHA_7_INTAKE</p>
                <p style="font-size: 16px; font-style: italic; line-height: 1.6; color: #94a3b8; margin: 0;">
                  These metrics serve as a forensic baseline for organizational health. Your responses identify specific logic fractures from your immediate perspective. The system projects the fiscal impact of these fractures, converting observations into high-probability drift currently occurring at your node.
                </p>
            </div>

            <div style="background: white; color: black; padding: 50px; border-left: 30px solid #dc2626; margin-bottom: 40px; width: 100%; box-sizing: border-box;">
              <h1 style="font-size: 52px; font-weight: 900; font-style: italic; margin: 0; text-transform: uppercase; letter-spacing: -3px; line-height: 0.85;">Executive Briefing</h1>
              <p style="font-size: 12px; font-weight: 900; color: #666; letter-spacing: 5px; margin-top: 15px; font-family: monospace;">ENTITY // ${audit.org_name.toUpperCase()}</p>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px; margin-top: 50px; border-top: 1px solid #eee; padding-top: 30px;">
                <div><p style="font-size: 10px; font-weight: 900; color: #dc2626; text-transform: uppercase; letter-spacing: 1px;">Capacity Loss</p><p style="font-size: 20px; font-weight: 900; font-style: italic; margin-top: 8px;">Wasting <span style="color: #dc2626;">${capacityLoss}</span></p></div>
                <div><p style="font-size: 10px; font-weight: 900; color: #dc2626; text-transform: uppercase; letter-spacing: 1px;">Financial Leak</p><p style="font-size: 20px; font-weight: 900; font-style: italic; margin-top: 8px;">Tax: <span style="color: #dc2626;">${laborTax}</span></p></div>
                <div><p style="font-size: 10px; font-weight: 900; color: #dc2626; text-transform: uppercase; letter-spacing: 1px;">Exposure</p><p style="font-size: 20px; font-weight: 900; font-style: italic; margin-top: 8px;">Risk: <span style="color: #dc2626;">${exposure}</span></p></div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; box-sizing: border-box;">
              <div style="background: #050b1a; border: 1px solid #1e293b; padding: 60px 20px; text-align: center;">
                <h2 style="font-size: 90px; font-weight: 900; font-style: italic; margin: 0; letter-spacing: -6px; line-height: 1;">${laborTax}</h2>
                <p style="font-size: 11px; font-weight: 900; color: #475569; letter-spacing: 8px; margin-top: 20px; text-transform: uppercase;">Annual Labor Waste</p>
              </div>
              <div style="background: #050b1a; border: 8px solid #dc2626; padding: 60px 20px; text-align: center;">
                <h2 style="font-size: 90px; font-weight: 900; font-style: italic; margin: 0; color: #dc2626; letter-spacing: -6px; line-height: 1;">${exposure}</h2>
                <p style="font-size: 11px; font-weight: 900; color: #dc2626; letter-spacing: 8px; margin-top: 20px; text-transform: uppercase;">Total Capital Exposure</p>
              </div>
            </div>
        </div>

        <div style="background: #01040a; padding: 30px; text-align: center; border-top: 1px solid #1e293b; margin-top: auto;">
            <p style="font-size: 8px; color: #334155; font-family: monospace; letter-spacing: 4px; font-weight: 900;">INTERNAL USE ONLY // CLASSIFIED FORENSIC DATA</p>
        </div>
      </div>
    `;
    document.body.appendChild(printArea);

    try {
      const canvas = await html2canvas(printArea, { 
        backgroundColor: "#020617", 
        scale: 3, 
        useCORS: true,
        width: 850,
        height: 1600 // High height to capture full content
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate aspect ratio to fit the entire long canvas onto one A4 page
      const canvasWidth = 850;
      const canvasHeight = 1600;
      const ratio = pdfWidth / canvasWidth;
      const finalHeight = canvasHeight * ratio;

      // If the content is longer than one page, jsPDF addImage will scale it down to fit
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, Math.min(pdfHeight, finalHeight));

      pdf.save(`BMR_VERDICT_${audit.org_name.replace(/\s+/g, '_')}.pdf`);
      document.body.removeChild(printArea);
    } catch (err) {
      console.error(err);
      if (document.body.contains(printArea)) document.body.removeChild(printArea);
    }
  };
