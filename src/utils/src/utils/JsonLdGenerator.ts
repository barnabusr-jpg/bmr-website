// src/utils/JsonLdGenerator.ts

/**
 * Global Helper: Sanitizes text for JSON-LD structured data.
 * Strips ™ symbols for clean search crawler entity matching while preserving visual UI trademarks.
 */
export const sanitizeForJsonLd = (text: string): string => text.replace(/™/g, '');

export interface BaseMetadataProps {
  pageTitle: string;
  pageDescription: string;
  canonicalUrl: string;
}

/**
 * 1. Global Organization & Service Schema (Homepage / Site Root)
 */
export const getOrganizationAndServiceJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://bmrsolutions.io/#organization',
        'name': 'BMR Solutions',
        'url': 'https://bmrsolutions.io',
        'logo': 'https://bmrsolutions.io/assets/logo.png',
        'sameAs': [
          'https://www.linkedin.com/company/bmr-solutions',
        ],
        'description': sanitizeForJsonLd(
          'BMR Solutions provides the Pre-Automation Control Plane, auditing Level 2 workflow bridges to convert Process Waste Tax into ledgered risk.'
        ),
      },
      {
        '@type': 'Service',
        '@id': 'https://bmrsolutions.io/#pre-automation-control-plane',
        'name': 'Pre-Automation Control Plane',
        'provider': {
          '@id': 'https://bmrsolutions.io/#organization',
        },
        'serviceType': 'Enterprise AI & Automation Governance',
        'description': sanitizeForJsonLd(
          'Audits Level 2 workflow bridges so Process Waste Tax becomes ledgered risk before autonomous agents scale—without inline proxies or confidential data access.'
        ),
        'knowsAbout': [
          'Process Waste Tax Ledger',
          'Level 2 Execution Bridge',
          'Zero Security Footprint Diagnostics',
          'Promise Gap', // Clean entity without ™
        ],
      },
    ],
  };
};

/**
 * 2. BreadcrumbList Schema Generator
 */
export const getBreadcrumbJsonLd = (items: { name: string; item: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': sanitizeForJsonLd(crumb.name),
      'item': crumb.item,
    })),
  };
};

/**
 * 3. Assessment / Diagnostic Landing Page Schema (/pulse-check)
 */
export const getAssessmentPageJsonLd = (props: BaseMetadataProps) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${props.canonicalUrl}#webpage`,
    'url': props.canonicalUrl,
    'name': sanitizeForJsonLd(props.pageTitle),
    'description': sanitizeForJsonLd(props.pageDescription),
    'mainEntity': {
      '@type': 'Action',
      'name': '10-Question Process Waste Tax Assessment',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': props.canonicalUrl,
        'actionPlatform': ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
      },
      'result': {
        '@type': 'AssessmentReport',
        'name': 'Process Waste Tax Ledger Assessment',
      },
    },
  };
};
