"use client";
import React from 'react';
import { useRouter } from 'next/router';
import { Activity, Zap } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const NAV_ITEMS = [
    { label: "METHODOLOGY", path: "/briefings" },
    { label: "FRAMEWORKS", path: "/briefings" },
    { label: "BRIEFINGS", path: "/briefings" }
  ];

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, backgroundColor: '#020617', borderBottom: '1px solid #1e293b', padding: '20px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* LOGO */}
        <div onClick={() => router.push('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#dc2626', padding: '8px' }}>
            <Activity size={18} color="white" />
          </div>
          <span style={{ color: 'white', fontWeight: 900, fontStyle: 'italic', fontSize: '20px', textTransform: 'uppercase', letterSpacing: '-0.05em' }}>
            BMR<span style={{ color: '#dc2626' }}>SOLUTIONS</span>
          </span>
        </div>

        {/* 🟢 FORCED VISIBILITY NAV LINKS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.label} 
              onClick={() => router.push(item.path)}
              style={{ background: 'none', border: 'none', color: 'white', fontSize: '10px', fontWeight: 900, letterSpacing: '0.4em', cursor: 'pointer', padding: 0 }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* DIAGNOSTIC BUTTON */}
        <button 
          onClick={() => router.push('/pulse-check')}
          style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 24px', fontWeight: 900, fontSize: '10px', letterSpacing: '0.2em', border: '1px solid #dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Zap size={14} /> INITIATE_DIAGNOSTIC
        </button>
      </div>
    </nav>
  );
}
