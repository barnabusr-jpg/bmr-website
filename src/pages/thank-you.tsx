import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added missing import
import { CheckCircle2, FileText, Activity } from "lucide-react";
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      <main className="py-32 px-6 container mx-auto max-w-4xl text-center">
        <CheckCircle2 className="h-20 w-20 text-[#14b8a6] mx-auto mb-8" />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Observation Recorded.</h1>
        <p className="text-slate-400 text-xl mb-16 max-w-2xl mx-auto">
          We are synthesizing your data against our longitudinal benchmarks to identify your &quot;Promise Gap&trade;.&quot;
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <Card className="p-8 bg-slate-900/40 border-slate-800 border-2">
            <FileText className="text-[#14b8a6] mb-4" />
            <h3 className="text-lg font-bold mb-2">The Synthesis Report</h3>
            <p className="text-sm text-slate-400">Your custom report mapping ROI leaks and hidden labor costs will arrive via email within 24 hours.</p>
          </Card>
          <Card className="p-8 bg-slate-900/40 border-slate-800 border-2">
            <Activity className="text-[#14b8a6] mb-4" />
            <h3 className="text-lg font-bold mb-2">Longitudinal Context</h3>
            <p className="text-sm text-slate-400">Our data confirms that technical metrics often mask operational decay. We help recover the value you&apos;ve already paid for.</p>
          </Card>
        </div>
        <div className="mt-20">
          <Link href="/">
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:border-[#14b8a6] px-10 h-12">
              Return to Insights
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
