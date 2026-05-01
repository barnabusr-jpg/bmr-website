"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from "lucide-react";

export default function HeroHome() {
  const router = useRouter();

  return (
    <section style={{ backgroundColor: '#020617', color: 'white', paddingTop: '160px', paddingBottom: '80px', width: '100%' }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '0 24px', 
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '40px'
      }}>
        
        {/* LEFT COLUMN: FIXED 55% */}
        <div style={{ width: '55%', textAlign: 'left', flexShrink: 0 }}>
          <div style={{ borderLeft: '4px solid #dc2626', paddingLeft: '24px', marginBottom: '40px' }}>
            <p style={{ color: '#dc2626', fontWeight: 900, fontSize: '10px', letterSpacing: '0.4em', marginBottom: '10px', fontFamily: 'monospace' }}>FORENSIC_ENVIRONMENT</p>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 6.5rem)', 
              fontWeight: 900, 
              fontStyle: 'italic', 
              lineHeight: 0.85, 
              textTransform: 'uppercase', 
              margin: 0,
              fontFamily: 'sans-serif'
            }}>
              The <span style={{ color: '#dc2626' }}>Promise Gap</span><br />
              <span style={{ color: '#1e293b' }}>Where ROI Goes</span><br />
              <span style={{ color: '#dc2626' }}>To Die.</span>
            </h1>
          </div>
          
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '40px', maxWidth: '400px' }}>
            <span style={{ color: '#dc2626', fontWeight: 900, fontSize: '10px', letterSpacing: '0.4em', fontFamily: 'monospace' }}>LOGIC SHEAR:</span>
            <p style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold', fontStyle: 'italic', marginTop: '10px', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
              Friction created when human oversight and machine execution decouple.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: FIXED 40% */}
        <div style={{ width: '40%', marginTop: '60px', flexShrink: 0 }}>
          <div style={{ 
            backgroundColor: 'rgba(15, 23, 42, 0.5)', 
            border: '2px solid #1e293b', 
            padding: '40px', 
            textAlign: 'left' 
          }}>
            <h2 style={{ 
              fontSize: '2.2rem', 
              fontWeight: 900, 
              fontStyle: 'italic', 
              textTransform: 'uppercase', 
              margin: 0,
              fontFamily: 'sans-serif',
              lineHeight: 1
            }}>
              For <span style={{ color: '#dc2626' }}>CTOs / OPs / Tech Mgrs</span>
            </h2>
            <div style={{ borderLeft: '2px solid #dc2626', paddingLeft: '20px', marginTop: '30px' }}>
              <p style={{ color: '#94a3b8', fontStyle: 'italic', fontFamily: 'sans-serif', fontSize: '0.95rem' }}>BMR provides forensic tools to harden logic chains.</p>
              <p style={{ 
                color: '#dc2626', 
                fontWeight: 900, 
                textTransform: 'uppercase', 
                marginTop: '25px', 
                borderTop: '1px solid #1e293b', 
                paddingTop: '20px',
                fontFamily: 'sans-serif',
                fontSize: '1.1rem'
              }}>
                You have Systemic Rot.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
