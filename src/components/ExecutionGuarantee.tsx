// src/components/ExecutionGuarantee.tsx
import React from 'react';
import { sanitizeForJsonLd } from '../utils/JsonLdGenerator';

export interface ExecutionGuaranteeProps {
  ctaUrl?: string;
}

export const ExecutionGuarantee: React.FC<ExecutionGuaranteeProps> = ({
  ctaUrl = '/pulse-check',
}) => {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Pre-Automation Control Plane',
    'provider': {
      '@type': 'Organization',
      'name': 'BMR Solutions',
    },
    'description': sanitizeForJsonLd(
      'Audits Level 2 workflow bridges to convert Process Waste Tax into ledgered risk before autonomous agents scale.'
    ),
    'knowsAbout': [
      'Process Waste Tax Ledger',
      'Level 2 Execution Bridge',
      'Zero Security Footprint Diagnostics',
      'Promise Gap', // Clean entity without ™
    ],
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 my-16 max-w-7xl mx-auto shadow-2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div className="max-w-3xl">
        <h3 className="text-2xl font-bold mb-4">
          Audit-Ready & Implementation-Ready Architecture
        </h3>
        <p className="text-slate-300 leading-relaxed mb-6">
          BMR Solutions operates entirely as a diagnostic and framework layer. We translate executive governance into actionable Level 2 engineering runbooks deployed directly through your existing IAM, API gateways, and staging queues—closing the Promise Gap™ without adding proxy bloat or security liabilities.
        </p>
        <a
          href={ctaUrl}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-900 bg-teal-400 rounded-lg hover:bg-teal-300 transition-colors"
        >
          Take the Process Waste Tax Assessment
        </a>
      </div>
    </div>
  );
};
