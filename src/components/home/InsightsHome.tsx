import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Activity } from "lucide-react";
import Link from "next/link";

const signalEntries = [
  {
    title: "The Real Trust Gap",
    slug: "real-trust-gap",
    description: "Trust is cultivated through transparency. We examine how oversight transforms doubt into an operational signal."
  },
  {
    title: "The Adoption Value System",
    slug: "adoption-value-system",
    description: "Proving value is an AI adoption accelerator. This introduces the AVS model to turn intent into measurable impact."
  },
  {
    title: "Executive Readiness",
    slug: "executive-readiness-ai",
    description: "Technology mastery is not AI leadership. Oversight requires structural clarity and defined decision boundaries."
  }
];

const InsightsHome = () => {
  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The <span className="text-[#14b8a6]">Signal Architecture</span>
          </h2>
          <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
            Strategic perspectives designed to provide structural clarity when AI-enabled systems 
            begin to drift from leadership intent.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {signalEntries.map((entry, index) => (
            <motion.div
              key={entry.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="p-10 h-full bg-slate-900/30 border-slate-800 border-2 relative overflow-hidden group flex flex-col justify-between hover:border-[#14b8a6]/40 transition-all duration-500">
                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500" />
                
                <div>
                  <div className="mb-6 flex items-center gap-2 text-[#14b8a6]">
                    <Activity className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Signal Entry</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight italic">
                    {entry.title}
                  </h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">
                    {entry.description}
                  </p>
                </div>

                <Link 
                  href={`/insights/${entry.slug}`} 
                  className="text-[#14b8a6] font-medium flex items-center gap-2 group-hover:gap-3 transition-all text-sm"
                >
                  Read Entry <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsHome;
