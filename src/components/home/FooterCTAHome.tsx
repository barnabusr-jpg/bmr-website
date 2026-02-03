import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FooterCTAHome = () => {
  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="space-y-10"> {/* Increased spacing for better "air" */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Diagnostic: <span className="text-[#14b8a6]">ROI Recovery Audit</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              Understand why your AI initiatives have stalled and identify the specific behavioral patterns 
              creating your <span className="text-white font-medium">Promise Gap™</span>.
            </p>
          </div>

          <Card className="p-10 border-slate-800 bg-slate-900/50 backdrop-blur-md max-w-3xl mx-auto relative overflow-hidden">
             {/* Matching the teal accent line from the Hero card */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left space-y-2">
                <p className="text-sm font-semibold text-[#14b8a6] uppercase tracking-[0.2em]">Available Now</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">The 12 Signals™ Playbook</h3>
                <p className="text-slate-400 font-light">A leadership framework for observing AI systems.</p>
              </div>
              <Button className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-14 px-8 transition-all hover:scale-105" asChild>
                <Link href="/contact">
                  Get the Playbook
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>

          <p className="text-[10px] text-slate-600 italic tracking-wide pt-4">
            Note: BMR Solutions provides advisory services and does not provide legal advice or compliance certification.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterCTAHome;
