import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FooterCTAHome = () => {
  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Diagnostic: <span className="text-[#14b8a6]">ROI Recovery Audit</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Understand why your AI initiatives have stalled and identify the specific behavioral patterns 
              creating your <span className="text-white font-medium">Promise Gap™</span>.
            </p>
          </div>

          <Card className="p-8 border-slate-800 bg-slate-900/50 backdrop-blur-md max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left space-y-2">
                <p className="text-sm font-semibold text-[#14b8a6] uppercase tracking-wider">Available Now</p>
                <h3 className="text-xl font-bold text-white">The 12 Signals™ Playbook</h3>
                <p className="text-slate-400">A leadership framework for observing AI systems.</p>
              </div>
              {/* Changed href from /12-signals to /contact to fix 404 */}
              <Button className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-12 px-8" asChild>
                <Link href="/contact">
                  Get the Playbook
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>

          <p className="text-sm text-slate-500 italic">
            Note: BMR Solutions provides advisory services and does not provide legal advice or compliance certification.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterCTAHome;
