import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueBullets from "@/components/ValueBullets";
import ServicesPreview from "@/components/ServicesPreview";
import Frameworks from "@/components/Frameworks";
import Outcomes from "@/components/Outcomes";
import Insights from "@/components/Insights";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <ValueBullets />
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <ServicesPreview />
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <Frameworks />
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <Outcomes />
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <Insights />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
