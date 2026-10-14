// src/data/comparisonGridData.ts

export const comparisonGridData = {
  sectionHeadline: "THE ENTERPRISE AUTOMATION LANDSCAPE",
  sectionSubdeck: "How Enterprise Ops Secures Governance Without Intrusive Software",
  primaryCtaUrl: "/pulse-check",
  cards: [
    {
      id: "traditional",
      title: "TRADITIONAL APPROACH",
      subtitle: "(Consultancies & PDF governance)",
      type: "neutral" as const,
      bullets: [
        "Static charters & static compliance reviews",
        "Lengthy PDF gap analysis reports",
        "Promise Gap™: strategy → never becomes controls"
      ],
      callout: "Strategy never reaches database engineering."
    },
    {
      id: "reactive",
      title: "REACTIVE ATTEMPTS",
      subtitle: "(Inline proxies & overlays)",
      type: "warning" as const,
      bullets: [
        "Traffic & proxy filtering overlays",
        "Deep IT / middleware dependencies",
        "Privacy & security friction"
      ],
      callout: "Filtering ≠ workflow governance."
    },
    {
      id: "bmr",
      title: "BMR SOLUTIONS",
      subtitle: "Diagnostic → Execution Runbooks",
      type: "hero" as const,
      badge: "Pre-Automation Control Plane",
      bullets: [
        "Zero Security Footprint Diagnostics (no confidential code/data access)",
        "Quantify process waste (Process Waste Tax Ledger)",
        "Translate governance into engineering runbooks",
        "Bridge: strategy → workflow rules → data controls (Level 2)"
      ],
      callout: "Audit-ready + implementation-ready. No proxy bloat."
    }
  ]
};
