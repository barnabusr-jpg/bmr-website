"use client";
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

// 🛡️ MOVED TO TOP LEVEL TO PREVENT REFERENCE ERROR
const metadata: Record<string, any> = {
  "real-trust-gap": { title: "The Real Trust Gap | BMR Solutions", description: "A forensic look at LLM seat utilization." },
  "adoption-value-system": { title: "The Adoption Value System (AVS) | BMR Solutions", description: "Aligning technical tools with operational reality." },
  "executive-readiness": { title: "Executive Readiness | BMR Solutions", description: "Building the Safeguard Loop." }
};

const articleData: Record<string, any> = {
  "real-trust-gap": {
    title: "The Mirage of Adoption: Why LLM Seat Utilization Is a False Metric",
    category: "HAI",
    intro: "Trust is a constant mismatch between a human's mental model and a system's output.",
    sections: [
      { heading: "The Symptom: The Busy AI", body: "Employees are logged into the system, but they do not rely on it. They are watching it to make sure it does not make a mistake." },
      { heading: "The Forensic Intervention", body: "Delta Measurement: Compare task time by hand vs AI.", bullets: ["Delta Measurement", "Breakpoint Identification", "Rail Building"] }
    ]
  },
  "adoption-value-system": {
    title: "The Ghost in the Machine: Why Activity Volume Is Not Value",
    category: "AVS",
    intro: "Activity is not achievement. Volume without impact is digital waste.",
    sections: [
      { heading: "The Symptom: High Volume but Low Impact", body: "If the AI produces work no one reads, you are only increasing waste." }
    ]
  },
  "executive-readiness": {
    title: "The Architecture of Resilience: Building the Safeguard Loop",
    category: "IGF",
    intro: "Building an architecture that stays under your control.",
    sections: [
      { heading: "The Symptom: Hidden Decay", body: "Without a plan, your AI becomes a liability." }
    ]
  }
};

export default function SignalEntry() {
  const router = useRouter();
  const { slug } = router.query;
  
  // 🛡️ LOADING STATE: Prevents build-time crash
  if (router.isFallback || !slug) return <div className="bg-[#020617] min-h-screen" />;

  const article = articleData[slug as string];
  if (!article) return <div className="bg-[#020617] min-h-screen flex items-center justify-center text-red-600 font-mono italic uppercase">404_SIGNAL_NOT_FOUND</div>;

  const pageSEO = metadata[slug as string] || { title: "Insight | BMR Solutions" };

  return (
    <div className="bg-[#020617] text-white min-h-screen flex flex-col font-sans italic">
      <Head><title>{pageSEO.title}</title></Head>
      <Header />
      <main className="flex-grow pt-40 pb-24 px-6 text-left">
        <div className="max-w-3xl mx-auto">
          <Link href="/briefings" className="text-[#14b8a6] text-[10px] font-black uppercase tracking-[0.2em] mb-12 inline-flex items-center gap-2 hover:opacity-70 italic border-b border-[#14b8a6]/20 pb-2">
            <ArrowLeft className="h-4 w-4" /> RETURN TO EVIDENCE VAULT
          </Link>
          <header className="mb-16 space-y-6">
            <div className="flex items-center gap-3 text-[#14b8a6]">
              <Activity className="h-5 w-5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Lens: {article.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight italic">{article.title}</h1>
          </header>
          <article className="space-y-12">
            <div className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed italic border-l border-slate-800 pl-8">{article.intro}</div>
            {article.sections.map((s: any, i: number) => (
              <div key={i} className="space-y-6">
                <h2 className="text-xl font-bold text-white tracking-widest uppercase italic border-b border-slate-900 pb-2 inline-block">{s.heading}</h2>
                <p className="opacity-90">{s.body}</p>
              </div>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
