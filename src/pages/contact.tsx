import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Start a <span className="text-[#14b8a6]">Conversation</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Whether you are identifying a Promise Gap or scaling systemic oversight, 
              let&apos;s discuss how BMR can support your leadership team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Direct Contact Card */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-10 space-y-10 relative overflow-hidden group">
              {/* Visual accent consistency with the rest of the site */}
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500"></div>
              
              <h2 className="text-xs font-semibold text-[#14b8a6] uppercase tracking-[0.2em]">Strategic Inquiries</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-[#14b8a6]/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-[#14b8a6]" />
                  </div>
                  <div>
                    <p className="text-white font-bold tracking-tight mb-1">Email Us</p>
                    <a 
                      href="mailto:hello@bmradvisory.co" 
                      className="text-slate-400 font-light hover:text-[#14b8a6] transition-colors"
                    >
                      hello@bmradvisory.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-[#14b8a6]/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                    <span className="text-[#14b8a6] font-bold">in</span>
                  </div>
                  <div>
                    <p className="text-white font-bold tracking-tight mb-1">Connect</p>
                    <a 
                      href="https://linkedin.com/in/barnabus-roundtree" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-400 font-light hover:text-[#14b8a6] transition-colors"
                    >
                      LinkedIn Corporate
                    </a>
                  </div>
                </div>
              </div>

              <Button asChild className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-14 text-lg transition-all">
                <a href="mailto:hello@bmradvisory.co?subject=Strategic Advisory Inquiry">
                  Send an Email <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Assessment CTA Card */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-10 space-y-10 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500"></div>
              
              <div className="space-y-6">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">The Diagnostic</h2>
                <h3 className="text-2xl font-bold text-white leading-tight tracking-tight">Identify Your Promise Gap Signals First</h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  Before our first session, many clients find it helpful to run their initial signals 
                  through our systemic diagnostic tool to pinpoint specific behavioral friction.
                </p>
              </div>

              <Button variant="outline" asChild className="border-slate-700 text-white hover:bg-slate-800 h-14 font-light text-lg transition-all">
                <Link href="/diagnostic" className="flex items-center gap-2">
                  Launch Diagnostic <MessageSquare className="ml-2 h-5 w-5" />
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
