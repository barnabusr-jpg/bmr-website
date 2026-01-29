import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialVideo from "@/components/CommercialVideo";

import Hero from "@/components/home/HeroHome";
import ValueBullets from "@/components/home/ValueBulletsHome";
import ServicesPreview from "@/components/home/ServicesPreviewHome";
import Frameworks from "@/components/home/FrameworksHome";
import Outcomes from "@/components/home/OutcomesHome";
import Insights from "@/components/home/InsightsHome";
import FooterCTA from "@/components/home/FooterCTAHome";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />

        {/* Commercial Video */}
        <CommercialVideo src="https://uuyq3t7kfckwh0je.public.blob.vercel-storage.com/bmr-commercial.mp4" />

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        <ValueBullets />
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        <ServicesPreview />
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        <Frameworks />
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        <Outcomes />
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Field Guide Playbook Section */}
        <section className="py-24 bg-[#020617]">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            
            {/* Visual: Field Guide Cover */}
            <div className="relative group rounded-2xl overflow-hidden border border-slate-700 shadow-2xl transition-all duration-500 hover:border-[#14b8a6]/50">
              <img 
                src="/bmr-guide-cover.jpg" 
                alt="BMR Responsible AI System Field Guide"
                className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Content & Lead Capture */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  The Playbook for <span className="text-[#14b8a6]">Responsible AI</span>
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed">
                  The structural framework to bridge the Promise Gap through the HAI, AVS, and IGF layers.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <p className="text-sm font-semibold text-[#14b8a6] uppercase tracking-wider">
                  Get early access to the playbook
                </p>
                <form className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#14b8a6] transition-colors flex-grow"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        <Insights />

        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
