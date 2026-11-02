import { execFileSync, execSync } from 'child_process';
import {
  canonicalStringify,
  computeStrictSha256,
  buildAuditorScriptBody,
  buildAuditorVerificationScript,
} from '../canonicalHash';

interface NormalizedChildResult {
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  output: string;
}

function runNodeScriptDefensively(scriptSource: string): NormalizedChildResult {
  try {
    const rawStdout = execFileSync(process.execPath, ['-'], {
      input: scriptSource,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    return {
      exitCode: 0,
      signal: null,
      output: typeof rawStdout === 'string' ? rawStdout : (rawStdout as Buffer).toString('utf8'),
    };
  } catch (err: any) {
    const stdout = err?.stdout
      ? typeof err.stdout === 'string'
        ? err.stdout
        : (err.stdout as Buffer).toString('utf8')
      : '';
    const stderr = err?.stderr
      ? typeof err.stderr === 'string'
        ? err.stderr
        : (err.stderr as Buffer).toString('utf8')
      : '';

    let exitCode: number | null = null;
    if (typeof err?.status === 'number') {
      exitCode = err.status;
    } else if (typeof err?.code === 'number') {
      exitCode = err.code;
    } else if (typeof err?.code === 'string' && !Number.isNaN(Number(err.code))) {
      exitCode = Number(err.code);
    }

    return {
      exitCode,
      signal: err?.signal ?? null,
      output: `${stdout}\n${stderr}`,
    };
  }
}

describe('Canonical Hash Engine & Auditor Script Invariant Parity', () => {
  const testPayload = {
    companyName: 'RICE_VENTURES_INC',
    sector: 'FINANCIAL SERVICES',
    telemetryComplete: true,
    readinessScore: 56,
    processWasteTaxAmount: 467500,
    promiseGapExposureAmount: 864875,
    rawResponseKeys: ['QUAD_EXE_COMPLETE', 'QUAD_MGR_COMPLETE', 'QUAD_TEC_COMPLETE'],
    responseVerificationChecksum: 'SCHEMA-V2::NODES-3::TYPESIG-48',
    nestedMetadata: {
      assessmentTimestamp: new Date('2026-11-02T06:00:00.000Z'),
      runtimeGatingList: [true, false, null, undefined],
      operationalWeights: {
        node1: 0.85,
        node2: 0.7,
      },
    },
  };

  it('asserts canonicalize() inside the auditor script yields byte-for-byte identical output to canonicalStringify()', async () => {
    const productionCanonical = canonicalStringify(testPayload);
    const expectedHash = await computeStrictSha256(testPayload);

    const scriptBody = buildAuditorScriptBody(
      JSON.stringify(testPayload),
      expectedHash,
      true
    );

    const result = runNodeScriptDefensively(scriptBody);

    expect(result.exitCode).not.toBeNull();
    expect(result.exitCode).toBe(0);
    expect(result.signal).toBeNull();

    const match = result.output.match(/CANONICAL_SERIALIZATION:\s*(.*)\r?\n/);
    expect(match).not.toBeNull();
    const scriptCanonical = match![1].trim();
    expect(scriptCanonical).toBe(productionCanonical);

    expect(result.output).toContain(`COMPUTED HASH: ${expectedHash}`);
    expect(result.output).toContain('STATUS:        PASS (VERIFIED)');
  });

  it('fails with exit code 1 and surfaces verification failure on tampered data', async () => {
    const validHash = await computeStrictSha256(testPayload);
    const tamperedPayload = { ...testPayload, readinessScore: 99 };

    const tamperedScriptBody = buildAuditorScriptBody(
      JSON.stringify(tamperedPayload),
      validHash,
      false
    );

    const result = runNodeScriptDefensively(tamperedScriptBody);

    expect(result.exitCode).not.toBeNull();
    expect(result.exitCode).toBe(1);
    expect(result.signal).toBeNull();

    expect(result.output).toContain('STATUS:        FAIL (TAMPERED)');
    expect(result.output).toContain(`EXPECTED HASH: ${validHash}`);
  });

  it('maintains deep recursive byte-parity across deeply nested objects and heterogeneous arrays', async () => {
    const deeplyNestedPayload = {
      root: {
        layer1: {
          layer2: {
            layer3: {
              tags: ['alpha', 'beta', null, undefined],
              matrix: [
                [1, 2],
                [{ z: 10, a: 20 }, null],
              ],
              nestedDates: [new Date('2026-11-02T00:00:00.000Z')],
              activeState: true,
            },
          },
        },
      },
    };

    const productionCanonical = canonicalStringify(deeplyNestedPayload);
    const expectedHash = await computeStrictSha256(deeplyNestedPayload);

    const scriptBody = buildAuditorScriptBody(
      JSON.stringify(deeplyNestedPayload),
      expectedHash,
      true
    );

    const result = runNodeScriptDefensively(scriptBody);

    expect(result.exitCode).not.toBeNull();
    expect(result.exitCode).toBe(0);
    expect(result.signal).toBeNull();

    const match = result.output.match(/CANONICAL_SERIALIZATION:\s*(.*)\r?\n/);
    expect(match).not.toBeNull();
    expect(match![1].trim()).toBe(productionCanonical);
    expect(result.output).toContain('STATUS:        PASS (VERIFIED)');
    expect(result.output).toContain(`COMPUTED HASH: ${expectedHash}`);
  });

  it('handles empty structures, edge types, and key order invariance identically', async () => {
    const permutedPayloadA = {
      z: 1,
      a: 'first',
      middle: [3, 2, 1],
      sparse: [undefined, null, 'val'],
    };

    const permutedPayloadB = {
      a: 'first',
      middle: [3, 2, 1],
      sparse: [undefined, null, 'val'],
      z: 1,
    };

    const expectedHashA = await computeStrictSha256(permutedPayloadA);
    const expectedHashB = await computeStrictSha256(permutedPayloadB);

    expect(expectedHashA).toBe(expectedHashB);

    const scriptBody = buildAuditorScriptBody(
      JSON.stringify(permutedPayloadB),
      expectedHashA,
      true
    );

    const result = runNodeScriptDefensively(scriptBody);

    expect(result.exitCode).not.toBeNull();
    expect(result.exitCode).toBe(0);
    expect(result.signal).toBeNull();

    const match = result.output.match(/CANONICAL_SERIALIZATION:\s*(.*)\r?\n/);
    expect(match).not.toBeNull();
    expect(match![1].trim()).toBe(canonicalStringify(permutedPayloadA));
    expect(result.output).toContain('STATUS:        PASS (VERIFIED)');
  });

  it('verifies that the shell heredoc wrapper executes successfully under bash environments', async () => {
    if (process.platform === 'win32') {
      return;
    }

    const expectedHash = await computeStrictSha256(testPayload);
    const heredocScript = buildAuditorVerificationScript(
      JSON.stringify(testPayload),
      expectedHash
    );

    const stdout = execSync('/bin/bash', {
      input: heredocScript,
      encoding: 'utf8',
    });

    expect(stdout).toContain('STATUS:        PASS (VERIFIED)');
    expect(stdout).toContain(`COMPUTED HASH: ${expectedHash}`);
  });
});
