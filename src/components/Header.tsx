"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Activity, ShieldAlert, Zap } from 'lucide-react';

const NAV_ITEMS = [
  { label: "METHODOLOGY", path: "/methodology" },
  { label: "FRAMEWORKS", path: "/frameworks" },
  { label: "BRIEFINGS", path: "/briefings" }
];

export default function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 9999, 
        backgroundColor: 'rgba(2, 6, 23, 0.95)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1e293b', 
        padding: '16px 24px',
        fontFamily: 'sans-serif'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* LOGO */}
        <div onClick={() => router.push('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#dc2626', padding: '8px', display: 'flex', alignItems: 'center' }}>
            <Activity size={18} color="white" />
          </div>
          <span style={{ color: 'white', fontWeight: 900, fontStyle: 'italic', fontSize: '20px', textTransform: 'uppercase', letterSpacing: '-0.05em' }}>
            BMR<span style={{ color: '#dc2626' }}>SOLUTIONS</span>
          </span>
        </div>

        {/* CENTRAL NAV - FORCED VISIBILITY */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.label} 
              onClick={() => router.push(item.path)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#ffffff', 
                fontSize: '11px', // Slightly larger
                fontWeight: 900, 
                letterSpacing: '0.4em', 
                cursor: 'pointer', 
                padding: 0,
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#dc2626')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#ffffff')}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* RIGHT SIDE: METADATA + BUTTON */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          
          {/* FORENSIC METADATA STAMPS */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '20px', borderRight: '1px solid #1e293b' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '8px', color: '#64748b', fontWeight: 'bold' }}>STATUS</span>
                <span style={{ fontSize: '8px', color: '#dc2626', fontWeight: 900, backgroundColor: 'rgba(220, 38, 38, 0.1)', padding: '0 4px', letterSpacing: '0.1em' }}>ACTIVE_RECOVERY</span>
             </div>
             <span style={{ fontSize: '9px', color: '#eab308', fontWeight: 'bold', fontStyle: 'italic', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldAlert size={10} /> INDEMNITY_UNVERIFIED
             </span>
          </div>
          
          <button 
            onClick={() => router.push('/pulse-check')}
            style={{ 
              backgroundColor: '#dc2626', 
              color: 'white', 
              padding: '12px 24px', 
              fontWeight: 900, 
              fontSize: '10px', 
              letterSpacing: '0.2em', 
              border: '1px solid #dc2626', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}
          >
            <Zap size={14} /><span>INITIATE_DIAGNOSTIC</span>
          </button>
        </div>
      </div>

      {/* SUB-NAV STATUS BAR - THE "FOOTER" OF THE HEADER */}
      <div style={{ maxWidth: '1280px', margin: '8px auto 0', display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontSize: '7px', color: '#334155', letterSpacing: '0.5em', fontFamily: 'monospace', fontWeight: 'bold' }}>
          BMR_SEC_SYS_ACTIVE // SESSION_ENCRYPTED_256BIT
        </div>
        <div style={{ fontSize: '7px', color: '#334155', letterSpacing: '0.5em', fontFamily: 'monospace', fontWeight: 'bold' }}>
          U.S._DISTRICT_COMPLIANCE_ENFORCED
        </div>
      </div>
    </nav>
  );
}
