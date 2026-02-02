import React from 'react';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// High-authority article content mapped to your specific BMR lenses
const articleData: Record<string, any> = {
  "real-trust-gap": {
    title: "The Real Trust Gap",
    category: "Trust",
    intro: "Trust in AI is not achieved solely through compliance; it is cultivated through transparency. When individuals understand the reasoning behind decisions, confidence becomes part of the system itself.",
    sections: [
      {
        heading: "Making Oversight Visible",
        body: "Organizations often cite trust as a key component of their culture, yet few can demonstrate where it lives within their systems. Many AI-driven decisions are made within applications, providing employees with little to no visibility into inputs, data handling, or intent. When this happens, doubt creeps in, and people begin to question the system and its results.",
        bullets: [
          "Clear decision-making criteria",
          "Identified oversight owners",
          "Regular transparency reporting",
          "Accessible feedback loops",
          "Measurable stakeholder confidence"
        ]
      },
      {
        heading: "Trust as a Performance Signal",
        body: "Without trust, everything slows. Teams hesitate, projects stall, and innovation fades. Visibility counters this effect. When teams understand boundaries and decision logic, they can move faster without fear of mistakes. Trust becomes an operational signal, not just an ethical one."
      }
    ]
  },
  "adoption-value-system": {
    title: "Measuring What Matters: The AVS",
    category: "Govern",
    intro: "Proving value is an AI adoption accelerator. The Adoption Value System (AVS) turns intent into measurable impact by aligning delivery, governance, and performance.",
    sections: [
      {
        heading: "The Value Problem",
        body: "When organizations move into adoption mode without defining success, AI efforts stall. Without measurement, value becomes an assumption rather than an outcome. AVS connects vision to validation across four specific dimensions:",
        bullets: [
          "Value Identification",
          "Impact Measurement",
          "ROI Tracking",
          "Continuous Optimization"
        ]
      },
      {
        heading: "Balancing Lag and Lead Metrics",
        body: "Organizations tend to focus too heavily on lagging metrics: savings, revenue, and compliance. AVS brings leading indicators into the picture—workforce confidence, model reliability, and stakeholder engagement. This balanced view keeps leadership informed and teams motivated."
      }
    ]
  },
  "executive-readiness-ai": {
    title: "Leading Through Change: Executive Readiness",
    category: "Evolve",
    intro: "Technology mastery is not AI leadership. Leadership is about shaping the systems that govern how technology is used and ensuring strategy does not drift into chaos.",
    sections: [
      {
        heading: "Strategic Oversight",
        body: "Leaders do not need algorithmic expertise; they need structural clarity, policy boundaries, and resource priorities that define how teams operate. When these are clear, teams can move quickly within trusted limits.",
        bullets: [
          "Week 1: Map all active AI projects and owners",
          "Week 2: Define leadership decision boundaries",
          "Week 3: Establish communication and escalation channels",
          "Week 4: Align reporting cadence with objectives"
        ]
      },
      {
        heading: "Building Readiness Into the System",
        body: "Executive readiness is not a course; it is a discipline formed through rhythm: consistent briefings, transparent reviews, and candid debate. When those routines exist, AI becomes manageable instead of mysterious."
      }
    ]
  }
};

export default function SignalEntry() {
  const router = useRouter();
  const { slug } = router.query;
  const currentSlug = slug as string;
  const article = articleData[currentSlug];

  // Safeguard if the article doesn't exist
  if (!article) return <div className="bg-[#020617] min-h-screen" />;

  return (
    <div className="bg-[#020617] text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Internal Navigation */}
          <Link href="/" className="text-[#14b8a6] text-sm font-light mb-12 inline-flex items-center gap-2 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Signal Architecture
          </Link>

          {/* Article Header */}
          <header className="mb-16 space-y-6">
            <div className="flex items-center gap-3 text-[#14b8a6]">
              <Activity className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{article.category} Signal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight italic">
              {article.title}
            </h1>
          </header>

          {/* Article Body */}
          <article className="space-y-12">
            <div className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed italic border-l-2 border-[#14b8a6] pl-6">
              {article.intro}
            </div>
            
            <div className="space-y-16 text-lg text-slate-300 font-light leading-relaxed">
              {article.sections.map((section: any, i: number) => (
                <div key={i} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{section.heading}</h2>
                  <p>{section.body}</p>
                  {section.bullets && (
                    <ul className="space-y-4 pt-4">
                      {section.bullets.map((bullet: string, j: number) => (
                        <li key={j} className="flex gap-4 items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#14b8a6] mt-2.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </article>

          {/* Related Signals Footer Section */}
          <footer className="mt-24 pt-12 border-t border-slate-900">
            <div className="grid md:grid-cols-2 gap-6 mb-16 text-left">
              {Object.entries(articleData)
                .filter(([key]) => key !== currentSlug)
                .slice(0, 2)
                .map(([key, data]) => (
                  <Link key={key} href={`/insights/${key}`} className="group">
                    <div className="p-8 h-full rounded-xl border border-slate-800 bg-slate-900/20 hover:border-[#14b8a6]/40 transition-all duration-300">
                      <span className="text-[10px] font-bold text-[#14b8a6] uppercase tracking-widest block mb-3">Explore Next Signal</span>
                      <h4 className="text-xl text-white font-bold group-hover:text-[#14b8a6] transition-colors italic">{data.title}</h4>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Final Call to Action */}
            <div className="bg-slate-900/30 p-12 rounded-2xl border border-slate-800 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#14b8a6]" />
              <h3 className="text-2xl font-bold tracking-tight text-white italic">Detecting these signals in your organization?</h3>
              <p className="text-slate-400 font-light max-w-md mx-auto">
                Restore alignment before systemic drift hardens into a permanent outcome.
              </p>
              <Button asChild className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-14 px-10 text-lg shadow-lg shadow-[#14b8a6]/10">
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
