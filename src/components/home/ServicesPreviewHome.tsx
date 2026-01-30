import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Users, ShieldAlert, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI Decision Structures",
    description: "Reveal how AI decisions are approved, challenged, and escalated under real operating conditions."
  },
  {
    icon: Users,
    title: "Delivery and Adoption Readiness",
    description: "Surface behavioral and organizational barriers that quietly undermine AI adoption and execution."
  },
  {
    icon: ShieldAlert,
    title: "Executive Readiness",
    description: "Support senior leaders in navigating AI tradeoffs with clarity, accountability, and confidence when decisions carry consequences."
  },
  {
    icon: Lightbulb,
    title: "Innovation Advisory",
    description: "Evaluate AI opportunities through a risk-aware, human-centered lens before momentum outpaces judgment."
  }
];

const ServicesPreview = () => {
  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-6 text-white tracking-tight">What We Support</h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Advisory support for organizations facing real AI risk, regulatory scrutiny, 
            and adoption complexity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <Card className="p-10 h-full bg-slate-900/30 border-slate-800 hover:border-[#14b8a6]/40 transition-all duration-500 border-2 relative overflow-hidden group">
                {/* Visual accent matching the Hero card style */}
                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500"></div>
                
                <div className="flex items-start gap-6">
                  <div className="p-3 rounded-lg bg-[#14b8a6]/10 flex-shrink-0">
                    <service.icon className="h-6 w-6 text-[#14b8a6]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-white tracking-tight">{service.title}</h3>
                    <p className="text-slate-400 leading-relaxed font-light text-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
