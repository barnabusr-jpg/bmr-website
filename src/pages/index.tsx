import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialVideo from "@/components/CommercialVideo";
import Hero from "@/components/home/HeroHome";
import ValueBullets from "@/components/home/ValueBulletsHome";
import ServicesPreview from "@/components/home/ServicesPreviewHome";
import Frameworks from "@/components/home/FrameworksHome";
import Outcomes from "@/components/home/OutcomesHome";
import ComparisonGrid from "@/components/home/ComparisonGrid";
import Insights from "@/components/home/InsightsHome";
import FooterCTA from "@/components/home/FooterCTAHome";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#020617]"> {/* Added global brand black */}
      <Header />
      <main>
        <Hero />

        {/* 1. Observation Layer: The Brand Film */}
        <CommercialVideo src="https://uuyq3t7kfckwh0je.public.blob.vercel-storage.com/bmr-commercial.mp4" />

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <ValueBullets />
        
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <ServicesPreview />
        
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <Frameworks />
        
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <Outcomes />

        {/* 2. Education Layer: The Playbook (Soft Lead) */}
        <section className="py-24 bg-[#020617] border-y border-slate-900">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            {/* Visual Book Cover */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 to-black flex flex-col justify-between p-12 shadow-2xl">
              <div className="space-y-4">
                <div className="h-1 w-12 bg-[#14b8a6]"></div>
                <h3 className="text-2xl font-bold text-white leading-tight">THE SYSTEMIC<br/>AI PLAYBOOK</h3>
                <p className="text-slate-500 text-sm tracking-widest uppercase font-mono">BMR Methodology v1.0</p>
              </div>
              <div className="text-[#14b8a6] font-mono text-xs opacity-50">HAI // AVS // IGF</div>
            </div>

            {/* Playbook Content */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white tracking-tight leading-tight">
                The Playbook for <span className="text-[#14b8a6]">Responsible AI</span>
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                Download our structural framework for bridging the Promise Gap™ through 
                Human-AI Interface, Automated Verification, and Intent Governance layers.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-800">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-[#14b8a6] outline-none flex-grow"
                  required
                />
                <button className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold px-8 py-3 rounded-lg transition-all">
                  Notify Me
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* 3. Analysis Layer: Comparison */}
        <ComparisonGrid />
        
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <Insights />

        {/* 4. Conversion Layer: Start a Conversation (High Intent) */}
        <FooterCTA /> 
      </main>
      <Footer />
    </div>
  );
};

export default Index;
