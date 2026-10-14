/ src/components/MethodologySteps.tsx
import React from 'react';
import { sanitizeForJsonLd } from '../utils/JsonLdGenerator';

export interface MethodologyStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  canonicalArtifact: string;
  scope: string[];
  prevention: string;
  howToUse: string;
}

export interface MethodologyStepsProps {
  primaryCtaUrl?: string;
}

export const methodologyStepsData: MethodologyStep[] = [
  {
    stepNumber: '01',
    title: 'Quantify Waste',
    subtitle: 'Process Waste Tax Ledger',
    canonicalArtifact: 'Process Waste Tax Ledger',
    scope: [
      'Repeat rework loops & manual reconciliation counts',
      'Validation fatigue & rubber-stamping risks',
      'Exception churn & schema/API drift overhead',
    ],
    prevention:
      'Stops unbudgeted operational capacity erosion and financial drag before capital allocation.',
    howToUse:
      'Import into executive capital allocation reviews to prioritize high-drag workflow remediation.',
  },
  {
    stepNumber: '02',
    title: 'Clear Directives',
    subtitle: 'Level 2 Execution Bridge',
    canonicalArtifact: 'Level 2 Execution Bridge',
    scope: [
      'State-machine boundary rules & exception logic',
      'Executable engineering runbooks mapped to native tools',
      'Accountable directives linking C-suite policy directly to Level 3 infrastructure',
    ],
    prevention:
      'Eliminates the Promise Gap™ by ensuring strategy governs runtime database writes.',
    howToUse:
      'Pass directly to engineering leads to deploy native configuration rules in existing IAM, API gateways, and staging queues.',
  },
  {
    stepNumber: '03',
    title: 'Continuous Audit',
    subtitle: 'Zero Security Footprint Diagnostics',
    canonicalArtifact: 'Zero Security Footprint Diagnostics',
    scope: [
      'Metadata & process-level telemetry inspection',
      'Verification of permission boundaries & Non-Human Identities (NHI)',
      'Continuous workflow drift detection',
    ],
    prevention:
      'Prevents third-party data liabilities, traffic latency, and custom middleware proxy bloat.',
    howToUse:
      'Submit to CISO and InfoSec approval committees as verification that no confidential code or data is accessed.',
  },
];

export const MethodologySteps: React.FC<MethodologyStepsProps> = ({
  primaryCtaUrl = '/pulse-check',
}) => {
  const methodologyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'Pre-Automation Control Plane Methodology',
    'description': sanitizeForJsonLd(
      'BMR Solutions audits Level 2 workflow bridges so Process Waste Tax becomes ledgered risk before autonomous agents scale.'
    ),
    'step': methodologyStepsData.map((step) => ({
      '@type': 'HowToStep',
      'position': parseInt(step.stepNumber, 10),
      'name': sanitizeForJsonLd(`${step.title}: ${step.canonicalArtifact}`),
      'itemListElement': [
        {
          '@type': 'HowToDirection',
          'text': sanitizeForJsonLd(`Scope: ${step.scope.join('; ')}`),
        },
        {
          '@type': 'HowToDirection',
          'text': sanitizeForJsonLd(`Prevention: ${step.prevention}`),
        },
        {
          '@type': 'HowToDirection',
          'text': sanitizeForJsonLd(`How to use: ${step.howToUse}`),
        },
      ],
    })),
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(methodologyJsonLd) }}
      />

      <div className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-widest text-teal-600 uppercase mb-2">
          Methodology & Architecture
        </h2>
        <h3 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          The Pre-Automation Control Plane
        </h3>
        <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
          Bridging Level 1 strategy to Level 3 infrastructure by making governance executable before autonomous agents scale.
        </p>
      </div>

      <div className="space-y-12">
        {methodologyStepsData.map((step) => (
          <div
            key={step.stepNumber}
            className="flex flex-col md:flex-row gap-8 p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm"
          >
            <div className="md:w-1/4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6">
              <div>
                <span className="text-4xl font-extrabold text-teal-500">
                  {step.stepNumber}
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-2">
                  {step.title}
                </h4>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                  {step.canonicalArtifact}
                </p>
              </div>
            </div>

            <div className="md:w-3/4 space-y-4">
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Scope & Assessment
                </h5>
                <ul className="space-y-1.5">
                  {step.scope.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-teal-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    What It Prevents
                  </h5>
                  <p className="text-xs text-slate-600">{step.prevention}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    How To Use This
                  </h5>
                  <p className="text-xs text-slate-600">{step.howToUse}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href={primaryCtaUrl}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
        >
          Take the Process Waste Tax Assessment
        </a>
      </div>
    </section>
  );
};
