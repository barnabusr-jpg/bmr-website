"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

const NAV_LINKS = [
  { name: 'METHODOLOGY', path: '/methodology' },
  { name: 'BRIEFINGS', path: '/briefings' },
  { name: 'PULSE_CHECK', path: '/pulse-check' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      height: '100px', 
      backgroundColor: 'rgba(2, 6, 23, 0.7)', // Matches original transparency
      backdropFilter: 'blur(20px)', // Original deep blur
      borderBottom: '1px solid #1e293b', 
      zIndex: 1000, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0 40px' 
    }}>
      {/* LOGO: RESTORED ORIGINAL STACKED BRANDING */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none' }}>
        <ShieldAlert size={28} color="#dc2626" />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '0.9' }}>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '20px', letterSpacing: '0.05em' }}>
            BMR<span style={{ color: '#dc2626' }}>SOLUTIONS</span>
          </span>
          <span style={{ color: '#dc2626', fontWeight: 900, fontSize: '10px', letterSpacing: '0.4em', marginTop: '4px' }}>
            FORENSIC_ENVIRONMENT
          </span>
        </div>
      </Link>

      {/* NAVIGATION: UNCHANGED LOGIC */}
      <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link 
              key={link.path} 
              href={link.path} 
              style={{ 
                color: isActive ? '#dc2626' : '#94a3b8', 
                textDecoration: 'none', 
                fontSize: '11px', 
                fontWeight: 900, 
                letterSpacing: '0.3em', 
                transition: 'color 0.2s ease' 
              }}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* STATUS INDICATOR: RESTORED ORIGINAL GLOW & SPACING */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          backgroundColor: '#22c55e', 
          boxShadow: '0 0 10px #22c55e' 
        }} />
        <span style={{ color: '#64748b', fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em', fontFamily: 'monospace' }}>
          SYSTEMS_NOMINAL
        </span>
      </div>
    </header>
  );
}
