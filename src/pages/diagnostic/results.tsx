import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// Fixed path: ensured lowercase 'promise-gap-diagnostic'
import DiagnosticResultsContent from "@/components/promise-gap-diagnostic/DiagnosticResultsContent";

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
