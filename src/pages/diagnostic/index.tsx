import React from "react";
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14b8a6]/10 border border-[#14b8a6]/20 text-[#14b8a6] text-xs font-bold uppercase tracking-widest mb-8">
            <Zap size={14} /> The Promise Gap™ Diagnostic
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 font-display leading-tight">
            Stop Leaking ROI on <br/><span className="text-[#14b8a6]">Stranded AI Assets.</span>
          </h1>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Most AI initiatives report technical success while operational value decays. Identify the "Friction Tax" killing your P&L.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push('/diagnostic')} 
              className="bg-[#14b8a6] text-black font-bold h-16 px-10 text-lg hover:bg-[#0d9488] transition-all"
            >
              Begin ROI Recovery Audit <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust/Govern/Evolve Teaser */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/50">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <ShieldCheck className="text-[#14b8a6]" size={32} />
            <h3 className="text-xl font-bold">Trust</h3>
            <p className="text-slate-400 text-sm">Eliminate the "Shadow Work" and manual verification labor that hides negative ROI.</p>
          </div>
          <div className="space-y-4">
            <BarChart3 className="text-[#14b8a6]" size={32} />
            <h3 className="text-xl font-bold">Govern</h3>
            <p className="text-slate-400 text-sm">Institutionalize AI reliability so performance doesn't depend on a single "Sue."</p>
          </div>
          <div className="space-y-4">
            <Zap className="text-[#14b8a6]" size={32} />
            <h3 className="text-xl font-bold">Evolve</h3>
            <p className="text-slate-400 text-sm">Recover stranded capital and pivot from technology spend to mission impact.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
