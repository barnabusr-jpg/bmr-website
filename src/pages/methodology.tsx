"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
      <Header />
      <main className="flex-grow pt-48 px-6 container mx-auto">
        <div className="text-center space-y-16 max-w-7xl mx-auto">
           <h1 className="text-[140px] font-black uppercase italic tracking-tighter leading-[0.8] mb-12">
             Re-Anchoring <br /> AI To <br /> 
             <span className="text-red-600 font-black italic">Strategic <br /> Intent.</span>
           </h1>
           <p className="text-slate-400 text-xl italic max-w-3xl mx-auto leading-relaxed font-medium">
             BMR Solutions was founded to bridge the &quot;Promise Gap.&quot; We address the space where technical AI deployment fails to translate into realized operational value.
           </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
