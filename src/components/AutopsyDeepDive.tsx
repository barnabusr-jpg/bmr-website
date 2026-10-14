// src/components/AutopsyDeepDive.tsx
import React from 'react';
import { sanitizeForJsonLd } from '../utils/JsonLdGenerator';

export interface DeliverableMatrixItem {
  canonicalArtifact: string;
  artifactFormat: string;
  scope: string[];
  prevention: string;
  howToUse: string;
}

export interface AutopsyDeepDiveProps {
  autopsyTitle: string;
  autopsySlug: string;
  summary: string;
  deliverables?: DeliverableMatrixItem[];
  primaryCtaUrl?: string;
}

export const defaultAutopsyDeliverables: DeliverableMatrixItem[] = [
  {
    canonicalArtifact: 'Process Waste Tax Ledger',
    artifactFormat: 'Financial Exposure Report (PDF / CSV)',
    scope: [
      'Repeat rework loops & manual reconciliation counts',
      'Validation fatigue & rubber-stamping risks',
      'Schema drift & unannounced API changes',
    ],
    prevention:
      'Stops unbudgeted capacity erosion and operational drag before autonomous agent deployment.',
    howToUse:
      'Import into executive capital allocation reviews to prioritize high-drag workflow remediation.',
  },
  {
    canonicalArtifact: 'Level 2 Execution Bridge',
    artifactFormat: 'Execution-Ready Engineering Runbook',
    scope: [
      'State-machine boundary rules & exception handling logic',
      'Accountable directives linking C-suite policy to IAM and API rules',
    ],
    prevention:
      'Eliminates the Promise Gap™ by ensuring executive strategy directly governs runtime database writes.',
    howToUse:
      'Pass directly to engineering leads to deploy native configuration rules in existing IAM, API gateways, and staging queues.',
  },
  {
    canonicalArtifact: 'Zero Security Footprint Diagnostics',
    artifactFormat: 'Diagnostic Risk Assessment & Clearance',
    scope: [
      'Metadata & process-level telemetry inspection',
      'Non-Human Identity (NHI) scope boundary evaluation',
    ],
    prevention:
      'Prevents third-party data liabilities, traffic latency, and custom middleware proxy bloat.',
    howToUse:
      'Submit to CISO / InfoSec approval committees as verification that no confidential code or data is accessed.',
  },
];

export const AutopsyDeepDive: React.FC<AutopsyDeepDiveProps> = ({
  autopsyTitle,
  autopsySlug,
  summary,
  deliverables = defaultAutopsyDeliverables,
  primaryCtaUrl = '/pulse-check',
}) => {
  const autopsyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': sanitizeForJsonLd(autopsyTitle),
    'description': sanitizeForJsonLd(summary),
    'mainEntity': {
      '@type': 'ItemList',
      'name': 'Pre-Automation Control Plane Deliverables',
      'itemListElement': deliverables.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': sanitizeForJsonLd(item.canonicalArtifact),
        'description': sanitizeForJsonLd(
          `${item.artifactFormat} - ${item.prevention}`
        ),
      })),
    },
    'about': [
      'Process Waste Tax Ledger',
      'Level 2 Execution Bridge',
      'Zero Security Footprint Diagnostics',
      'Promise Gap', // Clean entity without ™
    ],
  };

  return (
    <article className="py-12 px-4 max-w-5xl mx-auto font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autopsyJsonLd) }}
      />

      <header className="mb-10 pb-8 border-b border-slate-200">
        <span className="text-xs font-bold tracking-widest text-teal-600 uppercase">
          Technical Autopsy & Verification
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
          {autopsyTitle}
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-3xl">
          {summary}
        </p>
      </header>

      <section className="my-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Deliverable Matrix: Pre-Automation Control Plane
        </h2>

        <div className="space-y-8">
          {deliverables.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  {item.canonicalArtifact}
                </h3>
                <span className="inline-block px-3 py-1 text-xs font-medium text-slate-700 bg-slate-200/70 rounded-md">
                  {item.artifactFormat}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Scope & Assessment
                </h4>
                <ul className="space-y-1">
                  {item.scope.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-teal-500 font-bold">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-200/80">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    What It Prevents
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.prevention}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    How To Use This
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.howToUse}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-12 p-8 rounded-2xl bg-slate-900 text-white text-center">
        <h3 className="text-xl font-bold mb-2">
          Benchmark Your Level 2 Execution Readiness
        </h3>
        <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
          Identify manual rework loops, validation fatigue, and permission drift before deploying autonomous agents into production.
        </p>
        <a
          href={primaryCtaUrl}
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-slate-900 bg-teal-400 rounded-xl hover:bg-teal-300 transition-colors"
        >
          Take the Process Waste Tax Assessment
        </a>
      </footer>
    </article>
  );
};
