"use client";
import React from 'react';
import { Activity, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

const signalEntries = [
  { 
    category: "HAI", 
    title: "THE HUMAN TRUST GAP", 
    excerpt: "Trust is a quantifiable mismatch between human mental models and system output. We identify where the promise gap creates shadow labor. Human employees must manually correct failed automated logic. This creates a hidden operational cost.", 
    slug: "" 
  },
  { 
    category: "AVS", 
    title: "VALUE STREAM LEAKAGE", 
    excerpt: "Activity is not achievement. Aligning technical tools with operational reality is the only way to stop systemic margin erosion. Most systems fail because they do not account for real world variables. This results in invisible profit loss.", 
    slug: "" 
  },
  { 
    category: "IGF", 
    title: "INSTITUTIONAL FIDELITY", 
    excerpt: "Governance is not a checkbox. It is a reconstructible logic chain. You must harden your architecture to survive a regulatory forensic review. Documentation is the only defense against system decay. We ensure your records are audit ready.", 
    slug: "" 
  }
];

export default function InsightsHome() {
  return (
    <section style={{ borderTop: '1px solid #1e293b', paddingTop: '140px', paddingBottom: '140px', backgroundColor: '#020617' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ borderLeft: '6px solid #dc2626', paddingLeft: '40px', marginBottom: '80px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <ShieldAlert size={20} color="#dc2626" />
            <span style={{ color: '#dc2626', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '10px', fontStyle: 'italic' }}>FORENSIC_INTELLIGENCE_BRIEFINGS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, color: 'white', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: 1 }}>FORENSIC <span style={{ color: '#1e293b' }}>ANALYSIS</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          {signalEntries.map((insight) => (
            <Link key={insight.title} href={`/briefings/${insight.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '60px', border: '2px solid #0f172a', background: 'rgba(15, 23, 42, 0.2)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#dc2626', marginBottom: '30px' }}>
                    <Activity size={18} />
                    <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#64748b' }}>PROTOCOL: {insight.category}</span>
                  </div>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', fontStyle: 'italic', textTransform: 'uppercase', marginBottom: '30px', lineHeight: 1 }}>{insight.title}</h3>
                  <p style={{ fontSize: '1.4rem', color: '#64748b', lineHeight: 1.6, fontStyle: 'italic', borderLeft: '2px solid #1e293b', paddingLeft: '24px' }}>{insight.excerpt}</p>
                </div>
                <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', color: '#dc2626', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em' }}>
                  ACCESS FORENSIC BRIEFING <ArrowRight size={14} style={{ marginLeft: '10px' }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
