import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

const signalEntries = [
  {
    category: "Trust", // Correctly mapped to HAI
    title: "The Real Trust Gap",
    excerpt: "Trust in AI is not achieved solely through compliance; it is cultivated through transparency. We examine how oversight transforms doubt into an operational signal.",
    slug: "real-trust-gap"
  },
  {
    category: "Govern", // Correctly mapped to AVS
    title: "The Adoption Value System",
    excerpt: "Proving value is an AI adoption accelerator. This introduces the AVS model to turn intent into measurable impact across four dimensions.",
    slug: "adoption-value-system"
  },
  {
    category: "Evolve", // Correctly mapped to IGF
    title: "Executive Readiness",
    excerpt: "Technology mastery is not AI leadership. Leadership is about shaping the systems and decision boundaries that govern how technology is used.",
    slug: "executive-readiness-ai"
  }
];

const Insights = () => {
  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight italic uppercase">
            The <span className="text-[#14b8a6]">Signal Architecture</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
            Strategic perspectives designed to provide structural clarity when AI-enabled systems 
            begin to drift from leadership intent.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {signalEntries.map((insight, index) => (
            <motion.div
              key={insight.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <Link href={`/insights/${insight.slug}`}>
                <Card className="p-10 h-full bg-slate-900/30 border-slate-800 border-2 relative overflow-hidden group hover:border-[#14b8a6]/40 transition-all duration-500 cursor-pointer flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500"></div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-[#14b8a6]">
                      <Activity className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        Lens: {insight.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white tracking-tight italic group-hover:text-[#14b8a6] transition-colors leading-tight uppercase">
                      {insight.title}
                    </h3>
                    
                    <p className="text-slate-400 font-light leading-relaxed">
                      {insight.excerpt}
                    </p>
                  </div>
                    
                  <div className="pt-8 mt-auto flex items-center text-[#14b8a6] text-sm font-medium group-hover:gap-3 transition-all uppercase tracking-widest text-[10px]">
                    Read Entry
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* REDUNDANT DOWNLOAD SECTION REMOVED TO FAVOR PRIMARY CTA CARDS */}
      </div>
    </section>
  );
};

export default Insights;
