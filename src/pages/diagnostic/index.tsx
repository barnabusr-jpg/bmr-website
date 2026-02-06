import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromiseGapDiagnosticPage from "@/components/promise-gap-diagnostic/PromiseGapDiagnosticPage";

export default function DiagnosticPageRoute() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      <main className="pt-24 pb-20">
        {/* Calls the Observation-based Diagnostic Component */}
        <PromiseGapDiagnosticPage />
      </main>
      <Footer />
    </div>
  );
}
