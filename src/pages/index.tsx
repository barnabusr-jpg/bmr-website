import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-[#14b8a6]/30">
      <Header />
      
      <main className="relative">
        {/* Hero Section - Reinforced Spacing */}
        <section className="pt-40 pb-24 px-6">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tighter leading-none">
              BMR <span className="text-[#14b8a6]">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Strategic Advisory for the AI Era. We help leaders close the Promise Gap 
              between AI potential and operational reality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => window.location.href = '/diagnostic'}
                className="bg-[#14b8a6] text-black font-bold h-16 px-10 text-xl hover:bg-[#0f9688] rounded-full transition-all hover:scale-105"
              >
                Start Diagnostic <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>

        {/* Video Section - Reinforced Dark Treatment */}
        <section className="py-24 bg-black/40 border-y border-white/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 tracking-tight text-slate-200">
              Visualizing the Promise Gap
            </h2>
            <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(20,184,166,0.2)] bg-black">
              <video controls playsInline preload="auto" className="w-full aspect-video shadow-2xl">
                <source 
                  src="https://uuyq3t7kfckwh0je.public.blob.vercel-storage.com/bmr-commercial.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
