import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          BMR <span className="text-[#14b8a6]">Solutions</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Strategic Advisory for the AI Era. We help leaders close the Promise Gap 
          between AI potential and operational reality.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button 
            onClick={() => window.location.href = '/diagnostic'}
            className="bg-[#14b8a6] text-black font-bold h-14 px-8 text-lg hover:bg-[#0f9688]"
          >
            Start Diagnostic <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Visualizing the Promise Gap</h2>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border-2 border-slate-800 shadow-2xl">
            <video 
              controls 
              className="w-full aspect-video bg-black"
              poster="/video-poster.jpg"
            >
              <source src="YOUR_VERCEL_BLOB_URL_HERE" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
