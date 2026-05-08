"use client";
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ... keep metadata and articleData objects ... */

export default function SignalEntry() {
  const router = useRouter();
  const { slug } = router.query;
  const article = articleData[slug as string];

  if (!article) return (
    <div className="bg-[#020617] min-h-screen flex items-center justify-center font-mono text-red-600 italic uppercase">
      <Activity className="animate-spin mb-4" /> ACCESSING_SIGNAL_VAULT...
    </div>
  );

  const pageSEO = metadata[slug as string] || { title: "Insight | BMR Solutions", description: "Forensic perspectives on AI systems." };

  return (
    <div className="bg-[#020617] text-white min-h-screen flex flex-col font-sans italic selection:bg-teal-500/30">
      <Head>
        <title>{pageSEO.title}</title>
        <meta name="description" content={pageSEO.description} />
      </Head>

      <Header />
      
      <main className="flex-grow pt-48 pb-24 px-6 text-left">
        <div className="max-w-3xl mx-auto">
          {/* 🛡️ NAVIGATION FIXED: Points to Vault instead of Home Anchor */}
          <Link 
            href="/briefings" 
            className="text-[#14b8a6] text-[10px] font-black uppercase tracking-[0.3em] mb-12 inline-flex items-center gap-3 hover:opacity-70 transition-all italic border-b border-[#14b8a6]/20 pb-2"
          >
            <ArrowLeft className="h-4 w-4" /> RETURN TO EVIDENCE VAULT
          </Link>

          <header className="mb-16 space-y-6">
            <div className="flex items-center gap-3 text-[#14b8a6]">
              <Activity className="h-5 w-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Lens: {article.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-white">
              {article.title}
            </h1>
          </header>

          <article className="space-y-12">
            <div className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed border-l border-slate-800 pl-8 italic">
              {article.intro}
            </div>
            
            <div className="space-y-16 text-lg text-slate-300 font-light leading-relaxed">
              {article.sections.map((section: any, i: number) => (
                <div key={i} className="space-y-6">
                  <h2 className="text-xl font-bold text-white tracking-widest uppercase border-b border-slate-900 pb-2 inline-block">
                    {section.heading}
                  </h2>
                  <p className="opacity-90">{section.body}</p>
                  {section.bullets && (
                    <ul className="grid gap-4 pt-4">
                      {section.bullets.map((bullet: string, j: number) => (
                        <li key={j} className="flex gap-4 items-start bg-slate-900/20 p-4 border border-slate-900/50">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#14b8a6] mt-2.5 shrink-0" />
                          <span className="text-sm tracking-tight">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </article>

          <section className="mt-20 pt-10 border-t border-slate-900">
             <p className="text-slate-500 text-sm font-light">
               This briefing is part of the BMR Forensic Protocol. Strategic drift is a manageable variable when identified early.
             </p>
          </section>

          <footer className="mt-24">
            <div className="bg-[#14b8a6]/5 p-12 border border-[#14b8a6]/20 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]" />
              <h3 className="text-2xl font-bold tracking-tight text-white uppercase">Detecting these signals?</h3>
              <p className="text-slate-400 font-light max-w-md mx-auto text-sm">Restore alignment before systemic drift hardens into a permanent outcome.</p>
              <Button asChild className="bg-[#14b8a6] hover:bg-white text-[#020617] font-black h-14 px-10 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded-none shadow-2xl">
                <Link href="/pulse-check">INITIALIZE RECOVERY</Link>
              </Button>
            </div>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
