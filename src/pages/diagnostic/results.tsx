import React from 'react';
import dynamic from 'next/dynamic';
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Revised dynamic import to resolve pathing issues during build
const DiagnosticResultsContent = dynamic(
  () => import('../../components/promise-gap-diagnostic/DiagnosticResultsContent'),
  { 
    ssr: false,
    loading: () => (
      <div className="py-20 text-center text-slate-500 uppercase tracking-widest text-xs animate-pulse">
        Initialising Forensic Topology...
      </div>
    )
  }
);

export default function DiagnosticResultsPage() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Head>
        <title>Forensic Topology | BMR Signal Diagnostic</title>
      </Head>
      
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* This component now handles its own data loading and email banner */}
          <DiagnosticResultsContent />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
