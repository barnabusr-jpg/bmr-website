"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

export default function MethodologyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
      <Header />
      
      <main className="flex-grow pt-48 pb-20 px-6">
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* SECTION 1: THE HERO */}
          <section id="forensic-integrity" style={{ scrollMarginTop: '140px' }} className="text-left space-y-8 border-l-4 border-red-600 pl-12">
            <h1 className="text-[80px] md:text-[110px] font-black uppercase italic tracking-tighter leading-[0.8">
              The Key <br /> To Forensic <br /> <span className="text-red-600">Integrity.</span>
            </h1>
            <div className="text-slate-400 text-2xl italic max-w-3xl leading-relaxed font-medium space-y-6">
              <p>BMR Solutions identifies the fractures where artificial intelligence falls short of your strategic goals.</p>
              <p className="text-white">These fractures cost organizations millions in rework and legal exposure while eroding trust.</p>
            </div>
          </section>

          {/* SECTION 2: THE INTEGRITY TRIAD */}
          <section id="integrity-triad" style={{ scrollMarginTop: '140px' }} className="py-20 border-y border-slate-900">
            <div className="mb-16 text-left">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-6">
                The <span className="text-red-600">Integrity Triad</span>
              </h2>
            </div>
            {/* ... rest of map code ... */}
          </section>

          {/* SECTION 3: REWORK TAX */}
          <section id="rework-tax" style={{ scrollMarginTop: '140px' }} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start py-12 text-left">
             {/* ... content ... */}
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
