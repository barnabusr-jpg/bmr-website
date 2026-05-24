// Run command: node test-dispatch.js

const ENDPOINT_URL = 'http://localhost:3000/api/dispatch-directives'; 
const TEST_PARENT_AUDIT_ID = '8e75a768-027e-4aa0-ab1b-6c574ccbd38c'; // Matches verified ID from your screenshot

const mockPayload = {
  groupId: "GRP-2026-TEST",
  orgName: "BMR solutions Testing Laboratories",
  parentAuditId: TEST_PARENT_AUDIT_ID,
  emails: {
    "executive": "barnabusr@gmail.com",
    "managerial": "hello@bmradvisory.co",
    "technical": "test-engineer@bmrsolutions.co"
  }
};

async function executeSystemValidation() {
  console.log("INITIALIZING E2E SYSTEM VALIDATION PIPELINE...");
  console.log(`Targeting Endpoint: ${ENDPOINT_URL}`);
  console.log(`Targeting Audit UUID: ${TEST_PARENT_AUDIT_ID}\n`);

  try {
    const response = await fetch(ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ TEST FAILURE: ENDPOINT RETURNED EXCEPTION STATE");
      console.error(JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log("================================================================");
    console.log("✅ SYSTEM VALIDATION SUCCESSFUL: TRANSACTION COMPLETED");
    console.log("================================================================");
    console.log(`Compilation Mode:   ${data.compilationMode}`);
    console.log(`Logic Decay Coeff:  ${data.metrics.logicDecayCoefficient}`);
    console.log("----------------------------------------------------------------");
    console.log("TRANSFORMED VECTOR METRICS (READ-ONLY DECAY TRANSFORMATION):");
    console.log(`Adjusted HAI Score: ${data.metrics.adjustedHAI}%`);
    console.log(`Adjusted AVS Score: ${data.metrics.adjustedAVS}%`);
    console.log(`Adjusted IGF Score: ${data.metrics.adjustedIGF}%`);
    console.log("----------------------------------------------------------------");
    console.log("COCKPIT REFERRAL AUTOMATED PAYLOAD:");
    console.log(`Recommended Track:  ${data.referralPayload.recommendedService}`);
    console.log(`Target User Node:   ${data.referralPayload.targetNode}`);
    console.log(`Species Identified: ${data.referralPayload.speciesIdentifier}`);
    console.log(`UI Button Identity: ${data.referralPayload.confirmationLabel}`);
    console.log("================================================================");

  } catch (error) {
    console.error("❌ CRITICAL CONNECTION FAILURE: CANNOT REACH LOCAL ROUTE SERVER");
    console.error(error.message);
  }
}

executeSystemValidation();
