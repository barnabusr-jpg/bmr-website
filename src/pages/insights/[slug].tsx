import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

// SEO & Social Metadata
const metadata: Record<string, any> = {
  "real-trust-gap": {
    title: "The Real Trust Gap | BMR Solutions",
    description: "A forensic look at why LLM seat utilization is a false metric and how the Promise Gap creates shadow labor."
  },
  "adoption-value-system": {
    title: "The Adoption Value System (AVS) | BMR Solutions",
    description: "Aligning technical tools with operational reality. How to turn AI activity into measurable business impact."
  },
  "executive-readiness": {
    title: "Executive Readiness & AI Resilience | BMR Solutions",
    description: "Building the Safeguard Loop. How to prevent systemic drift and maintain leadership control over AI evolution."
  }
};

// BMR Signal Architecture - Proprietary Forensic Framework Content
const articleData: Record<string, any> = {
  "real-trust-gap": {
    title: "The Mirage of Adoption: Why LLM Seat Utilization Is a False Metric",
    category: "HAI",
    intro: "Trust is a constant mismatch between a human's mental model and a system's output. We identify where the Promise Gap creates shadow labor.",
    sections: [
      {
        heading: "The Symptom: The Busy AI",
        body: "In many medium-sized companies, leaders measure the success of artificial intelligence by a simple dashboard. Technical officers often point to a high number of assigned seats as proof that the company is changing. However, a forensic review of the actual work often reveals a different reality. This is the Promise Gap. While employees fill seats, the actual gain in work output is very small. Employees are logged into the system, but they do not rely on it. Instead, they are watching the system to make sure it does not make a mistake.",
      },
      {
        heading: "The Pathology: Expectation Continuity",
        body: "When a large language model makes a mistake in a high-stakes report, the human’s mental model breaks. Even if the human catches the error, the system is damaged. The employee now enters a state of high caution. They spend fifteen minutes asking the AI for help, then spend 20 minutes checking the results for errors. The AI's efficiency is traded for shadow labor—work that looks productive but creates no new value.",
      },
      {
        heading: "The Forensic Intervention",
        body: "To stabilize this drift, BMR implements a protocol centered on three specific actions:",
        bullets: [
          "Delta Measurement: Compare the time it takes to do a task by hand against the time it takes with an AI, including the 'checking' time.",
          "Breakpoint Identification: Find the exact moments where the logic of the system fails to meet the expert knowledge of the user.",
          "Rail Building: Move away from general AI tools toward structured workflows that provide users with clear evidence for each result."
        ]
      }
    ]
  },
  "adoption-value-system": {
    title: "The Ghost in the Machine: Why Activity Volume Is Not Value",
    category: "AVS",
    intro: "Activity is not an achievement. Aligning technical tools with operational reality is where one finds true value.",
    sections: [
      {
        heading: "The Symptom: High Volume but Low Impact",
        body: "Many organizations celebrate when they see a massive increase in the amount of content their teams produce. The belief is that this volume equals productivity. This is often a mistake. You have created a high level of activity but not a high level of impact. If the AI is producing work that no one reads or work that does not solve a business problem, you are only increasing digital waste.",
      },
      {
        heading: "The Pathology: Operational Resonance",
        body: "System drift begins when companies allow AI to run without a clear plan. The AI starts solving small problems that do not matter, while the large problems remain. This creates a loop of useless activity. Employees feel busy, but the company does not reap results. This is a governance failure.",
      },
      {
        heading: "The Forensic Intervention",
        body: "We resolve this through the Adoption Value System (AVS):",
        bullets: [
          "Strategic Intent Audit: Review every automated workflow. If the task does not support the company's mission, stop the automation.",
          "Value Translation Tracking: Ensure the final output translates into a faster sale or a better product, not just more text for humans to read.",
          "Govern Lens Implementation: Audit workflows to ensure automated action aligns with leadership's strategic goals."
        ]
      }
    ]
  },
  "executive-readiness": {
    title: "The Architecture of Resilience: Building the Safeguard Loop",
    category: "IGF",
    intro: "Building an architecture that stays under your control so that your company can grow with confidence is a must.",
    sections: [
      {
        heading: "The Symptom: The Hidden Decay of Systems",
        body: "A system that works perfectly today might fail in six months because data and human needs change. Many leaders believe they can install an AI tool and walk away. Without a plan, your AI becomes a liability. You might not notice the failure until the system has already made thousands of poor decisions.",
      },
      {
        heading: "The Pathology: Decision Explainability",
        body: "When a system evolves without a 'Safeguard Loop,' it becomes a black box. No one knows how it reaches its conclusions. If you cannot explain a decision to a client or regulator, you cannot defend your business. You are no longer leading the company; you are following the machine.",
      },
      {
        heading: "The Forensic Intervention",
        body: "We implement the Evolve Lens to ensure long-term stability:",
        bullets: [
          "Forensic Capacity Audit: Reconstruct the path of a specific decision from the past to test system transparency.",
          "Safeguard Loop Embedment: Create a cycle of checks where humans audit system changes against strategic intent.",
          "Defensibility Focus: Build an architecture where every system evolution is documented and transparent to the leadership team."
        ]
      }
    ]
  }
};

