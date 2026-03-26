import React from 'react';
import Head from 'next/head';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck, Target, Users } from "lucide-react";

export default function Methodology() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600/30">
      <Head>
        <title>BMR SOLUTIONS | METHODOLOGY</title>
      </Head>
      <Header />
      
      <main className="pt-48 pb-20 px-6 text-white">
        <div className="max-w-6xl mx-auto text-center mb-32">
          <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8]">
            RE-ANCHORING AI TO <br /> <span className="text-red-600 font-black">STRATEGIC INTENT.</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto mt-12 font-light italic leading-relaxed">
            BMR Solutions was founded to bridge the &quot;Promise Gap.&quot; We address the space where technical AI deployment fails to translate into realized operational value.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center mb-40">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tight mb-8">THE FRICTION TAX</h2>
            <p className="text-slate-400 leading-relaxed mb-6 italic font-light">
              Most organizations view AI as a technical installation. We view it as an organizational evolution. 
              When AI systems are bolted on rather than integrated, they create a friction tax. This is the hidden human labor required to verify, fix, and oversee the machine.
            </p>
            <p className="text-slate-400 leading-relaxed italic font-light">
              We assist leaders in identifying these inefficiencies and recovering stranded capital through longitudinal observation and systemic re-anchoring.
            </p>
          </div>

          <div className="border border-slate-900 bg-slate-900/20 p-10 space-y-10">
            {[
              { icon: ShieldCheck, title: "TRUST-FIRST ARCHITECTURE", desc: "Reducing manual verification through behavioral predictability." },
              { icon: Target, title: "OPERATIONAL RESONANCE", desc: "Aligning system outputs with brand-level standards." },
              { icon: Users, title: "HUMAN-CENTRIC EVOLUTION", desc: "Moving staff from verification labor to high-value work." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <item.icon className="h-6 w-6 text-red-600 shrink-0" />
                <div>
                  <h4 className="text-white font-black uppercase italic tracking-widest text-sm mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm italic leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="text-center py-20 border-t border-slate-900">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-12 italic">READY TO SEE THE DATA?</h2>
          <button 
            onClick={() => window.location.href = '/pulse-check'}
            className="bg-red-600 text-white font-black py-6 px-16 uppercase text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-2xl shadow-red-900/20"
          >
            BEGIN DIAGNOSTIC SEQUENCE
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
