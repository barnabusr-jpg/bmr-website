"use client";
import React from 'react';
import { X, Check } from 'lucide-react';

const comparisonData = [
  { area: "Audit Scope", traditional: "Technical uptime and token usage volume.", bmr: "HAI: Forensic analysis of human-in-the-loop logic rot." },
  { area: "Leakage Detection", traditional: "General project cost vs. static budget.", bmr: "AVS: Identifying \"Shadow Labor\" and systemic value leakage." },
  { area: "System Drift", traditional: "Annual compliance checklists and surveys.", bmr: "IGF: Continuous Δ (Delta) probes to prevent architectural decay." },
  { area: "Final Output", traditional: "Executive summary and high-level PPT.", bmr: "Drift Diagnostic: Structural recovery and protocol hardening." }
];

export default function ComparisonGrid() {
  return (
    <section style={{ borderTop: '1px solid #1e293b', paddingTop: '140px', paddingBottom: '140px', backgroundColor: '#020617' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', borderLeft: '6px solid #dc2626', paddingLeft: '40px' }}>
          <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, color: 'white', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: 0.85, margin: 0 }}>
            Traditional <span style={{ color: '#1e293b' }}>vs</span><br /><span style={{ color: '#dc2626' }}>Forensic Audit.</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', maxWidth: '250px', fontStyle: 'italic', margin: 0 }}>
            Most agencies measure adoption. We measure the divergence between intent and reality.
          </p>
        </div>

        <div style={{ border: '2px solid #0f172a' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(15, 23, 42, 0.5)', borderBottom: '2px solid #0f172a' }}>
                <th style={{ padding: '30px', color: '#64748b', fontSize: '10px', fontWeight: 900, letterSpacing: '0.4em' }}>AUDIT VECTOR</th>
                <th style={{ padding: '30px', color: '#64748b', fontSize: '10px', fontWeight: 900, letterSpacing: '0.4em' }}>STANDARD APPROACH</th>
                <th style={{ padding: '30px', color: '#dc2626', fontSize: '10px', fontWeight: 900, letterSpacing: '0.4em' }}>BMR FORENSICS</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #0f172a' }}>
                  <td style={{ padding: '40px', color: 'white', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', fontSize: '1.5rem', background: 'rgba(15, 23, 42, 0.2)', borderRight: '1px solid #0f172a' }}>{row.area}</td>
                  <td style={{ padding: '40px', color: '#64748b', fontSize: '1.4rem', fontStyle: 'italic' }}>
                    <div style={{ display: 'flex', gap: '15px' }}><X size={18} /> {row.traditional}</div>
                  </td>
                  <td style={{ padding: '40px', color: 'white', fontSize: '1.4rem', fontWeight: 'bold', fontStyle: 'italic', borderLeft: '1px solid #0f172a' }}>
                    <div style={{ display: 'flex', gap: '15px' }}><Check size={18} color="#dc2626" /> {row.bmr}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
