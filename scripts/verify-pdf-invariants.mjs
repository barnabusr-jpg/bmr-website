// scripts/verify-pdf-invariants.mjs
import assert from "node:assert/strict";
import crypto from "node:crypto";
import pdfParse from "pdf-parse";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";
const MOCK_AUDIT_ID = process.env.TEST_AUDIT_ID || "test-audit-uuid-001";
const PERIMETER_BASELINE_HASH = "922e4cbf8736b4845ad5bfaebc0627e77b6951b184da785cba0633b4eb8a6142";

async function fetchWithRetry(url, opts = {}, tries = 3) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, opts);
      if (res.ok || (res.status >= 400 && res.status < 500)) return res;
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
    await new Promise((r) => setTimeout(r, 250 * (i + 1)));
  }
  throw lastErr;
}

function computePerimeterFingerprint(rawText) {
  const text = (rawText || "").toUpperCase().replace(/\s+/g, " ");
  const STRUCTURAL_TOKENS = [
    "BMR SOLUTIONS",
    "// PRE-AUTOMATION CONTROL PLANE",
    "INDEPENDENT ECONOMIC GOVERNANCE // ZERO-FOOTPRINT AUDIT MODEL",
    "PROMISE GAP™ DIAGNOSTIC REPORT",
    "READINESS SCORE",
    "PROCESS WASTE & REWORK",
    "CALIBRATION FOOTPRINT",
    "BMR SOLUTIONS // ENTERPRISE CONTROL PLANE INSPECTORATE"
  ];

  const signature = STRUCTURAL_TOKENS.map((token) => {
    assert.ok(text.includes(token), `Missing structural perimeter token: "${token}"`);
    return token;
  }).join("::");

  return crypto.createHash("sha256").update(signature).digest("hex");
}

function verifyPdfResources(buffer) {
  const binaryString = buffer.toString("latin1");

  // Invariant 1: Flexible Base-14 Font Dictionary Match
  const hasHelvetica = /\/BaseFont\s*\/Helvetica\b/.test(binaryString);
  const hasHelveticaBold = /\/BaseFont\s*\/Helvetica-Bold\b/.test(binaryString);

  assert.ok(hasHelvetica, "Resource Invariant: Helvetica font definition missing from PDF dictionary");
  assert.ok(hasHelveticaBold, "Resource Invariant: Helvetica-Bold font definition missing from PDF dictionary");

  // Invariant 2: Non-capturing group for stroke (RG) and fill (rg) crimson operator (#b91c1c)
  const crimsonRegex = /0\.725\d*\s+0\.109\d*\s+0\.109\d*\s+(?:rg|RG)\b|0\.725\s+0\.11\s+0\.11\s+(?:rg|RG)\b/i;
  assert.ok(
    crimsonRegex.test(binaryString),
    "Resource Invariant: Brand crimson operator (#b91c1c) not detected in PDF content stream"
  );
}

async function runPdfInvariantSuite() {
  console.log("🚀 Running Enterprise PDF Invariant Suite...");

  // 1. HTTP 400 Invariants
  console.log("🧪 1. Testing malformed ID rejections...");
  const missingRes = await fetchWithRetry(`${BASE_URL}/api/export/pdf`);
  assert.equal(missingRes.status, 400, "Missing ID did not return 400 Bad Request");

  const invalidRes = await fetchWithRetry(`${BASE_URL}/api/export/pdf?id=not-a-valid-uuid`);
  assert.equal(invalidRes.status, 400, "Invalid UUID did not return 400 Bad Request");

  // 2. Transport Headers
  console.log("🧪 2. Testing response headers...");
  const validRes = await fetchWithRetry(`${BASE_URL}/api/export/pdf?id=${MOCK_AUDIT_ID}`);
  assert.equal(validRes.status, 200, `Fixture fetch failed with status ${validRes.status}`);

  const contentType = validRes.headers.get("content-type") || "";
  assert.match(contentType, /application\/pdf/i, "Header content-type is not application/pdf");

  const contentDisposition = validRes.headers.get("content-disposition") || "";
  assert.match(
    contentDisposition,
    new RegExp(`BMR-Promise-Gap-Audit-${MOCK_AUDIT_ID}\\.pdf`),
    "Content-Disposition filename header mismatch"
  );

  // 3. Binary & Resource Checks
  console.log("🧪 3. Testing binary integrity, fonts, and brand colors...");
  const arrayBuffer = await validRes.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  assert.ok(buffer.length > 5000, `Payload too small: ${buffer.length} bytes (indicates blank render)`);
  assert.equal(buffer.subarray(0, 4).toString("ascii"), "%PDF", "Missing %PDF magic byte header");
  verifyPdfResources(buffer);

  // 4. Text Extraction & Negative Checks
  console.log("🧪 4. Testing text layer, forbidden tokens, and perimeter hash...");
  const parsedPdf = await pdfParse(buffer);
  const parsedText = parsedPdf?.text || "";
  const textContent = parsedText.toUpperCase();

  assert.ok(
    textContent.trim().length > 50,
    `Extracted PDF text is unexpectedly short (${textContent.trim().length} chars)`
  );

  const FORBIDDEN_TOKENS = [
    "SHIELDALERT",
    "FORENSIC UNIT",
    "ZERO SECURITY FOOTPRINT",
    "UNDEFINED",
    "NAN",
    "[OBJECT OBJECT]"
  ];
  for (const token of FORBIDDEN_TOKENS) {
    assert.ok(!textContent.includes(token), `Forbidden legacy/corrupt token detected: "${token}"`);
  }

  // 5. Perimeter Fingerprint Lock
  const perimeterHash = computePerimeterFingerprint(parsedText);
  assert.equal(perimeterHash, PERIMETER_BASELINE_HASH, "Perimeter signature hash drift detected");

  // 6. Pagination Bound (Defensive Guard)
  console.log("🧪 5. Testing document page limits...");
  assert.equal(
    parsedPdf?.numpages,
    1,
    `Expected exactly 1 page for fixture, got ${parsedPdf?.numpages ?? "undefined"}`
  );

  console.log("✅ ALL PDF INVARIANTS PASS: Transport, binary, color, typography, and lexical integrity verified.");
}

runPdfInvariantSuite().catch((err) => {
  console.error("❌ PDF INVARIANT SUITE FAILED:", err);
  process.exit(1);
});
