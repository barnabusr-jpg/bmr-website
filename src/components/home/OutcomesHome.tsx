"use client";
import React from 'react';
import { ShieldCheck, Activity, ZapOff, Database, Scaling, Binary } from "lucide-react";

const forensicOutcomes = [
  { icon: ZapOff, category: "OC-01", title: "Drift Containment", description: "Identifying and neutralizing the delta (Δ) between automated outputs and human operational reality before trust collapses." },
  { icon: Activity, category: "OC-02", title: "Resonance Mapping", description: "Aligning system performance with human mental models to stop shadow labor and unlogged manual overrides." },
  { icon: ShieldCheck, category: "OC-03", title: "Fidelity Assurance", description: "Establishing reconstructible logic chains that survive hostile regulatory review and internal accountability audits." },
  { icon: Binary, category: "OC-04", title: "Structural Hardening", description: "Removing systemic fragility to ensure resilient performance in high-stakes, non-deterministic decision cycles." },
  { icon: Scaling, category: "OC-05", title: "Governance Scaling", description: "Linking AI initiatives directly to core mission objectives, ensuring strategic intent is not lost in technical execution." },
  { icon: Database, category: "OC-06", title: "Leakage Recovery", description: "Capturing leaked organizational value by reconciling technical precision with operational adoption rates." }
];

export default function OutcomesHome() {
  return (
    <section style={{ borderTop: '1px solid #1e293b', paddingTop: '140px', paddingBottom: '140px', backgroundColor: '#020617' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ textAlign: 'left', marginBottom: '80px', borderLeft: '6px solid #1e293b', paddingLeft: '40px' }}>
          <span style={{ color: '#dc2626', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '10px', fontStyle: 'italic' }}>VALIDATION_STANDARDS // SYSTEM_RECOVERY</span>
          <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, color: 'white', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: 1, marginTop: '20px' }}>
            Hardened <span style={{ color: '#1e293b' }}>Outcomes</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          {forensicOutcomes.map((outcome, index) => (
            <div key={index} style={{ padding: '60px', border: '2px solid #0f172a', background: 'rgba(15, 23, 42, 0.2)', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <outcome.icon size={32} color="#dc2626" />
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#1e293b', letterSpacing: '0.3em' }}>{outcome.category}</span>
              </div>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'white', fontStyle: 'italic', textTransform: 'uppercase', marginBottom: '20px' }}>{outcome.title}</h3>
              <p style={{ fontSize: '1.4rem', color: '#64748b', lineHeight: 1.6, borderLeft: '2px solid #1e293b', paddingLeft: '24px' }}>{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
