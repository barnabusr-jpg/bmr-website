import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen } from "lucide-react";

export default function FieldGuidePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="mx-auto w-fit p-3 rounded-lg bg-red-600/10 mb-6">
                <BookOpen className="h-7 w-7 text-red-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white uppercase italic">
                Field Guide <span className="text-slate-800">Overview</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto italic">
                An executive orientation to how trust, governance, and value erode when 
                AI-enabled systems behave differently than expected.
              </p>
            </div>

            <div className="grid gap-8">
              <Card className="p-8 border-2 border-slate-900 bg-slate-900/20 backdrop-blur-md rounded-none">
                <h2 className="text-2xl font-black mb-4 text-white uppercase tracking-tight italic">Why This Guide Exists</h2>
                <p className="text-slate-400 mb-4 leading-relaxed uppercase text-xs tracking-widest">
                  Organizations rarely struggle with AI because of tooling. They struggle because:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-slate-500 mb-6 font-mono text-sm uppercase">
                  <li>People do not trust decisions they cannot understand</li>
                  <li>Governance loses influence under pressure</li>
                  <li>Value becomes difficult to see before confidence erodes</li>
                </ul>
                <p className="text-[10px] italic text-red-600 font-bold uppercase tracking-[0.2em]">
                  // The Field Guide provides shared language to recognize these patterns early.
                </p>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Human–AI Interaction", desc: "How people experience AI-influenced decisions in real operational contexts." },
                  { title: "Adoption Value", desc: "Whether AI efforts translate into sustained organizational value over time." },
                  { title: "Trust, Govern, Evolve", desc: "Recurring patterns observed as AI initiatives mature." }
                ].map((item, i) => (
                  <div key={i} className="p-5 border border-slate-900 rounded-none bg-slate-900/40 group hover:border-red-600/50 transition-colors">
                    <h3 className="font-black mb-2 text-white text-xs uppercase tracking-widest italic">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-snug uppercase">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Card className="p-8 bg-red-600/5 border-dashed border-2 border-red-600/20 rounded-none">
                <h2 className="text-2xl font-black mb-4 text-white uppercase italic">Next Steps</h2>
                <p className="mb-6 text-slate-400 leading-relaxed text-sm uppercase tracking-wider">
                  If misalignment between vision and delivery is suspected, the first step is awareness.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact"
                    className="inline-flex items-center justify-center h-14 px-8 text-[10px] font-black uppercase tracking-[0.3em] bg-red-600 text-white transition-all hover:bg-white hover:text-black shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                  >
                    Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  
                  <Link 
                    href="/"
                    className="inline-flex items-center justify-center h-14 px-8 text-[10px] font-black uppercase tracking-[0.3em] border border-slate-800 text-slate-400 hover:text-white hover:border-white transition-all"
                  >
                    Return Home <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
