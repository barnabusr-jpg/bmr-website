"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow pt-32 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-2 mb-12">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter text-red-600">
            Forensic_Audit_Logs
          </h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em]">
            BMR_SYSTEM_ADMIN // NODE: SEC-04-NYC
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="border border-slate-900 bg-slate-950 p-20 text-center space-y-4">
             <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
             <p className="text-[10px] font-mono text-slate-700 uppercase tracking-widest italic">
               Establishing secure handshake with MongoDB Cluster...
             </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
