/**
 * Recursively canonicalizes any primitive, array, or object into a deterministic
 * JSON string by lexicographically sorting object keys at every depth.
 */
export function canonicalStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }

  if (value instanceof Date) {
    return JSON.stringify(value.toISOString());
  }

  if (Array.isArray(value)) {
    const serializedElements = value.map((element) => {
      if (
        element === undefined ||
        typeof element === 'symbol' ||
        typeof element === 'function'
      ) {
        return 'null';
      }
      return canonicalStringify(element);
    });
    return `[${serializedElements.join(',')}]`;
  }

  const record = value as Record<string, unknown>;
  const sortedKeys = Object.keys(record).sort();

  const serializedEntries: string[] = [];
  for (const key of sortedKeys) {
    const val = record[key];
    if (
      val !== undefined &&
      typeof val !== 'function' &&
      typeof val !== 'symbol'
    ) {
      serializedEntries.push(`${JSON.stringify(key)}:${canonicalStringify(val)}`);
    }
  }

  return `{${serializedEntries.join(',')}}`;
}

/**
 * Computes a deterministic SHA-256 hex digest using Web Crypto (client)
 * or native Node.js crypto (server).
 */
export async function computeStrictSha256(data: unknown): Promise<string> {
  const normalizedJson = canonicalStringify(data);

  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const encoder = new TextEncoder();
    const hashBuffer = await window.crypto.subtle.digest(
      'SHA-256',
      encoder.encode(normalizedJson)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    return `SHA256:${hex}`;
  }

  try {
    const { createHash } = await import('crypto');
    const hex = createHash('sha256').update(normalizedJson, 'utf8').digest('hex').toUpperCase();
    return `SHA256:${hex}`;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Cryptographic subsystem unavailable for compliance hashing: ${message}`);
  }
}

/**
 * Returns the raw JavaScript source code executed by the auditor verification routine.
 * @param preImageJsonCompact Compact JSON string of the pre-image
 * @param expectedDigest Full SHA256:<hex> expected hash
 * @param emitCanonicalString When true (test runs only), prints the canonicalized JSON string to stdout
 */
export function buildAuditorScriptBody(
  preImageJsonCompact: string,
  expectedDigest: string,
  emitCanonicalString = false
): string {
  return `const crypto = require('crypto');

function canonicalize(v) {
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  if (v instanceof Date) return JSON.stringify(v.toISOString());
  if (Array.isArray(v)) {
    return '[' + v.map(x => (x === undefined || typeof x === 'symbol' || typeof x === 'function') ? 'null' : canonicalize(x)).join(',') + ']';
  }
  const keys = Object.keys(v).sort();
  return '{' + keys.filter(k => v[k] !== undefined && typeof v[k] !== 'function' && typeof v[k] !== 'symbol')
    .map(k => JSON.stringify(k) + ':' + canonicalize(v[k])).join(',') + '}';
}

const preImage = JSON.parse(${JSON.stringify(preImageJsonCompact)});
const serialized = canonicalize(preImage);
const computed = 'SHA256:' + crypto.createHash('sha256').update(serialized, 'utf8').digest('hex').toUpperCase();
const expected = '${expectedDigest}';

${emitCanonicalString ? "console.log('CANONICAL_SERIALIZATION: ' + serialized);" : ''}
console.log('\\n--- BMR CONTROL PLANE VERIFICATION ---');
console.log('COMPUTED HASH: ' + computed);
console.log('EXPECTED HASH: ' + expected);
console.log('STATUS:        ' + (computed === expected ? 'PASS (VERIFIED)' : 'FAIL (TAMPERED)'));
console.log('---------------------------------------\\n');

if (computed !== expected) process.exit(1);
`;
}

/**
 * Emits the standalone shell heredoc script embedded into Chapter 7 of the PDF.
 */
export function buildAuditorVerificationScript(
  preImageJsonCompact: string,
  expectedDigest: string
): string {
  const body = buildAuditorScriptBody(preImageJsonCompact, expectedDigest, false);
  return `node <<'EOF'\n${body}EOF`;
}
