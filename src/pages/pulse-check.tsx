"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsolidatedDiagnostic from "@/components/diagnostic/ConsolidatedDiagnostic";

export default function PulseCheckPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow pt-32">
        {/* This loads your new 12-question logic directly */}
        <ConsolidatedDiagnostic />
      </main>
      <Footer />
    </div>
  );
}
