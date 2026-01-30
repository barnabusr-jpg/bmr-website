import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const frameworks = [
  {
    category: "Lens",
    title: "Trust",
    description: "Confidence, clarity, and shared understanding are fragile. Risk forms when AI decisions are experienced differently across stakeholders."
  },
  {
    category: "Lens",
    title: "Govern",
    description: "Oversight and accountability become harder to sustain. Risk emerges when decision pathways fragment and controls lose influence."
  },
  {
    category: "Lens",
    title: "Evolve",
    description: "Adaptation accelerates. Risk accumulates when change outpaces shared understanding and operational stability."
  }
];

const methodologies = [
  {
    name: "HAI",
    fullName: "Human–AI Interaction",
    description: "Examines how people interpret, rely on, and remain accountable for AI-influenced decisions in real operational contexts."
  },
  {
    name: "AVS",
    fullName: "Adoption Value System",
    description: "Evaluates whether AI efforts translate into sustained organizational value rather than activity or output volume."
  },
  {
    name: "SHP",
    fullName: "System Health Picture",
    description: "Provides visibility into how AI-enabled systems behave across people, processes, and decisions—revealing interaction patterns often invisible in traditional reporting."
  }
];

const Frameworks = () => {
  return (
    <section className="py-24 px-6 bg-[#030712] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-6 tracking-tight text-white">Our Frameworks</h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Proprietary perspectives that shape how we observe system behavior, surface exposure, 
            and support leadership judgment when AI decisions carry real consequences.
          </p>
        </motion.div>

        {/* Trust → Govern → Evolve */}
        <div className="mb-24">
          <h3 className="text-sm font-semibold text-[#14b8a6] uppercase tracking-[0.2em] text-center mb-12">The Journey We Observe</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {frameworks.map((framework, index) => (
              <motion.div
                key={framework.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                className="relative"
              >
                <Card className="p-8 h-full border-2 bg-slate-900/30 border-slate-800">
                  <span className="text-xs font-semibold text-[#14b8a6] uppercase tracking-wider">
                    {framework.category}
                  </span>
                  <h4 className="text-2xl font-bold my-4 text-white tracking-tight">{framework.title}</h4>
                  <p className="text-slate-400 font-light leading-relaxed">{framework.description}</p>
                </Card>
                {index < frameworks.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="bg-[#14b8a6] rounded-full p-2 shadow-lg">
                      <ArrowRight className="h-4 w-4 text-[#020617]" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <p className="text-center text-slate-500 font-light italic mt-12 text-sm">
            These are not steps to follow. They describe how AI-enabled systems tend to behave under increasing pressure.
          </p>
        </div>

        {/* Core Methodologies */}
        <div>
          <h3 className="text-sm font-semibold text-[#14b8a6] uppercase tracking-[0.2em] text-center mb-12">Core Perspectives</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {methodologies.map((methodology, index) => (
              <motion.div
                key={methodology.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              >
                <Card className="p-8 h-full border-2 bg-slate-900/50 border-slate-800 hover:border-[#14b8a6]/40 transition-all duration-500 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500"></div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-3xl font-bold text-[#14b8a6] tracking-tighter">{methodology.name}</div>
                    <div className="h-px flex-1 bg-slate-800 group-hover:bg-[#14b8a6]/30 transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white tracking-tight">{methodology.fullName}</h4>
                  <p className="text-slate-400 font-light leading-relaxed">{methodology.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Frameworks;
