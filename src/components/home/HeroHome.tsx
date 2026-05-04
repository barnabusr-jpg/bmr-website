"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from "lucide-react";

export default function HeroHome() {
  const router = useRouter();

  return (
    <section style={{ backgroundColor: '#020617', color: 'white', paddingTop: '220px', paddingBottom: '120px', width: '100%' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: '60px' }}>
        
        {/* LEFT COLUMN: 55% SPLIT */}
        <div style={{ width: '55%', textAlign: 'left', flexShrink: 0 }}>
          <div style={{ borderLeft: '6px solid #dc2626', paddingLeft: '40px', marginBottom: '60px' }}>
            <p style={{ color: '#dc2626', fontWeight: 900, fontSize: '12px', letterSpacing: '0.5em', marginBottom: '20px', fontFamily: 'monospace' }}>NODE_ACCESS: FORENSIC_ENVIRONMENT</p>
            <h1 style={{ fontSize: 'clamp(4rem, 9vw, 8rem)', fontWeight: 900, fontStyle: 'italic', lineHeight: 0.8, textTransform: 'uppercase', margin: 0, fontFamily: 'sans-serif' }}>
              The <span style={{ color: '#dc2626' }}>Promise Gap</span><br />
              <span style={{ color: '#1e293b' }}>Where ROI Goes</span><br />
              <span style={{ color: '#dc2626' }}>To Die.</span>
            </h1>
          </div>
          
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '50px', maxWidth: '550px' }}>
            <span style={{ color: '#dc2626', fontWeight: 900, fontSize: '11px', letterSpacing: '0.4em', fontFamily: 'monospace' }}>LOGIC SHEAR:</span>
            <p style={{ color: '#94a3b8', fontSize: '1.5rem', fontWeight: 500, fontStyle: 'italic', marginTop: '15px', fontFamily: 'sans-serif', textTransform: 'uppercase', lineHeight: 1.4 }}>
              Friction created when human oversight and machine execution decouple.
            </p>
            <button onClick={() => router.push('/pulse-check')} style={{ marginTop: '50px', backgroundColor: '#dc2626', color: 'white', padding: '24px 48px', border: 'none', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>
              INITIALIZE DIAGNOSTIC <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: PERSONA BOX */}
        <div style={{ width: '40%', marginTop: '100px', flexShrink: 0 }}>
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '2px solid #1e293b', padding: '60px', textAlign: 'left', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', borderTop: '2px solid #dc2626', borderRight: '2px solid #dc2626' }} />
            <h2 style={{ fontSize: '3rem', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', margin: 0, fontFamily: 'sans-serif', lineHeight: 1, color: 'white' }}>
              For <span style={{ color: '#dc2626' }}>CTOs / OPs / Tech Mgrs</span>
            </h2>
            <div style={{ borderLeft: '2px solid #dc2626', paddingLeft: '30px', marginTop: '40px' }}>
              <p style={{ color: '#94a3b8', fontStyle: 'italic', fontFamily: 'sans-serif', fontSize: '1.3rem', lineHeight: 1.6 }}>BMR provides forensic tools to harden logic chains. Uncertainty is a measurable liability.</p>
              <div style={{ marginTop: '40px', borderTop: '1px solid #1e293b', paddingTop: '30px' }}>
                <p style={{ color: '#dc2626', fontWeight: 900, textTransform: 'uppercase', fontFamily: 'sans-serif', fontSize: '1.4rem' }}>YOU HAVE <span style={{ fontStyle: 'italic' }}>SYSTEMIC ROT.</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

