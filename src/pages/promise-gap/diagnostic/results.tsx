import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DiagnosticResults() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-[#020617] text-white py-20">
        <div className="text-center space-y-6 max-w-2xl px-6">
          <h1 className="text-4xl font-bold">Assessment Complete</h1>
          <p className="text-slate-400 text-lg">
            Your Strategic Advisory signals have been sent. A member of our team will review your Promise Gap profile and reach out shortly.
          </p>
          <Button asChild className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617]">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
