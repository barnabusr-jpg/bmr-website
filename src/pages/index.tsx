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
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col selection:bg-red-600/30 relative overflow-x-hidden w-full">
      {/* 🧭 NAVIGATION LOCK */}
      <Header />
      
      {/* 🧪 THE CORE ENGINE */}
      <main className="flex-grow w-full pt-24 md:pt-0">
        {/* Note: If HeroHome is still too wide, the header will remain clipped */}
        <HeroHome />
        <InsightsHome />
        <OutcomesHome />
        <ComparisonGrid />
        <ServicesPreviewHome />
      </main>

      <Footer />

      {/* 🛡️ ADMIN ACCESS: MOBILE-SAFE POSITIONING */}
      <div 
        onClick={() => router.push('/admin/dashboard')} 
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[10000] cursor-crosshair w-10 h-10 flex items-center justify-center rounded-full border border-slate-800 bg-slate-950/80 backdrop-blur-md transition-all hover:border-red-600/50 group"
      >
        <Shield size={12} className="text-slate-800 group-hover:text-red-600 transition-colors" />
      </div>
    </div>
  );
}
