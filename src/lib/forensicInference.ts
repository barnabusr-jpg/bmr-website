// src/lib/forensicInference.ts

import { EvidenceBasis, FailureDriver, VisibilityState } from '../types/forensicRuntime';

export interface InferredMetadata {
  evidence_basis: EvidenceBasis;
  failure_driver: FailureDriver;
  visibility_state: VisibilityState;
}

const hasAny = (text: string, terms: string[]): boolean =>
  terms.some(term => text.toLowerCase().includes(term.toLowerCase()));

/**
 * 🛰️ DETERMINISTIC METADATA INFERENCE ROUTINE
 * Extracts qualitative indices directly from active text scenarios and tokens
 */
export function inferChoiceMetadata(args: {
  scenario: string;
  choiceText: string;
  regulatoryTag?: string;
  pillar: string;
}): InferredMetadata {
  const corpus = `${args.scenario}\n${args.choiceText}\n${args.regulatoryTag ?? ''}\n${args.pillar}`.toLowerCase();

  // 1. Evidence Basis Determination
  const evidence_basis: EvidenceBasis =
    hasAny(corpus, ['cryptographic', 'worm', 'signed', 'immutable', 'ledger', 'writ', 'auditable', 'mfa', 'hash'])
      ? 'AUDITED_ARTIFACT'
      : hasAny(corpus, ['dashboard', 'telemetry', 'monitor', 'log', 'alert', 'index', 'cache', 'tracking'])
        ? 'DASHBOARD_TELEMETRY'
        : hasAny(corpus, ['manual', 'spreadsheet', 'chat', 'tribal', 'approximate', 'spot-check', 'ticket', 'sprints'])
          ? 'TRIBAL_KNOWLEDGE'
          : 'COMPLETE_OPACITY';

  // 2. Visibility State Determination
  const visibility_state: VisibilityState =
    hasAny(corpus, ['black box', 'zero', 'unrecorded', 'untracked', 'no capacity', 'hidden', 'unmonitored', 'zero logging', 'complete disconnect', 'blind'])
      ? 'BLIND'
      : hasAny(corpus, ['fatigue', 'overwhelm', 'noise saturation', 'mute', 'false positives', 'fire-fighting', 'stall clients', 'burnout'])
        ? 'FATIGUED'
        : 'AWARE';

  // 3. Failure Driver Determination
  const failure_driver: FailureDriver =
    hasAny(corpus, ['governance', 'policy', 'oversight', 'fiduciary', 'compliance', 'boardroom', 'audit', 'retention gap', 'sign-off'])
      ? 'GOVERNANCE_GAP'
      : hasAny(corpus, ['schema', 'pipeline', 'database', 'idempotent', 'network', 'vpc', 'cache', 'ledger', 'serialization', 'firewall', 'dependency'])
        ? 'ENGINEERING_ARCH'
        : hasAny(corpus, ['latency', 'triage', 'manual', 'multi-stage', 'multiple days', 'hours of delay', 'rework', 'drift window'])
          ? 'PROCESS_STRAIN'
          : 'TOOLING_VOID';

  return { evidence_basis, failure_driver, visibility_state };
}
