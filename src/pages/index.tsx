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
import { useRouter } from "next/navigation"; // Updated for consistency

export default function Home() {
  const router = useRouter();

  return (
    <div 
      style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      className="selection:bg-red-600/30 relative overflow-x-hidden"
    >
      <Header />
      
      <main style={{ flexGrow: 1 }}>
        <HeroHome />
        <InsightsHome />
        <OutcomesHome />
        <ComparisonGrid />
        <ServicesPreviewHome />
      </main>

      <Footer />

      {/* 🛡️ ADMIN ACCESS: REPOSITIONED TO BOTTOM RIGHT */}
      <div 
        onClick={() => router.push('/admin/dashboard')} 
        style={{ 
          position: 'fixed', 
          bottom: '40px', 
          right: '40px', // Moved to right
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
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease'
        }}
        className="hover:border-red-600/50 group"
      >
        <Shield size={12} className="text-slate-800 group-hover:text-red-600 transition-colors" />
      </div>
    </div>
  );
}
