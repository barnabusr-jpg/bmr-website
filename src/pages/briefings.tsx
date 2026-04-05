"use client";
import React from "react";
import Header from "@/components/Header";
import Link from "next/link";

export default function Briefings() {
  const articles = [
    { slug: "logic-decay-2026", title: "Forensic Analysis of Logic Decay", date: "April 01, 2026" },
    { slug: "shadow-ai-emergence", title: "The Emergence of Shadow AI Shear", date: "March 15, 2026" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      <main className="pt-48 px-6 container mx-auto">
        <h1 className="text-7xl font-black uppercase italic tracking-tighter mb-12">Forensic Briefings</h1>
        <div className="grid gap-4">
          {articles.map((a) => (
            <Link key={a.slug} href={`/briefings/${a.slug}`} className="p-8 border border-slate-900 bg-slate-950 hover:border-red-600 transition-all flex justify-between items-center group">
               <div>
                  <span className="text-red-600 font-mono text-[10px] uppercase mb-2 block">{a.date}</span>
                  <h2 className="text-2xl font-black uppercase italic group-hover:text-white text-slate-400">{a.title}</h2>
               </div>
               <span className="text-red-600">VIEW DOSSIER</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
