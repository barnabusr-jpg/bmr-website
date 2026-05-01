"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from "lucide-react";

export default function HeroHome() {
  const router = useRouter();

  return (
    <section style={{ backgroundColor: '#020617', color: 'white', paddingTop: '160px', paddingBottom: '80px', px: '24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
        
        {/* LEFT COLUMN (50%) */}
        <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
          <div style={{ borderLeft: '4px solid #dc2626', paddingLeft: '24px', marginBottom: '40px' }}>
            <p style={{ color: '#dc2626', fontWeight: 900, fontSize: '10px', letterSpacing: '0.4em', marginBottom: '20px' }}>BMR_FORENSICS // STRUCTURAL_AUDIT</p>
            <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 900, fontStyle: 'italic', lineHeight: 0.8, textTransform: 'uppercase', margin: 0 }}>
              The <span style={{ color: '#dc2626' }}>Promise Gap</span><br />
              <span style={{ color: '#1e293b' }}>Where ROI Goes</span><br />
              <span style={{ color: '#dc2626' }}>To Die.</span>
            </h1>
          </div>

          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '40px', maxWidth: '450px' }}>
             <div style={{ marginBottom: '32px' }}>
                <span style={{ color: '#dc2626', fontWeight: 900, fontSize: '10px', letterSpacing: '0.4em' }}>LOGIC SHEAR:</span>
                <p style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold', fontStyle: 'italic', textTransform: 'uppercase', marginTop: '8px' }}>
                  Friction created when human oversight and machine execution decouple.
                </p>
             </div>
             <button 
                onClick={() => router.push('/pulse-check')}
                style={{ backgroundColor: '#dc2626', color: 'white', padding: '24px 40px', border: 'none', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}
             >
                INITIALIZE DIAGNOSTIC <ArrowRight size={18} />
             </button>
          </div>
        </div>

        {/* RIGHT COLUMN (PERSONA BOX) */}
        <div style={{ flex: '1 1 400px', marginTop: '60px' }}>
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '2px solid #1e293b', padding: '50px', textAlign: 'left', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', borderTop: '2px solid rgba(220,38,38,0.3)', borderRight: '2px solid rgba(220,38,38,0.3)' }} />
            <h2 style={{ fontSize: '3rem', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', lineHeight: 1, margin: 0 }}>
              For <span style={{ color: '#dc2626' }}>CTOs / OPs / Tech Mgrs</span>
            </h2>
            <div style={{ borderLeft: '2px solid #dc2626', paddingLeft: '24px', marginTop: '40px' }}>
              <p style={{ fontSize: '1.1rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '30px' }}>BMR provides forensic tools to harden logic chains.</p>
              <div style={{ borderTop: '1px solid #1e293b', paddingTop: '30px' }}>
                <p style={{ color: '#dc2626', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase' }}>
                  You have <span style={{ fontStyle: 'italic' }}>Systemic Rot.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
