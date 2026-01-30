import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <Header />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20 space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">Insights</h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
              Articles, field guides, and tools designed to help leaders make defensible AI decisions 
              when trust, regulation, and delivery risk matter.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
             <Card className="p-10 bg-slate-900/30 border-slate-800 border-2 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#14b8a6]"></div>
                <div className="text-left space-y-6">
                  <h3 className="text-2xl font-bold text-white tracking-tight">Understanding the Promise Gap™</h3>
                  <p className="text-slate-400 font-light leading-relaxed">
                    Why AI-enabled system behavior diverges from leadership expectations under real operating conditions.
                  </p>
                  <div className="pt-6 border-t border-slate-800/50">
                    <span className="text-[#14b8a6] font-medium inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform cursor-pointer">
                      Explore Entry <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
             </Card>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24"
          >
            <p className="text-slate-500 font-light italic text-sm">
              &quot;Meaningful understanding requires structured observation. We look for why risk is persisting, not just where it is occurring.&quot;
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
