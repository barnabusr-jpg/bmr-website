"use client";

import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ComparisonGrid from "@/components/home/ComparisonGrid";
import { Database } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Head><title>BMR | FORENSIC METHODOLOGY</title></Head>
      <Header />
      <main className="pt-44">
        <section className="px-6 mb-20">
          <div className="max-w-4xl border-l-4 border-red-600 pl-8">
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">THE <span className="text-red-600">MATH.</span></h1>
            <p className="text-slate-500 uppercase font-bold text-xs mt-4">Forensic Comparison vs. Traditional Consulting</p>
          </div>
        </section>

        {/* The Comparison Content we moved from Home */}
        <ComparisonGrid />

        <section className="py-20 text-center flex flex-col items-center">
            <Database className="text-red-600 mb-4 animate-pulse" />
            <span className="font-mono text-[8px] tracking-[0.6em] uppercase text-slate-500">SYSTEM ARCHITECTURE VERIFIED // NODE-SEC-04</span>
        </section>
      </main>
      <Footer />
    </div>
  );
}
