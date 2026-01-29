import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, FileCheck, Lightbulb, Settings } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI Strategy & Governance",
    description: "Develop comprehensive frameworks for responsible AI deployment, risk management, and regulatory compliance."
  },
  {
    icon: Settings,
    title: "Delivery Transformation",
    description: "Implement proven methodologies to accelerate AI adoption and optimize organizational workflows."
  },
  {
    icon: FileCheck,
    title: "Executive Readiness",
    description: "Prepare leadership teams with strategic insights and decision-making frameworks for AI initiatives."
  },
  {
    icon: Lightbulb,
    title: "Innovation Advisory",
    description: "Identify opportunities for AI-driven innovation while maintaining ethical standards and human values."
  }
];

const ServicesPreview = () => {
  return (
    <section className="py-24 px-6 bg-[#020617]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-white tracking-tight">Our Services</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Comprehensive advisory services to guide your AI journey from strategy to execution
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Updated Card: Darker background and teal accents to match advisory theme */}
              <Card className="p-8 h-full bg-slate-900/50 border-slate-800 hover:border-[#14b8a6]/50 transition-all duration-300 border-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#14b8a6]/10 flex-shrink-0">
                    <service.icon className="h-6 w-6 text-[#14b8a6]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{service.description}</p>
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
