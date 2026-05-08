"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

export default function MethodologyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30 text-left">
      <Header />
      <main className="flex-grow pt-48 pb-20 px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          
          <header className="border-l-8 border-red-600 pl-10">
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
              Node <br /><span className="text-slate-800">Triangulation.</span>
            </h1>
          </header>

          {/* ... Other Methodology Content Sections ... */}

          {/* 🛡️ THE VAULT CARD - ROUTE FIXED */}
          <section className="bg-white p-12 md:p-20 text-left shadow-2xl border-l-[20px] border-red-600">
            <div className="max-w-3xl space-y-8">
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-black leading-none">The Evidence Vault</h2>
              <p className="text-2xl text-slate-600 leading-relaxed italic font-bold uppercase">Access protected forensic briefings to see where systemic decay occurs in enterprise AI.</p>
              
              <button 
                onClick={() => router.push('/briefings')} 
                className="inline-flex items-center gap-6 py-6 px-12 bg-red-600 hover:bg-black text-white font-black uppercase italic transition-all tracking-[0.3em] text-sm shadow-xl"
              >
                ACCESS THE VAULT <ChevronRight size={24} />
              </button>
            </div>
          </section>

          {/* FINAL CTA UNIT */}
          <div className="text-center py-20 border-t border-slate-900">
            <button 
              onClick={() => router.push('/pulse-check')}
              className="bg-white text-black py-8 px-16 font-black uppercase italic tracking-[0.4em] text-lg hover:bg-red-600 hover:text-white transition-all border-l-[15px] border-red-600"
            >
              INITIATE_DIAGNOSTIC
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
