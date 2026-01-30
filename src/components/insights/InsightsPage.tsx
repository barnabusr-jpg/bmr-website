import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, FileText, Compass, ArrowRight } from "lucide-react";

// ... [previous InsightCard type and insights array]

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <Header />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">Insights</h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
              Articles, field guides, and tools designed to help
              leaders make defensible AI decisions when trust, regulation, and
              delivery risk matter.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-10 h-full bg-slate-900/30 border-slate-800 hover:border-[#14b8a6]/40 transition-all duration-500 border-2 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500"></div>
                  
                  <div className="flex flex-col h-full justify-between">
                    <div className="space-y-6">
                      <div className="p-3 rounded-lg bg-[#14b8a6]/10 w-fit">
                        <item.icon className="h-6 w-6 text-[#14b8a6]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{item.title}</h3>
                        <p className="text-slate-400 font-light leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-800/50">
                      <span className="text-[#14b8a6] font-medium inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform cursor-pointer">
                        Explore Entry <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* FIXED SECTION: Escaped entities to resolve build error */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 text-center"
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
