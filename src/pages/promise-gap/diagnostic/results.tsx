import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Shield, Zap, Target } from "lucide-react";
import Link from "next/link";

export default function DiagnosticResults() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="max-w-3xl w-full">
          {/* Success Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-[#14b8a6]/10 p-3">
                <CheckCircle2 className="h-12 w-12 text-[#14b8a6]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Signals Received.
            </h1>
            <p className="text-xl text-slate-400">
              Your Promise Gap profile is being analyzed by our Strategic Advisory team.
            </p>
          </div>

          {/* Strategic Next Steps Card */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-[#14b8a6] uppercase tracking-[0.2em] mb-8">
              What Happens Next
            </h2>
            
            <div className="grid gap-8 mb-10">
              <div className="flex gap-4">
                <div className="mt-1"><Target className="h-5 w-5 text-[#14b8a6]" /></div>
                <div>
                  <h3 className="text-white font-medium">Gap Analysis</h3>
                  <p className="text-slate-400 text-sm">We map your signals against the BMR Systemic AI framework to identify structural leakage.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Shield className="h-5 w-5 text-[#14b8a6]" /></div>
                <div>
                  <h3 className="text-white font-medium">Risk Review</h3>
                  <p className="text-slate-400 text-sm">Our team evaluates your AVS and IGF layers for immediate trust-gap vulnerabilities.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Zap className="h-5 w-5 text-[#14b8a6]" /></div>
                <div>
                  <h3 className="text-white font-medium">Direct Outreach</h3>
                  <p className="text-slate-400 text-sm">Expect a direct communication to schedule a deep-dive advisory session.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-800">
              <Button asChild className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold px-8 h-12 flex-1">
                <Link href="/strategic-advisory" className="flex items-center justify-center gap-2">
                  Explore Advisory Services <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-slate-700 text-white hover:bg-slate-800 h-12 flex-1">
                <Link href="/">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
