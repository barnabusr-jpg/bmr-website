import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromiseGapDiagnosticPage from "@/components/promise-gap-diagnostic/PromiseGapDiagnosticPage";

export default function DiagnosticPageRoute() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Header />
      <main className="pt-20">
        {/* This calls the file with the Red Title and Hardcoded Buttons */}
        <PromiseGapDiagnosticPage />
      </main>
      <Footer />
    </div>
  );
}
