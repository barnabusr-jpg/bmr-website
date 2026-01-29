import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialVideo from "@/components/CommercialVideo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Users } from "lucide-react";

export default function StrategicAdvisoryPage() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Header />
      
      <main>
        {/* Hero Section for the Video */}
        <section className="pt-20 pb-12 px-6">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Strategic <span className="text-[#14b8a6]">Advisory</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Bridging the Promise Gap through systemic AI architecture and high-fidelity governance.
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <CommercialVideo src="https://uuyq3t7kfckwh0je.public.blob.vercel-storage.com/bmr-commercial.mp4" />
          </div>
        </section>

        {/* Advisory Pillars */}
        <section className="py-24 px-6 bg-slate-900/30 border-y border-slate-800/50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <BarChart3 className="h-10 w-10 text-[#14b8a6]" />
              <h3 className="text-xl font-bold text-white">Systemic Mapping</h3>
              <p className="text-slate-400">We identify structural leakage in AI implementations that prevent value realization.</p>
            </div>
            <div className="space-y-4">
              <ShieldCheck className="h-10 w-10 text-[#14b8a6]" />
              <h3 className="text-xl font-bold text-white">Trust Architecture</h3>
              <p className="text-slate-400">Designing the AVS and IGF layers to ensure AI systems remain responsible and resilient.</p>
            </div>
            <div className="space-y-4">
              <Users className="h-10 w-10 text-[#14b8a6]" />
              <h3 className="text-xl font-bold text-white">Executive Alignment</h3>
              <p className="text-slate-400">Bridging the gap between technical promise and boardroom expectations.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-white">Ready to bridge the Promise Gap?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold px-8 h-12">
                <Link href="/promise-gap/diagnostic">Take the Diagnostic</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-700 text-white hover:bg-slate-800 px-8 h-12">
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Advisory <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
