"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsolidatedDiagnostic from "@/components/diagnostic/ConsolidatedDiagnostic";

export default function VaultAlpha() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
      <Header />
      <main className="flex-grow pt-48 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <ConsolidatedDiagnostic />
        </div>
      </main>
      <Footer />
    </div>
  );
}
