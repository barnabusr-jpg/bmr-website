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
    <div className="min-h-screen bg-[#020617]">
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

        {/* REMOVED: The inline "Education Layer/Playbook" section was deleted here 
           to eliminate the duplicate form and background color mismatch.
        */}

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* 2. Analysis Layer: Comparison */}
        <ComparisonGrid />
        
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <Insights />

        {/* 3. Conversion Layer: The ONLY "Start a Conversation" section */}
        <FooterCTA /> 
      </main>
      <Footer />
    </div>
  );
};

export default Index;
