import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const frameworks = [
  {
    category: "Foundation",
    title: "Trust",
    description: "Establish transparency, accountability, and ethical standards for responsible AI implementation."
  },
  {
    category: "Implementation",
    title: "Govern",
    description: "Deploy robust governance structures, policies, and compliance mechanisms across your organization."
  },
  {
    category: "Growth",
    title: "Evolve",
    description: "Continuously adapt and scale AI capabilities while maintaining responsible practices and human values."
  }
];

const methodologies = [
  {
    name: "HAI",
    fullName: "Human-AI Interaction",
    description: "Framework for designing collaborative systems that enhance human decision-making and maintain ethical boundaries."
  },
  {
    name: "AVS",
    fullName: "Adoption Value System",
    description: "Structured methodology for measuring and maximizing the organizational value of AI implementations."
  }
];

const Frameworks = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Our Frameworks</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Proven methodologies to guide your AI transformation journey
          </p>
        </motion.div>

        {/* Trust → Govern → Evolve */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">The Journey</h3>
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
                <Card className="p-8 h-full border-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {framework.category}
                  </span>
                  <h4 className="text-2xl font-bold my-4">{framework.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{framework.description}</p>
                </Card>
                {index < frameworks.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="bg-primary rounded-full p-2">
                      <ArrowRight className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* HAI & AVS */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8">Core Methodologies</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {methodologies.map((methodology, index) => (
              <motion.div
                key={methodology.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              >
                <Card className="p-8 h-full border-2 hover:border-primary/50 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl font-bold text-primary">{methodology.name}</div>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{methodology.fullName}</h4>
                  <p className="text-muted-foreground leading-relaxed">{methodology.description}</p>
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
