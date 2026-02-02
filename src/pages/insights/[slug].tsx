import React from 'react';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity } from "lucide-react";
import Link from "next/link";

// This object maps your slugs to the content from your Word Doc
const articleData: Record<string, any> = {
  "real-trust-gap": {
    title: "The Real Trust Gap",
    category: "Trust",
    intro: "Trust in AI is not achieved solely through compliance; it is cultivated through transparency. When oversight is visible, accountability becomes real, not implied.",
    sections: [
      {
        heading: "Making Oversight Visible",
        body: "Organizations often cite trust as a key component of their culture, yet few can demonstrate where it lives within their systems. Decisions made within applications often provide little visibility into intent.",
        bullets: ["Clear decision-making criteria", "Identified oversight owners", "Regular transparency reporting"]
      }
    ]
  },
  "adoption-value-system": {
    title: "The Adoption Value System (AVS)",
    category: "Govern",
    intro: "Proving value is an AI adoption accelerator. The AVS turns intent into measurable impact by aligning delivery, governance, and performance.",
    sections: [
      {
        heading: "Balancing Lag and Lead Metrics",
        body: "While organizations focus on savings and revenue, AVS brings leading indicators—like workforce confidence and model reliability—into the picture.",
        bullets: ["Value Identification", "Impact Measurement", "ROI Tracking"]
      }
    ]
  },
  "executive-readiness-ai": {
    title: "Executive Readiness for AI",
    category: "Evolve",
    intro: "Technology mastery is not AI leadership. Leadership is about shaping the systems that govern how technology is used.",
    sections: [
      {
        heading: "Focus on Strategic Oversight",
        body: "Executives often view AI as something to manage, not something to lead. This mindset limits oversight to cost and compliance rather than accountability.",
        bullets: ["Map active AI projects", "Define decision boundaries", "Align reporting cadence"]
      }
    ]
  }
};

export default function SignalEntry() {
  const router = useRouter();
  const { slug } = router.query;
  
  // Look up the article based on the URL slug
  const article = articleData[slug as string];

  // Safeguard for loading state or missing articles
  if (!article) return <div className="bg-[#020617] min-h-screen" />;

  return (
    <div className="bg-[#020617] text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/insights" className="text-[#14b8a6] text-sm font-light mb-12 inline-flex items-center gap-2 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Signal Architecture
          </Link>

          <header className="mb-16 space-y-6">
            <div className="flex items-center gap-3 text-[#14b8a6]">
              <Activity className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{article.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight italic">
              {article.title}
            </h1>
          </header>

          <article className="space-y-12">
            <div className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed italic border-l-2 border-[#14b8a6] pl-6">
              {article.intro}
            </div>
            
            <div className="space-y-12 text-lg text-slate-300 font-light leading-relaxed">
              {article.sections.map((section: any, i: number) => (
                <div key={i} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{section.heading}</h2>
                  <p>{section.body}</p>
                  <ul className="space-y-4 pt-4">
                    {section.bullets.map((bullet: string, j: number) => (
                      <li key={j} className="flex gap-4 items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#14b8a6] mt-2.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
