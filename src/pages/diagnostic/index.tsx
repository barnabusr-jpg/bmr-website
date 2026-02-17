import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromiseGapDiagnosticPage from "@/components/promise-gap-diagnostic/PromiseGapDiagnosticPage";

export default function DiagnosticPageRoute() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Head>
        <title>BMR Signal Diagnostic | Forensic AI System Triage</title>
        <meta name="description" content="A 3-minute forensic pulse check to identify systemic pressure signals and structural drift in Human-AI adoption layers." />

        {/* Open Graph / Social Media Preview for Slack and LinkedIn */}
        <meta property="og:title" content="BMR Signal Diagnostic: Forensic AI Triage" />
        <meta property="og:description" content="Identify the 'Promise Gap' in your AI implementation. A high-level diagnostic for identifying operational friction points." />
        <meta property="og:image" content="https://bmradvisory.co/images/diagnostic-preview.jpg" /> 
        <meta property="og:type" content="website" />

        {/* Twitter/X Preview */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BMR Signal Diagnostic" />
        <meta name="twitter:description" content="Evaluate systemic pressure signals in Human-AI systems through a forensic lens." />
      </Head>

      <Header />
      <main className="pt-24 pb-20">
        {/* Calls the Observation-based Diagnostic Component */}
        <PromiseGapDiagnosticPage />
      </main>
      <Footer />
    </div>
  );
}
