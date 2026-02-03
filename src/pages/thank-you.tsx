import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, AlertTriangle, TrendingUp } from "lucide-react";
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Header />
      <main className="py-24 px-6 container mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="text-[#14b8a6] font-mono text-sm tracking-widest uppercase mb-4">Diagnostic Complete</h2>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Observation Recorded. <br/><span className="text-slate-500">Your Synthesis is in progress.</span></h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-8 bg-slate-900/40 border-slate-800 border-2">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-[#14b8a6]" size={20} />
                <h3 className="text-xl font-bold">What happens next?</h3>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">Our system is mapping your signals against longitudinal data. Your <strong>Promise Gap&trade; Analysis</strong> will identify where AI investment is being consumed by manual human labor.</p>
              <Button className="bg-[#14b8a6] text-black font-bold h-12 px-6 hover:bg-[#0d9488]">Review the Field Guide <Download className="ml-2" size={18} /></Button>
            </Card>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-slate-800 bg-slate-950/50">
                <AlertTriangle className="text-yellow-500 mb-2" size={24} />
                <p className="text-sm text-slate-400 italic font-serif leading-relaxed">&quot;Technical success metrics often mask operational decay. Scores below 3.0 indicate ROI leaking into verification labor.&quot;</p>
              </div>
              <div className="p-6 rounded-lg border border-slate-800 bg-slate-950/50 flex flex-col justify-center">
                <h4 className="font-bold text-[#14b8a6] mb-1">Advisory Review</h4>
                <p className="text-sm text-slate-400">Discuss friction points with a strategist to recover stranded capital.</p>
              </div>
            </div>
          </div>

          <Card className="p-8 bg-[#14b8a6] text-black border-none flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4 leading-tight">Bridge the Gap.</h3>
              <p className="text-black/80 text-sm mb-8 leading-relaxed">Schedule a 15-minute <strong>Synthesis Briefing</strong> to interpret your scores and identify immediate recovery steps.</p>
            </div>
            <Link href="/contact"><Button className="w-full bg-black text-white font-bold h-14 hover:bg-slate-800 transition-colors">Book Briefing <ArrowRight className="ml-2" size={18} /></Button></Link>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
