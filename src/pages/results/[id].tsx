// 1. DATA NORMALIZATION (The Translation)
// This maps a DB key like "DG_01" to "TEC_01" if it came from the Technical Node
nodes.forEach(n => {
  const persona = n.persona_type?.toUpperCase() || "";
  const prefix = persona.includes("EXE") ? "EXE" : persona.includes("MGR") ? "MGR" : "TEC";
  
  if (n.raw_responses) {
    Object.entries(n.raw_responses).forEach(([qId, val]: any) => {
      // Standardize the key to EXE_01, MGR_01, or TEC_01
      const qNumber = qId.includes('_') ? qId.split('_')[1] : '01';
      const normalizedKey = `${prefix}_${qNumber}`;
      
      results[normalizedKey] = {
        answer: typeof val === 'object' ? val.answer : val,
        evidence: val?.evidence || "No technical evidence provided."
      };
    });
  }
});

// 2. THE SFI CALCULATIONS
let frictionScore = 0;
const fractures = [];
const tax = parseFloat(audit.rework_tax || "0");

// Helper to catch all "Yes" variants (Yes, 1, 6, True)
const isYes = (val: any) => ["Yes", "1", "6", "True", true].includes(val);
const isNo = (val: any) => ["No", "2", "False", false].includes(val);

// FRACTURE: INDEMNITY ALIGNMENT ($W = 35$)
if (isYes(results.EXE_01?.answer) && isNo(results.TEC_01?.answer)) {
  fractures.push({
    code: "BMR-T1",
    impact: "CRITICAL",
    title: "Indemnity Alignment Fracture",
    finding: `Executive assumes audit rights; Technical Node confirms: "${results.TEC_01.evidence}"`
  });
  frictionScore += 35;
}

// FRACTURE: REWORK TAX HEMORRHAGE ($W = 35$)
if (isYes(results.MGR_01?.answer) && isNo(results.TEC_01?.answer)) {
  const leakage = (tax * 0.4).toFixed(1);
  fractures.push({
    code: "BMR-M1",
    impact: "HIGH",
    title: "Rework Tax Hemorrhage",
    finding: `Systemic leakage detected. Estimated $${leakage}M annual friction.`
  });
  frictionScore += 35;
}
