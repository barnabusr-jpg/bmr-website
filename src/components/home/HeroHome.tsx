import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroHome = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center py-16 px-6 overflow-hidden bg-[#020617]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-[0.2em] text-[#14b8a6] uppercase">
                BMR Solutions
              </p>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white tracking-tight">
                Strategic Advisory for
                <span className="text-[#14b8a6] block mt-2">Responsible AI</span>
              </h1>
            </div>

            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              Helping organizations understand how their AI-enabled systems behave under real operating
              conditions so leaders can make well-grounded, defensible decisions when trust, regulation,
              and delivery risk matter.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* FIXED: Added asChild and Link for functionality */}
              <Button size="lg" className="group bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-12 px-8" asChild>
                <Link href="/contact">
                  Start a Conversation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* FIXED: Added asChild and Link for consolidated Approach page */}
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 h-12 px-8" asChild>
                <Link href="/approach">
                  Explore Our Approach
                </Link>
              </Button>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-900">
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <span className="h-1 w-1 bg-[#14b8a6] rounded-full"></span>
                Understand how AI-related decision risk forms before it hardens.
              </p>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <span className="h-1 w-1 bg-[#14b8a6] rounded-full"></span>
                Observe system behavior under real operating conditions.
              </p>
              <p className="text-[10px] text-slate-600 italic mt-6">
                Note: BMR provides advisory services and does not provide legal advice or compliance certification.
              </p>
            </div>
          </motion.div>

          {/* Right: Authority framing card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="p-10 border-2 shadow-2xl backdrop-blur-md bg-slate-900/50 border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#14b8a6]"></div>
              <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">
                Why AI Efforts Quietly Stall
              </h3>

              <div className="space-y-6">
                <p className="text-slate-300 leading-relaxed text-lg">
                  AI initiatives rarely fail because the technology does not work.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  They stall because AI-enabled systems behave differently under <span className="text-white font-medium text-slate-200">real operating conditions</span> than leaders expect.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  When human judgment, AI, and oversight interact at scale, predictable behavioral patterns emerge—creating the <span className="text-[#14b8a6] font-medium">Promise Gap</span>.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
