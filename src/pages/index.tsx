import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialVideo from "@/components/CommercialVideo";
import Hero from "@/components/home/HeroHome";
import ValueBullets from "@/components/home/ValueBulletsHome";
import ServicesPreview from "@/components/home/ServicesPreviewHome";
import Outcomes from "@/components/home/OutcomesHome";
import ComparisonGrid from "@/components/home/ComparisonGrid";
import Insights from "@/components/home/InsightsHome";
import { Activity, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Header />
      <main>
        <Hero />
        <CommercialVideo src="https://uuyq3t7kfckwh0je.public.blob.vercel-storage.com/bmr-commercial.mp4" />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ValueBullets />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ServicesPreview />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <Outcomes />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ComparisonGrid />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        
        {/* TRIPLE-LENS ARCHITECTURE: Centered via the internal InsightsHome logic */}
        <Insights />
        
        {/* FINAL CONVERSION SECTION */}
        <section className="py-32 px-6 border-t border-slate-900 bg-[#020617]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 italic tracking-tighter uppercase text-white">
              Ready to Close the Gap?
            </h2>
            <p className="text-slate-400 text-lg mb-16 max-w-2xl mx-auto font-light leading-relaxed italic">
              Whether you are troubleshooting a current deployment or architecting a new initiative, 
              start with the BMR framework to eliminate shadow labor and value leak.
            </p>

            {/* Centered Single Card Layout */}
            <div className="max-w-2xl mx-auto text-left">
              <div className="p-10 bg-[#14b8a6]/5 border-2 border-[#14b8a6]/10 rounded-none flex flex-col justify-between hover:border-[#14b8a6]/40 transition-all duration-500 group relative overflow-hidden">
                {/* Hover DNA Highlight */}
                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500"></div>
                
                <div>
                  <Activity className="text-[#14b8a6] mb-6 h-10 w-10 group-hover:animate-pulse" />
                  <h3 className="text-2xl font-black mb-4 italic uppercase text-white tracking-tight">
                    System Diagnostic
                  </h3>
                  <p className="text-slate-300 mb-10 font-light leading-relaxed text-sm italic">
                    Ready for a forensic view? Our 12-question pulse check identifies your 
                    primary friction points and defines your System Archetype.
                  </p>
                </div>
                
                <button 
                  onClick={() => router.push('/diagnostic')}
                  className="inline-flex items-center justify-center gap-3 bg-[#14b8a6] text-[#020617] px-8 py-6 rounded-none font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-lg shadow-[#14b8a6]/10"
                >
                  Begin Diagnostic <ArrowRight size={14} />
                </button>
              </div>
              
              <p className="text-center mt-8 text-[9px] text-slate-700 font-black uppercase tracking-widest italic">
                Authorized Session: Forensic Review V3
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