export default function SignalEntry() {
  const router = useRouter();
  const { slug } = router.query;
  const article = articleData[slug as string];

  // Safeguard: Ensure build doesn't crash if slug is undefined during static generation
  if (!article) return <div className="bg-[#020617] min-h-screen" />;

  const pageSEO = metadata[slug as string] || { title: "Insight | BMR Solutions", description: "Forensic perspectives on AI systems." };

  return (
    <div className="bg-[#020617] text-white min-h-screen flex flex-col font-sans">
      <Head>
        <title>{pageSEO.title}</title>
        <meta name="description" content={pageSEO.description} />
        <meta property="og:title" content={pageSEO.title} />
        <meta property="og:description" content={pageSEO.description} />
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
      
      <main className="flex-grow pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Internal Navigation */}
          <Link 
            href="/#insights" 
            className="text-[#14b8a6] text-sm font-bold uppercase tracking-[0.2em] mb-12 inline-flex items-center gap-2 hover:opacity-70 transition-all italic"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Signal Architecture
          </Link>

          {/* Article Header */}
          <header className="mb-16 space-y-6">
            <div className="flex items-center gap-3 text-[#14b8a6]">
              <Activity className="h-5 w-5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Lens: {article.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.95] text-white">
              {article.title}
            </h1>
          </header>

          {/* Article Body Section */}
          <article className="space-y-12">
            <div className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed italic border-l border-slate-800 pl-8">
              {article.intro}
            </div>
            
            <div className="space-y-16 text-lg text-slate-300 font-light leading-relaxed">
              {article.sections.map((section: any, i: number) => (
                <div key={i} className="space-y-6">
                  <h2 className="text-xl font-bold text-white tracking-widest uppercase italic border-b border-slate-900 pb-2 inline-block">
                    {section.heading}
                  </h2>
                  <p className="opacity-90">{section.body}</p>
                  {section.bullets && (
                    <ul className="grid gap-4 pt-4">
                      {section.bullets.map((bullet: string, j: number) => (
                        <li key={j} className="flex gap-4 items-start italic bg-slate-900/20 p-4 border border-slate-900/50">
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

          {/* Forensic Bottom Line */}
          <section className="mt-20 pt-10 border-t border-slate-900">
             <p className="text-slate-500 text-sm italic font-light">
               This briefing is part of the BMR Forensic Protocol. Strategic drift is a manageable variable when identified early.
             </p>
          </section>

          {/* Footer Call to Action */}
          <footer className="mt-24">
            <div className="bg-[#14b8a6]/5 p-12 rounded-none border border-[#14b8a6]/20 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]" />
              <h3 className="text-2xl font-bold tracking-tight text-white italic uppercase">
                Detecting these signals?
              </h3>
              <p className="text-slate-400 font-light max-w-md mx-auto italic text-sm">
                Restore alignment before systemic drift hardens into a permanent outcome.
              </p>
              <Button asChild className="bg-[#14b8a6] hover:bg-white text-[#020617] font-black h-14 px-10 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded-none shadow-2xl">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
            </div>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
