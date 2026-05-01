"use client";
import React from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroHome from "@/components/home/HeroHome";
import InsightsHome from "@/components/home/InsightsHome";
import OutcomesHome from "@/components/home/OutcomesHome";
import ComparisonGrid from "@/components/home/ComparisonGrid";
import ServicesPreviewHome from "@/components/home/ServicesPreviewHome";
import { Shield } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30 relative overflow-x-hidden">
      <Header />
      
      <main className="flex-grow">
        {/* Sub-components handle the grid and glossary internally */}
        <HeroHome />
        <InsightsHome />
        <OutcomesHome />
        <ComparisonGrid />
        <ServicesPreviewHome />
      </main>

      <Footer />

      {/* ADMIN PORTAL HIDDEN ACCESS (Bottom Left) */}
      <div onClick={() => router.push('/admin/dashboard')} className="fixed bottom-10 left-10 z-[110] cursor-crosshair group">
        <div className="w-10 h-10 flex items-center justify-center border border-slate-800 group-hover:border-red-600 transition-all rounded-full bg-slate-950/80 backdrop-blur-md">
          <Shield size={12} className="text-slate-800 group-hover:text-red-600 transition-all opacity-20 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
}
