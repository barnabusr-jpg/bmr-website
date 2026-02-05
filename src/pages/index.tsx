import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialVideo from "@/components/CommercialVideo";
import Hero from "@/components/home/HeroHome";
import ValueBullets from "@/components/home/ValueBulletsHome";
import ServicesPreview from "@/components/home/ServicesPreviewHome";
import DiagnosticFrameworks from "@/components/home/DiagnosticFrameworks"; // UPDATED PATH
import Outcomes from "@/components/home/OutcomesHome";
import ComparisonGrid from "@/components/home/ComparisonGrid";
import Insights from "@/components/home/InsightsHome";
import FooterCTA from "@/components/home/FooterCTAHome";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      <main>
        <Hero />
        <CommercialVideo src="https://uuyq3t7kfckwh0je.public.blob.vercel-storage.com/bmr-commercial.mp4" />
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ValueBullets />
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ServicesPreview />
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <DiagnosticFrameworks /> 
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <Outcomes />
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ComparisonGrid />
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <Insights />
        <FooterCTA /> 
      </main>
      <Footer />
    </div>
  );
};

export default Index;
