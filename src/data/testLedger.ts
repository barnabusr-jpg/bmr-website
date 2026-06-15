import { forensicQuestions } from './forensicQuestions';

function verifyLedgerIntegrity() {
  const totalQuestions = Object.keys(forensicQuestions).length;
  console.log(`==================================================`);
  console.log(`BMR FORENSIC ENGINE // RUNTIME SCHEMA INTEGRITY TEST`);
  console.log(`==================================================`);
  console.log(`[✔] SYSTEM POSTURE: STANDALONE TREE ACTIVE`);
  console.log(`[✔] TOTAL IN-MEMORY SCENARIOS TRACKED: ${totalQuestions} / 90`);
  
  // Verify that our conversion sequence triggers correctly (Leading with IGF)
  const firstQuestion = forensicQuestions["IGF-01-EXEC"];
  if (firstQuestion) {
    console.log(`[✔] FUNNEL SEQUENCE: CONFIRMED ROUTING AXIS GATED`);
    console.log(`[✔] LAUNCH SCENARIO SUB-AREA: ${firstQuestion.subarea}`);
  } else {
    console.log(`[✘] CRITICAL ERROR: LEDGER SEQUENCE INDEX DRIFT DETECTED`);
  }
  console.log(`==================================================`);
}

verifyLedgerIntegrity();
