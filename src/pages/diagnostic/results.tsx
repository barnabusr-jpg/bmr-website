import React from 'react';
import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dynamic import to bypass persistent build-time module resolution errors
const DiagnosticResultsContent = dynamic(
  () => import('@/components/promise-gap-diagnostic/DiagnosticResultsContent'),
  { ssr: false }
);

export default function DiagnosticResultsPage() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <DiagnosticResultsContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
