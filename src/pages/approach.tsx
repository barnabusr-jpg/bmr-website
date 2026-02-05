import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesPreview from "@/components/home/ServicesPreviewHome";
import Frameworks from "@/components/home/DiagnosticFrameworks";
import Outcomes from "@/components/home/OutcomesHome";

export default function ApproachPage() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Approach</h1>
          <p className="text-xl text-slate-400">A systemic framework for bridging the Promise Gap through HAI, AVS, and IGF.</p>
        </div>
        
        <ServicesPreview />
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-12" />
        <Frameworks />
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-12" />
        <Outcomes />
      </main>
      <Footer />
    </div>
  );
}
