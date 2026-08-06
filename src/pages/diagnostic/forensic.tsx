"use client";
import React from 'react';
import ForensicDiagnosticWizard from '@/components/ForensicDiagnosticWizard'; 

export default function ForensicPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <ForensicDiagnosticWizard 
        companyName="Target Organization"
        activePillar="IGF"
        onCalculated={() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/forensic?auth=true';
          }
        }}
      />
    </div>
  );
}
