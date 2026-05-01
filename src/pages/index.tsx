"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroHome from "@/components/home/HeroHome";
import InsightsHome from "@/components/home/InsightsHome";
import OutcomesHome from "@/components/home/OutcomesHome";
import ComparisonGrid from "@/components/home/ComparisonGrid";
import ServicesPreviewHome from "@/components/home/ServicesPreviewHome";
import { Shield } from "lucide-react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div 
      style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      className="selection:bg-red-600/30 relative overflow-x-hidden"
    >
      {/* 🛠️ NAVIGATION: Hoisted to the top layer */}
      <Header />
      
      <main style={{ flexGrow: 1 }}>
        {/* 1. HERO: The 55/40 Split (Glossary & CTO Box) */}
        <HeroHome />
        
        {/* 2. FORENSIC ANALYSIS: The 3 Cards (Human Trust, Value Leakage, etc.) */}
        <InsightsHome />
        
        {/* 3. RECOVERY OUTCOMES: The ROI section */}
        <OutcomesHome />
        
        {/* 4. COMPARISON: BMR vs Traditional Audit */}
        <ComparisonGrid />
        
        {/* 5. SERVICES: Final call to action segments */}
        <ServicesPreviewHome />
      </main>

      <Footer />

      {/* 🛡️ ADMIN ACCESS: Bottom Left */}
      <div 
        onClick={() => router.push('/admin/dashboard')} 
        style={{ 
          position: 'fixed', 
          bottom: '40px', 
          left: '40px', 
          zIndex: 10000, 
          cursor: 'crosshair',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: '1px solid #1e293b',
          backgroundColor: 'rgba(2, 6, 23, 0.8)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <Shield size={12} color="#1e293b" />
      </div>
    </div>
  );
}
