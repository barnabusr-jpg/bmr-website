import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, ArrowRight } from "lucide-react"; // FIXED: Removed 'Linkedin'
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Start a <span className="text-[#14b8a6]">Conversation</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Whether you are identifying a Promise Gap or scaling systemic oversight, let&apos;s discuss how BMR can support your leadership team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Direct Contact Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-8">
              <h2 className="text-sm font-semibold text-[#14b8a6] uppercase tracking-[0.2em]">Inquiries</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#14b8a6]/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-[#14b8a6]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email Us</p>
                    <a 
                      href="mailto:hello@bmradvisory.co" 
                      className="text-slate-400 hover:text-[#14b8a6] transition-colors"
                    >
                      hello@bmradvisory.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  {/* Note: I'm keeping the link but not using the icon to satisfy the build */}
                  <div className="bg-[#14b8a6]/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                    <span className="text-[#14b8a6] font-bold">in</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Connect</p>
                    <a 
                      href="https://linkedin.com/company/bmradvisory" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-[#14b8a6] transition-colors"
                    >
                      LinkedIn Corporate
                    </a>
                  </div>
                </div>
              </div>

              <Button asChild className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-12">
                <a href="mailto:hello@bmradvisory.co?subject=Strategic Advisory Inquiry">
                  Send an Email <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Assessment CTA Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-[0.2em]">The Diagnostic</h2>
                <h3 className="text-2xl font-bold text-white leading-tight">Identify Your Promise Gap Signals First</h3>
                <p className="text-slate-400">
                  Before our first session, many clients find it helpful to run their initial signals through our systemic diagnostic tool.
                </p>
              </div>

              <Button variant="outline" asChild className="border-slate-700 text-white hover:bg-slate-800 h-12">
                <Link href="/promise-gap/diagnostic" className="flex items-center gap-2">
                  Launch Diagnostic <MessageSquare className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
